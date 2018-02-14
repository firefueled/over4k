import * as React from 'react'
import { Props as ChannelProps } from './Channel'

interface HandleFunction {
  (channel: ChannelProps): void
}

export interface Props {
  channelList: ChannelProps[],
  handleClick: HandleFunction
}

class ChannelCombo extends React.Component<Props> {
  render() {
    return (
      this.props.channelList.map(channel => {
        return (
          <div
            key={channel.channelId}
            className="channel-snippet"
            onClick={() => this.props.handleClick(channel)}
          >
            <img className="channel-snippet-img" src={channel.thumbnails.default.url} alt="Logo do canal" />
            <span className="channel-snippet-title">{channel.title}</span>
          </div>
        )
      })
    )
  }
}

export default ChannelCombo