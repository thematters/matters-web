/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType, ArticleAccessType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ViewerArticles
// ====================================================

export interface ViewerArticles_user_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * Cover of profile page.
   */
  profileCover: string | null;
}

export interface ViewerArticles_user_articles_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface ViewerArticles_user_articles_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ViewerArticles_user_articles_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ViewerArticles_user_articles_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ViewerArticles_user_articles_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ViewerArticles_user_articles_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ViewerArticles_user_articles_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ViewerArticles_user_articles_edges_node_author_info_cryptoWallet | null;
}

export interface ViewerArticles_user_articles_edges_node_author {
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
  status: ViewerArticles_user_articles_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ViewerArticles_user_articles_edges_node_author_liker;
  /**
   * User information.
   */
  info: ViewerArticles_user_articles_edges_node_author_info;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
}

export interface ViewerArticles_user_articles_edges_node_access_circle {
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

export interface ViewerArticles_user_articles_edges_node_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
  circle: ViewerArticles_user_articles_edges_node_access_circle | null;
}

export interface ViewerArticles_user_articles_edges_node_appreciationsReceived {
  __typename: "AppreciationConnection";
  totalCount: number;
}

export interface ViewerArticles_user_articles_edges_node_donationsDialog {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ViewerArticles_user_articles_edges_node_drafts {
  __typename: "Draft";
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface ViewerArticles_user_articles_edges_node_tags_creator {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface ViewerArticles_user_articles_edges_node_tags_editors {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface ViewerArticles_user_articles_edges_node_tags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Creator of this tag.
   */
  creator: ViewerArticles_user_articles_edges_node_tags_creator | null;
  /**
   * Editors of this tag.
   */
  editors: ViewerArticles_user_articles_edges_node_tags_editors[] | null;
}

export interface ViewerArticles_user_articles_edges_node_transactionsReceivedBy {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ViewerArticles_user_articles_edges_node {
  __typename: "Article";
  /**
   * Time of this article was created.
   */
  createdAt: any;
  /**
   * Word count of this article.
   */
  wordCount: number | null;
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
  author: ViewerArticles_user_articles_edges_node_author;
  /**
   * Access related fields on circle
   */
  access: ViewerArticles_user_articles_edges_node_access;
  /**
   * Appreciations history of this article.
   */
  appreciationsReceived: ViewerArticles_user_articles_edges_node_appreciationsReceived;
  /**
   * Transactions history of this article.
   */
  donationsDialog: ViewerArticles_user_articles_edges_node_donationsDialog;
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
  drafts: ViewerArticles_user_articles_edges_node_drafts[] | null;
  /**
   * This value determines if this article is an author selected article or not.
   */
  sticky: boolean;
  /**
   * Tags attached to this article.
   */
  tags: ViewerArticles_user_articles_edges_node_tags[] | null;
  /**
   * Cumulative reading time in seconds
   */
  readTime: number;
  /**
   * Transactions history of this article.
   */
  transactionsReceivedBy: ViewerArticles_user_articles_edges_node_transactionsReceivedBy;
  /**
   * This value determines if current Viewer has subscribed of not.
   */
  subscribed: boolean;
}

export interface ViewerArticles_user_articles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: ViewerArticles_user_articles_edges_node;
}

export interface ViewerArticles_user_articles {
  __typename: "ArticleConnection";
  totalCount: number;
  pageInfo: ViewerArticles_user_articles_pageInfo;
  edges: ViewerArticles_user_articles_edges[] | null;
}

export interface ViewerArticles_user_subscribedCircles {
  __typename: "CircleConnection";
  totalCount: number;
}

export interface ViewerArticles_user_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
  /**
   * Number of articles published by user
   */
  articleCount: number;
  /**
   * Number of total written words.
   */
  totalWordCount: number;
}

export interface ViewerArticles_user {
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
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * User information.
   */
  info: ViewerArticles_user_info;
  /**
   * Articles authored by current user.
   */
  articles: ViewerArticles_user_articles;
  /**
   * Circles whiches user has subscribed.
   */
  subscribedCircles: ViewerArticles_user_subscribedCircles;
  /**
   * Status of current user.
   */
  status: ViewerArticles_user_status | null;
}

export interface ViewerArticles {
  user: ViewerArticles_user | null;
}

export interface ViewerArticlesVariables {
  userName: string;
  after?: string | null;
}
