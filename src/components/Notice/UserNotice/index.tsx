import gql from 'graphql-tag'

import { UserNoticeFragment } from '~/gql/graphql'

import UserNewFollowerNotice from './UserNewFollowerNotice'

const UserNotice = ({ notice }: { notice: UserNoticeFragment }) => {
  switch (notice.userNoticeType) {
    case 'UserNewFollower':
      return <UserNewFollowerNotice notice={notice} />
    default:
      return null
  }
}

UserNotice.fragments = {
  notice: gql`
    fragment UserNotice on UserNotice {
      id
      unread
      __typename
      userNoticeType: type
      ...UserNewFollowerNotice
    }
    ${UserNewFollowerNotice.fragments.notice}
  `,
}

export default UserNotice
