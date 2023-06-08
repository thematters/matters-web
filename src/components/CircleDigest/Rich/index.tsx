import classNames from 'classnames'
import React from 'react'

import { capitalizeFirstLetter, toPath } from '~/common/utils'
import {
  Card,
  CardProps,
  CircleAvatar,
  CircleAvatarSize,
  LinkWrapper,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import {
  DigestRichCirclePrivateFragment,
  DigestRichCirclePublicFragment,
} from '~/gql/graphql'

import Footer, { FooterControls } from './Footer'
import { fragments } from './gql'
import styles from './styles.module.css'

export type CircleDigestRichControls = {
  hasOwner?: boolean
  hasFooter?: boolean
  hasDescription?: boolean

  disabled?: boolean
} & FooterControls

export type CircleDigestRichProps = {
  circle: DigestRichCirclePublicFragment &
    Partial<DigestRichCirclePrivateFragment>
  avatarSize?: CircleAvatarSize
  textSize?: 'mdS' | 'xm'
} & CircleDigestRichControls &
  CardProps

const Rich = ({
  circle,

  avatarSize = 'xxl',
  textSize = 'xm',

  hasOwner = true,
  hasFooter,
  hasDescription = true,
  hasPrice,

  disabled,
  onClickPrice,

  ...cardProps
}: CircleDigestRichProps) => {
  const { displayName, description, owner } = circle
  const path = toPath({
    page: 'circleDetail',
    circle,
  })

  const containerClasses = classNames({
    [styles.styles]: true,
  })
  const titleClasses = classNames({
    [styles.title]: true,
    [styles[`textSize${capitalizeFirstLetter(textSize)}`]]: !!textSize,
  })

  return (
    <Card
      href={disabled ? undefined : path.href}
      spacing={['base', 'base']}
      {...cardProps}
    >
      <section className={containerClasses}>
        <section className={styles.content}>
          <CircleAvatar circle={circle} size={avatarSize} />

          <header className={styles.header}>
            <h3 className={titleClasses}>
              <LinkWrapper
                {...path}
                textActiveColor="green"
                disabled={disabled}
              >
                {displayName}
              </LinkWrapper>
            </h3>

            {hasOwner && (
              <UserDigest.Mini
                user={owner}
                avatarSize="sm"
                textSize="sm"
                nameColor="greyDarker"
                hasAvatar
                hasDisplayName
                disabled={disabled}
              />
            )}
          </header>
        </section>

        {hasDescription && description && (
          <p className={styles.description}>{description}</p>
        )}

        {hasFooter && (
          <Footer
            circle={circle}
            hasPrice={hasPrice}
            onClickPrice={onClickPrice}
          />
        )}
      </section>
    </Card>
  )
}

/**
 * Memoizing
 */
type MemoizedRichType = React.MemoExoticComponent<
  React.FC<CircleDigestRichProps>
> & {
  fragments: typeof fragments
}

const MemoizedRich = React.memo(Rich, ({ circle: prevCircle }, { circle }) => {
  return prevCircle.id === circle.id && prevCircle.isMember === circle.isMember
}) as MemoizedRichType

MemoizedRich.fragments = fragments

export default MemoizedRich
