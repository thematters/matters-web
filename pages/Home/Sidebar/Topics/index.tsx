import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import { ArticleDigest, Label } from '~/components'

import styles from './styles.css'

const TOPICS = gql`
  query Topics {
    viewer {
      id
      recommendation {
        topics(input: { first: 5 }) {
          edges {
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
      {({ data, loading, error }) => {
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
              {data.viewer.recommendation.topics.edges.map(({ node }) => (
                <li>
                  <ArticleDigest.Sidebar article={node} />
                </li>
              ))}
            </ol>
          </>
        )
      }}
    </Query>
    <style jsx>{styles}</style>
  </>
)
