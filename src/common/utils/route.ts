import Router from 'next/router'
import { Key, pathToRegexp } from 'path-to-regexp'

import { PATHS, ROUTES } from '~/common/enums'

import { fromGlobalId } from './globalId'
import { slugifyTag } from './text'
import { parseURL } from './url'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

interface ArticleArgs {
  shortHash: string
}

interface MomentArgs {
  shortHash: string
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

interface CampaignArgs {
  id: string
  shortHash: string
}

interface CampaignStageArgs {
  id: string
}

interface CommentArgs {
  id: string
  type: 'article' | 'circleDiscussion' | 'circleBroadcast' | 'moment' // comment type: article/discussion/broadcast
  parentComment?: {
    id: string
  } | null
}

type ToPathArgs =
  | {
      page: 'articleDetail'
      article: ArticleArgs
      collectionId?: string
    }
  | { page: 'articleEdit'; article: ArticleArgs }
  | { page: 'articleHistory'; article: ArticleArgs }
  | { page: 'momentDetailEdit' }
  | {
      page: 'momentDetail'
      moment: MomentArgs
    }
  | {
      page: 'momentComment'
      moment: MomentArgs
      comment: CommentArgs
    }
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
    }
  | {
      page: 'commentDetail'
      comment: CommentArgs
      article?: ArticleArgs | null
      circle?: CircleArgs | null
      moment?: MomentArgs | null
    }
  | { page: 'draftDetail'; id: string }
  | {
      page: 'tagDetail'
      tag: TagArgs
      feedType?: string
    }
  | {
      page: 'campaignDetail'
      campaign: CampaignArgs
      stage?: CampaignStageArgs
      featured?: boolean
      announcement?: boolean
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
 * Get `href` for `<Link>` with `args`
 *
 * (works on SSR & CSR)
 */
export const toPath = (
  args: ToPathArgs & {
    fragment?: string
    search?: { [key: string]: string }
  }
): {
  href: string
} => {
  let href = ''
  let search = { ...args.search }

  switch (args.page) {
    case 'articleDetail': {
      const { shortHash } = args.article

      href = `/a/${shortHash}`

      if (args.collectionId) {
        href = `${href}?collection=${args.collectionId}`
      }

      break
    }
    case 'articleEdit': {
      const { shortHash } = args.article

      href = `/a/${shortHash}/edit`

      break
    }
    case 'articleHistory': {
      const { shortHash } = args.article

      href = `/a/${shortHash}/history`

      break
    }
    case 'momentDetailEdit': {
      href = `/m/edit`
      break
    }
    case 'momentDetail': {
      const { shortHash } = args.moment

      href = `/m/${shortHash}`

      break
    }
    case 'momentComment': {
      const { shortHash } = args.moment
      const { id } = args.comment
      href = `/m/${shortHash}#${id}`

      break
    }
    case 'circleDetail': {
      href = `/~${args.circle.name}`
      break
    }
    case 'circleDiscussion': {
      href = `/~${args.circle.name}/discussion`
      break
    }
    case 'circleBroadcast': {
      href = `/~${args.circle.name}/broadcast`
      break
    }
    case 'circleSettings': {
      href = `/~${args.circle.name}/settings`
      break
    }
    case 'circleAnalytics': {
      href = `/~${args.circle.name}/analytics`
      break
    }
    case 'circleEditProfile': {
      href = `/~${args.circle.name}/settings/edit-profile`
      break
    }
    case 'circleManageInvitation': {
      href = `/~${args.circle.name}/settings/manage-invitation`
      break
    }
    case 'commentDetail': {
      const { parentComment, id, type } = args.comment || {}
      const fragment = parentComment?.id ? `${parentComment.id}-${id}` : id
      switch (type) {
        case 'article':
          href = toPath({
            page: 'articleDetail',
            article: args.article!,
            fragment,
          }).href
          break
        case 'moment':
          href = toPath({
            page: 'momentDetail',
            moment: args.moment!,
            fragment,
          }).href
          break
        case 'circleDiscussion':
        case 'circleBroadcast':
          href = toPath({
            page: type, // 'circleDiscussion' or 'circleBroadcast'
            circle: args.circle!, // as { name: string },
            fragment,
          }).href
          break
      }
      break
    }
    case 'draftDetail': {
      href = `/me/drafts/${args.id}`
      break
    }
    case 'tagDetail': {
      const { id, slug, content } = args.tag
      const name = slug || slugifyTag(content)
      const { id: numberId } = fromGlobalId(id as string)
      if (args.feedType) {
        search = {
          ...search,
          type: args.feedType,
        }
      }
      href = `/tags/${numberId}-${name}`
      break
    }
    case 'campaignDetail': {
      href = `/e/${args.campaign.shortHash}`
      if (args.stage) {
        href = `${href}?type=${args.stage.id}`
      } else if (args.featured) {
        href = `${href}?type=featured`
      } else if (args.announcement) {
        href = `${href}?type=announcement`
      }
      break
    }
    case 'userProfile': {
      href = `/@${args.userName}`
      break
    }
    case 'userCollections': {
      href = `/@${args.userName}/collections`
      break
    }
    case 'collectionDetail': {
      href = `/@${args.userName}/collections/${args.collection.id}`
      break
    }
    case 'search': {
      if (args.q) {
        search = {
          ...search,
          q: args.q,
        }
      }

      if (args.type) {
        search = {
          ...search,
          type: args.type,
        }
      }
      href = PATHS.SEARCH
      break
    }
  }

  // query string
  let searchParams: URLSearchParams = new URLSearchParams(
    [...(Object.entries(search) as [string, string][])].filter(([k, v]) => !!v)
  )
  if (searchParams.toString()) {
    href = `${href}?${searchParams.toString()}`
  }

  // hash
  if (args.fragment) {
    const hash = `#${args.fragment}`
    href = `${href}${hash}`
  }

  return {
    href,
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
  const fallbackTarget = fallback === 'homepage' ? `/` : window.location.href
  let target = decodeURIComponent(getTarget())

  if (isProd) {
    const isValidTarget = new RegExp(
      `^https?://${process.env.NEXT_PUBLIC_SITE_DOMAIN}`
    ).test(target)

    if (!isValidTarget) {
      target = fallbackTarget
    }
  }

  Router.push(target || fallbackTarget)
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

export type SearchType = 'article' | 'user' | 'tag' | undefined

export const getSearchType = (value: string): SearchType => {
  const types = ['article', 'user', 'tag']
  return types.includes(value) ? (value as SearchType) : undefined
}
