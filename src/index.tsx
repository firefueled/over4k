import * as React from 'react'
import * as ReactDOM from 'react-dom'
import HelloContainer from './containers/Hello'
import registerServiceWorker from './registerServiceWorker'
import PolyglotHOC from './utils/polyglothoc'
import strings from './utils/strings'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

const Promise = require('bluebird')
Promise.config({
  cancellation: true,
})

PolyglotHOC.init(strings['en-US'])

ReactDOM.render(
  <HelloContainer />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
