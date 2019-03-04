import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

import styles from './styles.css'

interface ContentProps {
  spacing?: 'none' | 'small' | 'default'
  layout?: 'full-width' | 'default'
}

const Content: React.FC<ContentProps> = ({
  children,
  spacing = 'default',
  layout = 'default'
}) => {
  const containerClasses = classNames({
    [spacing]: true
  })
  const layoutClasses = classNames({
    'l-col-4 l-col-sm-6 l-offset-sm-1 l-col-lg-8 l-offset-lg-2':
      layout === 'default',
    'l-col-4 l-col-sm-8 l-col-lg-12': layout === 'full-width'
  })

  const [node, setNode] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (node) {
      disableBodyScroll(node)
    }
    return () => {
      if (node) {
        enableBodyScroll(node)
      }
    }
  })

  return (
    <section ref={setNode} className={containerClasses}>
      <div className={layoutClasses}>{children}</div>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Content
