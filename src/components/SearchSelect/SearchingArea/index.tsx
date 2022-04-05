import { useLazyQuery } from '@apollo/react-hooks'
import { useContext, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import {
  EmptySearch,
  InfiniteScroll,
  Spinner,
  toDigestTagPlaceholder,
  usePublicLazyQuery,
  ViewerContext,
} from '~/components'
import { toUserDigestMiniPlaceholder } from '~/components/UserDigest/Mini'

import { INPUT_DEBOUNCE } from '~/common/enums'
import { analytics, isValidEmail, mergeConnections } from '~/common/utils'

import SearchSelectNode from '../SearchSelectNode'
import styles from '../styles.css'
import CreateTag from './CreateTag'
import { LIST_VIEWER_ARTICLES, SELECT_SEARCH } from './gql'
import InviteEmail from './InviteEmail'
import SearchInput, { SearchType as SearchInputType } from './SearchInput'

import { SearchExclude, SearchFilter } from '@/__generated__/globalTypes'
import { ListViewerArticles } from './__generated__/ListViewerArticles'
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
export type SelectNode = SelectSearch_search_edges_node
export type SelectArticle = SelectSearch_search_edges_node_Article
export type SelectTag = SelectSearch_search_edges_node_Tag
export type SelectUser = SelectSearch_search_edges_node_User

interface SearchingAreaProps {
  searchType: SearchType
  searchFilter?: SearchFilter
  searchExclude?: SearchExclude

  inSearchingArea: boolean
  toStagingArea: () => void
  toSearchingArea: () => void
  addNodeToStaging: (node: SelectNode) => void

  createTag?: boolean
  inviteEmail?: boolean
}

type Mode = 'search' | 'list'

const SearchingArea: React.FC<SearchingAreaProps> = ({
  searchType,
  searchFilter,
  searchExclude,

  inSearchingArea,
  toStagingArea,
  toSearchingArea,
  addNodeToStaging,

  createTag,
  inviteEmail,
}) => {
  const viewer = useContext(ViewerContext)

  const isArticle = searchType === 'Article'
  const isUser = searchType === 'User' || searchType === 'Invitee'
  const isTag = searchType === 'Tag'
  const hasListMode = viewer.id === searchFilter?.authorId && isArticle
  const [mode, setMode] = useState<Mode>(hasListMode ? 'list' : 'search')
  const isSearchMode = mode === 'search'
  const isListMode = mode === 'list'

  const [searching, setSearching] = useState(false)
  const [searchingNodes, setSearchingNodes] = useState<SelectNode[]>([])

  // Data Fetching
  const [searchKey, setSearchKey] = useState('')
  const [debouncedSearchKey] = useDebounce(searchKey, INPUT_DEBOUNCE)
  const [lazySearch, { data, loading, fetchMore }] =
    usePublicLazyQuery<SelectSearch>(
      SELECT_SEARCH,
      {},
      { publicQuery: !viewer.isAuthed }
    )
  const [
    loadList,
    { data: listData, loading: listLoading, fetchMore: fetchMoreList },
  ] = useLazyQuery<ListViewerArticles>(LIST_VIEWER_ARTICLES)

  // pagination
  const { edges: searchEdges, pageInfo: searchPageInfo } = data?.search || {}
  const { edges: listEdges, pageInfo: listPageInfo } =
    listData?.viewer?.articles || {}

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: isArticle ? 'search_article' : isTag ? 'search_tag' : 'search_user',
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
    const type = searchType === 'Invitee' ? 'User' : searchType
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

    if (hasListMode) {
      setMode(value ? 'search' : 'list')
      toSearchingArea()
      return
    }

    if (value) {
      toSearchingArea()
    } else {
      toStagingArea()
      setSearchingNodes([])
    }
  }
  const onSearchInputFocus = () => {
    if (hasListMode) {
      if (!searchKey) {
        setMode('list')
      }
    } else if (searchingNodes.length <= 0) {
      return
    }

    toSearchingArea()
  }
  const onSearchInputBlur = () => {
    if (isSearchMode) {
      return
    }

    // to prevent clicking node doesn't work
    setTimeout(() => {
      toStagingArea()
    }, 100)
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

  useEffect(() => {
    if (!isTag) return

    lazySearch({
      variables: {
        key: '',
        includeAuthorTags: true,
        type: 'Tag',
        filter: searchFilter,
        exclude: searchExclude,
        first: 10,
      },
    })
  }, [isTag])

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
    toSearchingArea()
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
  const canInviteEmail =
    isUser &&
    inviteEmail &&
    searchKey &&
    isValidEmail(searchKey.trim(), { allowPlusSign: false })

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
        onBlur={onSearchInputBlur}
      />

      {inSearchingArea && (
        <section className="area">
          {searching && <Spinner />}

          {/* Search */}
          {isSearchMode &&
            !searching &&
            !hasNodes &&
            !canCreateTag &&
            !canInviteEmail && <EmptySearch />}

          {isSearchMode &&
            !searching &&
            (hasNodes || canCreateTag || canInviteEmail) && (
              <InfiniteScroll
                hasNextPage={!!searchPageInfo?.hasNextPage}
                loadMore={loadMore}
              >
                <ul className="nodes">
                  {canCreateTag && (
                    <li>
                      <CreateTag
                        tag={toDigestTagPlaceholder(searchKey)}
                        onClick={addNodeToStaging}
                      />
                    </li>
                  )}
                  {canInviteEmail && (
                    <li>
                      <InviteEmail
                        user={toUserDigestMiniPlaceholder(searchKey.trim())}
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
