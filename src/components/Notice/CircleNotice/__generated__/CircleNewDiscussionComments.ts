/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType, UserState, TransactionCurrency, CommentType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CircleNewDiscussionComments
// ====================================================

export interface CircleNewDiscussionComments_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CircleNewDiscussionComments_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CircleNewDiscussionComments_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: CircleNewDiscussionComments_actors_info_badges[] | null;
}

export interface CircleNewDiscussionComments_actors {
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
  liker: CircleNewDiscussionComments_actors_liker;
  /**
   * User information.
   */
  info: CircleNewDiscussionComments_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface CircleNewDiscussionComments_circle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface CircleNewDiscussionComments_circle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CircleNewDiscussionComments_circle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CircleNewDiscussionComments_circle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface CircleNewDiscussionComments_circle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: CircleNewDiscussionComments_circle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: CircleNewDiscussionComments_circle_owner_info_cryptoWallet | null;
}

export interface CircleNewDiscussionComments_circle_owner {
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
  status: CircleNewDiscussionComments_circle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: CircleNewDiscussionComments_circle_owner_liker;
  /**
   * User information.
   */
  info: CircleNewDiscussionComments_circle_owner_info;
}

export interface CircleNewDiscussionComments_circle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface CircleNewDiscussionComments_circle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface CircleNewDiscussionComments_circle_prices {
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

export interface CircleNewDiscussionComments_circle {
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
  owner: CircleNewDiscussionComments_circle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: CircleNewDiscussionComments_circle_members;
  /**
   * List of works belong to this Circle.
   */
  works: CircleNewDiscussionComments_circle_works;
  /**
   * Prices offered by this Circle.
   */
  prices: CircleNewDiscussionComments_circle_prices[] | null;
}

export interface CircleNewDiscussionComments_comments_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface CircleNewDiscussionComments_comments {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: CircleNewDiscussionComments_comments_parentComment | null;
}

export interface CircleNewDiscussionComments_replies_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface CircleNewDiscussionComments_replies_replyTo_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface CircleNewDiscussionComments_replies_replyTo {
  __typename: "Comment";
  /**
   * Author of this comment.
   */
  author: CircleNewDiscussionComments_replies_replyTo_author;
}

export interface CircleNewDiscussionComments_replies {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: CircleNewDiscussionComments_replies_parentComment | null;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: CircleNewDiscussionComments_replies_replyTo | null;
}

export interface CircleNewDiscussionComments_mentions_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface CircleNewDiscussionComments_mentions {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: CircleNewDiscussionComments_mentions_parentComment | null;
}

export interface CircleNewDiscussionComments {
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
  actors: CircleNewDiscussionComments_actors[] | null;
  circle: CircleNewDiscussionComments_circle;
  /**
   * Optional discussion/broadcast comments for bundled notices
   */
  comments: CircleNewDiscussionComments_comments[] | null;
  /**
   * Optional discussion/broadcast replies for bundled notices
   */
  replies: CircleNewDiscussionComments_replies[] | null;
  /**
   * Optional mention comments for bundled notices
   */
  mentions: CircleNewDiscussionComments_mentions[] | null;
}
