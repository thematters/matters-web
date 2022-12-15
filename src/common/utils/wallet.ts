import { providers } from 'ethers'
import { chain, configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { WalletErrorType } from '~/common/enums'

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

export const supportedChains = [
  chain.goerli,
  chain.polygonMumbai,
  ...(isProd
    ? [chain.mainnet, chain.polygon]
    : [chain.goerli, chain.polygonMumbai]),
]

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_KEY || ''

export const { chains } = configureChains(supportedChains, [
  alchemyProvider({ apiKey: alchemyId }),
  publicProvider(),
])

export const wagmiProvider = ({ chainId }: { chainId?: any }) =>
  new providers.AlchemyProvider(chainId, alchemyId)

export const maskAddress = (address: string, prefixLen: number = 6) => {
  return `${address.substring(0, prefixLen)}...${address.substring(
    address.length - 4
  )}`
}

export const WALLET_ERROR_MESSAGES = {
  en: {
    // common
    [WalletErrorType.noEthereumProvider]:
      'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.',
    [WalletErrorType.userRejectedRequest]:
      'Please authorize this website to access your Ethereum account.',
    [WalletErrorType.unknown]:
      'An unknown error occurred, please make sure your wallet and network are in working.',
    [WalletErrorType.invalidAddress]: 'Invalid address or ENS name',
    // sign message
    [WalletErrorType.userRejectedSignMessage]:
      'Please sign the message to complete the operation.',
  },
  zh_hant: {
    // common
    [WalletErrorType.noEthereumProvider]: '請先安装 MetaMask 擴充',
    [WalletErrorType.userRejectedRequest]: '請先授權本網站獲取你的以太坊地址',
    [WalletErrorType.unknown]: '發生未知錯誤，請確保你的錢包和網絡正常',
    [WalletErrorType.invalidAddress]: '請輸入正確的以太坊地址或 ENS 名稱',
    // sign message
    [WalletErrorType.userRejectedSignMessage]: '請簽署以完成操作',
  },
  zh_hans: {
    // common
    [WalletErrorType.noEthereumProvider]: '请先安装 MetaMask 插件',
    [WalletErrorType.userRejectedRequest]: '请先授权本网站获取你的以太坊地址',
    [WalletErrorType.unknown]: '发生未知错误，请确保你的钱包和网络正常',
    [WalletErrorType.invalidAddress]: '请输入正确的以太坊地址或 ENS 名称',
    // sign message
    [WalletErrorType.userRejectedSignMessage]: '请签署以完成操作',
  },
}
