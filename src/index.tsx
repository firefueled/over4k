import * as React from 'react'
import * as ReactDOM from 'react-dom'
import HelloContainer from './containers/Hello'
import registerServiceWorker from './registerServiceWorker'
import PolyglotHOC from './utils/polyglothoc'
import strings from './utils/strings'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

const localStorage = require('localStorage')
const Promise = require('bluebird')
Promise.config({
  cancellation: true,
})

// Selecting default locale from local store or url
let locale = 'pt-BR'
export const lsLocaleKey = 'locale'
const lsLocale = localStorage.getItem(lsLocaleKey)

if (lsLocale)
  locale = lsLocale
else if (window.location.origin.includes('itsover4thousand'))
  locale = 'en-US'

localStorage.setItem(lsLocaleKey, locale)

PolyglotHOC.init(strings[locale])

ReactDOM.render(
  <HelloContainer />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
