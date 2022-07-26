import React from 'react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import { GlobalStyles } from '../src/components/GlobalStyles'

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
      <GlobalStyles />

      <Story />

      <style jsx global>
        {`
          //background color should be controled by storybook
          html {
            background-color: initial;
          }
        `}
      </style>
    </>
  ),
]
