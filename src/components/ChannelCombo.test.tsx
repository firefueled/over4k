import * as React from 'react'
import * as Promise from 'bluebird'
import { shallow, mount, ShallowWrapper } from 'enzyme'
import ChannelCombo from '../components/ChannelCombo'

describe('<ChannelCombo />', function () {
  it('should load a not found message with a dummy channel name', () => {
    const props = {
      query: 'da98sydh8as87dtyga8',
    }

    const wrapper = shallow(<ChannelCombo {...props} />).dive()
    return Promise.delay(2000)
      .then(() => {
        wrapper.update()
        expect(wrapper.find('.channel-snippet[disabled=true]')).toHaveLength(1)
        expect(wrapper.find('.channel-snippet-title')).toHaveLength(1)
      })
  })

  let listWrapper: ShallowWrapper
  it('should load a channel list with a real channel name', () => {
    const props = {
      query: 'pirula',
    }

    listWrapper = shallow(<ChannelCombo {...props} />).dive()
    expect(listWrapper.find('.channel-combo')).toHaveLength(1)
    expect(listWrapper.find('.channel-snippet-loading')).toHaveLength(1)
    return Promise.delay(2000)
      .then(() => {
        listWrapper.update()
        const loaded = listWrapper.find('.channel-snippet-loaded').length
        expect(loaded).toBeGreaterThan(0)
        expect(loaded).toBeLessThanOrEqual(10)
        expect(listWrapper.find('.channel-snippet-img').length).toEqual(loaded)
        expect(listWrapper.find('.channel-snippet-title').length).toEqual(loaded)
      })
  })

  it('should load a new list when the query changes', () => {
    const props = {
      query: 'not another one !',
    }

    listWrapper.setProps(props)
    return Promise.delay(1000)
      .then(() => {
        listWrapper.update()
        expect(listWrapper.find('.channel-snippet-loading')).toHaveLength(1)
      })
      .delay(1000)
      .then(() => {
        listWrapper.update()
        expect(listWrapper.find('.channel-snippet-loaded').length).toBeGreaterThan(0)
      })
  })
})
