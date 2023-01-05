/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, CommentState, CommentType, Vote } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: BroadcastPublic
// ====================================================

export interface BroadcastPublic_circle_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface BroadcastPublic_circle_broadcast_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface BroadcastPublic_circle_broadcast_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface BroadcastPublic_circle_broadcast_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface BroadcastPublic_circle_broadcast_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface BroadcastPublic_circle_broadcast_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface BroadcastPublic_circle_broadcast_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: BroadcastPublic_circle_broadcast_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: BroadcastPublic_circle_broadcast_edges_node_author_info_cryptoWallet | null;
}

export interface BroadcastPublic_circle_broadcast_edges_node_author {
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
  status: BroadcastPublic_circle_broadcast_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: BroadcastPublic_circle_broadcast_edges_node_author_liker;
  /**
   * User information.
   */
  info: BroadcastPublic_circle_broadcast_edges_node_author_info;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface BroadcastPublic_circle_broadcast_edges_node_replyTo_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface BroadcastPublic_circle_broadcast_edges_node_replyTo_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface BroadcastPublic_circle_broadcast_edges_node_replyTo_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface BroadcastPublic_circle_broadcast_edges_node_replyTo_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface BroadcastPublic_circle_broadcast_edges_node_replyTo_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: BroadcastPublic_circle_broadcast_edges_node_replyTo_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: BroadcastPublic_circle_broadcast_edges_node_replyTo_author_info_cryptoWallet | null;
}

export interface BroadcastPublic_circle_broadcast_edges_node_replyTo_author {
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
  status: BroadcastPublic_circle_broadcast_edges_node_replyTo_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: BroadcastPublic_circle_broadcast_edges_node_replyTo_author_liker;
  /**
   * User information.
   */
  info: BroadcastPublic_circle_broadcast_edges_node_replyTo_author_info;
}

export interface BroadcastPublic_circle_broadcast_edges_node_replyTo {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: BroadcastPublic_circle_broadcast_edges_node_replyTo_author;
}

export interface BroadcastPublic_circle_broadcast_edges_node_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface BroadcastPublic_circle_broadcast_edges_node_node_Article_author {
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

export interface BroadcastPublic_circle_broadcast_edges_node_node_Article {
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
  author: BroadcastPublic_circle_broadcast_edges_node_node_Article_author;
  /**
   * The number determines how many comments can be set as pinned comment.
   */
  pinCommentLeft: number;
}

export interface BroadcastPublic_circle_broadcast_edges_node_node_Circle_owner {
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

export interface BroadcastPublic_circle_broadcast_edges_node_node_Circle {
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
  owner: BroadcastPublic_circle_broadcast_edges_node_node_Circle_owner;
}

export type BroadcastPublic_circle_broadcast_edges_node_node = BroadcastPublic_circle_broadcast_edges_node_node_User | BroadcastPublic_circle_broadcast_edges_node_node_Article | BroadcastPublic_circle_broadcast_edges_node_node_Circle;

export interface BroadcastPublic_circle_broadcast_edges_node_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_author_info_cryptoWallet | null;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_author {
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
  status: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_author_liker;
  /**
   * User information.
   */
  info: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_author_info;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_replyTo_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_replyTo_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_replyTo_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_replyTo_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_replyTo_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_replyTo_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_replyTo_author_info_cryptoWallet | null;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_replyTo_author {
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
  status: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_replyTo_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_replyTo_author_liker;
  /**
   * User information.
   */
  info: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_replyTo_author_info;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_replyTo {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_replyTo_author;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_node_Article_author {
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

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_node_Article {
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
  author: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_node_Article_author;
  /**
   * The number determines how many comments can be set as pinned comment.
   */
  pinCommentLeft: number;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_node_Circle_owner {
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

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_node_Circle {
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
  owner: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_node_Circle_owner;
}

export type BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_node = BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_node_User | BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_node_Article | BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_node_Circle;

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges_node {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_author;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_replyTo | null;
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
  node: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_node;
  /**
   * State of this comment.
   */
  state: CommentState;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node_parentComment | null;
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

export interface BroadcastPublic_circle_broadcast_edges_node_comments_edges {
  __typename: "CommentEdge";
  cursor: string;
  node: BroadcastPublic_circle_broadcast_edges_node_comments_edges_node;
}

export interface BroadcastPublic_circle_broadcast_edges_node_comments {
  __typename: "CommentConnection";
  edges: BroadcastPublic_circle_broadcast_edges_node_comments_edges[] | null;
}

export interface BroadcastPublic_circle_broadcast_edges_node {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: BroadcastPublic_circle_broadcast_edges_node_author;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: BroadcastPublic_circle_broadcast_edges_node_replyTo | null;
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
  node: BroadcastPublic_circle_broadcast_edges_node_node;
  /**
   * State of this comment.
   */
  state: CommentState;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: BroadcastPublic_circle_broadcast_edges_node_parentComment | null;
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
  comments: BroadcastPublic_circle_broadcast_edges_node_comments;
  /**
   * The value determines current user's vote.
   */
  myVote: Vote | null;
}

export interface BroadcastPublic_circle_broadcast_edges {
  __typename: "CommentEdge";
  node: BroadcastPublic_circle_broadcast_edges_node;
}

export interface BroadcastPublic_circle_broadcast {
  __typename: "CommentConnection";
  totalCount: number;
  pageInfo: BroadcastPublic_circle_broadcast_pageInfo;
  edges: BroadcastPublic_circle_broadcast_edges[] | null;
}

export interface BroadcastPublic_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Circle owner.
   */
  owner: BroadcastPublic_circle_owner;
  /**
   * This value determines if current viewer is Member or not.
   */
  circleIsMember: boolean;
  /**
   * Comments broadcasted by Circle owner.
   */
  broadcast: BroadcastPublic_circle_broadcast;
}

export interface BroadcastPublic {
  circle: BroadcastPublic_circle | null;
}

export interface BroadcastPublicVariables {
  name: string;
  before?: string | null;
  after?: string | null;
  first?: any | null;
  includeAfter?: boolean | null;
  includeBefore?: boolean | null;
}
