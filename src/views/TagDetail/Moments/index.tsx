import { useContext, useEffect, useRef } from 'react'
import { FormattedMessage } from 'react-intl'

import { mergeConnections } from '~/common/utils'
import {
  ArticleFeedPlaceholder,
  EmptyWork,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import { MomentDigestFeed } from '~/components/MomentDigest/Feed'
import { TagFragmentFragment, TagMomentsPublicQuery } from '~/gql/graphql'

import { TAG_MOMENTS_PRIVATE, TAG_MOMENTS_PUBLIC } from './gql'

const TagDetailMoments = ({ tag }: { tag: TagFragmentFragment }) => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore, client } =
    usePublicQuery<TagMomentsPublicQuery>(TAG_MOMENTS_PUBLIC, {
      variables: { id: tag.id },
    })

  // pagination
  const connectionPath = 'node.moments'
  const { edges, pageInfo } =
    (data?.node?.__typename === 'Tag' && data.node.moments) || {}
  const fetchedPrivateRef = useRef(false)

  // private data
  const loadPrivate = (publicData?: TagMomentsPublicQuery) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const publicEdges =
      publicData.node?.__typename === 'Tag'
        ? publicData.node.moments.edges || []
        : []
    const publicIds = publicEdges.map(({ node }) => node.id)

    if (publicIds.length === 0) {
      return
    }

    client.query({
      query: TAG_MOMENTS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    if (loading || !edges || fetchedPrivateRef.current || !viewer.isAuthed) {
      return
    }

    loadPrivate(data)
    fetchedPrivateRef.current = true
  }, [!!edges, loading, viewer.id])

  // load next page
  const loadMore = async () => {
    if (loading) {
      return
    }

    const { data: newData } = await fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
          dedupe: true,
        }),
    })

    loadPrivate(newData)
  }

  /**
   * Render
   */
  if (loading) {
    return <ArticleFeedPlaceholder />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptyWork
        description={
          <FormattedMessage defaultMessage="No moments yet" id="6wdAti" />
        }
      />
    )
  }

  return (
    <Layout.Main.Spacing hasVertical={false}>
      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        loader={<ArticleFeedPlaceholder count={3} />}
        eof
      >
        <List>
          {edges.map(({ node, cursor }) => (
            <List.Item key={cursor}>
              {/* hasTag=false: the tag is already the page context */}
              <MomentDigestFeed
                moment={node}
                hasAuthor
                hasCommentedFollowees
                hasTag={false}
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </Layout.Main.Spacing>
  )
}

export default TagDetailMoments
