import jump from 'jump.js'
import _differenceBy from 'lodash/differenceBy'
import _get from 'lodash/get'
import { useContext, useEffect, useRef, useState } from 'react'

import {
  EmptyResponse,
  List,
  QueryError,
  Spinner,
  Switch,
  ThreadComment,
  Title,
  Translate,
  useEventListener,
  usePublicQuery,
  usePullToRefresh,
  useResponsive,
  // useRoute,
  ViewerContext,
  ViewMoreButton,
} from '~/components'

import { REFETCH_RESPONSES, URL_FRAGMENT } from '~/common/enums'
import {
  dom,
  filterResponses,
  mergeConnections,
  unshiftConnections,
} from '~/common/utils'

import ResponseArticle from '../ResponseArticle'
import styles from '../styles.css'
import { LATEST_RESPONSES_PRIVATE, LATEST_RESPONSES_PUBLIC } from './gql'

import { LatestResponsesPrivate_nodes_Comment } from './__generated__/LatestResponsesPrivate'
import {
  LatestResponsesPublic,
  LatestResponsesPublic_article_Article,
  LatestResponsesPublic_article_Article_responses_edges_node,
  // LatestResponsesPublic_article_responses_edges_node,
} from './__generated__/LatestResponsesPublic'

const RESPONSES_COUNT = 15

type ResponsePublic = LatestResponsesPublic_article_Article_responses_edges_node // LatestResponsesPublic_article_responses_edges_node
type ResponsePrivate = LatestResponsesPrivate_nodes_Comment
type Response = ResponsePublic & Partial<Omit<ResponsePrivate, '__typename'>>

const LatestResponses = ({ id, lock }: { id: string; lock: boolean }) => {
  const viewer = useContext(ViewerContext)
  const isMediumUp = useResponsive('md-up')
  const [articleOnlyMode, setArticleOnlyMode] = useState<boolean>(false)
  const storedCursorRef = useRef<string | null>(null)

  /**
   * Fragment Patterns
   *
   * 0. ``
   * 1. `#comment`
   * 2. `#parentCommentId`
   * 3. `#parentComemntId-childCommentId`
   */
  let fragment = ''
  let parentId = ''
  let descendantId = ''
  if (typeof window !== 'undefined') {
    fragment = window.location.hash.replace('#', '')
    parentId = fragment.split('-')[0]
    descendantId = fragment.split('-')[1]
  }

  /**
   * Data Fetching
   */
  // public data
  const {
    data,
    loading,
    error,
    fetchMore,
    refetch: refetchPublic,
    client,
  } = usePublicQuery<LatestResponsesPublic>(LATEST_RESPONSES_PUBLIC, {
    variables: {
      id,
      first: RESPONSES_COUNT,
      articleOnly: articleOnlyMode,
    },
    notifyOnNetworkStatusChange: true,
  })

  // pagination
  const connectionPath = 'article.responses'
  const article = data?.article as LatestResponsesPublic_article_Article
  const { edges, pageInfo } = article?.responses || {}
  const articleId = article?.id
  const responses = filterResponses<ResponsePublic>(
    (edges || []).map(({ node }) => node)
  )

  // private data
  const loadPrivate = (publicData?: LatestResponsesPublic) => {
    if (!viewer.isAuthed || !publicData || !articleId) {
      return
    }

    const publiceEdges =
      (publicData.article as LatestResponsesPublic_article_Article)?.responses
        .edges || []
    const publicResponses = filterResponses<Response>(
      publiceEdges.map(({ node }) => node)
    )
    const publicIds = publicResponses
      .filter((node) => node.__typename === 'Comment')
      .map((node) => node.id)

    client.query({
      query: LATEST_RESPONSES_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { ids: publicIds },
    })
  }

  // fetch private data for first page
  useEffect(() => {
    loadPrivate(data)
  }, [articleId, viewer.id])

  // load next page
  const loadMore = async (params?: { before: string }) => {
    const loadBefore = params?.before || null
    const noLimit = loadBefore && pageInfo?.endCursor

    const { data: newData } = await fetchMore({
      variables: {
        after: pageInfo?.endCursor,
        before: loadBefore,
        first: noLimit ? null : RESPONSES_COUNT,
        includeBefore: !!loadBefore,
        articleOnly: articleOnlyMode,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

    loadPrivate(newData)
  }

  // refetch & pull to refresh
  const refetch = async () => {
    const { data: newData } = await refetchPublic()
    loadPrivate(newData)
  }
  useEventListener(REFETCH_RESPONSES, refetch)
  usePullToRefresh.Handler(refetch)

  useEffect(() => {
    if (pageInfo?.startCursor) {
      storedCursorRef.current = pageInfo.startCursor
    }
  }, [pageInfo?.startCursor])

  const replySubmitCallback = async () => {
    const { data: newData } = await fetchMore({
      variables: {
        before: storedCursorRef.current,
        includeBefore: false,
        articleOnly: articleOnlyMode,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = _get(fetchMoreResult, `${connectionPath}.edges`, [])
        const newResponseCount = _get(fetchMoreResult, 'article.responseCount')
        const oldResponseCount = _get(previousResult, 'article.responseCount')

        // update if response count has changed
        if (newEdges.length === 0) {
          if (oldResponseCount !== newResponseCount) {
            return {
              ...previousResult,
              article: {
                ...previousResult.article,
                responseCount: newResponseCount,
              },
            }
          }
          return previousResult
        }

        // update if there are new items in responses.edges
        const newResult = unshiftConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        })
        const newStartCursor = _get(
          newResult,
          `${connectionPath}.pageInfo.startCursor`,
          null
        )
        if (newStartCursor) {
          storedCursorRef.current = newStartCursor
        }
        return newResult
      },
    })

    loadPrivate(newData)
  }

  // scroll to comment
  useEffect(() => {
    if (!fragment || !articleId) {
      return
    }

    const jumpToFragment = () => {
      jump(`#${fragment}`, {
        offset: fragment === URL_FRAGMENT.COMMENTS ? -10 : -64,
      })
    }
    const element = dom.$(`#${fragment}`)

    if (!element) {
      loadMore({ before: parentId }).then(jumpToFragment)
    } else {
      jumpToFragment()
    }
  }, [articleId])

  /**
   * Render
   */
  if (loading && !data) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  return (
    <section className="latest-responses" id="latest-responses">
      <header>
        <Title type="feed" is="h3">
          <Translate id="latestResponses" />
        </Title>

        <div className="latest-responses-switch">
          <Switch
            name="latest-responses"
            label={<Translate id="latestResponses" />}
            onChange={() => setArticleOnlyMode(!articleOnlyMode)}
            checked={articleOnlyMode}
            loading={loading}
          />
          <span>
            <Translate id="collectedOnly" />
          </span>
        </div>
      </header>

      {!responses ||
        (responses.length <= 0 && (
          <EmptyResponse articleOnlyMode={articleOnlyMode} />
        ))}

      <List spacing={['xloose', 0]}>
        {responses.map((response) => (
          <List.Item key={response.id}>
            {response.__typename === 'Article' ? (
              <ResponseArticle article={response} hasCover={isMediumUp} />
            ) : (
              <ThreadComment
                comment={response}
                type="article"
                defaultExpand={response.id === parentId && !!descendantId}
                hasLink
                disabled={lock}
                replySubmitCallback={replySubmitCallback}
              />
            )}
          </List.Item>
        ))}
      </List>

      {pageInfo?.hasNextPage && (
        <ViewMoreButton onClick={() => loadMore()} loading={loading} />
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default LatestResponses
