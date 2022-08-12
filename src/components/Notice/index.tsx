import gql from 'graphql-tag'
import React from 'react'

import ArticleArticleNotice from './ArticleArticleNotice'
import ArticleNotice from './ArticleNotice'
import ArticleTagNotice from './ArticleTagNotice'
import CircleArticleNotice from './CircleArticleNotice'
import CircleCommentNotice from './CircleCommentNotice'
import CircleNotice from './CircleNotice'
import CommentCommentNotice from './CommentCommentNotice'
import CommentNotice from './CommentNotice'
import CryptoNotice from './CryptoNotice'
import OfficialAnnouncementNotice from './OfficialAnnouncementNotice'
import TagNotice from './TagNotice'
import TransactionNotice from './TransactionNotice'
import UserNotice from './UserNotice'

import { DigestNotice } from './__generated__/DigestNotice'

interface NoticeProps {
  notice: DigestNotice
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
      ... on ArticleTagNotice {
        ...ArticleTagNotice
      }
      ... on CommentCommentNotice {
        ...CommentCommentNotice
      }
      ... on CommentNotice {
        ...CommentNotice
      }
      ... on TagNotice {
        ...TagNotice
      }
      ... on TransactionNotice {
        ...TransactionNotice
      }
      ... on CircleArticleNotice {
        ...CircleArticleNotice
      }
      ... on CircleCommentNotice {
        ...CircleCommentNotice
      }
      ... on CircleNotice {
        ...CircleNotice
      }
      ... on CryptoNotice {
        ...CryptoNotice
      }
      ... on OfficialAnnouncementNotice {
        ...OfficialAnnouncementNotice
      }
    }
    ${UserNotice.fragments.notice}
    ${ArticleArticleNotice.fragments.notice}
    ${ArticleNotice.fragments.notice}
    ${ArticleTagNotice.fragments.notice}
    ${CommentCommentNotice.fragments.notice}
    ${CommentNotice.fragments.notice}
    ${TagNotice.fragments.notice}
    ${TransactionNotice.fragments.notice}
    ${CircleArticleNotice.fragments.notice}
    ${CircleCommentNotice.fragments.notice}
    ${CircleNotice.fragments.notice}    
    ${CryptoNotice.fragments.notice}
    ${OfficialAnnouncementNotice.fragments.notice}
  `,
}

const BaseNotice: React.FC<NoticeProps> = ({ notice }) => {
  if (notice.__typename !== 'CircleNotice') {
    console.log(notice)
  }
  switch (notice.__typename) {
    case 'UserNotice':
      return <UserNotice notice={notice} />
    case 'ArticleArticleNotice':
      return <ArticleArticleNotice notice={notice} />
    case 'ArticleNotice':
      return <ArticleNotice notice={notice} />
    case 'ArticleTagNotice':
      return <ArticleTagNotice notice={notice} />
    case 'CommentCommentNotice':
      return <CommentCommentNotice notice={notice} />
    case 'CommentNotice':
      return <CommentNotice notice={notice} />
    case 'TagNotice':
      return <TagNotice notice={notice} />
    case 'TransactionNotice':
      return <TransactionNotice notice={notice} />
    case 'CircleArticleNotice':
      return <CircleArticleNotice notice={notice} />
    case 'CircleCommentNotice':
      return <CircleCommentNotice notice={notice} />
    case 'CircleNotice':
      return <CircleNotice notice={notice} />
    case 'CryptoNotice':
      return <CryptoNotice notice={notice} />
    case 'OfficialAnnouncementNotice':
      return <OfficialAnnouncementNotice notice={notice} />
    default:
      return null
  }
}

/**
 * Memoizing
 */
type MemoizedNotice = React.MemoExoticComponent<React.FC<NoticeProps>> & {
  fragments: typeof fragments
}

export const Notice = React.memo(BaseNotice, () => true) as MemoizedNotice

Notice.fragments = fragments
