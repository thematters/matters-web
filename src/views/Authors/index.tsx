import gql from 'graphql-tag'
import _get from 'lodash/get'
import { QueryResult } from 'react-apollo'

import {
  Footer,
  Head,
  InfiniteScroll,
  PageHeader,
  Spinner,
  Translate,
  UserDigest
} from '~/components'
import { Query } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import { AllAuthors } from './__generated__/AllAuthors'
import styles from './styles.css'

const ALL_AUTHORSS = gql`
  query AllAuthors($after: String) {
    viewer {
      id
      recommendation {
        authors(input: { first: 10, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...UserDigestFullDescUser
            }
          }
        }
      }
    }
  }
  ${UserDigest.FullDesc.fragments.user}
`

const Authors = () => (
  <main className="l-row">
    <article className="l-col-4 l-col-md-5 l-col-lg-8">
      <Head
        title={{
          zh_hant: TEXT.zh_hant.allAuthors,
          zh_hans: TEXT.zh_hans.allAuthors
        }}
      />

      <PageHeader
        pageTitle={
          <Translate
            zh_hant={TEXT.zh_hant.allAuthors}
            zh_hans={TEXT.zh_hans.allAuthors}
          />
        }
      />

      <section>
        <Query query={ALL_AUTHORSS}>
          {({
            data,
            loading,
            error,
            fetchMore
          }: QueryResult & { data: AllAuthors }) => {
            if (loading) {
              return <Spinner />
            }

            const connectionPath = 'viewer.recommendation.authors'
            const { edges, pageInfo } = _get(data, connectionPath, {})
            const loadMore = () => {
              analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
                type: FEED_TYPE.ALL_AUTHORS,
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
              <InfiniteScroll
                hasNextPage={pageInfo.hasNextPage}
                loadMore={loadMore}
              >
                <ul>
                  {edges.map(
                    (
                      { node, cursor }: { node: any; cursor: any },
                      i: number
                    ) => (
                      <li
                        key={cursor}
                        onClick={() =>
                          analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                            type: FEED_TYPE.ALL_AUTHORS,
                            location: i
                          })
                        }
                      >
                        <UserDigest.FullDesc user={node} />
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
      <Footer />
    </aside>

    <style jsx>{styles}</style>
  </main>
)

export default Authors
