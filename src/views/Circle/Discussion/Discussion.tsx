import jump from 'jump.js'
import { useContext, useEffect, useState } from 'react'
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
import { DiscussionCommentsQuery, DiscussionPublicQuery } from '~/gql/graphql'

import CircleDetailTabs from '../CircleDetailTabs'
import {
  DISCUSSION_COMMENTS,
  DISCUSSION_PRIVATE,
  DISCUSSION_PUBLIC,
} from './gql'
import styles from './styles.module.css'
import Wall from './Wall'

type Comment = NonNullable<
  NonNullable<DiscussionCommentsQuery['circle']>['discussion']['edges']
>[0]['node']

const RESPONSES_COUNT = 15

const CricleDiscussion = () => {
  const { getQuery } = useRoute()
  const viewer = useContext(ViewerContext)
  const name = getQuery('name')
  const intl = useIntl()

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

  const { fragment, parentId, descendantId } = parseCommentHash()

  /**
   * Data Fetching
   */
  const {
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

  const submitCallback = () => {
    toast.success({
      message: (
        <FormattedMessage
          defaultMessage="Discussion sent"
          id="9nNpKP"
          description="src/views/Circle/Discussion/Discussion.tsx"
        />
      ),
    })

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
  }, [error, privateFetched, discussionLoading, hasPermission, circle?.id])

  /**
   * Render
   */
  if (loading || discussionLoading || !privateFetched) {
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

      <section className={styles.discussion}>
        {!circle.owner.isBlocking && (
          <header className={styles.header}>
            <CircleCommentForm
              circleId={circle?.id}
              type="circleDiscussion"
              placeholder={intl.formatMessage({
                defaultMessage: 'Request an update, ask, share and discuss',
                id: 'EW5R4p',
                description: 'src/views/Circle/Discussion/Discussion.tsx',
              })}
              submitCallback={submitCallback}
            />
          </header>
        )}

        {!comments ||
          (comments.length <= 0 && (
            <EmptyComment
              description={intl.formatMessage({
                defaultMessage: 'No discussion yet',
                id: '50cquj',
                description: 'src/views/Circle/Discussion/Discussion.tsx',
              })}
            />
          ))}

        <InfiniteScroll
          hasNextPage={!!pageInfo?.hasNextPage}
          loadMore={loadMore}
          eof
        >
          <List spacing={['xloose', 0]}>
            {comments.map((comment) => (
              <List.Item key={comment.id}>
                <CircleThreadComment
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
      </section>
    </>
  )
}

export default CricleDiscussion
