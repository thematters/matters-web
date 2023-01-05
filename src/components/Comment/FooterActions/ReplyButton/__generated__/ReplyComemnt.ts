/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CommentState, UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ReplyComemnt
// ====================================================

export interface ReplyComemnt_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ReplyComemnt_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ReplyComemnt_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ReplyComemnt_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ReplyComemnt_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ReplyComemnt_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ReplyComemnt_author_info_cryptoWallet | null;
}

export interface ReplyComemnt_author {
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
  status: ReplyComemnt_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ReplyComemnt_author_liker;
  /**
   * User information.
   */
  info: ReplyComemnt_author_info;
}

export interface ReplyComemnt_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface ReplyComemnt_node_Circle_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface ReplyComemnt_node_Circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Circle owner.
   */
  owner: ReplyComemnt_node_Circle_owner;
}

export interface ReplyComemnt_node_Article_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface ReplyComemnt_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: ReplyComemnt_node_Article_author;
}

export type ReplyComemnt_node = ReplyComemnt_node_User | ReplyComemnt_node_Circle | ReplyComemnt_node_Article;

export interface ReplyComemnt_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface ReplyComemnt {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * State of this comment.
   */
  state: CommentState;
  /**
   * Author of this comment.
   */
  author: ReplyComemnt_author;
  /**
   * Current comment belongs to which Node.
   */
  node: ReplyComemnt_node;
  /**
   * Parent comment of this comment.
   */
  parentComment: ReplyComemnt_parentComment | null;
}
