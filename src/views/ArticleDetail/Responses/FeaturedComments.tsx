import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import {
  List,
  Spinner,
  Title,
  Translate,
  usePullToRefresh,
  ViewMoreButton,
} from '~/components'

import { filterComments, getQuery, mergeConnections } from '~/common/utils'

import ResponseComment from './ResponseComment'
import styles from './styles.css'

import {
  ArticleFeaturedComments,
  ArticleFeaturedComments_article_featuredComments_edges_node,
} from './__generated__/ArticleFeaturedComments'

const FEATURED_COMMENTS = gql`
  query ArticleFeaturedComments(
    $mediaHash: String
    $after: String
    $first: Int = 10
  ) {
    article(input: { mediaHash: $mediaHash }) {
      id
      mediaHash
      featuredComments(input: { first: $first, after: $after }) {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          node {
            ...ResponseCommentCommentPublic
            ...ResponseCommentCommentPrivate
          }
        }
      }
    }
  }
  ${ResponseComment.fragments.comment.public}
  ${ResponseComment.fragments.comment.private}
`

const FeaturedComments = () => {
  const router = useRouter()
  const mediaHash = getQuery({ router, key: 'mediaHash' })
  const { data, loading, fetchMore, refetch } = useQuery<
    ArticleFeaturedComments
  >(FEATURED_COMMENTS, {
    variables: { mediaHash },
    notifyOnNetworkStatusChange: true,
  })

  const connectionPath = 'article.featuredComments'
  const { edges, pageInfo } = data?.article?.featuredComments || {}
  const comments = filterComments(
    (edges || []).map(({ node }) => node)
  ) as ArticleFeaturedComments_article_featuredComments_edges_node[]

  usePullToRefresh.Handler(refetch)

  if (loading && !data) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0 || !pageInfo || comments.length <= 0) {
    return null
  }

  const loadMore = () => {
    return fetchMore({
      variables: {
        after: pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  return (
    <section className="featured-comments" id="featured-comments">
      <header>
        <Title type="feed" is="h3">
          <Translate id="featuredComments" />
        </Title>
      </header>

      <List spacing={['xloose', 0]}>
        {comments.map((comment) => (
          <List.Item key={comment.id}>
            <ResponseComment comment={comment} />
          </List.Item>
        ))}
      </List>

      {pageInfo.hasNextPage && (
        <ViewMoreButton onClick={loadMore} loading={loading} />
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default FeaturedComments
