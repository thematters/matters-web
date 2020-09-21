import _get from 'lodash/get'

import { OAUTH_SCOPE_TREE } from '~/common/enums'

export const toReadableScope = ({
  scope,
  lang,
}: {
  scope: string
  lang: Language
}): string => {
  const scopes = scope.split(':')

  const scopeTexts = scopes
    .map((_, index) => {
      const normalizedScope = scopes.slice(0, index + 1).join('.')
      return _get(OAUTH_SCOPE_TREE, `${normalizedScope}._t.${lang}`)
    })
    .filter((t) => !!t)
  const text = scopeTexts.slice(-1)

  if (!text) {
    return scope
  }

  let prefix = ''
  if (scope.indexOf('query') >= 0) {
    prefix = {
      zh_hant: '讀取你的',
      zh_hans: '读取你的',
      en: 'Query your',
    }[lang]
  }

  return prefix + text
}
