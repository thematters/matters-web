import React from 'react'

import { translate, TranslateArgs } from '~/common/utils'

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
 * // with a id of `TEXT`
 * <Translate id='login />
 *
 * // given language
 * <Translate zh_hant='排序' zh_hans='排序' en='Sort By' lang="en" />
 * ```
 */
export type TranslateProps = TranslateArgs

const BaseTranslate = (props: TranslateProps) => {
  const { lang } = props

  if (lang) {
    return <>{translate({ lang, ...props })}</>
  }

  return (
    <LanguageConsumer>
      {({ lang: currentLang }) => translate({ lang: currentLang, ...props })}
    </LanguageConsumer>
  )
}

/**
 * Memoizing
 */
type MemoedTranslate = React.MemoExoticComponent<React.FC<TranslateProps>>

export const Translate = React.memo(
  BaseTranslate,
  ({ lang: prevLang }, { lang }) => prevLang === lang
) as MemoedTranslate
