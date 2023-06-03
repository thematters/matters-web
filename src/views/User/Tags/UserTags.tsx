// import IMAGE_LOGO_192 from '@/public/static/icon-192x192.png'
import ICON_AVATAR_DEFAULT from '@/public/static/icons/72px/avatar-default.svg'
import PROFILE_COVER_DEFAULT from '@/public/static/images/profile-cover.png'
import {
  analytics,
  mergeConnections,
  stripSpaces,
  toPath,
} from '~/common/utils'
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
  useRoute,
} from '~/components'
import { UserTagsPublicQuery } from '~/gql/graphql'

import UserTabs from '../UserTabs'
import { USER_TAGS_PUBLIC } from './gql'
import styles from './styles.module.css'

const UserTags = () => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore } =
    usePublicQuery<UserTagsPublicQuery>(USER_TAGS_PUBLIC, {
      variables: { userName },
    })

  // pagination
  const user = data?.user
  const connectionPath = 'user.maintainedTags'
  const { edges, pageInfo } = user?.maintainedTags || {}

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
              id="noTagsUsageYet"
              // zh_hant="還沒有主理與協作標籤喔"
              // zh_hans="还没有主理与协作标签喔"
            />
          }
        />
      </>
    )
  }

  const description = stripSpaces(user.info.description)

  const CustomHead = () => (
    <Head
      title={{
        zh_hant: `${user.displayName} 主理與協作的標籤`,
        zh_hans: `${user.displayName} 主理与协作的標籤`,
        en: `Tags ${user.displayName} maintaining or collaborating`,
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
        <EmptyTag
          description={
            <Translate
              id="noTagsUsageYet"
              // zh_hant="還沒有主理與協作標籤喔"
              // zh_hans="还没有主理与协作标签喔"
              // en="No maintaining or collabrating tags yet"
            />
          }
        />
      </>
    )
  }

  return (
    <>
      <CustomHead />

      <UserTabs />

      <section className={styles['container']}>
        <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
          <List>
            {edges.map(({ node: tag, cursor }, i) => (
              <List.Item key={cursor}>
                <Card
                  spacing={['base', 0]}
                  {...toPath({
                    page: 'tagDetail',
                    tag,
                  })}
                  bgActiveColor="none"
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'user_tag',
                      contentType: 'tag',
                      location: i,
                      id: tag.id,
                    })
                  }
                >
                  <Tag tag={tag} type="list" />
                </Card>
              </List.Item>
            ))}
          </List>
        </InfiniteScroll>
      </section>
    </>
  )
}

export default UserTags
