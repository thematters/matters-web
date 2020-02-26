import _uniq from 'lodash/uniq'
import { useState } from 'react'

import { Title, Translate } from '~/components'

import CollectionList from './CollectionList'
import EditButton from './EditButton'
import EditingList from './EditingList'
import styles from './styles.css'

import { ArticleDetail_article } from '../__generated__/ArticleDetail'

const Collection: React.FC<{
  article: ArticleDetail_article
  collectionCount?: number
  canEdit?: boolean
}> = ({ article, collectionCount, canEdit }) => {
  const [editing, setEditing] = useState<boolean>(false)
  const [editingArticles, setEditingArticles] = useState<any[]>([])

  return (
    <section className="collection">
      <header>
        <Title type="nav" is="h2">
          <Translate id="extendArticle" />

          <span className="count" aira-label={`${collectionCount} 篇關聯作品`}>
            {collectionCount}
          </span>
        </Title>

        {canEdit && (
          <EditButton
            article={article}
            editing={editing}
            setEditing={setEditing}
            editingArticles={editingArticles}
          />
        )}
      </header>

      {!editing && (
        <CollectionList
          article={article}
          canEdit={canEdit}
          setEditing={setEditing}
        />
      )}

      {editing && (
        <EditingList
          article={article}
          editingArticles={editingArticles}
          setEditingArticles={setEditingArticles}
        />
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Collection
