import _get from 'lodash/get'
import { useEffect } from 'react'
import { QueryResult } from 'react-apollo'

import {
  Footer,
  Head,
  InfiniteScroll,
  PageHeader,
  Spinner,
  Translate
} from '~/components'
import EmptyNotice from '~/components/Empty/EmptyNotice'
import { Mutation, Query } from '~/components/GQL'
import MARK_ALL_NOTICES_AS_READ from '~/components/GQL/mutations/markAllNoticesAsRead'
import {
  ME_NOTIFICATIONS,
  UNREAD_NOTICE_COUNT
} from '~/components/GQL/queries/notice'
import NoticeDigest from '~/components/NoticeDigest'
import { Protected } from '~/components/Protected'

import { mergeConnections } from '~/common/utils'

import styles from './styles.css'

const Notifications = () => (
  <Protected>
    <main className="l-row">
      <article className="l-col-4 l-col-md-5 l-col-lg-8">
        <Head title={{ zh_hant: '全部通知', zh_hans: '全部通知' }} />

        <PageHeader
          pageTitle={<Translate zh_hant="全部通知" zh_hans="全部通知" />}
        />

        <section>
          <Query query={ME_NOTIFICATIONS} variables={{ first: 20 }}>
            {({ data, loading, error, fetchMore }: QueryResult) => {
              if (loading) {
                return <Spinner />
              }

              const connectionPath = 'viewer.notices'
              const { edges, pageInfo } = _get(data, connectionPath, {})
              const loadMore = () =>
                fetchMore({
                  variables: {
                    first: 20,
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
                return <EmptyNotice />
              }

              return (
                <Mutation
                  mutation={MARK_ALL_NOTICES_AS_READ}
                  refetchQueries={[
                    {
                      query: UNREAD_NOTICE_COUNT
                    }
                  ]}
                >
                  {markAllNoticesAsRead => {
                    useEffect(() => {
                      markAllNoticesAsRead()
                    }, [])

                    return (
                      <InfiniteScroll
                        hasNextPage={pageInfo.hasNextPage}
                        loadMore={loadMore}
                      >
                        <ul>
                          {edges.map(
                            ({ node, cursor }: { node: any; cursor: any }) => (
                              <li key={cursor}>
                                <NoticeDigest notice={node} key={cursor} />
                              </li>
                            )
                          )}
                        </ul>
                      </InfiniteScroll>
                    )
                  }}
                </Mutation>
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
  </Protected>
)

export default Notifications
