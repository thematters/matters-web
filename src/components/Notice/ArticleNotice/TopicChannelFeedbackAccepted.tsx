import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TopicChannelFeedbackAcceptedFragment } from '~/gql/graphql'

import ArticleCard from '../ArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'

const TopicChannelFeedbackAccepted = ({
  notice,
}: {
  notice: TopicChannelFeedbackAcceptedFragment
}) => {
  return (
    <NoticeCard
      notice={notice}
      type="system"
      content={
        <>
          <FormattedMessage
            defaultMessage="Your channel suggestion has been accepted by the editor. Thank you for supporting Matters!"
            description="src/components/Notice/ArticleNotice/TopicChannelFeedbackAcceptedNotice.tsx"
            id="DoOt1q"
          />
          <ArticleCard article={notice.article} />
        </>
      }
    />
  )
}

TopicChannelFeedbackAccepted.fragments = {
  notice: gql`
    fragment TopicChannelFeedbackAccepted on ArticleNotice {
      id
      ...NoticeDate
      article: target {
        ...NoticeArticleTitle
        ...ArticleCardArticle
      }
    }
    ${NoticeArticleTitle.fragments.article}
    ${ArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default TopicChannelFeedbackAccepted
