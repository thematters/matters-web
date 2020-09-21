import _get from 'lodash/get'

import { OAUTH_SCOPE_TREE } from '~/common/enums'

const iterateScopeTexts = (
  scopes: { [key: string]: any },
  lang: Language,
  scopeTexts: string[]
) => {
  // retrieve root scope's _t
  if (scopes._t && scopes._t[lang]) {
    scopeTexts.push(scopes._t[lang])
    return
  }

  // retrieve all nested scopes' _t
  Object.keys(scopes).forEach((key) => {
    if (key === lang) {
      scopeTexts.push(scopes[key])
    }

    if (typeof scopes[key] === 'object') {
      iterateScopeTexts(scopes[key], lang, scopeTexts)
    }
  })
}

export const toReadableScope = ({
  scope,
  lang,
}: {
  scope: string
  lang: Language
}): string => {
  const scopeTree = _get(OAUTH_SCOPE_TREE, scope.replace(/:/g, '.'))

  if (!scopeTree) {
    return scope
  }

  const scopeTexts: string[] = []
  iterateScopeTexts(scopeTree, lang, scopeTexts)

  let prefix = ''
  if (scope.indexOf('query') >= 0) {
    prefix = {
      zh_hant: '讀取你的',
      zh_hans: '读取你的',
      en: 'Query your',
    }[lang]
  }

  return prefix + scopeTexts.join('、')
}
