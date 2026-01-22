import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ScheduledArticlePublishedFragment } from '~/gql/graphql'

import ArticleCard from '../ArticleCard'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'

const ScheduledArticlePublished = ({
  notice,
}: {
  notice: ScheduledArticlePublishedFragment
}) => {
  const { entities } = notice

  const hasWritingChallenge = entities.some(
    (entity) => entity.__typename === 'WritingChallenge'
  )
  const hasCollection = entities.some(
    (entity) => entity.__typename === 'Collection'
  )
  const hasArticle = entities.some((entity) => entity.__typename === 'Article')

  const getMessage = () => {
    // If the event has ended
    if (hasWritingChallenge) {
      return (
        <FormattedMessage
          defaultMessage="Your schedule article published successfully, but failed to submit because the selection event has ended"
          id="11nXAM"
          description="src/components/Notice/ArticleNotice/ScheduledArticlePublishedNotice.tsx"
        />
      )
    }

    // If the collection failed to be added
    if (hasCollection) {
      return (
        <FormattedMessage
          defaultMessage="Your schedule article published successfully, but some full collections failed to be added"
          id="oNi7K5"
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
          defaultMessage="Your schedule article published successfully, some archived articles failed to be curated"
          id="wHAfde"
          description="src/components/Notice/ArticleNotice/ScheduledArticlePublishedNotice.tsx"
        />
      )
    }

    // Default message if no specific entity type found
    return (
      <FormattedMessage
        defaultMessage="Your schedule article has been published"
        id="HDkifr"
        description="src/components/Notice/ArticleNotice/ScheduledArticlePublishedNotice.tsx"
      />
    )
  }

  return (
    <NoticeCard
      notice={notice}
      type="system"
      content={
        <>
          {getMessage()}
          <ArticleCard article={notice.article} />
        </>
      }
    />
  )
}

ScheduledArticlePublished.fragments = {
  notice: gql`
    fragment ScheduledArticlePublished on ArticleNotice {
      id
      ...NoticeDate
      article: target {
        ...NoticeArticleCard
        ...ArticleCardArticle
      }
      entities {
        id
      }
    }
    ${NoticeArticleCard.fragments.article}
    ${ArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default ScheduledArticlePublished
