/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, TransactionCurrency } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CircleWallCirclePublic
// ====================================================

export interface CircleWallCirclePublic_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface CircleWallCirclePublic_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CircleWallCirclePublic_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CircleWallCirclePublic_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface CircleWallCirclePublic_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: CircleWallCirclePublic_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: CircleWallCirclePublic_owner_info_cryptoWallet | null;
}

export interface CircleWallCirclePublic_owner {
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
  status: CircleWallCirclePublic_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: CircleWallCirclePublic_owner_liker;
  /**
   * User information.
   */
  info: CircleWallCirclePublic_owner_info;
}

export interface CircleWallCirclePublic_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface CircleWallCirclePublic_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface CircleWallCirclePublic_prices {
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

export interface CircleWallCirclePublic {
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
  owner: CircleWallCirclePublic_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: CircleWallCirclePublic_members;
  /**
   * List of works belong to this Circle.
   */
  works: CircleWallCirclePublic_works;
  /**
   * Prices offered by this Circle.
   */
  prices: CircleWallCirclePublic_prices[] | null;
}
