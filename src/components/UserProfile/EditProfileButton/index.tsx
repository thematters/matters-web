import {
  Button,
  Dialog,
  TextIcon,
  Translate,
  useDialogSwitch,
} from '~/components'

import ProfileEditor, { ProfileEditorUser } from './ProfileEditor'

interface EditProfileButtonProps {
  user: ProfileEditorUser
}

const EditProfileButton: React.FC<EditProfileButtonProps> = ({ user }) => {
  const { show, open, close } = useDialogSwitch(false)

  return (
    <>
      <Button
        size={['6rem', '2rem']}
        textColor="green"
        textActiveColor="white"
        bgActiveColor="green"
        borderColor="green"
        onClick={open}
        aria-haspopup="true"
      >
        <TextIcon size="md-s" weight="md">
          <Translate id="editUserProfile" />
        </TextIcon>
      </Button>

      <Dialog isOpen={show} onDismiss={close} fixedHeight>
        <ProfileEditor user={user} closeDialog={close} />
      </Dialog>
    </>
  )
}

export default EditProfileButton
