import { gql } from '@apollo/client'

import { UserDigest } from '~/components'

import { NoticeUserCard as NoticeUserCardType } from './__generated__/NoticeUserCard'

const NoticeUserCard = ({ user }: { user: NoticeUserCardType | null }) => {
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

NoticeUserCard.fragments = {
  follower: gql`
    fragment NoticeUserCard on User {
      ...UserDigestRichUserPublic
      ...UserDigestRichUserPrivate
    }
    ${UserDigest.Rich.fragments.user.public}
    ${UserDigest.Rich.fragments.user.private}
  `,
}

export default NoticeUserCard
