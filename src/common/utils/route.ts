import Router, { NextRouter } from 'next/router'
import queryString from 'query-string'
import { UrlObject } from 'url'

import { PATHS, ROUTES } from '~/common/enums'

import { parseURL } from './url'

declare type Url = UrlObject | string

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
export const toPath = (args: ToPathArgs): { href: string; as: string } => {
  switch (args.page) {
    case 'articleDetail': {
      const {
        slug,
        mediaHash,
        author: { userName },
      } = args.article
      const asUrl = `/@${userName}/${slug}-${mediaHash}`

      return {
        href: `${PATHS.ARTICLE_DETAIL.href}?userName=${userName}&slug=${slug}&mediaHash=${mediaHash}`,
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
        href: `${PATHS.ME_DRAFT_DETAIL.href}?id=${args.id}&slug=${args.slug}`,
        as: `/me/drafts/${args.slug}-${args.id}`,
      }
    }
    case 'tagDetail': {
      return {
        href: `${PATHS.TAG_DETAIL.href}?id=${args.id}`,
        as: `/tags/${args.id}`,
      }
    }
    case 'userProfile': {
      return {
        href: `${PATHS.USER_ARTICLES.href}?userName=${args.userName}`,
        as: `/@${args.userName}`,
      }
    }
    case 'userComments': {
      return {
        href: `${PATHS.USER_COMMENTS.href}?userName=${args.userName}`,
        as: `/@${args.userName}/comments`,
      }
    }
    case 'userFollowers': {
      return {
        href: `${PATHS.USER_FOLLOWERS.href}?userName=${args.userName}`,
        as: `/@${args.userName}/followers`,
      }
    }
    case 'userFollowees': {
      return {
        href: `${PATHS.USER_FOLLOWEES.href}?userName=${args.userName}`,
        as: `/@${args.userName}/followees`,
      }
    }
    case 'search': {
      const typeStr = args.type ? `&type=${args.type}` : ''
      return {
        href: `${PATHS.SEARCH.href}?q=${args.q || ''}${typeStr}`,
        as: `${PATHS.SEARCH.as}?q=${args.q || ''}${typeStr}`,
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

  return routerPush(
    `${PATHS.AUTH_LOGIN.href}?target=${target}`,
    `${PATHS.AUTH_LOGIN.as}?target=${target}`
  )
}

/**
 * Append `?target` to `PATHS.xxx`.
 *
 * (works on SSR & CSR)
 */
export const appendTarget = ({
  href,
  as,
  fallbackCurrent,
}: {
  href: string
  as: string
  fallbackCurrent?: boolean
}) => {
  let target = ''

  if (process.browser) {
    target = getTarget()
    target = fallbackCurrent ? getEncodedCurrent() : target
  }

  if (target) {
    return {
      href: `${href}?target=${target}`,
      as: `${as}?target=${target}`,
    }
  } else {
    return {
      href,
      as,
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

  // push if it's matched defined routes
  let matched = false
  ROUTES.some(({ regexp }) => {
    if (regexp.test(url.pathname)) {
      matched = true
      return true
    }
  })

  if (matched) {
    // TODO: generate href & as
    routerPush(url.pathname, el.href)
  }
}
