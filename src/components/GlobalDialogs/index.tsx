import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'

import { LikeCoinDialog } from '~/components'

import UniversalAuthDialog from './UniversalAuthDialog'

function getLibrary(provider?: any) {
  return new ethers.providers.Web3Provider(provider)
}

const GlobalDialogs = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <UniversalAuthDialog />
      <LikeCoinDialog />
    </Web3ReactProvider>
  )
}

export default GlobalDialogs
