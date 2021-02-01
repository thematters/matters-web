import {
  Card,
  EmptyTag,
  Head,
  InfiniteScroll,
  List,
  Spinner,
  Tag,
  Translate,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics, mergeConnections, toPath } from '~/common/utils'

import IMAGE_LOGO_192 from '@/public/static/icon-192x192.png?url'

import UserTabs from '../UserTabs'
import { USER_TAGS_PUBLIC } from './gql'
import styles from './styles.css'

import { UserTagsPublic } from './__generated__/UserTagsPublic'

const UserTags = () => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

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
  } = usePublicQuery<UserTagsPublic>(USER_TAGS_PUBLIC, {
    variables: { userName },
  })

  // pagination
  const user = data?.user
  const connectionPath = 'user.tags'
  const { edges, pageInfo } = user?.tags || {}

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'user_tag',
      location: edges?.length || 0,
    })

    await fetchMore({
      variables: {
        after: pageInfo?.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  // refetch & pull to refresh
  const refetch = async () => {
    await refetchPublic()
  }
  usePullToRefresh.Register()
  usePullToRefresh.Handler(refetch)

  /**
   * Render
   */
  if (loading) {
    return (
      <>
        <UserTabs />
        <Spinner />
      </>
    )
  }

  if (error) {
    return (
      <>
        <UserTabs />
        <QueryError error={error} />
      </>
    )
  }

  if (!user || user?.status?.state === 'archived') {
    return (
      <>
        <UserTabs />
        <EmptyTag
          description={
            <Translate
              zh_hant="還沒有主理與協作標籤喔"
              zh_hans="还没有主理与协作标签喔"
            />
          }
        />
      </>
    )
  }

  const CustomHead = () => (
    <Head
      title={{
        zh_hant: `${user.displayName} 主理與協作的標籤`,
        zh_hans: `${user.displayName} 主理与协作的標籤`,
      }}
      description={user.info.description}
      image={user.info.profileCover || IMAGE_LOGO_192}
    />
  )

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        <CustomHead />
        <UserTabs />
        <EmptyTag
          description={
            <Translate
              zh_hant="還沒有主理與協作標籤喔"
              zh_hans="还没有主理与协作标签喔"
            />
          }
        />
      </>
    )
  }

  const hasSubscriptions = user.subscribedCircles.totalCount > 0

  return (
    <>
      <CustomHead />

      <UserTabs hasSubscriptions={hasSubscriptions} />

      <section className="container">
        <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
          <List>
            {edges.map(({ node, cursor }, i) => (
              <List.Item key={cursor}>
                <Card
                  spacing={['base', 'base']}
                  {...toPath({
                    page: 'tagDetail',
                    id: node.id,
                  })}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'user_tag',
                      contentType: 'tag',
                      styleType: 'title',
                      location: i,
                    })
                  }
                >
                  <Tag tag={node} type="list" />
                </Card>
              </List.Item>
            ))}
          </List>
        </InfiniteScroll>

        <style jsx>{styles}</style>
      </section>
    </>
  )
}

export default UserTags
