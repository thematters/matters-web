import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import jump from 'jump.js'
import _differenceBy from 'lodash/differenceBy'
import _get from 'lodash/get'
import _merge from 'lodash/merge'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import {
  EmptyResponse,
  List,
  LoadMore,
  Spinner,
  Switch,
  Title,
  Translate,
  useEventListener,
  useResponsive
} from '~/components'
import { QueryError } from '~/components/GQL'

import { REFETCH_RESPONSES, TEXT, UrlFragments } from '~/common/enums'
import {
  dom,
  filterResponses,
  getQuery,
  mergeConnections,
  unshiftConnections
} from '~/common/utils'

import ResponseArticle from './ResponseArticle'
import ResponseComment from './ResponseComment'
import styles from './styles.css'

import {
  LatestResponses as LatestResponsesType,
  LatestResponses_article_responses_edges_node
} from './__generated__/LatestResponses'
import {
  ResponseAdded,
  ResponseAdded_nodeEdited_Article
} from './__generated__/ResponseAdded'

const RESPONSES_COUNT = 15

const LatestResponsesArticle = gql`
  fragment LatestResponsesArticle on Article {
    id
    responseCount
    responses(
      input: {
        after: $after
        before: $before
        first: $first
        includeAfter: $includeAfter
        includeBefore: $includeBefore
        articleOnly: $articleOnly
      }
    ) {
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        node {
          ... on Article {
            ...ResponseArticleArticle
          }
          ... on Comment {
            ...ResponseCommentComment
          }
        }
      }
    }
  }
  ${ResponseArticle.fragments.article}
  ${ResponseComment.fragments.comment}
`

const LATEST_RESPONSES = gql`
  query LatestResponses(
    $mediaHash: String
    $before: String
    $after: String
    $first: Int = 8
    $includeAfter: Boolean
    $includeBefore: Boolean
    $articleOnly: Boolean
  ) {
    article(input: { mediaHash: $mediaHash }) {
      id
      mediaHash
      live
      ...LatestResponsesArticle
    }
  }
  ${LatestResponsesArticle}
`

const SUBSCRIBE_RESPONSE_ADDED = gql`
  subscription ResponseAdded(
    $id: ID!
    $before: String
    $after: String
    $first: Int
    $includeAfter: Boolean
    $includeBefore: Boolean
    $articleOnly: Boolean
  ) {
    nodeEdited(input: { id: $id }) {
      id
      ... on Article {
        id
        ...LatestResponsesArticle
      }
    }
  }
  ${LatestResponsesArticle}
`

const LatestResponses = () => {
  const isMediumUp = useResponsive({ type: 'md-up' })()
  const router = useRouter()
  const mediaHash = getQuery({ router, key: 'mediaHash' })
  const [articleOnlyMode, setArticleOnlyMode] = useState<boolean>(false)
  const [storedCursor, setStoredCursor] = useState<string | null>(null)

  /**
   * Fragment Patterns
   * 0. ``
   * 1. `#comment`
   * 2. `#parentCommentId`
   * 3. `#parentComemntId-childCommentId`
   */
  let fragment = ''
  let parentId = ''
  let descendantId = ''
  if (process.browser) {
    fragment = window.location.hash.replace('#', '')
    parentId = fragment.split('-')[0]
    descendantId = fragment.split('-')[1]
  }

  const {
    data,
    loading,
    error,
    fetchMore,
    subscribeToMore,
    refetch
  } = useQuery<LatestResponsesType>(LATEST_RESPONSES, {
    variables: {
      mediaHash,
      first: RESPONSES_COUNT,
      articleOnly: articleOnlyMode
    },
    notifyOnNetworkStatusChange: true
  })
  const connectionPath = 'article.responses'
  const article = data?.article
  const { edges, pageInfo } = (article && article.responses) || {}
  const articleId = article && article.id

  const loadMore = (params?: { before: string }) => {
    const loadBefore = (params && params.before) || null
    const noLimit = loadBefore && pageInfo && pageInfo.endCursor

    return fetchMore({
      variables: {
        after: pageInfo && pageInfo.endCursor,
        before: loadBefore,
        first: noLimit ? null : RESPONSES_COUNT,
        includeBefore: !!loadBefore,
        articleOnly: articleOnlyMode
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath
        })
    })
  }

  const commentCallback = () => {
    return fetchMore({
      variables: {
        before: storedCursor,
        includeBefore: false,
        articleOnly: articleOnlyMode
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
                responseCount: newResponseCount
              }
            }
          }
          return previousResult
        }

        // update if there are new items in responses.edges
        const newResult = unshiftConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath
        })
        const newStartCursor = _get(
          newResult,
          `${connectionPath}.pageInfo.startCursor`,
          null
        )
        if (newStartCursor) {
          setStoredCursor(newStartCursor)
        }
        return newResult
      }
    })
  }

  const responses = filterResponses(
    (edges || []).map(({ node }) => node)
  ) as LatestResponses_article_responses_edges_node[]

  // real time update with websocket
  useEffect(() => {
    if (article && article.live && edges && pageInfo) {
      subscribeToMore<ResponseAdded>({
        document: SUBSCRIBE_RESPONSE_ADDED,
        variables: {
          id: article.id,
          before: pageInfo.endCursor,
          includeBefore: true,
          articleOnly: articleOnlyMode
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!prev.article) {
            return prev
          }
          const oldData = prev.article
          const newData = subscriptionData.data
            .nodeEdited as ResponseAdded_nodeEdited_Article
          const diff = _differenceBy(
            newData.responses.edges,
            oldData.responses.edges || [],
            'node.id'
          )
          return {
            article: {
              ...oldData,
              responses: {
                ...oldData.responses,
                edges: [...diff, ...(oldData.responses.edges || [])],
                pageInfo: {
                  ...newData.responses.pageInfo,
                  endCursor: oldData.responses.pageInfo.endCursor
                }
              }
            }
          }
        }
      })
    }
  }, [articleId])

  // scroll to comment
  useEffect(() => {
    if (!fragment || !articleId) {
      return
    }

    const jumpToFragment = () => {
      jump(`#${fragment}`, {
        offset: fragment === UrlFragments.COMMENTS ? -10 : -64
      })
    }
    const element = dom.$(`#${fragment}`)

    if (!element) {
      loadMore({ before: parentId }).then(jumpToFragment)
    } else {
      jumpToFragment()
    }
  }, [articleId])

  useEventListener(REFETCH_RESPONSES, refetch)

  useEffect(() => {
    if (pageInfo && pageInfo.startCursor) {
      setStoredCursor(pageInfo.startCursor)
    }
  }, [pageInfo && pageInfo.startCursor])

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
          <Translate
            zh_hant={TEXT.zh_hant.latestResponses}
            zh_hans={TEXT.zh_hans.latestResponses}
          />
        </Title>

        <div className="latest-responses-switch">
          <Switch
            onChange={() => setArticleOnlyMode(!articleOnlyMode)}
            checked={articleOnlyMode}
            loading={loading}
          />
          <span>
            <Translate
              zh_hant={TEXT.zh_hant.collectedOnly}
              zh_hans={TEXT.zh_hans.collectedOnly}
            />
          </span>
        </div>
      </header>

      {!responses ||
        (responses.length <= 0 && (
          <EmptyResponse articleOnlyMode={articleOnlyMode} />
        ))}

      <List spacing={['xloose', 0]} hasBorder>
        {responses.map(response => (
          <List.Item key={response.id}>
            {response.__typename === 'Article' ? (
              <ResponseArticle article={response} hasCover={isMediumUp} />
            ) : (
              <ResponseComment
                comment={response}
                defaultExpand={response.id === parentId && !!descendantId}
                hasLink
                commentCallback={commentCallback}
              />
            )}
          </List.Item>
        ))}
      </List>

      {pageInfo && pageInfo.hasNextPage && (
        <LoadMore onClick={loadMore} loading={loading} />
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default LatestResponses
