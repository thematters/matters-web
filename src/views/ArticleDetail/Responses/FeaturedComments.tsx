import gql from 'graphql-tag'
import _get from 'lodash/get'
import _has from 'lodash/has'
import _merge from 'lodash/merge'
import { useRouter } from 'next/router'
import { QueryResult } from 'react-apollo'

import { LoadMore, Spinner, Translate } from '~/components'
import { CommentDigest } from '~/components/CommentDigest'
import { Query } from '~/components/GQL'
import commentFragments from '~/components/GQL/fragments/comment'

import { TEXT } from '~/common/enums'
import { filterComments, getQuery, mergeConnections } from '~/common/utils'

import styles from './styles.css'

const FEATURED_COMMENTS = gql`
  query ArticleFeaturedComments(
    $mediaHash: String
    $after: String
    $first: Int = 10
    $hasDescendantComments: Boolean = true
  ) {
    article(input: { mediaHash: $mediaHash }) {
      id
      mediaHash
      featuredComments(input: { first: $first, after: $after }) {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          node {
            ...FeedDigestComment
          }
        }
      }
    }
  }
  ${commentFragments.feed}
`

const FeaturedComments = () => {
  const router = useRouter()
  const mediaHash = getQuery({ router, key: 'mediaHash' })

  if (!mediaHash) {
    return null
  }

  return (
    <Query
      query={FEATURED_COMMENTS}
      variables={{
        mediaHash
      }}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, fetchMore }: QueryResult) => {
        if (!data || !data.article) {
          return <Spinner />
        }

        const connectionPath = 'article.featuredComments'
        const { edges, pageInfo } = _get(data, connectionPath, {
          edges: {},
          pageInfo: {}
        })

        const loadMore = () => {
          return fetchMore({
            variables: {
              after: pageInfo.endCursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) =>
              mergeConnections({
                oldData: previousResult,
                newData: fetchMoreResult,
                path: connectionPath
              })
          })
        }

        const comments = filterComments(
          (edges || []).map(({ node }: { node: any }) => node)
        )

        if (!comments || comments.length <= 0) {
          return null
        }

        return (
          <section className="featured-comments" id="featured-comments">
            <header>
              <h3>
                <Translate
                  zh_hant={TEXT.zh_hant.featuredComments}
                  zh_hans={TEXT.zh_hans.featuredComments}
                />
              </h3>
            </header>

            <ul>
              {comments.map(comment => (
                <li key={comment.id}>
                  <CommentDigest.Feed comment={comment} inArticle hasForm />
                </li>
              ))}
            </ul>

            {pageInfo.hasNextPage && (
              <LoadMore onClick={loadMore} loading={loading} />
            )}

            <style jsx>{styles}</style>
          </section>
        )
      }}
    </Query>
  )
}

export default FeaturedComments
