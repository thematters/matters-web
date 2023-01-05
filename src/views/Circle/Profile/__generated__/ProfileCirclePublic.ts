/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, CommentState, TransactionCurrency } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ProfileCirclePublic
// ====================================================

export interface ProfileCirclePublic_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ProfileCirclePublic_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ProfileCirclePublic_owner_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: ProfileCirclePublic_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ProfileCirclePublic_owner_info_cryptoWallet | null;
}

export interface ProfileCirclePublic_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ProfileCirclePublic_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ProfileCirclePublic_owner {
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
  info: ProfileCirclePublic_owner_info;
  /**
   * Status of current user.
   */
  status: ProfileCirclePublic_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ProfileCirclePublic_owner_liker;
}

export interface ProfileCirclePublic_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface ProfileCirclePublic_followers {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ProfileCirclePublic_pinnedBroadcast_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface ProfileCirclePublic_pinnedBroadcast {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * State of this comment.
   */
  state: CommentState;
  /**
   * Author of this comment.
   */
  author: ProfileCirclePublic_pinnedBroadcast_author;
}

export interface ProfileCirclePublic_prices {
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

export interface ProfileCirclePublic_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface ProfileCirclePublic {
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
   * Circle cover's link.
   */
  cover: string | null;
  /**
   * Circle owner.
   */
  owner: ProfileCirclePublic_owner;
  /**
   * This value determines if current viewer is Member or not.
   */
  isMember: boolean;
  /**
   * List of Circle member.
   */
  members: ProfileCirclePublic_members;
  /**
   * List of Circle follower.
   */
  followers: ProfileCirclePublic_followers;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * Pinned comments broadcasted by Circle owner.
   */
  pinnedBroadcast: ProfileCirclePublic_pinnedBroadcast[] | null;
  /**
   * Prices offered by this Circle.
   */
  prices: ProfileCirclePublic_prices[] | null;
  /**
   * List of works belong to this Circle.
   */
  works: ProfileCirclePublic_works;
}
