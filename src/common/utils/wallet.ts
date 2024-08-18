import { createConfig, http } from 'wagmi'
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
    ? polygon.blockExplorers.default.url
    : polygonMumbai.blockExplorers.default.url,
  [GQLChain.Optimism]: isProd
    ? optimism.blockExplorers.default.url
    : optimismSepolia.blockExplorers.default.url,
}

const connectors = [
  injected({
    target: 'metaMask',
    shimDisconnect: true,
  }),
  ...(isTest
    ? []
    : [
        walletConnect({
          projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID!,
          showQrModal: true,
        }),
      ]),
]

export const wagmiConfig = isProd
  ? createConfig({
      chains: [mainnet, optimism],
      transports: {
        [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyId}`),
        [optimism.id]: http(
          `https://opt-mainnet.g.alchemy.com/v2/${alchemyId}`
        ),
      },
      connectors,
    })
  : createConfig({
      chains: [sepolia, optimismSepolia],
      transports: {
        [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyId}`),
        [optimismSepolia.id]: http(
          `https://opt-sepolia.g.alchemy.com/v2/${alchemyId}`
        ),
      },
      connectors,
    })

export const MaxUint256 = BigInt(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
)

export const MaxApprovedUSDTAmount = BigInt('999999999999')

export type WalletType = 'MetaMask' | 'WalletConnect'
