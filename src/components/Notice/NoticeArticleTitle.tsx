import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'
import { ArticleDigestTitle } from '~/components/ArticleDigest'
import { NoticeArticleTitleFragment } from '~/gql/graphql'

import styles from './styles.css'

const NoticeArticleTitle = ({
  article,
  isBlock = false,
}: {
  article: NoticeArticleTitleFragment | null
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
        <a className="notice-article-title">
          {article.title}
          <style jsx>{styles}</style>
        </a>
      </Link>
    )
  }

  return <ArticleDigestTitle article={article} textSize="md" lineClamp={3} />
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
