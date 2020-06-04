import gql from 'graphql-tag'

import { UserDigest } from '~/components'

import { NoticeFollower as NoticeFollowerType } from './__generated__/NoticeFollower'

const NoticeFollower = ({ user }: { user: NoticeFollowerType | null }) => {
  if (!user) {
    return null
  }

  return (
    <UserDigest.Rich
      user={user}
      spacing={['base', 'base']}
      borderRadius="xtight"
      bgColor="grey-lighter"
      hasState={false}
    />
  )
}

NoticeFollower.fragments = {
  follower: gql`
    fragment NoticeFollower on User {
      ...UserDigestRichUserPublic
      ...UserDigestRichUserPrivate
    }
    ${UserDigest.Rich.fragments.user.public}
    ${UserDigest.Rich.fragments.user.private}
  `,
}

export default NoticeFollower
