export enum WalletErrorType {
  // common
  noEthereumProvider = 'noEthereumProvider',
  userRejectedRequest = 'userRejectedRequest',
  unknown = 'unknown',
  invalidAddress = 'invalidAddress',

  // sign message
  userRejectedSignMessage = 'userRejectedSignMessage',
}
