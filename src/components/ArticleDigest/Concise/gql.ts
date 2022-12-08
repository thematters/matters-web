import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import { ArticleDigestTitle } from '../Title'

export const fragments = {
  article: gql`
    fragment ArticleDigestConciseArticle on Article {
      id
      title
      slug
      mediaHash
      createdAt
      articleState: state
      cover
      summary
      author {
        id
        userName
        ...UserDigestMiniUser
      }
      ...ArticleDigestTitleArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${ArticleDigestTitle.fragments.article}
  `,
}
