import React from 'react'
import { GlobalStyles } from '../src/components/GlobalStyles'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
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
