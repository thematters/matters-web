import gql from 'graphql-tag'

import { ArticleDigestSidebar } from '~/components/ArticleDigest'

import { NoticeArticleCard as NoticeArticleCardType } from './__generated__/NoticeArticleCard'
import styles from './styles.css'

const NoticeArticleCard = ({
  article,
}: {
  article: NoticeArticleCardType | null
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
