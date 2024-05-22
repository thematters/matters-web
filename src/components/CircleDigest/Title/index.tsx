import classNames from 'classnames'

import { TEST_ID } from '~/common/enums'
import { capitalizeFirstLetter, toPath } from '~/common/utils'
import { LinkWrapper, LinkWrapperProps } from '~/components'
import { DigestTitleCircleFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

export type CircleDigestTitleTextSize = 12 | 16
export type CircleDigestTitleTextWeight = 'normal' | 'medium'
export type CircleDigestTitleIs = 'h2' | 'span'

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

  textSize = 16,
  textWeight = 'medium',
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
    [styles.title]: is === 'h2',
    [styles[`text${textSize}`]]: !!textSize,
    [styles[`font${capitalizeFirstLetter(textWeight)}`]]: !!textWeight,
  })

  return (
    <LinkWrapper
      {...path}
      textActiveColor={!disabled ? 'green' : undefined}
      disabled={disabled}
      onClick={onClick}
      testId={TEST_ID.DIGEST_CIRCLE_TITLE}
    >
      <>{is === 'h2' && <h2 className={titleClasses}>{displayName}</h2>}</>
      <>
        {is === 'span' && <span className={titleClasses}>{displayName}</span>}
      </>
    </LinkWrapper>
  )
}

CircleDigestTitle.fragments = fragments

export default CircleDigestTitle
