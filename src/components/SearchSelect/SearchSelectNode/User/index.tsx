import classNames from 'classnames'

import IconCircleCheckFill from '@/public/static/icons/24px/circle-check-fill.svg'
import IconCircleEmpty from '@/public/static/icons/24px/circle-empty.svg'
import { TEST_ID } from '~/common/enums'
import { Card, Icon, UserDigest } from '~/components'
import { UserDigestMiniUserFragment } from '~/gql/graphql'

import styles from '../styles.module.css'

interface SearchSelectUserProps {
  user: UserDigestMiniUserFragment
  selected?: boolean
  onClick: (user: UserDigestMiniUserFragment) => void
  inStagingArea?: boolean
}

const SearchSelectUser: React.FC<SearchSelectUserProps> = ({
  user,
  selected,
  onClick,
  inStagingArea,
}) => {
  const nodeClass = classNames({
    [styles.node]: true,
    [styles.selectable]: inStagingArea,
  })

  return (
    <Card
      spacing={[8, 16]}
      onClick={() => onClick(user)}
      testId={TEST_ID.SEARCH_RESULTS_ITEM}
    >
      <section className={nodeClass}>
        <UserDigest.Mini
          user={user}
          direction="column"
          hasAvatar
          hasDisplayName
          hasUserName
          disabled
        />

        <span className={styles.iconSelect}>
          {inStagingArea && selected && (
            <Icon icon={IconCircleCheckFill} color="green" size={20} />
          )}
          {inStagingArea && !selected && (
            <Icon icon={IconCircleEmpty} color="greyLight" size={20} />
          )}
        </span>
      </section>
    </Card>
  )
}

export default SearchSelectUser
