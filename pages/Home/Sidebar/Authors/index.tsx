import gql from 'graphql-tag'
import _get from 'lodash/get'
import { QueryResult } from 'react-apollo'

import {
  Label,
  ShuffleButton,
  Spinner,
  Translate,
  UserDigest
} from '~/components'
import { Query } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import ViewAllLink from '../ViewAllLink'
import { SidebarAuthors } from './__generated__/SidebarAuthors'
import styles from './styles.css'

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
        const edges = _get(data, 'viewer.recommendation.authors.edges', [])

        if (!edges || edges.length <= 0) {
          return null
        }

        return (
          <>
            <header>
              <Label>
                <Translate zh_hant="活躍作者" zh_hans="活跃作者" />
              </Label>

              <div>
                <ShuffleButton
                  onClick={() => {
                    refetch()
                    analytics.trackEvent(ANALYTICS_EVENTS.SHUFFLE_AUTHOR)
                  }}
                />
                <ViewAllLink type="authors" />
              </div>
            </header>

            {loading && <Spinner />}

            {!loading && (
              <ul>
                {edges.map(
                  ({ node, cursor }: { node: any; cursor: any }, i: number) => (
                    <li
                      key={cursor}
                      onClick={() =>
                        analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                          type: FEED_TYPE.AUTHOR,
                          location: i
                        })
                      }
                    >
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
