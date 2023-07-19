import Router from 'next/router'
import { Key, pathToRegexp } from 'path-to-regexp'

import { PATHS, ROUTES } from '~/common/enums'

import { UtmParams } from './analytics'
import { fromGlobalId } from './globalId'
import { slugifyTag } from './text'
import { parseURL } from './url'

interface ArticleArgs {
  id?: string
  slug: string
  mediaHash?: string | null
  author: {
    userName?: string | null
  }
}

interface CircleArgs {
  name: string
}

interface CollectionArgs {
  id: string
}

interface TagArgs {
  id: string
  slug?: string
  content: string
  // feedType?: string
}

interface CommentArgs {
  id: string
  type: 'article' | 'circleDiscussion' | 'circleBroadcast' // comment type: article/discussion/broadcast
  parentComment?: {
    id: string
  } | null
}

type ToPathArgs =
  | ({
      page: 'articleDetail'
      article: ArticleArgs
      fragment?: string
      // [UtmParam]?: string
    } & UtmParams)
  | {
      page:
        | 'circleDetail'
        | 'circleDiscussion'
        | 'circleBroadcast'
        | 'circleSettings'
        | 'circleAnalytics'
        | 'circleEditProfile'
        | 'circleManageInvitation'
      circle: CircleArgs
      fragment?: string
    }
  | {
      page: 'commentDetail'
      comment: CommentArgs
      article?: ArticleArgs | null
      circle?: CircleArgs | null
    }
  | { page: 'draftDetail'; id: string; slug: string }
  | {
      page: 'tagDetail'
      tag: TagArgs
      feedType?: string
    }
  | {
      page: 'userProfile' | 'userCollections'
      userName: string
    }
  | {
      page: 'search'
      q?: string
      type?: 'article' | 'tag' | 'user'
    }
  | {
      page: 'collectionDetail'
      userName: string
      collection: CollectionArgs
    }

/**
 * Get `href` and `as` for `<Link>` with `args`
 *
 * (works on SSR & CSR)
 */
export const toPath = (
  args: ToPathArgs
): {
  href: string
  pathname?: string
  // search?: string
  // searchParams?: URLSearchParams | null
  // hash?: string
} => {
  switch (args.page) {
    case 'articleDetail': {
      const {
        id,
        slug,
        mediaHash,
        author: { userName },
      } = args.article

      let pathname = `/@${userName}/${slug}-${mediaHash}`
      try {
        if (id) {
          const { id: articleId } = fromGlobalId(id as string)
          pathname = `/@${userName}/${articleId}-${slug}${
            mediaHash ? '-' + mediaHash : ''
          }`
        }
      } catch (err) {
        console.error(`unable to parse global id:`, { id }, err)
      }

      let search = ''
      let searchParams: URLSearchParams | null = null
      const { utm_source, utm_medium } = args
      if ([utm_source, utm_medium].some(Boolean)) {
        searchParams = new URLSearchParams(
          [
            ['utm_source', utm_source as string],
            ['utm_medium', utm_medium as string],
          ].filter(([k, v]) => !!v)
        )
        search = '?' + searchParams.toString()
      }

      const hash = args.fragment ? `#${args.fragment}` : ''

      return {
        href: `${pathname}${search}${hash}`,
        pathname,
        // search,
        // searchParams,
        // hash,
      }
    }
    case 'circleDetail': {
      return {
        href: `/~${args.circle.name}`,
      }
    }
    case 'circleDiscussion': {
      const hash = args.fragment ? `#${args.fragment}` : ''
      return {
        href: `/~${args.circle.name}/discussion${hash}`,
      }
    }
    case 'circleBroadcast': {
      const hash = args.fragment ? `#${args.fragment}` : ''
      return {
        href: `/~${args.circle.name}/broadcast${hash}`,
      }
    }
    case 'circleSettings': {
      return {
        href: `/~${args.circle.name}/settings`,
      }
    }
    case 'circleAnalytics': {
      return {
        href: `/~${args.circle.name}/analytics`,
      }
    }
    case 'circleEditProfile': {
      return {
        href: `/~${args.circle.name}/settings/edit-profile`,
      }
    }
    case 'circleManageInvitation': {
      return {
        href: `/~${args.circle.name}/settings/manage-invitation`,
      }
    }
    case 'commentDetail': {
      const { parentComment, id, type } = args.comment || {}
      const fragment = parentComment?.id ? `${parentComment.id}-${id}` : id

      switch (type) {
        case 'article':
          return toPath({
            page: 'articleDetail',
            article: args.article!,
            fragment,
          })
        case 'circleDiscussion':
        case 'circleBroadcast':
          return toPath({
            page: type, // 'circleDiscussion' or 'circleBroadcast'
            circle: args.circle!, // as { name: string },
            fragment,
          })
      }
    }
    case 'draftDetail': {
      return {
        href: `/me/drafts/${args.slug}-${args.id}`,
      }
    }
    case 'tagDetail': {
      const { id, slug, content } = args.tag
      const { id: numberId } = fromGlobalId(id as string)
      const pathname = `/tags/${numberId}-${slug || slugifyTag(content)}`
      const typeStr = args.feedType ? `?type=${args.feedType}` : ''
      return {
        href: `${pathname}${typeStr}`,
        pathname,
      }
    }
    case 'userProfile': {
      return {
        href: `/@${args.userName}`,
      }
    }
    case 'userCollections': {
      return {
        href: `/@${args.userName}/collections`,
      }
    }
    case 'collectionDetail': {
      return {
        href: `/@${args.userName}/collections/${args.collection.id}`,
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
  const qs = new URL(url || window.location.href).searchParams
  const target = encodeURIComponent((qs.get('target') as string) || '')

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

  if (typeof window !== 'undefined') {
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
      const searchQuery = new URLSearchParams(url.search) || {}
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
