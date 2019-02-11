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
  }
}
