import React from 'react'

import MATTY from '@/public/static/images/matty.png'

import styles from './styles.module.css'

const NavBanner: React.FC = () => {
  return (
    <div className={styles.banner}>
      <div className={styles['notification-text']}>
        短動態上線囉！
        <div className={styles['sub-text']}>分享今天開心或難過的小故事吧</div>
      </div>
      <img src={MATTY.src} alt="Matty" className={styles['profile-icon']} />
    </div>
  )
}

export default NavBanner
