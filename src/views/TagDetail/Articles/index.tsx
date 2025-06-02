import React, { useContext, useEffect, useRef } from 'react'

import { REFETCH_TAG_DETAIL_ARTICLES } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'
import {
  ArticleDigestFeed,
  EmptyTagArticles,
  InfiniteScroll,
  Layout,
  List,
  Media,
  QueryError,
  SpinnerBlock,
  useEventListener,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import {
  TAG_ARTICLES_PRIVATE,
  TAG_ARTICLES_PUBLIC,
} from '~/components/GQL/queries/tagArticles'
import { TagArticlesPublicQuery, TagFragmentFragment } from '~/gql/graphql'

import RecommendedAuthors from '../RecommendedAuthors'
import RelatedTags from '../RelatedTags'

interface TagArticlesProps {
  tag: TagFragmentFragment
  feedType: string
}

const TagDetailArticles = ({ tag, feedType }: TagArticlesProps) => {
  const viewer = useContext(ViewerContext)
  const feed = useRef(feedType)

  const isHottest = feedType === 'hottest'

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
  } = usePublicQuery<TagArticlesPublicQuery>(TAG_ARTICLES_PUBLIC, {
    variables: {
      id: tag.id,
      selected: feedType === 'selected',
      sortBy: feedType === 'hottest' ? 'byHottestDesc' : 'byCreatedAtDesc',
    },
  })

  // pagination
  const connectionPath = 'node.articles'
  const { edges, pageInfo } =
    (data?.node?.__typename === 'Tag' && data.node.articles) || {}

  // private data
  const loadPrivate = (publicData?: TagArticlesPublicQuery) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const publiceEdges =
      publicData?.node?.__typename === 'Tag'
        ? publicData.node.articles.edges || []
        : []
    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: TAG_ARTICLES_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    if (loading || !edges) {
      return
    }

    if (feed.current !== feedType) {
      refetchPublic()
      feed.current = feedType
    }

    loadPrivate(data)
  }, [!!edges, loading, feedType, viewer.id])

  // load next page
  const trackingType = isHottest ? 'tag_detail_hottest' : 'tag_detail_latest'
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: trackingType,
      location: edges?.length || 0,
    })

    const { data: newData } = await fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

    loadPrivate(newData)
  }

  const sync = async ({
    event,
    differences = 0,
  }: {
    event: 'add' | 'delete'
    differences?: number
  }) => {
    const count = (edges || []).length
    switch (event) {
      case 'add':
        const { data: addData } = await refetchPublic({
          variables: { id: tag.id, first: count + differences },
        })
        loadPrivate(addData)
        break
      case 'delete':
        const { data: deleteData } = await refetchPublic({
          variables: { id: tag.id, first: Math.max(count - 1, 0) },
        })
        loadPrivate(deleteData)
        break
    }
  }

  useEventListener(REFETCH_TAG_DETAIL_ARTICLES, sync)

  /**
   * Render
   */
  if (loading && !edges) {
    return <SpinnerBlock />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyTagArticles />
  }

  return (
    <Layout.Main.Spacing hasVertical={false}>
      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        eof
      >
        <List>
          {(edges || []).map(({ node }, i) => (
            <React.Fragment key={`${feedType}:${node.id}`}>
              <List.Item>
                <ArticleDigestFeed
                  article={node}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: trackingType,
                      contentType: 'article',
                      location: i,
                      id: node.id,
                    })
                  }
                  onClickAuthor={() => {
                    analytics.trackEvent('click_feed', {
                      type: trackingType,
                      contentType: 'user',
                      location: i,
                      id: node.author.id,
                    })
                  }}
                  tagDetailId={tag.id}
                  hasEdit={true}
                  hasArchive={true}
                />
              </List.Item>

              {edges.length >= 2 && i === 0 && (
                <Media lessThan="lg">
                  <RecommendedAuthors tagId={tag.id} />
                </Media>
              )}

              {edges.length >= 2 && i === 1 && (
                <Media lessThan="lg">
                  <RelatedTags tagId={tag.id} />
                </Media>
              )}
            </React.Fragment>
          ))}
        </List>

        {edges.length < 2 && (
          <Media lessThan="lg">
            <RecommendedAuthors tagId={tag.id} />
            <RelatedTags tagId={tag.id} />
          </Media>
        )}
      </InfiniteScroll>
    </Layout.Main.Spacing>
  )
}

export default TagDetailArticles
