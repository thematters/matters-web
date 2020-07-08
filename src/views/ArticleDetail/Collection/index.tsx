import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'

import {
  ArticleDigestSidebar,
  List,
  Spinner,
  Title,
  Translate,
  useResponsive,
  ViewMoreButton,
} from '~/components'
import { QueryError } from '~/components/GQL'
import articleFragments from '~/components/GQL/fragments/article'

import { analytics, mergeConnections } from '~/common/utils'

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
  const isMediumUp = useResponsive('md-up')
  const { data, loading, error, fetchMore } = useQuery<CollectionListTypes>(
    COLLECTION_LIST,
    { variables: { mediaHash: article.mediaHash, first: 3 } }
  )
  const connectionPath = 'article.collection'
  const { edges, pageInfo } = data?.article?.collection || {}
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

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || !pageInfo) {
    return null
  }

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

      <List spacing={['base', 0]} hasBorder={false}>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <ArticleDigestSidebar
              article={node}
              hasCover={isMediumUp}
              hasBackground
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'collection',
                  styleType: 'small_cover',
                  contentType: 'article',
                  location: i,
                })
              }
            />
          </List.Item>
        ))}
      </List>

      {pageInfo?.hasNextPage && <ViewMoreButton onClick={loadAll} />}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Collection
