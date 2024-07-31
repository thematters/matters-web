import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { MomentLikedNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeMomentTitle from '../NoticeMomentTitle'

const MomentLikedNotice = ({
  notice,
}: {
  notice: MomentLikedNoticeFragment
}) => {
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage defaultMessage="liked your moment" id="/5OvMK" />
      }
      title={<NoticeMomentTitle moment={notice.moment} />}
      testId={TEST_ID.NOTICE_MOMENT_LIKED}
    />
  )
}

MomentLikedNotice.fragments = {
  notice: gql`
    fragment MomentLikedNotice on MomentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      moment: target {
        id
        ...NoticeMomentTitle
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeDate.fragments.notice}
    ${NoticeMomentTitle.fragments.moment}
  `,
}

export default MomentLikedNotice
