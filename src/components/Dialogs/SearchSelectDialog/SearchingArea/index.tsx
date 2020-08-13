import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { Spinner, usePublicLazyQuery } from '~/components'

import { INPUT_DEBOUNCE } from '~/common/enums'

import { SELECT_SEARCH } from './gql'
import SearchingArticles from './SearchingArticles'
import SearchInput, { SearchType as SearchInputType } from './SearchInput'

import {
  SelectSearch,
  SelectSearch_search_edges_node,
  SelectSearch_search_edges_node_Article,
  SelectSearch_search_edges_node_Tag,
  SelectSearch_search_edges_node_User,
} from './__generated__/SelectSearch'

export type SearchType = SearchInputType
export type SelectNode = SelectSearch_search_edges_node
export type SelectArticle = SelectSearch_search_edges_node_Article
export type SelectTag = SelectSearch_search_edges_node_Tag
export type SelectUser = SelectSearch_search_edges_node_User

interface SearchingAreaProps {
  searchType: SearchType
  // TODO: searchFilter
  isSearchingArea: boolean
  toStagingArea: () => void
  toSearchingArea: () => void
  addStagingNodes: (node: SelectNode) => void
}

const SearchingArea: React.FC<SearchingAreaProps> = ({
  searchType,
  isSearchingArea,
  toStagingArea,
  toSearchingArea,
  addStagingNodes,
}) => {
  const isArticle = searchType === 'Article'
  // const isTag = searchType === 'Tag'
  // const isUser = searchType === 'User'

  // States of Searching
  const [searching, setSearching] = useState(false)
  const [searchingNodes, setSearchingNodes] = useState<SelectNode[]>([])
  const filterNodes = (type: SearchType) =>
    searchingNodes.filter((node) => node.__typename === type)

  // Data Fetching
  const [searchKey, setSearchKey] = useState('')
  const [debouncedSearchKey] = useDebounce(searchKey, INPUT_DEBOUNCE)
  const [lazySearch, { data, loading }] = usePublicLazyQuery<SelectSearch>(
    SELECT_SEARCH
  )
  const nodes = data?.search.edges?.map(({ node }) => node) || []
  const nodeIds = nodes.map((n) => n.id).join(',')
  const search = (key: string) => {
    lazySearch({ variables: { key, type: searchType } })
  }

  // handling changes from search input
  const onSearchInputFocus = () => {
    if (searchingNodes.length <= 0) {
      return
    }
    toSearchingArea()
  }
  const onSearchInputChange = (value: string) => {
    setSearchKey(value)

    if (value) {
      toSearchingArea()
    } else {
      toStagingArea()
      setSearchingNodes([])
    }
  }

  // start searching
  useEffect(() => {
    search(debouncedSearchKey)
  }, [debouncedSearchKey])

  // show latest search results
  useEffect(() => {
    setSearching(loading)
    setSearchingNodes(nodes)
    toSearchingArea()
  }, [loading, nodeIds])

  console.log({ searchingNodes })

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

      {isSearchingArea && searching && <Spinner />}

      {isSearchingArea && !searching && isArticle && (
        <SearchingArticles
          articles={filterNodes('Article') as SelectArticle[]}
          onClick={addStagingNodes}
          // TODO: load more
        />
      )}
    </>
  )
}

export default SearchingArea
