import gql from 'graphql-tag'

import { DigestNotice } from './__generated__/DigestNotice'
import ArticleMentionedYouNotice from './ArticleMentionedYouNotice'
import ArticleNewAppreciationNotice from './ArticleNewAppreciationNotice'
import ArticleNewCommentNotice from './ArticleNewCommentNotice'
import ArticleNewDownstreamNotice from './ArticleNewDownstreamNotice'
import ArticleNewSubscriberNotice from './ArticleNewSubscriberNotice'
import ArticlePublishedNotice from './ArticlePublishedNotice'
import CommentMentionedYouNotice from './CommentMentionedYouNotice'
import CommentNewReplyNotice from './CommentNewReplyNotice'
import CommentNewUpvoteNotice from './CommentNewUpvoteNotice'
import CommentPinnedNotice from './CommentPinnedNotice'
import DownstreamArticleArchivedNotice from './DownstreamArticleArchivedNotice'
import OfficialAnnouncementNotice from './OfficialAnnouncementNotice'
import SubscribedArticleNewCommentNotice from './SubscribedArticleNewCommentNotice'
import UpstreamArticleArchivedNotice from './UpstreamArticleArchivedNotice'
import UserNewFollowerNotice from './UserNewFollowerNotice'

const fragments = {
  notice: gql`
    fragment DigestNotice on Notice {
      ... on UserNewFollowerNotice {
        ...UserNewFollowerNotice
      }
      ... on ArticlePublishedNotice {
        ...ArticlePublishedNotice
      }
      ... on ArticleNewDownstreamNotice {
        ...ArticleNewDownstreamNotice
      }
      ... on ArticleNewAppreciationNotice {
        ...ArticleNewAppreciationNotice
      }
      ... on ArticleNewSubscriberNotice {
        ...ArticleNewSubscriberNotice
      }
      ... on ArticleNewCommentNotice {
        ...ArticleNewCommentNotice
      }
      ... on ArticleMentionedYouNotice {
        ...ArticleMentionedYouNotice
      }
      ... on SubscribedArticleNewCommentNotice {
        ...SubscribedArticleNewCommentNotice
      }
      ... on UpstreamArticleArchivedNotice {
        ...UpstreamArticleArchivedNotice
      }
      ... on DownstreamArticleArchivedNotice {
        ...DownstreamArticleArchivedNotice
      }
      ... on CommentPinnedNotice {
        ...CommentPinnedNotice
      }
      ... on CommentNewReplyNotice {
        ...CommentNewReplyNotice
      }
      ... on CommentNewUpvoteNotice {
        ...CommentNewUpvoteNotice
      }
      ... on CommentMentionedYouNotice {
        ...CommentMentionedYouNotice
      }
      ... on OfficialAnnouncementNotice {
        ...OfficialAnnouncementNotice
      }
    }
    ${ArticleNewAppreciationNotice.fragments.notice}
    ${ArticleNewCommentNotice.fragments.notice}
    ${ArticleNewDownstreamNotice.fragments.notice}
    ${ArticleNewSubscriberNotice.fragments.notice}
    ${ArticlePublishedNotice.fragments.notice}
    ${ArticleMentionedYouNotice.fragments.notice}
    ${CommentMentionedYouNotice.fragments.notice}
    ${CommentNewReplyNotice.fragments.notice}
    ${CommentNewUpvoteNotice.fragments.notice}
    ${CommentPinnedNotice.fragments.notice}
    ${DownstreamArticleArchivedNotice.fragments.notice}
    ${OfficialAnnouncementNotice.fragments.notice}
    ${SubscribedArticleNewCommentNotice.fragments.notice}
    ${UpstreamArticleArchivedNotice.fragments.notice}
    ${UserNewFollowerNotice.fragments.notice}
  `
}

const FeedDigest = ({ notice }: { notice: DigestNotice }) => {
  switch (notice.__typename) {
    case 'ArticleNewAppreciationNotice':
      return <ArticleNewAppreciationNotice notice={notice} />
    case 'ArticleNewCommentNotice':
      return <ArticleNewCommentNotice notice={notice} />
    case 'ArticleNewDownstreamNotice':
      return <ArticleNewDownstreamNotice notice={notice} />
    case 'ArticleNewSubscriberNotice':
      return <ArticleNewSubscriberNotice notice={notice} />
    case 'ArticlePublishedNotice':
      return <ArticlePublishedNotice notice={notice} />
    case 'ArticleMentionedYouNotice':
      return <ArticleMentionedYouNotice notice={notice} />
    case 'CommentMentionedYouNotice':
      return <CommentMentionedYouNotice notice={notice} />
    case 'CommentNewReplyNotice':
      return <CommentNewReplyNotice notice={notice} />
    case 'CommentNewUpvoteNotice':
      return <CommentNewUpvoteNotice notice={notice} />
    case 'CommentPinnedNotice':
      return <CommentPinnedNotice notice={notice} />
    case 'DownstreamArticleArchivedNotice':
      return <DownstreamArticleArchivedNotice notice={notice} />
    case 'OfficialAnnouncementNotice':
      return <OfficialAnnouncementNotice notice={notice} />
    case 'SubscribedArticleNewCommentNotice':
      return <SubscribedArticleNewCommentNotice notice={notice} />
    case 'UpstreamArticleArchivedNotice':
      return <UpstreamArticleArchivedNotice notice={notice} />
    case 'UserNewFollowerNotice':
      return <UserNewFollowerNotice notice={notice} />
  }
}

FeedDigest.fragments = fragments

export default FeedDigest
