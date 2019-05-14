import gql from 'graphql-tag'
import _get from 'lodash/get'
import { QueryResult } from 'react-apollo'

import {
  Footer,
  Head,
  InfiniteScroll,
  PageHeader,
  Spinner,
  Tag,
  Translate
} from '~/components'
import { Query } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import { AllTags } from './__generated__/AllTags'
import styles from './styles.css'

const ALL_TAGSS = gql`
  query AllTags($cursor: String) {
    viewer {
      id
      recommendation {
        tags(input: { first: 20, after: $cursor }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...DigestTag
            }
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`

const Tags = () => (
  <main className="l-row">
    <article className="l-col-4 l-col-md-5 l-col-lg-8">
      <Head
        title={{ zh_hant: TEXT.zh_hant.allTags, zh_hans: TEXT.zh_hans.allTags }}
      />

      <PageHeader
        pageTitle={
          <Translate
            zh_hant={TEXT.zh_hant.allTags}
            zh_hans={TEXT.zh_hans.allTags}
          />
        }
      />

      <section>
        <Query query={ALL_TAGSS}>
          {({
            data,
            loading,
            error,
            fetchMore
          }: QueryResult & { data: AllTags }) => {
            if (loading) {
              return <Spinner />
            }

            const connectionPath = 'viewer.recommendation.tags'
            const { edges, pageInfo } = _get(data, connectionPath, {})
            const loadMore = () => {
              analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
                type: FEED_TYPE.TAGS,
                location: edges.length
              })
              return fetchMore({
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
            }
            const leftEdges = edges.filter((_: any, i: number) => i % 2 === 0)
            const rightEdges = edges.filter((_: any, i: number) => i % 2 === 1)

            return (
              <InfiniteScroll
                hasNextPage={pageInfo.hasNextPage}
                loadMore={loadMore}
              >
                <div className="l-row">
                  <ul className="l-col-2 l-col-sm-4 l-col-lg-6">
                    {leftEdges.map(
                      (
                        { node, cursor }: { node: any; cursor: any },
                        i: number
                      ) => (
                        <li
                          key={cursor}
                          onClick={() =>
                            analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                              type: FEED_TYPE.ALL_TAGS,
                              location: i * 2
                            })
                          }
                        >
                          <Tag tag={node} type="count-fixed" />
                        </li>
                      )
                    )}
                  </ul>
                  <ul className="l-col-2 l-col-sm-4 l-col-lg-6">
                    {rightEdges.map(
                      (
                        { node, cursor }: { node: any; cursor: any },
                        i: number
                      ) => (
                        <li
                          key={cursor}
                          onClick={() =>
                            analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                              type: FEED_TYPE.ALL_TAGS,
                              location: i * 2 + 1
                            })
                          }
                        >
                          <Tag tag={node} type="count-fixed" />
                        </li>
                      )
                    )}
                  </ul>
                </div>
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

export default Tags
