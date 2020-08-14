import { Fragment, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import {
  EmptySearch,
  InfiniteScroll,
  List,
  Spinner,
  usePublicLazyQuery,
} from '~/components'

import { INPUT_DEBOUNCE } from '~/common/enums'
import { mergeConnections } from '~/common/utils'

import { SearchSelectArticle, SearchSelectTag, SearchSelectUser } from '../Node'
import styles from '../styles.css'
import { SELECT_SEARCH } from './gql'
import SearchInput, { SearchType as SearchInputType } from './SearchInput'

import {
  SelectSearch,
  SelectSearch_search_edges_node,
  SelectSearch_search_edges_node_Article,
  SelectSearch_search_edges_node_Tag,
  SelectSearch_search_edges_node_User,
} from './__generated__/SelectSearch'

export type SearchType = SearchInputType
export interface SearchFilter {
  authorId: string
}

export type SelectNode = SelectSearch_search_edges_node
export type SelectArticle = SelectSearch_search_edges_node_Article
export type SelectTag = SelectSearch_search_edges_node_Tag
export type SelectUser = SelectSearch_search_edges_node_User

interface SearchingAreaProps {
  searchType: SearchType
  searchFilter?: SearchFilter
  inSearchingArea: boolean
  toStagingArea: () => void
  toSearchingArea: () => void
  addNodeToStaging: (node: SelectNode) => void
}

const SearchingArea: React.FC<SearchingAreaProps> = ({
  searchType,
  searchFilter,

  inSearchingArea,
  toStagingArea,
  toSearchingArea,
  addNodeToStaging,
}) => {
  // States of Searching
  const [searching, setSearching] = useState(false)
  const [searchingNodes, setSearchingNodes] = useState<SelectNode[]>([])

  // Data Fetching
  const [searchKey, setSearchKey] = useState('')
  const [debouncedSearchKey] = useDebounce(searchKey, INPUT_DEBOUNCE)
  const [lazySearch, { data, loading, fetchMore }] = usePublicLazyQuery<
    SelectSearch
  >(SELECT_SEARCH)

  // pagination
  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  // load next page
  const loadMore = async () => {
    // analytics.trackEvent('load_more', {
    //   type: 'search_article',
    //   location: edges?.length || 0,
    // })

    fetchMore({
      variables: {
        after: pageInfo?.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  const nodes = edges?.map(({ node }) => node) || []
  const nodeIds = nodes.map((n) => n.id).join(',')
  const search = (key: string) => {
    lazySearch({
      variables: { key, type: searchType, filter: searchFilter, first: 10 },
    })
  }

  // handling changes from search input
  const onSearchInputChange = (value: string) => {
    setSearchKey(value)

    if (value) {
      toSearchingArea()
    } else {
      toStagingArea()
      setSearchingNodes([])
    }
  }
  const onSearchInputFocus = () => {
    if (searchingNodes.length <= 0) {
      return
    }
    toSearchingArea()
  }

  // start searching
  useEffect(() => {
    search(debouncedSearchKey)
  }, [debouncedSearchKey])

  // show latest search results
  useEffect(() => {
    setSearching(loading)
    setSearchingNodes(nodes)
  }, [loading, nodeIds])

  /**
   * Render
   */
  return (
    <>
      <SearchInput
        type={searchType}
        value={searchKey}
        onChange={onSearchInputChange}
        onSubmit={search}
        onFocus={onSearchInputFocus}
      />

      {inSearchingArea && (
        <section className="area">
          {searching && <Spinner />}

          {!searching && nodes.length <= 0 && <EmptySearch />}

          {!searching && nodes.length > 0 && (
            <InfiniteScroll
              hasNextPage={!!pageInfo?.hasNextPage}
              loadMore={loadMore}
            >
              <List>
                {searchingNodes.map((node) => (
                  <Fragment key={node.id}>
                    {node.__typename === 'Article' && (
                      <SearchSelectArticle
                        article={node}
                        onClick={addNodeToStaging}
                      />
                    )}
                    {node.__typename === 'Tag' && (
                      <SearchSelectTag tag={node} onClick={addNodeToStaging} />
                    )}
                    {node.__typename === 'User' && (
                      <SearchSelectUser
                        user={node}
                        onClick={addNodeToStaging}
                      />
                    )}
                  </Fragment>
                ))}
              </List>
            </InfiniteScroll>
          )}

          <style jsx>{styles}</style>
        </section>
      )}
    </>
  )
}

export default SearchingArea
