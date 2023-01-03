import { IMAGE_PIXEL } from '~/common/enums'
import { numAbbr } from '~/common/utils'
import { Translate } from '~/components'
import { Avatar } from '~/components/Avatar'
import tagFragments from '~/components/GQL/fragments/tag'
import { FollowersTagFragment } from '~/gql/graphql'

import styles from './styles.css'

interface FollowersProps {
  tag: FollowersTagFragment
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
          <Translate zh_hant="人追蹤" zh_hans="人追踪" en="Followers" />
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
