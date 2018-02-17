import * as React from 'react'
import { formatNumber, getProgressOpts, getVideosData } from '../utils'
import { Jumbotron, Progress } from 'reactstrap'
import './Channel.css'

interface Thumbnails {
  default: { url: string },
  medium: { url: string },
  high: { url: string },
}

export interface Props {
  channelId: string,
  title: string,
  description: string,
  videoId: string,
  thumbnails: Thumbnails,
}

export interface ProgressData {
  progressColor: string,
  progressValue?: number,
  progressMax?: number,
  progressLabel?: string,
}

interface State extends ProgressData {
  yearHours: number,
  isRetrieving: boolean,
}

class Channel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      yearHours: 0,
      isRetrieving: false,
      progressColor: 'info',
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
        const progressData = getProgressOpts(res.yearHours)
        this.setState({...res, ...progressData})
      })
      .catch(error => {
        this.setState({yearHours: -1})
      })
      .then(() => {
        this.setState({isRetrieving: false})
      })
  }

  render() {
    return (
      <Jumbotron className="channel-jumbo" tabIndex={0}>
        <img className="channel-img" src={this.props.thumbnails.high.url} />
        <h1 className="d-inline channel-title">{this.props.title}</h1>
        <p className="lead channel-description">{this.props.description}</p>

        <h3>
          Horas assitidas no último ano
          {this.state.isRetrieving && '...'}
          {!this.state.isRetrieving && ': ' + formatNumber(this.state.yearHours)}
        </h3>

        {this.state.isRetrieving &&
          <Progress animated color="info" value={100} />
        }
        {!this.state.isRetrieving &&
          <Progress
            color={this.state.progressColor}
            value={this.state.progressValue}
            max={this.state.progressMax}
          >
            {this.state.progressLabel}
          </Progress>
        }
      </Jumbotron>
    )
  }
}

export default Channel
