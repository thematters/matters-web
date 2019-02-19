import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import {
  InfiniteScroll,
  PageHeader,
  Spinner,
  Tag,
  Translate
} from '~/components'
import ViewAll from '../ViewAll'

import { mergeConnections } from '~/common/utils'
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
            ...Tag
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`

const SearchTag = ({ q, aggregate }: { q: string; aggregate: boolean }) => {
  return (
    <>
      <PageHeader
        is="h2"
        pageTitle={
          <Translate translations={{ zh_hant: '標籤', zh_hans: '标签' }} />
        }
      >
        {aggregate && <ViewAll q={q} type="tag" />}
      </PageHeader>

      <section>
        <Query
          query={SEARCH_TAGS}
          variables={{ key: q, first: aggregate ? 3 : 20 }}
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
              return <span>{JSON.stringify(error)}</span> // TODO
            }

            if (aggregate) {
              return (
                <ul>
                  {data.search.edges.map(
                    ({ node, cursor }: { node: any; cursor: any }) => (
                      <li key={cursor}>
                        <Tag tag={node} />
                      </li>
                    )
                  )}
                </ul>
              )
            }

            const connectionPath = 'search'
            const { edges, pageInfo } = _get(data, connectionPath)
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
            const leftEdges = edges.filter((_: any, i: number) => i % 2 === 0)
            const rightEdges = edges.filter((_: any, i: number) => i % 2 === 1)

            return (
              <InfiniteScroll
                hasNextPage={!aggregate && pageInfo.hasNextPage}
                loadMore={loadMore}
                loading={loading}
                loader={<Spinner />}
              >
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
                      ({ node, cursor }: { node: any; cursor: any }) => (
                        <li key={cursor}>
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
        <style jsx>{styles}</style>
      </section>
    </>
  )
}

export default SearchTag
