import { mount } from 'enzyme'
import React from 'react'

import { analytics } from '~/common/utils'

import { AnalyticsListener } from './AnalyticsListener'

let globalDocument = global as (NodeJS.Global & { analytics?: any })
let wrapper: any

beforeEach(() => {
  globalDocument.analytics = {
    track: jest.fn(),
    page: jest.fn(),
    identify: jest.fn()
  }
})

afterEach(() => {
  globalDocument = global
  wrapper.unmount()
})

test.skip('Invokes global track method if receives custom event with type track', () => {
  wrapper = mount(<AnalyticsListener user={{}} />)
  // expect(global.analytics.track.mock.calls.length).toBe(0)
  // expect(global.analytics.identify.mock.calls.length).toBe(0)
  // expect(global.analytics.page.mock.calls.length).toBe(0)
  analytics.trackEvent('foo')
  expect(globalDocument.analytics.track.mock.calls.length).toBe(1)
  // expect(global.analytics.identify.mock.calls.length).toBe(0)
  // expect(global.analytics.page.mock.calls.length).toBe(0)
})
