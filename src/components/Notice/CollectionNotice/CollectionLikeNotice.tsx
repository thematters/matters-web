import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CollectionNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'

const CollectionNewLikeNotice = ({
  notice,
}: {
  notice: CollectionNoticeFragment
}) => {
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="liked your collection"
          id="nYUnyl"
          description="src/components/Notice/UserNotice/UserNewFollowerNotice.tsx"
        />
      }
      testId={TEST_ID.NOTICE_USER_NEW_FOLLOWER}
    />
  )
}

CollectionNewLikeNotice.fragments = {
  notice: gql`
    fragment UserNewFollowerNotice on UserNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeDate.fragments.notice}
  `,
}

export default CollectionNewLikeNotice
