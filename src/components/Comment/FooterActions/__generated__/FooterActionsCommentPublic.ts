/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CommentState, CommentType, UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FooterActionsCommentPublic
// ====================================================

export interface FooterActionsCommentPublic_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface FooterActionsCommentPublic_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface FooterActionsCommentPublic_node_Article_author {
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

export interface FooterActionsCommentPublic_node_Article {
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
  author: FooterActionsCommentPublic_node_Article_author;
}

export interface FooterActionsCommentPublic_node_Circle_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface FooterActionsCommentPublic_node_Circle {
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
  owner: FooterActionsCommentPublic_node_Circle_owner;
}

export type FooterActionsCommentPublic_node = FooterActionsCommentPublic_node_User | FooterActionsCommentPublic_node_Article | FooterActionsCommentPublic_node_Circle;

export interface FooterActionsCommentPublic_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface FooterActionsCommentPublic_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FooterActionsCommentPublic_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FooterActionsCommentPublic_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface FooterActionsCommentPublic_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: FooterActionsCommentPublic_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: FooterActionsCommentPublic_author_info_cryptoWallet | null;
}

export interface FooterActionsCommentPublic_author {
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
  status: FooterActionsCommentPublic_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: FooterActionsCommentPublic_author_liker;
  /**
   * User information.
   */
  info: FooterActionsCommentPublic_author_info;
}

export interface FooterActionsCommentPublic {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * State of this comment.
   */
  state: CommentState;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: FooterActionsCommentPublic_parentComment | null;
  /**
   * Current comment belongs to which Node.
   */
  node: FooterActionsCommentPublic_node;
  /**
   * Time of this comment was created.
   */
  createdAt: any;
  /**
   * Author of this comment.
   */
  author: FooterActionsCommentPublic_author;
  /**
   * The counting number of upvotes.
   */
  upvotes: number;
  /**
   * The counting number of downvotes.
   */
  downvotes: number;
}
