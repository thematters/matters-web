interface MomentDigestDetailContentPlaceholderProps {
  onClose: () => void
}

import { CommentFeed } from '~/components/Comment/Feed'
import { MomentDigestDetail } from '~/components/MomentDigest/Detail'

import styles from './styles.module.css'

export const Placeholder = ({
  onClose,
}: MomentDigestDetailContentPlaceholderProps) => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <MomentDigestDetail.Placeholder onClose={onClose} />
      </header>
      <section className={styles.mainContent}></section>
      <section className={`${styles.comments} ${styles.commentsPlaceholder} `}>
        <CommentFeed.Placeholder />
      </section>
    </section>
  )
}
