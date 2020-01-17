import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { List, LoadMore, Spinner, Translate } from '~/components'

import { TEXT } from '~/common/enums'
import { filterComments, getQuery, mergeConnections } from '~/common/utils'

import ArticleComment from './ArticleComment'
import styles from './styles.css'

import {
  ArticleFeaturedComments,
  ArticleFeaturedComments_article_featuredComments_edges_node
} from './__generated__/ArticleFeaturedComments'

const FEATURED_COMMENTS = gql`
  query ArticleFeaturedComments(
    $mediaHash: String
    $after: String
    $first: Int = 10
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
            ...ArticleCommentComment
          }
        }
      }
    }
  }
  ${ArticleComment.fragments.comment}
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
  const { edges, pageInfo } = data?.article?.featuredComments || {}
  const comments = filterComments(
    (edges || []).map(({ node }) => node)
  ) as ArticleFeaturedComments_article_featuredComments_edges_node[]

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

      <List>
        {comments.map(comment => (
          <List.Item spacing={['base', 0]} key={comment.id}>
            <ArticleComment comment={comment} />
          </List.Item>
        ))}
      </List>

      {pageInfo.hasNextPage && (
        <LoadMore onClick={loadMore} loading={loading} />
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default FeaturedComments
