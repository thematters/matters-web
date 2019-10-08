import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useQuery } from 'react-apollo'

import { Footer, Head, InfiniteScroll, Spinner } from '~/components'
import EmptyAppreciation from '~/components/Empty/EmptyAppreciation'
import Throw404 from '~/components/Throw404'
import { Transaction } from '~/components/TransactionDigest'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import AppreciationTabs from '../AppreciationTabs'
import { MeAppreciationsReceived } from './__generated__/MeAppreciationsReceived'
import styles from './styles.css'

const ME_APPRECIATED_RECEIVED = gql`
  query MeAppreciationsReceived($after: String) {
    viewer {
      id
      activity {
        ...AppreciationTabsUserActivity
        appreciationsReceived(input: { first: 20, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...AppreciationReceivedTransaction
            }
          }
        }
      }
    }
  }
  ${Transaction.AppreciationReceived.fragments.transaction}
  ${AppreciationTabs.fragments.userActivity}
`

const AppreciationsReceived = () => {
  const { data, loading, fetchMore } = useQuery<MeAppreciationsReceived>(
    ME_APPRECIATED_RECEIVED
  )

  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
        <Head
          title={{
            zh_hant: TEXT.zh_hant.appreciationsReceived,
            zh_hans: TEXT.zh_hans.appreciationsReceived
          }}
        />

        {() => {
          if (loading) {
            return <Spinner />
          }

          if (!data || !data.viewer) {
            return <Throw404 />
          }

          const connectionPath = 'viewer.activity.appreciationsReceived'
          const { edges, pageInfo } = _get(data, connectionPath, {})
          const loadMore = () => {
            analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
              type: 'appreciationsReceived',
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

          if (!edges || edges.length <= 0) {
            return (
              <>
                <AppreciationTabs activity={data.viewer.activity} />
                <EmptyAppreciation />
              </>
            )
          }

          return (
            <>
              <AppreciationTabs activity={data.viewer.activity} />
              <InfiniteScroll
                hasNextPage={pageInfo.hasNextPage}
                loadMore={loadMore}
              >
                <ul>
                  {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                    <li key={cursor}>
                      <Transaction.AppreciationReceived tx={node} />
                    </li>
                  ))}
                </ul>
              </InfiniteScroll>
            </>
          )
        }}
      </article>

      <section className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
        <Footer />
      </section>

      <style jsx>{styles}</style>
    </main>
  )
}

export default AppreciationsReceived
