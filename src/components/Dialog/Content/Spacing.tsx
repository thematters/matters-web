import React from 'react'

import styles from './styles.module.css'

const DialogContentSpacing: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <section className={styles.spacing}>{children}</section>
}

export default DialogContentSpacing
