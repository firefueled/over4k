import * as React from 'react'
import { Container, Row, Col, Button, Form, Input } from 'reactstrap'
import Channel, { Props as ChannelProps } from '../components/Channel'
import ChannelCombo from '../components/ChannelCombo'
import { lookupChannel } from '../utils'
import './Hello.css'

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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChannelSelect = this.handleChannelSelect.bind(this)
  }

  handleQueryChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      query: event.target.value,
    })
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (this.state.query.length < 3) return

    lookupChannel(this.state.query)
      .then(res => {
        this.setState({
          channelList: res,
        })
      })
    e.preventDefault()
  }

  handleChannelSelect(channel: ChannelProps): void {
    this.setState({
      channelProps: channel,
    })
  }

  render() {
    return (
      <Container className="main-container">
        <Row>
          <Col>
            <h2 className="greeting">Hello</h2>
          </Col>
        </Row>
        <Row className="form-container">
          <Col>
            <Form inline onSubmit={this.handleSubmit}>
              <Input
                type="text"
                name="query"
                value={this.state.query}
                placeholder="Nome do canal"
                onChange={this.handleQueryChange}
              />
              <Button color="primary">
                Lookup
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
          {this.state.channelList &&
            <div className="channel-combo-container">
              <ChannelCombo
                channelList={this.state.channelList}
                handleClick={this.handleChannelSelect}
              />
            </div>
          }
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.channelProps &&
            <div className="channel-container">
              <Channel {...this.state.channelProps} />
            </div>
            }
          </Col>
        </Row>
      </Container>
    )
  }
}

export default HelloContainer
