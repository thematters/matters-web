import gql from 'graphql-tag'
import jump from 'jump.js'
import _get from 'lodash/get'
import _has from 'lodash/has'
import _merge from 'lodash/merge'
import { withRouter, WithRouterProps } from 'next/router'
import { useEffect, useState } from 'react'
import { QueryResult } from 'react-apollo'

import { LoadMore, Spinner, Translate } from '~/components'
import { ArticleDigest } from '~/components/ArticleDigest'
import { CommentDigest } from '~/components/CommentDigest'
import EmptyResponse from '~/components/Empty/EmptyResponse'
import CommentForm from '~/components/Form/CommentForm'
import { Query } from '~/components/GQL'
import { ArticleDetailResponses } from '~/components/GQL/fragments/response'
import { ArticleResponses as ArticleResponsesType } from '~/components/GQL/queries/__generated__/ArticleResponses'
import ARTICLE_RESPONSES from '~/components/GQL/queries/articleResponses'
import { Switch } from '~/components/Switch'

import { TEXT, UrlFragments } from '~/common/enums'
import {
  dom,
  filterResponses,
  getQuery,
  mergeConnections
} from '~/common/utils'

import styles from './styles.css'

const RESPONSES_COUNT = 15

const SUBSCRIBE_RESPONSES = gql`
  subscription ArticleCommentAdded(
    $id: ID!
    $before: String
    $cursor: String
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

const Main: React.FC<WithRouterProps> = ({ router }) => {
  const mediaHash = getQuery({ router, key: 'mediaHash' })
  const [articleOnlyMode, setArticleOnlyMode] = useState<boolean>(false)

  if (!mediaHash) {
    return <EmptyResponse articleOnlyMode={articleOnlyMode} />
  }

  /**
   * Fragment Pattern
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

  const queryVariables = {
    mediaHash,
    first: RESPONSES_COUNT,
    articleOnly: articleOnlyMode
  }

  return (
    <Query
      query={ARTICLE_RESPONSES}
      variables={queryVariables}
      notifyOnNetworkStatusChange
    >
      {({
        data,
        loading,
        fetchMore,
        subscribeToMore,
        refetch
      }: QueryResult & { data: ArticleResponsesType }) => {
        if (!data || !data.article) {
          return <Spinner />
        }

        const connectionPath = 'article.responses'
        const { edges, pageInfo } = _get(data, connectionPath, {
          edges: {},
          pageInfo: {}
        })

        const loadMore = (params?: { before: string }) => {
          const loadBefore = (params && params.before) || null
          return fetchMore({
            variables: {
              cursor: pageInfo.endCursor,
              before: loadBefore,
              first: RESPONSES_COUNT,
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

        const responseCount = _get(data, 'article.responseCount', 0)
        const responses = filterResponses(
          (edges || []).map(({ node }: { node: any }) => node)
        )

        // real time update with websocket
        useEffect(() => {
          if (data.article.live) {
            subscribeToMore({
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
          if (fragment) {
            const jumpToFragment = () => {
              jump(`#${fragment}`, {
                offset: fragment === UrlFragments.COMMENTS ? -10 : -64
              })
            }
            const element = dom.$(fragment) // !responses.filter(({ id }) => id === parentId).length
            if (!element) {
              loadMore({ before: parentId }).then(jumpToFragment)
            } else {
              jumpToFragment()
            }
          }
        }, [])

        return (
          <section className="comments" id="comments">
            <header>
              <h2>
                <Translate
                  zh_hant={TEXT.zh_hant.response}
                  zh_hans={TEXT.zh_hans.response}
                />
                <span className="count">{responseCount}</span>
              </h2>
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

            <section>
              <CommentForm
                articleId={data.article.id}
                articleMediaHash={data.article.mediaHash}
                submitCallback={refetch}
              />
            </section>

            <section className="all-comments">
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
                        hasComment
                        inArticle
                        defaultExpand={
                          response.id === parentId && !!descendantId
                        }
                      />
                    )}
                  </li>
                ))}
              </ul>

              {pageInfo.hasNextPage && (
                <LoadMore onClick={loadMore} loading={loading} />
              )}
            </section>

            <style jsx>{styles}</style>
          </section>
        )
      }}
    </Query>
  )
}

export default withRouter(Main)
