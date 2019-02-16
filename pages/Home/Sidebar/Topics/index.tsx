import gql from 'graphql-tag'
import { Query, QueryResult } from 'react-apollo'

import { ArticleDigest, Label } from '~/components'

import { SidebarTopics } from './__generated__/SidebarTopics'
import styles from './styles.css'

const SIDEBAR_TOPICS = gql`
  query SidebarTopics {
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
    <Query query={SIDEBAR_TOPICS}>
      {({ data, loading, error }: QueryResult & { data: SidebarTopics }) => {
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
