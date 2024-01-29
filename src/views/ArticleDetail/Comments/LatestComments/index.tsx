import jump from 'jump.js'
import _differenceBy from 'lodash/differenceBy'
import _get from 'lodash/get'
import { useContext, useEffect, useRef } from 'react'
import { FormattedMessage } from 'react-intl'

import { REFETCH_RESPONSES, URL_FRAGMENT } from '~/common/enums'
import {
  dom,
  filterComments,
  mergeConnections,
  unshiftConnections,
} from '~/common/utils'
import {
  InfiniteScroll,
  List,
  QueryError,
  ThreadCommentBeta,
  useEventListener,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import {
  LatestCommentsPrivateQuery,
  LatestCommentsPublicQuery,
} from '~/gql/graphql'

import { Placeholder } from '../Placeholder'
import styles from '../styles.module.css'
import { LATEST_COMMENTS_PRIVATE, LATEST_COMMENTS_PUBLIC } from './gql'

const COMMENTS_COUNT = 15

type CommentPublic = NonNullable<
  NonNullable<
    LatestCommentsPublicQuery['article'] & { __typename: 'Article' }
  >['comments']['edges']
>[0]['node']
type CommentPrivate = NonNullable<
  NonNullable<LatestCommentsPrivateQuery['nodes']>[0] & {
    __typename: 'Comment'
  }
>
type Comment = CommentPublic & Partial<Omit<CommentPrivate, '__typename'>>

type CommentArticle = NonNullable<
  LatestCommentsPublicQuery['article'] & { __typename: 'Article' }
>

const LatestComments = ({ id, lock }: { id: string; lock: boolean }) => {
  const viewer = useContext(ViewerContext)
  const storedCursorRef = useRef<string | null>(null)

  /**
   * Fragment Patterns
   *
   * 0. ``
   * 1. `#parentCommentId`
   * 2. `#parentComemntId-childCommentId`
   */
  let fragment = ''
  let parentId = ''
  let descendantId = ''
  if (typeof window !== 'undefined') {
    fragment = window.location.hash.replace('#', '')
    parentId = fragment.split('-')[0]
    descendantId = fragment.split('-')[1]
  }

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
  } = usePublicQuery<LatestCommentsPublicQuery>(LATEST_COMMENTS_PUBLIC, {
    variables: {
      id,
      first: COMMENTS_COUNT,
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })

  // pagination
  const connectionPath = 'article.comments'
  const article = data?.article as CommentArticle
  const { edges, pageInfo } = article?.comments || {}
  const articleId = article?.id
  const comments = filterComments<CommentPublic>(
    (edges || []).map(({ node }) => node)
  )

  // private data
  const loadPrivate = (publicData?: LatestCommentsPublicQuery) => {
    if (!viewer.isAuthed || !publicData || !articleId) {
      return
    }

    const publiceEdges =
      (publicData.article as CommentArticle)?.comments.edges || []
    const publicComments = filterComments<Comment>(
      publiceEdges.map(({ node }) => node)
    )
    const publicIds = publicComments
      .filter((node) => node.__typename === 'Comment')
      .map((node) => node.id)

    client.query({
      query: LATEST_COMMENTS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    loadPrivate(data)
  }, [articleId, viewer.id])

  // load next page
  const loadMore = async (params?: { before: string }) => {
    const loadBefore = params?.before || null
    const noLimit = loadBefore && pageInfo?.endCursor

    const { data: newData } = await fetchMore({
      variables: {
        after: pageInfo?.endCursor,
        before: loadBefore,
        first: noLimit ? null : COMMENTS_COUNT,
        includeBefore: !!loadBefore,
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

  // TODO: update to REFETCH_COMMENTS
  useEventListener(REFETCH_RESPONSES, refetch)

  useEffect(() => {
    if (pageInfo?.startCursor) {
      storedCursorRef.current = pageInfo.startCursor
    }
  }, [pageInfo?.startCursor])

  const replySubmitCallback = async () => {
    const { data: newData } = await fetchMore({
      variables: {
        before: storedCursorRef.current,
        includeBefore: false,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = _get(fetchMoreResult, `${connectionPath}.edges`, [])
        const newCommentCount = _get(fetchMoreResult, 'article.responseCount')
        const oldCommentCount = _get(previousResult, 'article.responseCount')

        // update if response count has changed
        if (newEdges.length === 0) {
          if (oldCommentCount !== newCommentCount) {
            return {
              ...previousResult,
              article: {
                ...previousResult.article,
                responseCount: newCommentCount,
              },
            }
          }
          return previousResult
        }

        // update if there are new items in responses.edges
        const newResult = unshiftConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        })
        const newStartCursor = _get(
          newResult,
          `${connectionPath}.pageInfo.startCursor`,
          null
        )
        if (newStartCursor) {
          storedCursorRef.current = newStartCursor
        }
        return newResult
      },
    })

    loadPrivate(newData)
  }

  // scroll to comment
  useEffect(() => {
    if (!fragment || !articleId) {
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
        loadMore({ before: parentId }).then(jumpToFragment)
      } else {
        jumpToFragment()
      }
    } catch (e) {
      return
    }
  }, [articleId])

  /**
   * Render
   */
  if (loading && !data) {
    return <Placeholder />
  }

  if (error) {
    return <QueryError error={error} />
  }

  return (
    <section className={styles.latestComments} id="latest-comments">
      {/* {!comments || (comments.length <= 0 && <EmptyComment />)} */}
      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        loader={<Placeholder />}
        eof={
          <FormattedMessage
            defaultMessage="No more comments"
            description="src/views/User/Articles/UserArticles.tsx"
            id="WsefD2"
          />
        }
      >
        <List spacing={[0, 0]} hasBorder={false}>
          {comments.map((comment) => (
            <List.Item key={comment.id}>
              <ThreadCommentBeta
                comment={comment}
                type="article"
                defaultExpand={comment.id === parentId && !!descendantId}
                hasLink
                disabled={lock}
                replySubmitCallback={replySubmitCallback}
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </section>
  )
}

export default LatestComments
