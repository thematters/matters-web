import { Chain, configureChains, createConfig } from 'wagmi'
import {
  goerli,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonMumbai,
} from 'wagmi/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'

import { Chain as GQLChain } from '~/gql/graphql'

const isTest = process.env.NODE_ENV === 'test'
const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_KEY!

export const featureSupportedChains = {
  billboard: isProd ? [optimism] : [optimismSepolia],
  curation: isProd ? [optimism] : [optimismSepolia],
  ens: isProd ? [mainnet] : [goerli],
}

export const explorers = {
  [GQLChain.Polygon]: isProd
    ? polygon.blockExplorers.etherscan
    : polygonMumbai.blockExplorers.etherscan,
  [GQLChain.Optimism]: isProd
    ? optimism.blockExplorers.etherscan
    : optimismSepolia.blockExplorers.default, // TODO: update to etherscan
}

const defaultChains: Chain[] = isProd
  ? [mainnet, optimism]
  : [goerli, optimismSepolia]

export const { publicClient, chains } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: alchemyId }),
])

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        // For disconnecting from metamask
        shimDisconnect: true,
        // UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    ...(isTest
      ? []
      : [
          new WalletConnectConnector({
            chains,
            options: {
              projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID!,
              showQrModal: true,
            },
          }),
        ]),
  ],
  publicClient,
})

export const MaxUint256 = BigInt(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
)

export const MaxApprovedUSDTAmount = BigInt('999999999999')

export type WalletType = 'MetaMask' | 'WalletConnect'
