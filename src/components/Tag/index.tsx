import type { DigestTagFragment } from '~/gql/graphql'

export const toDigestTagPlaceholder = (content: string) =>
  ({
    __typename: 'Tag',
    id: content,
    content,

    articles: {
      __typename: 'ArticleConnection',
      totalCount: 0,
    },

    numArticles: 0,
    numAuthors: 0,
  }) as DigestTagFragment

export { ArticleTag } from './ArticleTag'
export { InlineTag } from './InlineTag'
export { ListTag } from './ListTag'
export { PlainTag } from './PlainTag'
