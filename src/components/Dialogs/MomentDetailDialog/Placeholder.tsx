interface MomentDigestDetailContentPlaceholderProps {
  onClose: () => void
}

import CommentFeedPlaceholder from '~/components/Comment/Feed/Placeholder'
import MomentDigestDetailPlaceholder from '~/components/MomentDigest/Detail/Placeholder'

import styles from './styles.module.css'

const Placeholder = ({
  onClose,
}: MomentDigestDetailContentPlaceholderProps) => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <MomentDigestDetailPlaceholder onClose={onClose} />
      </header>
      <section className={styles.mainContent}></section>
      <section className={`${styles.comments} ${styles.commentsPlaceholder} `}>
        <CommentFeedPlaceholder />
      </section>
    </section>
  )
}

export default Placeholder
