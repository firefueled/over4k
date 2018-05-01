import 'raf/polyfill'
import * as enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import PolyglotHOC from './utils/polyglothoc'

enzyme.configure({ adapter: new Adapter() })
PolyglotHOC.init({})

// import 'jest-localstorage-mock'
