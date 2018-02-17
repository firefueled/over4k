import * as React from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap'
import Channel, { Props as ChannelProps } from '../components/Channel'
import ChannelCombo from '../components/ChannelCombo'
import './Hello.css'

interface State {
  query: string,
  channelList?: ChannelProps[]
  channelProps?: ChannelProps,
}

export class HelloContainer extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      query: '',
    }

    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.handleChannelSelect = this.handleChannelSelect.bind(this)
  }

  handleQueryChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ query: event.target.value })
  }

  handleChannelSelect(channel: ChannelProps): void {
    this.setState({ channelProps: channel })
  }

  render() {
    return (
      <Container className="main-container">
        <Row>
          <Col sm={12}>
            <h1 className="greeting">Será que seu canal tem mais de 4 mil?</h1>
          </Col>
        </Row>
        <Row className="form-container">
          <Col sm={{size: 6, offset: 3}} >
            <Form>
              <Input
                bsSize="lg"
                type="text"
                name="query"
                value={this.state.query}
                placeholder="Nome do canal"
                autoComplete="off"
                onChange={this.handleQueryChange}
              />
            </Form>
          </Col>
        </Row>
        <Row>
          <Col sm={{size: 6, offset: 3}} >
          {this.state.query &&
            <div className="channel-combo-container">
              <ChannelCombo
                query={this.state.query}
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
