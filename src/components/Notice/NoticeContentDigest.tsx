import { TEST_ID } from '~/common/enums'
import { collapseContent } from '~/common/utils'

import styles from './styles.module.css'

const NoticeContentDigest = ({ content }: { content: string }) => {
  return (
    <section
      className={styles.noticeContentDigest}
      data-test-id={TEST_ID.NOTICE_COMMENT_CONTENT}
    >
      {collapseContent(content)}
    </section>
  )
}

export default NoticeContentDigest
