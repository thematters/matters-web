import { Button, TextIcon, Translate } from '~/components'
import SignUpDialog from '~/components/SignUpDialog'

import { TEXT } from '~/common/enums'

const PasswordResetDialogButton = () => {
  return (
    <SignUpDialog>
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
    </SignUpDialog>
  )
}

export default PasswordResetDialogButton
