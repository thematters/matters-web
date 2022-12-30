import Link from 'next/link'
import { useContext } from 'react'

import { Avatar, ViewerContext } from '~/components'

import { toPath } from '~/common/utils'

import styles from './styles.css'

const MeDigest = () => {
  const viewer = useContext(ViewerContext)

  const viewerPath = toPath({
    page: 'userProfile',
    userName: viewer.userName || '',
  })

  return (
    <section className="me-digest">
      <Link {...viewerPath} legacyBehavior>
        <a className="header">
          <Avatar user={viewer} size="xl" />

          <section className="names">
            <h1 className="display-name">{viewer.displayName}</h1>
            <p className="username">@{viewer.userName}</p>
          </section>
        </a>
      </Link>

      <style jsx>{styles}</style>
    </section>
  );
}

export default MeDigest
