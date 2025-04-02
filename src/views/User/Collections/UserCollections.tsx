import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconPlus } from '@/public/static/icons/24px/plus.svg'
import { analytics, mergeConnections, stripSpaces } from '~/common/utils'
import {
  AddCollectionDialog,
  CollectionDigestFeed,
  Empty,
  Head,
  Icon,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  TextIcon,
  Translate,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { EmptyCollection } from '~/components/Empty/EmptyCollection'
import { UserCollectionsQuery } from '~/gql/graphql'

import CreateCollection from './CreateCollection'
import { USER_COLLECTIONS } from './gql'
import Placeholder from './Placeholder'
import styles from './styles.module.css'

const UserCollections = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore } =
    usePublicQuery<UserCollectionsQuery>(
      USER_COLLECTIONS,
      { variables: { userName } },
      { publicQuery: true }
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
      <Layout.Main.Spacing hasVertical={false}>
        <Placeholder />
      </Layout.Main.Spacing>
    )
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!user) {
    return <></>
  }

  if (user?.status?.state === 'archived') {
    return (
      <Empty
        spacingY="xxxloose"
        description={
          <Translate
            en="Deleted user"
            zh_hans="用户已注销"
            zh_hant="用戶已註銷"
          />
        }
      />
    )
  }

  // customize title
  const description = stripSpaces(user?.info?.description)

  const CustomHead = () => {
    return (
      <Head
        title={user?.displayName}
        description={description || ''}
        image={user?.info?.profileCover}
        jsonLdData={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: user?.displayName,
          description,
          image: user?.avatar,
          url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/@${user?.userName}`,
        }}
      />
    )
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        <CustomHead />
        <EmptyCollection />
        {isViewer && <CreateCollection />}
      </>
    )
  }

  return (
    <>
      <CustomHead />

      {isViewer && (
        <AddCollectionDialog gotoDetailPage>
          {({ openDialog }) => {
            return (
              <section className={styles.addCollection} onClick={openDialog}>
                <TextIcon icon={<Icon icon={IconPlus} size={20} />}>
                  <FormattedMessage
                    defaultMessage="New Collection"
                    id="L4Fcr8"
                  />
                </TextIcon>
              </section>
            )
          }}
        </AddCollectionDialog>
      )}

      <Layout.Main.Spacing hasVertical={false}>
        <InfiniteScroll
          hasNextPage={pageInfo.hasNextPage}
          loadMore={loadMore}
          loader={<Placeholder />}
          eof
        >
          <List>
            {edges.map(({ node, cursor }, i) => (
              <List.Item key={node.id}>
                <CollectionDigestFeed
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
