import gql from 'graphql-tag'
import { Fragment } from 'react'

import { Translate } from '~/components'

import { numAbbr } from '~/common/utils'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeCircleName from '../NoticeCircleName'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

import { CommentNewReplyNotice as NoticeType } from './__generated__/CommentNewReplyNotice'

const CommentNewReplyNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1
  const replyCommentArticle =
    notice.reply?.node.__typename === 'Article' ? notice.reply.node : null
  const replyCommentCircle =
    notice.reply?.node.__typename === 'Circle' ? notice.reply.node : null
  const replyCommentCircleDiscussion =
    notice.reply?.type === 'circleDiscussion' ? notice.reply.type : null
  const replyCommentCircleBroadcast =
    notice.reply?.type === 'circleBroadcast' ? notice.reply.type : null

  return (
    <section className="container">
      <section className="avatar-wrap">
        {isMultiActors ? (
          <NoticeTypeIcon type="comment" />
        ) : (
          <NoticeActorAvatar user={notice.actors[0]} />
        )}
      </section>

      <section className="content-wrap">
        <NoticeHead>
          {notice.actors.slice(0, 2).map((actor, index) => (
            <Fragment key={index}>
              <NoticeActorName user={actor} />
              {isMultiActors && index < 1 && <span>、</span>}
            </Fragment>
          ))}{' '}
          {isMultiActors && (
            <Translate
              zh_hant={`等 ${numAbbr(actorsCount)} 人`}
              zh_hans={`等 ${numAbbr(actorsCount)} 人`}
              en={`etc. ${numAbbr(actorsCount)} users`}
            />
          )}
          {replyCommentArticle && (
            <>
              <Translate
                zh_hant="回覆了你在作品 "
                zh_hans="回复了你在作品 "
                en=" replied to your comment on "
              />
              <NoticeArticleTitle article={replyCommentArticle} />
              <Translate zh_hant=" 的評論" zh_hans=" 的评论" en="" />
            </>
          )}
          {replyCommentCircle && (
            <>
              <Translate zh_hant="在圍爐 " zh_hans="在围炉 " en="" />
              <NoticeCircleName circle={replyCommentCircle} />
              {replyCommentCircleDiscussion && (
                <Translate
                  zh_hant=" 回覆你的眾聊發言"
                  zh_hans=" 回复你的众聊发言"
                  en=""
                />
              )}
              {replyCommentCircleBroadcast && (
                <Translate zh_hant=" 廣播中留言" zh_hans=" 广播中留言" en="" />
              )}
            </>
          )}
        </NoticeHead>

        <NoticeComment
          comment={isMultiActors ? notice.comment : notice.reply}
        />

        {isMultiActors && (
          <section className="multi-actor-avatars">
            {notice.actors.map((actor, index) => (
              <NoticeActorAvatar key={index} user={actor} size="md" />
            ))}
          </section>
        )}

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}
CommentNewReplyNotice.fragments = {
  notice: gql`
    fragment CommentNewReplyNotice on CommentCommentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      comment: target {
        ...NoticeComment
      }
      reply: comment {
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

export default CommentNewReplyNotice
