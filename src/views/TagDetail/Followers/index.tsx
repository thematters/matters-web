import { Translate, usePublicQuery } from '~/components'
import { Avatar } from '~/components/Avatar'
import TAG_FOLLOWERS from '~/components/GQL/queries/tagFollowers'

import { IMAGE_PIXEL } from '~/common/enums'
import { numAbbr } from '~/common/utils'

import styles from './styles.css'

import { TagFollowers } from '~/components/GQL/queries/__generated__/TagFollowers'

interface FollowersProps {
  id: string
}

const Followers = ({ id }: FollowersProps) => {
  const { data } = usePublicQuery<TagFollowers>(TAG_FOLLOWERS, {
    variables: { id },
  })

  if (!data || !data.node || data.node.__typename !== 'Tag') {
    return null
  }

  const { edges, totalCount } = data?.node?.followers || {
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

export default Followers
