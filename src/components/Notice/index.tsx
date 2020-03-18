import gql from 'graphql-tag'

import ArticleMentionedYouNotice from './ArticleMentionedYouNotice'
import ArticleNewAppreciationNotice from './ArticleNewAppreciationNotice'
import ArticleNewCollectedNotice from './ArticleNewCollectedNotice'
import ArticleNewCommentNotice from './ArticleNewCommentNotice'
import ArticleNewDownstreamNotice from './ArticleNewDownstreamNotice'
import ArticleNewSubscriberNotice from './ArticleNewSubscriberNotice'
import ArticlePublishedNotice from './ArticlePublishedNotice'
import ArticleTagHasBeenAddedNotice from './ArticleTagHasBeenAddedNotice'
import ArticleTagHasBeenRemovedNotice from './ArticleTagHasBeenRemovedNotice'
import ArticleTagHasBeenUnselectedNotice from './ArticleTagHasBeenUnselectedNotice'
import CommentMentionedYouNotice from './CommentMentionedYouNotice'
import CommentNewReplyNotice from './CommentNewReplyNotice'
import CommentPinnedNotice from './CommentPinnedNotice'
import DownstreamArticleArchivedNotice from './DownstreamArticleArchivedNotice'
import OfficialAnnouncementNotice from './OfficialAnnouncementNotice'
import SubscribedArticleNewCommentNotice from './SubscribedArticleNewCommentNotice'
import UpstreamArticleArchivedNotice from './UpstreamArticleArchivedNotice'
import UserNewFollowerNotice from './UserNewFollowerNotice'

import { DigestNotice } from './__generated__/DigestNotice'

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
      ... on ArticleNewCollectedNotice {
        ...ArticleNewCollectedNotice
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
      ... on CommentMentionedYouNotice {
        ...CommentMentionedYouNotice
      }
      ... on OfficialAnnouncementNotice {
        ...OfficialAnnouncementNotice
      }
      ... on ArticleTagHasBeenAddedNotice {
        ...ArticleTagHasBeenAddedNotice
      }
      ... on ArticleTagHasBeenRemovedNotice {
        ...ArticleTagHasBeenRemovedNotice
      }
      ... on ArticleTagHasBeenUnselectedNotice {
        ...ArticleTagHasBeenUnselectedNotice
      }
    }
    ${ArticleNewAppreciationNotice.fragments.notice}
    ${ArticleNewCommentNotice.fragments.notice}
    ${ArticleNewDownstreamNotice.fragments.notice}
    ${ArticleNewCollectedNotice.fragments.notice}
    ${ArticleNewSubscriberNotice.fragments.notice}
    ${ArticlePublishedNotice.fragments.notice}
    ${ArticleMentionedYouNotice.fragments.notice}
    ${CommentMentionedYouNotice.fragments.notice}
    ${CommentNewReplyNotice.fragments.notice}
    ${CommentPinnedNotice.fragments.notice}
    ${DownstreamArticleArchivedNotice.fragments.notice}
    ${OfficialAnnouncementNotice.fragments.notice}
    ${SubscribedArticleNewCommentNotice.fragments.notice}
    ${UpstreamArticleArchivedNotice.fragments.notice}
    ${UserNewFollowerNotice.fragments.notice}
    ${ArticleTagHasBeenAddedNotice.fragments.notice}
    ${ArticleTagHasBeenRemovedNotice.fragments.notice}
    ${ArticleTagHasBeenUnselectedNotice.fragments.notice}
  `
}

export const Notice = ({ notice }: { notice: DigestNotice }) => {
  switch (notice.__typename) {
    case 'ArticleNewAppreciationNotice':
      return <ArticleNewAppreciationNotice notice={notice} />
    case 'ArticleNewCommentNotice':
      return <ArticleNewCommentNotice notice={notice} />
    case 'ArticleNewDownstreamNotice':
      return <ArticleNewDownstreamNotice notice={notice} />
    case 'ArticleNewCollectedNotice':
      return <ArticleNewCollectedNotice notice={notice} />
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
    case 'ArticleTagHasBeenAddedNotice':
      return <ArticleTagHasBeenAddedNotice notice={notice} />
    case 'ArticleTagHasBeenRemovedNotice':
      return <ArticleTagHasBeenRemovedNotice notice={notice} />
    case 'ArticleTagHasBeenUnselectedNotice':
      return <ArticleTagHasBeenUnselectedNotice notice={notice} />
    default:
      return null
  }
}

Notice.fragments = fragments
