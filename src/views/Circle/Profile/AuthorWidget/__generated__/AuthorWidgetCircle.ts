/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, CommentState } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: AuthorWidgetCircle
// ====================================================

export interface AuthorWidgetCircle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface AuthorWidgetCircle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface AuthorWidgetCircle_owner_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: AuthorWidgetCircle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: AuthorWidgetCircle_owner_info_cryptoWallet | null;
}

export interface AuthorWidgetCircle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface AuthorWidgetCircle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface AuthorWidgetCircle_owner {
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
  info: AuthorWidgetCircle_owner_info;
  /**
   * Status of current user.
   */
  status: AuthorWidgetCircle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: AuthorWidgetCircle_owner_liker;
}

export interface AuthorWidgetCircle_pinnedBroadcast_author {
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

export interface AuthorWidgetCircle_pinnedBroadcast {
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
  author: AuthorWidgetCircle_pinnedBroadcast_author;
}

export interface AuthorWidgetCircle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Circle owner.
   */
  owner: AuthorWidgetCircle_owner;
  /**
   * Pinned comments broadcasted by Circle owner.
   */
  pinnedBroadcast: AuthorWidgetCircle_pinnedBroadcast[] | null;
}
