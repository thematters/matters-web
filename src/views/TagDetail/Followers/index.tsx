import { FormattedMessage } from 'react-intl'

import { IMAGE_PIXEL } from '~/common/enums'
import { numAbbr } from '~/common/utils'
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
          <FormattedMessage
            defaultMessage="are following"
            description="src/views/TagDetail/Followers/index.tsx"
          />
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
