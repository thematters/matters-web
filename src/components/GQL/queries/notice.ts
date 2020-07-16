import { gql } from '@apollo/client'

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
