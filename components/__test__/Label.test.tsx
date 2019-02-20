import React from 'react'
import { render } from 'react-testing-library'

import { Label } from '../Label'

test('Label default style match snapshot', () => {
  const { container } = render(<Label />)
  expect(container.firstChild).toMatchSnapshot()
})
