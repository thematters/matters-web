import ArticleCommentPlaceholder from '~/components/ArticleComment/Placeholder'

import styles from './styles.module.css'

export const Placeholder = () => {
  return (
    <section className={styles.CommentFeed}>
      <ArticleCommentPlaceholder />
      <ArticleCommentPlaceholder />
    </section>
  )
}
