import classNames from 'classnames'
import React from 'react'

import { Card } from '~/components'
import { CircleAvatar, CircleAvatarSize } from '~/components/CircleAvatar'
import { UserDigest } from '~/components/UserDigest'

import { toPath } from '~/common/utils'

import Footer, { FooterControls } from './Footer'
import styles from './styles.css'

// import { CircleDigestRichCirclePublic } from './__generated__/CircleDigestRichCirclePublic'

export type CircleDigestRichControls = {
  onClick?: () => any
  hasOwner?: boolean
  hasFooter?: boolean
} & FooterControls

export type CircleDigestRichProps = {
  // circle: CircleDigestRichCirclePublic
  circle: any
  avatarSize?: CircleAvatarSize
} & CircleDigestRichControls

const CircleDigestRich = ({
  circle,

  avatarSize = 'xxl',

  onClick,

  hasOwner = true,
  hasFooter,

  ...controls
}: CircleDigestRichProps) => {
  const { displayName, description, owner } = circle
  const path = toPath({
    page: 'circleDetail',
    circle,
  })

  const containerClasses = classNames({
    container: true,
  })

  return (
    <Card {...path} spacing={['base', 'base']} onClick={onClick}>
      <section className={containerClasses}>
        <section className="content">
          <CircleAvatar circle={circle} size={avatarSize} />

          <header>
            <h3>{displayName}</h3>

            {hasOwner && (
              <UserDigest.Mini
                user={owner}
                avatarSize="sm"
                textSize="sm"
                nameColor="grey-darker"
                hasAvatar
                hasDisplayName
              />
            )}
          </header>
        </section>

        {description && <p className="description">{description}</p>}

        {hasFooter && <Footer circle={circle} {...controls} />}

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

// TODO: Memoizing

export default CircleDigestRich

// CircleDigestRich.fragments = fragments
