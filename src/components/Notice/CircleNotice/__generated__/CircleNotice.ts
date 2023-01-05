/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CircleNoticeType, BadgeType, UserState, TransactionCurrency, CommentType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CircleNotice
// ====================================================

export interface CircleNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CircleNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CircleNotice_actors_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface CircleNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: CircleNotice_actors_info_badges[] | null;
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: CircleNotice_actors_info_cryptoWallet | null;
}

export interface CircleNotice_actors_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface CircleNotice_actors {
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
  liker: CircleNotice_actors_liker;
  /**
   * User information.
   */
  info: CircleNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * Status of current user.
   */
  status: CircleNotice_actors_status | null;
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

export interface CircleNotice_circle_invitedBy {
  __typename: "Invitation";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Free period of this invitation.
   */
  freePeriod: number;
}

export interface CircleNotice_circle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface CircleNotice_circle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CircleNotice_circle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CircleNotice_circle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface CircleNotice_circle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: CircleNotice_circle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: CircleNotice_circle_owner_info_cryptoWallet | null;
}

export interface CircleNotice_circle_owner {
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
  status: CircleNotice_circle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: CircleNotice_circle_owner_liker;
  /**
   * User information.
   */
  info: CircleNotice_circle_owner_info;
}

export interface CircleNotice_circle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface CircleNotice_circle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface CircleNotice_circle_prices {
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

export interface CircleNotice_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Invitation used by current viewer.
   */
  invitedBy: CircleNotice_circle_invitedBy | null;
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
  owner: CircleNotice_circle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: CircleNotice_circle_members;
  /**
   * List of works belong to this Circle.
   */
  works: CircleNotice_circle_works;
  /**
   * Prices offered by this Circle.
   */
  prices: CircleNotice_circle_prices[] | null;
}

export interface CircleNotice_comments_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface CircleNotice_comments {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: CircleNotice_comments_parentComment | null;
}

export interface CircleNotice_replies_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface CircleNotice_replies_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface CircleNotice_replies_replyTo_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface CircleNotice_replies_replyTo {
  __typename: "Comment";
  /**
   * Author of this comment.
   */
  author: CircleNotice_replies_replyTo_author;
}

export interface CircleNotice_replies {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: CircleNotice_replies_parentComment | null;
  /**
   * Author of this comment.
   */
  author: CircleNotice_replies_author;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: CircleNotice_replies_replyTo | null;
}

export interface CircleNotice_mentions_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface CircleNotice_mentions {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: CircleNotice_mentions_parentComment | null;
}

export interface CircleNotice {
  __typename: "CircleNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  circleNoticeType: CircleNoticeType;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * List of notice actors.
   */
  actors: CircleNotice_actors[] | null;
  circle: CircleNotice_circle;
  /**
   * Optional discussion/broadcast comments for bundled notices
   */
  comments: CircleNotice_comments[] | null;
  /**
   * Optional discussion/broadcast replies for bundled notices
   */
  replies: CircleNotice_replies[] | null;
  /**
   * Optional mention comments for bundled notices
   */
  mentions: CircleNotice_mentions[] | null;
}
