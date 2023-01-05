/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: UserDigestVerboseUserPublic
// ====================================================

export interface UserDigestVerboseUserPublic_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UserDigestVerboseUserPublic_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface UserDigestVerboseUserPublic_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: UserDigestVerboseUserPublic_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: UserDigestVerboseUserPublic_info_cryptoWallet | null;
}

export interface UserDigestVerboseUserPublic_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserDigestVerboseUserPublic_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UserDigestVerboseUserPublic {
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
   * User information.
   */
  info: UserDigestVerboseUserPublic_info;
  /**
   * Status of current user.
   */
  status: UserDigestVerboseUserPublic_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: UserDigestVerboseUserPublic_liker;
}
