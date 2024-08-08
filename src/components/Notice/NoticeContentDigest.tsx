import classNames from 'classnames'

import { TEST_ID } from '~/common/enums'
import { capitalizeFirstLetter, stripHtml } from '~/common/utils'

import styles from './styles.module.css'

type NoticeContentDigestProps = {
  content: string
  color?: 'black' | 'grey'
}

const NoticeContentDigest = ({
  content,
  color = 'black',
}: NoticeContentDigestProps) => {
  const noticeContentClasses = classNames({
    [styles.noticeContentDigest]: true,
    [styles[`noticeContentDigest${capitalizeFirstLetter(color)}`]]: !!color,
  })
  return (
    <section
      className={noticeContentClasses}
      data-test-id={TEST_ID.NOTICE_COMMENT_CONTENT}
      dangerouslySetInnerHTML={{ __html: stripHtml(content) }}
    />
  )
}

export default NoticeContentDigest
