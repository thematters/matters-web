import gql from 'graphql-tag'
import { Fragment } from 'react'

import { Translate } from '~/components'

import { COMMENT_TYPE_TEXT } from '~/common/enums'
import { numAbbr } from '~/common/utils'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeCircleName from '../NoticeCircleName'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

import { CircleNewDiscussionNotice as NoticeType } from './__generated__/CircleNewDiscussionNotice'

const CircleNewDiscussionNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1
  const commentCircle =
    notice.comment?.node.__typename === 'Circle'
      ? notice.comment.node
      : undefined

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
          <Translate
            zh_hant="在圍爐 "
            zh_hans="在围炉 "
            en={` sent a new ${COMMENT_TYPE_TEXT.en.circleBroadcast} on `}
          />
          {commentCircle && <NoticeCircleName circle={commentCircle} />}
          <Translate
            zh_hant={` 發布了新${COMMENT_TYPE_TEXT.zh_hant.circleBroadcast}`}
            zh_hans={` 发布了新${COMMENT_TYPE_TEXT.zh_hans.circleBroadcast}`}
          />
        </NoticeHead>

        {isMultiActors ? (
          <section className="multi-actor-avatars">
            {notice.actors.map((actor, index) => (
              <NoticeActorAvatar key={index} user={actor} size="md" />
            ))}
          </section>
        ) : (
          <NoticeComment comment={notice.comment} />
        )}

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CircleNewDiscussionNotice.fragments = {
  notice: gql`
    fragment CircleNewDiscussionNotice on CommentNotice {
      id
      commentNoticeType: type
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
    ${NoticeCircleName.fragments.circle}
    ${NoticeComment.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleNewDiscussionNotice
