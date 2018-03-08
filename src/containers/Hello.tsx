import { FormEvent } from 'react'
import * as React from 'react'
import { Container, Row, Col, Form, Input } from 'reactstrap'
import Channel, { Props as ChannelProps } from '../components/Channel'
import ChannelCombo from '../components/ChannelCombo'
import LocaleSelector from '../components/LocaleSelector'
import { localize, LocalizedProps } from '../utils/polyglothoc'

import './Hello.css'
import strings from '../utils/strings'

interface State {
  query: string,
  channelList?: ChannelProps[],
  channelProps?: ChannelProps,
}

export class HelloContainer extends React.Component<LocalizedProps<{}>, State> {
  constructor(props: LocalizedProps<{}>) {
    super(props)
    this.state = {
      query: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.handleChannelSelect = this.handleChannelSelect.bind(this)
    this.changeLocale = this.changeLocale.bind(this)
  }

  changeLocale(locale: string): void {
    this.props.replace(strings[locale])
  }

  handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  handleQueryChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ query: event.target.value })
  }

  handleChannelSelect(channel: ChannelProps): void {
    this.setState({ channelProps: channel })
  }

  render() {
    const { t, k } = this.props
    return (
      <Container className="main-container">
        <Row className="locale-selector-container">
          <Col sm={12}>
            <LocaleSelector
              handleChange={this.changeLocale}
              localeOptions={['en-US', 'pt-BR']}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h1 className="greeting">{t(k.txtGreeting)}</h1>
          </Col>
        </Row>
        <Row className="form-container">
          <Col sm={{size: 6, offset: 3}} >
            <Form onSubmit={this.handleSubmit}>
              <Input
                autoFocus={true}
                tabIndex={0}
                bsSize="lg"
                type="text"
                name="query"
                value={this.state.query}
                placeholder={t(k.inputChannelPlaceholder)}
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
                handleSelect={this.handleChannelSelect}
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

export default localize()(HelloContainer)
