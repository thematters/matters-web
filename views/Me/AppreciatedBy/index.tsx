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

const ME_APPRECIATED_BY = gql`
  query MeAppreciatedBy($after: String) {
    viewer {
      id
      activity {
        totalAppreciatedBy
        appreciatedBy(input: { first: 20, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...AppreciatedByTransaction
            }
          }
        }
      }
    }
  }
  ${Transaction.AppreciatedBy.fragments.transaction}
`

const AppreciatedBy = () => {
  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
        <Head
          title={{
            zh_hant: TEXT.zh_hant.myAppreciatedBy,
            zh_hans: TEXT.zh_hans.myAppreciatedBy
          }}
        />

        <AppreciationTabs />

        <Query query={ME_APPRECIATED_BY}>
          {({ data, loading, error, fetchMore }: QueryResult) => {
            if (loading) {
              return <Spinner />
            }

            const connectionPath = 'viewer.activity.appreciatedBy'
            const { edges, pageInfo } = _get(data, connectionPath, {})
            const loadMore = () => {
              analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
                type: 'appreciatedBy',
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
              return <EmptyAppreciation />
            }

            return (
              <InfiniteScroll
                hasNextPage={pageInfo.hasNextPage}
                loadMore={loadMore}
              >
                <ul>
                  {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                    <li key={cursor}>
                      <Transaction.AppreciatedBy tx={node} />
                    </li>
                  ))}
                </ul>
              </InfiniteScroll>
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

export default AppreciatedBy
