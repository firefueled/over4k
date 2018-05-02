import * as React from 'react'
import { shallow } from 'enzyme'
import * as sinon from 'sinon'
import LocaleSelector from '../components/LocaleSelector'

describe('<LocaleSelector />', () => {
  it('should show a button group locale selector', () => {
    const props = {
      localeOptions: ['ch-HK', 'kr-SK', 'sp-AR'],
    }

    const wrapper = shallow(<LocaleSelector {...props} />).dive()
    expect(wrapper.find('ButtonGroup')).toHaveLength(1)
    expect(wrapper.find('Button.locale-selector'))
      .toHaveLength(props.localeOptions.length)
  })

  it('should call change func with corrects args when clicking a btn', () => {
    const change = sinon.spy()
    const props = {
      localeOptions: ['ch-HK', 'kr-SK', 'sp-AR'],
      handleChange: change,
    }

    const wrapper = shallow(<LocaleSelector {...props} />).dive()
    wrapper.find('Button').first().simulate('click')
    expect(change.calledWith(props.localeOptions[0])).toBeTruthy()
  })
})
