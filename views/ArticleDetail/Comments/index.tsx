import gql from 'graphql-tag'
import _get from 'lodash/get'
import _merge from 'lodash/merge'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { QueryResult } from 'react-apollo'

import { LoadMore, Spinner, Translate } from '~/components'
import { CommentDigest } from '~/components/CommentDigest'
import EmptyComment from '~/components/Empty/EmptyComment'
import CommentForm from '~/components/Form/CommentForm'
import { Query } from '~/components/GQL'
import { ArticleDetailComments } from '~/components/GQL/fragments/article'
import { ArticleComments as ArticleCommentsType } from '~/components/GQL/queries/__generated__/ArticleComments'
import ARTICLE_COMMENTS from '~/components/GQL/queries/articleComments'
import { useScrollTo } from '~/components/Hook'

import { TEXT, UrlFragments } from '~/common/enums'
import { filterComments, getQuery, mergeConnections } from '~/common/utils'

import styles from './styles.css'

const SUBSCRIBE_COMMENTS = gql`
  subscription ArticleCommentAdded(
    $id: ID!
    $first: Int!
    $cursor: String
    $hasDescendantComments: Boolean = true
    $before: String
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

const Main = () => {
  const router = useRouter()
  const mediaHash = getQuery({ router, key: 'mediaHash' })
  const uuid = getQuery({ router, key: 'post' })

  let fragment = ''
  let before = null
  if (process.browser) {
    fragment = window.location.hash.replace('#', '')
    before = fragment === UrlFragments.COMMENTS ? null : fragment
  }

  if (!mediaHash && !uuid) {
    return <EmptyComment />
  }

  return (
    <Query
      query={ARTICLE_COMMENTS}
      variables={{
        mediaHash,
        uuid,
        first: before ? null : 8,
        before: before || undefined,
        includeBefore: !!before
      }}
      errorPolicy="none"
      notifyOnNetworkStatusChange
    >
      {({
        data,
        loading,
        fetchMore,
        subscribeToMore,
        refetch
      }: QueryResult & { data: ArticleCommentsType }) => {
        if (!data || !data.article) {
          return <Spinner />
        }

        const connectionPath = 'article.comments'
        const { edges, pageInfo } = _get(data, connectionPath, {})
        const loadMore = () =>
          fetchMore({
            variables: {
              cursor: pageInfo.endCursor,
              before: null,
              first: 8
            },
            updateQuery: (previousResult, { fetchMoreResult }) =>
              mergeConnections({
                oldData: previousResult,
                newData: fetchMoreResult,
                path: connectionPath
              })
          })

        const filteredAllComments = filterComments(
          (edges || []).map(({ node }: { node: any }) => node)
        )

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
              </h2>
            </header>

            <section>
              <CommentForm
                articleId={data.article.id}
                articleMediaHash={data.article.mediaHash}
                submitCallback={refetch}
              />
            </section>

            <section className="all-comments">
              {!filteredAllComments ||
                (filteredAllComments.length <= 0 && <EmptyComment />)}

              <ul>
                {filteredAllComments.map(comment => (
                  <li key={comment.id}>
                    <CommentDigest.Feed
                      comment={comment}
                      hasComment
                      inArticle
                    />
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
