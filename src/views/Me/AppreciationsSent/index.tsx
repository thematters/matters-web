import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  Appreciation,
  EmptyAppreciation,
  Head,
  InfiniteScroll,
  Layout,
  List,
  Spinner,
} from '~/components'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import AppreciationTabs from '../AppreciationTabs'

import { MeAppreciationsSent } from './__generated__/MeAppreciationsSent'

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
              ...AppreciationSentAppreciation
            }
          }
        }
      }
    }
  }
  ${Appreciation.AppreciationSent.fragments.appreciation}
  ${AppreciationTabs.fragments.userActivity}
`

const AppreciationsSent = () => {
  const { data, loading, fetchMore } = useQuery<MeAppreciationsSent>(
    ME_APPRECIATIONS_SENT
  )

  if (loading) {
    return <Spinner />
  }

  if (!data || !data.viewer) {
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
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: 'appreciationsSent',
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
      <AppreciationTabs activity={data.viewer.activity} />

      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List>
          {edges.map(({ node, cursor }) => (
            <List.Item key={cursor}>
              <Appreciation.AppreciationSent tx={node} />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

export default () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="appreciationsSent" />}
    />

    <Head title={{ id: 'appreciationsSent' }} />

    <AppreciationsSent />
  </Layout.Main>
)
