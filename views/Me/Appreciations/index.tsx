import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useContext } from 'react'
import { QueryResult } from 'react-apollo'

import {
  Footer,
  Head,
  Icon,
  InfiniteScroll,
  PageHeader,
  Spinner,
  TextIcon,
  Translate
} from '~/components'
import EmptyMAT from '~/components/Empty/EmptyMAT'
import { Query } from '~/components/GQL'
import { Protected } from '~/components/Protected'
import { Transaction } from '~/components/TransactionDigest'
import { ViewerContext } from '~/components/Viewer'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics, mergeConnections, numFormat } from '~/common/utils'
import ICON_MAT_GOLD from '~/static/icons/mat-gold.svg?sprite'

import Intro from './Intro'
import styles from './styles.css'

const ME_APPRECIATIONS = gql`
  query MeAppreciations($after: String) {
    viewer {
      id
      status {
        MAT {
          total
          history(input: { first: 20, after: $after }) {
            pageInfo {
              startCursor
              endCursor
              hasNextPage
            }
            edges {
              cursor
              node {
                ...FeedDigestTransaction
              }
            }
          }
        }
      }
    }
  }
  ${Transaction.Feed.fragments.transaction}
`

const Appreciations = () => {
  const viewer = useContext(ViewerContext)
  const MAT = _get(viewer, 'status.MAT.total', 0)

  return (
    <Protected>
      <main className="l-row">
        <article className="l-col-4 l-col-md-5 l-col-lg-8">
          <Head
            title={{
              zh_hant: TEXT.zh_hant.myAppreciations,
              zh_hans: TEXT.zh_hans.myAppreciations
            }}
          />

          <PageHeader
            pageTitle={
              <Translate
                zh_hant={TEXT.zh_hant.myAppreciations}
                zh_hans={TEXT.zh_hans.myAppreciations}
              />
            }
          >
            <TextIcon
              icon={
                <Icon
                  id={ICON_MAT_GOLD.id}
                  viewBox={ICON_MAT_GOLD.viewBox}
                  size="small"
                />
              }
              text={`${numFormat(MAT)} MAT`}
              weight="semibold"
              size="lg"
            />
          </PageHeader>

          <section>
            <Query query={ME_APPRECIATIONS}>
              {({ data, loading, error, fetchMore }: QueryResult) => {
                if (loading) {
                  return <Spinner />
                }

                const connectionPath = 'viewer.status.MAT.history'
                const { edges, pageInfo } = _get(data, connectionPath, {})
                const loadMore = () => {
                  analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
                    type: 'appreciations',
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
                  return <EmptyMAT />
                }

                return (
                  <InfiniteScroll
                    hasNextPage={pageInfo.hasNextPage}
                    loadMore={loadMore}
                  >
                    <ul>
                      {edges.map(
                        ({ node, cursor }: { node: any; cursor: any }) => (
                          <li key={cursor}>
                            <Transaction.Feed tx={node} />
                          </li>
                        )
                      )}
                    </ul>
                  </InfiniteScroll>
                )
              }}
            </Query>
          </section>
        </article>

        <aside className="l-col-4 l-col-md-3 l-col-lg-4">
          <Intro />
          <Footer />
        </aside>

        <style jsx>{styles}</style>
      </main>
    </Protected>
  )
}

export default Appreciations
