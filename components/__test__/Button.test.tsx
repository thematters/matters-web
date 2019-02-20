import React from 'react'
import { render } from 'react-testing-library'

import { Button } from '../Button'

test('Button default style match snapshot', () => {
  const { container } = render(<Button>test</Button>)
  expect(container.firstChild).toMatchSnapshot()
})
