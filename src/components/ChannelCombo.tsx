import * as React from 'react'
import { Props as ChannelProps } from './Channel'
import './ChannelCombo.css'
import { ListGroup, ListGroupItem } from 'reactstrap';

interface HandleFunction {
  (channel: ChannelProps): void
}

export interface Props {
  channelList: ChannelProps[],
  handleClick: HandleFunction
}

class ChannelCombo extends React.Component<Props> {

  renderCombo(props: Props) {
    if (props.channelList.length === 0) {
      return (
        <ListGroupItem disabled className="channel-snippet">
          <span className="channel-snippet-title">Não encontrei canais com este nome...</span>
        </ListGroupItem>
      )

    } else {
      return (
        props.channelList.map(channel => {
          return (
            <ListGroupItem
              key={channel.channelId}
              className="channel-snippet"
              onClick={() => props.handleClick(channel)}
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

  render() {
    return (
      <ListGroup className="channel-combo">
        {this.renderCombo(this.props)}
      </ListGroup>
    )
  }
}

export default ChannelCombo
