import React from 'react'
import { render } from 'react-testing-library'

import { LanguageConsumer, LanguageProvider } from './LanguageContext'

test('can switch language', async () => {
  const testLang = 'zh_hans'
  const spy = jest.fn()

  render(
    <LanguageProvider defaultLang={testLang}>
      <LanguageConsumer>{({ lang }) => spy(lang)}</LanguageConsumer>
    </LanguageProvider>
  )

  expect(spy.mock.calls[0][0]).toBe(testLang)
})
