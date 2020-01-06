import _uniq from 'lodash/uniq'
import { useState } from 'react'

import { Icon, TextIcon, Translate } from '~/components'

import { ArticleDetail_article } from '../__generated__/ArticleDetail'
import CollectionList from './CollectionList'
import EditButton from './EditButton'
import EditingList from './EditingList'
import styles from './styles.css'

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
        <TextIcon
          icon={<Icon.Collection />}
          spacing="xxtight"
          size="md"
          weight="medium"
        >
          {!collectionCount || collectionCount <= 0 ? (
            <Translate zh_hant="沒有關聯作品" zh_hans="没有关联作品" />
          ) : (
            <>
              <span className="highlight">{collectionCount}&nbsp;</span>
              <span>
                <Translate zh_hant="篇關聯作品" zh_hans="篇关联作品" />
              </span>
            </>
          )}
        </TextIcon>

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
