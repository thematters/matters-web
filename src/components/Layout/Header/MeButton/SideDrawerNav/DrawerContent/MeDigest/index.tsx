import Link from 'next/link'
import { useContext } from 'react'

import { toPath } from '~/common/utils'
import { Avatar, ViewerContext } from '~/components'

import styles from './styles.module.css'

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
    </section>
  )
}

export default MeDigest
