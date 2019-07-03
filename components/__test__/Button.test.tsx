import { render } from '@testing-library/react'
import React from 'react'

import { Button } from '../Button'

test('Button default style match snapshot', () => {
  const { container } = render(<Button>test</Button>)
  expect(container.firstChild).toMatchSnapshot()
})
