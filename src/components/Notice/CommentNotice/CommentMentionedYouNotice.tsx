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

import { CommentMentionedYouNotice as NoticeType } from './__generated__/CommentMentionedYouNotice'

const CommentMentionedYouNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice.actors) {
    return null
  }

  const actor = notice.actors[0]
  const commentArticle =
    notice.comment?.node.__typename === 'Article' ? notice.comment.node : null
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

          {commentArticle && (
            <>
              <Translate
                zh_hant=" 在作品 "
                zh_hans=" 在作品 "
                en=" mentioned you in a comment on "
              />
              <NoticeArticleTitle article={commentArticle} />
              <Translate
                zh_hant=" 的評論中提及了你"
                zh_hans=" 的评论中提及了你"
                en=""
              />
            </>
          )}
          {commentCircle && (
            <>
              <Translate
                zh_hant=" 在圍爐 "
                zh_hans=" 在围炉 "
                en=" mentioned you on "
              />
              <NoticeCircleName circle={commentCircle} />
              <Translate
                zh_hant={` 中提及了你`}
                zh_hans={` 中提及了你`}
                en=""
              />
            </>
          )}
        </NoticeHead>

        <NoticeComment comment={notice.comment} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CommentMentionedYouNotice.fragments = {
  notice: gql`
    fragment CommentMentionedYouNotice on CommentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      comment: target {
        ...NoticeComment
        node {
          ... on Article {
            ...NoticeArticleTitle
          }
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

export default CommentMentionedYouNotice
