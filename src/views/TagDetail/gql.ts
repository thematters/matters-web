import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import { TagDetailButtons } from './Buttons'

export const TAG_DETAIL_PUBLIC = gql`
  query TagDetailPublic($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        content
        cover
        creator {
          id
          ...UserDigestMiniUser
        }
        description
        editors {
          id
          ...UserDigestMiniUser
        }
        articles(input: { first: 0, selected: true }) {
          totalCount
        }
        ...FollowButtonTagPrivate
      }
    }
  }
  ${UserDigest.Mini.fragments.user}
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
