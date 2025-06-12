import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'
import {
  ArticleDigestTitle,
  List,
  QueryError,
  Spacer,
  SpinnerBlock,
  Title,
  UserDigest,
  ViewMoreButton,
} from '~/components'
import articleFragments from '~/components/GQL/fragments/article'
import { ArticleDetailPublicQuery, CollectionListQuery } from '~/gql/graphql'

import styles from './styles.module.css'

type CollectionListArticle = NonNullable<
  CollectionListQuery['article'] & { __typename: 'Article' }
>

const COLLECTION_LIST = gql`
  query CollectionList($id: ID!, $after: String, $first: first_Int_min_0) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        ...ArticleCollection
      }
    }
  }
  ${articleFragments.articleCollection}
`

const Collection: React.FC<{
  article: NonNullable<ArticleDetailPublicQuery['article']>
}> = ({ article }) => {
  const { data, loading, error, fetchMore } = useQuery<CollectionListQuery>(
    COLLECTION_LIST,
    { variables: { id: article.id, first: 3 } }
  )
  const connectionPath = 'article.collection'
  const { edges, pageInfo } =
    (data?.article as CollectionListArticle)?.collection || {}
  const loadAll = () =>
    fetchMore({
      variables: {
        id: article.id,
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
    return <SpinnerBlock />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || !pageInfo) {
    return null
  }

  return (
    <section
      className={styles.collection}
      data-test-id={TEST_ID.ARTICLE_COLLECTION}
    >
      <header className={styles.header}>
        <Title type="nav" is="h2">
          <FormattedMessage defaultMessage="Collect Article" id="vX2bDy" />
        </Title>
      </header>

      <List spacing={['loose', 0]} hasLastBorder={false}>
        {edges.map(({ node }, i) => (
          <List.Item key={node.id}>
            <ArticleDigestTitle
              article={node}
              lineClamp={1}
              textSize={16}
              textWeight="normal"
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'collection',
                  contentType: 'article',
                  location: i,
                  id: node.id,
                })
              }
            />
            <Spacer size="sp8" />
            <UserDigest.Mini
              user={node.author}
              avatarSize={16}
              textSize={12}
              nameColor="grey"
              hasAvatar
              hasDisplayName
            />
          </List.Item>
        ))}
      </List>

      {pageInfo?.hasNextPage && <ViewMoreButton onClick={loadAll} />}
    </section>
  )
}

export default Collection
