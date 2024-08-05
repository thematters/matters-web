import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CollectionNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCollectionTitle from '../NoticeCollectionTitle'
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
        <FormattedMessage defaultMessage="liked your collection" id="kEDrXh" />
      }
      title={<NoticeCollectionTitle notice={notice} />}
      testId={TEST_ID.NOTICE_USER_NEW_FOLLOWER}
    />
  )
}

CollectionNewLikeNotice.fragments = {
  notice: gql`
    fragment CollectionNewLikeNotice on CollectionNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      target {
        id
        ...NoticeCollectionTitle
      }
    }
    ${NoticeCollectionTitle.fragments.collection}
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeDate.fragments.notice}
  `,
}

export default CollectionNewLikeNotice
