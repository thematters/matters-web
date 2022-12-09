import gql from 'graphql-tag'
import { useContext } from 'react'

import { LanguageContext, Translate, ViewerContext } from '~/components'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

import { CircleNewDiscussionComments as NoticeType } from './__generated__/CircleNewDiscussionComments'

type CircleNewDiscussionCommentsType = {
  notice: NoticeType
}

const CircleNewDiscussionComments = ({
  notice,
}: CircleNewDiscussionCommentsType) => {
  const viewer = useContext(ViewerContext)
  const { comments, replies, mentions } = notice
  const { lang } = useContext(LanguageContext)
  const isEn = lang === 'en'

  if (!notice.actors) {
    return null
  }

  const isCircleOwner = notice.circle.owner.id === viewer.id
  const newDiscussionCount = comments?.length
  const replyCount = replies?.length
  const mentionCount = mentions?.length

  if (!newDiscussionCount && !replyCount && !mentionCount) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1

  const latestComment = [
    ...(comments || []),
    ...(replies || []),
    ...(mentions || []),
  ].filter(Boolean)[0]

  if (!latestComment) {
    return null
  }

  const circleCommentPath = toPath({
    page: 'commentDetail',
    comment: latestComment,
    circle: notice.circle,
  })

  return (
    <section
      className="container"
      data-test-id={TEST_ID.CIRCLE_NEW_DISCUSSION_COMMENTS}
    >
      <section className="avatar-wrap">
        {isMultiActors ? (
          <NoticeTypeIcon type="circle" />
        ) : (
          <NoticeActorAvatar user={notice.actors[0]} />
        )}
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeHeadActors actors={notice.actors} />

          <>
            {!isEn ? (
              <>
                {isCircleOwner ? (
                  <Translate
                    zh_hant="在你的圍爐 "
                    zh_hans="在你的围炉 "
                    en=" in your circle "
                  />
                ) : (
                  <Translate zh_hant="在圍爐 " zh_hans="在围炉 " en=" in " />
                )}
                <NoticeCircleName
                  circle={notice.circle}
                  path={circleCommentPath}
                />
              </>
            ) : null}

            {newDiscussionCount && !replyCount && !mentionCount && (
              <Translate
                zh_hant=" 眾聊中發表話題 "
                zh_hans=" 众聊中发表话题 "
                en=" started a new topic "
              />
            )}
            {!newDiscussionCount && replyCount && !mentionCount && (
              <Translate
                zh_hant=" 眾聊中回覆話題 "
                zh_hans=" 众聊中回复话题 "
                en=" replied to topics "
              />
            )}
            {!newDiscussionCount && !replyCount && mentionCount && (
              <Translate
                zh_hant=" 眾聊提及了你 "
                zh_hans=" 众聊提及了你 "
                en=" mentioned you "
              />
            )}
            {newDiscussionCount && replyCount && !mentionCount && (
              <Translate
                zh_hant=" 眾聊中發表與回覆話題 "
                zh_hans=" 众聊中发表与回复话题 "
                en=" posted and replied to topics "
              />
            )}
            {newDiscussionCount && !replyCount && mentionCount && (
              <Translate
                zh_hant=" 眾聊中發表話題，其中有提及你 "
                zh_hans=" 众聊中发表话题，其中有提及你 "
                en=" posted a new topic and mentioned you "
              />
            )}
            {!newDiscussionCount && replyCount && mentionCount && (
              <Translate
                zh_hant=" 眾聊中回覆話題，其中有提到你 "
                zh_hans=" 众聊中回复话题，其中有提到你 "
                en=" replied to topics and mentioned you "
              />
            )}
            {newDiscussionCount && replyCount && mentionCount && (
              <Translate
                zh_hant=" 眾聊中發表與回覆話題，其中有提到你 "
                zh_hans=" 众聊中发表与回复话题，其中有提到你 "
                en=" posted and replied to topics and mentioned you "
              />
            )}
            {isEn ? (
              <>
                {isCircleOwner ? <> in your circle </> : <> in </>}
                <NoticeCircleName
                  circle={notice.circle}
                  path={circleCommentPath}
                />
                &nbsp;Discussion
              </>
            ) : null}
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

CircleNewDiscussionComments.fragments = {
  notice: gql`
    fragment CircleNewDiscussionComments on CircleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      circle: target {
        ...NoticeCircleCard
      }
      comments {
        id
        type
        parentComment {
          id
        }
      }
      replies {
        id
        type
        parentComment {
          id
        }
        replyTo {
          author {
            id
          }
        }
      }
      mentions {
        id
        type
        parentComment {
          id
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeCircleCard.fragments.circle}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleNewDiscussionComments
