import { createClient, createStorage, WagmiConfig } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { chains, wagmiProvider } from '~/common/utils'

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        // For disconnecting from metamask
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider: wagmiProvider,
  /*
  FIXME: need to find a way of clearing ens name cache instead of clearing the global cache
  */
  storage: createStorage({
    storage: {
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null,
    },
  }),
})

/**
 * Currently, we don't use this component on <Root>
 * since wallet-related features aren't enabled globally,
 * and for smaller bundle size.
 *
 * Please use this component on-demand.
 */
export const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
}
