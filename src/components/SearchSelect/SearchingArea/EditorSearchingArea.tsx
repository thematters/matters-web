import { useLazyQuery } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { INPUT_DEBOUNCE } from '~/common/enums'
import {
  analytics,
  isUrl,
  mergeConnections,
  normalizeTag,
  parseURL,
} from '~/common/utils'
import {
  EmptySearch,
  InfiniteScroll,
  SpinnerBlock,
  toDigestTagPlaceholder,
  usePublicLazyQuery,
  ViewerContext,
} from '~/components'
import {
  ArticleUrlQueryQuery,
  ListViewerArticlesQuery,
  SearchExclude,
  SearchFilter,
  SelectSearchQuery,
} from '~/gql/graphql'

import SearchSelectNode from '../SearchSelectNode'
import { StagingNode } from '../StagingArea'
import styles from '../styles.module.css'
import CreateTag from './CreateTag'
import { ARTICLE_URL_QUERY, LIST_VIEWER_ARTICLES, SELECT_SEARCH } from './gql'
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
  nodeExclude?: string
  stagingNodes: StagingNode[]

  inSearchingArea: boolean
  toStagingArea: () => void
  toSearchingArea: () => void
  addNodeToStaging: (node: SelectNode) => void

  createTag?: boolean

  CustomStagingArea?: React.ReactNode
} & Pick<SearchInputProps, 'autoFocus'>

type Mode = 'search' | 'list' | 'article_url'

const EditorSearchingArea: React.FC<SearchingAreaProps> = ({
  searchType,
  searchFilter,
  searchExclude,
  nodeExclude,
  stagingNodes,

  inSearchingArea,
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
  const isArticleUrlMode = mode === 'article_url'

  const [searching, setSearching] = useState(false)
  const [searchingNodes, setSearchingNodes] = useState<SelectNode[]>([])

  const [searchKey, setSearchKey] = useState('')
  const [debouncedSearchKey, setDebouncedSearchKey] = useState('')
  const debouncedSetSearchKey = useDebouncedCallback((sk0) => {
    const sk = isTag ? normalizeTag(sk0) : sk0
    setDebouncedSearchKey(sk)
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

  const [
    lazyArticleUrlQuery,
    { data: articleUrlData, loading: articleUrlLoding },
  ] = usePublicLazyQuery<ArticleUrlQueryQuery>(
    ARTICLE_URL_QUERY,
    {},
    { publicQuery: !viewer.isAuthed }
  )

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

  const searchNodes =
    searchEdges
      ?.map(({ node }) => node)
      .filter((node) => node.id !== nodeExclude) || []
  const searchNodeIds = searchNodes.map((n) => n.id).join(',')
  const listNodes =
    listEdges
      ?.map(({ node }) => node)
      .filter(
        (node) => node.articleState === 'active' && node.id !== nodeExclude
      ) || []
  const listNodeIds = listNodes.map((n) => n.id).join(',')
  const search = (key: string) => {
    // Used to match links of the format like👇
    // https://matters.town/a/{shortHash} or https://*.matters.town/a/{shortHash}
    const regex = new RegExp(
      `^https://(?:[a-zA-Z0-9-]+\\.)?${process.env.NEXT_PUBLIC_SITE_DOMAIN}/a/[a-zA-Z0-9]+`
    )
    if (searchType === 'Article' && isUrl(key) && regex.test(key)) {
      const urlObj = parseURL(key)
      const shortHash = urlObj.pathname.split('/a/')[1].split('?')[0]
      setMode('article_url')
      lazyArticleUrlQuery({ variables: { shortHash } })
    } else {
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
  }

  // handling changes from search input
  const onSearchInputChange = (value: string) => {
    setSearchKey(value)
    debouncedSetSearchKey(value)
    setMode('search')

    if (hasListMode && !value) {
      setMode('list')
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
    if (listNodes.length > 0) {
      setSearchingNodes(listNodes)
    } else {
      loadList()
    }
  }, [isListMode])

  useEffect(() => {
    setSearching(listLoading)
    setSearchingNodes(listNodes)
  }, [listLoading, listNodeIds])

  // article url
  useEffect(() => {
    setSearching(articleUrlLoding)
  }, [articleUrlLoding])

  const hasNodes = searchNodes.length > 0
  const hasListNode = listNodes.length > 0
  const hasArticle =
    !!articleUrlData?.article && articleUrlData?.article.id !== nodeExclude
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
    <section className={styles.searchingArea}>
      <SearchInput
        type={searchType}
        value={searchKey}
        onChange={onSearchInputChange}
        onSubmit={search}
        autoFocus
      />

      {inSearchingArea && (
        <section className={styles.area}>
          {searching && <SpinnerBlock />}
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
                  <ul className={styles.nodes}>
                    {canCreateTag && (
                      <li>
                        <CreateTag
                          tag={toDigestTagPlaceholder(normalizeTag(searchKey))}
                          onClick={addNodeToStaging}
                        />
                      </li>
                    )}

                    {searchingNodes.map((node) => (
                      <li key={node.id}>
                        <SearchSelectNode
                          node={node}
                          onClick={addNodeToStaging}
                          selected={
                            stagingNodes.findIndex((sn) => {
                              return sn.node.id === node.id
                            }) !== -1
                          }
                          inSearchingArea
                        />
                      </li>
                    ))}
                  </ul>
                </InfiniteScroll>
              )}

              {/* List */}
              {isListMode && !searching && !hasListNode && <EmptySearch />}

              {isListMode && !searching && hasListNode && (
                <InfiniteScroll
                  hasNextPage={!!listPageInfo?.hasNextPage}
                  loadMore={loadMoreList}
                >
                  <ul className={styles.nodes}>
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

              {/* URL Search */}
              {isArticleUrlMode && !searching && !hasArticle && <EmptySearch />}

              {isArticleUrlMode && !searching && hasArticle && (
                <SearchSelectNode
                  node={articleUrlData.article!}
                  onClick={addNodeToStaging}
                  selected={
                    stagingNodes.findIndex(
                      (sn) => sn.node.id === articleUrlData.article?.id
                    ) !== -1
                  }
                  inSearchingArea
                />
              )}
            </>
          )}
        </section>
      )}
    </section>
  )
}

export default EditorSearchingArea
