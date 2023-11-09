import gql from 'graphql-tag'
import React from 'react'

import { DigestNoticeFragment } from '~/gql/graphql'

import ArticleArticleNotice from './ArticleArticleNotice'
import ArticleNotice from './ArticleNotice'
import CircleNotice from './CircleNotice'
import CommentCommentNotice from './CommentCommentNotice'
import CommentNotice from './CommentNotice'
import OfficialAnnouncementNotice from './OfficialAnnouncementNotice'
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
        ...OfficialAnnouncementNotice
      }
    }
    ${UserNotice.fragments.notice}
    ${ArticleArticleNotice.fragments.notice}
    ${ArticleNotice.fragments.notice}
    ${CommentCommentNotice.fragments.notice}
    ${CommentNotice.fragments.notice}
    ${TransactionNotice.fragments.notice}
    ${CircleNotice.fragments.notice}
    ${OfficialAnnouncementNotice.fragments.notice}
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
      return <OfficialAnnouncementNotice notice={notice} />
    default:
      return null
  }
}

Notice.fragments = fragments
