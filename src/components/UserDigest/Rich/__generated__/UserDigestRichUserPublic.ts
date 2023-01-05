/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: UserDigestRichUserPublic
// ====================================================

export interface UserDigestRichUserPublic_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UserDigestRichUserPublic_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface UserDigestRichUserPublic_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: UserDigestRichUserPublic_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: UserDigestRichUserPublic_info_cryptoWallet | null;
}

export interface UserDigestRichUserPublic_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserDigestRichUserPublic_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UserDigestRichUserPublic {
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
  info: UserDigestRichUserPublic_info;
  /**
   * Status of current user.
   */
  status: UserDigestRichUserPublic_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: UserDigestRichUserPublic_liker;
}
