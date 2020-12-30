import classNames from 'classnames'
import React from 'react'

import { Card, CircleAvatar } from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { toPath } from '~/common/utils'

import Footer, { FooterControls } from './Footer'
import styles from './styles.css'

// import { CircleDigestRichCirclePublic } from './__generated__/CircleDigestRichCirclePublic'

export type CircleDigestRichControls = {
  onClick?: () => any
  hasFooter?: boolean
} & FooterControls

export type CircleDigestRichProps = {
  // circle: CircleDigestRichCirclePublic
  circle: any
} & CircleDigestRichControls

const CircleDigestRich = ({
  circle,

  onClick,

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
          <CircleAvatar circle={circle} size="xxl" />

          <header>
            <h3>{displayName}</h3>

            <UserDigest.Mini
              user={owner}
              avatarSize="sm"
              textSize="sm"
              nameColor="grey-darker"
              hasAvatar
              hasDisplayName
            />
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
