import classNames from 'classnames'

import { Icon, TextIcon } from '~/components'

import ICON_HASHTAG from '~/static/icons/hashtag.svg?sprite'
import styles from './styles.css'

type TagSize = 'small' | 'default'

interface TagProps {
  size?: TagSize
  text: string
  count?: number
  [key: string]: any
}

/**
 *
 * Usage:
 *
 * ```tsx *
 * <Link href="/" as="/">
 *   <a className="u-link-color">
 *     <Tag text="大屠杀" size="small" count={200} />
 *   </a>
 * </Link>
 * ```
 */

export const Tag: React.SFC<TagProps> = ({
  size = 'default',

  text,
  count,

  className,
  ...restProps
}) => {
  const tagClasses = classNames({
    tag: true,
    [size]: true,
    [className]: !!className
  })
  const isSmall = size !== 'default'

  return (
    <>
      <span className={tagClasses} {...restProps}>
        <TextIcon
          icon={
            <Icon
              size={isSmall ? 'xsmall' : 'small'}
              id={ICON_HASHTAG.id}
              viewBox={ICON_HASHTAG.viewBox}
            />
          }
          text={text}
          weight="medium"
          size={isSmall ? 'sm' : 'md'}
          spacing={isSmall ? 'xtight' : 'tight'}
        />

        {count && <span className="count">{count}</span>}
      </span>
      <style jsx>{styles}</style>
    </>
  )
}
