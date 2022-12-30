import gql from 'graphql-tag'

import { ArticleDigestSidebar } from '~/components/ArticleDigest'
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
    <section className="sub-content">
      <ArticleDigestSidebar article={article} hasCover={false} hasBackground />
      <style jsx>{styles}</style>
    </section>
  )
}

NoticeArticleCard.fragments = {
  article: gql`
    fragment NoticeArticleCard on Article {
      id
      ...ArticleDigestSidebarArticle
    }
    ${ArticleDigestSidebar.fragments.article}
  `,
}

export default NoticeArticleCard
