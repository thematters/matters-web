import { render } from '@testing-library/react';
import React from 'react';

import { useEventListener } from './useEventListener';

const event = 'test';

const spy = jest.fn();
// Test component that uses the Hook
const EffecfulComponent = () => {
  useEventListener(event, spy);
  return null;
};

test('can listen to events', () => {
  render(<EffecfulComponent />);
  window.dispatchEvent(new CustomEvent(event));

  expect(spy.mock.calls.length).toBe(1);
});
