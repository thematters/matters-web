import classNames from 'classnames'

import styles from './styles.module.css'

type SpacingProps = {
  hasVertical?: boolean
}

const Spacing: React.FC<React.PropsWithChildren<SpacingProps>> = ({
  hasVertical = true,
  children,
}) => {
  const spacingClasses = classNames({
    [styles.spacing]: true,
    [styles.hasVertical]: hasVertical,
  })

  return <section className={spacingClasses}>{children}</section>
}

export default Spacing
