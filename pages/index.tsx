import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import { ArticleDigest, Placeholder } from '~/components'

const HOME_FEED = gql`
  query HomeFeed {
    viewer {
      recommendation {
        hottest(input: { first: 10 }) {
          edges {
            node {
              title
              author {
                userName
                avatar
              }
              summary
            }
          }
        }
      }
    }
  }
`

export default () => (
  <main className="l-row">
    <article className="l-col-4 l-col-md-5 l-col-lg-8">
      <Placeholder.MattersToday />

      <Query query={HOME_FEED}>
        {({ data, loading, error }) => {
          return <ArticleDigest.Feed />

          if (loading) {
            return <Placeholder.ArticleDigestList />
          }

          if (error) {
            return <span>{JSON.stringify(error)}</span> // TODO
          }

          return <span>{JSON.stringify(data)}</span>
        }}
      </Query>
    </article>

    <aside className="l-col-4 l-col-md-3 l-col-lg-4">
      <Placeholder.Sidebar />
    </aside>
  </main>
)
