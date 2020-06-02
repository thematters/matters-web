import LikeCoinTermAlertDialog from './LikeCoinTermAlertDialog'
import LoginDialog from './LoginDialog'
import ResetPasswordDialog from './ResetPasswordDialog'
import SignUpDialog from './SignUpDialog'
// import TermAlertDialog from './TermAlertDialog'

const GlobalDialogs = () => {
  return (
    <>
      {/* <TermAlertDialog /> */}
      <LikeCoinTermAlertDialog />

      <LoginDialog />
      <SignUpDialog />
      <ResetPasswordDialog />
    </>
  )
}

export default GlobalDialogs
