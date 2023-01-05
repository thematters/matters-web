/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserNoticeType, BadgeType, UserState, ArticleArticleNoticeType, ArticleState, ArticleNoticeType, ArticleTagNoticeType, CommentCommentNoticeType, CommentState, CommentType, CommentNoticeType, TagNoticeType, TransactionNoticeType, TransactionCurrency, CircleNoticeType, CryptoNoticeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MeNotifications
// ====================================================

export interface MeNotifications_viewer_notices_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_UserNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_UserNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeNotifications_viewer_notices_edges_node_UserNotice_actors_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_UserNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeNotifications_viewer_notices_edges_node_UserNotice_actors_info_badges[] | null;
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: MeNotifications_viewer_notices_edges_node_UserNotice_actors_info_cryptoWallet | null;
}

export interface MeNotifications_viewer_notices_edges_node_UserNotice_actors_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface MeNotifications_viewer_notices_edges_node_UserNotice_actors {
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
  liker: MeNotifications_viewer_notices_edges_node_UserNotice_actors_liker;
  /**
   * User information.
   */
  info: MeNotifications_viewer_notices_edges_node_UserNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * Status of current user.
   */
  status: MeNotifications_viewer_notices_edges_node_UserNotice_actors_status | null;
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

export interface MeNotifications_viewer_notices_edges_node_UserNotice {
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
  actors: MeNotifications_viewer_notices_edges_node_UserNotice_actors[] | null;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_actors_info_badges[] | null;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_actors {
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
  liker: MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_actors_liker;
  /**
   * User information.
   */
  info: MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_article_author {
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

export interface MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_article {
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
  author: MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_article_author;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_collection_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_collection_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_collection_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_collection_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_collection_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_collection_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_collection_author_info_cryptoWallet | null;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_collection_author {
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
  status: MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_collection_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_collection_author_liker;
  /**
   * User information.
   */
  info: MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_collection_author_info;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_collection {
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
  author: MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_collection_author;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleArticleNotice {
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
  actors: MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_actors[] | null;
  article: MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_article;
  collection: MeNotifications_viewer_notices_edges_node_ArticleArticleNotice_collection;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeNotifications_viewer_notices_edges_node_ArticleNotice_actors_info_badges[] | null;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleNotice_actors {
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
  liker: MeNotifications_viewer_notices_edges_node_ArticleNotice_actors_liker;
  /**
   * User information.
   */
  info: MeNotifications_viewer_notices_edges_node_ArticleNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleNotice_article_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleNotice_article_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleNotice_article_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleNotice_article_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleNotice_article_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeNotifications_viewer_notices_edges_node_ArticleNotice_article_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: MeNotifications_viewer_notices_edges_node_ArticleNotice_article_author_info_cryptoWallet | null;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleNotice_article_author {
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
  status: MeNotifications_viewer_notices_edges_node_ArticleNotice_article_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: MeNotifications_viewer_notices_edges_node_ArticleNotice_article_author_liker;
  /**
   * User information.
   */
  info: MeNotifications_viewer_notices_edges_node_ArticleNotice_article_author_info;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleNotice_article_access_circle {
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

export interface MeNotifications_viewer_notices_edges_node_ArticleNotice_article_access {
  __typename: "ArticleAccess";
  circle: MeNotifications_viewer_notices_edges_node_ArticleNotice_article_access_circle | null;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleNotice_article {
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
  author: MeNotifications_viewer_notices_edges_node_ArticleNotice_article_author;
  /**
   * Access related fields on circle
   */
  access: MeNotifications_viewer_notices_edges_node_ArticleNotice_article_access;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleNotice {
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
  actors: MeNotifications_viewer_notices_edges_node_ArticleNotice_actors[] | null;
  article: MeNotifications_viewer_notices_edges_node_ArticleNotice_article;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleTagNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleTagNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleTagNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeNotifications_viewer_notices_edges_node_ArticleTagNotice_actors_info_badges[] | null;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleTagNotice_actors {
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
  liker: MeNotifications_viewer_notices_edges_node_ArticleTagNotice_actors_liker;
  /**
   * User information.
   */
  info: MeNotifications_viewer_notices_edges_node_ArticleTagNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface MeNotifications_viewer_notices_edges_node_ArticleTagNotice_target_author {
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

export interface MeNotifications_viewer_notices_edges_node_ArticleTagNotice_target {
  __typename: "Article";
  /**
   * Author of this article.
   */
  author: MeNotifications_viewer_notices_edges_node_ArticleTagNotice_target_author;
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

export interface MeNotifications_viewer_notices_edges_node_ArticleTagNotice_tag {
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

export interface MeNotifications_viewer_notices_edges_node_ArticleTagNotice {
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
  actors: MeNotifications_viewer_notices_edges_node_ArticleTagNotice_actors[] | null;
  target: MeNotifications_viewer_notices_edges_node_ArticleTagNotice_target;
  tag: MeNotifications_viewer_notices_edges_node_ArticleTagNotice_tag;
}

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeNotifications_viewer_notices_edges_node_CommentCommentNotice_actors_info_badges[] | null;
}

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_actors {
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
  liker: MeNotifications_viewer_notices_edges_node_CommentCommentNotice_actors_liker;
  /**
   * User information.
   */
  info: MeNotifications_viewer_notices_edges_node_CommentCommentNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment_node_Article_author {
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

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment_node_Article {
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
  author: MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment_node_Article_author;
}

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment_node_Circle {
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

export type MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment_node = MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment_node_User | MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment_node_Article | MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment_node_Circle;

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment_author {
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

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment {
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
  node: MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment_node;
  /**
   * Parent comment of this comment.
   */
  parentComment: MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment_parentComment | null;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * Author of this comment.
   */
  author: MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment_author;
}

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply_node_Article_author {
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

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply_node_Article {
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
  author: MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply_node_Article_author;
  /**
   * State of this article.
   */
  articleState: ArticleState;
}

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply_node_Circle {
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

export type MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply_node = MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply_node_User | MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply_node_Article | MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply_node_Circle;

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply_author {
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

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply {
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
  node: MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply_node;
  /**
   * Parent comment of this comment.
   */
  parentComment: MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply_parentComment | null;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * Author of this comment.
   */
  author: MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply_author;
}

export interface MeNotifications_viewer_notices_edges_node_CommentCommentNotice {
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
  actors: MeNotifications_viewer_notices_edges_node_CommentCommentNotice_actors[] | null;
  comment: MeNotifications_viewer_notices_edges_node_CommentCommentNotice_comment;
  reply: MeNotifications_viewer_notices_edges_node_CommentCommentNotice_reply;
}

export interface MeNotifications_viewer_notices_edges_node_CommentNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_CommentNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeNotifications_viewer_notices_edges_node_CommentNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeNotifications_viewer_notices_edges_node_CommentNotice_actors_info_badges[] | null;
}

export interface MeNotifications_viewer_notices_edges_node_CommentNotice_actors {
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
  liker: MeNotifications_viewer_notices_edges_node_CommentNotice_actors_liker;
  /**
   * User information.
   */
  info: MeNotifications_viewer_notices_edges_node_CommentNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface MeNotifications_viewer_notices_edges_node_CommentNotice_comment_node_User {
  __typename: "User" | "Tag" | "Comment" | "Topic" | "Chapter" | "Draft";
}

export interface MeNotifications_viewer_notices_edges_node_CommentNotice_comment_node_Article_author {
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

export interface MeNotifications_viewer_notices_edges_node_CommentNotice_comment_node_Article {
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
  author: MeNotifications_viewer_notices_edges_node_CommentNotice_comment_node_Article_author;
  /**
   * State of this article.
   */
  articleState: ArticleState;
}

export interface MeNotifications_viewer_notices_edges_node_CommentNotice_comment_node_Circle {
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

export type MeNotifications_viewer_notices_edges_node_CommentNotice_comment_node = MeNotifications_viewer_notices_edges_node_CommentNotice_comment_node_User | MeNotifications_viewer_notices_edges_node_CommentNotice_comment_node_Article | MeNotifications_viewer_notices_edges_node_CommentNotice_comment_node_Circle;

export interface MeNotifications_viewer_notices_edges_node_CommentNotice_comment_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface MeNotifications_viewer_notices_edges_node_CommentNotice_comment_author {
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

export interface MeNotifications_viewer_notices_edges_node_CommentNotice_comment {
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
  node: MeNotifications_viewer_notices_edges_node_CommentNotice_comment_node;
  /**
   * Parent comment of this comment.
   */
  parentComment: MeNotifications_viewer_notices_edges_node_CommentNotice_comment_parentComment | null;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * Author of this comment.
   */
  author: MeNotifications_viewer_notices_edges_node_CommentNotice_comment_author;
}

export interface MeNotifications_viewer_notices_edges_node_CommentNotice {
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
  actors: MeNotifications_viewer_notices_edges_node_CommentNotice_actors[] | null;
  comment: MeNotifications_viewer_notices_edges_node_CommentNotice_comment;
}

export interface MeNotifications_viewer_notices_edges_node_TagNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_TagNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeNotifications_viewer_notices_edges_node_TagNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeNotifications_viewer_notices_edges_node_TagNotice_actors_info_badges[] | null;
}

export interface MeNotifications_viewer_notices_edges_node_TagNotice_actors {
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
  liker: MeNotifications_viewer_notices_edges_node_TagNotice_actors_liker;
  /**
   * User information.
   */
  info: MeNotifications_viewer_notices_edges_node_TagNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface MeNotifications_viewer_notices_edges_node_TagNotice_tag {
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

export interface MeNotifications_viewer_notices_edges_node_TagNotice {
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
  actors: MeNotifications_viewer_notices_edges_node_TagNotice_actors[] | null;
  tag: MeNotifications_viewer_notices_edges_node_TagNotice_tag;
}

export interface MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Circle {
  __typename: "Circle" | "Transaction";
}

export interface MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Article_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Article_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Article_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Article_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Article_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Article_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Article_author_info_cryptoWallet | null;
}

export interface MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Article_author {
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
  status: MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Article_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Article_author_liker;
  /**
   * User information.
   */
  info: MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Article_author_info;
}

export interface MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Article {
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
  author: MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Article_author;
}

export type MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target = MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Circle | MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target_Article;

export interface MeNotifications_viewer_notices_edges_node_TransactionNotice_tx {
  __typename: "Transaction";
  id: string;
  amount: number;
  currency: TransactionCurrency;
  /**
   * Related target article or transaction.
   */
  target: MeNotifications_viewer_notices_edges_node_TransactionNotice_tx_target | null;
}

export interface MeNotifications_viewer_notices_edges_node_TransactionNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_TransactionNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeNotifications_viewer_notices_edges_node_TransactionNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeNotifications_viewer_notices_edges_node_TransactionNotice_actors_info_badges[] | null;
}

export interface MeNotifications_viewer_notices_edges_node_TransactionNotice_actors {
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
  liker: MeNotifications_viewer_notices_edges_node_TransactionNotice_actors_liker;
  /**
   * User information.
   */
  info: MeNotifications_viewer_notices_edges_node_TransactionNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface MeNotifications_viewer_notices_edges_node_TransactionNotice {
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
  tx: MeNotifications_viewer_notices_edges_node_TransactionNotice_tx;
  /**
   * List of notice actors.
   */
  actors: MeNotifications_viewer_notices_edges_node_TransactionNotice_actors[] | null;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_actors_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeNotifications_viewer_notices_edges_node_CircleNotice_actors_info_badges[] | null;
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: MeNotifications_viewer_notices_edges_node_CircleNotice_actors_info_cryptoWallet | null;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_actors_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_actors {
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
  liker: MeNotifications_viewer_notices_edges_node_CircleNotice_actors_liker;
  /**
   * User information.
   */
  info: MeNotifications_viewer_notices_edges_node_CircleNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * Status of current user.
   */
  status: MeNotifications_viewer_notices_edges_node_CircleNotice_actors_status | null;
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

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_circle_invitedBy {
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

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_circle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_circle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_circle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_circle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_circle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeNotifications_viewer_notices_edges_node_CircleNotice_circle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: MeNotifications_viewer_notices_edges_node_CircleNotice_circle_owner_info_cryptoWallet | null;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_circle_owner {
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
  status: MeNotifications_viewer_notices_edges_node_CircleNotice_circle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: MeNotifications_viewer_notices_edges_node_CircleNotice_circle_owner_liker;
  /**
   * User information.
   */
  info: MeNotifications_viewer_notices_edges_node_CircleNotice_circle_owner_info;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_circle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_circle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_circle_prices {
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

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Invitation used by current viewer.
   */
  invitedBy: MeNotifications_viewer_notices_edges_node_CircleNotice_circle_invitedBy | null;
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
  owner: MeNotifications_viewer_notices_edges_node_CircleNotice_circle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: MeNotifications_viewer_notices_edges_node_CircleNotice_circle_members;
  /**
   * List of works belong to this Circle.
   */
  works: MeNotifications_viewer_notices_edges_node_CircleNotice_circle_works;
  /**
   * Prices offered by this Circle.
   */
  prices: MeNotifications_viewer_notices_edges_node_CircleNotice_circle_prices[] | null;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_comments_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_comments {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: MeNotifications_viewer_notices_edges_node_CircleNotice_comments_parentComment | null;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_replies_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_replies_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_replies_replyTo_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_replies_replyTo {
  __typename: "Comment";
  /**
   * Author of this comment.
   */
  author: MeNotifications_viewer_notices_edges_node_CircleNotice_replies_replyTo_author;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_replies {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: MeNotifications_viewer_notices_edges_node_CircleNotice_replies_parentComment | null;
  /**
   * Author of this comment.
   */
  author: MeNotifications_viewer_notices_edges_node_CircleNotice_replies_author;
  /**
   * A Comment that this comment replied to.
   */
  replyTo: MeNotifications_viewer_notices_edges_node_CircleNotice_replies_replyTo | null;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_mentions_parentComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice_mentions {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  type: CommentType;
  /**
   * Parent comment of this comment.
   */
  parentComment: MeNotifications_viewer_notices_edges_node_CircleNotice_mentions_parentComment | null;
}

export interface MeNotifications_viewer_notices_edges_node_CircleNotice {
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
  actors: MeNotifications_viewer_notices_edges_node_CircleNotice_actors[] | null;
  circle: MeNotifications_viewer_notices_edges_node_CircleNotice_circle;
  /**
   * Optional discussion/broadcast comments for bundled notices
   */
  comments: MeNotifications_viewer_notices_edges_node_CircleNotice_comments[] | null;
  /**
   * Optional discussion/broadcast replies for bundled notices
   */
  replies: MeNotifications_viewer_notices_edges_node_CircleNotice_replies[] | null;
  /**
   * Optional mention comments for bundled notices
   */
  mentions: MeNotifications_viewer_notices_edges_node_CircleNotice_mentions[] | null;
}

export interface MeNotifications_viewer_notices_edges_node_CryptoNotice_target {
  __typename: "CryptoWallet";
  address: string;
}

export interface MeNotifications_viewer_notices_edges_node_CryptoNotice {
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
  target: MeNotifications_viewer_notices_edges_node_CryptoNotice_target;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
}

export interface MeNotifications_viewer_notices_edges_node_OfficialAnnouncementNotice {
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

export type MeNotifications_viewer_notices_edges_node = MeNotifications_viewer_notices_edges_node_UserNotice | MeNotifications_viewer_notices_edges_node_ArticleArticleNotice | MeNotifications_viewer_notices_edges_node_ArticleNotice | MeNotifications_viewer_notices_edges_node_ArticleTagNotice | MeNotifications_viewer_notices_edges_node_CommentCommentNotice | MeNotifications_viewer_notices_edges_node_CommentNotice | MeNotifications_viewer_notices_edges_node_TagNotice | MeNotifications_viewer_notices_edges_node_TransactionNotice | MeNotifications_viewer_notices_edges_node_CircleNotice | MeNotifications_viewer_notices_edges_node_CryptoNotice | MeNotifications_viewer_notices_edges_node_OfficialAnnouncementNotice;

export interface MeNotifications_viewer_notices_edges {
  __typename: "NoticeEdge";
  cursor: string;
  node: MeNotifications_viewer_notices_edges_node;
}

export interface MeNotifications_viewer_notices {
  __typename: "NoticeConnection";
  pageInfo: MeNotifications_viewer_notices_pageInfo;
  edges: MeNotifications_viewer_notices_edges[] | null;
}

export interface MeNotifications_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  notices: MeNotifications_viewer_notices;
}

export interface MeNotifications {
  viewer: MeNotifications_viewer | null;
}

export interface MeNotificationsVariables {
  after?: string | null;
}
