import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Error,
  Label,
  Placeholder,
  Translate
} from '~/components'

import { SidebarIcymi } from './__generated__/SidebarIcymi'

const SIDEBAR_ICYMI = gql`
  query SidebarIcymi {
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
  <Query query={SIDEBAR_ICYMI}>
    {({ data, loading, error }: QueryResult & { data: SidebarIcymi }) => {
      if (loading) {
        return <Placeholder.Sidebar />
      }

      if (error) {
        return <Error error={error} />
      }

      const edges = _get(data, 'viewer.recommendation.icymi.edges', [])

      if (edges.length <= 0) {
        return null
      }

      return (
        <>
          <header>
            <Label>
              <Translate zh_hant="不要錯過" zh_hans="不要错过" />
            </Label>
          </header>

          <ul>
            {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
              <li key={cursor}>
                <ArticleDigest.Sidebar article={node} />
              </li>
            ))}
          </ul>
        </>
      )
    }}
  </Query>
)
