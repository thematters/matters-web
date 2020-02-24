import { useState } from 'react'

import { Button, Dialog, Icon, TextIcon, Translate } from '~/components'

import ProfileEditor, { ProfileEditorUser } from './ProfileEditor'

interface EditProfileButtonProps {
  user: ProfileEditorUser
}

const EditProfileButton: React.FC<EditProfileButtonProps> = ({ user }) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      <Button
        spacing={['xxtight', 'xtight']}
        bgHoverColor="grey-lighter"
        onClick={open}
      >
        <TextIcon icon={<Icon.SettingsMedium />} color="grey-dark">
          <Translate zh_hant="編輯資料" zh_hans="编辑资料" />
        </TextIcon>
      </Button>

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <ProfileEditor user={user} closeDialog={close} />
      </Dialog>
    </>
  )
}

export default EditProfileButton
