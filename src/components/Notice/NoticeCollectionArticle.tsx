import gql from 'graphql-tag'

import { ArticleDigestSidebar } from '~/components'

import styles from './styles.css'

import { NoticeCollectionArticle as NoticeCollectionArticleType } from './__generated__/NoticeCollectionArticle'

const NoticeCollectionArticle = ({
  article
}: {
  article: NoticeCollectionArticleType | null
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

NoticeCollectionArticle.fragments = {
  article: gql`
    fragment NoticeCollectionArticle on Article {
      id
      ...ArticleDigestSidebarArticle
    }
    ${ArticleDigestSidebar.fragments.article}
  `
}

export default NoticeCollectionArticle
