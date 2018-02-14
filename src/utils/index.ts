import axios from 'axios'
import { Props as ChannelProps } from '../components/Channel'

export interface VideosData {
  yearHours: string
}

export async function getVideosData(channelId: string): Promise<VideosData> {
  const url = 'https://q1qqdxsz9c.execute-api.us-east-1.amazonaws.com/prod/videos-data?channelId='
  const res = await axios.get(`${url}${channelId}`)
  return { yearHours: res.data }
}

export async function lookupChannel(q: string): Promise<ChannelProps[]> {
  const url = 'https://q1qqdxsz9c.execute-api.us-east-1.amazonaws.com/prod/channel-lookup?q='
  const res = await axios.get(`${url}${q}`)
  return res.data
}
