import gql from 'graphql-tag'

import ArticleTagAddedNotice from './ArticleTagAddedNotice'
import ArticleTagRemovedNotice from './ArticleTagRemovedNotice'

import { ArticleTagNotice as NoticeType } from './__generated__/ArticleTagNotice'

const ArticleTagNotice = ({ notice }: { notice: NoticeType }) => {
  switch (notice.articleTagNoticeType) {
    case 'ArticleTagAdded':
      return <ArticleTagAddedNotice notice={notice} />
    case 'ArticleTagRemoved':
      return <ArticleTagRemovedNotice notice={notice} />
    default:
      return null
  }
}

ArticleTagNotice.fragments = {
  notice: gql`
    fragment ArticleTagNotice on ArticleTagNotice {
      id
      unread
      __typename
      articleTagNoticeType: type
      ...ArticleTagAddedNotice
      ...ArticleTagRemovedNotice
    }
    ${ArticleTagAddedNotice.fragments.notice}
    ${ArticleTagRemovedNotice.fragments.notice}
  `,
}

export default ArticleTagNotice
