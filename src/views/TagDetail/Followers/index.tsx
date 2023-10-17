import { FormattedMessage } from 'react-intl'

import { numAbbr } from '~/common/utils'
import tagFragments from '~/components/GQL/fragments/tag'
import { FollowersTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface FollowersProps {
  tag: FollowersTagFragment
}

const Followers = ({ tag }: FollowersProps) => {
  const { totalCount } = tag.followers || {
    edges: [],
    totalCount: 0,
  }

  return (
    <section className={styles.container}>
      <section className={styles.count}>
        <b>{numAbbr(totalCount)}</b>
        <span>
          &nbsp;
          <FormattedMessage
            defaultMessage="are following"
            id="hYG5fb"
            description="src/views/TagDetail/Followers/index.tsx"
          />
        </span>
      </section>
    </section>
  )
}

Followers.fragments = {
  tag: tagFragments.followers,
}
export default Followers
