/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserNoticeType, BadgeType, UserState, ArticleArticleNoticeType, ArticleState, ArticleNoticeType, ArticleTagNoticeType, CommentCommentNoticeType, CommentState, CommentType, CommentNoticeType, TagNoticeType, TransactionNoticeType, TransactionCurrency, CircleNoticeType, CryptoNoticeType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: DigestNotice
// ====================================================

export interface DigestNotice_UserNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestNotice_UserNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestNotice_UserNotice_actors_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DigestNotice_UserNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestNotice_UserNotice_actors_info_badges[] | null;
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DigestNotice_UserNotice_actors_info_cryptoWallet | null;
}

export interface DigestNotice_UserNotice_actors_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DigestNotice_UserNotice_actors {
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
  liker: DigestNotice_UserNotice_actors_liker;
  /**
   * User information.
   */
  info: DigestNotice_UserNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * Status of current user.
   */
  status: DigestNotice_UserNotice_actors_status | null;
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

export interface DigestNotice_UserNotice {
  __typename: "UserNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  userNoticeType: UserNoticeType;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * List of notice actors.
   */
  actors: DigestNotice_UserNotice_actors[] | null;
}

export interface DigestNotice_ArticleArticleNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestNotice_ArticleArticleNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestNotice_ArticleArticleNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestNotice_ArticleArticleNotice_actors_info_badges[] | null;
}

export interface DigestNotice_ArticleArticleNotice_actors {
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
  liker: DigestNotice_ArticleArticleNotice_actors_liker;
  /**
   * User information.
   */
  info: DigestNotice_ArticleArticleNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface DigestNotice_ArticleArticleNotice_article_author {
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

export interface DigestNotice_ArticleArticleNotice_article {
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
  author: DigestNotice_ArticleArticleNotice_article_author;
}

export interface DigestNotice_ArticleArticleNotice_collection_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DigestNotice_ArticleArticleNotice_collection_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestNotice_ArticleArticleNotice_collection_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestNotice_ArticleArticleNotice_collection_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DigestNotice_ArticleArticleNotice_collection_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestNotice_ArticleArticleNotice_collection_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DigestNotice_ArticleArticleNotice_collection_author_info_cryptoWallet | null;
}

export interface DigestNotice_ArticleArticleNotice_collection_author {
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
  status: DigestNotice_ArticleArticleNotice_collection_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DigestNotice_ArticleArticleNotice_collection_author_liker;
  /**
   * User information.
   */
  info: DigestNotice_ArticleArticleNotice_collection_author_info;
}

export interface DigestNotice_ArticleArticleNotice_collection {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
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
  /**
   * Author of this article.
   */
  author: DigestNotice_ArticleArticleNotice_collection_author;
}

export interface DigestNotice_ArticleArticleNotice {
  __typename: "ArticleArticleNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  articleArticleNoticeType: ArticleArticleNoticeType;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * List of notice actors.
   */
  actors: DigestNotice_ArticleArticleNotice_actors[] | null;
  article: DigestNotice_ArticleArticleNotice_article;
  collection: DigestNotice_ArticleArticleNotice_collection;
}

export interface DigestNotice_ArticleNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestNotice_ArticleNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestNotice_ArticleNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestNotice_ArticleNotice_actors_info_badges[] | null;
}

export interface DigestNotice_ArticleNotice_actors {
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
  liker: DigestNotice_ArticleNotice_actors_liker;
  /**
   * User information.
   */
  info: DigestNotice_ArticleNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface DigestNotice_ArticleNotice_article_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DigestNotice_ArticleNotice_article_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestNotice_ArticleNotice_article_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestNotice_ArticleNotice_article_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DigestNotice_ArticleNotice_article_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestNotice_ArticleNotice_article_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DigestNotice_ArticleNotice_article_author_info_cryptoWallet | null;
}

export interface DigestNotice_ArticleNotice_article_author {
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
  status: DigestNotice_ArticleNotice_article_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DigestNotice_ArticleNotice_article_author_liker;
  /**
   * User information.
   */
  info: DigestNotice_ArticleNotice_article_author_info;
}

export interface DigestNotice_ArticleNotice_article_access_circle {
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
   * Human readable name of this Circle.
   */
  displayName: string;
}

export interface DigestNotice_ArticleNotice_article_access {
  __typename: "ArticleAccess";
  circle: DigestNotice_ArticleNotice_article_access_circle | null;
}

export interface DigestNotice_ArticleNotice_article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
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
  /**
   * Author of this article.
   */
  author: DigestNotice_ArticleNotice_article_author;
  /**
   * Access related fields on circle
   */
  access: DigestNotice_ArticleNotice_article_access;
}

export interface DigestNotice_ArticleNotice {
  __typename: "ArticleNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  articleNoticeType: ArticleNoticeType;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * List of notice actors.
   */
  actors: DigestNotice_ArticleNotice_actors[] | null;
  article: DigestNotice_ArticleNotice_article;
}

export interface DigestNotice_ArticleTagNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestNotice_ArticleTagNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestNotice_ArticleTagNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestNotice_ArticleTagNotice_actors_info_badges[] | null;
}

export interface DigestNotice_ArticleTagNotice_actors {
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
  liker: DigestNotice_ArticleTagNotice_actors_liker;
  /**
   * User information.
   */
  info: DigestNotice_ArticleTagNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface DigestNotice_ArticleTagNotice_target_author {
  __typename: "User";
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface DigestNotice_ArticleTagNotice_target {
  __typename: "Article";
  /**
   * Author of this article.
   */
  author: DigestNotice_ArticleTagNotice_target_author;
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
}

export interface DigestNotice_ArticleTagNotice_tag {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
}

export interface DigestNotice_ArticleTagNotice {
  __typename: "ArticleTagNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  articleTagNoticeType: ArticleTagNoticeType;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * List of notice actors.
   */
  actors: DigestNotice_ArticleTagNotice_actors[] | null;
  target: DigestNotice_ArticleTagNotice_target;
  tag: DigestNotice_ArticleTagNotice_tag;
}

export interface DigestNotice_CommentCommentNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestNotice_CommentCommentNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestNotice_CommentCommentNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestNotice_CommentCommentNotice_actors_info_badges[] | null;
}

export interface DigestNotice_CommentCommentNotice_actors {
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
  liker: DigestNotice_CommentCommentNotice_actors_liker;
  /**
   * User information.
   */
  info: DigestNotice_CommentCommentNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface DigestNotice_CommentCommentNotice_comment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface DigestNotice_CommentCommentNotice_comment_node_Article_author {
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

export interface DigestNotice_CommentCommentNotice_comment_node_Article {
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
  author: DigestNotice_CommentCommentNotice_comment_node_Article_author;
}

export interface DigestNotice_CommentCommentNotice_comment_node_Circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Slugified name of this Circle.
   */
  name: string;
}

export type DigestNotice_CommentCommentNotice_comment_node = DigestNotice_CommentCommentNotice_comment_node_User | DigestNotice_CommentCommentNotice_comment_node_Article | DigestNotice_CommentCommentNotice_comment_node_Circle;

export interface DigestNotice_CommentCommentNotice_comment_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface DigestNotice_CommentCommentNotice_comment_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface DigestNotice_CommentCommentNotice_comment {
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
   * Current comment belongs to which Node.
   */
  node: DigestNotice_CommentCommentNotice_comment_node;
  /**
   * Parent comment of this comment.
   */
  parentComment: DigestNotice_CommentCommentNotice_comment_parentComment | null;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * Author of this comment.
   */
  author: DigestNotice_CommentCommentNotice_comment_author;
}

export interface DigestNotice_CommentCommentNotice_reply_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface DigestNotice_CommentCommentNotice_reply_node_Article_author {
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

export interface DigestNotice_CommentCommentNotice_reply_node_Article {
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
  author: DigestNotice_CommentCommentNotice_reply_node_Article_author;
  /**
   * State of this article.
   */
  articleState: ArticleState;
}

export interface DigestNotice_CommentCommentNotice_reply_node_Circle {
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
   * Human readable name of this Circle.
   */
  displayName: string;
}

export type DigestNotice_CommentCommentNotice_reply_node = DigestNotice_CommentCommentNotice_reply_node_User | DigestNotice_CommentCommentNotice_reply_node_Article | DigestNotice_CommentCommentNotice_reply_node_Circle;

export interface DigestNotice_CommentCommentNotice_reply_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface DigestNotice_CommentCommentNotice_reply_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface DigestNotice_CommentCommentNotice_reply {
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
   * Current comment belongs to which Node.
   */
  node: DigestNotice_CommentCommentNotice_reply_node;
  /**
   * Parent comment of this comment.
   */
  parentComment: DigestNotice_CommentCommentNotice_reply_parentComment | null;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * Author of this comment.
   */
  author: DigestNotice_CommentCommentNotice_reply_author;
}

export interface DigestNotice_CommentCommentNotice {
  __typename: "CommentCommentNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  commentCommentNoticeType: CommentCommentNoticeType;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * List of notice actors.
   */
  actors: DigestNotice_CommentCommentNotice_actors[] | null;
  comment: DigestNotice_CommentCommentNotice_comment;
  reply: DigestNotice_CommentCommentNotice_reply;
}

export interface DigestNotice_CommentNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestNotice_CommentNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestNotice_CommentNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestNotice_CommentNotice_actors_info_badges[] | null;
}

export interface DigestNotice_CommentNotice_actors {
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
  liker: DigestNotice_CommentNotice_actors_liker;
  /**
   * User information.
   */
  info: DigestNotice_CommentNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface DigestNotice_CommentNotice_comment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface DigestNotice_CommentNotice_comment_node_Article_author {
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

export interface DigestNotice_CommentNotice_comment_node_Article {
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
  author: DigestNotice_CommentNotice_comment_node_Article_author;
  /**
   * State of this article.
   */
  articleState: ArticleState;
}

export interface DigestNotice_CommentNotice_comment_node_Circle {
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
   * Human readable name of this Circle.
   */
  displayName: string;
}

export type DigestNotice_CommentNotice_comment_node = DigestNotice_CommentNotice_comment_node_User | DigestNotice_CommentNotice_comment_node_Article | DigestNotice_CommentNotice_comment_node_Circle;

export interface DigestNotice_CommentNotice_comment_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface DigestNotice_CommentNotice_comment_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface DigestNotice_CommentNotice_comment {
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
   * Current comment belongs to which Node.
   */
  node: DigestNotice_CommentNotice_comment_node;
  /**
   * Parent comment of this comment.
   */
  parentComment: DigestNotice_CommentNotice_comment_parentComment | null;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * Author of this comment.
   */
  author: DigestNotice_CommentNotice_comment_author;
}

export interface DigestNotice_CommentNotice {
  __typename: "CommentNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  commentNoticeType: CommentNoticeType;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * List of notice actors.
   */
  actors: DigestNotice_CommentNotice_actors[] | null;
  comment: DigestNotice_CommentNotice_comment;
}

export interface DigestNotice_TagNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestNotice_TagNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestNotice_TagNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestNotice_TagNotice_actors_info_badges[] | null;
}

export interface DigestNotice_TagNotice_actors {
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
  liker: DigestNotice_TagNotice_actors_liker;
  /**
   * User information.
   */
  info: DigestNotice_TagNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface DigestNotice_TagNotice_tag {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
}

export interface DigestNotice_TagNotice {
  __typename: "TagNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  tagNoticeType: TagNoticeType;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * List of notice actors.
   */
  actors: DigestNotice_TagNotice_actors[] | null;
  tag: DigestNotice_TagNotice_tag;
}

export interface DigestNotice_TransactionNotice_tx_target_Circle {
  __typename: "Circle" | "Transaction";
}

export interface DigestNotice_TransactionNotice_tx_target_Article_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DigestNotice_TransactionNotice_tx_target_Article_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestNotice_TransactionNotice_tx_target_Article_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestNotice_TransactionNotice_tx_target_Article_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DigestNotice_TransactionNotice_tx_target_Article_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestNotice_TransactionNotice_tx_target_Article_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DigestNotice_TransactionNotice_tx_target_Article_author_info_cryptoWallet | null;
}

export interface DigestNotice_TransactionNotice_tx_target_Article_author {
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
  status: DigestNotice_TransactionNotice_tx_target_Article_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DigestNotice_TransactionNotice_tx_target_Article_author_liker;
  /**
   * User information.
   */
  info: DigestNotice_TransactionNotice_tx_target_Article_author_info;
}

export interface DigestNotice_TransactionNotice_tx_target_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
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
  /**
   * Author of this article.
   */
  author: DigestNotice_TransactionNotice_tx_target_Article_author;
}

export type DigestNotice_TransactionNotice_tx_target = DigestNotice_TransactionNotice_tx_target_Circle | DigestNotice_TransactionNotice_tx_target_Article;

export interface DigestNotice_TransactionNotice_tx {
  __typename: "Transaction";
  id: string;
  amount: number;
  currency: TransactionCurrency;
  /**
   * Related target article or transaction.
   */
  target: DigestNotice_TransactionNotice_tx_target | null;
}

export interface DigestNotice_TransactionNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestNotice_TransactionNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestNotice_TransactionNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestNotice_TransactionNotice_actors_info_badges[] | null;
}

export interface DigestNotice_TransactionNotice_actors {
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
  liker: DigestNotice_TransactionNotice_actors_liker;
  /**
   * User information.
   */
  info: DigestNotice_TransactionNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface DigestNotice_TransactionNotice {
  __typename: "TransactionNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  txNoticeType: TransactionNoticeType;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  tx: DigestNotice_TransactionNotice_tx;
  /**
   * List of notice actors.
   */
  actors: DigestNotice_TransactionNotice_actors[] | null;
}

export interface DigestNotice_CircleNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestNotice_CircleNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestNotice_CircleNotice_actors_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DigestNotice_CircleNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestNotice_CircleNotice_actors_info_badges[] | null;
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DigestNotice_CircleNotice_actors_info_cryptoWallet | null;
}

export interface DigestNotice_CircleNotice_actors_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DigestNotice_CircleNotice_actors {
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
  liker: DigestNotice_CircleNotice_actors_liker;
  /**
   * User information.
   */
  info: DigestNotice_CircleNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * Status of current user.
   */
  status: DigestNotice_CircleNotice_actors_status | null;
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

export interface DigestNotice_CircleNotice_circle_invitedBy {
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

export interface DigestNotice_CircleNotice_circle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DigestNotice_CircleNotice_circle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestNotice_CircleNotice_circle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestNotice_CircleNotice_circle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DigestNotice_CircleNotice_circle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestNotice_CircleNotice_circle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DigestNotice_CircleNotice_circle_owner_info_cryptoWallet | null;
}

export interface DigestNotice_CircleNotice_circle_owner {
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
  status: DigestNotice_CircleNotice_circle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DigestNotice_CircleNotice_circle_owner_liker;
  /**
   * User information.
   */
  info: DigestNotice_CircleNotice_circle_owner_info;
}

export interface DigestNotice_CircleNotice_circle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface DigestNotice_CircleNotice_circle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface DigestNotice_CircleNotice_circle_prices {
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

export interface DigestNotice_CircleNotice_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Invitation used by current viewer.
   */
  invitedBy: DigestNotice_CircleNotice_circle_invitedBy | null;
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
  owner: DigestNotice_CircleNotice_circle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: DigestNotice_CircleNotice_circle_members;
  /**
   * List of works belong to this Circle.
   */
  works: DigestNotice_CircleNotice_circle_works;
  /**
   * Prices offered by this Circle.
   */
  prices: DigestNotice_CircleNotice_circle_prices[] | null;
}

export interface DigestNotice_CircleNotice_comments_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface DigestNotice_CircleNotice_comments {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: DigestNotice_CircleNotice_comments_parentComment | null;
}

export interface DigestNotice_CircleNotice_replies_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface DigestNotice_CircleNotice_replies_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface DigestNotice_CircleNotice_replies_replyTo_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface DigestNotice_CircleNotice_replies_replyTo {
  __typename: "Comment";
  /**
   * Author of this comment.
   */
  author: DigestNotice_CircleNotice_replies_replyTo_author;
}

export interface DigestNotice_CircleNotice_replies {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: DigestNotice_CircleNotice_replies_parentComment | null;
  /**
   * Author of this comment.
   */
  author: DigestNotice_CircleNotice_replies_author;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: DigestNotice_CircleNotice_replies_replyTo | null;
}

export interface DigestNotice_CircleNotice_mentions_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface DigestNotice_CircleNotice_mentions {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: DigestNotice_CircleNotice_mentions_parentComment | null;
}

export interface DigestNotice_CircleNotice {
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
  actors: DigestNotice_CircleNotice_actors[] | null;
  circle: DigestNotice_CircleNotice_circle;
  /**
   * Optional discussion/broadcast comments for bundled notices
   */
  comments: DigestNotice_CircleNotice_comments[] | null;
  /**
   * Optional discussion/broadcast replies for bundled notices
   */
  replies: DigestNotice_CircleNotice_replies[] | null;
  /**
   * Optional mention comments for bundled notices
   */
  mentions: DigestNotice_CircleNotice_mentions[] | null;
}

export interface DigestNotice_CryptoNotice_target {
  __typename: "CryptoWallet";
  address: string;
}

export interface DigestNotice_CryptoNotice {
  __typename: "CryptoNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  type: CryptoNoticeType;
  target: DigestNotice_CryptoNotice_target;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
}

export interface DigestNotice_OfficialAnnouncementNotice {
  __typename: "OfficialAnnouncementNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * The link to a specific page if provided.
   */
  link: string | null;
  /**
   * The message content.
   */
  message: string;
}

export type DigestNotice = DigestNotice_UserNotice | DigestNotice_ArticleArticleNotice | DigestNotice_ArticleNotice | DigestNotice_ArticleTagNotice | DigestNotice_CommentCommentNotice | DigestNotice_CommentNotice | DigestNotice_TagNotice | DigestNotice_TransactionNotice | DigestNotice_CircleNotice | DigestNotice_CryptoNotice | DigestNotice_OfficialAnnouncementNotice;
