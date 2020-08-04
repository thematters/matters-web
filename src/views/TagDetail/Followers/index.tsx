import { Translate } from '~/components'
import { Avatar } from '~/components/Avatar'
import tagFragments from '~/components/GQL/fragments/tag'

import { IMAGE_PIXEL } from '~/common/enums'
import { numAbbr } from '~/common/utils'

import styles from './styles.css'

import { FollowersTag } from '~/components/GQL/fragments/__generated__/FollowersTag'

interface FollowersProps {
  tag: FollowersTag
}

const Followers = ({ tag }: FollowersProps) => {
  const { edges, totalCount } = tag.followers || {
    edges: [],
    totalCount: 0,
  }
  const followers = (
    edges?.map(({ node }) => node).filter((user) => !!user) || []
  ).slice(0, 5)

  return (
    <section className="container">
      <section className="avatar-list">
        {followers.map((user, index) => (
          <Avatar
            user={user || undefined}
            src={user ? undefined : IMAGE_PIXEL}
            size="md"
            key={index}
          />
        ))}
      </section>

      <section className="count">
        <b>{numAbbr(totalCount)}</b>
        <span>
          &nbsp;
          <Translate zh_hant="人追蹤" zh_hans="人追踪" />
        </span>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

Followers.fragments = {
  tag: tagFragments.followers,
}
export default Followers
