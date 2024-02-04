import { CommentBeta } from '~/components'

import styles from './styles.module.css'

export const Placeholder = () => {
  return (
    <section className={styles.CommentFeed}>
      <CommentBeta.Placeholder />
      <CommentBeta.Placeholder />
    </section>
  )
}
