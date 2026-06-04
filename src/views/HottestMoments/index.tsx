import { useContext, useEffect, useRef } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { mergeConnections } from '~/common/utils'
import {
  Announcements,
  ArticleFeedPlaceholder,
  EmptyWork,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  Spacer,
  useFetchPolicy,
  usePublicQuery,
  ViewerContext,
} from '~/components'
import { MomentDigestFeed } from '~/components/MomentDigest/Feed'
import type { HottestMomentsPublicQuery } from '~/gql/graphql'

import Sidebar from '../Home/Sidebar'
import Apply from './Apply'
import { HOTTEST_MOMENTS_PRIVATE, HOTTEST_MOMENTS_PUBLIC } from './gql'
import styles from './styles.module.css'

const HottestMoments = () => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { fetchPolicy } = useFetchPolicy()

  const { data, loading, error, fetchMore, client } =
    usePublicQuery<HottestMomentsPublicQuery>(HOTTEST_MOMENTS_PUBLIC, {
      fetchPolicy,
    })

  const connectionPath = 'viewer.recommendation.hottestMoments'
  const result = data?.viewer?.recommendation?.hottestMoments
  const { edges, pageInfo } = result || {}
  const fetchedPrivateRef = useRef(false)

  const loadPrivate = (publicData?: HottestMomentsPublicQuery) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const publicEdges =
      publicData.viewer?.recommendation?.hottestMoments?.edges || []
    const publicIds = publicEdges.map(({ node }) => node.id)

    if (publicIds.length === 0) {
      return
    }

    client.query({
      query: HOTTEST_MOMENTS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  useEffect(() => {
    if (loading || !edges || fetchedPrivateRef.current || !viewer.isAuthed) {
      return
    }

    loadPrivate(data)
    fetchedPrivateRef.current = true
  }, [!!edges, loading, viewer.id])

  const loadMore = async () => {
    if (loading) {
      return
    }

    const { data: newData } = await fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
          dedupe: true,
        }),
    })

    loadPrivate(newData)
  }

  const renderContent = () => {
    if (loading) {
      return <ArticleFeedPlaceholder />
    }

    if (error) {
      return <QueryError error={error} />
    }

    if (!edges || edges.length <= 0 || !pageInfo) {
      return (
        <EmptyWork
          description={
            <FormattedMessage defaultMessage="No moments yet" id="6wdAti" />
          }
        />
      )
    }

    return (
      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        loader={<ArticleFeedPlaceholder count={3} />}
        eof
      >
        <List>
          {edges.map(({ node, cursor }) => (
            <List.Item key={cursor}>
              <MomentDigestFeed moment={node} hasAuthor hasCommentedFollowees />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    )
  }

  return (
    <Layout.Main
      aside={
        <>
          <Spacer size="sp44" />
          <Announcements />
          <Sidebar.Authors />
          <Sidebar.Tags />
          <Sidebar.Billboard />
          <Spacer size="sp32" />
        </>
      }
    >
      <Head
        title={intl.formatMessage({
          defaultMessage: 'Moments',
          id: 'QHRze5',
        })}
      />

      <section className={styles.headers}>
        <section className={styles.title}>
          <FormattedMessage defaultMessage="Moments" id="QHRze5" />
        </section>
        <section className={styles.apply}>
          <Apply.Button />
        </section>
      </section>

      {renderContent()}
    </Layout.Main>
  )
}

export default HottestMoments
