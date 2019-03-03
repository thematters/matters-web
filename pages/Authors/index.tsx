import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import { Error } from '~/components/Error'
import { Footer } from '~/components/Footer'
import { Head } from '~/components/Head'
import { InfiniteScroll } from '~/components/Interaction'
import { Translate } from '~/components/Language'
import { PageHeader } from '~/components/PageHeader'
import { Spinner } from '~/components/Spinner'
import { UserDigest } from '~/components/UserDigest'

import { mergeConnections } from '~/common/utils'

import { AllAuthors } from './__generated__/AllAuthors'
import styles from './styles.css'

const ALL_AUTHORS = gql`
  query AllAuthors($cursor: String) {
    viewer {
      id
      recommendation {
        authors(input: { first: 10, after: $cursor }) {
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
      <Head title={{ zh_hant: '全部作者', zh_hans: '全部作者' }} />

      <PageHeader
        pageTitle={<Translate zh_hant="全部作者" zh_hans="全部作者" />}
      />

      <section>
        <Query query={ALL_AUTHORS}>
          {({
            data,
            loading,
            error,
            fetchMore
          }: QueryResult & { data: AllAuthors }) => {
            if (loading) {
              return <Spinner />
            }

            if (error) {
              return <Error error={error} />
            }

            const connectionPath = 'viewer.recommendation.authors'
            const { edges, pageInfo } = _get(data, connectionPath, {})
            const loadMore = () =>
              fetchMore({
                variables: {
                  cursor: pageInfo.endCursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) =>
                  mergeConnections({
                    oldData: previousResult,
                    newData: fetchMoreResult,
                    path: connectionPath
                  })
              })

            return (
              <InfiniteScroll
                hasNextPage={pageInfo.hasNextPage}
                loadMore={loadMore}
              >
                <ul>
                  {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                    <li key={cursor}>
                      <UserDigest.FullDesc user={node} />
                    </li>
                  ))}
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
