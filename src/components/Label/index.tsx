import classNames from 'classnames'

import styles from './styles.module.css'

type LabelSize = 'sm' | 'default'

interface LabelProps {
  size?: LabelSize
}

/**
 *
 * Usage:
 *
 * ```tsx *
 * <Label size="sm">作者推薦</Label>
 * ```
 */

export const Label: React.FC<React.PropsWithChildren<LabelProps>> = ({
  size = 'default',
  children,
}) => {
  const labelClasses = classNames({
    [styles.label]: true,
    [styles[size]]: true,
  })

  return <span className={labelClasses}>{children}</span>
}
