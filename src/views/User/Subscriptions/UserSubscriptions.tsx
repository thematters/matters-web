import { useRouter } from 'next/router'

import {
  CircleDigest,
  EmptyWarning,
  Head,
  InfiniteScroll,
  List,
  Spinner,
  Title,
  Translate,
  usePublicQuery,
  usePullToRefresh,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics, getQuery, mergeConnections } from '~/common/utils'

import IMAGE_LOGO_192 from '@/public/static/icon-192x192.png?url'

import UserTabs from '../UserTabs'
import { USER_SUBSCRIPTIONS } from './gql'
import styles from './styles.css'

import { UserSubscriptions } from './__generated__/UserSubscriptions'

const Subscriptions = () => {
  const router = useRouter()
  const userName = getQuery({ router, key: 'name' })

  /**
   * Data Fetching
   */
  // public data
  const {
    data,
    loading,
    error,
    refetch,
    fetchMore,
  } = usePublicQuery<UserSubscriptions>(USER_SUBSCRIPTIONS, {
    variables: { userName },
  })

  // pagination
  const connectionPath = 'user.subscribedCircles'
  const user = data?.user
  const { edges, pageInfo } = user?.subscribedCircles || {}

  usePullToRefresh.Register()
  usePullToRefresh.Handler(refetch)

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'user_circle',
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
        <EmptyWarning
          description={<Translate zh_hant="還沒有訂閱" zh_hans="还没有订阅" />}
        />
      </>
    )
  }

  const CustomHead = () => (
    <Head
      title={{
        zh_hant: `${user.displayName} 的訂閱`,
        zh_hans: `${user.displayName} 的订阅`,
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
        <EmptyWarning
          description={<Translate zh_hant="還沒有訂閱" zh_hans="还没有订阅" />}
        />
      </>
    )
  }

  return (
    <>
      <CustomHead />

      <UserTabs hasSubscriptions />

      <section className="subtitle">
        <Title type="feed" is="h2">
          <Translate zh_hant="活躍在圍爐中" zh_hans="活跃在围炉中" />
        </Title>
      </section>

      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List hasBorder={false}>
          {edges.map(({ node }) => (
            <List.Item key={node.id}>
              <CircleDigest.Mini circle={node} spacing={['base', 'tight']} />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>

      <style jsx>{styles}</style>
    </>
  )
}

export default Subscriptions
