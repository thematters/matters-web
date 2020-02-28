import gql from 'graphql-tag'

import { UserDigest } from '~/components'

import styles from './styles.css'

import { NoticeFollower as NoticeFollowerType } from './__generated__/NoticeFollower'

const NoticeFollower = ({ user }: { user: NoticeFollowerType | null }) => {
  if (!user) {
    return null
  }

  return (
    <section className="follower-content">
      <UserDigest.Rich user={user} hasState={false} hasFollow />
      <style jsx>{styles}</style>
    </section>
  )
}

NoticeFollower.fragments = {
  follower: gql`
    fragment NoticeFollower on User {
      ...UserDigestRichUser
    }
    ${UserDigest.Rich.fragments.user}
  `
}

export default NoticeFollower
