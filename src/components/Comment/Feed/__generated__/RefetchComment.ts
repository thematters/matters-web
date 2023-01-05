/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, CommentState, CommentType, Vote } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: RefetchComment
// ====================================================

export interface RefetchComment_node_Article {
  __typename: "Article" | "User" | "Tag" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface RefetchComment_node_Comment_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface RefetchComment_node_Comment_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface RefetchComment_node_Comment_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface RefetchComment_node_Comment_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface RefetchComment_node_Comment_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: RefetchComment_node_Comment_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: RefetchComment_node_Comment_author_info_cryptoWallet | null;
}

export interface RefetchComment_node_Comment_author {
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
  status: RefetchComment_node_Comment_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: RefetchComment_node_Comment_author_liker;
  /**
   * User information.
   */
  info: RefetchComment_node_Comment_author_info;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface RefetchComment_node_Comment_replyTo_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface RefetchComment_node_Comment_replyTo_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface RefetchComment_node_Comment_replyTo_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface RefetchComment_node_Comment_replyTo_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface RefetchComment_node_Comment_replyTo_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: RefetchComment_node_Comment_replyTo_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: RefetchComment_node_Comment_replyTo_author_info_cryptoWallet | null;
}

export interface RefetchComment_node_Comment_replyTo_author {
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
  status: RefetchComment_node_Comment_replyTo_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: RefetchComment_node_Comment_replyTo_author_liker;
  /**
   * User information.
   */
  info: RefetchComment_node_Comment_replyTo_author_info;
}

export interface RefetchComment_node_Comment_replyTo {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: RefetchComment_node_Comment_replyTo_author;
}

export interface RefetchComment_node_Comment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface RefetchComment_node_Comment_node_Article_author {
  __typename: "User";
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is blocking viewer.
   */
  isBlocking: boolean;
}

export interface RefetchComment_node_Comment_node_Article {
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
  author: RefetchComment_node_Comment_node_Article_author;
  /**
   * The number determines how many comments can be set as pinned comment.
   */
  pinCommentLeft: number;
}

export interface RefetchComment_node_Comment_node_Circle_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is blocking viewer.
   */
  isBlocking: boolean;
}

export interface RefetchComment_node_Comment_node_Circle {
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
  owner: RefetchComment_node_Comment_node_Circle_owner;
}

export type RefetchComment_node_Comment_node = RefetchComment_node_Comment_node_User | RefetchComment_node_Comment_node_Article | RefetchComment_node_Comment_node_Circle;

export interface RefetchComment_node_Comment_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface RefetchComment_node_Comment_comments_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface RefetchComment_node_Comment_comments_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface RefetchComment_node_Comment_comments_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface RefetchComment_node_Comment_comments_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface RefetchComment_node_Comment_comments_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: RefetchComment_node_Comment_comments_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: RefetchComment_node_Comment_comments_edges_node_author_info_cryptoWallet | null;
}

export interface RefetchComment_node_Comment_comments_edges_node_author {
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
  status: RefetchComment_node_Comment_comments_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: RefetchComment_node_Comment_comments_edges_node_author_liker;
  /**
   * User information.
   */
  info: RefetchComment_node_Comment_comments_edges_node_author_info;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface RefetchComment_node_Comment_comments_edges_node_replyTo_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface RefetchComment_node_Comment_comments_edges_node_replyTo_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface RefetchComment_node_Comment_comments_edges_node_replyTo_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface RefetchComment_node_Comment_comments_edges_node_replyTo_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface RefetchComment_node_Comment_comments_edges_node_replyTo_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: RefetchComment_node_Comment_comments_edges_node_replyTo_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: RefetchComment_node_Comment_comments_edges_node_replyTo_author_info_cryptoWallet | null;
}

export interface RefetchComment_node_Comment_comments_edges_node_replyTo_author {
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
  status: RefetchComment_node_Comment_comments_edges_node_replyTo_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: RefetchComment_node_Comment_comments_edges_node_replyTo_author_liker;
  /**
   * User information.
   */
  info: RefetchComment_node_Comment_comments_edges_node_replyTo_author_info;
}

export interface RefetchComment_node_Comment_comments_edges_node_replyTo {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: RefetchComment_node_Comment_comments_edges_node_replyTo_author;
}

export interface RefetchComment_node_Comment_comments_edges_node_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface RefetchComment_node_Comment_comments_edges_node_node_Article_author {
  __typename: "User";
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is blocking viewer.
   */
  isBlocking: boolean;
}

export interface RefetchComment_node_Comment_comments_edges_node_node_Article {
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
  author: RefetchComment_node_Comment_comments_edges_node_node_Article_author;
  /**
   * The number determines how many comments can be set as pinned comment.
   */
  pinCommentLeft: number;
}

export interface RefetchComment_node_Comment_comments_edges_node_node_Circle_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is blocking viewer.
   */
  isBlocking: boolean;
}

export interface RefetchComment_node_Comment_comments_edges_node_node_Circle {
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
  owner: RefetchComment_node_Comment_comments_edges_node_node_Circle_owner;
}

export type RefetchComment_node_Comment_comments_edges_node_node = RefetchComment_node_Comment_comments_edges_node_node_User | RefetchComment_node_Comment_comments_edges_node_node_Article | RefetchComment_node_Comment_comments_edges_node_node_Circle;

export interface RefetchComment_node_Comment_comments_edges_node_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface RefetchComment_node_Comment_comments_edges_node {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: RefetchComment_node_Comment_comments_edges_node_author;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: RefetchComment_node_Comment_comments_edges_node_replyTo | null;
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
  node: RefetchComment_node_Comment_comments_edges_node_node;
  /**
   * State of this comment.
   */
  state: CommentState;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: RefetchComment_node_Comment_comments_edges_node_parentComment | null;
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
   * The value determines current user's vote.
   */
  myVote: Vote | null;
}

export interface RefetchComment_node_Comment_comments_edges {
  __typename: "CommentEdge";
  cursor: string;
  node: RefetchComment_node_Comment_comments_edges_node;
}

export interface RefetchComment_node_Comment_comments {
  __typename: "CommentConnection";
  edges: RefetchComment_node_Comment_comments_edges[] | null;
}

export interface RefetchComment_node_Comment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: RefetchComment_node_Comment_author;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: RefetchComment_node_Comment_replyTo | null;
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
  node: RefetchComment_node_Comment_node;
  /**
   * State of this comment.
   */
  state: CommentState;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: RefetchComment_node_Comment_parentComment | null;
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
   * The value determines current user's vote.
   */
  myVote: Vote | null;
  /**
   * Descendant comments of this comment.
   */
  comments: RefetchComment_node_Comment_comments;
}

export type RefetchComment_node = RefetchComment_node_Article | RefetchComment_node_Comment;

export interface RefetchComment {
  node: RefetchComment_node | null;
}

export interface RefetchCommentVariables {
  id: string;
}
