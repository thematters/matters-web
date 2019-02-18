import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import { Spinner, Tag } from '~/components'

import { SeachTags } from './__generated__/SeachTags'
import styles from './styles.css'

const SEARCH_TAGS = gql`
  query SeachTags($key: String!) {
    search(input: { key: $key, type: Tag, first: 3 }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Tag {
            ...Tag
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`

const SearchTag = ({ q }: { q: string | string[] }) => {
  const key = q instanceof Array ? q.join(',') : q

  return (
    <section>
      <Query query={SEARCH_TAGS} variables={{ key }}>
        {({ data, loading, error }: QueryResult & { data: SeachTags }) => {
          if (loading) {
            return <Spinner />
          }

          if (error) {
            return <span>{JSON.stringify(error)}</span> // TODO
          }

          return (
            <ul>
              {data.search.edges.map(
                ({ node, cursor }: { node: any; cursor: any }) => (
                  <li key={cursor}>
                    <Tag tag={node} />
                  </li>
                )
              )}
            </ul>
          )
        }}
      </Query>
      <style jsx>{styles}</style>
    </section>
  )
}

export default SearchTag
