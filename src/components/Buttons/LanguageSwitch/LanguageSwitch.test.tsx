import { renderHook } from '@testing-library/react-hooks'
import React, { useContext } from 'react'
import { describe, expect, it } from 'vitest'

import { LANG_TEXT_MAP } from '~/common/enums'
import { fireEvent, render, screen, within, wrapper } from '~/common/utils/test'
import { LanguageContext, LanguageSwitch } from '~/components'
import { UserLanguage } from '~/gql/graphql'

describe('<LanguageSwitch>', () => {
  it('should render the language switch menu', () => {
    // get current language
    const { result } = renderHook(() => useContext(LanguageContext), {
      wrapper,
    })
    const lang = result.current.lang
    expect([
      UserLanguage.En,
      UserLanguage.ZhHans,
      UserLanguage.ZhHant,
    ]).toContain(lang)

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
    const { result: newResult } = renderHook(
      () => useContext(LanguageContext),
      { wrapper }
    )
    const newLang = newResult.current.lang
    expect(newLang).toBe(targetLang)
  })
})
