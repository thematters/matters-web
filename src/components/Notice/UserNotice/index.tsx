import { gql } from '@apollo/client'

import UserNewFollowerNotice from './UserNewFollowerNotice'

import { UserNotice as NoticeType } from './__generated__/UserNotice'

const UserNotice = ({ notice }: { notice: NoticeType }) => {
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
