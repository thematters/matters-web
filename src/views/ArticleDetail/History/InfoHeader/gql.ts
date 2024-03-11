import gql from 'graphql-tag'

import { UserDigest } from '~/components'

export const fragments = {
  article: gql`
    fragment InfoHeaderArticle on Article {
      id
      author {
        id
        ...UserDigestMiniUser
      }
      iscnId
      access {
        type
        secret
      }
    }
    ${UserDigest.Mini.fragments.user}
  `,
  articleVersion: gql`
    fragment InfoHeaderArticleVersion on ArticleVersion {
      id
      dataHash
      mediaHash
      summary
      createdAt
      description
    }
  `,
}
