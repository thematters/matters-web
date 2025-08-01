import gql from 'graphql-tag'

import { ArticleNoticeFragment } from '~/gql/graphql'

import ArticleMentionedYouNotice from './ArticleMentionedYouNotice'
import ArticleNewAppreciationNotice from './ArticleNewAppreciationNotice'
import ArticleNewSubscriberNotice from './ArticleNewSubscriberNotice'
import ArticlePublishedNotice from './ArticlePublishedNotice'
import CircleNewArticle from './CircleNewArticle'
import RevisedArticleNotPublishedNotice from './RevisedArticleNotPublishedNotice'
import RevisedArticlePublishedNotice from './RevisedArticlePublishedNotice'
import ScheduledArticlePublishedNotice from './ScheduledArticlePublishedNotice'
import TopicChannelFeedbackAcceptedNotice from './TopicChannelFeedbackAcceptedNotice'

const ArticleNotice = ({ notice }: { notice: ArticleNoticeFragment }) => {
  switch (notice.articleNoticeType) {
    case 'ArticlePublished':
      return <ArticlePublishedNotice notice={notice} />
    case 'ScheduledArticlePublished':
      return <ScheduledArticlePublishedNotice notice={notice} />
    case 'ArticleMentionedYou':
      return <ArticleMentionedYouNotice notice={notice} />
    case 'ArticleNewSubscriber':
      return <ArticleNewSubscriberNotice notice={notice} />
    case 'ArticleNewAppreciation':
      return <ArticleNewAppreciationNotice notice={notice} />
    case 'RevisedArticlePublished':
      return <RevisedArticlePublishedNotice notice={notice} />
    case 'RevisedArticleNotPublished':
      return <RevisedArticleNotPublishedNotice notice={notice} />
    case 'CircleNewArticle':
      return <CircleNewArticle notice={notice} />
    case 'TopicChannelFeedbackAccepted':
      return <TopicChannelFeedbackAcceptedNotice notice={notice} />
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
      ...ArticleMentionedYouNotice
      ...ArticleNewAppreciationNotice
      ...ArticleNewSubscriberNotice
      ...ArticlePublishedNotice
      ...ScheduledArticlePublishedNotice
      ...RevisedArticleNotPublishedNotice
      ...RevisedArticlePublishedNotice
      ...CircleNewArticleNotice
      ...TopicChannelFeedbackAcceptedNotice
    }
    ${ArticleMentionedYouNotice.fragments.notice}
    ${ArticleNewAppreciationNotice.fragments.notice}
    ${ArticleNewSubscriberNotice.fragments.notice}
    ${ArticlePublishedNotice.fragments.notice}
    ${ScheduledArticlePublishedNotice.fragments.notice}
    ${RevisedArticleNotPublishedNotice.fragments.notice}
    ${RevisedArticlePublishedNotice.fragments.notice}
    ${CircleNewArticle.fragments.notice}
    ${TopicChannelFeedbackAcceptedNotice.fragments.notice}
  `,
}

export default ArticleNotice
