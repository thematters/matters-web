import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ScheduledArticlePublishedNoticeFragment } from '~/gql/graphql'

import NoticeArticleCard from '../NoticeArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import styles from '../styles.module.css'

const ScheduledArticlePublishedNotice = ({
  notice,
}: {
  notice: ScheduledArticlePublishedNoticeFragment
}) => {
  const { entities } = notice

  const hasWritingChallenge = entities.some(
    (entity) => entity.__typename === 'WritingChallenge'
  )
  const hasCollection = entities.some(
    (entity) => entity.__typename === 'Collection'
  )
  const hasArticle = entities.some((entity) => entity.__typename === 'Article')

  const getNoticeMessage = () => {
    // If the event has ended
    if (hasWritingChallenge) {
      return (
        <FormattedMessage
          defaultMessage="Your schedule article {articleTitle} published successfully, but failed to submit because the selection event has ended"
          id="OWCMkI"
          description="src/components/Notice/ArticleNotice/ScheduledArticlePublishedNotice.tsx"
          values={{
            articleTitle: <NoticeArticleTitle article={notice.article} />,
          }}
        />
      )
    }

    // If the collection failed to be added
    if (hasCollection) {
      return (
        <FormattedMessage
          defaultMessage="Your schedule article {articleTitle} published successfully, but some full collections failed to be added"
          id="w1KWJ2"
          description="src/components/Notice/ArticleNotice/ScheduledArticlePublishedNotice.tsx"
          values={{
            articleTitle: <NoticeArticleTitle article={notice.article} />,
          }}
        />
      )
    }

    // If the article failed to be curated
    if (hasArticle) {
      return (
        <FormattedMessage
          defaultMessage="Your schedule article {articleTitle} published successfully, some archived articles failed to be curated"
          id="ECPtpP"
          description="src/components/Notice/ArticleNotice/ScheduledArticlePublishedNotice.tsx"
          values={{
            articleTitle: <NoticeArticleTitle article={notice.article} />,
          }}
        />
      )
    }

    // Default message if no specific entity type found
    return (
      <FormattedMessage
        defaultMessage="Your schedule article {articleTitle} has been published"
        id="FRfbEu"
        description="src/components/Notice/ArticleNotice/ScheduledArticlePublishedNotice.tsx"
        values={{
          articleTitle: <NoticeArticleTitle article={notice.article} />,
        }}
      />
    )
  }

  return (
    <section
      className={styles.container}
      data-test-id={TEST_ID.NOTICE_SCHEDULED_ARTICLE_PUBLISHED}
    >
      <section className={styles.noticeActorsNameAndTitleInfo}>
        {getNoticeMessage()}
      </section>

      <section className={styles.footer}>
        <NoticeDate notice={notice} />
      </section>
    </section>
  )
}

ScheduledArticlePublishedNotice.fragments = {
  notice: gql`
    fragment ScheduledArticlePublishedNotice on ArticleNotice {
      id
      ...NoticeDate
      article: target {
        ...NoticeArticleCard
      }
      entities {
        id
      }
    }
    ${NoticeArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default ScheduledArticlePublishedNotice
