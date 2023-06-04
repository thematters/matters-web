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
    <section className={styles['me-digest']}>
      <Link {...viewerPath} legacyBehavior>
        <a className={styles.header}>
          <Avatar user={viewer} size="xl" />

          <section className={styles.names}>
            <h1 className={styles['display-name']}>{viewer.displayName}</h1>
            <p className={styles.username}>@{viewer.userName}</p>
          </section>
        </a>
      </Link>
    </section>
  )
}

export default MeDigest
