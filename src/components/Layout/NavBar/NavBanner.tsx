import React from 'react'
import { FormattedMessage } from 'react-intl'

import MATTY from '@/public/static/images/matty.png'

import styles from './styles.module.css'

const NavBanner: React.FC = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.notificationText}>
        <FormattedMessage id="VKxanK" defaultMessage="Moment Feature is Live" />
        <div className={styles.subText}>
          <FormattedMessage
            id="CjKqYk"
            defaultMessage="Share a story from your life"
          />
          分
        </div>
      </div>
      <img src={MATTY.src} alt="Matty" className={styles.profileIcon} />
    </div>
  )
}

export default NavBanner
