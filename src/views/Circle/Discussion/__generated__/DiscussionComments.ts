/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, CommentState, CommentType, Vote } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: DiscussionComments
// ====================================================

export interface DiscussionComments_circle_discussion_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface DiscussionComments_circle_discussion_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DiscussionComments_circle_discussion_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DiscussionComments_circle_discussion_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DiscussionComments_circle_discussion_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DiscussionComments_circle_discussion_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DiscussionComments_circle_discussion_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DiscussionComments_circle_discussion_edges_node_author_info_cryptoWallet | null;
}

export interface DiscussionComments_circle_discussion_edges_node_author {
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
  status: DiscussionComments_circle_discussion_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DiscussionComments_circle_discussion_edges_node_author_liker;
  /**
   * User information.
   */
  info: DiscussionComments_circle_discussion_edges_node_author_info;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface DiscussionComments_circle_discussion_edges_node_replyTo_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DiscussionComments_circle_discussion_edges_node_replyTo_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DiscussionComments_circle_discussion_edges_node_replyTo_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DiscussionComments_circle_discussion_edges_node_replyTo_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DiscussionComments_circle_discussion_edges_node_replyTo_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DiscussionComments_circle_discussion_edges_node_replyTo_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DiscussionComments_circle_discussion_edges_node_replyTo_author_info_cryptoWallet | null;
}

export interface DiscussionComments_circle_discussion_edges_node_replyTo_author {
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
  status: DiscussionComments_circle_discussion_edges_node_replyTo_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DiscussionComments_circle_discussion_edges_node_replyTo_author_liker;
  /**
   * User information.
   */
  info: DiscussionComments_circle_discussion_edges_node_replyTo_author_info;
}

export interface DiscussionComments_circle_discussion_edges_node_replyTo {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: DiscussionComments_circle_discussion_edges_node_replyTo_author;
}

export interface DiscussionComments_circle_discussion_edges_node_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface DiscussionComments_circle_discussion_edges_node_node_Article_author {
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

export interface DiscussionComments_circle_discussion_edges_node_node_Article {
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
  author: DiscussionComments_circle_discussion_edges_node_node_Article_author;
  /**
   * The number determines how many comments can be set as pinned comment.
   */
  pinCommentLeft: number;
}

export interface DiscussionComments_circle_discussion_edges_node_node_Circle_owner {
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

export interface DiscussionComments_circle_discussion_edges_node_node_Circle {
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
  owner: DiscussionComments_circle_discussion_edges_node_node_Circle_owner;
}

export type DiscussionComments_circle_discussion_edges_node_node = DiscussionComments_circle_discussion_edges_node_node_User | DiscussionComments_circle_discussion_edges_node_node_Article | DiscussionComments_circle_discussion_edges_node_node_Circle;

export interface DiscussionComments_circle_discussion_edges_node_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DiscussionComments_circle_discussion_edges_node_comments_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DiscussionComments_circle_discussion_edges_node_comments_edges_node_author_info_cryptoWallet | null;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_author {
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
  status: DiscussionComments_circle_discussion_edges_node_comments_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DiscussionComments_circle_discussion_edges_node_comments_edges_node_author_liker;
  /**
   * User information.
   */
  info: DiscussionComments_circle_discussion_edges_node_comments_edges_node_author_info;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_replyTo_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_replyTo_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_replyTo_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_replyTo_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_replyTo_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DiscussionComments_circle_discussion_edges_node_comments_edges_node_replyTo_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DiscussionComments_circle_discussion_edges_node_comments_edges_node_replyTo_author_info_cryptoWallet | null;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_replyTo_author {
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
  status: DiscussionComments_circle_discussion_edges_node_comments_edges_node_replyTo_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DiscussionComments_circle_discussion_edges_node_comments_edges_node_replyTo_author_liker;
  /**
   * User information.
   */
  info: DiscussionComments_circle_discussion_edges_node_comments_edges_node_replyTo_author_info;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_replyTo {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: DiscussionComments_circle_discussion_edges_node_comments_edges_node_replyTo_author;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_node_Article_author {
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

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_node_Article {
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
  author: DiscussionComments_circle_discussion_edges_node_comments_edges_node_node_Article_author;
  /**
   * The number determines how many comments can be set as pinned comment.
   */
  pinCommentLeft: number;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_node_Circle_owner {
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

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_node_Circle {
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
  owner: DiscussionComments_circle_discussion_edges_node_comments_edges_node_node_Circle_owner;
}

export type DiscussionComments_circle_discussion_edges_node_comments_edges_node_node = DiscussionComments_circle_discussion_edges_node_comments_edges_node_node_User | DiscussionComments_circle_discussion_edges_node_comments_edges_node_node_Article | DiscussionComments_circle_discussion_edges_node_comments_edges_node_node_Circle;

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface DiscussionComments_circle_discussion_edges_node_comments_edges_node {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: DiscussionComments_circle_discussion_edges_node_comments_edges_node_author;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: DiscussionComments_circle_discussion_edges_node_comments_edges_node_replyTo | null;
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
  node: DiscussionComments_circle_discussion_edges_node_comments_edges_node_node;
  /**
   * State of this comment.
   */
  state: CommentState;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: DiscussionComments_circle_discussion_edges_node_comments_edges_node_parentComment | null;
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

export interface DiscussionComments_circle_discussion_edges_node_comments_edges {
  __typename: "CommentEdge";
  cursor: string;
  node: DiscussionComments_circle_discussion_edges_node_comments_edges_node;
}

export interface DiscussionComments_circle_discussion_edges_node_comments {
  __typename: "CommentConnection";
  edges: DiscussionComments_circle_discussion_edges_node_comments_edges[] | null;
}

export interface DiscussionComments_circle_discussion_edges_node {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: DiscussionComments_circle_discussion_edges_node_author;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: DiscussionComments_circle_discussion_edges_node_replyTo | null;
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
  node: DiscussionComments_circle_discussion_edges_node_node;
  /**
   * State of this comment.
   */
  state: CommentState;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: DiscussionComments_circle_discussion_edges_node_parentComment | null;
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
  comments: DiscussionComments_circle_discussion_edges_node_comments;
  /**
   * The value determines current user's vote.
   */
  myVote: Vote | null;
}

export interface DiscussionComments_circle_discussion_edges {
  __typename: "CommentEdge";
  node: DiscussionComments_circle_discussion_edges_node;
}

export interface DiscussionComments_circle_discussion {
  __typename: "CommentConnection";
  totalCount: number;
  pageInfo: DiscussionComments_circle_discussion_pageInfo;
  edges: DiscussionComments_circle_discussion_edges[] | null;
}

export interface DiscussionComments_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Comments made by Circle member.
   */
  discussion: DiscussionComments_circle_discussion;
}

export interface DiscussionComments {
  circle: DiscussionComments_circle | null;
}

export interface DiscussionCommentsVariables {
  name: string;
  before?: string | null;
  after?: string | null;
  first?: any | null;
  includeAfter?: boolean | null;
  includeBefore?: boolean | null;
}
