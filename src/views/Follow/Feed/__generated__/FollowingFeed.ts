/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType, ArticleAccessType, CommentState, ArticleRecommendationActivitySource, TransactionCurrency, InvitationState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: FollowingFeed
// ====================================================

export interface FollowingFeed_viewer_recommendation_following_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_actor {
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
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_access_circle {
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

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_access {
  __typename: "ArticleAccess";
  circle: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_access_circle | null;
  type: ArticleAccessType;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_author_info_cryptoWallet | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_author {
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
  status: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_author_liker;
  /**
   * User information.
   */
  info: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_author_info;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_appreciationsReceived {
  __typename: "AppreciationConnection";
  totalCount: number;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_donationsDialog {
  __typename: "UserConnection";
  totalCount: number;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_drafts {
  __typename: "Draft";
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_tags_creator {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_tags_editors {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_tags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Creator of this tag.
   */
  creator: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_tags_creator | null;
  /**
   * Editors of this tag.
   */
  editors: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_tags_editors[] | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_transactionsReceivedBy {
  __typename: "UserConnection";
  totalCount: number;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle {
  __typename: "Article";
  /**
   * Access related fields on circle
   */
  access: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_access;
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
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * Article cover's link.
   */
  cover: string | null;
  /**
   * A short summary for this article.
   */
  summary: string;
  /**
   * Author of this article.
   */
  author: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_author;
  /**
   * Time of this article was created.
   */
  createdAt: any;
  /**
   * Appreciations history of this article.
   */
  appreciationsReceived: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_appreciationsReceived;
  /**
   * Transactions history of this article.
   */
  donationsDialog: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_donationsDialog;
  /**
   * IPFS hash of this article.
   */
  dataHash: string;
  /**
   * the iscnId if published to ISCN
   */
  iscnId: string | null;
  /**
   * Time of this article was revised.
   */
  revisedAt: any | null;
  /**
   * Drafts linked to this article.
   */
  drafts: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_drafts[] | null;
  /**
   * This value determines if this article is an author selected article or not.
   */
  sticky: boolean;
  /**
   * Tags attached to this article.
   */
  tags: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_tags[] | null;
  /**
   * Cumulative reading time in seconds
   */
  readTime: number;
  /**
   * Transactions history of this article.
   */
  transactionsReceivedBy: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle_transactionsReceivedBy;
  /**
   * This value determines if current Viewer has subscribed of not.
   */
  subscribed: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity {
  __typename: "UserPublishArticleActivity";
  actor: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_actor;
  createdAt: any;
  /**
   * Article published by actor
   */
  nodeArticle: FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity_nodeArticle;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_actor {
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
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_nodeComment_author {
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

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_nodeComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Time of this comment was created.
   */
  createdAt: any;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * State of this comment.
   */
  state: CommentState;
  /**
   * Author of this comment.
   */
  author: FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_nodeComment_author;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_targetCircle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_targetCircle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_targetCircle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_targetCircle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_targetCircle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_targetCircle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_targetCircle_owner_info_cryptoWallet | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_targetCircle_owner {
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
  status: FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_targetCircle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_targetCircle_owner_liker;
  /**
   * User information.
   */
  info: FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_targetCircle_owner_info;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_targetCircle {
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
  /**
   * A short description of this Circle.
   */
  description: string | null;
  /**
   * Created time.
   */
  createdAt: any;
  /**
   * Circle owner.
   */
  owner: FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_targetCircle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * This value determines if current viewer is following Circle or not.
   */
  isFollower: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity {
  __typename: "UserBroadcastCircleActivity";
  actor: FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_actor;
  createdAt: any;
  /**
   * Comment broadcast by actor
   */
  nodeComment: FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_nodeComment;
  /**
   * Circle that comment belongs to
   */
  targetCircle: FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity_targetCircle;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_actor {
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
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_nodeCircle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_nodeCircle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_nodeCircle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_nodeCircle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_nodeCircle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_nodeCircle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_nodeCircle_owner_info_cryptoWallet | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_nodeCircle_owner {
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
  status: FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_nodeCircle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_nodeCircle_owner_liker;
  /**
   * User information.
   */
  info: FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_nodeCircle_owner_info;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_nodeCircle {
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
  /**
   * A short description of this Circle.
   */
  description: string | null;
  /**
   * Created time.
   */
  createdAt: any;
  /**
   * Circle owner.
   */
  owner: FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_nodeCircle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity {
  __typename: "UserCreateCircleActivity";
  actor: FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_actor;
  createdAt: any;
  /**
   * Circle created by actor
   */
  nodeCircle: FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity_nodeCircle;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_actor {
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
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_author_info_cryptoWallet | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_author {
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
  status: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_author_liker;
  /**
   * User information.
   */
  info: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_author_info;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_access_circle {
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

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
  circle: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_access_circle | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_appreciationsReceived {
  __typename: "AppreciationConnection";
  totalCount: number;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_donationsDialog {
  __typename: "UserConnection";
  totalCount: number;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_drafts {
  __typename: "Draft";
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_tags_creator {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_tags_editors {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_tags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Creator of this tag.
   */
  creator: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_tags_creator | null;
  /**
   * Editors of this tag.
   */
  editors: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_tags_editors[] | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_transactionsReceivedBy {
  __typename: "UserConnection";
  totalCount: number;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle {
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
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * Article cover's link.
   */
  cover: string | null;
  /**
   * A short summary for this article.
   */
  summary: string;
  /**
   * Author of this article.
   */
  author: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_author;
  /**
   * Access related fields on circle
   */
  access: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_access;
  /**
   * Time of this article was created.
   */
  createdAt: any;
  /**
   * Appreciations history of this article.
   */
  appreciationsReceived: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_appreciationsReceived;
  /**
   * Transactions history of this article.
   */
  donationsDialog: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_donationsDialog;
  /**
   * IPFS hash of this article.
   */
  dataHash: string;
  /**
   * the iscnId if published to ISCN
   */
  iscnId: string | null;
  /**
   * Time of this article was revised.
   */
  revisedAt: any | null;
  /**
   * Drafts linked to this article.
   */
  drafts: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_drafts[] | null;
  /**
   * This value determines if this article is an author selected article or not.
   */
  sticky: boolean;
  /**
   * Tags attached to this article.
   */
  tags: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_tags[] | null;
  /**
   * Cumulative reading time in seconds
   */
  readTime: number;
  /**
   * Transactions history of this article.
   */
  transactionsReceivedBy: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle_transactionsReceivedBy;
  /**
   * This value determines if current Viewer has subscribed of not.
   */
  subscribed: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_targetTag {
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
  /**
   * This value determines if current viewer is following or not.
   */
  isFollower: boolean | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity {
  __typename: "UserAddArticleTagActivity";
  actor: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_actor;
  createdAt: any;
  /**
   * Article added to tag
   */
  nodeArticle: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_nodeArticle;
  /**
   * Tag added by article
   */
  targetTag: FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity_targetTag;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity_recommendArticles_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity_recommendArticles_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity_recommendArticles_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity_recommendArticles_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity_recommendArticles_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity_recommendArticles_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity_recommendArticles_author_info_cryptoWallet | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity_recommendArticles_author {
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
  status: FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity_recommendArticles_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity_recommendArticles_author_liker;
  /**
   * User information.
   */
  info: FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity_recommendArticles_author_info;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity_recommendArticles {
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
   * State of this article.
   */
  recommendArticleState: ArticleState;
  /**
   * Article cover's link.
   */
  cover: string | null;
  /**
   * A short summary for this article.
   */
  summary: string;
  /**
   * Author of this article.
   */
  author: FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity_recommendArticles_author;
  /**
   * State of this article.
   */
  articleState: ArticleState;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity {
  __typename: "ArticleRecommendationActivity";
  /**
   * The source type of recommendation
   */
  source: ArticleRecommendationActivitySource | null;
  /**
   * Recommended articles
   */
  recommendArticles: FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity_recommendArticles[] | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_owner_info_cryptoWallet | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_owner {
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
  status: FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_owner_liker;
  /**
   * User information.
   */
  info: FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_owner_info;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_prices {
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

export interface FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_invitedBy {
  __typename: "Invitation";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Determine it's specific state.
   */
  state: InvitationState;
  /**
   * Free period of this invitation.
   */
  freePeriod: number;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles {
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
  /**
   * A short description of this Circle.
   */
  description: string | null;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * Circle owner.
   */
  owner: FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_owner;
  /**
   * List of Circle member.
   */
  members: FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_members;
  /**
   * List of works belong to this Circle.
   */
  works: FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_works;
  /**
   * Prices offered by this Circle.
   */
  prices: FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_prices[] | null;
  /**
   * This value determines if current viewer is Member or not.
   */
  isMember: boolean;
  /**
   * Invitation used by current viewer.
   */
  invitedBy: FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles_invitedBy | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity {
  __typename: "CircleRecommendationActivity";
  /**
   * Recommended circles
   */
  recommendCircles: FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity_recommendCircles[] | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserRecommendationActivity_recommendUsers_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserRecommendationActivity_recommendUsers_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: FollowingFeed_viewer_recommendation_following_edges_node_UserRecommendationActivity_recommendUsers_info_badges[] | null;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserRecommendationActivity_recommendUsers_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserRecommendationActivity_recommendUsers_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserRecommendationActivity_recommendUsers {
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
   * User information.
   */
  info: FollowingFeed_viewer_recommendation_following_edges_node_UserRecommendationActivity_recommendUsers_info;
  /**
   * Status of current user.
   */
  status: FollowingFeed_viewer_recommendation_following_edges_node_UserRecommendationActivity_recommendUsers_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: FollowingFeed_viewer_recommendation_following_edges_node_UserRecommendationActivity_recommendUsers_liker;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
}

export interface FollowingFeed_viewer_recommendation_following_edges_node_UserRecommendationActivity {
  __typename: "UserRecommendationActivity";
  /**
   * Recommended users
   */
  recommendUsers: FollowingFeed_viewer_recommendation_following_edges_node_UserRecommendationActivity_recommendUsers[] | null;
}

export type FollowingFeed_viewer_recommendation_following_edges_node = FollowingFeed_viewer_recommendation_following_edges_node_UserPublishArticleActivity | FollowingFeed_viewer_recommendation_following_edges_node_UserBroadcastCircleActivity | FollowingFeed_viewer_recommendation_following_edges_node_UserCreateCircleActivity | FollowingFeed_viewer_recommendation_following_edges_node_UserAddArticleTagActivity | FollowingFeed_viewer_recommendation_following_edges_node_ArticleRecommendationActivity | FollowingFeed_viewer_recommendation_following_edges_node_CircleRecommendationActivity | FollowingFeed_viewer_recommendation_following_edges_node_UserRecommendationActivity;

export interface FollowingFeed_viewer_recommendation_following_edges {
  __typename: "FollowingActivityEdge";
  cursor: string;
  node: FollowingFeed_viewer_recommendation_following_edges_node;
}

export interface FollowingFeed_viewer_recommendation_following {
  __typename: "FollowingActivityConnection";
  pageInfo: FollowingFeed_viewer_recommendation_following_pageInfo;
  edges: FollowingFeed_viewer_recommendation_following_edges[] | null;
}

export interface FollowingFeed_viewer_recommendation {
  __typename: "Recommendation";
  /**
   * Activities based on user's following, sort by creation time.
   */
  following: FollowingFeed_viewer_recommendation_following;
}

export interface FollowingFeed_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Article recommendations for current user.
   */
  recommendation: FollowingFeed_viewer_recommendation;
}

export interface FollowingFeed {
  viewer: FollowingFeed_viewer | null;
}

export interface FollowingFeedVariables {
  after?: string | null;
}
