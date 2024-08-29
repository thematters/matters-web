import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { MomentMentionedYouNoticeFragment, MomentState } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeMomentTitle from '../NoticeMomentTitle'

const MomentMentionedYouNotice = ({
  notice,
}: {
  notice: MomentMentionedYouNoticeFragment
}) => {
  const moment = notice.moment

  if (moment.state === MomentState.Archived) {
    return (
      <NoticeDigest
        notice={notice}
        action={
          <FormattedMessage
            defaultMessage="mentioned you in a deleted moment "
            description="src/components/Notice/MomentNotice/MomentMentionedYou.tsx"
            id="Upe8I6"
          />
        }
        testId={TEST_ID.NOTICE_MOMENT_MENTIONED}
      />
    )
  }

  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="mentioned you in a moment at"
          id="Qlzm0s"
        />
      }
      title={<NoticeMomentTitle moment={notice.moment} />}
      testId={TEST_ID.NOTICE_MOMENT_MENTIONED}
    />
  )
}

MomentMentionedYouNotice.fragments = {
  notice: gql`
    fragment MomentMentionedYouNotice on MomentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      moment: target {
        id
        state
        ...NoticeMomentTitle
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeDate.fragments.notice}
    ${NoticeMomentTitle.fragments.moment}
  `,
}

export default MomentMentionedYouNotice
