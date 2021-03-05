import { useLazyQuery } from '@apollo/react-hooks'
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
import {
  DISCUSSION_COMMENTS,
  DISCUSSION_PRIVATE,
  DISCUSSION_PUBLIC,
} from './gql'
import styles from './styles.css'
import Wall from './Wall'

import {
  DiscussionComments,
  DiscussionComments_circle_discussion_edges_node,
} from './__generated__/DiscussionComments'
import { DiscussionPublic } from './__generated__/DiscussionPublic'

type Comment = DiscussionComments_circle_discussion_edges_node

const Discussion = () => {
  const { getQuery } = useRoute()
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const name = getQuery('name')

  /**
   * Data Fetching
   */
  const [
    fetchDicussion,
    { data: discussionData, loading: discussionLoading, fetchMore, refetch },
  ] = useLazyQuery<DiscussionComments>(DISCUSSION_COMMENTS, {
    fetchPolicy: 'network-only',
    variables: { name },
  })

  // public data
  const { data, loading, error, client } = usePublicQuery<DiscussionPublic>(
    DISCUSSION_PUBLIC,
    {
      variables: { name },
    }
  )
  const circle = data?.circle
  const circleId = circle?.id
  const isOwner = circle?.owner.id === viewer.id
  const isMember = circle?.isMember
  const hasPermission = isOwner || isMember

  // pagination
  const connectionPath = 'circle.discussion'
  const { edges, pageInfo } = discussionData?.circle?.discussion || {}
  const comments = filterComments<Comment>(
    (edges || []).map(({ node }) => node)
  )

  // private data
  const [privateFetched, setPrivateFetched] = useState(false)
  const loadPrivate = async (publicData?: DiscussionPublic) => {
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

  useEffect(() => {
    if (!circleId) {
      return
    }

    // fetch private data
    if (viewer.id) {
      loadPrivate(data)
    } else {
      setPrivateFetched(true)
    }

    // fetch discussion
    if (hasPermission) {
      fetchDicussion()
    }
  }, [circleId, hasPermission])

  // load next page
  const loadMore = () =>
    fetchMore({
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

  // refetch & pull to refresh
  usePullToRefresh.Handler(refetch)

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

  /**
   * Render
   */
  if (loading || discussionLoading || !privateFetched) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!circle || !pageInfo) {
    return <Throw404 />
  }

  return (
    <>
      {privateFetched && !hasPermission ? (
        <Wall circle={circle} />
      ) : (
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
                  <Translate zh_hant="還沒有眾聊" zh_hans="还没有众聊" />
                }
              />
            ))}

          <InfiniteScroll
            hasNextPage={pageInfo.hasNextPage}
            loadMore={loadMore}
          >
            <List spacing={['xloose', 0]}>
              {comments.map((comment) => (
                <List.Item key={comment.id}>
                  <ThreadComment
                    comment={comment}
                    type="circleDiscussion"
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
      )}

      <SubscribeCircleDialog circle={circle} />
      {privateFetched && <SubscriptionBanner circle={circle} />}
    </>
  )
}

const CricleDiscussion = () => {
  return (
    <CircleDetailContainer>
      <Discussion />
    </CircleDetailContainer>
  )
}

export default CricleDiscussion
