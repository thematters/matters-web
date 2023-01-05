/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, CommentState, CommentType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ThreadCommentCommentPublic
// ====================================================

export interface ThreadCommentCommentPublic_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ThreadCommentCommentPublic_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ThreadCommentCommentPublic_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ThreadCommentCommentPublic_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ThreadCommentCommentPublic_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ThreadCommentCommentPublic_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ThreadCommentCommentPublic_author_info_cryptoWallet | null;
}

export interface ThreadCommentCommentPublic_author {
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
  status: ThreadCommentCommentPublic_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ThreadCommentCommentPublic_author_liker;
  /**
   * User information.
   */
  info: ThreadCommentCommentPublic_author_info;
}

export interface ThreadCommentCommentPublic_replyTo_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ThreadCommentCommentPublic_replyTo_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ThreadCommentCommentPublic_replyTo_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ThreadCommentCommentPublic_replyTo_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ThreadCommentCommentPublic_replyTo_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ThreadCommentCommentPublic_replyTo_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ThreadCommentCommentPublic_replyTo_author_info_cryptoWallet | null;
}

export interface ThreadCommentCommentPublic_replyTo_author {
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
  status: ThreadCommentCommentPublic_replyTo_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ThreadCommentCommentPublic_replyTo_author_liker;
  /**
   * User information.
   */
  info: ThreadCommentCommentPublic_replyTo_author_info;
}

export interface ThreadCommentCommentPublic_replyTo {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: ThreadCommentCommentPublic_replyTo_author;
}

export interface ThreadCommentCommentPublic_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface ThreadCommentCommentPublic_node_Article_author {
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

export interface ThreadCommentCommentPublic_node_Article {
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
  author: ThreadCommentCommentPublic_node_Article_author;
  /**
   * The number determines how many comments can be set as pinned comment.
   */
  pinCommentLeft: number;
}

export interface ThreadCommentCommentPublic_node_Circle_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface ThreadCommentCommentPublic_node_Circle {
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
  owner: ThreadCommentCommentPublic_node_Circle_owner;
}

export type ThreadCommentCommentPublic_node = ThreadCommentCommentPublic_node_User | ThreadCommentCommentPublic_node_Article | ThreadCommentCommentPublic_node_Circle;

export interface ThreadCommentCommentPublic_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface ThreadCommentCommentPublic_comments_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ThreadCommentCommentPublic_comments_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ThreadCommentCommentPublic_comments_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ThreadCommentCommentPublic_comments_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ThreadCommentCommentPublic_comments_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ThreadCommentCommentPublic_comments_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ThreadCommentCommentPublic_comments_edges_node_author_info_cryptoWallet | null;
}

export interface ThreadCommentCommentPublic_comments_edges_node_author {
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
  status: ThreadCommentCommentPublic_comments_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ThreadCommentCommentPublic_comments_edges_node_author_liker;
  /**
   * User information.
   */
  info: ThreadCommentCommentPublic_comments_edges_node_author_info;
}

export interface ThreadCommentCommentPublic_comments_edges_node_replyTo_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ThreadCommentCommentPublic_comments_edges_node_replyTo_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ThreadCommentCommentPublic_comments_edges_node_replyTo_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ThreadCommentCommentPublic_comments_edges_node_replyTo_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ThreadCommentCommentPublic_comments_edges_node_replyTo_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ThreadCommentCommentPublic_comments_edges_node_replyTo_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ThreadCommentCommentPublic_comments_edges_node_replyTo_author_info_cryptoWallet | null;
}

export interface ThreadCommentCommentPublic_comments_edges_node_replyTo_author {
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
  status: ThreadCommentCommentPublic_comments_edges_node_replyTo_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ThreadCommentCommentPublic_comments_edges_node_replyTo_author_liker;
  /**
   * User information.
   */
  info: ThreadCommentCommentPublic_comments_edges_node_replyTo_author_info;
}

export interface ThreadCommentCommentPublic_comments_edges_node_replyTo {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: ThreadCommentCommentPublic_comments_edges_node_replyTo_author;
}

export interface ThreadCommentCommentPublic_comments_edges_node_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface ThreadCommentCommentPublic_comments_edges_node_node_Article_author {
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

export interface ThreadCommentCommentPublic_comments_edges_node_node_Article {
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
  author: ThreadCommentCommentPublic_comments_edges_node_node_Article_author;
  /**
   * The number determines how many comments can be set as pinned comment.
   */
  pinCommentLeft: number;
}

export interface ThreadCommentCommentPublic_comments_edges_node_node_Circle_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface ThreadCommentCommentPublic_comments_edges_node_node_Circle {
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
  owner: ThreadCommentCommentPublic_comments_edges_node_node_Circle_owner;
}

export type ThreadCommentCommentPublic_comments_edges_node_node = ThreadCommentCommentPublic_comments_edges_node_node_User | ThreadCommentCommentPublic_comments_edges_node_node_Article | ThreadCommentCommentPublic_comments_edges_node_node_Circle;

export interface ThreadCommentCommentPublic_comments_edges_node_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface ThreadCommentCommentPublic_comments_edges_node {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: ThreadCommentCommentPublic_comments_edges_node_author;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: ThreadCommentCommentPublic_comments_edges_node_replyTo | null;
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
  node: ThreadCommentCommentPublic_comments_edges_node_node;
  /**
   * State of this comment.
   */
  state: CommentState;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: ThreadCommentCommentPublic_comments_edges_node_parentComment | null;
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

export interface ThreadCommentCommentPublic_comments_edges {
  __typename: "CommentEdge";
  cursor: string;
  node: ThreadCommentCommentPublic_comments_edges_node;
}

export interface ThreadCommentCommentPublic_comments {
  __typename: "CommentConnection";
  edges: ThreadCommentCommentPublic_comments_edges[] | null;
}

export interface ThreadCommentCommentPublic {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: ThreadCommentCommentPublic_author;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: ThreadCommentCommentPublic_replyTo | null;
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
  node: ThreadCommentCommentPublic_node;
  /**
   * State of this comment.
   */
  state: CommentState;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: ThreadCommentCommentPublic_parentComment | null;
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
  /**
   * Descendant comments of this comment.
   */
  comments: ThreadCommentCommentPublic_comments;
}
