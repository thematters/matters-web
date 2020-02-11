import { Dialog, Translate } from '~/components'
import SignUpDialog from '~/components/SignUpDialog'

const SignUpDialogButton = () => {
  return (
    <SignUpDialog>
      {({ open }) => (
        <Dialog.Button onClick={open} bgColor="grey-lighter" textColor="black">
          <Translate zh_hant="沒有帳號？" zh_hans="沒有帐号？" />
        </Dialog.Button>
      )}
    </SignUpDialog>
  )
}

export default SignUpDialogButton
