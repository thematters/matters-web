import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { EmptySearch, Spinner, usePublicLazyQuery } from '~/components'

import { INPUT_DEBOUNCE } from '~/common/enums'

import {
  SearchSelectArticle,
  SearchSelectArticles,
  SearchSelectTag,
  SearchSelectTags,
  SearchSelectUser,
  SearchSelectUsers,
} from '../Nodes'
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
  // TODO: searchFilter
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
  const isArticle = searchType === 'Article'
  const isTag = searchType === 'Tag'
  const isUser = searchType === 'User'

  // States of Searching
  const [searching, setSearching] = useState(false)
  const [searchingNodes, setSearchingNodes] = useState<SelectNode[]>([])
  const filterNodes = (type: SearchType) =>
    searchingNodes
      .filter((node) => node.__typename === type)
      .map((node) => ({ node }))

  // Data Fetching
  const [searchKey, setSearchKey] = useState('')
  const [debouncedSearchKey] = useDebounce(searchKey, INPUT_DEBOUNCE)
  const [lazySearch, { data, loading }] = usePublicLazyQuery<SelectSearch>(
    SELECT_SEARCH
  )
  const nodes = data?.search.edges?.map(({ node }) => node) || []
  const nodeIds = nodes.map((n) => n.id).join(',')
  const search = (key: string) => {
    lazySearch({ variables: { key, type: searchType, filter: searchFilter } })
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

      {inSearchingArea && searching && <Spinner />}

      {inSearchingArea && !searching && nodes.length <= 0 && <EmptySearch />}

      {inSearchingArea && !searching && isArticle && (
        <SearchSelectArticles
          articles={filterNodes('Article') as SearchSelectArticle[]}
          onClick={addNodeToStaging}
          // TODO: load more
        />
      )}

      {inSearchingArea && !searching && isTag && (
        <SearchSelectTags
          tags={filterNodes('Tag') as SearchSelectTag[]}
          onClick={addNodeToStaging}
          // TODO: load more
        />
      )}

      {inSearchingArea && !searching && isUser && (
        <SearchSelectUsers
          users={filterNodes('User') as SearchSelectUser[]}
          onClick={addNodeToStaging}
          // TODO: load more
        />
      )}
    </>
  )
}

export default SearchingArea
