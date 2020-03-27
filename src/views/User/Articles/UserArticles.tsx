import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  ArticleDigestFeed,
  EmptyArticle,
  Head,
  Icon,
  InfiniteScroll,
  List,
  Spinner,
  Translate,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'
import USER_ARTICLES from '~/components/GQL/queries/userArticles'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, getQuery, mergeConnections } from '~/common/utils'
import IMAGE_LOGO_192 from '~/static/icon-192x192.png?url'

import UserTabs from '../UserTabs'
import styles from './styles.css'

import {
  UserArticles as UserArticlesTypes,
  UserArticles_user,
} from '~/components/GQL/queries/__generated__/UserArticles'

const ArticleSummaryInfo = ({ user }: { user: UserArticles_user }) => {
  const { articleCount: articles, totalWordCount: words } = user.status || {
    articleCount: 0,
    totalWordCount: 0,
  }

  return (
    <div className="info">
      <Translate zh_hant="創作了" zh_hans="创作了" />
      <span className="num">&nbsp;{articles}&nbsp;</span>
      <Translate zh_hant="篇作品" zh_hans="篇作品" />

      <Icon.DotDivider />

      <Translate zh_hant="累積創作" zh_hans="累积创作" />
      <span className="num">&nbsp;{words}&nbsp;</span>
      <Translate zh_hant="字" zh_hans="字" />

      <style jsx>{styles}</style>
    </div>
  )
}

const UserArticles = () => {
  const viewer = useContext(ViewerContext)
  const router = useRouter()
  const userName = getQuery({ router, key: 'userName' })

  const { data, loading, error, fetchMore } = useQuery<UserArticlesTypes>(
    USER_ARTICLES,
    { variables: { userName } }
  )
  const user = data?.user

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!user || user?.status?.state === 'archived') {
    return null
  }

  const connectionPath = 'user.articles'
  const { edges, pageInfo } = user.articles

  const CustomHead = () => (
    <Head
      title={{
        zh_hant: `${user.displayName}的創作空間站`,
        zh_hans: `${user.displayName}的创作空间站`,
      }}
      description={user.info.description || ''}
      image={user.info.profileCover || IMAGE_LOGO_192}
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

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.USER_ARTICLE,
      location: edges.length,
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  return (
    <>
      <CustomHead />

      <UserTabs />

      <ArticleSummaryInfo user={user} />

      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List>
          {edges.map(({ node, cursor }, i) => {
            if (
              node.articleState !== 'active' &&
              viewer.id !== node.author.id &&
              viewer.isAdmin
            ) {
              return null
            }

            return (
              <List.Item key={cursor}>
                <ArticleDigestFeed
                  article={node}
                  inUserArticles
                  onClick={() =>
                    analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                      type: FEED_TYPE.USER_ARTICLE,
                      location: i,
                    })
                  }
                />
              </List.Item>
            )
          })}
        </List>
      </InfiniteScroll>
    </>
  )
}

export default UserArticles
