import classNames from 'classnames'

import { IconArticle16, IconChapter16, IconLock24 } from '~/components'

import styles from './styles.css'

export type ContentListItemProps = {
  title: React.ReactNode | string
  count?: number
  type?: 'chapter' | 'article'
  locked?: boolean
  is?: 'h3' | 'h4'
}

const ContentListItem: React.FC<ContentListItemProps> = ({
  title,
  count,
  type,
  locked,
  is,
}) => {
  const isArticle = type === 'article'
  const isChapter = type === 'chapter'
  const hasCount = typeof count === 'number'
  const isSubItem = is === 'h4'

  const itemClasses = classNames({
    item: true,
    subitem: isSubItem,
  })

  return (
    <section className={itemClasses}>
      <section className="left">
        {isChapter ? <IconChapter16 /> : isArticle ? <IconArticle16 /> : null}
        {!isSubItem ? (
          <h3 className="title">{title}</h3>
        ) : (
          <h4 className="title">{title}</h4>
        )}
      </section>

      <section className="right">
        {!locked && hasCount && <span className="count">{count}</span>}
        {locked && <IconLock24 size="md" />}
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default ContentListItem
