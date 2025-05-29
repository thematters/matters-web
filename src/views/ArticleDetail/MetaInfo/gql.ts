import gql from 'graphql-tag'

import { UserDigest } from '~/components'

export const fragments = {
  article: gql`
    fragment MetaInfoArticle on Article {
      id
      access {
        type
      }
      language
      slug
      shortHash
      revisionCount
      revisedAt
      createdAt
      author {
        id
        ...UserDigestMiniUser
      }
    }
    ${UserDigest.Mini.fragments.user}
  `,
  articleVersion: gql`
    fragment MetaInfoArticleVersion on ArticleVersion {
      id
      createdAt
    }
  `,
}
