import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useQuery } from 'react-apollo'

import {
  ArticleDigest,
  Footer,
  Head,
  InfiniteScroll,
  PageHeader,
  Placeholder
} from '~/components'
import EmptyTag from '~/components/Empty/EmptyTag'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import { TagDetailArticles } from './__generated__/TagDetailArticles'

const TAG_DETAIL = gql`
  query TagDetailArticles(
    $id: ID!
    $after: String
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        content
        articles(input: { first: 10, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...FeedDigestArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Feed.fragments.article}
`

const TagDetail = () => {
  const router = useRouter()

  const { data, loading, fetchMore } = useQuery<TagDetailArticles>(TAG_DETAIL, {
    variables: { id: router.query.id }
  })

  if (loading) {
    return <Placeholder.ArticleDigestList />
  }

  if (!data || !data.node || data.node.__typename !== 'Tag') {
    return <EmptyTag />
  }

  const id = data.node.id
  const connectionPath = 'node.articles'
  const { edges, pageInfo } = data.node.articles || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyTag />
  }

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.TAG_DETAIL,
      location: edges.length,
      entrance: id
    })
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
    <>
      <Head title={`#${data.node.content}`} />

      <PageHeader pageTitle={data.node.content} />

      <section>
        <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
          <ul>
            {edges.map(({ node, cursor }, i) => (
              <li
                key={cursor}
                onClick={() =>
                  analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                    type: FEED_TYPE.TAG_DETAIL,
                    location: i,
                    entrance: id
                  })
                }
              >
                <ArticleDigest.Feed article={node} hasDateTime hasBookmark />
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      </section>
    </>
  )
}

export default () => {
  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-5 l-col-lg-8">
        <TagDetail />
      </article>

      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        <Footer />
      </aside>
    </main>
  )
}
