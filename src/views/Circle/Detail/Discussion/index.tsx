import _differenceBy from 'lodash/differenceBy'
import _get from 'lodash/get'
import { useContext, useEffect } from 'react'

import {
  CommentForm,
  EmptyComment,
  EmptyLayout,
  LanguageContext,
  List,
  QueryError,
  Spinner,
  ThreadComment,
  Throw404,
  Translate,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
  ViewerContext,
  ViewMoreButton,
} from '~/components'

import { ADD_TOAST } from '~/common/enums'
import { filterComments, mergeConnections, translate } from '~/common/utils'

import { DISCUSSION_PRIVATE, DISCUSSION_PUBLIC } from './gql'
import styles from './styles.css'
import Wall from './Wall'

import { DiscussionPrivate_nodes_Comment } from './__generated__/DiscussionPrivate'
import {
  DiscussionPublic,
  DiscussionPublic_circle_discussion_edges_node,
} from './__generated__/DiscussionPublic'

type CommentPublic = DiscussionPublic_circle_discussion_edges_node
type CommentPrivate = DiscussionPrivate_nodes_Comment
type Comment = CommentPublic & Partial<Omit<CommentPrivate, '__typename'>>

const Discussion = () => {
  const { getQuery } = useRoute()
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const name = getQuery('name')

  /**
   * Data Fetching
   */
  // public data
  const {
    data,
    loading,
    error,
    fetchMore,
    refetch: refetchPublic,
    client,
  } = usePublicQuery<DiscussionPublic>(DISCUSSION_PUBLIC, {
    variables: {
      name,
    },
    notifyOnNetworkStatusChange: true,
  })

  // pagination
  const connectionPath = 'circle.discussion'
  const circle = data?.circle
  const { edges, pageInfo } = (circle && circle.discussion) || {}
  const circleId = circle && circle.id
  const comments = filterComments<CommentPublic>(
    (edges || []).map(({ node }) => node)
  )

  // private data
  const loadPrivate = (publicData?: DiscussionPublic) => {
    if (!viewer.isAuthed || !publicData || !circleId) {
      return
    }

    const publiceEdges = publicData.circle?.discussion.edges || []
    const publicComments = filterComments<Comment>(
      publiceEdges.map(({ node }) => node)
    )
    const publicIds = publicComments
      .filter((node) => node.__typename === 'Comment')
      .map((node) => node.id)

    client.query({
      query: DISCUSSION_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    loadPrivate(data)
  }, [circleId, viewer.id])

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

  // refetch & pull to refresh
  const refetch = async () => {
    const { data: newData } = await refetchPublic()
    loadPrivate(newData)
  }
  usePullToRefresh.Handler(refetch)

  /**
   * Render
   */
  if (loading && !data) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!circle) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  const isOwner = circle?.owner.id === viewer.id
  const isMember = circle?.isMember

  if (!isOwner && !isMember) {
    return <Wall circle={circle} />
  }

  const submitCallback = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: <Translate zh_hant="討論已送出" zh_hans="讨论已送出" />,
          buttonPlacement: 'center',
        },
      })
    )
    refetch()
  }

  return (
    <section className="discussion">
      <header>
        <CommentForm
          circleId={circle?.id}
          type="circleDiscussion"
          placeholder={translate({
            lang,
            zh_hant: '催更、提問、分享、討論…',
            zh_hans: '催更、提问、分享、讨论…',
          })}
          submitCallback={submitCallback}
        />
      </header>

      {!comments ||
        (comments.length <= 0 && (
          <EmptyComment
            description={
              <Translate zh_hant="還沒有討論" zh_hans="还没有讨论" />
            }
          />
        ))}

      <List spacing={['xloose', 0]}>
        {comments.map((comment) => (
          <List.Item key={comment.id}>
            <ThreadComment comment={comment} type="circleDiscussion" />
          </List.Item>
        ))}
      </List>

      {pageInfo && pageInfo.hasNextPage && (
        <ViewMoreButton onClick={() => loadMore()} loading={loading} />
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Discussion
