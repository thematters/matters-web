import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'
import { useEffect } from 'react'

import { Spinner } from '~/components'
import SidebarCollection from '~/components/Editor/Sidebar/Collection'
import { QueryError } from '~/components/GQL'
import articleFragments from '~/components/GQL/fragments/article'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { ArticleCollection } from './__generated__/ArticleCollection'

export interface EditCollectionProps {
  articleId: string
  collection: ArticleDigestDropdownArticle[]
  setCollection: (articles: ArticleDigestDropdownArticle[]) => any
}

const ARTICLE_COLLECTION = gql`
  query ArticleCollection($id: ID!, $after: String, $first: Int = null) {
    node(input: { id: $id }) {
      id
      ... on Article {
        ...ArticleCollection
      }
    }
  }
  ${articleFragments.articleCollection}
`

const EditCollection = ({
  articleId,
  collection,
  setCollection,
}: EditCollectionProps) => {
  const { data, loading, error } = useQuery<ArticleCollection>(
    ARTICLE_COLLECTION,
    {
      variables: { id: articleId },
    }
  )

  useEffect(() => {
    const articles =
      (data?.node?.__typename === 'Article' &&
        data.node.collection.edges?.map(({ node }) => node)) ||
      []
    setCollection(articles)
  }, [data?.node?.__typename])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  return <SidebarCollection articles={collection} onEdit={setCollection} />
}

export default EditCollection
