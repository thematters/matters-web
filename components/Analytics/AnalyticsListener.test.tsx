import { render, wait } from '@testing-library/react'
import React from 'react'

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
  const tracker = ['test-event', { some: 'detail' }]
  render(<AnalyticsListener user={{}} />)
  analytics.trackEvent(...tracker)
  await wait(() => {
    expect(mockAnalytics.track.mock.calls[0]).toEqual(tracker)
  })
})

test('Invokes page method with trackPage', async () => {
  const tracker = ['test-page', { some: 'detail' }]
  render(<AnalyticsListener user={{}} />)
  analytics.trackPage(...tracker)
  await wait(() => {
    expect(mockAnalytics.page.mock.calls[0]).toEqual(tracker)
    expect(mockGA.mock.calls.length).toBeTruthy()
  })
})

test('Invokes identify method with identifyUser', async () => {
  const tracker = { eventType: 'identify' }
  render(<AnalyticsListener user={{}} />)
  analytics.identifyUser(tracker)
  await wait(() => {
    expect(mockAnalytics.identify.mock.calls.length).toBeTruthy()
  })
})
