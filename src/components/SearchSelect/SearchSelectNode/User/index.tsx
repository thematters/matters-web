import classNames from 'classnames'

import { Card, IconChecked, IconUnChecked, UserDigest } from '~/components'

import styles from '../styles.css'

import { UserDigestMiniUser } from '~/components/UserDigest/Mini/__generated__/UserDigestMiniUser'
import { SelectSearch_search_edges_node_User_info as UserInfo } from '../../SearchingArea/__generated__/SelectSearch'

type User = UserDigestMiniUser & { info: UserInfo }

interface SearchSelectUserProps {
  user: User
  selected?: boolean
  onClick: (user: User) => void
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
    <Card spacing={['xtight', 'base']} onClick={() => onClick(user)}>
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
