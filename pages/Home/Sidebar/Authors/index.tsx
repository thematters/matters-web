import gql from 'graphql-tag'
import { Query, QueryResult } from 'react-apollo'

import {
  Icon,
  Label,
  Spinner,
  TextIcon,
  Translate,
  UserDigest
} from '~/components'
import ViewAllLink from '../ViewAllLink'

import ICON_RELOAD from '~/static/icons/reload.svg?sprite'
import { SidebarAuthors } from './__generated__/SidebarAuthors'
import styles from './styles.css'

const ShuffleButton = ({ onClick }: { onClick: () => void }) => (
  <button className="shuffle-button" type="button" onClick={onClick}>
    <TextIcon
      icon={
        <Icon
          id={ICON_RELOAD.id}
          viewBox={ICON_RELOAD.viewBox}
          style={{ width: 14, height: 14 }}
        />
      }
      color="grey"
    >
      <Translate zh_hant="換一批" zh_hans="换一批" />
    </TextIcon>
  </button>
)

const SIDEBAR_AUTHORS = gql`
  query SidebarAuthors {
    viewer {
      id
      recommendation {
        authors(input: { first: 5, filter: { random: true } }) {
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
    <Query query={SIDEBAR_AUTHORS} notifyOnNetworkStatusChange>
      {({
        data,
        loading,
        error,
        refetch
      }: QueryResult & { data: SidebarAuthors }) => {
        if (error) {
          return <span>{JSON.stringify(error)}</span> // TODO
        }

        return (
          <>
            <header>
              <Label>
                <Translate zh_hant="活躍作者" zh_hans="活跃作者" />
              </Label>

              <div>
                <ShuffleButton onClick={() => refetch()} />
                <ViewAllLink type="authors" />
              </div>
            </header>

            {loading && <Spinner />}

            {!loading && (
              <ul>
                {data.viewer.recommendation.authors.edges.map(
                  ({ node, cursor }: { node: any; cursor: any }) => (
                    <li key={cursor}>
                      <UserDigest.FullDesc user={node} nameSize="small" />
                    </li>
                  )
                )}
              </ul>
            )}
          </>
        )
      }}
    </Query>
    <style jsx>{styles}</style>
  </>
)
