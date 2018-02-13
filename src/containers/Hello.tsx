import * as React from 'react'
import './Hello.css'
import Channel from '../components/Channel'

interface Props {
}

interface State {
  query: string,
  shouldLoadChannel: boolean,
  value: string,
}

export class HelloContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      value: '',
      query: '',
      shouldLoadChannel: false,
    }

    // UUfQ98EX3oOv6IHBdUNMJq8Q
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event: React.DetailedHTMLProps<any, any>): void {
    this.setState({
      value: event.target.value,
      shouldLoadChannel: false
    })
  }

  handleSubmit(event: any): void {
    this.setState({
      query: this.state.value,
      shouldLoadChannel: true,
    })
    event.preventDefault()
  }

  render() {
    return (
      <div className="hello">
        <div className="greeting">
          Hello
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="query" value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
        {this.state.shouldLoadChannel &&
          <div>
            <Channel channelId={this.state.query} />
          </div>
        }
      </div>
    )
  }
}

export default HelloContainer
