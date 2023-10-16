import classNames from 'classnames'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Button, LinkWrapper } from '~/components'
import { DigestUserProfileCircleFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

export type CircleDigestUserProfileProps = {
  circle: DigestUserProfileCircleFragment
  hasDescription?: boolean
  hasFooter?: boolean
}

const UserProfile = ({
  circle,
  hasDescription = true,
  hasFooter = true,
  ...cardProps
}: CircleDigestUserProfileProps) => {
  const { displayName, description } = circle
  const path = toPath({
    page: 'circleDetail',
    circle,
  })

  const containerClasses = classNames({
    [styles.container]: true,
  })

  return (
    <section className={containerClasses}>
      <header className={styles.header}>
        <LinkWrapper {...path}>
          <Button textColor="green" textActiveColor="greenDark">
            {!hasDescription && !hasFooter && (
              <FormattedMessage
                defaultMessage="Circle："
                id="5iii3x"
                description="src/components/CircleDigest/UserProfile/index.tsx"
              />
            )}
            <span className={styles.name}>{displayName}</span>
          </Button>
        </LinkWrapper>
      </header>

      {hasDescription && description && (
        <p className={styles.description}>{description}</p>
      )}

      {hasFooter && (
        <section className={styles.footer}>
          <LinkWrapper {...path}>
            <Button textColor="greyDarker" textActiveColor="green">
              <FormattedMessage
                defaultMessage="Enter Circle"
                id="JaLEXz"
                description="src/components/CircleDigest/UserProfile/index.tsx"
              />
            </Button>
          </LinkWrapper>
        </section>
      )}
    </section>
  )
}

UserProfile.fragments = fragments

export default UserProfile
