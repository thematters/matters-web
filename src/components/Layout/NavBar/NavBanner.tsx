import React from 'react'

import MATTY from '@/public/static/images/matty.png'

import styles from './styles.module.css'

const NavBanner: React.FC = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.notificationText}>
        短動態上線囉！
        <div className={styles.subText}>分享今天開心或難過的小故事吧</div>
      </div>
      <img src={MATTY.src} alt="Matty" className={styles.profileIcon} />
    </div>
  )
}

export default NavBanner
