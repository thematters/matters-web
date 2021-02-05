import _differenceBy from 'lodash/differenceBy'
import _get from 'lodash/get'
import { useContext, useEffect } from 'react'

import {
  CommentForm,
  EmptyComment,
  LanguageContext,
  List,
  QueryError,
  Spinner,
  ThreadComment,
  Translate,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
  ViewerContext,
  ViewMoreButton,
} from '~/components'

import { ADD_TOAST } from '~/common/enums'
import { filterComments, mergeConnections, translate } from '~/common/utils'

import { BROADCAST_PRIVATE, BROADCAST_PUBLIC } from './gql'
import styles from './styles.css'

import { BroadcastPrivate_nodes_Comment } from './__generated__/BroadcastPrivate'
import {
  BroadcastPublic,
  BroadcastPublic_circle_broadcast_edges_node,
} from './__generated__/BroadcastPublic'

type CommentPublic = BroadcastPublic_circle_broadcast_edges_node
type CommentPrivate = BroadcastPrivate_nodes_Comment
type Comment = CommentPublic & Partial<Omit<CommentPrivate, '__typename'>>

const Broadcast = () => {
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
  } = usePublicQuery<BroadcastPublic>(BROADCAST_PUBLIC, {
    variables: {
      name,
    },
    notifyOnNetworkStatusChange: true,
  })

  // pagination
  const connectionPath = 'circle.broadcast'
  const circle = data?.circle
  const { edges, pageInfo } = (circle && circle.broadcast) || {}
  const circleId = circle && circle.id
  const comments = filterComments<CommentPublic>(
    (edges || []).map(({ node }) => node)
  )

  // private data
  const loadPrivate = (publicData?: BroadcastPublic) => {
    if (!viewer.isAuthed || !publicData || !circleId) {
      return
    }

    const publiceEdges = publicData.circle?.broadcast.edges || []
    const publicComments = filterComments<Comment>(
      publiceEdges.map(({ node }) => node)
    )
    const publicIds = publicComments
      .filter((node) => node.__typename === 'Comment')
      .map((node) => node.id)

    client.query({
      query: BROADCAST_PRIVATE,
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

  return (
    <section className="broadcast">
      <header>
        <CommentForm
          circleId={circle?.id}
          type="circleBroadcast"
          placeholder={translate({
            lang,
            zh_hant: '公告、提醒、碎碎念…',
            zh_hans: '公告、提醒、碎碎念…',
          })}
          submitCallback={() => {
            window.dispatchEvent(
              new CustomEvent(ADD_TOAST, {
                detail: {
                  color: 'green',
                  content: (
                    <Translate zh_hant="評論已送出" zh_hans="评论已送出" />
                  ),
                  buttonPlacement: 'center',
                },
              })
            )
          }}
        />
      </header>

      {!comments ||
        (comments.length <= 0 && (
          <EmptyComment
            description={
              <Translate zh_hant="還沒有廣播" zh_hans="还没有广播" />
            }
          />
        ))}

      <List spacing={['xloose', 0]}>
        {comments.map((comment) => (
          <List.Item key={comment.id}>
            <ThreadComment comment={comment} type="circleBroadcast" />
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

export default Broadcast
