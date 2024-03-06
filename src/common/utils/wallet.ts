import { Chain, configureChains, createConfig, createStorage } from 'wagmi'
import {
  goerli,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonMumbai,
} from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'

import { Chain as GQLChain } from '~/gql/graphql'

const isTest = process.env.NODE_ENV === 'test'
const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_KEY!

export const featureSupportedChains = {
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
    new MetaMaskConnector({
      chains,
      options: {
        // For disconnecting from metamask
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
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

export const maskAddress = (address: string, prefixLen: number = 8) => {
  return `${address.substring(0, prefixLen)}...${address.substring(
    address.length - 6
  )}`
}

export const MaxUint256 = BigInt(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
)

export type WalletType = 'MetaMask' | 'WalletConnect'
