import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import {
  Avatar,
  IconArrowRight20,
  TableView,
  TextIcon,
  ViewerContext,
} from '~/components'

import styles from './styles.module.css'

const MyProfile = () => {
  const viewer = useContext(ViewerContext)
  const path = toPath({
    page: 'userProfile',
    userName: viewer.userName || '',
  })

  return (
    <TableView.Cell
      title={
        <FormattedMessage
          defaultMessage="My profile"
          description="src/views/Me/Settings/Settings/MyProfile/index.tsx"
        />
      }
      right={
        <span className={styles.viewerProfile}>
          <span className={styles.displayName}>{viewer.displayName}</span>
          <TextIcon
            icon={<IconArrowRight20 size="mdS" color="greyDarker" />}
            size="sm"
            textPlacement="left"
            spacing="basexxtight"
          >
            <Avatar size="mdS" user={viewer} />
          </TextIcon>
        </span>
      }
      href={path.href}
    />
  )
}

export default MyProfile
