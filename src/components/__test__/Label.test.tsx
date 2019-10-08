import { render } from '@testing-library/react'
import React from 'react'

import { Label } from '../Label'

test('Label default style match snapshot', () => {
  const { container } = render(<Label />)
  expect(container.firstChild).toMatchSnapshot()
})
