import gql from 'graphql-tag'
import _get from 'lodash/get'
import _uniqBy from 'lodash/uniqBy'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { QueryResult } from 'react-apollo'

import { Spinner } from '~/components'
import { Query } from '~/components/GQL'
import collectionFragments from '~/components/GQL/fragments/collection'

import { ArticleDetail_article } from '../__generated__/ArticleDetail'
import { EditorCollection } from './__generated__/EditorCollection'
import styles from './styles.css'

const EDITOR_COLLECTION = gql`
  query EditorCollection($mediaHash: String, $after: String, $first: Int) {
    article(input: { mediaHash: $mediaHash }) {
      ...DropdownCollection
    }
  }
  ${collectionFragments.dropdown}
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
}) => (
  <Query
    query={EDITOR_COLLECTION}
    variables={{ mediaHash: article.mediaHash, first: null }}
  >
    {({
      data,
      loading,
      error,
      fetchMore
    }: QueryResult & { data: EditorCollection }) => {
      if (loading) {
        return <Spinner />
      }

      const { edges } = _get(data, 'article.collection', {})

      useEffect(() => {
        setEditingArticles(edges.map(({ node }: { node: any }) => node))
      }, [])

      return (
        <section className="editing-list">
          <CollectionEditor
            articles={editingArticles}
            onEdit={articles => setEditingArticles(_uniqBy(articles, 'id'))}
          />

          <style jsx>{styles}</style>
        </section>
      )
    }}
  </Query>
)

export default EditingList
