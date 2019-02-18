import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import { Spinner, UserDigest } from '~/components'

import { SeachUsers } from './__generated__/SeachUsers'
import styles from './styles.css'

const SEARCH_USERS = gql`
  query SeachUsers($key: String!) {
    search(input: { key: $key, type: User, first: 3 }) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on User {
            ...UserDigestFullDescUser
          }
        }
      }
    }
  }
  ${UserDigest.FullDesc.fragments.user}
`

const SearchUser = ({ q }: { q: string | string[] }) => {
  const key = q instanceof Array ? q.join(',') : q

  return (
    <section>
      <Query query={SEARCH_USERS} variables={{ key }}>
        {({ data, loading, error }: QueryResult & { data: SeachUsers }) => {
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
                    <UserDigest.FullDesc user={node} />
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

export default SearchUser
