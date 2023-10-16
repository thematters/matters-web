import { useContext, useEffect } from 'react'

import { filterComments, mergeConnections } from '~/common/utils'
import {
  List,
  Spinner,
  ThreadComment,
  Title,
  Translate,
  usePublicQuery,
  ViewerContext,
  ViewMoreButton,
} from '~/components'
import {
  FeaturedCommentsPrivateQuery,
  FeaturedCommentsPublicQuery,
} from '~/gql/graphql'

import styles from '../styles.module.css'
import { FEATURED_COMMENTS_PRIVATE, FEATURED_COMMENTS_PUBLIC } from './gql'

type CommentPublic = NonNullable<
  NonNullable<
    FeaturedCommentsPublicQuery['article'] & { __typename: 'Article' }
  >['featuredComments']['edges']
>[0]['node']

type CommentPrivate = NonNullable<
  NonNullable<FeaturedCommentsPrivateQuery['nodes']>[0] & {
    __typename: 'Comment'
  }
>
type Comment = CommentPublic & Partial<CommentPrivate>
type CommentArticle = NonNullable<
  FeaturedCommentsPublicQuery['article'] & { __typename: 'Article' }
>

const FeaturedComments = ({ id, lock }: { id: string; lock: boolean }) => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, fetchMore, client } =
    usePublicQuery<FeaturedCommentsPublicQuery>(FEATURED_COMMENTS_PUBLIC, {
      variables: { id },
      notifyOnNetworkStatusChange: true,
    })

  // pagination
  const connectionPath = 'article.featuredComments'
  const article = data?.article as CommentArticle
  const { edges, pageInfo } = article?.featuredComments || {}
  const articleId = article && article.id
  const comments = filterComments<CommentPublic>(
    (edges || []).map(({ node }) => node)
  )

  // private data
  const loadPrivate = (publicData?: FeaturedCommentsPublicQuery) => {
    if (!viewer.isAuthed || !publicData || !articleId) {
      return
    }

    const publiceEdges =
      (publicData?.article as CommentArticle)?.featuredComments.edges || []
    const publicComments = filterComments<Comment>(
      publiceEdges.map(({ node }) => node)
    )
    const publicIds = publicComments.map((node) => node.id)

    client.query({
      query: FEATURED_COMMENTS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    loadPrivate(data)
  }, [articleId, viewer.id])

  // load next page
  const loadMore = async () => {
    const { data: newData } = await fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

    loadPrivate(newData)
  }

  if (loading && !data) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0 || !pageInfo || comments.length <= 0) {
    return null
  }

  return (
    <section className={styles.featuredComments} id="featured-comments">
      <header className={styles.header}>
        <Title type="feed" is="h3">
          <Translate id="featuredComments" />
        </Title>
      </header>

      <List spacing={['xloose', 0]}>
        {comments.map((comment) => (
          <List.Item key={comment.id}>
            <ThreadComment comment={comment} type="article" disabled={lock} />
          </List.Item>
        ))}
      </List>

      {pageInfo.hasNextPage && (
        <ViewMoreButton onClick={loadMore} loading={loading} />
      )}
    </section>
  )
}

export default FeaturedComments
