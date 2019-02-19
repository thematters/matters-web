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

export const toPath = (args: ToPathArgs): { fs: string; url: string } => {
  switch (args.page) {
    case 'articleDetail':
      return {
        fs: `${PATHS.ARTICLE_DETAIL.fs}?userName=${args.userName}&slug=${
          args.slug
        }&mediaHash=${args.mediaHash}`,
        url: `/@${args.userName}/${args.slug}-${args.mediaHash}`
      }
    case 'tagDetail':
      return {
        fs: `${PATHS.TAG_DETAIL.fs}?id=${args.id}`,
        url: `/tags/${args.id}`
      }
    case 'userProfile':
      return {
        fs: `${PATHS.USER_ARTICLES.fs}?userName=${args.userName}`,
        url: `/@${args.userName}`
      }
    case 'search':
      const typeStr = args.type ? `&type=${args.type}` : ''
      return {
        fs: `${PATHS.SEARCH.fs}?q=${args.q || ''}${typeStr}`,
        url: `${PATHS.SEARCH.url}?q=${args.q || ''}${typeStr}`
      }
  }
}
