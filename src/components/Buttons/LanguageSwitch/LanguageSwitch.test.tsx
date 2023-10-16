import React, { useContext } from 'react'
import { describe, expect, it } from 'vitest'

import { LANG_TEXT_MAP } from '~/common/enums'
import { fireEvent, render, screen, within } from '~/common/utils/test'
import { LanguageContext, LanguageSwitch } from '~/components'
import { UserLanguage } from '~/gql/graphql'

const TEST_ID_CURRENT_LANG = '_TEST_ID_CURRENT_LANG'

const Lang = () => {
  const { lang } = useContext(LanguageContext)
  return <div data-test-id={TEST_ID_CURRENT_LANG}>{lang}</div>
}

describe('<LanguageSwitch>', () => {
  it('should render the language switch menu', () => {
    // get current language
    // TODO: get current language from context directly
    const { unmount } = render(<Lang />)
    const lang = screen.getByTestId(TEST_ID_CURRENT_LANG).textContent
    expect([
      UserLanguage.En,
      UserLanguage.ZhHans,
      UserLanguage.ZhHant,
    ]).toContain(lang)
    unmount()

    // render <LanguageSwitch>
    render(<LanguageSwitch />)
    const $langBtn = screen.getByRole('button', {
      name: (LANG_TEXT_MAP as any)[lang!],
    })
    expect($langBtn).toBeDefined()

    // click the language button and expand the menu
    fireEvent.click($langBtn)
    const targetLang =
      lang === UserLanguage.En ? UserLanguage.ZhHans : UserLanguage.En
    const $targetLangMenuItem = screen.getByRole('menuitem', {
      name: (LANG_TEXT_MAP as any)[targetLang],
    })
    expect($targetLangMenuItem).toBeDefined()

    // click the target language button
    const $targetLangBtn = within($targetLangMenuItem).getByText(
      (LANG_TEXT_MAP as any)[targetLang]
    )
    fireEvent.click($targetLangBtn)

    // get current language
    render(<Lang />)
    const newLang = screen.getByTestId(TEST_ID_CURRENT_LANG).textContent
    expect(newLang).toBe(targetLang)
  })
})
