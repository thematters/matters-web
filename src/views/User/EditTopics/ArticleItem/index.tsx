import classNames from 'classnames'

import { IconArticle16, IconLock24, TextIcon } from '~/components'

import styles from './styles.css'

type ArticleItemProps = {
  title: React.ReactNode | string
}

const ArticleItem: React.FC<ArticleItemProps> = ({ title }) => {
  const itemClasses = classNames({
    item: true,
  })

  return (
    <section className={itemClasses}>
      <h3>
        <TextIcon
          icon={<IconArticle16 />}
          size="md-s"
          weight="normal"
          spacing="xtight"
        >
          {title}
        </TextIcon>
      </h3>

      <IconLock24 size="md" />

      <style jsx>{styles}</style>
    </section>
  )
}

export default ArticleItem
