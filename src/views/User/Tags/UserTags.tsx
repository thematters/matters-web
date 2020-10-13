import { useRouter } from 'next/router'

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
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics, getQuery, mergeConnections, toPath } from '~/common/utils'

import IMAGE_LOGO_192 from '@/public/static/icon-192x192.png?url'

import UserTabs from '../UserTabs'
import { USER_TAGS_PUBLIC } from './gql'
import styles from './styles.css'

import { UserTagsPublic } from './__generated__/UserTagsPublic'

const UserTags = () => {
  const router = useRouter()
  const userName = getQuery({ router, key: 'userName' })

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
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!user) {
    return null
  }

  const CustomHead = () => (
    <Head
      title={{
        zh_hant: `${user.displayName}主理與協作的標籤`,
        zh_hans: `${user.displayName}主理与协作的標籤`,
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
            <Translate zh_hant="還沒有主理與協作標籤喔" zh_hans="还没有主理与协作标签喔" />
          }
        />
      </>
    )
  }

  return (
    <>
      <CustomHead />

      <UserTabs />

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
