import React from 'react'

import styles from './styles.css'

export const FormWrapper: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <section className="container">
      {children}
      <style jsx>{styles}</style>
    </section>
  )
}
