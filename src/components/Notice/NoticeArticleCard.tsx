import gql from 'graphql-tag'

import { ArticleDigestNotice } from '~/components/ArticleDigest'
import { NoticeArticleCardFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const NoticeArticleCard = ({
  article,
}: {
  article: NoticeArticleCardFragment | null
}) => {
  if (!article) {
    return null
  }

  return (
    <section className={styles.noticeArticleCard}>
      <ArticleDigestNotice article={article} />
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
