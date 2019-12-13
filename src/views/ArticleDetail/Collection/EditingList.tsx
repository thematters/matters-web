import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _uniqBy from 'lodash/uniqBy'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import { Spinner } from '~/components'
import { QueryError } from '~/components/GQL'
import articleFragments from '~/components/GQL/fragments/article'

import { ArticleDetail_article } from '../__generated__/ArticleDetail'
import {
  EditorCollection,
  EditorCollection_article_collection_edges_node
} from './__generated__/EditorCollection'
import styles from './styles.css'

const EDITOR_COLLECTION = gql`
  query EditorCollection($mediaHash: String) {
    article(input: { mediaHash: $mediaHash }) {
      ...EditorCollection
    }
  }
  ${articleFragments.editorCollection}
`

const CollectionEditor = dynamic(
  () => import('~/components/CollectionEditor'),
  {
    ssr: false,
    loading: () => <Spinner />
  }
)

const EditingList = ({
  article,
  editingArticles,
  setEditingArticles
}: {
  article: ArticleDetail_article
  editingArticles: EditorCollection_article_collection_edges_node[]
  setEditingArticles: (
    articles: EditorCollection_article_collection_edges_node[]
  ) => void
}) => {
  const { data, loading, error } = useQuery<EditorCollection>(
    EDITOR_COLLECTION,
    {
      variables: { mediaHash: article.mediaHash }
    }
  )
  const edges = data?.article?.collection.edges || []

  // init `editingArticles` when network collection is received
  const edgesKeys = edges.map(({ node }) => node.id).join(',') || ''
  useEffect(() => {
    setEditingArticles(edges.map(({ node }) => node))
  }, [edgesKeys])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  return (
    <section className="editing-list">
      <CollectionEditor
        articles={editingArticles}
        onEdit={articles => setEditingArticles(_uniqBy(articles, 'id'))}
      />

      <style jsx>{styles}</style>
    </section>
  )
}

export default EditingList
