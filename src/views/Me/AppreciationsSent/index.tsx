import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Footer, Head, InfiniteScroll, List, Spinner } from '~/components'
import EmptyAppreciation from '~/components/Empty/EmptyAppreciation'
import { Transaction } from '~/components/TransactionDigest'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
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
              ...AppreciationSentTransaction
            }
          }
        }
      }
    }
  }
  ${Transaction.AppreciationSent.fragments.transaction}
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
      location: edges.length
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath
        })
    })
  }

  return (
    <>
      <AppreciationTabs activity={data.viewer.activity} />
      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List hasBorder>
          {edges.map(({ node, cursor }) => (
            <List.Item key={cursor}>
              <Transaction.AppreciationSent tx={node} />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

export default () => (
  <main className="l-row">
    <article className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
      <Head
        title={{
          zh_hant: TEXT.zh_hant.appreciationsSent,
          zh_hans: TEXT.zh_hans.appreciationsSent
        }}
      />

      <AppreciationsSent />
    </article>

    <section className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
      <Footer />
    </section>
  </main>
)
