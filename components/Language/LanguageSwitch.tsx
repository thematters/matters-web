import React from 'react'
import { LanguageConsumer } from './LanguageContext'

export const LanguageSwitch = () => (
  <LanguageConsumer>
    {({ setLang, lang }) => (
      <select onChange={e => setLang(e.target.value as Language)} value={lang}>
        <option value="zh_hant">繁體</option>
        <option value="zh_hans">简体</option>
      </select>
    )}
  </LanguageConsumer>
)
