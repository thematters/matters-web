import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { LanguageContext, ViewerContext } from '~/components'
import { CircleNewDiscussionCommentsFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

type CircleNewDiscussionCommentsType = {
  notice: CircleNewDiscussionCommentsFragment
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
                  <FormattedMessage
                    defaultMessage="in your circle"
                    description=""
                  />
                ) : (
                  <FormattedMessage defaultMessage="in circle" description="" />
                )}
                <NoticeCircleName
                  circle={notice.circle}
                  path={circleCommentPath}
                />
              </>
            ) : null}

            {newDiscussionCount && !replyCount && !mentionCount && (
              <FormattedMessage
                defaultMessage="started a new topic"
                description="src/components/Notice/CircleNotice/CircleNewDiscussionComments.tsx"
              />
            )}
            {!newDiscussionCount && replyCount && !mentionCount && (
              <FormattedMessage
                defaultMessage="replied to topics"
                description="src/components/Notice/CircleNotice/CircleNewDiscussionComments.tsx"
              />
            )}
            {!newDiscussionCount && !replyCount && mentionCount && (
              <FormattedMessage
                defaultMessage="mentioned you"
                description="src/components/Notice/CircleNotice/CircleNewDiscussionComments.tsx"
              />
            )}
            {newDiscussionCount && replyCount && !mentionCount && (
              <FormattedMessage
                defaultMessage="posted and replied to topics"
                description="src/components/Notice/CircleNotice/CircleNewDiscussionComments.tsx"
              />
            )}
            {newDiscussionCount && !replyCount && mentionCount && (
              <FormattedMessage
                defaultMessage="posted a new topic and mentioned you"
                description="src/components/Notice/CircleNotice/CircleNewDiscussionComments.tsx"
              />
            )}
            {!newDiscussionCount && replyCount && mentionCount && (
              <FormattedMessage
                defaultMessage="replied to topics and mentioned you"
                description="src/components/Notice/CircleNotice/CircleNewDiscussionComments.tsx"
              />
            )}
            {newDiscussionCount && replyCount && mentionCount && (
              <FormattedMessage
                defaultMessage="posted and replied to topics and mentioned you"
                description="src/components/Notice/CircleNotice/CircleNewDiscussionComments.tsx"
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
