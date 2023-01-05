/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, TransactionCurrency } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: DigestRichCirclePublic
// ====================================================

export interface DigestRichCirclePublic_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DigestRichCirclePublic_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestRichCirclePublic_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestRichCirclePublic_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DigestRichCirclePublic_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestRichCirclePublic_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DigestRichCirclePublic_owner_info_cryptoWallet | null;
}

export interface DigestRichCirclePublic_owner {
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
  status: DigestRichCirclePublic_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DigestRichCirclePublic_owner_liker;
  /**
   * User information.
   */
  info: DigestRichCirclePublic_owner_info;
}

export interface DigestRichCirclePublic_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface DigestRichCirclePublic_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface DigestRichCirclePublic_prices {
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

export interface DigestRichCirclePublic {
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
  owner: DigestRichCirclePublic_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: DigestRichCirclePublic_members;
  /**
   * List of works belong to this Circle.
   */
  works: DigestRichCirclePublic_works;
  /**
   * Prices offered by this Circle.
   */
  prices: DigestRichCirclePublic_prices[] | null;
}
