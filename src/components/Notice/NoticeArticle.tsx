import gql from 'graphql-tag'
import Link from 'next/link'

import { ArticleDigestTitle } from '~/components'

import { toPath } from '~/common/utils'

import { NoticeArticle as NoticeArticleType } from './__generated__/NoticeArticle'

const NoticeArticle = ({
  article,
  isBlock = false,
}: {
  article: NoticeArticleType | null
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
    return (
      <Link {...path}>
        <a>{article.title}</a>
      </Link>
    )
  }

  return <ArticleDigestTitle article={article} textSize="md-s" />
}

NoticeArticle.fragments = {
  article: gql`
    fragment NoticeArticle on Article {
      id
      ...ArticleDigestTitleArticle
    }
    ${ArticleDigestTitle.fragments.article}
  `,
}

export default NoticeArticle
