import { render } from '@testing-library/react'
import React from 'react'

import { Menu } from '../Menu'

test('Menu default style match snapshot', () => {
  const { container } = render(<Menu />)
  expect(container.firstChild).toMatchSnapshot()
})
