// 5. Mentioned in {users} Moment
import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { stripHtml } from '~/common/utils'
import { truncateTitle } from '~/common/utils/text/moment'
import { LanguageContext } from '~/components/Context'
import { MentionMomentNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeMomentTitle from '../NoticeMomentTitle'

const Mention = ({ notice }: { notice: MentionMomentNoticeFragment }) => {
  const { lang } = useContext(LanguageContext)
  const intl = useIntl()
  const title = truncateTitle(stripHtml(notice.moment?.content || ''), 10, lang)
  const images = notice.moment?.assets?.length
    ? intl
        .formatMessage({ defaultMessage: `[image]`, id: 'W3tqQO' })
        .repeat(Math.min(3, notice.moment.assets.length))
    : ''

  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="mentioned you in moment"
          id="fkQOxQ"
        />
      }
      title={
        <NoticeMomentTitle
          title={`${title} ${images}`}
          moment={notice.moment}
        />
      }
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
        shortHash
        assets {
          id
          type
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeDate.fragments.notice}
  `,
}

export default Mention
