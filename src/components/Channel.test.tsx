import { shallow } from 'enzyme'
import * as React from 'react'
import Channel from '../components/Channel'

describe('<Channel />', function() {
  it('should load a Channel data into a jumbotron', () => {
    const props = {
      title: 'title',
      description: 'description',
      channelId: 'channelId',
      thumbnails: { high: { url: 'https://randomurl' } },
    }

    const wrapper = shallow(<Channel {...props} />).dive() // dives past the HOC
    expect(wrapper.find('.channel-jumbo')).toHaveLength(1)
    expect(wrapper.find('.channel-img').props().src).toBe(props.thumbnails.high.url)
    expect(wrapper.find('.channel-title').text()).toBe(props.title)
    expect(wrapper.find('.channel-description').text()).toBe(props.description)
    expect(wrapper.find('.channel-link').props().href)
      .toBe(`https://www.youtube.com/channel/${props.channelId}`)
  })
})
