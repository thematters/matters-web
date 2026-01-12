import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { CollectionNoticeFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import CollectionCard from '../CollectionCard'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCard from '../NoticeCard'
import NoticeCollectionTitle from '../NoticeCollectionTitle'
import NoticeDate from '../NoticeDate'

const CollectionNewLike = ({
  notice,
}: {
  notice: CollectionNoticeFragment
}) => {
  return (
    <NoticeCard
      notice={notice}
      type="like"
      action={
        <FormattedMessage defaultMessage="liked your collection" id="kEDrXh" />
      }
      content={<CollectionCard notice={notice} />}
    />
  )
}

CollectionNewLike.fragments = {
  notice: gql`
    fragment CollectionNewLike on CollectionNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
      }
      collection: target {
        id
        ...NoticeCollectionTitle
        ...CollectionCardCollection
      }
    }
    ${NoticeCollectionTitle.fragments.collection}
    ${CollectionCard.fragments.collection}
    ${NoticeActorAvatar.fragments.user}
    ${ActorAction.fragments.user}
    ${NoticeDate.fragments.notice}
  `,
}

export default CollectionNewLike
