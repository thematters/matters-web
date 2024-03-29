import gql from 'graphql-tag'

import { ArticleArticleNoticeFragment } from '~/gql/graphql'

import ArticleNewCollectedNotice from './ArticleNewCollectedNotice'

const ArticleArticleNotice = ({
  notice,
}: {
  notice: ArticleArticleNoticeFragment
}) => {
  switch (notice.articleArticleNoticeType) {
    case 'ArticleNewCollected':
      return <ArticleNewCollectedNotice notice={notice} />
    default:
      return null
  }
}

ArticleArticleNotice.fragments = {
  notice: gql`
    fragment ArticleArticleNotice on ArticleArticleNotice {
      id
      unread
      __typename
      articleArticleNoticeType: type
      ...ArticleNewCollectedNotice
    }
    ${ArticleNewCollectedNotice.fragments.notice}
  `,
}

export default ArticleArticleNotice
