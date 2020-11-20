import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import {
  EmptySearch,
  InfiniteScroll,
  Spinner,
  toDigestTag,
  usePublicLazyQuery,
} from '~/components'

import { INPUT_DEBOUNCE } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import SearchSelectNode from '../SearchSelectNode'
import styles from '../styles.css'
import CreateTag from './CreateTag'
import { SELECT_SEARCH } from './gql'
import SearchInput, { SearchType as SearchInputType } from './SearchInput'

import {
  SelectSearch,
  SelectSearch_search_edges_node,
  SelectSearch_search_edges_node_Article,
  SelectSearch_search_edges_node_Tag,
  SelectSearch_search_edges_node_User,
} from './__generated__/SelectSearch'

/**
 * This is a sub-component of search-and-select, and it will show
 * search results after typing in <SearchInput>. Node will be
 * added into the staging area when click.
 *
 */
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

  creatable?: boolean
}

const SearchingArea: React.FC<SearchingAreaProps> = ({
  searchType,
  searchFilter,

  inSearchingArea,
  toStagingArea,
  toSearchingArea,
  addNodeToStaging,

  creatable,
}) => {
  // States of Searching
  const [searching, setSearching] = useState(false)
  const [searchingNodes, setSearchingNodes] = useState<SelectNode[]>([])

  // Data Fetching
  const [searchKey, setSearchKey] = useState('')
  const [debouncedSearchKey] = useDebounce(searchKey, INPUT_DEBOUNCE)
  const [
    lazySearch,
    { data, loading, fetchMore },
  ] = usePublicLazyQuery<SelectSearch>(SELECT_SEARCH)

  // pagination
  const connectionPath = 'search'
  const { edges, pageInfo } = data?.search || {}

  // load next page
  const isArticle = searchType === 'Article'
  const isTag = searchType === 'Tag'
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: isArticle ? 'search_article' : isTag ? 'search_tag' : 'search_user',
      location: edges?.length || 0,
    })

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

  const canCreateTag =
    isTag &&
    searchKey &&
    creatable &&
    !nodes.some(
      (node) => node.__typename === 'Tag' && node.content === searchKey
    )

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

          {!searching && nodes.length <= 0 && !canCreateTag && <EmptySearch />}

          {!searching && (nodes.length > 0 || canCreateTag) && (
            <InfiniteScroll
              hasNextPage={!!pageInfo?.hasNextPage}
              loadMore={loadMore}
            >
              <ul className="nodes">
                {canCreateTag && (
                  <li>
                    <CreateTag
                      tag={toDigestTag(searchKey)}
                      onClick={addNodeToStaging}
                    />
                  </li>
                )}

                {searchingNodes.map((node) => (
                  <li key={node.id}>
                    <SearchSelectNode node={node} onClick={addNodeToStaging} />
                  </li>
                ))}
              </ul>
            </InfiniteScroll>
          )}

          <style jsx>{styles}</style>
        </section>
      )}
    </>
  )
}

export default SearchingArea
