import classNames from 'classnames'

import { IconChapter16, TextIcon } from '~/components'

import styles from './styles.css'

type ChapterItemProps = {
  title: React.ReactNode | string
  count: number
}

const ChapterItem: React.FC<ChapterItemProps> = ({ title, count }) => {
  const itemClasses = classNames({
    item: true,
  })

  return (
    <section className={itemClasses}>
      <h3>
        <TextIcon
          icon={<IconChapter16 />}
          size="md-s"
          weight="md"
          spacing="xtight"
        >
          {title}
        </TextIcon>
      </h3>

      <span className="count">{count}</span>

      <style jsx>{styles}</style>
    </section>
  )
}

export default ChapterItem
