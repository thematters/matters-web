import _get from 'lodash/get'
import { useQuery } from 'react-apollo'

import { UnreadFolloweeArticles } from '~/components/GQL/queries/__generated__/UnreadFolloweeArticles'
import UNREAD_FOLLOWEE_ARTICLES from '~/components/GQL/queries/unreadFolloweeArticles'

import { POLL_INTERVAL } from '~/common/enums'

import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import styles from './styles.css'

export default () => {
  const { data } = useQuery<UnreadFolloweeArticles>(UNREAD_FOLLOWEE_ARTICLES, {
    pollInterval: POLL_INTERVAL,
    errorPolicy: 'none',
    fetchPolicy: 'network-only',
    skip: !process.browser
  })
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
}
