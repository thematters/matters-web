/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, CommentState, CommentType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FeedCommentPublic
// ====================================================

export interface FeedCommentPublic_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface FeedCommentPublic_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FeedCommentPublic_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FeedCommentPublic_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface FeedCommentPublic_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: FeedCommentPublic_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: FeedCommentPublic_author_info_cryptoWallet | null;
}

export interface FeedCommentPublic_author {
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
  status: FeedCommentPublic_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: FeedCommentPublic_author_liker;
  /**
   * User information.
   */
  info: FeedCommentPublic_author_info;
}

export interface FeedCommentPublic_replyTo_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface FeedCommentPublic_replyTo_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FeedCommentPublic_replyTo_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FeedCommentPublic_replyTo_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface FeedCommentPublic_replyTo_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: FeedCommentPublic_replyTo_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: FeedCommentPublic_replyTo_author_info_cryptoWallet | null;
}

export interface FeedCommentPublic_replyTo_author {
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
  status: FeedCommentPublic_replyTo_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: FeedCommentPublic_replyTo_author_liker;
  /**
   * User information.
   */
  info: FeedCommentPublic_replyTo_author_info;
}

export interface FeedCommentPublic_replyTo {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: FeedCommentPublic_replyTo_author;
}

export interface FeedCommentPublic_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface FeedCommentPublic_node_Article_author {
  __typename: "User";
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
  /**
   * Global id of an user.
   */
  id: string;
}

export interface FeedCommentPublic_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Author of this article.
   */
  author: FeedCommentPublic_node_Article_author;
  /**
   * The number determines how many comments can be set as pinned comment.
   */
  pinCommentLeft: number;
}

export interface FeedCommentPublic_node_Circle_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface FeedCommentPublic_node_Circle {
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
   * Circle owner.
   */
  owner: FeedCommentPublic_node_Circle_owner;
}

export type FeedCommentPublic_node = FeedCommentPublic_node_User | FeedCommentPublic_node_Article | FeedCommentPublic_node_Circle;

export interface FeedCommentPublic_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface FeedCommentPublic {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: FeedCommentPublic_author;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: FeedCommentPublic_replyTo | null;
  /**
   * This value determines this comment is from article donator or not.
   */
  fromDonator: boolean;
  /**
   * This value determines this comment is pinned or not.
   */
  pinned: boolean;
  /**
   * Current comment belongs to which Node.
   */
  node: FeedCommentPublic_node;
  /**
   * State of this comment.
   */
  state: CommentState;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: FeedCommentPublic_parentComment | null;
  /**
   * Time of this comment was created.
   */
  createdAt: any;
  /**
   * The counting number of upvotes.
   */
  upvotes: number;
  /**
   * The counting number of downvotes.
   */
  downvotes: number;
  /**
   * Content of this comment.
   */
  content: string | null;
}
