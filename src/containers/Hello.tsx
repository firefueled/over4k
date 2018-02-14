import * as React from 'react'
import './Hello.css'
import Channel, { Props as ChannelProps } from '../components/Channel'
import ChannelCombo from '../components/ChannelCombo'
import { lookupChannel } from '../utils'

const debug = require('debug')('containers:Hello')

interface Props {
}

interface State {
  query: string,
  channelList?: ChannelProps[]
  channelProps?: ChannelProps,
}

export class HelloContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      query: '',
    }

    // UUfQ98EX3oOv6IHBdUNMJq8Q
    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.handleChannelLookup = this.handleChannelLookup.bind(this)
    this.handleChannelSelect = this.handleChannelSelect.bind(this)
  }

  handleQueryChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      query: event.target.value,
    })
  }

  handleChannelLookup() {
    if (this.state.query.length < 3) return

    lookupChannel(this.state.query)
      .then(res => {
        this.setState({
          channelList: res,
        })
      })
  }

  handleChannelSelect(channel: ChannelProps): void {
    this.setState({
      channelProps: channel,
    })
  }

  render() {
    return (
      <div className="hello">
        <div className="greeting">
          Hello
        </div>
        <div>
          <form>
            <input
              type="text"
              name="query"
              value={this.state.query}
              onChange={this.handleQueryChange}
            />
            <input
              type="button"
              value="Lookup"
              onClick={this.handleChannelLookup}
            />

            {this.state.channelList &&
            <ChannelCombo
              channelList={this.state.channelList}
              handleClick={this.handleChannelSelect}
            />
            }
          </form>
        </div>

        {this.state.channelProps &&
        <div>
          <Channel {...this.state.channelProps} />
        </div>
        }
      </div>
    )
  }
}

export default HelloContainer
