import gql from 'graphql-tag'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { numAbbr } from '~/common/utils'
import { ArticleNewSubscriberNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

const ArticleNewSubscriberNotice = ({
  notice,
}: {
  notice: ArticleNewSubscriberNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1

  return (
    <section
      className="container"
      data-test-id={TEST_ID.ARTICLE_NEW_SUBSCRIBER}
    >
      <section className="avatar-wrap">
        {isMultiActors ? (
          <NoticeTypeIcon type="bookmark" />
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
            <FormattedMessage
              description="src/components/Notice/ArticleNotice/ArticleNewSubscriberNotice.tsx"
              defaultMessage="etc. {actorsCount} users"
              values={{
                actorsCount: numAbbr(actorsCount),
              }}
            />
          )}
          <FormattedMessage
            defaultMessage="bookmarked your article"
            description="src/components/Notice/ArticleNotice/ArticleNewSubscriberNotice.tsx"
          />
        </NoticeHead>

        <NoticeArticleCard article={notice.article} />

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

ArticleNewSubscriberNotice.fragments = {
  notice: gql`
    fragment ArticleNewSubscriberNotice on ArticleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      article: target {
        ...NoticeArticleCard
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default ArticleNewSubscriberNotice
