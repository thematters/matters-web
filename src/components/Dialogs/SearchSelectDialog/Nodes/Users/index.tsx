import classNames from 'classnames'
import { Fragment } from 'react'

import {
  IconCheckedMedium,
  IconCheckMedium,
  Menu,
  UserDigest,
} from '~/components'

import styles from '../styles.css'

import { UserDigestMiniUser } from '~/components/UserDigest/Mini/__generated__/UserDigestMiniUser'

export interface SearchSelectUser {
  node: UserDigestMiniUser
  selected?: boolean
}

interface SearchSelectUsersProps {
  users: SearchSelectUser[]
  onClick: (user: UserDigestMiniUser) => void
  inStagingArea?: boolean
}

export const SearchSelectUsers: React.FC<SearchSelectUsersProps> = ({
  users,
  onClick,
  inStagingArea,
}) => {
  const nodeClass = classNames({
    node: true,
    selectable: inStagingArea,
  })

  return (
    <Menu spacingY={0}>
      {users.map(({ node, selected }) => (
        <Fragment key={node.id}>
          <Menu.Divider />
          <Menu.Item spacing={['xtight', 'base']} onClick={() => onClick(node)}>
            <section className={nodeClass}>
              <UserDigest.Mini
                user={node}
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
          </Menu.Item>
        </Fragment>
      ))}
    </Menu>
  )
}
