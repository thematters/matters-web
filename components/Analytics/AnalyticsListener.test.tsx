import React from 'react'
import { render, wait } from 'react-testing-library'

import { analytics } from '~/common/utils'

import { AnalyticsListener } from './AnalyticsListener'

const mockAnalytics = {
  track: jest.fn(),
  page: jest.fn(),
  identify: jest.fn()
}

const mockGA = jest.fn()

beforeEach(() => {
  // @ts-ignore
  window.analytics = mockAnalytics
  window.gtag = mockGA
})

test('Invokes track method with trackEvent', async () => {
  const tracker = { eventType: 'track' }
  render(<AnalyticsListener user={{}} />)
  analytics.trackEvent(tracker)
  await wait(() => {
    expect(mockAnalytics.track.mock.calls[0][0]).toBe(tracker)
  })
})

test('Invokes page method with trackPage', async () => {
  const tracker = { eventType: 'page' }
  render(<AnalyticsListener user={{}} />)
  analytics.trackPage(tracker)
  await wait(() => {
    expect(mockAnalytics.page.mock.calls[0][0]).toBe(tracker)
    expect(mockGA.mock.calls.length).toBeTruthy()
  })
})

test('Invokes identify method with identifyUser', async () => {
  const tracker = { eventType: 'identify' }
  render(<AnalyticsListener user={{}} />)
  analytics.identifyUser(tracker)
  await wait(() => {
    expect(mockAnalytics.identify.mock.calls[0][0]).toBe(tracker)
  })
})
