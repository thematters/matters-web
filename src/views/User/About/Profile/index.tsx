import { UserDigest } from '~/components'
import {
  ArchitectBadge,
  CivicLikerBadge,
  GoldenMotorBadge,
  SeedBadge,
} from '~/components/UserProfile/Badges'

import { fragments } from './gql'
import styles from './styles.css'

import { UserAboutProfileUser } from './__generated__/UserAboutProfileUser'

type ProfileProps = {
  user: UserAboutProfileUser
}

const Profile = ({ user }: ProfileProps) => {
  const badges = user.info.badges || []
  const hasSeedBadge = badges.some((b) => b.type === 'seed')
  const hasArchitectBadge = badges.some((b) => b.type === 'architect')
  const hasGoldenMotorBadge = badges.some((b) => b.type === 'golden_motor')
  const isCivicLiker = user.liker.civicLiker

  return (
    <section className="profile">
      <section className="avatar">
        <UserDigest.Mini user={user} avatarSize="xxxl" hasAvatar />
      </section>

      <section className="badges">
        {hasSeedBadge && <SeedBadge />}
        {hasGoldenMotorBadge && <GoldenMotorBadge />}
        {hasArchitectBadge && <ArchitectBadge />}
        {isCivicLiker && <CivicLikerBadge />}
      </section>

      <section className="name">
        <h2 className="displayName">{user.displayName}</h2>
        <p className="userName">@{user.userName}</p>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

Profile.fragments = fragments

export default Profile
