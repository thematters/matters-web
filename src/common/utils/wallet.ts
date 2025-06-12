import { http } from 'viem'
import { createConfig } from 'wagmi'
import {
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonMumbai,
  sepolia,
} from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

import { Chain as GQLChain } from '~/gql/graphql'

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig
  }
}

const isServer = typeof window === 'undefined'
const isTest = process.env.NODE_ENV === 'test'
const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_KEY!

export const featureSupportedChains = {
  billboard: isProd ? [optimism] : [optimismSepolia],
  curation: isProd ? [optimism] : [optimismSepolia],
  ens: isProd ? [mainnet] : [sepolia],
}

export const explorers = {
  [GQLChain.Polygon]: isProd
    ? polygon.blockExplorers.default
    : polygonMumbai.blockExplorers.default,
  [GQLChain.Optimism]: isProd
    ? optimism.blockExplorers.default
    : optimismSepolia.blockExplorers.default,
}

export const wagmiConfig = createConfig({
  ssr: false,
  chains: [mainnet, optimism, sepolia, optimismSepolia],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyId}`),
    [optimism.id]: http(`https://opt-mainnet.g.alchemy.com/v2/${alchemyId}`),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyId}`),
    [optimismSepolia.id]: http(
      `https://opt-sepolia.g.alchemy.com/v2/${alchemyId}`
    ),
  },
  connectors: [
    injected(),
    ...(isTest || isServer
      ? []
      : [
          walletConnect({
            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID!,
            qrModalOptions: { themeMode: 'light' },
          }),
        ]),
  ],
})

export const MaxUint256 = BigInt(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
)

export const MaxApprovedUSDTAmount = BigInt('999999999999')

export type WalletType = 'MetaMask' | 'WalletConnect'
