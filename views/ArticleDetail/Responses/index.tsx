import gql from 'graphql-tag'
import _get from 'lodash/get'
import _has from 'lodash/has'
import _merge from 'lodash/merge'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { QueryResult } from 'react-apollo'

import { Icon, LoadMore, Spinner, Translate } from '~/components'
import { ArticleDigest } from '~/components/ArticleDigest'
import { CommentDigest } from '~/components/CommentDigest'
import EmptyResponse from '~/components/Empty/EmptyResponse'
import CommentForm from '~/components/Form/CommentForm'
import { Mutation, Query } from '~/components/GQL'
import { ArticleDetailResponses } from '~/components/GQL/fragments/response'
import { ArticleResponses as ArticleResponsesType } from '~/components/GQL/queries/__generated__/ArticleResponses'
import { UnreadResponseInfoPopUp as UnreadResponseInfoPopUpType } from '~/components/GQL/queries/__generated__/UnreadResponseInfoPopUp'
import ARTICLE_RESPONSES from '~/components/GQL/queries/articleResponses'
import UNREAD_RESPONSE_INFO_POP_UP from '~/components/GQL/queries/unreadResponseInfoPopUp'
import { useScrollTo } from '~/components/Hook'
import { Switch } from '~/components/Switch'
import { ViewerContext } from '~/components/Viewer'

import { TEXT, UrlFragments } from '~/common/enums'
import { filterResponses, getQuery, mergeConnections } from '~/common/utils'
import ICON_CLOSE from '~/static/icons/close.svg?sprite'
import ICON_STAR from '~/static/icons/star.svg?sprite'

import styles from './styles.css'

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

const READ_RESPONSE_INFO_POP_UP = gql`
  mutation ReadResponseInfoPopUp {
    logRecord(input: { type: ReadResponseInfoPopUp })
  }
`

const ResponseTip = ({ closeCallback }: { closeCallback?: any }) => (
  <>
    <div className="tip">
      <div className="star">
        <Icon
          id={ICON_STAR.id}
          viewBox={ICON_STAR.viewBox}
          style={{ width: 16, height: 16 }}
        />
      </div>
      <p className="header">
        <Translate zh_hant="評論區域升級啦！" zh_hans="评论区域升级啦！" />
      </p>
      <p>
        <Translate
          zh_hant="現在「回應」包含了評論和關聯本作品的衍生創作，你可以選擇「只看衍生作品」。"
          zh_hans="现在「回应」包含了评论和关联本作品的衍生创作，你可以选择「只看衍生作品」。"
        />
      </p>
      {closeCallback && (
        <div className="close">
          <Icon
            id={ICON_CLOSE.id}
            viewBox={ICON_CLOSE.viewBox}
            style={{ width: 16, height: 16 }}
            onClick={closeCallback}
          />
        </div>
      )}
    </div>
    <style jsx>{styles}</style>
  </>
)

const ResponseTipContainer = () => {
  const viewer = useContext(ViewerContext)

  if (!viewer || !viewer.isAuthed) {
    return <ResponseTip />
  }

  return (
    <Query query={UNREAD_RESPONSE_INFO_POP_UP}>
      {({
        data,
        loading
      }: QueryResult & { data: UnreadResponseInfoPopUpType }) => {
        const path = 'viewer.status'
        const { unreadResponseInfoPopUp } = _get(data, path, {})

        if (unreadResponseInfoPopUp === false) {
          return null
        }

        return (
          <Mutation
            mutation={READ_RESPONSE_INFO_POP_UP}
            refetchQueries={[
              {
                query: UNREAD_RESPONSE_INFO_POP_UP
              }
            ]}
          >
            {readResponseInfoPopUp => (
              <ResponseTip closeCallback={readResponseInfoPopUp} />
            )}
          </Mutation>
        )
      }}
    </Query>
  )
}

const Main = () => {
  const router = useRouter()
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
    return <EmptyResponse articleOnlyMode={articleOnlyMode} />
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
      fetchPolicy="cache-and-network"
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
          return <Spinner />
        }

        const connectionPath = 'article.responses'
        const { edges, pageInfo } = _get(data, connectionPath, {
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
        const { responseCount } = _get(data, 'article', 0)
        const responses = filterResponses(
          (edges || []).map(({ node }: { node: any }) => node)
        )

        const changeMode = () => setArticleOnlyMode(!articleOnlyMode)

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
                <span className="count">{responseCount}</span>
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

            <ResponseTipContainer />

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

export default Main
