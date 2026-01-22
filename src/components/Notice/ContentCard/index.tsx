import classNames from 'classnames'

import { stripHtml } from '~/common/utils'

import styles from './styles.module.css'

type ContentCardProps = {
  content: string
  color?: 'black' | 'grey'
  line?: number
  hasBorder?: boolean
  hasStrike?: boolean
}

const ContentCard = ({
  content,
  color = 'black',
  line = 2,
  hasBorder = false,
  hasStrike = false,
}: ContentCardProps) => {
  const contentClasses = classNames({
    [styles.content]: true,
    [styles[`${color}`]]: !!color,
    [styles[`lineClamp${line}`]]: !!line,
    [styles.border]: !!hasBorder,
    [styles.strike]: !!hasStrike,
  })
  return (
    <section
      className={contentClasses}
      dangerouslySetInnerHTML={{ __html: stripHtml(content) }}
    />
  )
}

export default ContentCard
