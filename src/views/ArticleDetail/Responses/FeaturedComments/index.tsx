import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import _flatten from 'lodash/flatten'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  List,
  Spinner,
  Title,
  Translate,
  usePullToRefresh,
  ViewerContext,
  ViewMoreButton,
} from '~/components'

import {
  filterComments,
  getQuery,
  mergeConnections,
  mergePrivateNodes,
} from '~/common/utils'

import ResponseComment from '../ResponseComment'
import styles from '../styles.css'
import { FEATURED_COMMENTS_PRIVATE, FEATURED_COMMENTS_PUBLIC } from './gql'

import {
  FeaturedCommentsPrivate,
  FeaturedCommentsPrivate_nodes_Comment_comments_edges_node,
} from './__generated__/FeaturedCommentsPrivate'
import {
  FeaturedCommentsPublic,
  FeaturedCommentsPublic_article_featuredComments_edges_node,
} from './__generated__/FeaturedCommentsPublic'

type CommentPublic = FeaturedCommentsPublic_article_featuredComments_edges_node
type CommentPrivate = FeaturedCommentsPrivate_nodes_Comment_comments_edges_node
type Comment = CommentPublic & Partial<CommentPrivate>

const FeaturedComments = () => {
  const viewer = useContext(ViewerContext)
  const router = useRouter()
  const mediaHash = getQuery({ router, key: 'mediaHash' })

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, fetchMore, refetch } = useQuery<
    FeaturedCommentsPublic
  >(FEATURED_COMMENTS_PUBLIC, {
    variables: { mediaHash },
    notifyOnNetworkStatusChange: true,
  })

  // private data
  const [fetchPrivate, { data: privateData }] = useLazyQuery<
    FeaturedCommentsPrivate
  >(FEATURED_COMMENTS_PRIVATE)
  const loadPrivate = (publicData: FeaturedCommentsPublic) => {
    if (!viewer.id) {
      return
    }

    const publiceEdges = publicData?.article?.featuredComments.edges || []
    const publicComments = filterComments<Comment>(
      publiceEdges.map(({ node }) => node)
    )
    const publicIds = publicComments.map((node) => {
      const descendants = node.comments.edges || []
      const descendantIds = descendants.map(({ node: comment }) => comment.id)

      return [node.id, ...descendantIds]
    })

    fetchPrivate({ variables: { ids: _flatten(publicIds) } })
  }

  // pagination
  const connectionPath = 'article.featuredComments'
  const { edges, pageInfo } = data?.article?.featuredComments || {}

  // merge data
  const comments = mergePrivateNodes<Comment>({
    publicNodes: filterComments<CommentPublic>(
      (edges || []).map(({ node }) => node)
    ),
    privateNodes: privateData?.nodes || [],
  })

  // load next page
  const loadMore = async () => {
    const { data: newData } = await fetchMore({
      variables: {
        after: pageInfo && pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

    loadPrivate(newData)
  }

  usePullToRefresh.Handler(refetch)

  if (loading && !data) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0 || !pageInfo || comments.length <= 0) {
    return null
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
