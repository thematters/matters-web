// 1. Your moment was liked by {username}
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { LikeMomentNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'

// 3. {user} commented under your moment
const Like = ({ notice }: { notice: LikeMomentNoticeFragment }) => {
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage defaultMessage="liked your moment" id="/5OvMK" />
      }
      title={notice.moment?.content || ''}
      testId={TEST_ID.NOTICE_MOMENT_LIKED}
    />
  )
}

Like.fragments = {
  notice: gql`
    fragment LikeMomentNotice on MomentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      moment: target {
        id
        liked
        content
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeDate.fragments.notice}
  `,
}

export default Like
