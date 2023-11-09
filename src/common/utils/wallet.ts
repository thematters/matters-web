import { Chain, configureChains, createConfig, createStorage } from 'wagmi'
import { goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const isTest = process.env.NODE_ENV === 'test'
const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_KEY!

export const featureSupportedChains = {
  curation: isProd ? [polygon] : [polygonMumbai],
  ens: isProd ? [mainnet] : [goerli],
}

const defaultChains: Chain[] = isProd
  ? [mainnet, polygon]
  : [goerli, polygonMumbai]

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
