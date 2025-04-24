import jump from 'jump.js'
import _differenceBy from 'lodash/differenceBy'
import _get from 'lodash/get'
import { useContext, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { URL_FRAGMENT } from '~/common/enums'
import {
  dom,
  filterComments,
  mergeConnections,
  parseCommentHash,
} from '~/common/utils'
import {
  CircleCommentForm,
  CircleThreadComment,
  EmptyComment,
  InfiniteScroll,
  List,
  QueryError,
  SpinnerBlock,
  Throw404,
  toast,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { BroadcastPrivateQuery, BroadcastPublicQuery } from '~/gql/graphql'

import CircleDetailTabs from '../CircleDetailTabs'
import { BROADCAST_PRIVATE, BROADCAST_PUBLIC } from './gql'
import styles from './styles.module.css'

type CommentPublic = NonNullable<
  NonNullable<BroadcastPublicQuery['circle']>['broadcast']['edges']
>[0]['node']
type CommentPrivate = NonNullable<BroadcastPrivateQuery['nodes']>[0] & {
  __typename: 'Comment'
}
type Comment = CommentPublic & Partial<Omit<CommentPrivate, '__typename'>>

const RESPONSES_COUNT = 15

const CricleBroadcast = () => {
  const { getQuery } = useRoute()
  const viewer = useContext(ViewerContext)
  const name = getQuery('name')

  const intl = useIntl()
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

  const { fragment, parentId, descendantId } = parseCommentHash()

  // jump to comment area
  useEffect(() => {
    if (!fragment || !circle?.id) {
      return
    }

    const jumpToFragment = () => {
      jump(`#${fragment}`, {
        offset: fragment === URL_FRAGMENT.COMMENTS ? -10 : -64,
      })
    }

    try {
      const element = dom.$(`#${fragment}`)

      if (!element) {
        loadMore({ before: parentId || '' }).then(jumpToFragment)
      } else {
        jumpToFragment()
      }
    } catch (e) {
      return
    }
  }, [circle?.id])

  /**
   * Render
   */
  if (loading) {
    return (
      <>
        <CircleDetailTabs />
        <SpinnerBlock />
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
    toast.success({
      message: (
        <FormattedMessage
          defaultMessage="Broadcast sent"
          id="TjWWxF"
          description="src/views/Circle/Broadcast/Broadcast.tsx"
        />
      ),
    })
    refetch()
  }

  return (
    <>
      <CircleDetailTabs />

      <section className={styles.broadcast}>
        {isOwner && (
          <header className={styles.header}>
            <CircleCommentForm
              circleId={circle?.id}
              type="circleBroadcast"
              placeholder={intl.formatMessage({
                defaultMessage: 'Announcement, reminder, chattering...',
                id: 'zb8Kx1',
              })}
              submitCallback={submitCallback}
            />
          </header>
        )}

        {!comments ||
          (comments.length <= 0 && (
            <EmptyComment
              description={intl.formatMessage({
                defaultMessage: 'No broadcast yet.',
                id: 'mWjpk9',
                description: 'src/views/Circle/Broadcast/Broadcast.tsx',
              })}
            />
          ))}

        <InfiniteScroll
          hasNextPage={pageInfo.hasNextPage}
          loadMore={loadMore}
          eof
        >
          <List spacing={['xloose', 0]}>
            {comments.map((comment) => (
              <List.Item key={comment.id}>
                <CircleThreadComment
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
      </section>
    </>
  )
}

export default CricleBroadcast
