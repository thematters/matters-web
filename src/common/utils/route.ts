import _get from 'lodash/get'
import Router, { NextRouter } from 'next/router'
import queryString from 'query-string'

import { PATHS } from '~/common/enums'

type ToPathArgs =
  | {
      page: 'articleDetail'
      userName: string
      slug: string
      mediaHash: string
      fragment?: string
    }
  | { page: 'draftDetail'; id: string; slug: string }
  | {
      page: 'tagDetail'
      id: string
    }
  | {
      page: 'userProfile'
      userName: string
    }
  | {
      page: 'userComments'
      userName: string
    }
  | {
      page: 'userDrafts'
      userName: string
    }
  | {
      page: 'userBookmarks'
      userName: string
    }
  | {
      page: 'userHistory'
      userName: string
    }
  | {
      page: 'userFollowers'
      userName: string
    }
  | {
      page: 'userFollowees'
      userName: string
    }
  | {
      page: 'search'
      q?: string
      type?: 'article' | 'tag' | 'user'
    }

/**
 * Get `href` and `as` for `<Link>` with `args`
 *
 * (works on SSR & CSR)
 */
export const toPath = (args: ToPathArgs): { href: string; as: string } => {
  switch (args.page) {
    case 'articleDetail':
      const asUrl = `/@${args.userName}/${args.slug}-${args.mediaHash}`
      return {
        href: `${PATHS.ARTICLE_DETAIL.href}?userName=${args.userName}&slug=${args.slug}&mediaHash=${args.mediaHash}`,
        as: args.fragment ? `${asUrl}#${args.fragment}` : asUrl
      }
    case 'draftDetail':
      return {
        href: `${PATHS.ME_DRAFT_DETAIL.href}?id=${args.id}&slug=${args.slug}`,
        as: `/me/drafts/${args.slug}-${args.id}`
      }
    case 'tagDetail':
      return {
        href: `${PATHS.TAG_DETAIL.href}?id=${args.id}`,
        as: `/tags/${args.id}`
      }
    case 'userProfile':
      return {
        href: `${PATHS.USER_ARTICLES.href}?userName=${args.userName}`,
        as: `/@${args.userName}`
      }
    case 'userComments':
      return {
        href: `${PATHS.USER_COMMENTS.href}?userName=${args.userName}`,
        as: `/@${args.userName}/comments`
      }
    case 'userDrafts':
      return {
        href: `${PATHS.USER_DRAFTS.href}?userName=${args.userName}`,
        as: `/@${args.userName}/drafts`
      }
    case 'userBookmarks':
      return {
        href: `${PATHS.USER_BOOKMARKS.href}?userName=${args.userName}`,
        as: `/@${args.userName}/bookmarks`
      }
    case 'userHistory':
      return {
        href: `${PATHS.USER_HISTORY.href}?userName=${args.userName}`,
        as: `/@${args.userName}/history`
      }
    case 'userFollowers':
      return {
        href: `${PATHS.USER_FOLLOWERS.href}?userName=${args.userName}`,
        as: `/@${args.userName}/followers`
      }
    case 'userFollowees':
      return {
        href: `${PATHS.USER_FOLLOWEES.href}?userName=${args.userName}`,
        as: `/@${args.userName}/followees`
      }
    case 'search':
      const typeStr = args.type ? `&type=${args.type}` : ''
      return {
        href: `${PATHS.SEARCH.href}?q=${args.q || ''}${typeStr}`,
        as: `${PATHS.SEARCH.as}?q=${args.q || ''}${typeStr}`
      }
  }
}

/**
 * Get a specific query value from `NextRouter` by `key`
 *
 * (works on SSR & CSR)
 */
export const getQuery = ({
  router,
  key
}: {
  router: NextRouter
  key: string
}) => {
  const value = router.query && router.query[key]
  return value instanceof Array ? value[0] : value
}

export const getTarget = (url?: string) => {
  url = url || window.location.href
  const qs = queryString.parseUrl(url).query
  const target = encodeURIComponent((qs.target as string) || url)
  return target
}

/**
 * Redirect to "?target=" or fallback URL with page reload.
 *
 * (works on CSR)
 */
export const redirectToTarget = ({
  fallback = 'current'
}: {
  fallback?: 'homepage' | 'current'
} = {}) => {
  const fallbackTarget = fallback === 'homepage' ? '/' : window.location.href
  const target = getTarget() || fallbackTarget

  window.location.href = decodeURIComponent(target)
}

/**
 * Redirect to login page without page reload.
 *
 * (works on CSR)
 */
export const redirectToLogin = () => {
  const target = getTarget()

  return Router.push(
    `${PATHS.AUTH_LOGIN.href}?target=${target}`,
    `${PATHS.AUTH_LOGIN.as}?target=${target}`
  )
}

/**
 * Append `?target` to `PATHS.xxx`.
 *
 * (works on SSR & CSR)
 */
export const appendTarget = ({ href, as }: { href: string; as: string }) => {
  let target = ''

  if (process.browser) {
    target = getTarget()
  }

  return {
    href: `${href}?target=${target}`,
    as: `${as}?target=${target}`
  }
}
