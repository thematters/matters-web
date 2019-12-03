import { useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'
import { useContext } from 'react'

import { UnreadFolloweeArticles } from '~/components/GQL/queries/__generated__/UnreadFolloweeArticles'
import UNREAD_FOLLOWEE_ARTICLES from '~/components/GQL/queries/unreadFolloweeArticles'
import { ViewerContext } from '~/components/Viewer'

import { POLL_INTERVAL } from '~/common/enums'

import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import styles from './styles.css'

const Nav = () => {
  const viewer = useContext(ViewerContext)
  const { data } = useQuery<UnreadFolloweeArticles>(UNREAD_FOLLOWEE_ARTICLES, {
    errorPolicy: 'none',
    fetchPolicy: 'network-only',
    skip: !viewer.isAuthed,
    ssr: false,
    pollInterval: POLL_INTERVAL
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

export default Nav
