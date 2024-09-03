import React from 'react'
import { FormattedMessage } from 'react-intl'

import MATTY from '@/public/static/images/matty.png'

import styles from './styles.module.css'

type MomentNavBannerProps = {
  onClick: () => void
}

const MomentNavBanner: React.FC<MomentNavBannerProps> = ({ onClick }) => {
  return (
    <div className={styles.banner} role="button" onClick={onClick}>
      <div className={styles.notificationText}>
        <FormattedMessage id="VKxanK" defaultMessage="Moment Feature is Live" />
        <div className={styles.subText}>
          <FormattedMessage
            id="CjKqYk"
            defaultMessage="Share a story from your life"
          />
        </div>
      </div>
      <img src={MATTY.src} alt="Matty" className={styles.profileIcon} />
    </div>
  )
}

export default MomentNavBanner
