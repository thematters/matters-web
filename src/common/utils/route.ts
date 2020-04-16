import Router, { NextRouter } from 'next/router'
import pathToRegexp from 'path-to-regexp'
import queryString from 'query-string'
import { UrlObject } from 'url'

import { PATHS, ROUTES, toExpressPath } from '~/common/enums'

import { parseURL } from './url'

export type Url = string | UrlObject

interface ArticleArgs {
  slug: string
  mediaHash: string | null
  author: {
    userName: string | null
  }
}

interface CommentArgs {
  id: string
  article: ArticleArgs
  parentComment: {
    id: string
  } | null
}

type ToPathArgs =
  | {
      page: 'articleDetail'
      article: ArticleArgs
      fragment?: string
    }
  | {
      page: 'commentDetail'
      comment: CommentArgs
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
export const toPath = (args: ToPathArgs): { href: Url; as: string } => {
  switch (args.page) {
    case 'articleDetail': {
      const {
        slug,
        mediaHash,
        author: { userName },
      } = args.article
      const asUrl = `/@${userName}/${slug}-${mediaHash}`

      return {
        href: {
          pathname: PATHS.ARTICLE_DETAIL,
          query: { userName, slug, mediaHash },
        },
        as: args.fragment ? `${asUrl}#${args.fragment}` : asUrl,
      }
    }
    case 'commentDetail': {
      const { parentComment, id, article } = args.comment
      const fragment = parentComment?.id ? `${parentComment.id}-${id}` : id

      return toPath({
        page: 'articleDetail',
        article,
        fragment,
      })
    }
    case 'draftDetail': {
      return {
        href: {
          pathname: PATHS.ME_DRAFT_DETAIL,
          query: { id: args.id, slug: args.slug },
        },
        as: `/me/drafts/${args.slug}-${args.id}`,
      }
    }
    case 'tagDetail': {
      return {
        href: {
          pathname: PATHS.TAG_DETAIL,
          query: { id: args.id },
        },
        as: `/tags/${args.id}`,
      }
    }
    case 'userProfile': {
      return {
        href: {
          pathname: PATHS.USER_ARTICLES,
          query: { userName: args.userName },
        },
        as: `/@${args.userName}`,
      }
    }
    case 'userComments': {
      return {
        href: {
          pathname: PATHS.USER_COMMENTS,
          query: { userName: args.userName },
        },
        as: `/@${args.userName}/comments`,
      }
    }
    case 'userFollowers': {
      return {
        href: {
          pathname: PATHS.USER_FOLLOWERS,
          query: { userName: args.userName },
        },
        as: `/@${args.userName}/followers`,
      }
    }
    case 'userFollowees': {
      return {
        href: {
          pathname: PATHS.USER_FOLLOWEES,
          query: { userName: args.userName },
        },
        as: `/@${args.userName}/followees`,
      }
    }
    case 'search': {
      const typeStr = args.type ? `&type=${args.type}` : ''
      return {
        href: `${PATHS.SEARCH}?q=${args.q || ''}${typeStr}`,
        as: `${PATHS.SEARCH}?q=${args.q || ''}${typeStr}`,
      }
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
  key,
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
  const target = encodeURIComponent((qs.target as string) || '')
  return target
}

export const getEncodedCurrent = () => {
  return encodeURIComponent(window.location.href)
}

/**
 * Redirect to "?target=" or fallback URL with page reload.
 *
 * (works on CSR)
 */
export const redirectToTarget = ({
  fallback = 'current',
}: {
  fallback?: 'homepage' | 'current'
} = {}) => {
  const fallbackTarget =
    fallback === 'homepage'
      ? `/?t=${Date.now()}` // FIXME: to purge cache
      : window.location.href
  const target = getTarget() || fallbackTarget

  window.location.href = decodeURIComponent(target)
}

/**
 * Redirect to login page without page reload.
 *
 * (works on CSR)
 */
export const redirectToLogin = () => {
  const target = getTarget() || getEncodedCurrent()

  return routerPush(`${PATHS.LOGIN}?target=${target}`)
}

/**
 * Append `?target` to the given path.
 *
 * (works on SSR & CSR)
 */
export const appendTarget = (href: string, fallbackCurrent?: boolean) => {
  let target = ''

  if (process.browser) {
    target = getTarget()
    target = fallbackCurrent ? getEncodedCurrent() : target
  }

  if (target) {
    return {
      href: `${href}?target=${target}`,
    }
  } else {
    return {
      href,
    }
  }
}

/**
 * Scroll to page top after `Route.push`
 *
 * @see {@url https://github.com/zeit/next.js/blob/canary/packages/next/client/link.tsx#L203-L211}
 * @see {@url https://github.com/zeit/next.js/issues/3249#issuecomment-574817539}
 */
export const routerPush = (url: Url, as?: Url, options?: {}) => {
  Router.push(url, as, options).then((success: boolean) => {
    if (!success) {
      return
    }

    window.scrollTo(0, 0)
    document.body.focus()
  })
}

/**
 * Capture <a> clicks, and `Router.push` if there's a matching route.
 *
 * @see {@url https://github.com/STRML/react-router-component/blob/e453e24342c12a2fcfd7d7ba797be18415f9a497/lib/CaptureClicks.js}
 */
export const captureClicks = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  // Ignore canceled events, modified clicks, and right clicks.
  if (e.defaultPrevented) {
    return
  }

  if (e.metaKey || e.ctrlKey || e.shiftKey) {
    return
  }

  if (e.button !== 0) {
    return
  }

  // Get the <a> element.
  let el = e.target as HTMLAnchorElement
  while (el && el.nodeName !== 'A') {
    el = el.parentNode as HTMLAnchorElement
  }

  // Ignore clicks from non-a elements.
  if (!el) {
    return
  }

  // Ignore hash (used often instead of javascript:void(0) in strict CSP envs)
  if (el.getAttribute('href') === '#') {
    return
  }

  const url = parseURL(el.href)
  const windowURL = parseURL(window.location.href)

  // Ignore links that don't share a protocol and host with ours.
  if (url.protocol !== windowURL.protocol || url.host !== windowURL.host) {
    return
  }

  // Prevent :focus from sticking; preventDefault() stops blur in some browsers
  el.blur()
  e.preventDefault()

  /**
   * Matching defined routes
   *
   * Note:
   * We are using the same version (0.1.7) of `path-to-regexp` as Express.js 4.x,
   * different from the version used by Next.js (6.x).
   *
   * They have different behaviors about wildcard asterisk (*), see below link.
   *
   * Once the custom routes (`src/server.ts`) is deprecated,
   * it should be synchronized with Next.js.
   *
   * @see {@url https://github.com/pillarjs/path-to-regexp#compatibility-with-express--4x}
   */
  let matched = {}
  ROUTES.some(({ pathname }) => {
    console.log({ pathname })
    const keys: PathToRegExpKey[] = []
    const regexp = pathToRegexp(toExpressPath(pathname), keys)
    const result = regexp.exec(url.pathname)

    if (result) {
      const searchQuery = queryString.parse(url.search) || {}
      const matchedQuery: { [key: string]: string } = {}
      keys.forEach((k, i) => (matchedQuery[k.name] = result[i + 1]))

      matched = {
        pathname,
        query: {
          ...searchQuery,
          ...matchedQuery,
        },
      }
      return true
    }
  })

  if (matched) {
    routerPush(matched, url)
  }
}
