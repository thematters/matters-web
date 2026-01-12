import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { ArticlePublishedFragment } from '~/gql/graphql'

import ArticleCard from '../ArticleCard'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'

const ArticlePublished = ({ notice }: { notice: ArticlePublishedFragment }) => {
  return (
    <NoticeCard
      notice={notice}
      type="system"
      content={
        <>
          <FormattedMessage
            defaultMessage="Your work has been published to IPFS"
            description="src/components/Notice/ArticleNotice/ArticlePublished.tsx"
            id="uQxskc"
          />
          <ArticleCard article={notice.article} />
        </>
      }
    />
  )
}

ArticlePublished.fragments = {
  notice: gql`
    fragment ArticlePublished on ArticleNotice {
      id
      ...NoticeDate
      article: target {
        ...NoticeArticleCard
        ...ArticleCardArticle
      }
    }
    ${NoticeArticleCard.fragments.article}
    ${ArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default ArticlePublished
