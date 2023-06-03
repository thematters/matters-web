// import IMAGE_LOGO_192 from '@/public/static/icon-192x192.png'
import ICON_AVATAR_DEFAULT from '@/public/static/icons/72px/avatar-default.svg'
import PROFILE_COVER_DEFAULT from '@/public/static/images/profile-cover.png'
import { analytics, mergeConnections, stripSpaces } from '~/common/utils'
import {
  CircleDigest,
  EmptyWarning,
  Head,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  Title,
  Translate,
  usePublicQuery,
  useRoute,
} from '~/components'
import { UserSubscriptionsQuery } from '~/gql/graphql'

import UserTabs from '../UserTabs'
import { USER_SUBSCRIPTIONS } from './gql'
import styles from './styles.module.css'

const Subscriptions = () => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore } =
    usePublicQuery<UserSubscriptionsQuery>(USER_SUBSCRIPTIONS, {
      variables: { userName },
    })

  // pagination
  const connectionPath = 'user.subscribedCircles'
  const user = data?.user
  const { edges, pageInfo } = user?.subscribedCircles || {}

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'user_circle',
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

  const description = stripSpaces(user.info.description)

  const CustomHead = () => (
    <Head
      title={{
        zh_hant: `${user.displayName} 的訂閱`,
        zh_hans: `${user.displayName} 的订阅`,
        en: `${user.displayName}'s subscriptions`,
      }}
      // keywords={...} // show user's top10 most used tags?
      description={description}
      // image={user.info.profileCover || IMAGE_LOGO_192.src}
      image={
        user.info.profileCover ||
        `//${process.env.NEXT_PUBLIC_SITE_DOMAIN}${PROFILE_COVER_DEFAULT.src}`
      }
      jsonLdData={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: user.displayName,
        description,
        image:
          user.avatar ||
          `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${ICON_AVATAR_DEFAULT.src}`,
        url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/@${user.userName}`,
      }}
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

      <UserTabs />

      <section className={styles['subtitle']}>
        <Title type="feed" is="h2">
          <Translate zh_hant="活躍在圍爐中" zh_hans="活跃在围炉中" />
        </Title>
      </section>

      <section className={styles['list']}>
        <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
          <List hasBorder={false}>
            {edges.map(({ node }) => (
              <List.Item key={node.id}>
                <CircleDigest.Mini circle={node} spacing={['base', 0]} />
              </List.Item>
            ))}
          </List>
        </InfiniteScroll>
      </section>
    </>
  )
}

export default Subscriptions
