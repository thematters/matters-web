import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  InfiniteScroll,
  PageHeader,
  Spinner,
  Tag,
  Translate
} from '~/components'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import EmptySearch from '../EmptySearch'
import ViewAll from '../ViewAll'
import {
  SeachTags,
  SeachTags_search_edges_node_Tag
} from './__generated__/SeachTags'
import styles from './styles.css'

const SEARCH_TAGS = gql`
  query SeachTags($first: Int!, $key: String!, $after: String) {
    search(input: { key: $key, type: Tag, first: $first, after: $after }) {
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
  <PageHeader
    is="h2"
    pageTitle={
      <Translate zh_hant={TEXT.zh_hant.tag} zh_hans={TEXT.zh_hans.tag} />
    }
  >
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
            zh_hant={TEXT.zh_hant.emptySearchResults}
            zh_hans={TEXT.zh_hans.emptySearchResults}
          />
        }
      />
    </section>
  )
}

const SearchTag = ({ q, isAggregate }: { q: string; isAggregate: boolean }) => {
  const { data, loading, fetchMore } = useQuery<SeachTags>(SEARCH_TAGS, {
    variables: { key: q, first: isAggregate ? 3 : 20 }
  })

  if (loading) {
    return <Spinner />
  }

  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.SEARCH_TAG,
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
  const leftEdges = edges.filter((_, i) => i % 2 === 0)
  const rightEdges = edges.filter((_, i) => i % 2 === 1)

  if (edges.length <= 0) {
    return isAggregate ? null : <EmptySearchResult />
  }

  if (isAggregate) {
    return (
      <section>
        <Header q={q} viewAll={isAggregate && pageInfo.hasNextPage} />

        <ul>
          {edges.map(({ node, cursor }, i) => (
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
              <Tag
                tag={node as SeachTags_search_edges_node_Tag}
                type="count-fixed"
              />
            </li>
          ))}
        </ul>

        <style jsx>{styles}</style>
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
            {leftEdges.map(({ node, cursor }) => (
              <li key={cursor}>
                <Tag
                  tag={node as SeachTags_search_edges_node_Tag}
                  type="count-fixed"
                />
              </li>
            ))}
          </ul>
          <ul className="l-col-2 l-col-sm-4 l-col-lg-6">
            {rightEdges.map(({ node, cursor }, i) => (
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
                <Tag
                  tag={node as SeachTags_search_edges_node_Tag}
                  type="count-fixed"
                />
              </li>
            ))}
          </ul>
        </div>
      </InfiniteScroll>

      <style jsx>{styles}</style>
    </section>
  )
}

export default SearchTag
