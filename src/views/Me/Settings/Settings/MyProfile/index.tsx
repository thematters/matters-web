import Link from 'next/link'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import {
  Avatar,
  Form,
  IconArrowRight20,
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
    <Form.List.Item
      title={
        <FormattedMessage
          defaultMessage="My profile"
          description="src/views/Me/Settings/Settings/MyProfile/index.tsx"
        />
      }
      right={
        <Link {...path} legacyBehavior>
          <a className={styles.viewerProfile}>
            <span className={styles.displayName}>{viewer.displayName}</span>
            <TextIcon
              icon={<IconArrowRight20 size="mdS" color="greyDarker" />}
              size="sm"
              textPlacement="left"
              spacing="basexxtight"
            >
              <Avatar size="mdS" user={viewer} />
            </TextIcon>
          </a>
        </Link>
      }
      clickable
    />
  )
}

export default MyProfile
