import gql from 'graphql-tag';

export const UNREAD_NOTICE_COUNT = gql`
  query UnreadNoticeCount {
    viewer {
      id
      status {
        unreadNoticeCount
      }
    }
  }
`;
