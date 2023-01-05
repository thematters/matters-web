/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType, ArticleAccessType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MeHistoryFeed
// ====================================================

export interface MeHistoryFeed_viewer_activity_history_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeHistoryFeed_viewer_activity_history_edges_node_article_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: MeHistoryFeed_viewer_activity_history_edges_node_article_author_info_cryptoWallet | null;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_author {
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
  status: MeHistoryFeed_viewer_activity_history_edges_node_article_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: MeHistoryFeed_viewer_activity_history_edges_node_article_author_liker;
  /**
   * User information.
   */
  info: MeHistoryFeed_viewer_activity_history_edges_node_article_author_info;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_access_circle {
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

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
  circle: MeHistoryFeed_viewer_activity_history_edges_node_article_access_circle | null;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_appreciationsReceived {
  __typename: "AppreciationConnection";
  totalCount: number;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_donationsDialog {
  __typename: "UserConnection";
  totalCount: number;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_drafts {
  __typename: "Draft";
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_tags_creator {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_tags_editors {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_tags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Creator of this tag.
   */
  creator: MeHistoryFeed_viewer_activity_history_edges_node_article_tags_creator | null;
  /**
   * Editors of this tag.
   */
  editors: MeHistoryFeed_viewer_activity_history_edges_node_article_tags_editors[] | null;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article_transactionsReceivedBy {
  __typename: "UserConnection";
  totalCount: number;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node_article {
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
  author: MeHistoryFeed_viewer_activity_history_edges_node_article_author;
  /**
   * Access related fields on circle
   */
  access: MeHistoryFeed_viewer_activity_history_edges_node_article_access;
  /**
   * Time of this article was created.
   */
  createdAt: any;
  /**
   * Appreciations history of this article.
   */
  appreciationsReceived: MeHistoryFeed_viewer_activity_history_edges_node_article_appreciationsReceived;
  /**
   * Transactions history of this article.
   */
  donationsDialog: MeHistoryFeed_viewer_activity_history_edges_node_article_donationsDialog;
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
  drafts: MeHistoryFeed_viewer_activity_history_edges_node_article_drafts[] | null;
  /**
   * This value determines if this article is an author selected article or not.
   */
  sticky: boolean;
  /**
   * Tags attached to this article.
   */
  tags: MeHistoryFeed_viewer_activity_history_edges_node_article_tags[] | null;
  /**
   * Cumulative reading time in seconds
   */
  readTime: number;
  /**
   * Transactions history of this article.
   */
  transactionsReceivedBy: MeHistoryFeed_viewer_activity_history_edges_node_article_transactionsReceivedBy;
  /**
   * This value determines if current Viewer has subscribed of not.
   */
  subscribed: boolean;
}

export interface MeHistoryFeed_viewer_activity_history_edges_node {
  __typename: "ReadHistory";
  article: MeHistoryFeed_viewer_activity_history_edges_node_article;
}

export interface MeHistoryFeed_viewer_activity_history_edges {
  __typename: "ReadHistoryEdge";
  cursor: string;
  node: MeHistoryFeed_viewer_activity_history_edges_node;
}

export interface MeHistoryFeed_viewer_activity_history {
  __typename: "ReadHistoryConnection";
  pageInfo: MeHistoryFeed_viewer_activity_history_pageInfo;
  edges: MeHistoryFeed_viewer_activity_history_edges[] | null;
}

export interface MeHistoryFeed_viewer_activity {
  __typename: "UserActivity";
  /**
   * User reading history.
   */
  history: MeHistoryFeed_viewer_activity_history;
}

export interface MeHistoryFeed_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Record of user activity, only accessable by current user.
   */
  activity: MeHistoryFeed_viewer_activity;
}

export interface MeHistoryFeed {
  viewer: MeHistoryFeed_viewer | null;
}

export interface MeHistoryFeedVariables {
  after?: string | null;
}
