import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'

import { LikeCoinDialog } from '~/components'

import LinkWalletDialog from './LinkWalletDialog'
import LoginDialog from './LoginDialog'
import LoginSignUpDialog from './LoginSignUpDialog'
import ResetPasswordDialog from './ResetPasswordDialog'
import SignUpDialog from './SignUpDialog'
import WalletSignUpDialog from './WalletSignUpDialog'

function getLibrary(provider?: any) {
  return new ethers.providers.Web3Provider(provider)
}

const GlobalDialogs = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <LoginDialog />
      <SignUpDialog />
      <LoginSignUpDialog />
      <WalletSignUpDialog />
      <LinkWalletDialog />
      <ResetPasswordDialog />
      <LikeCoinDialog />
    </Web3ReactProvider>
  )
}

export default GlobalDialogs
