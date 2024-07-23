import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { stripHtml } from '~/common/utils'
import { truncateTitle } from '~/common/utils/text/moment'
import { LanguageContext } from '~/components/Context'
import { MomentNewCommentNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeMomentTitle from '../NoticeMomentTitle'

const MomentNewCommentNotice = ({
  notice,
}: {
  notice: MomentNewCommentNoticeFragment
}) => {
  const { lang } = useContext(LanguageContext)
  const intl = useIntl()

  if (!notice.actors) {
    return null
  }

  const commentMoment =
    notice.comment?.node.__typename === 'Moment' ? notice.comment.node : null

  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="commented in your moment"
          id="qCotH5"
          description="src/components/Notice/CommentNotice/MomentNewCommentNotice.tsx"
          values={{
            commentMoment: (
              <NoticeMomentTitle
                moment={commentMoment}
                title={`${truncateTitle(
                  stripHtml(commentMoment?.content || ''),
                  10,
                  lang
                )} ${
                  commentMoment?.assets?.length
                    ? intl
                        .formatMessage({
                          defaultMessage: `[image]`,
                          id: 'W3tqQO',
                        })
                        .repeat(Math.min(3, commentMoment.assets.length))
                    : ''
                }`}
              />
            ),
          }}
        />
      }
      content={<NoticeComment comment={notice.comment} />}
      title={notice.comment?.content || 'FIXME title'}
      testId={TEST_ID.NOTICE_ARTICLE_NEW_COMMENT}
    />
  )
}

MomentNewCommentNotice.fragments = {
  notice: gql`
    fragment MomentNewCommentNotice on CommentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      comment: target {
        ...NoticeComment
        node {
          ... on Moment {
            ...NoticeMomentTitle
          }
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeComment.fragments.comment}
    ${NoticeDate.fragments.notice}
    ${NoticeMomentTitle.fragments.moment}
  `,
}

export default MomentNewCommentNotice
