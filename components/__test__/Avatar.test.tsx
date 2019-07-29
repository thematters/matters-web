import { render } from '@testing-library/react'
import React from 'react'

import { Avatar } from '../Avatar'

test('Avatar default style match snapshot', () => {
  const { container } = render(<Avatar />)
  expect(container.firstChild).toMatchSnapshot()
})
