import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import ICON_AVATAR_DEFAULT from '@/public/static/icons/72px/avatar-default.svg'
import PROFILE_COVER_DEFAULT from '@/public/static/images/profile-cover.png'
import { EmptyCollection } from '@/src/components/Empty/EmptyCollection'
import { URL_QS } from '~/common/enums'
import { analytics, mergeConnections, stripSpaces } from '~/common/utils'
import {
  AddCollectionDialog,
  Button,
  CollectionDigest,
  Head,
  InfiniteScroll,
  List,
  Media,
  QueryError,
  Spinner,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserCollectionsQuery } from '~/gql/graphql'

import UserTabs from '../UserTabs'
import { USER_COLLECTIONS } from './gql'
import styles from './styles.module.css'

const UserCollections = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName

  let query = USER_COLLECTIONS
  let publicQuery = true

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore } =
    usePublicQuery<UserCollectionsQuery>(
      query,
      { variables: { userName } },
      { publicQuery }
    )
  const user = data?.user
  const collections = user?.collections

  // pagination
  const connectionPath = 'user.collections'
  const { edges, pageInfo } = collections || {}

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'user_collection',
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

  // customize title
  const shareSource = getQuery(URL_QS.SHARE_SOURCE_ONBOARDING_TASKS.key)
  const isShareOnboardingTasks =
    shareSource === URL_QS.SHARE_SOURCE_ONBOARDING_TASKS.value

  const description = stripSpaces(user?.info?.description)

  const CustomHead = () => (
    <Head
      title={{
        zh_hant: isShareOnboardingTasks
          ? `${user?.displayName} 已解鎖新手獎賞，快點加入 Matters 獲得創作者獎勵吧`
          : `${user?.displayName} 的創作空間站`,
        zh_hans: isShareOnboardingTasks
          ? `${user?.displayName} 已解锁新手奖赏，快点加入 Matters 获得创作者奖励吧`
          : `${user?.displayName} 的创作空间站`,
        en: isShareOnboardingTasks
          ? `${user?.displayName} has unlocked new user reward, join Matters to get creator reward`
          : `${user?.displayName}'s creative space`,
      }}
      // title={`Matters - ${user.displayName} (@${user.userName})`}
      noSuffix={isShareOnboardingTasks}
      description={description}
      // keywords={...} // show user's top10 most used tags?
      image={
        user?.info?.profileCover ||
        `//${process.env.NEXT_PUBLIC_SITE_DOMAIN}${PROFILE_COVER_DEFAULT.src}`
      }
      jsonLdData={{
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: user?.displayName,
        description,
        image:
          user?.avatar ||
          `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}${ICON_AVATAR_DEFAULT.src}`,
        url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/@${user?.userName}`,
      }}
    />
  )

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        <CustomHead />
        <UserTabs />
        <EmptyCollection />
        {isViewer && (
          <AddCollectionDialog gotoDetailPage>
            {({ openDialog }) => {
              return (
                <section className={styles.createCollection}>
                  <Button
                    size={['5.5rem', '2rem']}
                    borderColor="green"
                    borderActiveColor="green"
                    borderWidth="md"
                    textColor="green"
                    textActiveColor="green"
                    onClick={openDialog}
                  >
                    <FormattedMessage
                      defaultMessage="Create collection"
                      description="src/views/User/Collections/UserCollections.tsx"
                    />
                  </Button>
                </section>
              )
            }}
          </AddCollectionDialog>
        )}
      </>
    )
  }

  return (
    <>
      <CustomHead />

      <Media at="sm">
        <UserTabs />
      </Media>
      <Media greaterThan="sm">
        <section className={styles.header}>
          <UserTabs />
        </section>
      </Media>

      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List responsiveWrapper>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <CollectionDigest.Feed
                collection={node}
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'user_collection',
                    contentType: 'collection',
                    location: i,
                    id: node.id,
                  })
                }
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

export default UserCollections
