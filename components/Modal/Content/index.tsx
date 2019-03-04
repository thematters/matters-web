import classNames from 'classnames'

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

  return (
    <section className={containerClasses}>
      <div className={layoutClasses}>{children}</div>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Content
