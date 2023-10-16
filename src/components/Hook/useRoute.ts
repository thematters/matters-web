import { useRouter } from 'next/router'

import { PATHS } from '~/common/enums'
import { toUserLanguage } from '~/common/utils'
import { UserLanguage } from '~/gql/graphql'

/**
 * Utilities for route
 *
 * Usage:
 *
 * ```tsx
 *   const { isInPath, isPathStartWith, getQuery, router } = useRoute()
 * ```
 */
type QueryKey =
  | 'name' // circle or user name
  | 'mediaHash'
  | 'draftId'
  | 'tagId'
  | 'collectionId'
  | 'q'
  | 'type'
  | 'provider'
  | 'locale'
  | string

export const useRoute = () => {
  const router = useRouter()

  // Match the path
  const isInPath = (key: keyof typeof PATHS) => router.pathname === PATHS[key]
  const isPathStartWith = (start: string, useAsPath?: boolean) =>
    new RegExp(`^${start}`, 'ig').test(
      useAsPath ? router.asPath : router.pathname
    )

  // Get a specific query value from `NextRouter` by `key`
  const getQuery = (key: QueryKey) => {
    const value = router.query && router.query[key]
    let query = value instanceof Array ? value[0] : value || ''

    switch (key) {
      case 'name':
        query = query.replace(/[@~～]/g, '')
        break
      case 'mediaHash':
        query = query.split('-').slice(-1)[0]
        break
    }

    return query || ''
  }

  const setQuery = (key: QueryKey, value: string) => {
    const query = { ...router.query, [key]: value }
    router.push({ query })
  }

  const replaceQuery = (key: QueryKey, value: string) => {
    const query = { ...router.query, [key]: value }
    router.replace({ query })
  }

  // i18n
  const locale = getQuery('locale')
  const routerLang = toUserLanguage(locale) as UserLanguage

  return {
    isInPath,
    isPathStartWith,
    getQuery,
    setQuery,
    replaceQuery,
    router,
    routerLang,
  }
}
