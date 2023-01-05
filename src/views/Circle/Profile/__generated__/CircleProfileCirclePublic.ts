/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, CommentState, TransactionCurrency, InvitationState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: CircleProfileCirclePublic
// ====================================================

export interface CircleProfileCirclePublic_circle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CircleProfileCirclePublic_circle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface CircleProfileCirclePublic_circle_owner_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: CircleProfileCirclePublic_circle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: CircleProfileCirclePublic_circle_owner_info_cryptoWallet | null;
}

export interface CircleProfileCirclePublic_circle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface CircleProfileCirclePublic_circle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CircleProfileCirclePublic_circle_owner {
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
  info: CircleProfileCirclePublic_circle_owner_info;
  /**
   * Status of current user.
   */
  status: CircleProfileCirclePublic_circle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: CircleProfileCirclePublic_circle_owner_liker;
}

export interface CircleProfileCirclePublic_circle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface CircleProfileCirclePublic_circle_followers {
  __typename: "UserConnection";
  totalCount: number;
}

export interface CircleProfileCirclePublic_circle_pinnedBroadcast_author {
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

export interface CircleProfileCirclePublic_circle_pinnedBroadcast {
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
  author: CircleProfileCirclePublic_circle_pinnedBroadcast_author;
}

export interface CircleProfileCirclePublic_circle_prices {
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

export interface CircleProfileCirclePublic_circle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface CircleProfileCirclePublic_circle_invitedBy {
  __typename: "Invitation";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Determine it's specific state.
   */
  state: InvitationState;
  /**
   * Free period of this invitation.
   */
  freePeriod: number;
}

export interface CircleProfileCirclePublic_circle {
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
  owner: CircleProfileCirclePublic_circle_owner;
  /**
   * This value determines if current viewer is Member or not.
   */
  isMember: boolean;
  /**
   * List of Circle member.
   */
  members: CircleProfileCirclePublic_circle_members;
  /**
   * List of Circle follower.
   */
  followers: CircleProfileCirclePublic_circle_followers;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * Pinned comments broadcasted by Circle owner.
   */
  pinnedBroadcast: CircleProfileCirclePublic_circle_pinnedBroadcast[] | null;
  /**
   * Prices offered by this Circle.
   */
  prices: CircleProfileCirclePublic_circle_prices[] | null;
  /**
   * List of works belong to this Circle.
   */
  works: CircleProfileCirclePublic_circle_works;
  /**
   * This value determines if current viewer is following Circle or not.
   */
  isFollower: boolean;
  /**
   * Invitation used by current viewer.
   */
  invitedBy: CircleProfileCirclePublic_circle_invitedBy | null;
}

export interface CircleProfileCirclePublic {
  circle: CircleProfileCirclePublic_circle | null;
}

export interface CircleProfileCirclePublicVariables {
  name: string;
}
