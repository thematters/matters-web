import React from 'react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import './styles.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphonex',
  },
}

export const decorators = [
  (Story) => (
    <>
      <Story />
    </>
  ),
]
