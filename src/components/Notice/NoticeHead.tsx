import classNames from 'classnames'
import { ReactNode } from 'react'

import styles from './styles.css'

const NoticeHead = ({ children }: { children: ReactNode }) => {
  const headWrapClasses = classNames({
    'head-wrap': true,
  })

  return (
    <section className={headWrapClasses}>
      <h4>{children}</h4>
      <style jsx>{styles}</style>
    </section>
  )
}

export default NoticeHead
