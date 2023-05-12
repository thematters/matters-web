import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ArticleNewSubscriberNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeContentActors from '../NoticeContentActors'
import NoticeDate from '../NoticeDate'
import NoticeMultiActors from '../NoticeMultiActors'
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

  // FIXME: Just for Dev
  let actors = notice.actors
  // actors = [...actors, ...actors, ...actors, ...actors]
  // actors = [...actors, ...actors, ...actors, ...actors, ...actors]

  return (
    <section
      className="container"
      data-test-id={TEST_ID.ARTICLE_NEW_SUBSCRIBER}
    >
      <section className="header">
        <NoticeMultiActors actors={actors} size="lg" />
        {!isMultiActors && (
          <section className="single-actor-info">
            <NoticeContentActors
              actors={actors}
              action={
                <FormattedMessage
                  defaultMessage="bookmarked"
                  description="src/components/Notice/ArticleNotice/ArticleNewSubscriberNotice.tsx"
                />
              }
              content={<NoticeArticleTitle article={notice.article} />}
            />
          </section>
        )}
      </section>

      {isMultiActors && (
        <section className="content">
          <NoticeContentActors
            actors={actors}
            action={
              <FormattedMessage
                defaultMessage="bookmarked"
                description="src/components/Notice/ArticleNotice/ArticleNewSubscriberNotice.tsx"
              />
            }
            content={<NoticeArticleTitle article={notice.article} />}
          />
        </section>
      )}

      <section className="footer">
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
