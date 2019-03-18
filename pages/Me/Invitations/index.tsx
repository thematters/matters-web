import gql from 'graphql-tag'
import _get from 'lodash/get'
import { QueryResult } from 'react-apollo'

import {
  Footer,
  Head,
  InfiniteScroll,
  PageHeader,
  Spinner,
  Translate
} from '~/components'
import { Query } from '~/components/GQL'
import { Protected } from '~/components/Protected'

import { mergeConnections } from '~/common/utils'

import { MeInvitations } from './__generated__/MeInvitations'
import Invitation from './Invitation'
import Invite from './Invite'
import styles from './styles.css'

const ME_INVITATIONS = gql`
  query MeInvitations($cursor: String) {
    viewer {
      id
      status {
        invitation {
          ...InvitationStatus
          sent(input: { first: 20, after: $cursor }) {
            pageInfo {
              startCursor
              endCursor
              hasNextPage
            }
            edges {
              cursor
              node {
                ...Invitation
              }
            }
          }
        }
      }
    }
  }
  ${Invite.fragments.invitation}
  ${Invitation.fragments.invitation}
`

const Wallet = () => {
  return (
    <Protected>
      <main className="l-row">
        <article className="l-col-4 l-col-md-5 l-col-lg-8">
          <Head title={{ zh_hant: '邀請好友', zh_hans: '邀请好友' }} />

          <PageHeader
            pageTitle={<Translate zh_hant="邀請好友" zh_hans="邀请好友" />}
          />

          <Query query={ME_INVITATIONS}>
            {({
              data,
              loading,
              error,
              fetchMore
            }: QueryResult & { data: MeInvitations }) => {
              if (loading) {
                return <Spinner />
              }

              const connectionPath = 'viewer.status.invitation.sent'
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

              // if (!edges || edges.length <= 0) {
              //   return <EmptyMAT />
              // }

              return (
                <>
                  <Invite invitation={data.viewer.status.invitation} />

                  <InfiniteScroll
                    hasNextPage={pageInfo.hasNextPage}
                    loadMore={loadMore}
                  >
                    <ul>
                      {edges.map(
                        ({ node, cursor }: { node: any; cursor: any }) => (
                          <li key={cursor}>
                            {/* <Invitation invitation={node} /> */}
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

        <aside className="l-col-4 l-col-md-3 l-col-lg-4">
          <Footer />
        </aside>

        <style jsx>{styles}</style>
      </main>
    </Protected>
  )
}

export default Wallet
