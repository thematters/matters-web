import gql from 'graphql-tag'
import { ReactElement } from 'react'

import { TEST_ID } from '~/common/enums'
import {
  ArticleNewAppreciationNoticeFragment,
  ArticleNewCollectedNoticeFragment,
  ArticleNewCommentNoticeFragment,
  ArticleNewSubscriberNoticeFragment,
  CircleInvitationNoticeFragment,
  CircleNewBroadcastNoticeFragment,
  CircleNewDiscussionCommentsFragment,
  CircleNewUserNoticeFragment,
  CommentMentionedYouNoticeFragment,
  CommentNewReplyNoticeFragment,
  LikeMomentNoticeFragment,
  MentionMomentNoticeFragment,
  NoticeActorAvatarUserFragment,
  NoticeHeadActorsUserFragment,
  PaymentReceivedDonationNoticeFragment,
  UserNewFollowerNoticeFragment,
} from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorsNameAndTitle from '../NoticeActorsNameAndTitle'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeDate from '../NoticeDate'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeMultiActors from '../NoticeMultiActors'
import styles from '../styles.module.css'

type NoticeDigestProps = {
  notice:
    | ArticleNewSubscriberNoticeFragment
    | ArticleNewAppreciationNoticeFragment
    | ArticleNewCollectedNoticeFragment
    | ArticleNewCommentNoticeFragment
    | CircleInvitationNoticeFragment
    | CircleNewBroadcastNoticeFragment
    | CircleNewDiscussionCommentsFragment
    | CircleNewUserNoticeFragment
    | CommentMentionedYouNoticeFragment
    | CommentNewReplyNoticeFragment
    | PaymentReceivedDonationNoticeFragment
    | UserNewFollowerNoticeFragment
    | MentionMomentNoticeFragment
    | LikeMomentNoticeFragment
  actors?: (NoticeActorAvatarUserFragment & NoticeHeadActorsUserFragment)[]
  action: string | ReactElement
  secondAction?: string | ReactElement
  title?: string | ReactElement
  content?: string | ReactElement
  testId?: TEST_ID
}

const NoticeDigest = ({
  notice,
  actors: extendActors,
  action,
  secondAction,
  title,
  content,
  testId,
}: NoticeDigestProps) => {
  if (!notice.actors) {
    return null
  }

  let actors = extendActors || notice.actors

  const actorsCount = actors.length
  const isMultiActors = actorsCount > 1

  return (
    <section
      className={styles.container}
      {...(testId ? { ['data-test-id']: testId } : {})}
    >
      <section className={styles.header}>
        <NoticeMultiActors actors={actors} size={32} />
        {!isMultiActors && (
          <section className={styles.singleActorInfo}>
            <NoticeActorsNameAndTitle
              actors={actors}
              action={action}
              secondAction={secondAction}
              title={title}
            />
          </section>
        )}
      </section>

      {isMultiActors && (
        <section className={styles.content}>
          <NoticeActorsNameAndTitle
            actors={actors}
            action={action}
            secondAction={secondAction}
            title={title}
          />
        </section>
      )}

      {content && <section className={styles.content}>{content}</section>}

      <section className={styles.footer}>
        <NoticeDate notice={notice} />
      </section>
    </section>
  )
}

NoticeDigest.fragments = {
  notice: gql`
    fragment NoticeDigestArticle on ArticleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      article: target {
        ...NoticeArticleCard
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}

    fragment NoticeDigestUser on UserNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeDate.fragments.notice}
  `,
}

export default NoticeDigest
