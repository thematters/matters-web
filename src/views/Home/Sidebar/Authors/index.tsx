import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { List, Spinner, UserDigest } from '~/components'
import { QueryError } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import SidebarHeader from '../SidebarHeader'

import { SidebarAuthors } from './__generated__/SidebarAuthors'

const SIDEBAR_AUTHORS = gql`
  query SidebarAuthors {
    viewer {
      id
      recommendation {
        authors(
          input: { first: 5, filter: { random: true, followed: false } }
        ) {
          edges {
            cursor
            node {
              ...UserDigestRichUser
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user}
`

const Authors = () => {
  const { data, loading, error } = useQuery<SidebarAuthors>(SIDEBAR_AUTHORS, {
    notifyOnNetworkStatusChange: true
  })
  const edges = data?.viewer?.recommendation.authors.edges

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <section>
      <SidebarHeader type="authors" />

      {loading && <Spinner />}

      {!loading && (
        <List>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <UserDigest.Rich
                user={node}
                hasFollow
                onClick={() =>
                  analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                    type: FEED_TYPE.AUTHORS,
                    location: i
                  })
                }
              />
            </List.Item>
          ))}
        </List>
      )}
    </section>
  )
}

export default Authors
