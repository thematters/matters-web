import {
  InjectedConnector,
  // NoEthereumProviderError,
  // UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  // UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'

import { WalletConnector } from '~/common/enums'

// NEXT_PUBLIC_RUNTIME_ENV
const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

// 1 for mainnet; 4 for rinkeby
const supportedChainId = isProd ? 1 : 4

export const walletConnectors = {
  [WalletConnector.MetaMask]: new InjectedConnector({
    supportedChainIds: [supportedChainId],
  }),
  [WalletConnector.WalletConnect]: new WalletConnectConnector({
    // infuraId: env.infuraId,
    supportedChainIds: [supportedChainId],
  }),
}
