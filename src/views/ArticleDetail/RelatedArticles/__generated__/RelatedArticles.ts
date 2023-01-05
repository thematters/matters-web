/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: RelatedArticles
// ====================================================

export interface RelatedArticles_relatedArticles_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface RelatedArticles_relatedArticles_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface RelatedArticles_relatedArticles_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface RelatedArticles_relatedArticles_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface RelatedArticles_relatedArticles_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: RelatedArticles_relatedArticles_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: RelatedArticles_relatedArticles_edges_node_author_info_cryptoWallet | null;
}

export interface RelatedArticles_relatedArticles_edges_node_author {
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
  status: RelatedArticles_relatedArticles_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: RelatedArticles_relatedArticles_edges_node_author_liker;
  /**
   * User information.
   */
  info: RelatedArticles_relatedArticles_edges_node_author_info;
}

export interface RelatedArticles_relatedArticles_edges_node {
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
  author: RelatedArticles_relatedArticles_edges_node_author;
  /**
   * State of this article.
   */
  state: ArticleState;
  /**
   * A short summary for this article.
   */
  summary: string;
}

export interface RelatedArticles_relatedArticles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: RelatedArticles_relatedArticles_edges_node;
}

export interface RelatedArticles_relatedArticles {
  __typename: "ArticleConnection";
  edges: RelatedArticles_relatedArticles_edges[] | null;
}

export interface RelatedArticles {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Related articles to this article.
   */
  relatedArticles: RelatedArticles_relatedArticles;
}
