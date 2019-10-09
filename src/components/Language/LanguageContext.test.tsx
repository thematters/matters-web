import { render } from '@testing-library/react'
import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'

import { LanguageConsumer, LanguageProvider } from './LanguageContext'

test('can switch language', async () => {
  const testLang = 'zh_hans'
  const spy = jest.fn()

  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <LanguageProvider defaultLang={testLang}>
        <LanguageConsumer>{({ lang }) => spy(lang)}</LanguageConsumer>
      </LanguageProvider>
    </MockedProvider>
  )

  expect(spy.mock.calls[0][0]).toBe(testLang)
})
