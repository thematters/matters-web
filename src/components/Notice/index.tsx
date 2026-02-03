import gql from 'graphql-tag'
import React from 'react'

import { DigestNoticeFragment } from '~/gql/graphql'

import ArticleArticleNotice from './ArticleArticleNotice'
import ArticleNotice from './ArticleNotice'
import CampaignArticleNotice from './CampaignArticleNotice'
import CircleNotice from './CircleNotice'
import CollectionNotice from './CollectionNotice'
import CommentCommentNotice from './CommentCommentNotice'
import CommentNotice from './CommentNotice'
import MomentNotice from './MomentNotice'
import OfficialAnnouncement from './OfficialNotice'
import TransactionNotice from './TransactionNotice'
import UserNotice from './UserNotice'

interface NoticeProps {
  notice: DigestNoticeFragment
}

const fragments = {
  notice: gql`
    fragment DigestNotice on Notice {
      ... on UserNotice {
        ...UserNotice
      }
      ... on ArticleArticleNotice {
        ...ArticleArticleNotice
      }
      ... on ArticleNotice {
        ...ArticleNotice
      }
      ... on CommentCommentNotice {
        ...CommentCommentNotice
      }
      ... on CommentNotice {
        ...CommentNotice
      }
      ... on TransactionNotice {
        ...TransactionNotice
      }
      ... on CircleNotice {
        ...CircleNotice
      }
      ... on OfficialAnnouncementNotice {
        ...OfficialAnnouncement
      }
      ... on MomentNotice {
        ...MomentNotice
      }
      ... on CollectionNotice {
        ...CollectionNotice
      }
      ... on CampaignArticleNotice {
        ...CampaignArticleNotice
      }
    }
    ${UserNotice.fragments.notice}
    ${ArticleArticleNotice.fragments.notice}
    ${ArticleNotice.fragments.notice}
    ${CommentCommentNotice.fragments.notice}
    ${CommentNotice.fragments.notice}
    ${TransactionNotice.fragments.notice}
    ${CircleNotice.fragments.notice}
    ${OfficialAnnouncement.fragments.notice}
    ${MomentNotice.fragments.notice}
    ${CollectionNotice.fragments.notice}
    ${CampaignArticleNotice.fragments.notice}
  `,
}

export const Notice: React.FC<NoticeProps> & {
  fragments: typeof fragments
} = ({ notice }) => {
  switch (notice.__typename) {
    case 'UserNotice':
      return <UserNotice notice={notice} />
    case 'ArticleArticleNotice':
      return <ArticleArticleNotice notice={notice} />
    case 'ArticleNotice':
      return <ArticleNotice notice={notice} />
    case 'CommentCommentNotice':
      return <CommentCommentNotice notice={notice} />
    case 'CommentNotice':
      return <CommentNotice notice={notice} />
    case 'TransactionNotice':
      return <TransactionNotice notice={notice} />
    case 'CircleNotice':
      return <CircleNotice notice={notice} />
    case 'OfficialAnnouncementNotice':
      return <OfficialAnnouncement notice={notice} />
    case 'MomentNotice':
      return <MomentNotice notice={notice} />
    case 'CollectionNotice':
      return <CollectionNotice notice={notice} />
    case 'CampaignArticleNotice':
      return <CampaignArticleNotice notice={notice} />
    default:
      return null
  }
}

Notice.fragments = fragments
