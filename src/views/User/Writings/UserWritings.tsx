import { useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'

import ICON_AVATAR_DEFAULT from '@/public/static/icons/avatar-default.svg'
import PROFILE_COVER_DEFAULT from '@/public/static/images/profile-cover.png'
import { analytics, mergeConnections, stripSpaces } from '~/common/utils'
import {
  ArticleDigestFeed,
  Empty,
  EmptyArticle,
  Head,
  InfiniteScroll,
  Layout,
  List,
  MomentDigestFeed,
  QueryError,
  Translate,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserWritingsPublicQuery } from '~/gql/graphql'

import MomentForm from '../MomentForm'
import { USER_WRITINGS_PRIVATE, USER_WRITINGS_PUBLIC } from './gql'
import PinBoard from './PinBoard'
import Placeholder from './Placeholder'

const UserWritings = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore, client } =
    usePublicQuery<UserWritingsPublicQuery>(USER_WRITINGS_PUBLIC, {
      variables: { userName },
    })

  // pagination
  const connectionPath = 'user.writings'
  const user = data?.user
  const { edges, pageInfo } = user?.writings || {}

  // private data
  const loadPrivate = (publicData?: UserWritingsPublicQuery) => {
    if (!viewer.isAuthed || isViewer || !publicData || !user) {
      return
    }

    const publiceEdges = publicData.user?.writings?.edges || []
    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: USER_WRITINGS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    loadPrivate(data)
  }, [user?.id, viewer.id])

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'user_writing',
      location: edges?.length || 0,
    })

    const { data: newData } = await fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

    loadPrivate(newData)
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

  const description = stripSpaces(user.info.description)

  const CustomHead = () => {
    const intl = useIntl()

    return (
      <Head
        title={intl.formatMessage(
          {
            defaultMessage: "{displayName}'s creative space",
            id: '/usqHn',
          },
          { displayName: user.displayName }
        )}
        // title={`Matters - ${user.displayName} (@${user.userName})`}
        description={description}
        // keywords={...} // show user's top10 most used tags?
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
  }

  const writingEdges =
    edges &&
    edges.filter(({ node }) => {
      const isActiveArticle =
        node.__typename === 'Article' && node.articleState === 'active'
      const isActiveMoment =
        node.__typename === 'Moment' && node.momentState === 'active'
      return isActiveArticle || isActiveMoment
    })

  if (!writingEdges || writingEdges.length <= 0 || !pageInfo) {
    return (
      <>
        <CustomHead />
        <EmptyArticle isMe={isViewer} />
      </>
    )
  }

  return (
    <>
      <CustomHead />

      <PinBoard user={user} />

      <MomentForm />

      <Layout.Main.Spacing hasVertical={false}>
        <InfiniteScroll
          hasNextPage={pageInfo.hasNextPage}
          loadMore={loadMore}
          loader={<Placeholder />}
          eof
        >
          <List>
            {writingEdges.map(({ node }, i) => (
              <List.Item key={node.id}>
                {node.__typename === 'Article' && (
                  <ArticleDigestFeed
                    article={node}
                    inUserArticles
                    hasAuthor={false}
                    hasEdit={true}
                    hasAddCollection={true}
                    hasArchive={true}
                    onClick={() =>
                      analytics.trackEvent('click_feed', {
                        type: 'user_article',
                        contentType: 'article',
                        location: i,
                        id: node.id,
                      })
                    }
                  />
                )}
                {node.__typename === 'Moment' && (
                  <MomentDigestFeed moment={node} />
                )}
              </List.Item>
            ))}
          </List>
        </InfiniteScroll>
      </Layout.Main.Spacing>
    </>
  )
}

export default UserWritings
