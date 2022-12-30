import classNames from 'classnames'

import { TEST_ID } from '~/common/enums'
import { Card, IconChecked, IconUnChecked, UserDigest } from '~/components'
import { UserDigestMiniUser } from '~/components/UserDigest/Mini/__generated__/UserDigestMiniUser'

import styles from '../styles.css'

interface SearchSelectUserProps {
  user: UserDigestMiniUser
  selected?: boolean
  onClick: (user: UserDigestMiniUser) => void
  inStagingArea?: boolean
}

const SearchSelectUser: React.FC<SearchSelectUserProps> = ({
  user,
  selected,
  onClick,
  inStagingArea,
}) => {
  const nodeClass = classNames({
    node: true,
    selectable: inStagingArea,
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

        <span className="icon-select">
          {inStagingArea && selected && (
            <IconChecked color="green" size="md-s" />
          )}
          {inStagingArea && !selected && (
            <IconUnChecked color="grey-light" size="md-s" />
          )}
        </span>

        <style jsx> {styles}</style>
      </section>
    </Card>
  )
}

export default SearchSelectUser
