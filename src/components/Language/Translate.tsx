import React from 'react'

import { translate } from '~/common/utils'

import { LanguageConsumer } from './LanguageContext'

/**
 * Translate in a given language or current language
 *
 * Usage:
 *
 * ```tsx *
 * // current language in context
 * <Translate zh_hant='熱議話題' zh_hans='热议话题' />
 *
 * // given language
 * <Translate zh_hant='排序' zh_hans='排序' en='Sort By' lang="en" />
 * ```
 */
export const Translate = React.memo((props: TranslateArgs) => {
  const { lang } = props

  if (lang) {
    return <>{translate({ lang, ...props })}</>
  }

  return (
    <LanguageConsumer>
      {({ lang: currentLang }) => translate({ lang: currentLang, ...props })}
    </LanguageConsumer>
  )
})
