import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useQuery } from 'react-apollo'

import { LoadMore, Spinner, Translate } from '~/components'
import { CommentDigest } from '~/components/CommentDigest'
import commentFragments from '~/components/GQL/fragments/comment'

import { TEXT } from '~/common/enums'
import { filterComments, getQuery, mergeConnections } from '~/common/utils'

import { ArticleFeaturedComments } from './__generated__/ArticleFeaturedComments'
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
  const { data, loading, fetchMore } = useQuery<ArticleFeaturedComments>(
    FEATURED_COMMENTS,
    {
      variables: { mediaHash },
      notifyOnNetworkStatusChange: true
    }
  )

  const connectionPath = 'article.featuredComments'
  const { edges, pageInfo } =
    (data && data.article && data.article.featuredComments) || {}
  const comments = filterComments((edges || []).map(({ node }) => node))

  if (loading && !data) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0 || !pageInfo || comments.length <= 0) {
    return null
  }

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
}

export default FeaturedComments
