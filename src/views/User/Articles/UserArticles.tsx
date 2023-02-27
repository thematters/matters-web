import { useContext, useEffect } from 'react'

import ICON_AVATAR_DEFAULT from '@/public/static/icons/72px/avatar-default.svg'
import PROFILE_COVER_DEFAULT from '@/public/static/images/profile-cover.png'
import { URL_QS } from '~/common/enums'
import { analytics, mergeConnections, stripSpaces } from '~/common/utils'
import {
  ArticleDigestFeed,
  EmptyArticle,
  Head,
  IconDotDivider,
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  Translate,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserArticlesPublicQuery } from '~/gql/graphql'

import UserTabs from '../UserTabs'
import {
  USER_ARTICLES_PRIVATE,
  USER_ARTICLES_PUBLIC,
  VIEWER_ARTICLES,
} from './gql'
import styles from './styles.css'

const ArticleSummaryInfo = ({
  user,
}: {
  user: NonNullable<UserArticlesPublicQuery['user']>
}) => {
  const { articleCount: articles, totalWordCount: words } = user.status || {
    articleCount: 0,
    totalWordCount: 0,
  }

  return (
    <div className="info">
      <Translate zh_hant="創作了" zh_hans="创作了" en="Created" />
      <span className="num">&nbsp;{articles}&nbsp;</span>
      <Translate zh_hant="篇作品" zh_hans="篇作品" en="articles" />

      <IconDotDivider />

      <Translate zh_hant="累積創作" zh_hans="累积创作" en="In total" />
      <span className="num">&nbsp;{words}&nbsp;</span>
      <Translate zh_hant="字" zh_hans="字" en="words" />

      <style jsx>{styles}</style>
    </div>
  )
}

const UserArticles = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const userName = getQuery('name')
  const isViewer = viewer.userName === userName

  let query = USER_ARTICLES_PUBLIC
  let publicQuery = true
  if (isViewer) {
    query = VIEWER_ARTICLES
    publicQuery = false
  }

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore, client } =
    usePublicQuery<UserArticlesPublicQuery>(
      query,
      { variables: { userName } },
      { publicQuery }
    )

  // pagination
  const connectionPath = 'user.articles'
  const user = data?.user
  const { edges, pageInfo } = user?.articles || {}

  // private data
  const loadPrivate = (publicData?: UserArticlesPublicQuery) => {
    if (!viewer.isAuthed || isViewer || !publicData || !user) {
      return
    }

    const publiceEdges = publicData.user?.articles?.edges || []
    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: USER_ARTICLES_PRIVATE,
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
      type: 'user_article',
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
        <EmptyArticle />
      </>
    )
  }

  // customize title
  const shareSource = getQuery(URL_QS.SHARE_SOURCE_ONBOARDING_TASKS.key)
  const isShareOnboardingTasks =
    shareSource === URL_QS.SHARE_SOURCE_ONBOARDING_TASKS.value

  const description = stripSpaces(user.info.description)

  const CustomHead = () => (
    <Head
      title={{
        zh_hant: isShareOnboardingTasks
          ? `${user.displayName} 已解鎖新手獎賞，快點加入 Matters 獲得創作者獎勵吧`
          : `${user.displayName} 的創作空間站`,
        zh_hans: isShareOnboardingTasks
          ? `${user.displayName} 已解锁新手奖赏，快点加入 Matters 获得创作者奖励吧`
          : `${user.displayName} 的创作空间站`,
        en: isShareOnboardingTasks
          ? `${user.displayName} has unlocked new user reward, join Matters to get creator reward`
          : `${user.displayName}'s creative space`,
      }}
      // title={`Matters - ${user.displayName} (@${user.userName})`}
      noSuffix={isShareOnboardingTasks}
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

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        <CustomHead />
        <UserTabs />
        <EmptyArticle />
      </>
    )
  }

  const articleEdges = edges.filter(
    ({ node }) => node.articleState === 'active' || viewer.id === node.author.id
  )

  return (
    <>
      <CustomHead />

      <UserTabs />

      <ArticleSummaryInfo user={user} />

      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List>
          {articleEdges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <ArticleDigestFeed
                article={node}
                inUserArticles
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'user_article',
                    contentType: 'article',
                    location: i,
                    id: node.id,
                  })
                }
                onClickAuthor={() => {
                  analytics.trackEvent('click_feed', {
                    type: 'user_article',
                    contentType: 'user',
                    location: i,
                    id: node.author.id,
                  })
                }}
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

export default UserArticles
