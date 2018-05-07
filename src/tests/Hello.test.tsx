import * as React from 'react'
import * as Promise from 'bluebird'
import * as sinon from 'sinon'
import { shallow, ShallowWrapper } from 'enzyme'
import HelloContainer from '../containers/Hello'

const debug = require('debug')('tests')

describe('<Hello />', () => {

  it('should load a page with basic features', () => {
    let wrapper = shallow(<HelloContainer />).dive()
    wrapper = wrapper.find('.main-container')
    expect(wrapper).toHaveLength(1)

    expect(wrapper.find('.locale-selector-container')).toHaveLength(1)
    expect(wrapper.find('.greeting')).toHaveLength(1)
    expect(wrapper.find('Input[name="query"][type="text"]')).toHaveLength(1)
  })

  it('should load channel list when entering a channel name', () => {
    const channelName = 'vlogbrothers'

    const wrapper = shallow(<HelloContainer />).dive()
    wrapper.find('Input')
      .simulate('change', {target: {value: channelName}})

    const comboContainer = wrapper.find('.channel-combo-container')
    expect(comboContainer).toHaveLength(1)

    // dives into the container to find the list
    const comboList = comboContainer.childAt(0).dive().dive()
    expect(comboList).toHaveLength(1)

    return Promise.delay(3000)
      .then(() => {
        comboList.update()
        const loaded = comboList.find('.channel-snippet-loaded')
        expect(loaded.length)
          .toBeGreaterThan(0)
        expect(loaded.first().find('.channel-snippet-img')).toHaveLength(1)
        expect(loaded.first().find('.channel-snippet-title')).toHaveLength(1)
      })
  })

  it('should load channel data when selecting a channel', () => {
    const channelName = 'ten minute bible hour'

    const wrapper = shallow(<HelloContainer />).dive()
    wrapper.find('Input')
      .simulate('change', {target: {value: channelName}})
    const comboList = wrapper.find('.channel-combo-container').children()
      .first().dive().dive()

    return Promise.delay(3000)
      .then(() => {
        comboList.update()
        comboList
          .find('.channel-snippet-loaded').first()
          .simulate('click')
      })
      .delay(1000)
      .then(() => {
        wrapper.update()
        const container = wrapper.find('.channel-container')
        expect(container).toHaveLength(1)
        const jumbo = container.childAt(0).dive().dive()
        expect(jumbo.find('.channel-jumbo')).toHaveLength(1)
        expect(jumbo.find('.channel-link')).toHaveLength(1)
        expect(jumbo.find('.channel-img')).toHaveLength(1)
        expect(jumbo.find('.channel-title')).toHaveLength(1)
        expect(jumbo.find('.channel-description')).toHaveLength(1)
      })
  })
})
