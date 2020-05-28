import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'
import { useContext, useState } from 'react'

import { Title, Translate, ViewerContext, ViewMoreButton } from '~/components'
import articleFragments from '~/components/GQL/fragments/article'

import { mergeConnections } from '~/common/utils'

import CollectionList from './CollectionList'
import EditButton from './EditButton'
import EditingList from './EditingList'
import styles from './styles.css'

import { ArticleDetail_article } from '../__generated__/ArticleDetail'
import { CollectionList as CollectionListTypes } from './__generated__/CollectionList'

const COLLECTION_LIST = gql`
  query CollectionList($mediaHash: String, $after: String, $first: Int) {
    article(input: { mediaHash: $mediaHash }) {
      id
      ...ArticleCollection
    }
  }
  ${articleFragments.articleCollection}
`

const Collection: React.FC<{
  article: ArticleDetail_article
  collectionCount?: number
}> = ({ article, collectionCount }) => {
  const viewer = useContext(ViewerContext)

  const [editing, setEditing] = useState<boolean>(false)
  const [editingArticles, setEditingArticles] = useState<any[]>([])

  const { data, loading, error, fetchMore } = useQuery<CollectionListTypes>(
    COLLECTION_LIST,
    { variables: { mediaHash: article.mediaHash, first: 3 } }
  )
  const connectionPath = 'article.collection'
  const { pageInfo } = data?.article?.collection || {}
  const loadAll = () =>
    fetchMore({
      variables: {
        mediaHash: article.mediaHash,
        after: pageInfo?.endCursor,
        first: null,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

  const isAuthor = viewer.id === article.author.id
  const canEdit = isAuthor && !viewer.isInactive

  return (
    <section className="collection">
      <header>
        <Title type="nav" is="h2">
          <Translate id="extendArticle" />

          <span className="count" aira-label={`${collectionCount} 篇關聯作品`}>
            {collectionCount}
          </span>
        </Title>

        <section className="right">
          {isAuthor && (
            <EditButton
              article={article}
              canEdit={canEdit}
              editing={editing}
              setEditing={setEditing}
              editingArticles={editingArticles}
            />
          )}
        </section>
      </header>

      {!editing && (
        <CollectionList data={data} loading={loading} error={error} />
      )}

      {editing && (
        <EditingList
          article={article}
          editingArticles={editingArticles}
          setEditingArticles={setEditingArticles}
        />
      )}

      {!editing && pageInfo?.hasNextPage && (
        <ViewMoreButton onClick={loadAll} />
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Collection
