import { LikeCoinDialog } from '~/components'

import LoginDialog from './LoginDialog'
import ResetPasswordDialog from './ResetPasswordDialog'
import SignUpDialog from './SignUpDialog'

const GlobalDialogs = () => {
  return (
    <>
      <LoginDialog />
      <SignUpDialog />
      <ResetPasswordDialog />
      <LikeCoinDialog allowEventTrigger />
    </>
  )
}

export default GlobalDialogs
