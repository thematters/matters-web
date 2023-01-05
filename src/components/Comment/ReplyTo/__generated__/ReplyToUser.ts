/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ReplyToUser
// ====================================================

export interface ReplyToUser_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ReplyToUser_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ReplyToUser_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ReplyToUser_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ReplyToUser_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ReplyToUser_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ReplyToUser_info_cryptoWallet | null;
}

export interface ReplyToUser {
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
  status: ReplyToUser_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ReplyToUser_liker;
  /**
   * User information.
   */
  info: ReplyToUser_info;
}
