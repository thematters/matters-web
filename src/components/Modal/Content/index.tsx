import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import classNames from 'classnames'
import { useEffect, useRef } from 'react'

import styles from './styles.css'

interface ContentProps {
  spacing?: 'none' | 'sm' | 'default'
  layout?: 'full-width' | 'default'
  scrollLock?: boolean
}

const Content: React.FC<ContentProps> = ({
  children,
  spacing = 'default',
  layout = 'default',
  scrollLock = true
}) => {
  const node: React.RefObject<HTMLElement> | null = useRef(null)
  const containerClasses = classNames({
    [spacing]: true
  })
  const layoutClasses = classNames({
    'l-col-4 l-col-sm-6 l-offset-sm-1 l-col-lg-8 l-offset-lg-2':
      layout === 'default',
    'l-col-4 l-col-sm-8 l-col-lg-12': layout === 'full-width'
  })

  useEffect(() => {
    if (node?.current && scrollLock) {
      disableBodyScroll(node.current)
    }

    return () => {
      if (node?.current && scrollLock) {
        enableBodyScroll(node.current)
      }
    }
  })

  return (
    <section ref={node} className={containerClasses}>
      <div className={layoutClasses}>{children}</div>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Content
