import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import ArticlesCount from './ArticlesCount'
import { TagDetailButtons } from './Buttons'
import Followers from './Followers'

export const TAG_DETAIL_PUBLIC = gql`
  query TagDetailPublic($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        content
        cover
        description
        numArticles
        numAuthors
        creator {
          id
          ...UserDigestMiniUser
        }
        editors {
          id
          ...UserDigestMiniUser
        }
        owner {
          id
          ...UserDigestMiniUser
        }
        selectedArticles: articles(input: { first: 0, selected: true }) {
          totalCount
        }
        isOfficial
        ...FollowersTag
        ...ArticleCountTag
        ...FollowButtonTagPrivate
        recommended(input: {}) {
          edges {
            cursor
            node {
              id
              content
              description
              cover
              numArticles
              numAuthors
            }
          }
        }
      }
    }
  }
  ${UserDigest.Mini.fragments.user}
  ${Followers.fragments.tag}
  ${ArticlesCount.fragments.tag}
  ${TagDetailButtons.FollowButton.fragments.tag.private}
`

export const TAG_DETAIL_PRIVATE = gql`
  query TagDetailPrivate($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        ...FollowButtonTagPrivate
      }
    }
  }
  ${TagDetailButtons.FollowButton.fragments.tag.private}
`
