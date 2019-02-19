import gql from 'graphql-tag'
import { Query, QueryResult } from 'react-apollo'

import { Label, Tag } from '~/components'
import ViewAllLink from '../ViewAllLink'

import { SidebarTags } from './__generated__/SidebarTags'
import styles from './styles.css'

const SIDEBAR_TAGS = gql`
  query SidebarTags {
    viewer {
      id
      recommendation {
        tags(input: { first: 8 }) {
          edges {
            cursor
            node {
              ...Tag
            }
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`

export default () => (
  <>
    <Query query={SIDEBAR_TAGS}>
      {({ data, loading, error }: QueryResult & { data: SidebarTags }) => {
        if (error) {
          return <span>{JSON.stringify(error)}</span> // TODO
        }

        return (
          <>
            <header>
              <Label>標簽</Label>
              <ViewAllLink type="tags" />
            </header>

            <ul>
              {data.viewer.recommendation.tags.edges.map(
                ({ node, cursor }: { node: any; cursor: any }) => (
                  <li key={cursor}>
                    <Tag tag={node} size="small" type="count-fixed" />
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
