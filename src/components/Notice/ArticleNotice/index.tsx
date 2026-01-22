import gql from 'graphql-tag'

import { ArticleNoticeFragment } from '~/gql/graphql'

import ArticleMentionedYou from './ArticleMentionedYou'
import ArticleNewAppreciation from './ArticleNewAppreciation'
import ArticleNewSubscriber from './ArticleNewSubscriber'
import ArticlePublished from './ArticlePublished'
import CircleNewArticle from './CircleNewArticle'
import RevisedArticleNotPublishedNotice from './RevisedArticleNotPublishedNotice'
import RevisedArticlePublishedNotice from './RevisedArticlePublishedNotice'
import ScheduledArticlePublished from './ScheduledArticlePublished'
import TopicChannelFeedbackAccepted from './TopicChannelFeedbackAccepted'

const ArticleNotice = ({ notice }: { notice: ArticleNoticeFragment }) => {
  switch (notice.articleNoticeType) {
    case 'ArticlePublished':
      return <ArticlePublished notice={notice} />
    case 'ScheduledArticlePublished':
      return <ScheduledArticlePublished notice={notice} />
    case 'ArticleMentionedYou':
      return <ArticleMentionedYou notice={notice} />
    case 'ArticleNewSubscriber':
      return <ArticleNewSubscriber notice={notice} />
    case 'ArticleNewAppreciation':
      return <ArticleNewAppreciation notice={notice} />
    case 'RevisedArticlePublished':
      return <RevisedArticlePublishedNotice notice={notice} />
    case 'RevisedArticleNotPublished':
      return <RevisedArticleNotPublishedNotice notice={notice} />
    case 'CircleNewArticle':
      return <CircleNewArticle notice={notice} />
    case 'TopicChannelFeedbackAccepted':
      return <TopicChannelFeedbackAccepted notice={notice} />
    default:
      return null
  }
}

ArticleNotice.fragments = {
  notice: gql`
    fragment ArticleNotice on ArticleNotice {
      id
      unread
      __typename
      articleNoticeType: type
      ...ArticleMentionedYou
      ...ArticleNewAppreciation
      ...ArticleNewSubscriber
      ...ArticlePublished
      ...ScheduledArticlePublished
      ...RevisedArticleNotPublishedNotice
      ...RevisedArticlePublishedNotice
      ...CircleNewArticleNotice
      ...TopicChannelFeedbackAccepted
    }
    ${ArticleMentionedYou.fragments.notice}
    ${ArticleNewAppreciation.fragments.notice}
    ${ArticleNewSubscriber.fragments.notice}
    ${ArticlePublished.fragments.notice}
    ${ScheduledArticlePublished.fragments.notice}
    ${RevisedArticleNotPublishedNotice.fragments.notice}
    ${RevisedArticlePublishedNotice.fragments.notice}
    ${CircleNewArticle.fragments.notice}
    ${TopicChannelFeedbackAccepted.fragments.notice}
  `,
}

export default ArticleNotice
