import React from 'react'
import { render } from 'react-testing-library'

import { useEventListener } from './useEventListener'

const event = 'test'

const spy = jest.fn()
// Test component that uses the Hook
const EffecfulComponent = () => {
  useEventListener(event, spy)
  return null
}

test('can listen to events', () => {
  render(<EffecfulComponent />)
  // expect(span.textContent).toBe('extra-small')
  window.dispatchEvent(new CustomEvent(event))

  expect(spy.mock.calls.length).toBe(1)
})
