/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: UserDonationRecipient
// ====================================================

export interface UserDonationRecipient_liker {
  __typename: "Liker";
  /**
   * Liker ID of LikeCoin
   */
  likerId: string | null;
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UserDonationRecipient_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UserDonationRecipient_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface UserDonationRecipient_info {
  __typename: "UserInfo";
  /**
   * Login address
   */
  ethAddress: string | null;
  /**
   * User badges.
   */
  badges: UserDonationRecipient_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: UserDonationRecipient_info_cryptoWallet | null;
}

export interface UserDonationRecipient_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserDonationRecipient {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Liker info of current user
   */
  liker: UserDonationRecipient_liker;
  /**
   * User information.
   */
  info: UserDonationRecipient_info;
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
  status: UserDonationRecipient_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
}
