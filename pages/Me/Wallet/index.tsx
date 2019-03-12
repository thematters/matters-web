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

import { mergeConnections, numFormat } from '~/common/utils'
import ICON_MAT_GOLD from '~/static/icons/mat-gold.svg?sprite'

import { MeWallet } from './__generated__/MeWallet'
import Intro from './Intro'
import styles from './styles.css'

const ME_WALLET = gql`
  query MeWallet($cursor: String) {
    viewer {
      id
      status {
        MAT {
          total
          history(input: { first: 20, after: $cursor }) {
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

const Wallet = () => {
  const viewer = useContext(ViewerContext)
  const MAT = _get(viewer, 'status.MAT.total', 0)

  return (
    <Protected>
      <main className="l-row">
        <article className="l-col-4 l-col-md-5 l-col-lg-8">
          <Head title={{ zh_hant: '我的錢包', zh_hans: '我的钱包' }} />

          <PageHeader
            pageTitle={<Translate zh_hant="我的錢包" zh_hans="我的钱包" />}
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
            <Query query={ME_WALLET}>
              {({
                data,
                loading,
                error,
                fetchMore
              }: QueryResult & { data: MeWallet }) => {
                if (loading) {
                  return <Spinner />
                }

                const connectionPath = 'viewer.status.MAT.history'
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

export default Wallet
