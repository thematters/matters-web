import gql from 'graphql-tag'
import { ReactElement } from 'react'

import {
  ArticleNewAppreciationNoticeFragment,
  ArticleNewCollectedNoticeFragment,
  ArticleNewCommentNoticeFragment,
  ArticleNewSubscriberNoticeFragment,
  ArticleTagAddedNoticeFragment,
  CommentMentionedYouNoticeFragment,
  CommentNewReplyNoticeFragment,
  PaymentReceivedDonationNoticeFragment,
  TagAddEditorNoticeFragment,
  UserNewFollowerNoticeFragment,
} from '@/src/gql/graphql'
import { TEST_ID } from '~/common/enums'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorsNameAndTitle from '../NoticeActorsNameAndTitle'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeDate from '../NoticeDate'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeMultiActors from '../NoticeMultiActors'
import styles from '../styles.css'

type NoticeDigestProps = {
  notice:
    | ArticleTagAddedNoticeFragment
    | ArticleNewSubscriberNoticeFragment
    | ArticleNewAppreciationNoticeFragment
    | ArticleNewCollectedNoticeFragment
    | ArticleNewCommentNoticeFragment
    | CommentMentionedYouNoticeFragment
    | CommentNewReplyNoticeFragment
    | PaymentReceivedDonationNoticeFragment
    | UserNewFollowerNoticeFragment
    | TagAddEditorNoticeFragment
  action: string | ReactElement
  secondAction?: string | ReactElement
  title?: string | ReactElement
  content?: string | ReactElement
  testId?: TEST_ID
}

const NoticeDigest = ({
  notice,
  action,
  secondAction,
  title,
  content,
  testId,
}: NoticeDigestProps) => {
  if (!notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1

  // FIXME: Just for Dev
  let actors = notice.actors
  // actors = [...actors, ...actors, ...actors, ...actors]
  // actors = [...actors, ...actors, ...actors, ...actors, ...actors]

  return (
    <section
      className="container"
      {...(testId ? { ['data-test-id']: testId } : {})}
    >
      <section className="header">
        <NoticeMultiActors actors={actors} size="lg" />
        {!isMultiActors && (
          <section className="single-actor-info">
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
        <section className="content">
          <NoticeActorsNameAndTitle
            actors={actors}
            action={action}
            secondAction={secondAction}
            title={title}
          />
        </section>
      )}

      {content && <section className="content">{content}</section>}

      <section className="footer">
        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
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
