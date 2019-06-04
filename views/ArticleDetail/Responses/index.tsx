import gql from 'graphql-tag'
import _get from 'lodash/get'
import _has from 'lodash/has'
import _merge from 'lodash/merge'
import { withRouter, WithRouterProps } from 'next/router'
import { useEffect, useState } from 'react'
import { QueryResult } from 'react-apollo'

import { LoadMore, Translate } from '~/components'
import { ArticleDigest } from '~/components/ArticleDigest'
import { CommentDigest } from '~/components/CommentDigest'
import EmptyComment from '~/components/Empty/EmptyComment'
import CommentForm from '~/components/Form/CommentForm'
import { Query } from '~/components/GQL'
import { ArticleDetailComments } from '~/components/GQL/fragments/article'
import { ArticleResponses as ArticleResponsesType } from '~/components/GQL/queries/__generated__/ArticleResponses'
import ARTICLE_RESPONSES from '~/components/GQL/queries/articleResponses'
import { useScrollTo } from '~/components/Hook'
import { Switch } from '~/components/Switch'

import { TEXT, UrlFragments } from '~/common/enums'
import { filterResponses, getQuery, mergeConnections } from '~/common/utils'

import styles from './styles.css'

const SUBSCRIBE_COMMENTS = gql`
  subscription ArticleCommentAdded(
    $id: ID!
    $before: String
    $cursor: String
    $first: Int!
    $hasDescendantComments: Boolean = true
    $includeAfter: Boolean
    $includeBefore: Boolean
  ) {
    nodeEdited(input: { id: $id }) {
      id
      ... on Article {
        id
        ...ArticleDetailComments
      }
    }
  }
  ${ArticleDetailComments}
`

const Main: React.FC<WithRouterProps> = ({ router }) => {
  const mediaHash = getQuery({ router, key: 'mediaHash' })
  const uuid = getQuery({ router, key: 'post' })
  const [articleOnlyMode, setArticleOnlyMode] = useState<boolean>(false)

  let fragment = ''
  let before = null
  if (process.browser) {
    fragment = window.location.hash.replace('#', '')
    before = fragment === UrlFragments.COMMENTS ? null : fragment
  }

  if (!mediaHash && !uuid) {
    return <EmptyComment />
  }

  const queryVariables = {
    mediaHash,
    uuid,
    before: before || undefined,
    first: before ? null : 8,
    includeBefore: !!before,
    articleOnly: articleOnlyMode
  }

  return (
    <Query
      query={ARTICLE_RESPONSES}
      variables={queryVariables}
      errorPolicy="none"
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
          return null
        }

        const connectionPath = 'article.responses'
        const { totalCount, edges, pageInfo } = _get(data, connectionPath, {
          totalCount: 0,
          edges: {},
          pageInfo: {}
        })
        const loadMore = () =>
          fetchMore({
            variables: {
              cursor: pageInfo.endCursor,
              before: null,
              first: 8,
              articleOnly: articleOnlyMode
            },
            updateQuery: (previousResult, { fetchMoreResult }) =>
              mergeConnections({
                oldData: previousResult,
                newData: fetchMoreResult,
                path: connectionPath
              })
          })

        const responses = filterResponses(
          (edges || []).map(({ node }: { node: any }) => node)
        )

        const changeMode = () => setArticleOnlyMode(!articleOnlyMode)

        useEffect(() => {
          if (data.article.live) {
            subscribeToMore({
              document: SUBSCRIBE_COMMENTS,
              variables: { id: data.article.id, first: edges.length },
              updateQuery: (prev, { subscriptionData }) =>
                _merge(prev, {
                  article: subscriptionData.data.nodeEdited
                })
            })
          }
        })

        const getScrollOptions = (param: string) => {
          switch (param) {
            case 'comments': {
              return { offset: -10 }
            }
            default: {
              return { offset: -80 }
            }
          }
        }

        useScrollTo({
          enable: !!fragment,
          selector: `#${fragment}`,
          trigger: [router],
          ...getScrollOptions(fragment)
        })

        return (
          <section className="comments" id="comments">
            <header>
              <h2>
                <Translate
                  zh_hant={TEXT.zh_hant.response}
                  zh_hans={TEXT.zh_hans.response}
                />
                <span className="count">{totalCount}</span>
              </h2>
              <div className="switch">
                <Switch
                  onChange={changeMode}
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
                refetch
              />
            </section>

            <section className="all-comments">
              {!responses || (responses.length <= 0 && <EmptyComment />)}
              <ul>
                {responses.map(response => (
                  <li key={response.id}>
                    {_has(response, 'title') ? (
                      <ArticleDigest.Response
                        article={response}
                        hasDateTime
                        hasBookmark
                      />
                    ) : (
                      <CommentDigest.Feed
                        comment={response}
                        hasComment
                        inArticle
                      />
                    )}
                  </li>
                ))}
              </ul>

              {pageInfo.hasNextPage && (
                <LoadMore onClick={() => loadMore()} loading={loading} />
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
