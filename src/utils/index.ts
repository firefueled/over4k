import axios from 'axios'
import { ProgressData, Props as ChannelProps } from '../components/Channel'
import { LocaleKeys, TranslateFunc } from './polyglothoc'
import NumberFormatOptions = Intl.NumberFormatOptions

export const GOLDEN = 4000

export interface VideosData {
  yearHours: number
}

export async function getVideosData(channelId: string): Promise<VideosData> {
  const url = 'https://q1qqdxsz9c.execute-api.us-east-1.amazonaws.com/prod/videos-data?channelId='
  const res = await axios.get(`${url}${channelId}`)
  return { yearHours: Number.parseFloat(res.data) }
}

export async function lookupChannel(q: string): Promise<ChannelProps[]> {
  const url = 'https://q1qqdxsz9c.execute-api.us-east-1.amazonaws.com/prod/channel-lookup?q='
  const res = await axios.get(`${url}${q}`)
  return res.data
}

export function formatNumber(num: number): string {
  const options: NumberFormatOptions = { style: 'decimal', maximumFractionDigits: 0 }
  if (num < GOLDEN)
    options.maximumFractionDigits = 1

  return new Intl.NumberFormat('pt-BR', options).format(num)
}

export function getProgressOpts(yearHours: number, t: TranslateFunc, k: LocaleKeys): ProgressData {
  const opts = {
    progressColor: 'success',
    progressLabel: t(k.txtYearHoursOK),
    progressValue: yearHours,
    progressMax: GOLDEN,
  }

  if (yearHours < GOLDEN) {
    opts.progressColor = 'warning'
    opts.progressLabel = t(k.txtYearHoursAlmost)
  }
  if (yearHours < GOLDEN - GOLDEN * 0.7) {
    if (yearHours < GOLDEN * 0.25) opts.progressValue = GOLDEN * 0.25
    opts.progressColor = 'danger'
    opts.progressLabel = t(k.txtYearHoursFail)
  }

  return opts
}
