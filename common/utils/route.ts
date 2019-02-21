import { NextContext } from 'next'
import Router from 'next/router'

import { PATHS } from '~/common/enums'

type ToPathArgs =
  | {
      page: 'articleDetail'
      userName: string
      slug: string
      mediaHash: string
    }
  | {
      page: 'tagDetail'
      id: string
    }
  | {
      page: 'userProfile'
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
    case 'search':
      const typeStr = args.type ? `&type=${args.type}` : ''
      return {
        href: `${PATHS.SEARCH.href}?q=${args.q || ''}${typeStr}`,
        as: `${PATHS.SEARCH.as}?q=${args.q || ''}${typeStr}`
      }
  }
}
