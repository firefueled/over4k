import axios from 'axios'

interface APIParams {
  readonly key: string,
  part: string,
  id?: string,
  fields?: string | undefined,
  pageToken?: string | undefined,
  maxResults?: number | undefined,
  playlistId?: string | undefined,
}

export interface ChannelData {
  title: string
}

export interface VideosData {
  yearHours: string
}

export async function getChannelData(channelId: string): Promise<ChannelData> {
  return { title: 'não encontrado' }
}

export async function getVideosData(channelId: string): Promise<VideosData> {
  const url = 'https://q1qqdxsz9c.execute-api.us-east-1.amazonaws.com/prod/videos-data?channelId='
  const res = await axios.get(`${url}${channelId}`)
  return { yearHours: res.data }
}
