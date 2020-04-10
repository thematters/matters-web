import { useState } from 'react';

import { Button, Dialog, TextIcon, Translate } from '~/components';

import { TEXT } from '~/common/enums';

import ProfileEditor, { ProfileEditorUser } from './ProfileEditor';

interface EditProfileButtonProps {
  user: ProfileEditorUser;
}

const EditProfileButton: React.FC<EditProfileButtonProps> = ({ user }) => {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

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
  );
};

export default EditProfileButton;
