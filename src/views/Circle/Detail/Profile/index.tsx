import { useContext } from 'react'

import {
  CircleAvatar,
  CircleCover,
  Expandable,
  Translate,
  ViewerContext,
} from '~/components'

import { numAbbr } from '~/common/utils'

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
          <button type="button">
            <span className="count">{numAbbr(circle.members.totalCount)}</span>
            <Translate id="members" />
          </button>

          <button type="button">
            <span className="count">
              {numAbbr(circle.followers.totalCount)}
            </span>
            <Translate id="follower" />
          </button>
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
