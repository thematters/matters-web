/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: NoticeUserCard
// ====================================================

export interface NoticeUserCard_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface NoticeUserCard_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface NoticeUserCard_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: NoticeUserCard_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: NoticeUserCard_info_cryptoWallet | null;
}

export interface NoticeUserCard_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface NoticeUserCard_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface NoticeUserCard {
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
  info: NoticeUserCard_info;
  /**
   * Status of current user.
   */
  status: NoticeUserCard_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: NoticeUserCard_liker;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}
