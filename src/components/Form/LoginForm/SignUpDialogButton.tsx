import { useState } from 'react'

import { Dialog, Translate } from '~/components'
import SignUpDialog from '~/components/SignUpDialog'

import { TEXT } from '~/common/enums'

const SignUpDialogButton = () => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => {
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  return (
    <>
      <Dialog.Button onClick={open} bgColor="grey-lighter" textColor="black">
        <Translate zh_hant="沒有帳號？" zh_hans="沒有帐号？" />
      </Dialog.Button>

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

export default SignUpDialogButton
