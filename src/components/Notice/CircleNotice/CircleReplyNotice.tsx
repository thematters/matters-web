import gql from 'graphql-tag'
import { Fragment, useContext } from 'react'

import { Translate, ViewerContext } from '~/components'

import { numAbbr } from '~/common/utils'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

import { CircleReplyNotice as NoticeType } from './__generated__/CircleReplyNotice'

type CircleReplyNoticeType = {
  notice: NoticeType
  noticeType:
    | 'circleMemberNewDiscussion'
    | 'circleMemberNewDiscussionReply'
    | 'circleMemberNewBroadcastReply'
    | 'inCircleNewBroadcastReply'
    | 'inCircleNewDiscussion'
    | 'inCircleNewDiscussionReply'
}

const CircleReplyNotice = ({ notice, noticeType }: CircleReplyNoticeType) => {
  const viewer = useContext(ViewerContext)
  const node = notice.node?.__typename === 'Comment' ? notice.node : null
  const replyMyDiscussion = viewer.id === node?.replyTo?.author.id

  if (!notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1
  const discussion =
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
            {discussionReply &&
              (replyMyDiscussion ? (
                <Translate
                  zh_hant=" 回覆了你的眾聊"
                  zh_hans=" 回复了你的众聊"
                  en=""
                />
              ) : (
                <Translate zh_hant=" 回覆了眾聊" zh_hans=" 回复了众聊" en="" />
              ))}
            {broadcastReply && (
              <Translate zh_hant=" 廣播中留言" zh_hans=" 广播中留言" en="" />
            )}
          </>
          {isMultiActors && (
            <section className="multi-actor-avatars">
              {notice.actors.map((actor, index) => (
                <NoticeActorAvatar key={index} user={actor} size="md" />
              ))}
            </section>
          )}
        </NoticeHead>
        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}
CircleReplyNotice.fragments = {
  notice: gql`
    fragment CircleReplyNotice on CircleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      circle: target {
        ...NoticeCircleCard
      }
      node {
        ... on Comment {
          replyTo {
            author {
              id
            }
          }
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeCircleCard.fragments.circle}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleReplyNotice
