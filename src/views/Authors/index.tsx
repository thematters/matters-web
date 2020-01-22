import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  Footer,
  Head,
  InfiniteScroll,
  List,
  PageHeader,
  Spinner,
  Translate,
  UserDigest
} from '~/components'
import EmptyWarning from '~/components/Empty/EmptyWarning'
import { QueryError } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics, mergeConnections } from '~/common/utils'

import styles from './styles.css'

import { AllAuthors } from './__generated__/AllAuthors'

const ALL_AUTHORSS = gql`
  query AllAuthors($after: String) {
    viewer {
      id
      recommendation {
        authors(input: { first: 10, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...UserDigestRichUser
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user}
`

const Authors = () => {
  const { data, loading, error, fetchMore } = useQuery<AllAuthors>(ALL_AUTHORSS)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.recommendation.authors'
  const { edges, pageInfo } = data?.viewer?.recommendation.authors || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <EmptyWarning
        description={<Translate zh_hant="還沒有作者" zh_hans="还没有作者" />}
      />
    )
  }

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.ALL_AUTHORS,
      location: edges.length
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
          dedupe: true
        })
    })
  }

  return (
    <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
      <List>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <UserDigest.Rich
              user={node}
              hasFollow
              onClick={() =>
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                  type: FEED_TYPE.ALL_AUTHORS,
                  location: i
                })
              }
            />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

export default () => {
  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-5 l-col-lg-8">
        <Head
          title={{
            zh_hant: TEXT.zh_hant.allAuthors,
            zh_hans: TEXT.zh_hans.allAuthors
          }}
        />

        <PageHeader
          title={
            <Translate
              zh_hant={TEXT.zh_hant.allAuthors}
              zh_hans={TEXT.zh_hans.allAuthors}
            />
          }
        />

        <section>
          <Authors />
        </section>
      </article>

      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        <Footer />
      </aside>

      <style jsx>{styles}</style>
    </main>
  )
}
