import gql from 'graphql-tag'

import { ArticleArticleNoticeFragment } from '~/gql/graphql'

import ArticleNewCollected from './ArticleNewCollected'

const ArticleArticleNotice = ({
  notice,
}: {
  notice: ArticleArticleNoticeFragment
}) => {
  switch (notice.articleArticleNoticeType) {
    case 'ArticleNewCollected':
      return <ArticleNewCollected notice={notice} />
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
      ...ArticleNewCollected
    }
    ${ArticleNewCollected.fragments.notice}
  `,
}

export default ArticleArticleNotice
