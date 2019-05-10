import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import { POLL_INTERVAL } from '~/common/enums'

import { UnreadFolloweeArticles } from './__generated__/UnreadFolloweeArticles'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import styles from './styles.css'

const UNREAD_FOLLOWEE_ARTICLES = gql`
  query UnreadFolloweeArticles {
    viewer {
      id
      status {
        unreadFolloweeArticles
      }
    }
  }
`

export default () => (
  <Query
    query={UNREAD_FOLLOWEE_ARTICLES}
    pollInterval={POLL_INTERVAL}
    errorPolicy="none"
    fetchPolicy="network-only"
    skip={!process.browser}
  >
    {({ data }: QueryResult & { data: UnreadFolloweeArticles }) => {
      const unread = !!_get(data, 'viewer.status.unreadFolloweeArticles')

      return (
        <nav>
          <section className="u-sm-up-hide">
            <MobileNav unread={unread} />
          </section>
          <section className="u-sm-down-hide">
            <DesktopNav unread={unread} />
          </section>
          <style jsx>{styles}</style>
        </nav>
      )
    }}
  </Query>
)
