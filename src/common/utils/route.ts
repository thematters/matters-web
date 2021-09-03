import Router from 'next/router'
import { Key, pathToRegexp } from 'path-to-regexp'
import queryString from 'query-string'

import { PATHS, ROUTES } from '~/common/enums'

import { parseURL } from './url'

interface ArticleArgs {
  slug: string
  mediaHash: string | null
  author: {
    userName: string | null
  }
}

interface CircleArgs {
  name: string
}

interface CommentArgs {
  id: string
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
      page: 'circleDetail' | 'circleDiscussion' | 'circleBroadcast'
      circle: CircleArgs
    }
  | {
      page: 'commentDetail'
      comment: CommentArgs
      article: ArticleArgs
    }
  | { page: 'draftDetail'; id: string; slug: string }
  | {
      page: 'tagDetail'
      id: string
    }
  | {
      page:
        | 'userProfile'
        | 'userAbout'
        | 'userAnalytics'
        | 'userManageCircleInvitation'
        | 'userEditTopics'
      userName: string
    }
  | {
      page: 'userTopicDetail'
      userName: string
      id: string
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
export const toPath = (args: ToPathArgs): { href: string } => {
  switch (args.page) {
    case 'articleDetail': {
      const {
        slug,
        mediaHash,
        author: { userName },
      } = args.article
      const asUrl = `/@${userName}/${slug}-${mediaHash}`

      return {
        href: args.fragment ? `${asUrl}#${args.fragment}` : asUrl,
      }
    }
    case 'circleDetail': {
      return {
        href: `/~${args.circle.name}`,
      }
    }
    case 'circleDiscussion': {
      return {
        href: `/~${args.circle.name}/discussion`,
      }
    }
    case 'circleBroadcast': {
      return {
        href: `/~${args.circle.name}/broadcast`,
      }
    }
    case 'commentDetail': {
      const { parentComment, id } = args.comment
      const fragment = parentComment?.id ? `${parentComment.id}-${id}` : id

      return toPath({
        page: 'articleDetail',
        article: args.article,
        fragment,
      })
    }
    case 'draftDetail': {
      return {
        href: `/me/drafts/${args.slug}-${args.id}`,
      }
    }
    case 'tagDetail': {
      return {
        href: `/tags/${args.id}`,
      }
    }
    case 'userProfile': {
      return {
        href: `/@${args.userName}`,
      }
    }
    case 'userAbout': {
      return {
        href: `/@${args.userName}/about`,
      }
    }
    case 'userAnalytics': {
      return {
        href: `/@${args.userName}/analytics`,
      }
    }
    case 'userManageCircleInvitation': {
      return {
        href: `/@${args.userName}/manage-invitation`,
      }
    }
    case 'userTopicDetail': {
      return {
        href: `/@${args.userName}/topics/${args.id}`,
      }
    }
    case 'userEditTopics': {
      return {
        href: `/@${args.userName}/edit-topics`,
      }
    }
    case 'search': {
      const typeStr = args.type ? `&type=${args.type}` : ''
      return {
        href: `${PATHS.SEARCH}?q=${args.q || ''}${typeStr}`,
      }
    }
  }
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
      ? `/` // FIXME: to purge cache
      : window.location.href
  let target = decodeURIComponent(getTarget())

  const isValidTarget = /^((http|https):\/\/)/.test(target)
  if (!isValidTarget) {
    target = fallbackTarget
  }

  window.location.href = target || fallbackTarget
}

/**
 * Redirect to login page without page reload.
 *
 * (works on CSR)
 */
export const redirectToLogin = () => {
  const target = getTarget() || getEncodedCurrent()

  return Router.push(`${PATHS.LOGIN}?target=${target}`)
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
   */
  let matched = {}
  ROUTES.some(({ pathname }) => {
    const keys: Key[] = []
    const path = pathname.replace(/\]/g, '').replace(/\[/g, ':')
    const regexp = pathToRegexp(path, keys)
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
    Router.push(el.href)
  }
}
