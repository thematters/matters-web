import classNames from 'classnames'
import Link from 'next/link'

import styles from './styles.css'

type LabelSize = 'small' | 'default'

interface LabelProps {
  text: string
  size?: LabelSize
  href?: string
  as?: string
  [key: string]: any
}

/**
 *
 * Usage:
 *
 * ```tsx
 * import Label_LOGO from '~/static/Labels/logo.svg?sprite'
 *
 * // small
 * <Label size="small" text="不要錯過" />
 *
 * // render as <Link>
 * <Label href={PATHS.HOMEPAGE.fs} as={PATHS.HOMEPAGE.url} text="不要錯過" />
 *
 * // render as <a>
 * <Label href={PATHS.HOMEPAGE.fs} as={PATHS.HOMEPAGE.url} text="不要錯過" />
 * ```
 */

export const Label: React.SFC<LabelProps> = ({
  text,

  size = 'default',
  href,
  as,

  className,
  ...restProps
}) => {
  const labelClasses = classNames({
    label: true,
    [size]: true,
    [className]: !!className
  })

  // render as <a>
  if (href && !as) {
    return (
      <>
        <a href={href} className={labelClasses} {...restProps}>
          {text}
        </a>
        <style jsx>{styles}</style>
      </>
    )
  }

  // render as <Link>
  if (href && as) {
    return (
      <>
        <Link href={href} as={as}>
          <a className={labelClasses} {...restProps}>
            {text}
          </a>
        </Link>
        <style jsx>{styles}</style>
      </>
    )
  }

  return (
    <>
      <span className={labelClasses} {...restProps}>
        {text}
      </span>
      <style jsx>{styles}</style>
    </>
  )
}
