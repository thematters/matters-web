import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import { ArticleDigestTitle } from '../Title'

export const fragments = {
  article: gql`
    fragment ArticleDigestCardArticle on Article {
      id
      state
      title
      slug
      shortHash
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
