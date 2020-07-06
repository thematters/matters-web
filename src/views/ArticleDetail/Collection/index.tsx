import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'

import { Title, Translate, ViewMoreButton } from '~/components'
import articleFragments from '~/components/GQL/fragments/article'

import { mergeConnections } from '~/common/utils'

import CollectionList from './CollectionList'
import styles from './styles.css'

import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'
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
  article: ArticleDetailPublic_article
  collectionCount?: number
}> = ({ article, collectionCount }) => {
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

  return (
    <section className="collection">
      <header>
        <Title type="nav" is="h2">
          <Translate id="extendArticle" />

          <span className="count" aira-label={`${collectionCount} 篇關聯作品`}>
            {collectionCount}
          </span>
        </Title>
      </header>

      <CollectionList data={data} loading={loading} error={error} />

      {pageInfo?.hasNextPage && <ViewMoreButton onClick={loadAll} />}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Collection
