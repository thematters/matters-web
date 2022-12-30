import jump from 'jump.js'
import _differenceBy from 'lodash/differenceBy'
import _get from 'lodash/get'
import { useContext, useEffect } from 'react'

import { ADD_TOAST, URL_FRAGMENT } from '~/common/enums'
import {
  dom,
  filterComments,
  mergeConnections,
  translate,
} from '~/common/utils'
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
  useRoute,
  ViewerContext,
} from '~/components'
import { BroadcastPublicQuery } from '~/gql/graphql'

import CircleDetailTabs from '../CircleDetailTabs'
import { BROADCAST_PRIVATE, BROADCAST_PUBLIC } from './gql'
import styles from './styles.css'

type CommentPublic = BroadcastPublic_circle_broadcast_edges_node
type CommentPrivate = BroadcastPrivate_nodes_Comment
type Comment = CommentPublic & Partial<Omit<CommentPrivate, '__typename'>>

const RESPONSES_COUNT = 15

const CricleBroadcast = () => {
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
  } = usePublicQuery<BroadcastPublicQuery>(BROADCAST_PUBLIC, {
    variables: { name },
  })

  // pagination
  const connectionPath = 'circle.broadcast'
  const circle = data?.circle
  const { edges, pageInfo } = circle?.broadcast || {}
  const comments = filterComments<CommentPublic>(
    (edges || []).map(({ node }) => node)
  )

  // private data
  const loadPrivate = async (publicData?: BroadcastPublicQuery) => {
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
  }

  // fetch private data
  useEffect(() => {
    if (!circle?.id) {
      return
    }

    loadPrivate(data)
  }, [circle?.id, viewer.id])

  // load next page
  const loadMore = async (params?: { before: string }) => {
    const loadBefore = params?.before || null
    const noLimit = loadBefore && pageInfo?.endCursor

    const { data: newData } = await fetchMore({
      variables: {
        after: pageInfo?.endCursor,
        before: loadBefore,
        first: noLimit ? null : RESPONSES_COUNT,
        includeBefore: !!loadBefore,
        // articleOnly: articleOnlyMode,
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
   * Fragment Patterns
   *
   * 0. ``
   * 1. `#comment`
   * 2. `#parentCommentId`
   * 3. `#parentComemntId-childCommentId`
   */
  let fragment = ''
  let parentId = ''
  let descendantId = ''
  if (process.browser) {
    fragment = window.location.hash.replace('#', '')
    ;[parentId, descendantId] = fragment.split('-') // [0] ; = fragment.split('-')[1]
  }

  // jump to comment area
  useEffect(() => {
    if (window.location.hash && circle) {
      jump('#comments', { offset: -10 })
    }

    if (!fragment || !circle?.id) {
      return
    }

    const jumpToFragment = () => {
      jump(`#${fragment}`, {
        offset: fragment === URL_FRAGMENT.COMMENTS ? -10 : -64,
      })
    }
    const element = dom.$(`#${fragment}`)

    if (!element) {
      loadMore({ before: parentId }).then(jumpToFragment)
    } else {
      jumpToFragment()
    }
  }, [circle?.id])

  /**
   * Render
   */
  if (loading) {
    return (
      <>
        <CircleDetailTabs />
        <Spinner />
      </>
    )
  }

  if (error) {
    return (
      <>
        <CircleDetailTabs />
        <QueryError error={error} />
      </>
    )
  }

  if (!circle || !pageInfo) {
    return (
      <>
        <CircleDetailTabs />
        <Throw404 />
      </>
    )
  }

  const isOwner = circle?.owner.id === viewer.id
  const isMember = circle?.circleIsMember
  const lock = viewer.isAuthed && !isOwner && !isMember
  const submitCallback = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant="廣播已送出"
              zh_hans="广播已送出"
              en="Broadcast sent"
            />
          ),
          buttonPlacement: 'center',
        },
      })
    )
    refetch()
  }

  return (
    <>
      <CircleDetailTabs />

      <section className="broadcast" id="comments">
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
                  defaultExpand={comment.id === parentId && !!descendantId}
                  hasLink
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

export default CricleBroadcast
