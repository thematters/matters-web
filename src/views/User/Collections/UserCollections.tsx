import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import ICON_AVATAR_DEFAULT from '@/public/static/icons/72px/avatar-default.svg'
import PROFILE_COVER_DEFAULT from '@/public/static/images/profile-cover.png'
import { analytics, mergeConnections, stripSpaces } from '~/common/utils'
import {
  AddCollectionDialog,
  CollectionDigest,
  Head,
  IconAdd20,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  TextIcon,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { EmptyCollection } from '~/components/Empty/EmptyCollection'
import { UserCollectionsQuery } from '~/gql/graphql'

import UserTabs from '../UserTabs'
import CreateCollection from './CreateCollection'
import { USER_COLLECTIONS } from './gql'
import Placeholder from './Placeholder'
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
        <UserTabs loading />
        <Layout.Main.Spacing>
          <Placeholder />
        </Layout.Main.Spacing>
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

  const description = stripSpaces(user?.info?.description)

  const CustomHead = () => (
    <Head
      title={{
        zh_hant: `${user?.displayName} 的創作空間站`,
        zh_hans: `${user?.displayName} 的创作空间站`,
        en: `${user?.displayName}'s creative space`,
      }}
      description={description}
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
        <UserTabs user={user!} />
        <EmptyCollection />
        {isViewer && <CreateCollection />}
      </>
    )
  }

  return (
    <>
      <CustomHead />

      <UserTabs user={user!} />

      {isViewer && (
        <AddCollectionDialog gotoDetailPage>
          {({ openDialog }) => {
            return (
              <section className={styles.addCollection} onClick={openDialog}>
                <TextIcon icon={<IconAdd20 size="mdS" />}>
                  <FormattedMessage defaultMessage="New Collection" />
                </TextIcon>
              </section>
            )
          }}
        </AddCollectionDialog>
      )}

      <Layout.Main.Spacing>
        <InfiniteScroll
          hasNextPage={pageInfo.hasNextPage}
          loadMore={loadMore}
          loader={<Placeholder />}
          eof
        >
          <List>
            {edges.map(({ node, cursor }, i) => (
              <List.Item key={node.id}>
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
      </Layout.Main.Spacing>
    </>
  )
}

export default UserCollections
