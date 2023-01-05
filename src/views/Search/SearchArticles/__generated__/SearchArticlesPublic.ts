/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType, ArticleAccessType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SearchArticlesPublic
// ====================================================

export interface SearchArticlesPublic_search_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface SearchArticlesPublic_search_edges_node_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface SearchArticlesPublic_search_edges_node_Article_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SearchArticlesPublic_search_edges_node_Article_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SearchArticlesPublic_search_edges_node_Article_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SearchArticlesPublic_search_edges_node_Article_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SearchArticlesPublic_search_edges_node_Article_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SearchArticlesPublic_search_edges_node_Article_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SearchArticlesPublic_search_edges_node_Article_author_info_cryptoWallet | null;
}

export interface SearchArticlesPublic_search_edges_node_Article_author {
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
  status: SearchArticlesPublic_search_edges_node_Article_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SearchArticlesPublic_search_edges_node_Article_author_liker;
  /**
   * User information.
   */
  info: SearchArticlesPublic_search_edges_node_Article_author_info;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
}

export interface SearchArticlesPublic_search_edges_node_Article_access_circle {
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

export interface SearchArticlesPublic_search_edges_node_Article_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
  circle: SearchArticlesPublic_search_edges_node_Article_access_circle | null;
}

export interface SearchArticlesPublic_search_edges_node_Article_appreciationsReceived {
  __typename: "AppreciationConnection";
  totalCount: number;
}

export interface SearchArticlesPublic_search_edges_node_Article_donationsDialog {
  __typename: "UserConnection";
  totalCount: number;
}

export interface SearchArticlesPublic_search_edges_node_Article_drafts {
  __typename: "Draft";
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface SearchArticlesPublic_search_edges_node_Article_tags_creator {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface SearchArticlesPublic_search_edges_node_Article_tags_editors {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface SearchArticlesPublic_search_edges_node_Article_tags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Creator of this tag.
   */
  creator: SearchArticlesPublic_search_edges_node_Article_tags_creator | null;
  /**
   * Editors of this tag.
   */
  editors: SearchArticlesPublic_search_edges_node_Article_tags_editors[] | null;
}

export interface SearchArticlesPublic_search_edges_node_Article_transactionsReceivedBy {
  __typename: "UserConnection";
  totalCount: number;
}

export interface SearchArticlesPublic_search_edges_node_Article {
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
  author: SearchArticlesPublic_search_edges_node_Article_author;
  /**
   * Access related fields on circle
   */
  access: SearchArticlesPublic_search_edges_node_Article_access;
  /**
   * Time of this article was created.
   */
  createdAt: any;
  /**
   * Appreciations history of this article.
   */
  appreciationsReceived: SearchArticlesPublic_search_edges_node_Article_appreciationsReceived;
  /**
   * Transactions history of this article.
   */
  donationsDialog: SearchArticlesPublic_search_edges_node_Article_donationsDialog;
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
  drafts: SearchArticlesPublic_search_edges_node_Article_drafts[] | null;
  /**
   * This value determines if this article is an author selected article or not.
   */
  sticky: boolean;
  /**
   * Tags attached to this article.
   */
  tags: SearchArticlesPublic_search_edges_node_Article_tags[] | null;
  /**
   * Cumulative reading time in seconds
   */
  readTime: number;
  /**
   * Transactions history of this article.
   */
  transactionsReceivedBy: SearchArticlesPublic_search_edges_node_Article_transactionsReceivedBy;
  /**
   * This value determines if current Viewer has subscribed of not.
   */
  subscribed: boolean;
}

export type SearchArticlesPublic_search_edges_node = SearchArticlesPublic_search_edges_node_User | SearchArticlesPublic_search_edges_node_Article;

export interface SearchArticlesPublic_search_edges {
  __typename: "SearchResultEdge";
  cursor: string;
  node: SearchArticlesPublic_search_edges_node;
}

export interface SearchArticlesPublic_search {
  __typename: "SearchResultConnection";
  pageInfo: SearchArticlesPublic_search_pageInfo;
  edges: SearchArticlesPublic_search_edges[] | null;
}

export interface SearchArticlesPublic {
  search: SearchArticlesPublic_search;
}

export interface SearchArticlesPublicVariables {
  key: string;
  first?: any | null;
  after?: string | null;
}
