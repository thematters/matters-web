/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ListViewerArticles
// ====================================================

export interface ListViewerArticles_viewer_articles_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface ListViewerArticles_viewer_articles_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ListViewerArticles_viewer_articles_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ListViewerArticles_viewer_articles_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ListViewerArticles_viewer_articles_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ListViewerArticles_viewer_articles_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ListViewerArticles_viewer_articles_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ListViewerArticles_viewer_articles_edges_node_author_info_cryptoWallet | null;
}

export interface ListViewerArticles_viewer_articles_edges_node_author {
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
  status: ListViewerArticles_viewer_articles_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ListViewerArticles_viewer_articles_edges_node_author_liker;
  /**
   * User information.
   */
  info: ListViewerArticles_viewer_articles_edges_node_author_info;
}

export interface ListViewerArticles_viewer_articles_edges_node {
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
  author: ListViewerArticles_viewer_articles_edges_node_author;
}

export interface ListViewerArticles_viewer_articles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: ListViewerArticles_viewer_articles_edges_node;
}

export interface ListViewerArticles_viewer_articles {
  __typename: "ArticleConnection";
  totalCount: number;
  pageInfo: ListViewerArticles_viewer_articles_pageInfo;
  edges: ListViewerArticles_viewer_articles_edges[] | null;
}

export interface ListViewerArticles_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Articles authored by current user.
   */
  articles: ListViewerArticles_viewer_articles;
}

export interface ListViewerArticles {
  viewer: ListViewerArticles_viewer | null;
}

export interface ListViewerArticlesVariables {
  after?: string | null;
}
