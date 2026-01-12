import classNames from 'classnames'

import { capitalizeFirstLetter, stripHtml } from '~/common/utils'

import styles from './styles.module.css'

type ContentDigestProps = {
  content: string
  color?: 'black' | 'grey'
}

const ContentDigest = ({ content, color = 'black' }: ContentDigestProps) => {
  const noticeContentClasses = classNames({
    [styles.noticeContentDigest]: true,
    [styles[`noticeContentDigest${capitalizeFirstLetter(color)}`]]: !!color,
  })
  return (
    <section
      className={noticeContentClasses}
      dangerouslySetInnerHTML={{ __html: stripHtml(content) }}
    />
  )
}

export default ContentDigest
