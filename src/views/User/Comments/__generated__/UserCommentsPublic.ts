/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType, CommentState, CommentType, Vote } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserCommentsPublic
// ====================================================

export interface UserCommentsPublic_node_Article {
  __typename: "Article" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface UserCommentsPublic_node_User_commentedArticles_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_author_info_cryptoWallet | null;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_author {
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
  status: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_author_liker;
  /**
   * User information.
   */
  info: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_author_info;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_replyTo_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_replyTo_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_replyTo_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_replyTo_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_replyTo_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_replyTo_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_replyTo_author_info_cryptoWallet | null;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_replyTo_author {
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
  status: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_replyTo_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_replyTo_author_liker;
  /**
   * User information.
   */
  info: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_replyTo_author_info;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_replyTo {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_replyTo_author;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_node_Article_author {
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

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_node_Article {
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
  author: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_node_Article_author;
  /**
   * The number determines how many comments can be set as pinned comment.
   */
  pinCommentLeft: number;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_node_Circle_owner {
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

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_node_Circle {
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
  owner: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_node_Circle_owner;
}

export type UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_node = UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_node_User | UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_node_Article | UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_node_Circle;

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_author;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_replyTo | null;
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
  node: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_node;
  /**
   * State of this comment.
   */
  state: CommentState;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node_parentComment | null;
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

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges {
  __typename: "CommentEdge";
  cursor: string;
  node: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges_node;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node_comments {
  __typename: "CommentConnection";
  edges: UserCommentsPublic_node_User_commentedArticles_edges_node_comments_edges[] | null;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges_node {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Article title.
   */
  title: string;
  /**
   * State of this article.
   */
  articleState: ArticleState;
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
  author: UserCommentsPublic_node_User_commentedArticles_edges_node_author;
  /**
   * List of comments of this article.
   */
  comments: UserCommentsPublic_node_User_commentedArticles_edges_node_comments;
}

export interface UserCommentsPublic_node_User_commentedArticles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: UserCommentsPublic_node_User_commentedArticles_edges_node;
}

export interface UserCommentsPublic_node_User_commentedArticles {
  __typename: "ArticleConnection";
  pageInfo: UserCommentsPublic_node_User_commentedArticles_pageInfo;
  edges: UserCommentsPublic_node_User_commentedArticles_edges[] | null;
}

export interface UserCommentsPublic_node_User {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Articles current user commented on
   */
  commentedArticles: UserCommentsPublic_node_User_commentedArticles;
}

export type UserCommentsPublic_node = UserCommentsPublic_node_Article | UserCommentsPublic_node_User;

export interface UserCommentsPublic {
  node: UserCommentsPublic_node | null;
}

export interface UserCommentsPublicVariables {
  id: string;
  after?: string | null;
}
