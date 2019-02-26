import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import { Error, Label, Tag, Translate } from '~/components'

import ViewAllLink from '../ViewAllLink'
import { SidebarTags } from './__generated__/SidebarTags'
import styles from './styles.css'

const SIDEBAR_TAGS = gql`
  query SidebarTags($hasDigestTagArticleCount: Boolean = true) {
    viewer {
      id
      recommendation {
        tags(input: { first: 8 }) {
          edges {
            cursor
            node {
              ...DigestTag
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
          return <Error error={error} />
        }

        const edges = _get(data, 'viewer.recommendation.tags.edges', [])

        if (edges.length <= 0) {
          return null
        }

        return (
          <>
            <header>
              <Label>
                <Translate zh_hant="標籤" zh_hans="标签" />
              </Label>
              <ViewAllLink type="tags" />
            </header>

            <ul>
              {edges.map(({ node, cursor }: { node: any; cursor: any }) => (
                <li key={cursor}>
                  <Tag tag={node} size="small" type="count-fixed" />
                </li>
              ))}
            </ul>
          </>
        )
      }}
    </Query>
    <style jsx>{styles}</style>
  </>
)
