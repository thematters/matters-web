import gql from 'graphql-tag'
import _get from 'lodash/get'
import { QueryResult } from 'react-apollo'

import { Footer, Head, InfiniteScroll, Spinner } from '~/components'
import EmptyAppreciation from '~/components/Empty/EmptyAppreciation'
import { Query } from '~/components/GQL'
import { Transaction } from '~/components/TransactionDigest'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import AppreciationTabs from '../AppreciationTabs'
import styles from './styles.css'

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
  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
        <Head
          title={{
            zh_hant: TEXT.zh_hant.appreciationsSent,
            zh_hans: TEXT.zh_hans.appreciationsSent
          }}
        />

        <Query query={ME_APPRECIATIONS_SENT}>
          {({ data, loading, error, fetchMore }: QueryResult) => {
            if (loading) {
              return <Spinner />
            }

            const connectionPath = 'viewer.activity.appreciationsSent'
            const { edges, pageInfo } = _get(data, connectionPath, {})
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
                    {edges.map(
                      ({ node, cursor }: { node: any; cursor: any }) => (
                        <li key={cursor}>
                          <Transaction.AppreciationSent tx={node} />
                        </li>
                      )
                    )}
                  </ul>
                </InfiniteScroll>
              </>
            )
          }}
        </Query>
      </article>

      <section className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
        <Footer />
      </section>

      <style jsx>{styles}</style>
    </main>
  )
}

export default AppreciationsSent
