import gql from 'graphql-tag'

import { ArticleDigestNotice } from '~/components/ArticleDigest'
import { NoticeArticleCardFragment } from '~/gql/graphql'

import styles from './styles.css'

const NoticeArticleCard = ({
  article,
}: {
  article: NoticeArticleCardFragment | null
}) => {
  if (!article) {
    return null
  }

  return (
    <section className="notice-article-card">
      <ArticleDigestNotice article={article} />
      <style jsx>{styles}</style>
    </section>
  )
}

NoticeArticleCard.fragments = {
  article: gql`
    fragment NoticeArticleCard on Article {
      id
      ...ArticleDigestNoticeArticle
    }
    ${ArticleDigestNotice.fragments.article}
  `,
}

export default NoticeArticleCard
