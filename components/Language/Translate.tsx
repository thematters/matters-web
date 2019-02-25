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
 *
 * // dynamic data
 * <Translate
 *    zh_hant={({ date }) => `現在時間 ${date.toTimeString()}`}
 *    zh_hans={({ date }) => `现在时间 ${date.toTimeString()}`}
 *    data={{ date: new Date() }}
 *  />
 * ```
 */

export class Translate<D> extends React.PureComponent<TranslateArgs<D>> {
  public render() {
    const { lang } = this.props

    if (lang) {
      return translate<D>({ lang, ...this.props })
    }

    return (
      <LanguageConsumer>
        {({ lang: currentLang }) =>
          translate<D>({ lang: currentLang, ...this.props })
        }
      </LanguageConsumer>
    )
  }
}
