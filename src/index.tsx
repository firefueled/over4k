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

// Selecting default locale from local store or url
let loc = 'pt-BR'
export const localStorageLocKey = 'selectedLoc'
const localStorageLoc = window.localStorage.getItem(localStorageLocKey)

if (localStorageLoc)
  loc = localStorageLoc
else if (window.location.origin.includes('itsover4thousand'))
  loc = 'en-US'

window.localStorage.setItem(localStorageLocKey, loc)

PolyglotHOC.init(strings[loc])

ReactDOM.render(
  <HelloContainer />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
