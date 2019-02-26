import { SingletonRouter } from 'next/router'

import { PATHS } from '~/common/enums'

type ToPathArgs =
  | {
      page: 'articleDetail'
      userName: string
      slug: string
      mediaHash: string
    }
  | { page: 'draftDetail'; id: string }
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

export const toPath = (args: ToPathArgs): { href: string; as: string } => {
  switch (args.page) {
    case 'articleDetail':
      return {
        href: `${PATHS.ARTICLE_DETAIL.href}?userName=${args.userName}&slug=${
          args.slug
        }&mediaHash=${args.mediaHash}`,
        as: `/@${args.userName}/${args.slug}-${args.mediaHash}`
      }
    case 'draftDetail':
      return {
        href: `${PATHS.ME_DRAFT_DETAIL.href}?id=${args.id}`,
        as: `/me/drafts/${args.id}}`
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

export const getQuery = ({
  router,
  key
}: {
  router?: SingletonRouter
  key: string
}) => {
  const value = router && router.query && router.query[key]
  return value instanceof Array ? value[0] : value
}
