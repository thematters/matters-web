import classNames from 'classnames'
import React from 'react'

import styles from './styles.css'

export const ResponsiveWrapper: React.FC<
  React.PropsWithChildren<{ isInDialog?: boolean }>
> = ({ isInDialog, children }) => {
  const containerClasses = classNames({
    container: true,
    isInDialog: !!isInDialog,
  })
  return (
    <section className={containerClasses}>
      {children}
      <style jsx>{styles}</style>
    </section>
  )
}
