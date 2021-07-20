import { useQuery } from '@apollo/react-hooks'

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

import FollowFeedCircle from './FollowFeedCircle'
import FollowFeedComment from './FollowFeedComment'
import FollowFeedHead from './FollowFeedHead'
import FollowFeedUser from './FollowFeedUser'
import { FOLLOWING_FEED } from './gql'

import { FollowingFeed as FollowingFeedType } from './__generated__/FollowingFeed'

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

  return (
    <>
      <Head title={{ id: 'follow' }} />

      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        pullToRefresh={refetch}
      >
        <List>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              {node.__typename === 'UserPublishArticleActivity' && (
                <ArticleDigestFeed
                  header={
                    <FollowFeedHead>
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
                        {node.nodeArticle.access.circle && (
                          <CircleDigest.Plain
                            circle={node.nodeArticle.access.circle}
                          />
                        )}
                      </span>
                    </FollowFeedHead>
                  }
                  article={node.nodeArticle}
                  date={node.createdAt}
                />
              )}

              {node.__typename === 'UserBroadcastCircleActivity' && (
                <FollowFeedComment
                  header={
                    <FollowFeedHead>
                      <UserDigest.Plain user={node.actor} />
                      <span>
                        <Translate
                          zh_hant="廣播於"
                          zh_hans="广播于"
                          en="broadcasted on"
                        />
                      </span>
                      <CircleDigest.Plain circle={node.targetCircle} />
                    </FollowFeedHead>
                  }
                  comment={node.nodeComment}
                  date={node.createdAt}
                />
              )}

              {node.__typename === 'UserCreateCircleActivity' && (
                <FollowFeedCircle
                  header={
                    <FollowFeedHead>
                      <UserDigest.Plain user={node.actor} />
                      <span>
                        <Translate zh_hant="創建" zh_hans="创建" en="created" />
                      </span>
                    </FollowFeedHead>
                  }
                  circle={node.nodeCircle}
                  date={new Date()}
                />
              )}

              {node.__typename === 'UserCollectArticleActivity' && (
                <ArticleDigestFeed
                  header={
                    <FollowFeedHead>
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
                    </FollowFeedHead>
                  }
                  article={node.nodeArticle}
                />
              )}

              {node.__typename === 'UserSubscribeCircleActivity' && (
                <FollowFeedCircle
                  header={
                    <FollowFeedHead>
                      <UserDigest.Plain user={node.actor} />
                      <span>
                        <Translate
                          zh_hant="訂閱"
                          zh_hans="订阅"
                          en="subscribed"
                        />
                      </span>
                    </FollowFeedHead>
                  }
                  circle={node.nodeCircle}
                />
              )}

              {node.__typename === 'UserFollowUserActivity' && (
                <FollowFeedUser
                  header={
                    <FollowFeedHead>
                      <UserDigest.Plain user={node.actor} />
                      <span>
                        <Translate
                          zh_hant="追蹤"
                          zh_hans="追踪"
                          en="followed"
                        />
                      </span>
                    </FollowFeedHead>
                  }
                  user={node.nodeUser}
                  date={new Date()}
                />
              )}

              {node.__typename === 'UserDonateArticleActivity' && (
                <ArticleDigestFeed
                  header={
                    <FollowFeedHead>
                      <UserDigest.Plain user={node.actor} />
                      <span>
                        <Translate zh_hant="支持" zh_hans="支持" en="donated" />
                      </span>
                    </FollowFeedHead>
                  }
                  article={node.nodeArticle}
                />
              )}

              {node.__typename === 'UserBookmarkArticleActivity' && (
                <ArticleDigestFeed
                  header={
                    <FollowFeedHead>
                      <UserDigest.Plain user={node.actor} />
                      <span>
                        <Translate
                          zh_hant="收藏"
                          zh_hans="收藏"
                          en="bookmarked"
                        />
                      </span>
                    </FollowFeedHead>
                  }
                  article={node.nodeArticle}
                />
              )}

              {node.__typename === 'UserAddArticleTagActivity' && (
                <ArticleDigestFeed
                  header={
                    <FollowFeedHead>
                      <span>
                        <Translate
                          zh_hant="添加精選於"
                          zh_hans="添加精选于"
                          en="selected by"
                        />
                      </span>
                      <Tag tag={node.targetTag} type="plain" />
                    </FollowFeedHead>
                  }
                  article={node.nodeArticle}
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
