import React from 'react'
import { render } from 'react-testing-library'

import { InfiniteScroll } from './InfiniteScroll'

test('trigger loadMore when scrolled', () => {
  const spy = jest.fn()
  render(
    <InfiniteScroll hasNextPage={true} loadMore={spy} loading={false}>
      <div />
    </InfiniteScroll>
  )

  window.dispatchEvent(new Event('scroll'))

  expect(spy.mock.calls.length).toBe(1)
})

test('trigger loadMore when window resize', () => {
  const spy = jest.fn()
  render(
    <InfiniteScroll hasNextPage={true} loadMore={spy} loading={false}>
      <div />
    </InfiniteScroll>
  )

  window.dispatchEvent(new Event('resize'))

  expect(spy.mock.calls.length).toBe(1)
})
