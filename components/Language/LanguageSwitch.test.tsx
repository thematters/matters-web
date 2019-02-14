import { mount } from 'enzyme'
import React from 'react'

import { LanguageProvider } from './LanguageContext'
import { LanguageSwitch } from './LanguageSwitch'

test('can switch language', () => {
  const testLang = 'zh_hans'
  const component = mount(
    <LanguageProvider>
      <LanguageSwitch />
    </LanguageProvider>
  )

  component.find('select').simulate('change', {
    target: { value: testLang }
  })

  expect(component.find('select').props().value).toBe(testLang)
})
