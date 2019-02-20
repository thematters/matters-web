import React from 'react'
import { render } from 'react-testing-library'

import { Avatar } from '../Avatar'

test('Avatar default style match snapshot', () => {
  const { container } = render(<Avatar />)
  expect(container.firstChild).toMatchSnapshot()
})
