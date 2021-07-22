import { useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'

import {
  ArticleDigestFeed,
  ArticleDigestTitle,
  CircleDigest,
  EmptyWarning,
  Head,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  Tag,
  Translate,
  UserDigest,
} from '~/components'

import { analytics, mergeConnections } from '~/common/utils'

import UnfollowTagActionButton from './DropdownActions/UnfollowTag'
import UnfollowUserActionButton from './DropdownActions/UnfollowUser'
import FeedCircle from './FollowingFeedCircle'
import FeedComment from './FollowingFeedComment'
import FeedHead from './FollowingFeedHead'
import FeedUser from './FollowingFeedUser'
import { FOLLOWING_FEED } from './gql'

import {
  FollowingFeed as FollowingFeedType,
  FollowingFeed_viewer_recommendation_following_edges,
} from './__generated__/FollowingFeed'

type FollowingEdge = FollowingFeed_viewer_recommendation_following_edges

const FollowingFeed = () => {
  const { data, loading, error, fetchMore, refetch } =
    useQuery<FollowingFeedType>(FOLLOWING_FEED)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.following'
  const { edges, pageInfo } = data?.viewer?.recommendation.following || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        <Head title={{ id: 'follow' }} />

        <EmptyWarning
          description={
            <Translate
              zh_hant="還沒有動態"
              zh_hans="还没有动态"
              en="No activities."
            />
          }
        />
      </>
    )
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'follow',
      location: edges.length,
    })
    return fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  // deduplicate edges with same `node.node`
  const dedupedNodeIds: string[] = []
  const dedupedEdges: FollowingEdge[] = []
  edges.forEach((edge) => {
    const { node } = edge
    const nodeId =
      _get(node, 'nodeArticle.id') ||
      _get(node, 'nodeComment.id') ||
      _get(node, 'nodeUser.id') ||
      _get(node, 'nodeCircle.id') ||
      ''
    const hasSameNode = dedupedNodeIds.indexOf(nodeId) >= 0

    if (!hasSameNode) {
      dedupedNodeIds.push(nodeId)
      dedupedEdges.push(edge)
    }
  })

  return (
    <>
      <Head title={{ id: 'follow' }} />

      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        pullToRefresh={refetch}
      >
        <List>
          {dedupedEdges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              {node.__typename === 'UserPublishArticleActivity' && (
                <ArticleDigestFeed
                  header={
                    <FeedHead>
                      <UserDigest.Plain user={node.actor} />
                      <span>
                        {node.nodeArticle.access.circle ? (
                          <Translate
                            zh_hant="發布於"
                            zh_hans="发布于"
                            en="published"
                          />
                        ) : (
                          <Translate
                            zh_hant="發布"
                            zh_hans="发布"
                            en="published on"
                          />
                        )}
                      </span>
                      {node.nodeArticle.access.circle && (
                        <CircleDigest.Plain
                          circle={node.nodeArticle.access.circle}
                        />
                      )}
                    </FeedHead>
                  }
                  article={node.nodeArticle}
                  date={node.createdAt}
                  morePublicActions={
                    <UnfollowUserActionButton user={node.actor} />
                  }
                />
              )}

              {node.__typename === 'UserBroadcastCircleActivity' && (
                <FeedComment
                  header={
                    <FeedHead>
                      <UserDigest.Plain user={node.actor} />
                      <span>
                        <Translate
                          zh_hant="廣播於"
                          zh_hans="广播于"
                          en="broadcasted on"
                        />
                      </span>
                      <CircleDigest.Plain circle={node.targetCircle} />
                    </FeedHead>
                  }
                  comment={node.nodeComment}
                  date={node.createdAt}
                />
              )}

              {node.__typename === 'UserCreateCircleActivity' && (
                <FeedCircle
                  header={
                    <FeedHead>
                      <UserDigest.Plain user={node.actor} />
                      <span>
                        <Translate zh_hant="創建" zh_hans="创建" en="created" />
                      </span>
                    </FeedHead>
                  }
                  circle={node.nodeCircle}
                  date={new Date()}
                  actions={<UnfollowUserActionButton user={node.actor} />}
                />
              )}

              {node.__typename === 'UserCollectArticleActivity' && (
                <ArticleDigestFeed
                  header={
                    <FeedHead>
                      <UserDigest.Plain user={node.actor} />
                      <span>
                        <Translate
                          zh_hant="關聯了作品"
                          zh_hans="关联了作品"
                          en="collected"
                        />
                      </span>
                      <ArticleDigestTitle
                        article={node.targetArticle}
                        textSize="sm-s"
                        textWeight="normal"
                        lineClamp
                        is="h5"
                      />
                    </FeedHead>
                  }
                  hasFollow
                  article={node.nodeArticle}
                  morePublicActions={
                    <UnfollowUserActionButton user={node.actor} />
                  }
                />
              )}

              {node.__typename === 'UserSubscribeCircleActivity' && (
                <FeedCircle
                  header={
                    <FeedHead>
                      <UserDigest.Plain user={node.actor} />
                      <span>
                        <Translate
                          zh_hant="訂閱"
                          zh_hans="订阅"
                          en="subscribed"
                        />
                      </span>
                    </FeedHead>
                  }
                  circle={node.nodeCircle}
                  actions={<UnfollowUserActionButton user={node.actor} />}
                />
              )}

              {node.__typename === 'UserFollowUserActivity' && (
                <FeedUser
                  header={
                    <FeedHead>
                      <UserDigest.Plain user={node.actor} />
                      <span>
                        <Translate
                          zh_hant="追蹤"
                          zh_hans="追踪"
                          en="followed"
                        />
                      </span>
                    </FeedHead>
                  }
                  user={node.nodeUser}
                  date={new Date()}
                  actions={<UnfollowUserActionButton user={node.actor} />}
                />
              )}

              {node.__typename === 'UserDonateArticleActivity' && (
                <ArticleDigestFeed
                  header={
                    <FeedHead>
                      <UserDigest.Plain user={node.actor} />
                      <span>
                        <Translate zh_hant="支持" zh_hans="支持" en="donated" />
                      </span>
                    </FeedHead>
                  }
                  hasFollow
                  article={node.nodeArticle}
                  morePublicActions={
                    <UnfollowUserActionButton user={node.actor} />
                  }
                />
              )}

              {node.__typename === 'UserBookmarkArticleActivity' && (
                <ArticleDigestFeed
                  header={
                    <FeedHead>
                      <UserDigest.Plain user={node.actor} />
                      <span>
                        <Translate
                          zh_hant="收藏"
                          zh_hans="收藏"
                          en="bookmarked"
                        />
                      </span>
                    </FeedHead>
                  }
                  hasFollow
                  article={node.nodeArticle}
                  morePublicActions={
                    <UnfollowUserActionButton user={node.actor} />
                  }
                />
              )}

              {node.__typename === 'UserAddArticleTagActivity' && (
                <ArticleDigestFeed
                  header={
                    <FeedHead>
                      <span>
                        <Translate
                          zh_hant="添加精選於"
                          zh_hans="添加精选于"
                          en="selected by"
                        />
                      </span>
                      <Tag tag={node.targetTag} type="plain" />
                    </FeedHead>
                  }
                  hasFollow
                  article={node.nodeArticle}
                  morePublicActions={
                    <UnfollowTagActionButton tag={node.targetTag} />
                  }
                />
              )}
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

export default FollowingFeed
