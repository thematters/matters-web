/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AvatarUserLogbook
// ====================================================

export interface AvatarUserLogbook_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface AvatarUserLogbook_info {
  __typename: "UserInfo";
  /**
   * Connected wallet.
   */
  cryptoWallet: AvatarUserLogbook_info_cryptoWallet | null;
}

export interface AvatarUserLogbook {
  __typename: "User";
  /**
   * User information.
   */
  info: AvatarUserLogbook_info;
}
