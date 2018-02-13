'use strict';

const axios = require('axios')
const secrets = require('./secrets')
const queryString = require('querystring')

const debug = require('debug')('lambda')

const playlistItemsUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?'
const videosDataUrl = 'https://www.googleapis.com/youtube/v3/videos?'
const channelDataUrl = 'https://www.googleapis.com/youtube/v3/channels?'

const channelDataParamsObj = {
  key: secrets.googleAPIKey,
  part: 'snippet',
}

const playlistItemsParamsObj = {
  key: secrets.googleAPIKey,
  maxResults: 50,
  part: 'contentDetails',
  fields: 'items/contentDetails/videoId, nextPageToken, pageInfo',
}

const videosDataParamsObj = {
  key: secrets.googleAPIKey,
  part: 'contentDetails, statistics, snippet',
  fields: 'items(contentDetails/duration, id, snippet(title, publishedAt), statistics/viewCount)',
}

function getFromAPI(paramsObj, url) {
  const params = queryString.stringify(paramsObj)
  const finalUrl = `${url}${params}`
  return axios.get(finalUrl)
}

const durationRe = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/
function parseDuration(durationString) {
  let exec = durationRe.exec(durationString)
  if (exec == null) return 0

  const res = exec.slice(1)
  const seconds = Number.parseInt(res.pop() || '0')
  const minutes = Number.parseInt(res.pop() || '0')
  const hours = Number.parseInt(res.pop() || '0')

  return hours * 3600 + minutes * 60 + seconds
}

function extractVideoIds(data) {
  const ids = data.items.map(item => {
    return item.contentDetails.videoId
  })
  return ids.join(',')
}

function formatNumber(num) {
  return new Intl.NumberFormat('pt-BR', {style: 'decimal', maximumFractionDigits: 1})
    .format(num)
}

const oneYearAgo = new Date()
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

function getVideosData(previousTotal = 0, previousPageToken = '') {
  playlistItemsParamsObj.pageToken = previousPageToken
  let nextPageToken

  return getFromAPI(playlistItemsParamsObj, playlistItemsUrl)
    .then(videoIds => {
      videosDataParamsObj.id = extractVideoIds(videoIds.data)
      nextPageToken = videoIds.data.nextPageToken
      return getFromAPI(videosDataParamsObj, videosDataUrl)
    })
    .then(videosData => {
      let tooOldCount = 0
      let partialSumSeconds = videosData.data.items.reduce(
        (sum, video) => {
          if (new Date(video.snippet.publishedAt) >= oneYearAgo) {
            const duration = parseDuration(video.contentDetails.duration)
            const viewCount = Number.parseInt(video.statistics.viewCount)
            return sum + duration * viewCount
          } else {
            tooOldCount++
            return sum
          }
        }, 0)

      let total = previousTotal
      total += partialSumSeconds / 3600

      // all of the videos are too old or there are no more pages
      if (tooOldCount === videosData.data.items.length || nextPageToken == null)
        return formatNumber(total)
      return getVideosData(total, nextPageToken)
    })
}

function getChannelData() {
  channelDataParamsObj.id = 'UUfQ98EX3oOv6IHBdUNMJq8Q'

  return getFromAPI(channelDataParamsObj, channelDataUrl)
    .then(res => {
      if (res && res.data.items.length > 0) {
        return {title: res.data.items[0].snippet.title}
      }
      return {title: 'não encontrado'}
    })
}

function lookupChannel() {

}

function doIt(event) {
  if (event.path == null || event.path.length === 0)
    return Promise.reject('no path')

  let cmd = () => Promise.resolve()

  if (event.path === '/videos-data') {
    if (event.queryStringParameters.channelId == null || event.queryStringParameters.channelId.length === 0)
      return Promise.reject('missing channelId')

    playlistItemsParamsObj.playlistId = event.queryStringParameters.channelId
    cmd = getVideosData

  } else if (event.path === '/channel-data') {
    if (event.queryStringParameters.channelId == null || event.queryStringParameters.channelId.length === 0)
      return Promise.reject('missing channelId')

    channelDataParamsObj.id = event.queryStringParameters.channelId
    cmd = getChannelData

  } else if (event.path === '/channel-lookup') {
    channelDataParamsObj.id = event.queryStringParameters.channelId
    cmd = lookupChannel

  } else {
    return Promise.reject('no valid path')
  }

  return cmd()
}

exports.handler = (event, context, callback) => {
  const res = { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' }}
  doIt(event)
    .then(data => callback(null, Object.assign(res, { body: data })))
    .catch(err => callback(null, Object.assign(res, { statusCode: 400 })))
}
