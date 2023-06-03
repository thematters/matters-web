import classNames from 'classnames'

import { toPath } from '~/common/utils'
import { LinkWrapper, LinkWrapperProps } from '~/components'
import { DigestTitleCircleFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

export type CircleDigestTitleTextSize = 'xs' | 'md'
export type CircleDigestTitleTextWeight = 'normal' | 'md'
export type CircleDigestTitleIs = 'h2'

type CircleDigestTitleProps = {
  circle: DigestTitleCircleFragment

  textSize?: CircleDigestTitleTextSize
  textWeight?: CircleDigestTitleTextWeight
  is?: CircleDigestTitleIs

  disabled?: boolean
  onClick?: () => void
} & Pick<LinkWrapperProps, 'onClick'>

const CircleDigestTitle = ({
  circle,

  textSize = 'md',
  textWeight = 'md',
  is = 'h2',

  disabled,
  onClick,
}: CircleDigestTitleProps) => {
  const { displayName } = circle
  const path = toPath({
    page: 'circleDetail',
    circle,
  })
  const titleClasses = classNames({
    title: true,
    [`text-size-${textSize}`]: !!textSize,
    [`text-weight-${textWeight}`]: !!textWeight,
  })

  return (
    <LinkWrapper
      {...path}
      textActiveColor={!disabled ? 'green' : undefined}
      disabled={disabled}
      onClick={onClick}
    >
      <>{is === 'h2' && <h2 className={titleClasses}>{displayName}</h2>}</>
    </LinkWrapper>
  )
}

CircleDigestTitle.fragments = fragments

export default CircleDigestTitle
