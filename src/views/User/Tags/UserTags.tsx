import {
  Card,
  EmptyTag,
  Head,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  Tag,
  Translate,
  usePublicQuery,
  usePullToRefresh,
  useRoute,
} from '~/components'

import { analytics, mergeConnections, toPath } from '~/common/utils'

import IMAGE_LOGO_192 from '@/public/static/icon-192x192.png'

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
  const hasSubscriptions = (user?.subscribedCircles.totalCount || 0) > 0

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'user_tag',
      location: edges?.length || 0,
    })

    await fetchMore({
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
        <UserTabs hasSubscriptions={hasSubscriptions} />
        <Spinner />
      </>
    )
  }

  if (error) {
    return (
      <>
        <UserTabs hasSubscriptions={hasSubscriptions} />
        <QueryError error={error} />
      </>
    )
  }

  if (!user || user?.status?.state === 'archived') {
    return (
      <>
        <UserTabs hasSubscriptions={hasSubscriptions} />
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
        en: `Tags ${user.displayName} maintaining or collaborating`,
      }}
      description={user.info.description}
      image={user.info.profileCover || IMAGE_LOGO_192.src}
    />
  )

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        <CustomHead />
        <UserTabs hasSubscriptions={hasSubscriptions} />
        <EmptyTag
          description={
            <Translate
              zh_hant="還沒有主理與協作標籤喔"
              zh_hans="还没有主理与协作标签喔"
              en="No maintaining or collabrating tags yet"
            />
          }
        />
      </>
    )
  }

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
                      location: i,
                      id: node.id,
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
