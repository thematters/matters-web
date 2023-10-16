import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Avatar,
  EditProfileDialog,
  IconArrowRight20,
  TableView,
  TextIcon,
  ViewerContext,
} from '~/components'

import styles from './styles.module.css'

const MyProfile = () => {
  const viewer = useContext(ViewerContext)

  return (
    <EditProfileDialog user={viewer}>
      {({ openDialog: openEditProfileDialog }) => (
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
          onClick={openEditProfileDialog}
        />
      )}
    </EditProfileDialog>
  )
}

export default MyProfile
