import _differenceBy from 'lodash/differenceBy'
import _get from 'lodash/get'
import { useContext, useEffect } from 'react'

import {
  CommentForm,
  EmptyComment,
  InfiniteScroll,
  LanguageContext,
  List,
  QueryError,
  Spinner,
  ThreadComment,
  Throw404,
  Translate,
  usePublicQuery,
  usePullToRefresh,
  ViewerContext,
} from '~/components'

import { ADD_TOAST } from '~/common/enums'
import { filterComments, mergeConnections, translate } from '~/common/utils'

import { BROADCAST_PRIVATE, BROADCAST_PUBLIC } from './gql'
import styles from './styles.css'

import { UserBroadcastPrivate_nodes_Comment } from './__generated__/UserBroadcastPrivate'
import {
  UserBroadcastPublic,
  UserBroadcastPublic_node_Circle,
  UserBroadcastPublic_node_Circle_broadcast_edges_node,
} from './__generated__/UserBroadcastPublic'

interface BroadcastProps {
  id: string
}

type CommentPublic = UserBroadcastPublic_node_Circle_broadcast_edges_node
type CommentPrivate = UserBroadcastPrivate_nodes_Comment
type Comment = CommentPublic & Partial<Omit<CommentPrivate, '__typename'>>

const Broadcast = ({ id }: BroadcastProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

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
  } = usePublicQuery<UserBroadcastPublic>(BROADCAST_PUBLIC, {
    variables: { id },
  })

  // pagination
  const connectionPath = 'node.broadcast'
  const circle = data?.node as UserBroadcastPublic_node_Circle
  const { edges, pageInfo } = circle?.broadcast || {}
  const comments = filterComments<CommentPublic>(
    (edges || []).map(({ node }) => node)
  )

  // private data
  const loadPrivate = async (publicData?: UserBroadcastPublic) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const publicCircle = publicData.node as UserBroadcastPublic_node_Circle
    const publiceEdges = publicCircle.broadcast.edges || []
    const publicComments = filterComments<Comment>(
      publiceEdges.map(({ node }) => node)
    )
    const publicIds = publicComments
      .filter((node) => node.__typename === 'Comment')
      .map((node) => node.id)

    await client.query({
      query: BROADCAST_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { id, ids: publicIds },
    })
  }

  // fetch private data
  useEffect(() => {
    if (!circle?.id) {
      return
    }

    loadPrivate(data)
  }, [circle?.id, viewer.id])

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

  // refetch & pull to refresh
  const refetch = async () => {
    const { data: newData } = await refetchPublic()
    loadPrivate(newData)
  }
  usePullToRefresh.Handler(refetch)

  /**
   * Render
   */
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!circle || !pageInfo) {
    return <Throw404 />
  }

  const isOwner = circle?.owner.id === viewer.id
  const isMember = circle?.circleIsMember
  const lock = viewer.isAuthed && !isOwner && !isMember
  const submitCallback = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: <Translate zh_hant="廣播已送出" zh_hans="广播已送出" />,
          buttonPlacement: 'center',
        },
      })
    )
    refetch()
  }

  return (
    <>
      <section className="broadcast">
        {isOwner && (
          <header>
            <CommentForm
              circleId={circle?.id}
              type="circleBroadcast"
              placeholder={translate({
                lang,
                zh_hant: '公告、提醒、碎碎念…',
                zh_hans: '公告、提醒、碎碎念…',
              })}
              submitCallback={submitCallback}
            />
          </header>
        )}

        {!comments ||
          (comments.length <= 0 && (
            <EmptyComment
              description={
                <Translate zh_hant="還沒有廣播" zh_hans="还没有广播" />
              }
            />
          ))}

        <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
          <List spacing={['xloose', 0]}>
            {comments.map((comment) => (
              <List.Item key={comment.id}>
                <ThreadComment
                  comment={comment}
                  type="circleBroadcast"
                  hasUpvote={false}
                  hasDownvote={false}
                  disabled={lock}
                />
              </List.Item>
            ))}
          </List>
        </InfiniteScroll>

        <style jsx>{styles}</style>
      </section>
    </>
  )
}

export default Broadcast
