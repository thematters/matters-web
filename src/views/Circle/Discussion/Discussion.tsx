// import { useLazyQuery } from '@apollo/react-hooks'
import jump from 'jump.js'
// import _differenceBy from 'lodash/differenceBy'
// import _get from 'lodash/get'
import { useContext, useEffect, useState } from 'react'

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
import { DiscussionCommentsQuery, DiscussionPublicQuery } from '~/gql/graphql'

import CircleDetailTabs from '../CircleDetailTabs'
import {
  DISCUSSION_COMMENTS,
  DISCUSSION_PRIVATE,
  DISCUSSION_PUBLIC,
} from './gql'
import styles from './styles.css'
import Wall from './Wall'

type Comment = NonNullable<
  NonNullable<DiscussionCommentsQuery['circle']>['discussion']['edges']
>[0]['node']

const RESPONSES_COUNT = 15

const CricleDiscussion = () => {
  const { getQuery } = useRoute()
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const name = getQuery('name')

  // public data
  const { data, loading, error, client } =
    usePublicQuery<DiscussionPublicQuery>(DISCUSSION_PUBLIC, {
      variables: { name },
    })
  const circle = data?.circle
  const isOwner = circle?.owner.id === viewer.id
  const isMember = circle?.circleIsMember
  const hasPermission = isOwner || isMember

  // private data
  const [privateFetched, setPrivateFetched] = useState(false)
  const loadPrivate = async (publicData?: DiscussionPublicQuery) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    await client.query({
      query: DISCUSSION_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { name },
    })

    setPrivateFetched(true)
  }

  // fetch private data
  useEffect(() => {
    if (!circle?.id) {
      return
    }

    if (viewer.isAuthed) {
      loadPrivate(data)
    } else {
      setPrivateFetched(true)
    }
  }, [circle?.id])

  /**
   * Fragment Patterns
   *
   * 0. ``
   * 1. `#comments`
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

  /**
   * Data Fetching
   */
  const // fetchDicussion,
    {
      data: discussionData,
      loading: discussionLoading,
      fetchMore,
      refetch,
    } = usePublicQuery<DiscussionCommentsQuery>(
      DISCUSSION_COMMENTS,
      {
        fetchPolicy: 'network-only',
        variables: { name },
        skip: !hasPermission,
      },
      { publicQuery: !viewer.isAuthed }
    )

  // load next page
  const loadMore = async (params?: { before: string }) => {
    const loadBefore = params?.before || null
    const noLimit = loadBefore && pageInfo?.endCursor

    return fetchMore({
      variables: {
        after: pageInfo?.endCursor,
        before: loadBefore,
        first: noLimit ? null : RESPONSES_COUNT,
        includeBefore: !!loadBefore,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

    // loadPrivate(newData)
  }

  // pagination
  const connectionPath = 'circle.discussion'
  const { edges, pageInfo } = discussionData?.circle?.discussion || {}
  const comments = filterComments<Comment>(
    (edges || []).map(({ node }) => node)
  )

  // refetch & pull to refresh
  usePullToRefresh.Handler(refetch)

  const submitCallback = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant="討論已送出"
              zh_hans="讨论已送出"
              en="Discussion sent"
            />
          ),
          buttonPlacement: 'center',
        },
      })
    )
    refetch()
  }

  // fetch discussion
  useEffect(() => {
    if (hasPermission) {
      refetch() // fetchDicussion()
    }
  }, [hasPermission])

  // jump to comment area
  useEffect(() => {
    if (
      error ||
      discussionLoading ||
      !circle ||
      !privateFetched ||
      !hasPermission ||
      !fragment ||
      !circle?.id
    ) {
      return
    }

    // if (window.location.hash && circle) { jump('#comments', { offset: -10 }) }

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
  }, [error, privateFetched, discussionLoading, hasPermission, circle?.id])

  /**
   * Render
   */
  if (loading || discussionLoading || !privateFetched) {
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

  if (!circle) {
    return (
      <>
        <CircleDetailTabs />
        <Throw404 />
      </>
    )
  }

  if (privateFetched && !hasPermission) {
    return (
      <>
        <CircleDetailTabs />
        <Wall circle={circle} />
      </>
    )
  }

  return (
    <>
      <CircleDetailTabs />

      <section className="discussion" id="comments">
        {!circle.owner.isBlocking && (
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
        )}

        {!comments ||
          (comments.length <= 0 && (
            <EmptyComment
              description={
                <Translate zh_hant="還沒有眾聊" zh_hans="还没有众聊" />
              }
            />
          ))}

        <InfiniteScroll
          hasNextPage={!!pageInfo?.hasNextPage}
          loadMore={loadMore}
        >
          <List spacing={['xloose', 0]}>
            {comments.map((comment) => (
              <List.Item key={comment.id}>
                <ThreadComment
                  comment={comment}
                  type="circleDiscussion"
                  defaultExpand={comment.id === parentId && !!descendantId}
                  hasLink
                  hasUpvote={false}
                  hasDownvote={false}
                  hasPin={false}
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

export default CricleDiscussion
