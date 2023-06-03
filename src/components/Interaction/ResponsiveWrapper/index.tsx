import React from 'react'

import styles from './styles.module.css'

export const ResponsiveWrapper: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return <section className={styles['container']}>{children}</section>
}
