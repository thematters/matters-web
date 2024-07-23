// 1. Your moment was liked by {username}
import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { stripHtml } from '~/common/utils'
import { truncateTitle } from '~/common/utils/text/moment'
import { LanguageContext } from '~/components/Context'
import { LikeMomentNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeMomentTitle from '../NoticeMomentTitle'

const Like = ({ notice }: { notice: LikeMomentNoticeFragment }) => {
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
        <FormattedMessage defaultMessage="liked your moment" id="/5OvMK" />
      }
      title={
        <NoticeMomentTitle
          title={`${title} ${images}`}
          moment={notice.moment}
        />
      }
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
    ${NoticeMomentTitle.fragments.moment}
  `,
}

export default Like
