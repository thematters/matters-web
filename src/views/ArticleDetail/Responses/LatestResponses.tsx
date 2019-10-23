import gql from 'graphql-tag'
import jump from 'jump.js'
import _get from 'lodash/get'
import _has from 'lodash/has'
import _merge from 'lodash/merge'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'

import { LoadMore, Spinner, Translate } from '~/components'
import { ArticleDigest } from '~/components/ArticleDigest'
import { CommentDigest } from '~/components/CommentDigest'
import EmptyResponse from '~/components/Empty/EmptyResponse'
import { QueryError } from '~/components/GQL'
import { ArticleDetailResponses } from '~/components/GQL/fragments/response'
import { ArticleResponses as ArticleResponsesType } from '~/components/GQL/queries/__generated__/ArticleResponses'
import ARTICLE_RESPONSES from '~/components/GQL/queries/articleResponses'
import { useEventListener } from '~/components/Hook'
import { Switch } from '~/components/Switch'

import { REFETCH_RESPONSES, TEXT, UrlFragments } from '~/common/enums'
import {
  dom,
  filterResponses,
  getQuery,
  mergeConnections,
  unshiftConnections
} from '~/common/utils'

import { ArticleCommentAdded } from './__generated__/ArticleCommentAdded'
import styles from './styles.css'

const RESPONSES_COUNT = 15

const SUBSCRIBE_RESPONSES = gql`
  subscription ArticleCommentAdded(
    $id: ID!
    $before: String
    $after: String
    $first: Int!
    $includeAfter: Boolean
    $includeBefore: Boolean
    $hasDescendantComments: Boolean = true
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
    $articleOnly: Boolean
  ) {
    nodeEdited(input: { id: $id }) {
      id
      ... on Article {
        id
        ...ArticleDetailResponses
      }
    }
  }
  ${ArticleDetailResponses}
`

const LatestResponses = () => {
  const router = useRouter()
  const mediaHash = getQuery({ router, key: 'mediaHash' })
  const [articleOnlyMode, setArticleOnlyMode] = useState<boolean>(false)
  const [storedCursor, setStoredCursor] = useState<string | null>(null)

  if (!mediaHash) {
    return <EmptyResponse articleOnlyMode={articleOnlyMode} />
  }

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
  } = useQuery<ArticleResponsesType>(ARTICLE_RESPONSES, {
    variables: {
      mediaHash,
      first: RESPONSES_COUNT,
      articleOnly: articleOnlyMode
    },
    notifyOnNetworkStatusChange: true
  })
  const connectionPath = 'article.responses'
  const { edges, pageInfo } =
    (data && data.article && data.article.responses) || {}

  // real time update with websocket
  useEffect(() => {
    if (data && data.article && edges) {
      subscribeToMore<ArticleCommentAdded>({
        document: SUBSCRIBE_RESPONSES,
        variables: {
          id: data.article.id,
          first: edges.length,
          articleOnly: articleOnlyMode
        },
        updateQuery: (prev, { subscriptionData }) =>
          _merge(prev, {
            article: subscriptionData.data.nodeEdited
          })
      })
    }
  })

  // scroll to comment
  useEffect(() => {
    if (!fragment) {
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
  }, [])

  useEventListener(REFETCH_RESPONSES, refetch)

  useEffect(() => {
    if (pageInfo && pageInfo.startCursor) {
      setStoredCursor(pageInfo.startCursor)
    }
  }, [pageInfo && pageInfo.startCursor])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  const loadMore = (params?: { before: string }) => {
    const loadBefore = (params && params.before) || null
    const noLimit = loadBefore && pageInfo.endCursor

    return fetchMore({
      variables: {
        after: pageInfo.endCursor,
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

  const responses = filterResponses((edges || []).map(({ node }) => node))

  return (
    <section className="latest-responses" id="latest-responses">
      <header>
        <h3>
          <Translate
            zh_hant={TEXT.zh_hant.latestResponses}
            zh_hans={TEXT.zh_hans.latestResponses}
          />
        </h3>

        <div className="switch">
          <Switch
            onChange={() => setArticleOnlyMode(!articleOnlyMode)}
            checked={articleOnlyMode}
            extraClass="narrow"
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

      <ul>
        {responses.map(response => (
          <li key={response.id}>
            {_has(response, 'title') ? (
              <ArticleDigest.Response
                article={response}
                hasAuthor
                hasBookmark
              />
            ) : (
              <CommentDigest.Feed
                comment={response}
                hasForm
                hasLink
                inArticle
                expandDescendants={response.id === parentId && !!descendantId}
                commentCallback={commentCallback}
              />
            )}
          </li>
        ))}
      </ul>

      {pageInfo.hasNextPage && (
        <LoadMore onClick={loadMore} loading={loading} />
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default LatestResponses
