import { NetworkStatus } from 'apollo-client'
import _some from 'lodash/some'
import dynamic from 'next/dynamic'
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
  Spinner,
  useEventListener,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import {
  TAG_ARTICLES_PRIVATE,
  TAG_ARTICLES_PUBLIC,
} from '~/components/GQL/queries/tagArticles'
import { TagArticlesPublicQuery, TagFragmentFragment } from '~/gql/graphql'

import RelatedTags from '../RelatedTags'

const DynamicArticleDigestFeed = dynamic(
  () => import('~/components/ArticleDigest/Feed'),
  { ssr: false, loading: ArticleDigestFeed.Placeholder }
)

interface TagArticlesProps {
  tag: TagFragmentFragment
  feedType: string
}

const TagDetailArticles = ({ tag, feedType }: TagArticlesProps) => {
  const viewer = useContext(ViewerContext)
  const feed = useRef(feedType)

  const isSelected = feedType === 'selected'
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
    networkStatus,
    client,
  } = usePublicQuery<TagArticlesPublicQuery>(TAG_ARTICLES_PUBLIC, {
    variables: {
      id: tag.id,
      selected: feedType === 'selected',
      sortBy: feedType === 'hottest' ? 'byHottestDesc' : 'byCreatedAtDesc',
    },
    notifyOnNetworkStatusChange: true,
  })

  // pagination
  const connectionPath = 'node.articles'
  const { edges, pageInfo } =
    (data?.node?.__typename === 'Tag' && data.node.articles) || {}
  const isNewLoading =
    [NetworkStatus.loading, NetworkStatus.setVariables].indexOf(
      networkStatus
    ) >= 0

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
  const trackingType = isHottest
    ? 'tag_detail_hottest'
    : isSelected
    ? 'tag_detail_selected'
    : 'tag_detail_latest'
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
  if (loading && (!edges || isNewLoading)) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyTagArticles />
  }

  const isEditor = _some(
    tag?.editors || [],
    (editor) => editor.id === viewer.id
  )
  const isCreator = tag?.creator?.id === viewer.id
  const canEditTag = isEditor || isCreator || viewer.status?.role === 'admin'

  return (
    <Layout.Main.Spacing hasVertical={false}>
      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        eof
      >
        <List>
          {(edges || []).map(({ node, cursor }, i) => (
            <React.Fragment key={`${feedType}:${cursor}`}>
              <List.Item>
                <DynamicArticleDigestFeed
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
                  hasSetTagSelected={canEditTag && !isSelected}
                  hasSetTagUnselected={canEditTag && isSelected}
                  hasRemoveTag={canEditTag}
                  hasArchive={true}
                />
              </List.Item>

              {edges.length >= 4 && i === 3 && (
                <Media lessThan="lg">
                  <RelatedTags tagId={tag.id} />
                </Media>
              )}
            </React.Fragment>
          ))}
        </List>

        {edges.length < 4 && (
          <Media lessThan="lg">
            <RelatedTags tagId={tag.id} />
          </Media>
        )}
      </InfiniteScroll>
    </Layout.Main.Spacing>
  )
}

export default TagDetailArticles
