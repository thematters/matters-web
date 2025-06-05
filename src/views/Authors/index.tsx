import { useContext, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import {
  EmptyWarning,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  SpinnerBlock,
  Translate,
  usePublicQuery,
  UserDigest,
  ViewerContext,
} from '~/components'
import { AllAuthorsPublicQuery } from '~/gql/graphql'

import { ALL_AUTHORS_PRIVATE, ALL_AUTHORS_PUBLIC } from './gql'

const BaseAuthors = () => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  // public data
  const { data, loading, error, fetchMore, client } =
    usePublicQuery<AllAuthorsPublicQuery>(ALL_AUTHORS_PUBLIC)

  // pagination
  const connectionPath = 'viewer.recommendation.authors'
  const { edges, pageInfo } = data?.viewer?.recommendation.authors || {}

  // private data
  const loadPrivate = (publicData?: AllAuthorsPublicQuery) => {
    if (!viewer.isAuthed || !publicData) {
      return
    }

    const publiceEdges = publicData?.viewer?.recommendation.authors.edges || []
    const publicIds = publiceEdges.map(({ node }) => node.id)

    client.query({
      query: ALL_AUTHORS_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    loadPrivate(data)
  }, [!!edges, viewer.id])

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'all_authors',
      location: edges?.length || 0,
    })

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

  /**
   * Render
   */
  if (loading) {
    return <SpinnerBlock />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptyWarning
        description={
          <Translate
            zh_hant="還沒有作者"
            zh_hans="还没有作者"
            en="no authors yet"
          />
        }
      />
    )
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore} eof>
      <List hasBorder={false}>
        {edges.map(({ node }, i) => (
          <List.Item key={node.id}>
            <UserDigest.Rich
              user={node}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'all_authors',
                  contentType: 'user',
                  location: i,
                  id: node.id,
                })
              }
              spacing={[12, 0]}
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const Authors = () => {
  const intl = useIntl()

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="All Authors" id="ivXY6L" />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'All Authors',
          id: 'ivXY6L',
        })}
      />

      <Layout.Main.Spacing hasVertical={false}>
        <BaseAuthors />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default Authors
