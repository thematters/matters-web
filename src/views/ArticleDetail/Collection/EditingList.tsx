import gql from 'graphql-tag'
import _get from 'lodash/get'
import _uniqBy from 'lodash/uniqBy'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useQuery } from 'react-apollo'

import { Spinner } from '~/components'
import articleFragments from '~/components/GQL/fragments/article'

import { ArticleDetail_article } from '../__generated__/ArticleDetail'
import { EditorCollection } from './__generated__/EditorCollection'
import styles from './styles.css'

const EDITOR_COLLECTION = gql`
  query EditorCollection($mediaHash: String, $after: String, $first: Int) {
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
  editingArticles: any[]
  setEditingArticles: (articles: any[]) => void
}) => {
  const { data, loading } = useQuery<EditorCollection>(EDITOR_COLLECTION, {
    variables: { mediaHash: article.mediaHash, first: null }
  })
  const edges = (data && data.article && data.article.collection.edges) || []

  useEffect(() => {
    setEditingArticles(edges.map(({ node }) => node))
  }, [])

  if (loading) {
    return <Spinner />
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
