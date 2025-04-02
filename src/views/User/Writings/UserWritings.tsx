import { useContext, useEffect, useRef } from 'react'

import ICON_AVATAR_DEFAULT from '@/public/static/icons/avatar-default.svg'
import { USER_PROFILE_WRITINGS_DIGEST_FEED_PREFIX } from '~/common/enums'
import { analytics, mergeConnections, stripSpaces } from '~/common/utils'
import {
  ArticleDigestFeed,
  Empty,
  EmptyWork,
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
import {
  USER_MOMENTS_REACTIVE_DATA,
  USER_WRITINGS_PRIVATE,
  USER_WRITINGS_PUBLIC,
} from './gql'
import PinBoard from './PinBoard'
import Placeholder from './Placeholder'

const UserWritings = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName
  const listRef = useRef<HTMLDivElement | null>(null)

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
    if (!viewer.isAuthed || !publicData || !user) {
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

  // fetch the latest moment data
  const loadMomentReactiveData = (publicData?: UserWritingsPublicQuery) => {
    if (!publicData || !user) {
      return
    }

    const publiceEdges = publicData.user?.writings?.edges || []
    const momentEdges = publiceEdges.filter(
      ({ node }) => node.__typename === 'Moment'
    )
    const publicIds = momentEdges.map(({ node }) => node.id)

    client.query({
      query: USER_MOMENTS_REACTIVE_DATA,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private and moment data for first page
  useEffect(() => {
    loadPrivate(data)
    loadMomentReactiveData(data)
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

  useEffect(() => {
    if (!listRef.current) {
      return
    }
    const shortHash = window.location.hash.replace('#', '')
    if (!shortHash) {
      return
    }
    const selector = `#${USER_PROFILE_WRITINGS_DIGEST_FEED_PREFIX}${shortHash}`

    const element = listRef.current.querySelector(selector)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [])

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
    return (
      <Head
        title={user.displayName}
        description={description || ''}
        image={user.info.profileCover}
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
        <MomentForm />
        <EmptyWork isMe={isViewer} />
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
          <section ref={listRef}>
            <List>
              {writingEdges.map(({ node }, i) => (
                <List.Item
                  key={node.id}
                  id={`${USER_PROFILE_WRITINGS_DIGEST_FEED_PREFIX}${node.shortHash}`}
                >
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
          </section>
        </InfiniteScroll>
      </Layout.Main.Spacing>
    </>
  )
}

export default UserWritings
