import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'

import { Spinner, Translate } from '~/components'
import SidebarCollection from '~/components/Editor/Sidebar/Collection'
import { QueryError, useMutation } from '~/components/GQL'
import articleFragments from '~/components/GQL/fragments/article'

import { ADD_TOAST } from '~/common/enums'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { ArticleCollection } from './__generated__/ArticleCollection'
import { EditCollectionArticle } from './__generated__/EditCollectionArticle'
import { SetArticleCollection } from './__generated__/SetArticleCollection'

interface EditCollectionProps {
  article: EditCollectionArticle
}

const fragments = {
  article: gql`
    fragment EditCollectionArticle on Article {
      id
    }
  `,
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

/**
 * Note:
 *
 * The response of this mutation is aligned with `COLLECTION_LIST` in `CollectionList.tsx`,
 * so that it will auto update the local cache and prevent refetch logics
 */
const SET_ARTICLE_COLLECTION = gql`
  mutation SetArticleCollection(
    $id: ID!
    $after: String
    $first: Int
    $collection: [ID!]!
  ) {
    setCollection(input: { id: $id, collection: $collection }) {
      ...ArticleCollection
    }
  }
  ${articleFragments.articleCollection}
`

const EditCollection = ({ article }: EditCollectionProps) => {
  const { data, loading, error } = useQuery<ArticleCollection>(
    ARTICLE_COLLECTION,
    {
      variables: { id: article.id },
    }
  )

  const [setCollection] = useMutation<SetArticleCollection>(
    SET_ARTICLE_COLLECTION
  )

  const handleCollectionChange = async (
    articles: ArticleDigestDropdownArticle[]
  ) => {
    try {
      await setCollection({
        variables: {
          id: article.id,
          collection: _uniq(articles.map((item: any) => item.id)),
          first: null,
        },
      })
    } catch (e) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate zh_hant="關聯失敗" zh_hans="关联失敗" />,
          },
        })
      )
    }
  }

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  return (
    <SidebarCollection
      articles={
        (data?.node?.__typename === 'Article' &&
          data.node.collection.edges?.map(({ node }) => node)) ||
        []
      }
      onEdit={handleCollectionChange}
    />
  )
}

EditCollection.fragments = fragments

export default EditCollection
