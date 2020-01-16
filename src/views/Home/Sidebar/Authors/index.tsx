import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  Label,
  ShuffleButton,
  Spinner,
  Translate,
  UserDigest
} from '~/components'
import { QueryError } from '~/components/GQL'

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
        authors(
          input: { first: 5, filter: { random: true, followed: false } }
        ) {
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

const Authors = () => {
  const { data, loading, error, refetch } = useQuery<SidebarAuthors>(
    SIDEBAR_AUTHORS,
    {
      notifyOnNetworkStatusChange: true
    }
  )
  const edges = data?.viewer?.recommendation.authors.edges

  if (error) {
    return <QueryError error={error} />
  }

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
              analytics.trackEvent(ANALYTICS_EVENTS.SHUFFLE_AUTHOR, {
                type: FEED_TYPE.AUTHORS
              })
            }}
          />
          <ViewAllLink type="authors" />
        </div>
      </header>

      {loading && <Spinner />}

      {!loading && (
        <ul>
          {edges.map(({ node, cursor }, i) => (
            <li
              key={cursor}
              onClick={() =>
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                  type: FEED_TYPE.AUTHORS,
                  location: i
                })
              }
            >
              <UserDigest.FullDesc user={node} nameSize="sm" />
            </li>
          ))}
        </ul>
      )}

      <style jsx>{styles}</style>
    </>
  )
}

export default Authors
