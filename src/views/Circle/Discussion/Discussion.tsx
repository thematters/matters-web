import { useLazyQuery } from '@apollo/client'
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

import CircleDetailTabs from '../CircleDetailTabs'
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

const CricleDiscussion = () => {
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
  const isOwner = circle?.owner.id === viewer.id
  const isMember = circle?.circleIsMember
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

  // fetch private data
  useEffect(() => {
    if (!circle?.id) {
      return
    }

    if (viewer.isAuthed) {
      loadPrivate(data)
    } else if (viewer.privateFetched) {
      setPrivateFetched(true)
    }
  }, [circle?.id, viewer.privateFetched])

  // fetch discussion
  useEffect(() => {
    if (hasPermission) {
      fetchDicussion()
    }
  }, [hasPermission])

  // load next page
  const loadMore = async () => {
    if (!fetchMore) {
      return
    }

    return fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  // refetch & pull to refresh
  usePullToRefresh.Handler(async () => {
    if (!refetch) {
      return
    }

    return refetch()
  })

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

    if (!refetch) {
      return
    }

    refetch()
  }

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

      <section className="discussion">
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
