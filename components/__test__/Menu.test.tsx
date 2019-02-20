import React from 'react'
import { render } from 'react-testing-library'

import { Menu } from '../Menu'

test('Menu default style match snapshot', () => {
  const { container } = render(<Menu />)
  expect(container.firstChild).toMatchSnapshot()
})
