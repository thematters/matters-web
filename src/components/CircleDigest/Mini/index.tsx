import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import { toPath } from '~/common/utils'
import { Card, CardProps, CircleAvatar } from '~/components'
import { DigestMiniCircleFragment } from '~/gql/graphql'

import Counts from '../Counts'
import { fragments } from './gql'
import styles from './styles.css'

export type CircleDigestMiniProps = {
  circle: DigestMiniCircleFragment
} & CardProps

const Mini = ({ circle, ...cardProps }: CircleDigestMiniProps) => {
  const { displayName, description } = circle
  const path = toPath({
    page: 'circleDetail',
    circle,
  })

  const containerClasses = classNames({
    container: true,
  })

  return (
    <Card {...path} spacing={[0, 0]} {...cardProps}>
      <section className={containerClasses}>
        <Link {...path} legacyBehavior>
          <a className="avatar">
            <VisuallyHidden>
              <span>{circle.displayName}</span>
            </VisuallyHidden>
            <CircleAvatar circle={circle} size="xl" />
          </a>
        </Link>

        <section className="content">
          <header>
            <Link {...path} legacyBehavior>
              <a className="name">{displayName}</a>
            </Link>

            <section className="info">
              <Counts circle={circle} />
            </section>
          </header>

          {description && <p className="description">{description}</p>}
        </section>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

/**
 * Memoizing
 */
type MemoizedMiniType = React.MemoExoticComponent<
  React.FC<CircleDigestMiniProps>
> & {
  fragments: typeof fragments
}

const MemoizedMini = React.memo(Mini, ({ circle: prevCircle }, { circle }) => {
  return prevCircle.id === circle.id
}) as MemoizedMiniType

MemoizedMini.fragments = fragments

export default MemoizedMini
