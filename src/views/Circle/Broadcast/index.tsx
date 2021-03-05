import _differenceBy from 'lodash/differenceBy'
import _get from 'lodash/get'
import { useContext, useEffect, useState } from 'react'

import {
  CommentForm,
  EmptyComment,
  InfiniteScroll,
  LanguageContext,
  List,
  QueryError,
  Spinner,
  SubscribeCircleDialog,
  ThreadComment,
  Throw404,
  Translate,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
  ViewerContext,
} from '~/components'

import { ADD_TOAST } from '~/common/enums'
import { filterComments, mergeConnections, translate } from '~/common/utils'

import CircleDetailContainer from '../Detail'
import SubscriptionBanner from '../SubscriptionBanner'
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
  })

  // pagination
  const connectionPath = 'circle.broadcast'
  const circle = data?.circle
  const { edges, pageInfo } = circle?.broadcast || {}
  const circleId = circle?.id
  const comments = filterComments<CommentPublic>(
    (edges || []).map(({ node }) => node)
  )

  // private data
  const [privateFetched, setPrivateFetched] = useState(false)
  const loadPrivate = async (publicData?: BroadcastPublic) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const publiceEdges = publicData.circle?.broadcast.edges || []
    const publicComments = filterComments<Comment>(
      publiceEdges.map(({ node }) => node)
    )
    const publicIds = publicComments
      .filter((node) => node.__typename === 'Comment')
      .map((node) => node.id)

    await client.query({
      query: BROADCAST_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { name, ids: publicIds },
    })

    setPrivateFetched(true)
  }

  // fetch private data
  useEffect(() => {
    if (!circleId) {
      return
    }

    if (viewer.id) {
      loadPrivate(data)
    } else {
      setPrivateFetched(true)
    }
  }, [circleId])

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
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>

      <SubscribeCircleDialog circle={circle} />
      {privateFetched && <SubscriptionBanner circle={circle} />}

      <style jsx>{styles}</style>
    </section>
  )
}

const CricleBroadcast = () => {
  return (
    <CircleDetailContainer>
      <Broadcast />
    </CircleDetailContainer>
  )
}

export default CricleBroadcast
