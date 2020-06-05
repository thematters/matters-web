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

export const Translate = React.memo(BaseTranslate, (prev, next) => {
  if ('id' in prev && 'id' in next) {
    return prev.id === next.id
  }
  if ('zh_hant' in prev && 'zh_hant' in next) {
    return prev.zh_hant === next.zh_hant
  }
  return prev.lang === next.lang
}) as MemoedTranslate
