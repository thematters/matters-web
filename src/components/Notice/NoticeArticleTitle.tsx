import gql from 'graphql-tag'
import Link from 'next/link'

import { ArticleDigestTitle } from '~/components/ArticleDigest'

import { toPath } from '~/common/utils'

import { NoticeArticleTitle as NoticeArticleTitleType } from './__generated__/NoticeArticleTitle'

const NoticeArticleTitle = ({
  article,
  isBlock = false,
}: {
  article: NoticeArticleTitleType | null
  isBlock?: boolean
}) => {
  if (!article) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    article,
  })

  if (!isBlock) {
    return <Link {...path}>{article.title}</Link>
  }

  return <ArticleDigestTitle article={article} textSize="md-s" />
}

NoticeArticleTitle.fragments = {
  article: gql`
    fragment NoticeArticleTitle on Article {
      id
      ...ArticleDigestTitleArticle
    }
    ${ArticleDigestTitle.fragments.article}
  `,
}

export default NoticeArticleTitle
