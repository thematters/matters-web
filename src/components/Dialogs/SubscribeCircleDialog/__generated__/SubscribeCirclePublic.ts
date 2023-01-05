/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, TransactionCurrency } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: SubscribeCirclePublic
// ====================================================

export interface SubscribeCirclePublic_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SubscribeCirclePublic_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SubscribeCirclePublic_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SubscribeCirclePublic_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SubscribeCirclePublic_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SubscribeCirclePublic_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SubscribeCirclePublic_owner_info_cryptoWallet | null;
}

export interface SubscribeCirclePublic_owner {
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
  status: SubscribeCirclePublic_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SubscribeCirclePublic_owner_liker;
  /**
   * User information.
   */
  info: SubscribeCirclePublic_owner_info;
}

export interface SubscribeCirclePublic_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface SubscribeCirclePublic_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface SubscribeCirclePublic_prices {
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

export interface SubscribeCirclePublic {
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
  owner: SubscribeCirclePublic_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: SubscribeCirclePublic_members;
  /**
   * List of works belong to this Circle.
   */
  works: SubscribeCirclePublic_works;
  /**
   * Prices offered by this Circle.
   */
  prices: SubscribeCirclePublic_prices[] | null;
}
