import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconRight from '@/public/static/icons/24px/right.svg'
import {
  Avatar,
  EditProfileDialog,
  Icon,
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
              id="n2Sc6g"
              description="src/views/Me/Settings/Settings/MyProfile/index.tsx"
            />
          }
          right={
            <span className={styles.viewerProfile}>
              <span className={styles.displayName}>{viewer.displayName}</span>
              <TextIcon
                icon={<Icon icon={IconRight} size={20} color="greyDarker" />}
                size={14}
                placement="left"
                spacing={6}
              >
                <Avatar size={22} user={viewer} />
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
