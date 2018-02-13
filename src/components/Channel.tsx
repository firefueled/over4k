import * as React from 'react'
import { ChannelData, getChannelData, getVideosData, VideosData } from '../utils'

interface Props {
  channelId: string
}

interface State {
  title: string,
  yearHours: string,
  isRetrieving: boolean,
}

class Channel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      title: '...',
      yearHours: '0',
      isRetrieving: false,
    }
    this.updateChannelData()
  }

  componentWillReceiveProps(nextProps: Readonly<Props>) {
    if (nextProps.channelId === this.props.channelId) return
    this.updateChannelData()
  }

  async updateChannelData() {
    const res: ChannelData = await getChannelData(this.props.channelId)
    this.setState({ ...res })
    this.updateYearHours()
  }

  async updateYearHours() {
    this.setState({ isRetrieving: true })

    getVideosData(this.props.channelId)
      .then(res => {
        return this.setState({...res})
      })
      .catch(error => {
        return this.setState({yearHours: '-1'})
      })
      .then(() => {
        return this.setState({isRetrieving: false})
      })
  }

  render() {
    return (
      <div>
        {this.state.isRetrieving &&
          <span>Loading...</span>
        }
        <div>Canal {this.state.title}</div>
        <div>Horas no ano: {this.state.yearHours}</div>
      </div>
    )
  }
}

export default Channel
