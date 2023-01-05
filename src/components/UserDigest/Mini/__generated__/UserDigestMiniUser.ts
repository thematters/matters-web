/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: UserDigestMiniUser
// ====================================================

export interface UserDigestMiniUser_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserDigestMiniUser_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UserDigestMiniUser_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UserDigestMiniUser_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface UserDigestMiniUser_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: UserDigestMiniUser_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: UserDigestMiniUser_info_cryptoWallet | null;
}

export interface UserDigestMiniUser {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * Status of current user.
   */
  status: UserDigestMiniUser_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: UserDigestMiniUser_liker;
  /**
   * User information.
   */
  info: UserDigestMiniUser_info;
}
