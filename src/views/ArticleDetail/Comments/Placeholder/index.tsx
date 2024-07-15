import CommentPlaceholder from '~/components/Comment/Placeholder'

import styles from './styles.module.css'

export const Placeholder = () => {
  return (
    <section className={styles.CommentFeed}>
      <CommentPlaceholder />
      <CommentPlaceholder />
    </section>
  )
}
