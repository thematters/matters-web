import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import { ArticleDigest, Label, Placeholder, Title } from '~/components'

import styles from './styles.css'

const ICYMI = gql`
  query Icymi {
    viewer {
      id
      recommendation {
        icymi(input: { first: 5 }) {
          edges {
            cursor
            node {
              ...IcymiDigestArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Sidebar.fragments.icymi}
`

export default () => (
  <>
    <Query query={ICYMI}>
      {({ data, loading, error }) => {
        if (loading) {
          return <Placeholder.Sidebar />
        }

        if (error) {
          return <span>{JSON.stringify(error)}</span> // TODO
        }

        return (
          <>
            <header>
              <Label>不要錯過</Label>
            </header>

            <ul>
              {data.viewer.recommendation.icymi.edges.map(
                ({ node, cursor }: { node: any; cursor: any }) => (
                  <li key={cursor}>
                    <ArticleDigest.Sidebar article={node} />
                  </li>
                )
              )}
            </ul>
          </>
        )
      }}
    </Query>
    <style jsx>{styles}</style>
  </>
)
