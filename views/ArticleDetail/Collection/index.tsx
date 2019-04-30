import _get from 'lodash/get'
import _uniq from 'lodash/uniq'
import { useState } from 'react'

import { ArticleDetail_article } from '../__generated__/ArticleDetail'
import CollectionList from './CollectionList'
import EditButton from './EditButton'
import EditingList from './EditingList'
import styles from './styles.css'

const Collection: React.FC<{
  article: ArticleDetail_article
  inPopover?: boolean
  canEdit?: boolean
}> = ({ article, inPopover, canEdit }) => {
  const [editing, setEditing] = useState<boolean>(false)
  const [editingArticles, setEditingArticles] = useState<any[]>([])

  return (
    <>
      {canEdit && (
        <EditButton
          article={article}
          inPopover={inPopover}
          editing={editing}
          setEditing={setEditing}
          editingArticles={editingArticles}
        />
      )}

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
    </>
  )
}

export default Collection
