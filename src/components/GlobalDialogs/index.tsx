import { LikeCoinDialog } from '~/components'

import LoginDialog from './LoginDialog'
import ResetPasswordDialog from './ResetPasswordDialog'
import SignUpDialog from './SignUpDialog'
import LoginSignUpDialog from './LoginSignUpDialog'

const GlobalDialogs = () => {
  return (
    <>
      <LoginDialog />
      <SignUpDialog />
      <LoginSignUpDialog />
      <ResetPasswordDialog />
      <LikeCoinDialog />
    </>
  )
}

export default GlobalDialogs
