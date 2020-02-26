import { useState } from 'react'

import { Button, Dialog, Icon, TextIcon, Translate } from '~/components'

import { TEXT } from '~/common/enums'

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
          <Translate
            zh_hant={TEXT.zh_hant.editUserProfile}
            zh_hans={TEXT.zh_hans.editUserProfile}
          />
        </TextIcon>
      </Button>

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <ProfileEditor user={user} closeDialog={close} />
      </Dialog>
    </>
  )
}

export default EditProfileButton
