import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { analytics, mergeConnections } from '~/common/utils'
import {
  Appreciation,
  EmptyAppreciation,
  Head,
  InfiniteScroll,
  Layout,
  List,
  Spinner,
} from '~/components'
import { MeAppreciationsSentQuery } from '~/gql/graphql'

import AppreciationTabs from '../AppreciationTabs'

const ME_APPRECIATIONS_SENT = gql`
  query MeAppreciationsSent($after: String) {
    viewer {
      id
      activity {
        ...AppreciationTabsUserActivity
        appreciationsSent(input: { first: 20, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...DigestAppreciation
            }
          }
        }
      }
    }
  }
  ${Appreciation.fragments.appreciation}
  ${AppreciationTabs.fragments.userActivity}
`

const BaseAppreciationsSent = () => {
  const { data, loading, fetchMore, refetch } =
    useQuery<MeAppreciationsSentQuery>(ME_APPRECIATIONS_SENT)

  if (loading) {
    return <Spinner />
  }

  if (!data?.viewer) {
    return null
  }

  const connectionPath = 'viewer.activity.appreciationsSent'
  const { edges, pageInfo } = data.viewer.activity.appreciationsSent

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        <AppreciationTabs activity={data.viewer.activity} />
        <EmptyAppreciation />
      </>
    )
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'appreciations_sent',
      location: edges.length,
    })
    return fetchMore({
      variables: { after: pageInfo.endCursor },
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
      <AppreciationTabs activity={data.viewer.activity} />

      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        pullToRefresh={refetch}
      >
        <List>
          {edges.map(({ node, cursor }) => (
            <List.Item key={cursor}>
              <Appreciation appreciation={node} type="sent" />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

const AppreciationsSent = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="appreciationsSent" />}
    />

    <Head title={{ id: 'appreciationsSent' }} />

    <BaseAppreciationsSent />
  </Layout.Main>
)

export default AppreciationsSent
