import classNames from 'classnames'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
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

const CircleDigestUserProfile = ({
  circle,
  hasDescription = true,
  hasFooter = true,
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
    <section
      className={containerClasses}
      data-test-id={TEST_ID.DIGEST_CIRCLE_USER_PROFILE}
    >
      <header className={styles.header}>
        <Button {...path} textColor="green" textActiveColor="greenDark">
          {!hasDescription && !hasFooter && (
            <FormattedMessage
              defaultMessage="Circle："
              id="5iii3x"
              description="src/components/CircleDigest/UserProfile/index.tsx"
            />
          )}
          <span className={styles.name}>{displayName}</span>
        </Button>
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

CircleDigestUserProfile.fragments = fragments

export default CircleDigestUserProfile
