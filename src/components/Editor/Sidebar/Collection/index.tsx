import classNames from 'classnames'
import _uniq from 'lodash/uniq'
import dynamic from 'next/dynamic'

import { Spinner, Translate } from '~/components'

import Collapsable from '../Collapsable'
import styles from './styles.css'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'

const DynamicCollectionEditor = dynamic(() => import('./CollectionEditor'), {
  ssr: false,
  loading: Spinner,
})

interface CollectionProps {
  articles: ArticleDigestDropdownArticle[]
  onEdit: (articles: ArticleDigestDropdownArticle[]) => any
  disabled?: boolean
}

const Collection = ({ articles, onEdit, disabled }: CollectionProps) => {
  const containerClasses = classNames({
    container: true,
    'u-area-disable': disabled,
  })

  return (
    <Collapsable
      title={<Translate id="extend" />}
      defaultCollapsed={articles.length <= 0}
    >
      <p className="intro">
        <Translate
          zh_hant="關聯自己或他人的作品，幫助讀者更好地發現內容。"
          zh_hans="关联自己或他人的作品，帮助读者更好地发现内容。"
        />
      </p>

      <section className={containerClasses}>
        <DynamicCollectionEditor articles={articles} onEdit={onEdit} />
      </section>

      <style jsx>{styles}</style>
    </Collapsable>
  )
}

export default Collection
