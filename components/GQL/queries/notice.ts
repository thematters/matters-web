import gql from 'graphql-tag'

import NoticeDigest from '~/components/NoticeDigest'

export const ME_NOTIFICATIONS = gql`
  query MeNotifications($first: Int, $cursor: String) {
    viewer {
      id
      notices(input: { first: $first, after: $cursor }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...DigestNotice
          }
        }
      }
    }
  }
  ${NoticeDigest.fragments.notice}
`

export const UNREAD_NOTICE_COUNT = gql`
  query UnreadNoticeCount {
    viewer {
      id
      status {
        unreadNoticeCount
      }
    }
  }
`
