import gql from 'graphql-tag'
import { Fragment } from 'react'

import { Translate } from '~/components'

import { numAbbr } from '~/common/utils'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

import { CircleCommentNotice as NoticeType } from './__generated__/CircleCommentNotice'

type CircleCommentNoticeType = {
  notice: NoticeType
  noticeType:
  'circleNewDiscussion' |
  'circleNewBroadcast' |
  'circleMemberBroadcast' |
  'circleMemberNewDiscussion' |
  'circleMemberNewDiscussionReply' |
  'circleMemberNewBroadcastReply' |
  'inCircleNewArticle' |
  'inCircleNewBroadcast' |
  'inCircleNewBroadcastReply' |
  'inCircleNewDiscussion' |
  'inCircleNewDiscussionReply'
}

const CircleCommentNotice = ({ notice, noticeType }: CircleCommentNoticeType) => {
  if (!notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1
  const discussion =
    noticeType === 'circleNewDiscussion' ||
    noticeType === 'circleMemberNewDiscussion' ||
    noticeType === 'inCircleNewDiscussion'
  const discussionReply =
    noticeType === 'circleMemberNewDiscussionReply' ||
    noticeType === 'inCircleNewDiscussionReply'
  const broadcastReply =
    noticeType === 'circleMemberNewBroadcastReply' ||
    noticeType === 'inCircleNewBroadcastReply'

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

          <>
            <Translate zh_hant="在圍爐 " zh_hans="在围炉 " en="" />
            <NoticeCircleName circle={notice.circle} />
            {discussion && (
              <Translate
                zh_hant=" 眾聊發新話題"
                zh_hans=" 众聊发新话题"
                en=""
              />
            )}
            {discussionReply && (
              <Translate
                zh_hant=" 回覆了眾聊"
                zh_hans=" 回复了众聊"
                en=""
              />
            )}
            {broadcastReply && (
              <Translate
                zh_hant=" 廣播中留言"
                zh_hans=" 广播中留言"
                en=""
              />
            )}
          </>

          <NoticeDate notice={notice} />
        </NoticeHead>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}
CircleCommentNotice.fragments = {
  notice: gql`
    fragment CircleCommentNotice on CircleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      circle: target {
        ...NoticeCircleCard
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeCircleCard.fragments.circle}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleCommentNotice
