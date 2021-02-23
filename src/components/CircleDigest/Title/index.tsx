import classNames from 'classnames'

import { LinkWrapper, LinkWrapperProps } from '~/components'

import { toPath } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { DigestTitleCircle } from './__generated__/DigestTitleCircle'

export type CircleDigestTitleTextSize = 'md'
export type CircleDigestTitleTextWeight = 'md'
export type CircleDigestTitleIs = 'h2'

type CircleDigestTitleProps = {
  circle: DigestTitleCircle

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
      <>
        {is === 'h2' && <h2 className={titleClasses}>{displayName}</h2>}
        <style jsx>{styles}</style>
      </>
    </LinkWrapper>
  )
}

CircleDigestTitle.fragments = fragments

export default CircleDigestTitle
