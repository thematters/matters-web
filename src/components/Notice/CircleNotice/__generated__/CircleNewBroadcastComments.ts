/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType, UserState, TransactionCurrency, CommentType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CircleNewBroadcastComments
// ====================================================

export interface CircleNewBroadcastComments_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CircleNewBroadcastComments_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CircleNewBroadcastComments_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: CircleNewBroadcastComments_actors_info_badges[] | null;
}

export interface CircleNewBroadcastComments_actors {
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
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: CircleNewBroadcastComments_actors_liker;
  /**
   * User information.
   */
  info: CircleNewBroadcastComments_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface CircleNewBroadcastComments_circle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface CircleNewBroadcastComments_circle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CircleNewBroadcastComments_circle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CircleNewBroadcastComments_circle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface CircleNewBroadcastComments_circle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: CircleNewBroadcastComments_circle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: CircleNewBroadcastComments_circle_owner_info_cryptoWallet | null;
}

export interface CircleNewBroadcastComments_circle_owner {
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
  status: CircleNewBroadcastComments_circle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: CircleNewBroadcastComments_circle_owner_liker;
  /**
   * User information.
   */
  info: CircleNewBroadcastComments_circle_owner_info;
}

export interface CircleNewBroadcastComments_circle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface CircleNewBroadcastComments_circle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface CircleNewBroadcastComments_circle_prices {
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

export interface CircleNewBroadcastComments_circle {
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
  owner: CircleNewBroadcastComments_circle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: CircleNewBroadcastComments_circle_members;
  /**
   * List of works belong to this Circle.
   */
  works: CircleNewBroadcastComments_circle_works;
  /**
   * Prices offered by this Circle.
   */
  prices: CircleNewBroadcastComments_circle_prices[] | null;
}

export interface CircleNewBroadcastComments_comments_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface CircleNewBroadcastComments_comments {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: CircleNewBroadcastComments_comments_parentComment | null;
}

export interface CircleNewBroadcastComments_replies_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface CircleNewBroadcastComments_replies_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface CircleNewBroadcastComments_replies {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: CircleNewBroadcastComments_replies_parentComment | null;
  /**
   * Author of this comment.
   */
  author: CircleNewBroadcastComments_replies_author;
}

export interface CircleNewBroadcastComments_mentions_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface CircleNewBroadcastComments_mentions {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: CircleNewBroadcastComments_mentions_parentComment | null;
}

export interface CircleNewBroadcastComments {
  __typename: "CircleNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * List of notice actors.
   */
  actors: CircleNewBroadcastComments_actors[] | null;
  circle: CircleNewBroadcastComments_circle;
  /**
   * Optional discussion/broadcast comments for bundled notices
   */
  comments: CircleNewBroadcastComments_comments[] | null;
  /**
   * Optional discussion/broadcast replies for bundled notices
   */
  replies: CircleNewBroadcastComments_replies[] | null;
  /**
   * Optional mention comments for bundled notices
   */
  mentions: CircleNewBroadcastComments_mentions[] | null;
}
