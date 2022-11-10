import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'
import { useContext } from 'react'

import {
  ArticleDigestSidebar,
  LanguageContext,
  List,
  QueryError,
  Spinner,
  Title,
  Translate,
  useResponsive,
  ViewMoreButton,
} from '~/components'
import articleFragments from '~/components/GQL/fragments/article'

import { analytics, mergeConnections, translate } from '~/common/utils'

import styles from './styles.css'

import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'
import { CollectionList as CollectionListTypes } from './__generated__/CollectionList'

const COLLECTION_LIST = gql`
  query CollectionList(
    $mediaHash: String!
    $after: String
    $first: first_Int_min_0
  ) {
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
  const { lang } = useContext(LanguageContext)

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
          <Translate id="collectArticle" />

          <span
            className="count"
            aria-label={translate({
              zh_hant: `${collectionCount} 篇關聯作品`,
              zh_hans: `${collectionCount} 篇关联作品`,
              en: `${collectionCount} collected articles`,
              lang,
            })}
          >
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
                  contentType: 'article',
                  location: i,
                  id: node.id,
                })
              }
              onClickAuthor={() => {
                analytics.trackEvent('click_feed', {
                  type: 'collection',
                  contentType: 'user',
                  location: i,
                  id: node.author.id,
                })
              }}
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
