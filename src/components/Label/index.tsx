import classNames from 'classnames'

import styles from './styles.css'

type LabelSize = 'sm' | 'default'

interface LabelProps {
  size?: LabelSize
  style?: React.CSSProperties
}

/**
 *
 * Usage:
 *
 * ```tsx *
 * <Label size="sm">作者推薦</Label>
 * ```
 */

export const Label: React.FC<LabelProps> = ({
  size = 'default',
  children,
  style
}) => {
  const labelClasses = classNames({
    label: true,
    [size]: true
  })

  return (
    <span className={labelClasses} style={style}>
      {children}

      <style jsx>{styles}</style>
    </span>
  )
}
