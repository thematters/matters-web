import gql from 'graphql-tag'
import { Query, QueryResult } from 'react-apollo'

import { Icon, Label, TextIcon } from '~/components'
import { UserDigest } from '~/components/UserDigest'
import ViewAllLink from '../ViewAllLink'

import ICON_RELOAD from '~/static/icons/reload.svg?sprite'
import { SidebarAuthors } from './__generated__/SidebarAuthors'
import styles from './styles.css'

const IconShuffle = () => (
  <Icon
    id={ICON_RELOAD.id}
    viewBox={ICON_RELOAD}
    style={{ width: 14, height: 14 }}
  />
)

const SIDEBAR_AUTHORS = gql`
  query SidebarAuthors {
    viewer {
      id
      recommendation {
        authors(input: { first: 5 }) {
          edges {
            cursor
            node {
              ...UserDigestFullDescUser
            }
          }
        }
      }
    }
  }
  ${UserDigest.FullDesc.fragments.user}
`

export default () => (
  <>
    <Query query={SIDEBAR_AUTHORS}>
      {({ data, loading, error }: QueryResult & { data: SidebarAuthors }) => {
        if (error) {
          return <span>{JSON.stringify(error)}</span> // TODO
        }

        return (
          <>
            <header>
              <Label>活躍作者</Label>

              <div>
                <button
                  className="shuffle-button"
                  type="button"
                  onClick={() => alert('shuffling')}
                >
                  <TextIcon icon={<IconShuffle />} text="換一批" color="grey" />
                </button>
                <ViewAllLink type="authors" />
              </div>
            </header>

            <ul>
              {data.viewer.recommendation.authors.edges.map(
                ({ node, cursor }: { node: any; cursor: any }) => (
                  <li key={cursor}>
                    <UserDigest.FullDesc user={node} nameSize="small" />
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
