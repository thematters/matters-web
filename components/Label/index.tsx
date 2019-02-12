import classNames from 'classnames'

import styles from './styles.css'

type LabelSize = 'small' | 'default'

interface LabelProps {
  text: string
  size?: LabelSize
  [key: string]: any
}

/**
 *
 * Usage:
 *
 * ```tsx *
 * <Label size="small" text="作者推薦" />
 * ```
 */

export const Label: React.SFC<LabelProps> = ({
  text,

  size = 'default',

  className,
  ...restProps
}) => {
  const labelClasses = classNames({
    label: true,
    [size]: true,
    [className]: !!className
  })

  return (
    <>
      <span className={labelClasses} {...restProps}>
        {text}
      </span>
      <style jsx>{styles}</style>
    </>
  )
}
