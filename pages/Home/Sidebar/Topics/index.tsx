import gql from 'graphql-tag'
import { Query, QueryResult } from 'react-apollo'

import { ArticleDigest, Label } from '~/components'

import { Topics } from './__generated__/Topics'
import styles from './styles.css'

const TOPICS = gql`
  query Topics {
    viewer {
      id
      recommendation {
        topics(input: { first: 5 }) {
          edges {
            cursor
            node {
              ...TopicsDigestArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Sidebar.fragments.topics}
`

export default () => (
  <>
    <Query query={TOPICS}>
      {({ data, loading, error }: QueryResult & { data: Topics }) => {
        // if (loading) {
        //   return <Placeholder.Sidebar />
        // }

        if (error) {
          return <span>{JSON.stringify(error)}</span> // TODO
        }

        return (
          <>
            <header>
              <Label>熱議話題</Label>
            </header>

            <ol>
              {data.viewer.recommendation.topics.edges.map(
                ({ node, cursor }: { node: any; cursor: any }) => (
                  <li key={cursor}>
                    <ArticleDigest.Sidebar article={node} />
                  </li>
                )
              )}
            </ol>
          </>
        )
      }}
    </Query>
    <style jsx>{styles}</style>
  </>
)
