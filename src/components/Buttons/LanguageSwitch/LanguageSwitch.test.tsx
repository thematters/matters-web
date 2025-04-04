import React from 'react'
import { describe, expect, it } from 'vitest'

import { LANG_TEXT_MAP } from '~/common/enums'
import { fireEvent, render, screen, within } from '~/common/utils/test'
import { LanguageSwitch } from '~/components'
import { UserLanguage } from '~/gql/graphql'

// Reverse mapping, used to look up language codes from display text
const LANG_TEXT_MAP_REVERSE = Object.fromEntries(
  Object.entries(LANG_TEXT_MAP).map((a) => a.reverse())
)

describe('LanguageSwitch', () => {
  describe('Rendering and Interaction', () => {
    it('should correctly render the language switch button', () => {
      render(<LanguageSwitch />)

      const languageButtons = screen.getAllByRole('button')
      const currentLanguageButton = languageButtons[0]

      expect(currentLanguageButton).toBeInTheDocument()
      expect(Object.values(LANG_TEXT_MAP)).toContain(
        currentLanguageButton.textContent
      )
    })

    it('should display language menu when button is clicked', () => {
      render(<LanguageSwitch />)

      const languageButtons = screen.getAllByRole('button')
      const currentLanguageButton = languageButtons[0]

      // Click the button to expand the menu
      fireEvent.click(currentLanguageButton)

      // Check if the menu is expanded and displays all language options
      Object.values(LANG_TEXT_MAP).forEach((langText) => {
        // Skip the current language as it won't be shown in the dropdown
        if (langText !== currentLanguageButton.textContent) {
          const menuItem = screen.getByRole('menuitem', { name: langText })
          expect(menuItem).toBeInTheDocument()
        }
      })
    })
  })

  describe('Language Switching', () => {
    it('should switch from one language to another', () => {
      render(<LanguageSwitch />)

      // Get the current language
      const languageButtons = screen.getAllByRole('button')
      const currentLanguageButton = languageButtons[0]
      const currentLangText = currentLanguageButton.textContent || ''
      const currentLang = LANG_TEXT_MAP_REVERSE[currentLangText]

      // Determine the target language (switch between English and Simplified Chinese)
      const targetLang =
        currentLang === UserLanguage.En ? UserLanguage.ZhHans : UserLanguage.En
      const targetLangText = LANG_TEXT_MAP[targetLang]

      // Click the current language button to expand the menu
      fireEvent.click(currentLanguageButton)

      // Find and click the target language option
      const targetMenuItem = screen.getByRole('menuitem', {
        name: targetLangText,
      })
      const targetButton = within(targetMenuItem).getByText(targetLangText)
      fireEvent.click(targetButton)

      // Verify the language has been switched
      const updatedLanguageButtons = screen.getAllByRole('button')
      const updatedLanguageButton = updatedLanguageButtons[0]
      expect(updatedLanguageButton.textContent).toBe(targetLangText)
      expect(updatedLanguageButton.textContent).not.toBe(currentLangText)
    })

    it('should switch between all supported languages', () => {
      // This test is only applicable when there are three or more languages
      if (Object.keys(LANG_TEXT_MAP).length >= 3) {
        render(<LanguageSwitch />)

        // Get the current language
        let languageButtons = screen.getAllByRole('button')
        let currentLanguageButton = languageButtons[0]
        const initialLangText = currentLanguageButton.textContent || ''

        // Test cycling through all languages
        for (const [langText] of Object.entries(LANG_TEXT_MAP)) {
          // Skip the currently selected language
          if (langText === currentLanguageButton.textContent) continue

          // Click to expand the menu
          fireEvent.click(currentLanguageButton)

          // Find and click the target language
          const menuItem = screen.getByRole('menuitem', { name: langText })
          const langButton = within(menuItem).getByText(langText)
          fireEvent.click(langButton)

          // Verify the switch was successful
          languageButtons = screen.getAllByRole('button')
          currentLanguageButton = languageButtons[0]
          expect(currentLanguageButton.textContent).toBe(langText)
        }

        // Verify we can go back to the initial language
        fireEvent.click(currentLanguageButton)
        const initialMenuItem = screen.getByRole('menuitem', {
          name: initialLangText,
        })
        const initialButton = within(initialMenuItem).getByText(initialLangText)
        fireEvent.click(initialButton)

        languageButtons = screen.getAllByRole('button')
        currentLanguageButton = languageButtons[0]
        expect(currentLanguageButton.textContent).toBe(initialLangText)
      }
    })
  })
})
