import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeCircleName from '../NoticeCircleName'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import styles from '../styles.css'

import { CircleDiscussionMentionedYouNotice as NoticeType } from './__generated__/CircleDiscussionMentionedYouNotice'

const CircleDiscussionMentionedYouNotice = ({
  notice,
}: {
  notice: NoticeType
}) => {
  if (!notice.actors) {
    return null
  }

  const actor = notice.actors[0]
  const commentCircle =
    notice.comment?.node.__typename === 'Circle' ? notice.comment.node : null

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeActorName user={actor} />
          <Translate
            zh_hant=" 在圍爐 "
            zh_hans=" 在围炉 "
            en=" mentioned you on "
          />
          <NoticeCircleName circle={commentCircle} />
          <Translate zh_hant={` 眾聊提及你`} zh_hans={` 众聊提及你`} en="" />
        </NoticeHead>

        <NoticeComment comment={notice.comment} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CircleDiscussionMentionedYouNotice.fragments = {
  notice: gql`
    fragment CircleDiscussionMentionedYouNotice on CommentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      comment: target {
        ...NoticeComment
        node {
          ... on Circle {
            ...NoticeCircleName
          }
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeCircleName.fragments.circle}
    ${NoticeComment.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleDiscussionMentionedYouNotice
