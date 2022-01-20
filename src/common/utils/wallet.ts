import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'

import { WalletConnector, WalletErrorType } from '~/common/enums'

export const chainName: { [id: number]: string } = {
  1: 'Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Goerli',
  137: 'Polygon',
  80001: 'Polygon Mumbai',
  10: 'Optimistic',
  69: 'Optimistic Kovan',
  42161: 'Arbitrum One',
  43114: 'Avalanche Mainnet',
  250: 'Fantom',
  56: 'BSC',
  97: 'BSC Testnet',
}

export const walletConnectors = {
  [WalletConnector.MetaMask]: new InjectedConnector({}),
  [WalletConnector.WalletConnect]: new WalletConnectConnector({
    // infuraId: env.infuraId,
  }),
}

export const maskAddress = (address: string, prefixLen: number = 6) => {
  return `${address.substring(0, prefixLen)}...${address.substring(
    address.length - 4
  )}`
}

const WALLET_ERROR_MESSAGES = {
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

export const getWalletErrorMessage = ({
  error,
  type,
  lang,
}: {
  error?: Error
  type?: WalletErrorType
  lang: Language
}) => {
  if (type) {
    return WALLET_ERROR_MESSAGES[lang][type]
  }

  if (error instanceof NoEthereumProviderError) {
    return WALLET_ERROR_MESSAGES[lang][WalletErrorType.noEthereumProvider]
    // } else if (error instanceof UnsupportedChainIdError) {
    //   return WALLET_ERROR_MESSAGES[lang][WalletErrorType.unsupportedChainId]
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return WALLET_ERROR_MESSAGES[lang][WalletErrorType.userRejectedRequest]
  } else {
    console.error(error)
    return WALLET_ERROR_MESSAGES[lang][WalletErrorType.unknown]
  }
}
