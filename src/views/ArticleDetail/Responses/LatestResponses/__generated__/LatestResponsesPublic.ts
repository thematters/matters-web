/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, ArticleState, CommentState, CommentType, Vote } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: LatestResponsesPublic
// ====================================================

export interface LatestResponsesPublic_article_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface LatestResponsesPublic_article_Article_responses_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Article_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Article_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Article_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Article_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Article_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: LatestResponsesPublic_article_Article_responses_edges_node_Article_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: LatestResponsesPublic_article_Article_responses_edges_node_Article_author_info_cryptoWallet | null;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Article_author {
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
  status: LatestResponsesPublic_article_Article_responses_edges_node_Article_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: LatestResponsesPublic_article_Article_responses_edges_node_Article_author_liker;
  /**
   * User information.
   */
  info: LatestResponsesPublic_article_Article_responses_edges_node_Article_author_info;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: LatestResponsesPublic_article_Article_responses_edges_node_Article_author;
  /**
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * Article title.
   */
  title: string;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Article cover's link.
   */
  cover: string | null;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: LatestResponsesPublic_article_Article_responses_edges_node_Comment_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: LatestResponsesPublic_article_Article_responses_edges_node_Comment_author_info_cryptoWallet | null;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_author {
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
  status: LatestResponsesPublic_article_Article_responses_edges_node_Comment_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: LatestResponsesPublic_article_Article_responses_edges_node_Comment_author_liker;
  /**
   * User information.
   */
  info: LatestResponsesPublic_article_Article_responses_edges_node_Comment_author_info;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_replyTo_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_replyTo_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_replyTo_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_replyTo_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_replyTo_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: LatestResponsesPublic_article_Article_responses_edges_node_Comment_replyTo_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: LatestResponsesPublic_article_Article_responses_edges_node_Comment_replyTo_author_info_cryptoWallet | null;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_replyTo_author {
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
  status: LatestResponsesPublic_article_Article_responses_edges_node_Comment_replyTo_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: LatestResponsesPublic_article_Article_responses_edges_node_Comment_replyTo_author_liker;
  /**
   * User information.
   */
  info: LatestResponsesPublic_article_Article_responses_edges_node_Comment_replyTo_author_info;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_replyTo {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: LatestResponsesPublic_article_Article_responses_edges_node_Comment_replyTo_author;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_node_Article_author {
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

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_node_Article {
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
  author: LatestResponsesPublic_article_Article_responses_edges_node_Comment_node_Article_author;
  /**
   * The number determines how many comments can be set as pinned comment.
   */
  pinCommentLeft: number;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_node_Circle_owner {
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

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_node_Circle {
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
  owner: LatestResponsesPublic_article_Article_responses_edges_node_Comment_node_Circle_owner;
}

export type LatestResponsesPublic_article_Article_responses_edges_node_Comment_node = LatestResponsesPublic_article_Article_responses_edges_node_Comment_node_User | LatestResponsesPublic_article_Article_responses_edges_node_Comment_node_Article | LatestResponsesPublic_article_Article_responses_edges_node_Comment_node_Circle;

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_author_info_cryptoWallet | null;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_author {
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
  status: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_author_liker;
  /**
   * User information.
   */
  info: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_author_info;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_replyTo_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_replyTo_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_replyTo_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_replyTo_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_replyTo_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_replyTo_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_replyTo_author_info_cryptoWallet | null;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_replyTo_author {
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
  status: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_replyTo_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_replyTo_author_liker;
  /**
   * User information.
   */
  info: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_replyTo_author_info;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_replyTo {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_replyTo_author;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_node_Article_author {
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

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_node_Article {
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
  author: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_node_Article_author;
  /**
   * The number determines how many comments can be set as pinned comment.
   */
  pinCommentLeft: number;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_node_Circle_owner {
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

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_node_Circle {
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
  owner: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_node_Circle_owner;
}

export type LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_node = LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_node_User | LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_node_Article | LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_node_Circle;

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_author;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_replyTo | null;
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
  node: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_node;
  /**
   * State of this comment.
   */
  state: CommentState;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node_parentComment | null;
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

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges {
  __typename: "CommentEdge";
  cursor: string;
  node: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges_node;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments {
  __typename: "CommentConnection";
  edges: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments_edges[] | null;
}

export interface LatestResponsesPublic_article_Article_responses_edges_node_Comment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Author of this comment.
   */
  author: LatestResponsesPublic_article_Article_responses_edges_node_Comment_author;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: LatestResponsesPublic_article_Article_responses_edges_node_Comment_replyTo | null;
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
  node: LatestResponsesPublic_article_Article_responses_edges_node_Comment_node;
  /**
   * State of this comment.
   */
  state: CommentState;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: LatestResponsesPublic_article_Article_responses_edges_node_Comment_parentComment | null;
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
  comments: LatestResponsesPublic_article_Article_responses_edges_node_Comment_comments;
  /**
   * The value determines current user's vote.
   */
  myVote: Vote | null;
}

export type LatestResponsesPublic_article_Article_responses_edges_node = LatestResponsesPublic_article_Article_responses_edges_node_Article | LatestResponsesPublic_article_Article_responses_edges_node_Comment;

export interface LatestResponsesPublic_article_Article_responses_edges {
  __typename: "ResponseEdge";
  node: LatestResponsesPublic_article_Article_responses_edges_node;
}

export interface LatestResponsesPublic_article_Article_responses {
  __typename: "ResponseConnection";
  totalCount: number;
  pageInfo: LatestResponsesPublic_article_Article_responses_pageInfo;
  edges: LatestResponsesPublic_article_Article_responses_edges[] | null;
}

export interface LatestResponsesPublic_article_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * The counting number of this article.
   */
  responseCount: number;
  /**
   * List of responses of a article.
   */
  responses: LatestResponsesPublic_article_Article_responses;
}

export type LatestResponsesPublic_article = LatestResponsesPublic_article_User | LatestResponsesPublic_article_Article;

export interface LatestResponsesPublic {
  article: LatestResponsesPublic_article | null;
}

export interface LatestResponsesPublicVariables {
  id: string;
  before?: string | null;
  after?: string | null;
  first?: any | null;
  includeAfter?: boolean | null;
  includeBefore?: boolean | null;
  articleOnly?: boolean | null;
}
