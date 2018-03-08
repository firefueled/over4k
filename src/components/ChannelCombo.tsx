import * as React from 'react'
import { lookupChannel } from '../utils'
import { localize, LocalizedProps } from '../utils/polyglothoc'
import { Props as ChannelProps } from './Channel'
import './ChannelCombo.css'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Progress } from 'reactstrap'
import * as BPromise from 'bluebird'

interface HandleFunction {
  (channel: ChannelProps): void
}

export interface Props {
  handleSelect: HandleFunction,
  query: string,
}

interface State {
  channelList?: ChannelProps[],
  isLoading?: boolean,
}

class ChannelCombo extends React.Component<LocalizedProps<Props>, State> {
  private lastRequest: BPromise<void> = BPromise.resolve()

  constructor(props: Props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.lookupChannels()
  }

  componentWillReceiveProps(nextProps: Readonly<Props>) {
    if (nextProps.query === this.props.query) return
    this.lookupChannels(nextProps.query)
  }

  lookupChannels(overrideQuery?: string) {
    if (this.props.query.length < 3) return
    this.setState({isLoading: true})

    this.delayRequest(overrideQuery || this.props.query)
  }

  delayRequest(query: string) {
    if (this.lastRequest.isPending()) {
      this.lastRequest.cancel()
    }

    this.lastRequest = BPromise
      .delay(750)
      .then(() => lookupChannel(query))
      .then(res => this.setState({ channelList: res }))
      .catch(err => {
      //
      })
      .then(() => this.setState({ isLoading: false }))
  }

  renderCombo() {
    const { t, k } = this.props
    if (this.state.isLoading) {
      return (
        <ListGroupItem disabled className="channel-snippet">
          <Progress animated color="info" className="channel-snippet-loading" value={100} />
        </ListGroupItem>
      )
    } else {
      if (this.state.channelList == null) {
        return null

      } else if (this.state.channelList.length === 0) {
        return (
          <ListGroupItem disabled className="channel-snippet">
            <span className="channel-snippet-title">{t(k.msgNoChannelsFound)}</span>
          </ListGroupItem>
        )

      } else {
        return (
          this.state.channelList.map(channel => {
            return (
              <ListGroupItem
                key={channel.channelId}
                tabIndex={0}
                className="channel-snippet channel-snippet-loaded"
                onClick={() => this.props.handleSelect(channel)}
                onKeyDown={e => e.keyCode !== 13 || this.props.handleSelect(channel)}
              >
                <img
                  className="channel-snippet-img"
                  src={channel.thumbnails.default.url}
                  alt="Logo do canal"
                />
                <span className="channel-snippet-title">{channel.title}</span>
              </ListGroupItem>
            )
          })
        )
      }
    }
  }

  render() {
    return (
      <ListGroup
        className="channel-combo"
        tabIndex={0}
      >
        {this.renderCombo()}
      </ListGroup>
    )
  }
}

export default localize()(ChannelCombo)
