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
  ThreadComment,
  Throw404,
  Translate,
  usePublicQuery,
  usePullToRefresh,
  ViewerContext,
} from '~/components'

import { ADD_TOAST } from '~/common/enums'
import { filterComments, mergeConnections, translate } from '~/common/utils'

import {
  DISCUSSION_COMMENTS,
  DISCUSSION_PRIVATE,
  DISCUSSION_PUBLIC,
} from './gql'
import styles from './styles.css'
import Wall from './Wall'

import {
  UserDiscussionComments,
  UserDiscussionComments_node_Circle,
  UserDiscussionComments_node_Circle_discussion_edges_node,
} from './__generated__/UserDiscussionComments'
import { UserDiscussionPrivate_node_Circle } from './__generated__/UserDiscussionPrivate'
import {
  UserDiscussionPublic,
  UserDiscussionPublic_node_Circle,
} from './__generated__/UserDiscussionPublic'

interface DiscussionProps {
  id: string
}

type Comment = UserDiscussionComments_node_Circle_discussion_edges_node

const Discussion = ({ id }: DiscussionProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  /**
   * Data Fetching
   */
  const [
    fetchDicussion,
    { data: discussionData, loading: discussionLoading, fetchMore, refetch },
  ] = useLazyQuery<UserDiscussionComments>(DISCUSSION_COMMENTS, {
    fetchPolicy: 'network-only',
    variables: { id },
  })

  // public data
  const { data, loading, error, client } = usePublicQuery<UserDiscussionPublic>(
    DISCUSSION_PUBLIC,
    {
      variables: { id },
    }
  )
  const circle = data?.node as UserDiscussionPublic_node_Circle
  const isOwner = circle?.owner.id === viewer.id
  const isMember = circle?.isMember
  const hasPermission = isOwner || isMember

  // pagination
  const connectionPath = 'node.discussion'
  const discussionCircle =
    discussionData?.node as UserDiscussionComments_node_Circle
  const { edges, pageInfo } = discussionCircle?.discussion || {}
  const comments = filterComments<Comment>(
    (edges || []).map(({ node }) => node)
  )

  // private data
  const [privateFetched, setPrivateFetched] = useState(false)
  const loadPrivate = async (publicData?: UserDiscussionPublic) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    await client.query({
      query: DISCUSSION_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { id },
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
  const loadMore = () =>
    fetchMore({
      variables: { after: pageInfo?.endCursor },
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

  if (!circle) {
    return <Throw404 />
  }

  if (privateFetched && !hasPermission) {
    const wallCircle = circle as UserDiscussionPublic_node_Circle &
      UserDiscussionPrivate_node_Circle
    return <Wall circle={wallCircle} />
  }

  return (
    <>
      <section className="discussion">
        {!circle.owner.isBlocking && (
          <header>
            <CommentForm
              circleId={id}
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

export default Discussion
