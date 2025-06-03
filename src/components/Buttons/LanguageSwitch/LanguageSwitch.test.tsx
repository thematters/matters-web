import React from 'react'
import { describe, expect, it } from 'vitest'

import { LANG_TEXT_MAP } from '~/common/enums'
import { fireEvent, render, screen, within } from '~/common/utils/test'
import { LanguageSwitch } from '~/components'
import { UserLanguage } from '~/gql/graphql'

const LANG_TEXT_MAP_REVERSE = Object.fromEntries(
  Object.entries(LANG_TEXT_MAP).map((a) => a.reverse())
)

describe('<LanguageSwitch>', () => {
  it('should render the language switch menu', () => {
    render(<LanguageSwitch />)
    const $langBtn = screen.getByRole('button')
    expect($langBtn).toBeDefined()
    const lang = LANG_TEXT_MAP_REVERSE[$langBtn.textContent!]

    // click the language button and expand the menu
    fireEvent.click($langBtn)
    const targetLang =
      lang === UserLanguage.En ? UserLanguage.ZhHans : UserLanguage.En
    const targetLangText = LANG_TEXT_MAP[targetLang]
    const $targetLangMenuItem = screen.getByRole('menuitem', {
      name: targetLangText,
    })
    expect($targetLangMenuItem).toBeDefined()

    // click the target language button
    const $targetLangBtn = within($targetLangMenuItem).getByText(targetLangText)
    fireEvent.click($targetLangBtn)

    // get current language
    const $newLangBtn = screen.getByRole('button')
    expect($newLangBtn.textContent).toBe(targetLangText)
  })
})
