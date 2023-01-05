/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, TransactionCurrency } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: NoticeCircleCard
// ====================================================

export interface NoticeCircleCard_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface NoticeCircleCard_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface NoticeCircleCard_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface NoticeCircleCard_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface NoticeCircleCard_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: NoticeCircleCard_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: NoticeCircleCard_owner_info_cryptoWallet | null;
}

export interface NoticeCircleCard_owner {
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
  status: NoticeCircleCard_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: NoticeCircleCard_owner_liker;
  /**
   * User information.
   */
  info: NoticeCircleCard_owner_info;
}

export interface NoticeCircleCard_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface NoticeCircleCard_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface NoticeCircleCard_prices {
  __typename: "Price";
  /**
   * Amount of Price.
   */
  amount: number;
  /**
   * Currency of Price.
   */
  currency: TransactionCurrency;
}

export interface NoticeCircleCard {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Slugified name of this Circle.
   */
  name: string;
  /**
   * Human readable name of this Circle.
   */
  displayName: string;
  /**
   * A short description of this Circle.
   */
  description: string | null;
  /**
   * Circle owner.
   */
  owner: NoticeCircleCard_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: NoticeCircleCard_members;
  /**
   * List of works belong to this Circle.
   */
  works: NoticeCircleCard_works;
  /**
   * Prices offered by this Circle.
   */
  prices: NoticeCircleCard_prices[] | null;
}
