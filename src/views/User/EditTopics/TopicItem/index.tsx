import classNames from 'classnames'

import styles from './styles.css'

type TopicItemProps = {
  type: 'topic' | 'chapter'
  title: React.ReactNode | string
  count: number
}

const TopicItem: React.FC<TopicItemProps> = ({ type, title, count }) => {
  const isTopic = type === 'topic'
  const itemClasses = classNames({
    item: true,
    topic: !!isTopic,
  })

  return (
    <section className={itemClasses}>
      {isTopic && <h3>{title}</h3>}
      {!isTopic && <p>{title}</p>}

      <span className="count">{count}</span>

      <style jsx>{styles}</style>
    </section>
  )
}

export default TopicItem
