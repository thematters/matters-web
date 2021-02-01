import { useRouter } from 'next/router'

import { PATHS } from '~/common/enums'

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
  | 'q'
  | 'type'
  | 'provider'
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
      case 'draftId':
        query = query.split('-').slice(-1)[0]
        break
    }

    return query || ''
  }

  return { isInPath, isPathStartWith, getQuery, router }
}
