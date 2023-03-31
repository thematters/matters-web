import { useLazyQuery } from '@apollo/react-hooks'
import { useContext, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { INPUT_DEBOUNCE } from '~/common/enums'
import {
  analytics,
  mergeConnections,
  normalizeTagInput, // stripAllPunct, // stripPunctPrefixSuffix,
} from '~/common/utils'
import {
  EmptySearch,
  InfiniteScroll,
  Spinner,
  toDigestTagPlaceholder,
  usePublicLazyQuery,
  ViewerContext,
} from '~/components'
import {
  ListViewerArticlesQuery,
  SearchExclude,
  SearchFilter,
  SelectSearchQuery,
} from '~/gql/graphql'

import SearchSelectNode from '../SearchSelectNode'
import styles from '../styles.css'
import CreateTag from './CreateTag'
import { LIST_VIEWER_ARTICLES, SELECT_SEARCH } from './gql'
import SearchInput, {
  SearchInputProps,
  SearchType as SearchInputType,
} from './SearchInput'

/**
 * This is a sub-component of search-and-select, and it will show
 * search results after typing in <SearchInput>. Node will be
 * added into the staging area when click.
 *
 */
export type SearchType = SearchInputType
export type SelectNode = NonNullable<
  SelectSearchQuery['search']['edges']
>[0]['node']
export type SelectArticle = NonNullable<
  SelectSearchQuery['search']['edges']
>[0]['node'] & { __typename: 'Article' }
export type SelectTag = NonNullable<
  SelectSearchQuery['search']['edges']
>[0]['node'] & { __typename: 'Tag' }
export type SelectUser = NonNullable<
  SelectSearchQuery['search']['edges']
>[0]['node'] & { __typename: 'User' }

type SearchingAreaProps = {
  searchType: SearchType
  searchFilter?: SearchFilter
  searchExclude?: SearchExclude

  inSearchingArea: boolean
  toStagingArea: () => void
  toSearchingArea: () => void
  addNodeToStaging: (node: SelectNode) => void

  createTag?: boolean

  CustomStagingArea?: React.ReactNode
} & Pick<SearchInputProps, 'autoFocus'>

type Mode = 'search' | 'list'

const EditorSearchingArea: React.FC<SearchingAreaProps> = ({
  searchType,
  searchFilter,
  searchExclude,

  inSearchingArea,
  toStagingArea,
  toSearchingArea,
  addNodeToStaging,

  createTag,
  CustomStagingArea,
}) => {
  const viewer = useContext(ViewerContext)

  const isArticle = searchType === 'Article'
  const isTag = searchType === 'Tag'
  const hasListMode = viewer.id === searchFilter?.authorId && isArticle
  const [mode, setMode] = useState<Mode>(hasListMode ? 'list' : 'search')
  const isSearchMode = mode === 'search'
  const isListMode = mode === 'list'

  const [searching, setSearching] = useState(false)
  const [searchingNodes, setSearchingNodes] = useState<SelectNode[]>([])

  const [searchKey, setSearchKey] = useState('')
  const [debouncedSearchKey, setdebouncedSearchKey] = useState('')
  const debouncedSetSearchKey = useDebouncedCallback((sk0) => {
    const sk = isTag ? normalizeTagInput(sk0) : sk0
    setdebouncedSearchKey(sk)
    setSearchKey(sk)
  }, INPUT_DEBOUNCE)

  // Data Fetching
  const [lazySearch, { data, loading, fetchMore }] =
    usePublicLazyQuery<SelectSearchQuery>(
      SELECT_SEARCH,
      {},
      { publicQuery: !viewer.isAuthed }
    )
  const [
    loadList,
    { data: listData, loading: listLoading, fetchMore: fetchMoreList },
  ] = useLazyQuery<ListViewerArticlesQuery>(LIST_VIEWER_ARTICLES)

  // pagination
  const { edges: searchEdges, pageInfo: searchPageInfo } = data?.search || {}
  const { edges: listEdges, pageInfo: listPageInfo } =
    listData?.viewer?.articles || {}

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: isArticle ? 'search_article' : 'search_tag',
      location: searchEdges?.length || 0,
    })

    fetchMore({
      variables: { after: searchPageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: 'search',
        }),
    })
  }
  const loadMoreList = async () => {
    fetchMoreList({
      variables: { after: listPageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: 'viewer.articles',
        }),
    })
  }

  const searchNodes = searchEdges?.map(({ node }) => node) || []
  const searchNodeIds = searchNodes.map((n) => n.id).join(',')
  const listNode =
    listEdges
      ?.map(({ node }) => node)
      .filter((node) => node.articleState === 'active') || []
  const listNodeIds = listNode.map((n) => n.id).join(',')
  const search = (key: string) => {
    const type = searchType
    lazySearch({
      variables: {
        key,
        type,
        filter: searchFilter,
        exclude: searchExclude,
        first: 10,
      },
    })
  }

  // handling changes from search input
  const onSearchInputChange = (value: string) => {
    setSearchKey(value)
    debouncedSetSearchKey(value)

    if (hasListMode) {
      setMode(value ? 'search' : 'list')
      return
    }
  }
  // searching
  useEffect(() => {
    if (debouncedSearchKey) {
      search(debouncedSearchKey)
    }
  }, [debouncedSearchKey])

  useEffect(() => {
    setSearching(loading)
    setSearchingNodes(searchNodes)
  }, [loading, searchNodeIds])

  // list
  useEffect(() => {
    if (!isListMode) {
      return
    }

    // use cache or fetch
    if (listNode.length > 0) {
      setSearchingNodes(listNode)
    } else {
      loadList()
    }
  }, [isListMode])

  useEffect(() => {
    setSearching(listLoading)
    setSearchingNodes(listNode)
  }, [listLoading, listNodeIds])

  const hasNodes = searchNodes.length > 0
  const haslistNode = listNode.length > 0
  const canCreateTag =
    isTag &&
    searchKey &&
    createTag &&
    !searchNodes.some(
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
        autoFocus
      />

      {inSearchingArea && (
        <section className="area">
          {searching && <Spinner />}
          {searchKey.length === 0 && !!CustomStagingArea && CustomStagingArea}
          {/* Search */}
          {searchKey.length > 0 && (
            <>
              {isSearchMode && !searching && !hasNodes && !canCreateTag && (
                <EmptySearch />
              )}

              {isSearchMode && !searching && (hasNodes || canCreateTag) && (
                <InfiniteScroll
                  hasNextPage={!!searchPageInfo?.hasNextPage}
                  loadMore={loadMore}
                >
                  <ul className="nodes">
                    {canCreateTag && (
                      <li>
                        <CreateTag
                          tag={toDigestTagPlaceholder(
                            normalizeTagInput(searchKey)
                          )}
                          onClick={addNodeToStaging}
                        />
                      </li>
                    )}

                    {searchingNodes.map((node) => (
                      <li key={node.id}>
                        <SearchSelectNode
                          node={node}
                          onClick={addNodeToStaging}
                        />
                      </li>
                    ))}
                  </ul>
                </InfiniteScroll>
              )}

              {/* List */}
              {isListMode && !searching && !haslistNode && <EmptySearch />}

              {isListMode && !searching && haslistNode && (
                <InfiniteScroll
                  hasNextPage={!!listPageInfo?.hasNextPage}
                  loadMore={loadMoreList}
                >
                  <ul className="nodes">
                    {searchingNodes.map((node) => (
                      <li key={node.id}>
                        <SearchSelectNode
                          node={node}
                          onClick={addNodeToStaging}
                        />
                      </li>
                    ))}
                  </ul>
                </InfiniteScroll>
              )}
            </>
          )}

          <style jsx>{styles}</style>
        </section>
      )}
    </>
  )
}

export default EditorSearchingArea
