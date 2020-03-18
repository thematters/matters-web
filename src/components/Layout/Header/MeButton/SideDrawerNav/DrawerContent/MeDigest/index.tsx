import Link from 'next/link'
import { useContext } from 'react'

import { Avatar, Translate, ViewerContext } from '~/components'

import { numAbbr, toPath } from '~/common/utils'

import styles from './styles.css'

const MeDigest = () => {
  const viewer = useContext(ViewerContext)

  const viewerPath = toPath({
    page: 'userProfile',
    userName: viewer.userName || ''
  })
  const viewerFollowersPath = toPath({
    page: 'userFollowers',
    userName: viewer.userName || ''
  })
  const viewerFolloweesPath = toPath({
    page: 'userFollowees',
    userName: viewer.userName || ''
  })

  return (
    <section className="me-digest">
      <Link {...viewerPath}>
        <a className="header">
          <Avatar user={viewer} size="xl" />

          <section className="names">
            <h1 className="display-name">{viewer.displayName}</h1>
            <p className="username">@{viewer.userName}</p>
          </section>
        </a>
      </Link>

      <footer>
        <Link {...viewerFollowersPath}>
          <a>
            <span className="count">
              {numAbbr(viewer.followers.totalCount)}
            </span>
            <Translate id="follower" />
          </a>
        </Link>

        <Link {...viewerFolloweesPath}>
          <a>
            <span className="count">
              {numAbbr(viewer.followees.totalCount)}
            </span>
            <Translate id="following" />
          </a>
        </Link>
      </footer>

      <style jsx>{styles}</style>
    </section>
  )
}

export default MeDigest
