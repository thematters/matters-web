// 5. Mentioned in {users} Moment
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { MentionMomentNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'

const Mention = ({ notice }: { notice: MentionMomentNoticeFragment }) => {
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="mentioned you in moment"
          id="fkQOxQ"
        />
      }
      title={notice.moment.content || 'FIXME title'}
      testId={TEST_ID.NOTICE_MOMENT_MENTIONED}
    />
  )
}

Mention.fragments = {
  notice: gql`
    fragment MentionMomentNotice on MomentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      moment: target {
        id
        content
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeDate.fragments.notice}
  `,
}

export default Mention
