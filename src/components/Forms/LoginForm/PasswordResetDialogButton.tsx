import { Button, PasswordDialog, TextIcon, Translate } from '~/components'

import { TEXT } from '~/common/enums'

const PasswordResetDialogButton = () => {
  return (
    <PasswordDialog purpose="forget">
      {({ open }) => (
        <Button spacing={['xtight', 0]} onClick={open}>
          <TextIcon color="green">
            <Translate
              zh_hant={TEXT.zh_hant.forgetPassword}
              zh_hans={TEXT.zh_hans.forgetPassword}
            />
            ？
          </TextIcon>
        </Button>
      )}
    </PasswordDialog>
  )
}

export default PasswordResetDialogButton
