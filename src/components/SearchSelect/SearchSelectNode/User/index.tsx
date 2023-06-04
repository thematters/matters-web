import classNames from 'classnames'

import { TEST_ID } from '~/common/enums'
import { Card, IconChecked, IconUnChecked, UserDigest } from '~/components'
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
      spacing={['xtight', 'base']}
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
            <IconChecked color="green" size="mdS" />
          )}
          {inStagingArea && !selected && (
            <IconUnChecked color="greyLight" size="mdS" />
          )}
        </span>
      </section>
    </Card>
  )
}

export default SearchSelectUser
