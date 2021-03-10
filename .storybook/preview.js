import React from 'react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
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

      <RouterContext.Provider
        value={{
          push: () => Promise.resolve(),
          replace: () => Promise.resolve(),
          prefetch: () => Promise.resolve(),
        }}
      >
        <Story />
      </RouterContext.Provider>

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
