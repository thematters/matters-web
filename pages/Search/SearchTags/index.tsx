import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import {
  Error,
  InfiniteScroll,
  PageHeader,
  Spinner,
  Tag,
  Translate
} from '~/components'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import EmptySearch from '../EmptySearch'
import ViewAll from '../ViewAll'
import { SeachTags } from './__generated__/SeachTags'
import styles from './styles.css'

const SEARCH_TAGS = gql`
  query SeachTags($first: Int!, $key: String!, $cursor: String) {
    search(input: { key: $key, type: Tag, first: $first, after: $cursor }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Tag {
            ...DigestTag
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`

const Header = ({ viewAll, q }: { viewAll?: boolean; q?: string }) => (
  <PageHeader is="h2" pageTitle={<Translate zh_hant="標籤" zh_hans="标签" />}>
    {viewAll && q && <ViewAll q={q} type="tag" />}
  </PageHeader>
)

const EmptySearchResult = () => {
  return (
    <section>
      <Header />

      <EmptySearch
        description={
          <Translate
            zh_hant="沒有找到你搜尋的內容。"
            zh_hans="没有找到你搜索的内容。"
          />
        }
      />
    </section>
  )
}

const SearchTag = ({ q, isAggregate }: { q: string; isAggregate: boolean }) => {
  return (
    <>
      <Query
        query={SEARCH_TAGS}
        variables={{ key: q, first: isAggregate ? 3 : 20 }}
      >
        {({
          data,
          loading,
          error,
          fetchMore
        }: QueryResult & { data: SeachTags }) => {
          if (loading) {
            return <Spinner />
          }

          if (error) {
            return <Error error={error} />
          }

          const connectionPath = 'search'
          const { edges, pageInfo } = _get(data, connectionPath, {})
          const loadMore = () => {
            analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
              type: FEED_TYPE.SEARCH_TAG,
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

          if (data.search.edges.length <= 0) {
            return isAggregate ? null : <EmptySearchResult />
          }

          if (isAggregate) {
            return (
              <section>
                <Header q={q} viewAll={isAggregate && pageInfo.hasNextPage} />
                <ul>
                  {data.search.edges.map(
                    (
                      { node, cursor }: { node: any; cursor: any },
                      i: number
                    ) => (
                      <li
                        key={cursor}
                        onClick={() =>
                          analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                            type: FEED_TYPE.SEARCH_TAG,
                            location: i,
                            entrance: q
                          })
                        }
                      >
                        <Tag tag={node} type="count-fixed" />
                      </li>
                    )
                  )}
                </ul>
              </section>
            )
          }

          return (
            <section>
              <InfiniteScroll
                hasNextPage={!isAggregate && pageInfo.hasNextPage}
                loadMore={loadMore}
              >
                <Header q={q} viewAll={isAggregate && pageInfo.hasNextPage} />
                <div className="l-row">
                  <ul className="l-col-2 l-col-sm-4 l-col-lg-6">
                    {leftEdges.map(
                      ({ node, cursor }: { node: any; cursor: any }) => (
                        <li key={cursor}>
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
                              type: FEED_TYPE.SEARCH_TAG,
                              location: i,
                              entrance: q
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
            </section>
          )
        }}
      </Query>
      <style jsx>{styles}</style>
    </>
  )
}

export default SearchTag
