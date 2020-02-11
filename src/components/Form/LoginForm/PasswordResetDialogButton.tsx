import { useState } from 'react'

import { Button, Dialog, TextIcon, Translate } from '~/components'
import SignUpDialog from '~/components/SignUpDialog'

import { TEXT } from '~/common/enums'

const PasswordResetDialogButton = () => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => {
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  return (
    <>
      <Button spacing={['xtight', 0]} onClick={open}>
        <TextIcon color="green">
          <Translate
            zh_hant={TEXT.zh_hant.forgetPassword}
            zh_hans={TEXT.zh_hans.forgetPassword}
          />
          ？
        </TextIcon>
      </Button>

      <Dialog
        title={
          <Translate
            zh_hant={TEXT.zh_hant.register}
            zh_hans={TEXT.zh_hans.register}
          />
        }
        size="sm"
        isOpen={showDialog}
        onDismiss={close}
      >
        <SignUpDialog isOpen={showDialog} onDismiss={close} />
      </Dialog>
    </>
  )
}

export default PasswordResetDialogButton
