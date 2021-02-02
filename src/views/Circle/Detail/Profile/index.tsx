import Link from 'next/link'
import { useContext } from 'react'

import {
  CircleAvatar,
  CircleCover,
  Expandable,
  Translate,
  ViewerContext,
} from '~/components'

import { numAbbr, toPath } from '~/common/utils'

import CIRCLE_COVER from '@/public/static/images/circle-cover.svg'

import AuthorWidget from './AuthorWidget'
import EditButton from './EditButton'
import FollowButton from './FollowButton'
import { fragments } from './gql'
import styles from './styles.css'

import { ProfileCirclePrivate } from './__generated__/ProfileCirclePrivate'
import { ProfileCirclePublic } from './__generated__/ProfileCirclePublic'

type CircleProfileProps = {
  circle: ProfileCirclePublic & Partial<ProfileCirclePrivate>
}

const CircleProfile = ({ circle }: CircleProfileProps) => {
  const viewer = useContext(ViewerContext)
  const isOwner = circle?.owner.id === viewer.id

  const circleMembersPath = toPath({
    page: 'circleMembers',
    circle: { name: circle.name },
  })

  const circleFollowersPath = toPath({
    page: 'circleFollowers',
    circle: { name: circle.name },
  })

  return (
    <section className="profile">
      <CircleCover cover={circle.cover} fallbackCover={CIRCLE_COVER} />

      <header>
        <CircleAvatar size="xxl" circle={circle} />

        <h2 className="name">{circle.displayName}</h2>
      </header>

      <section className="info">
        {circle.description && (
          <Expandable>
            <p className="description">{circle.description}</p>
          </Expandable>
        )}
      </section>

      <footer>
        <section className="counts">
          <Link {...circleMembersPath}>
            <a>
              <span className="count">
                {numAbbr(circle.members.totalCount)}
              </span>
              <Translate id="members" />
            </a>
          </Link>

          <Link {...circleFollowersPath}>
            <a>
              <span className="count">
                {numAbbr(circle.followers.totalCount)}
              </span>
              <Translate id="follower" />
            </a>
          </Link>
        </section>

        {isOwner ? (
          <EditButton circle={circle} />
        ) : (
          <FollowButton circle={circle} />
        )}
      </footer>

      <AuthorWidget circle={circle} />

      <style jsx>{styles}</style>
    </section>
  )
}

CircleProfile.fragments = fragments

export default CircleProfile
