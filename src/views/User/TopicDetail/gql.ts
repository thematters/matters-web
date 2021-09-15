import gql from 'graphql-tag'

import { ArticleDigestFeed } from '~/components/ArticleDigest'
import { UserDigest } from '~/components/UserDigest'

export const TOPIC_DETAIL_PUBLIC = gql`
  query TopicDetailPublic($id: ID!) {
    node(input: { id: $id }) {
      ... on Topic {
        id
        title
        description
        cover
        author {
          id
          ...UserDigestRichUserPublic
          ...UserDigestRichUserPrivate
        }
        articles {
          ...ArticleDigestFeedArticlePublic
          ...ArticleDigestFeedArticlePrivate
        }
        chapters {
          id
          title
          description
          articles {
            ...ArticleDigestFeedArticlePublic
            ...ArticleDigestFeedArticlePrivate
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`

export const TOPIC_DETAIL_PRIVATE = gql`
  query TopicDetailPrivate($id: ID!) {
    node(input: { id: $id }) {
      ... on Topic {
        id
        author {
          id
          ...UserDigestRichUserPrivate
        }
        articles {
          ...ArticleDigestFeedArticlePrivate
        }
        chapters {
          id
          articles {
            ...ArticleDigestFeedArticlePrivate
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user.private}
  ${ArticleDigestFeed.fragments.article.private}
`
