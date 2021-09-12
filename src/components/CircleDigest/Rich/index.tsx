import classNames from 'classnames'
import React from 'react'

import { Card, CardProps } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { toPath } from '~/common/utils'

import Footer, { FooterControls } from './Footer'
import { fragments } from './gql'
import styles from './styles.css'

import { DigestRichCirclePrivate } from './__generated__/DigestRichCirclePrivate'
import { DigestRichCirclePublic } from './__generated__/DigestRichCirclePublic'

export type CircleDigestRichControls = {
  hasFooter?: boolean
  hasDescription?: boolean

  disabled?: boolean
} & FooterControls

export type CircleDigestRichProps = {
  circle: DigestRichCirclePublic & Partial<DigestRichCirclePrivate>
  textSize?: 'md-s' | 'xm'
} & CircleDigestRichControls &
  CardProps

const Rich = ({
  circle,

  textSize = 'xm',

  hasFooter,
  hasDescription = true,
  hasSubscribe,

  disabled,
  onClickSubscribe,

  ...cardProps
}: CircleDigestRichProps) => {
  const { description, owner } = circle
  const path = toPath({
    page: 'userProfile',
    userName: owner.userName || '',
  })

  const containerClasses = classNames({
    container: true,
  })

  return (
    <Card
      href={disabled ? undefined : path.href}
      spacing={['base', 'base']}
      {...cardProps}
    >
      <section className={containerClasses}>
        <section className="content">
          <header>
            <UserDigest.Mini
              user={owner}
              avatarSize="sm"
              textSize="md-s"
              textWeight="md"
              nameColor="black"
              hasAvatar
              hasDisplayName
              disabled={disabled}
            />
          </header>
        </section>

        {hasDescription && description && (
          <p className="description">{description}</p>
        )}

        {hasFooter && (
          <Footer
            circle={circle}
            hasSubscribe={hasSubscribe}
            onClickSubscribe={onClickSubscribe}
          />
        )}

        <style jsx>{styles}</style>
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
