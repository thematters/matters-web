import classNames from 'classnames'

import {
  Card,
  IconCheckedMedium,
  IconCheckMedium,
  List,
  UserDigest,
} from '~/components'

import styles from '../styles.css'

import { UserDigestMiniUser } from '~/components/UserDigest/Mini/__generated__/UserDigestMiniUser'

interface SearchSelectUserProps {
  user: UserDigestMiniUser
  selected?: boolean
  onClick: (user: UserDigestMiniUser) => void
  inStagingArea?: boolean
}

export const SearchSelectUser: React.FC<SearchSelectUserProps> = ({
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
    <List.Item>
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
              <IconCheckedMedium color="green" size="md" />
            )}
            {inStagingArea && !selected && (
              <IconCheckMedium color="grey-light" size="md" />
            )}
          </span>

          <style jsx> {styles}</style>
        </section>
      </Card>
    </List.Item>
  )
}
