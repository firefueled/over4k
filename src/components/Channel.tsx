import * as React from 'react'
import { getVideosData } from '../utils'

interface Thumbnails {
  default: { url: string },
  medium: { url: string },
  high: { url: string },
}

export interface Props {
  channelId: string,
  title: string,
  thumbnails: Thumbnails,
}

interface State {
  yearHours: string,
  isRetrieving: boolean,
}

class Channel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      yearHours: '0',
      isRetrieving: false,
    }
  }

  componentDidMount() {
    this.updateYearHours()
  }

  componentWillReceiveProps(nextProps: Readonly<Props>) {
    if (nextProps.channelId === this.props.channelId) return
    this.updateYearHours(nextProps.channelId)
  }

  async updateYearHours(overrideChannelId?: string) {
    this.setState({ isRetrieving: true })

    getVideosData(overrideChannelId || this.props.channelId)
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
        <div>Canal {this.props.title}</div>
        <div>Horas no ano: {this.state.yearHours}</div>
      </div>
    )
  }
}

export default Channel
