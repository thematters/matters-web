import gql from 'graphql-tag'

import { UserNoticeFragment } from '~/gql/graphql'

import UserNewFollower from './UserNewFollower'

const UserNotice = ({ notice }: { notice: UserNoticeFragment }) => {
  switch (notice.userNoticeType) {
    case 'UserNewFollower':
      return <UserNewFollower notice={notice} />
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
      ...UserNewFollower
    }
    ${UserNewFollower.fragments.notice}
  `,
}

export default UserNotice
