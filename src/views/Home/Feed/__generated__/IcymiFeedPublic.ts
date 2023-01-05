/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType, ArticleAccessType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: IcymiFeedPublic
// ====================================================

export interface IcymiFeedPublic_viewer_recommendation_feed_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: IcymiFeedPublic_viewer_recommendation_feed_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: IcymiFeedPublic_viewer_recommendation_feed_edges_node_author_info_cryptoWallet | null;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node_author {
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
  status: IcymiFeedPublic_viewer_recommendation_feed_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: IcymiFeedPublic_viewer_recommendation_feed_edges_node_author_liker;
  /**
   * User information.
   */
  info: IcymiFeedPublic_viewer_recommendation_feed_edges_node_author_info;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node_access_circle {
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

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
  circle: IcymiFeedPublic_viewer_recommendation_feed_edges_node_access_circle | null;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node_appreciationsReceived {
  __typename: "AppreciationConnection";
  totalCount: number;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node_donationsDialog {
  __typename: "UserConnection";
  totalCount: number;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node_drafts {
  __typename: "Draft";
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node_tags_creator {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node_tags_editors {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node_tags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Creator of this tag.
   */
  creator: IcymiFeedPublic_viewer_recommendation_feed_edges_node_tags_creator | null;
  /**
   * Editors of this tag.
   */
  editors: IcymiFeedPublic_viewer_recommendation_feed_edges_node_tags_editors[] | null;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node_transactionsReceivedBy {
  __typename: "UserConnection";
  totalCount: number;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges_node {
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
  author: IcymiFeedPublic_viewer_recommendation_feed_edges_node_author;
  /**
   * Access related fields on circle
   */
  access: IcymiFeedPublic_viewer_recommendation_feed_edges_node_access;
  /**
   * Time of this article was created.
   */
  createdAt: any;
  /**
   * Appreciations history of this article.
   */
  appreciationsReceived: IcymiFeedPublic_viewer_recommendation_feed_edges_node_appreciationsReceived;
  /**
   * Transactions history of this article.
   */
  donationsDialog: IcymiFeedPublic_viewer_recommendation_feed_edges_node_donationsDialog;
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
  drafts: IcymiFeedPublic_viewer_recommendation_feed_edges_node_drafts[] | null;
  /**
   * This value determines if this article is an author selected article or not.
   */
  sticky: boolean;
  /**
   * Tags attached to this article.
   */
  tags: IcymiFeedPublic_viewer_recommendation_feed_edges_node_tags[] | null;
  /**
   * Cumulative reading time in seconds
   */
  readTime: number;
  /**
   * Transactions history of this article.
   */
  transactionsReceivedBy: IcymiFeedPublic_viewer_recommendation_feed_edges_node_transactionsReceivedBy;
  /**
   * This value determines if current Viewer has subscribed of not.
   */
  subscribed: boolean;
}

export interface IcymiFeedPublic_viewer_recommendation_feed_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: IcymiFeedPublic_viewer_recommendation_feed_edges_node;
}

export interface IcymiFeedPublic_viewer_recommendation_feed {
  __typename: "ArticleConnection";
  pageInfo: IcymiFeedPublic_viewer_recommendation_feed_pageInfo;
  edges: IcymiFeedPublic_viewer_recommendation_feed_edges[] | null;
}

export interface IcymiFeedPublic_viewer_recommendation {
  __typename: "Recommendation";
  /**
   * 'In case you missed it' recommendation.
   */
  feed: IcymiFeedPublic_viewer_recommendation_feed;
}

export interface IcymiFeedPublic_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Article recommendations for current user.
   */
  recommendation: IcymiFeedPublic_viewer_recommendation;
}

export interface IcymiFeedPublic {
  viewer: IcymiFeedPublic_viewer | null;
}

export interface IcymiFeedPublicVariables {
  after?: string | null;
}
