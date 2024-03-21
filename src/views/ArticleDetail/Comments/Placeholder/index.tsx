import CommentBetaPlaceholder from '~/components/CommentBeta/Placeholder'

import styles from './styles.module.css'

export const Placeholder = () => {
  return (
    <section className={styles.CommentFeed}>
      <CommentBetaPlaceholder />
      <CommentBetaPlaceholder />
    </section>
  )
}
