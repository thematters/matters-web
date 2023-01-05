/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ArticleDonators
// ====================================================

export interface ArticleDonators_article_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface ArticleDonators_article_Article_donations_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface ArticleDonators_article_Article_donations_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleDonators_article_Article_donations_edges_node_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ArticleDonators_article_Article_donations_edges_node_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: ArticleDonators_article_Article_donations_edges_node_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ArticleDonators_article_Article_donations_edges_node_info_cryptoWallet | null;
}

export interface ArticleDonators_article_Article_donations_edges_node_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ArticleDonators_article_Article_donations_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleDonators_article_Article_donations_edges_node {
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
  info: ArticleDonators_article_Article_donations_edges_node_info;
  /**
   * Status of current user.
   */
  status: ArticleDonators_article_Article_donations_edges_node_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ArticleDonators_article_Article_donations_edges_node_liker;
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

export interface ArticleDonators_article_Article_donations_edges {
  __typename: "UserEdge";
  cursor: string;
  node: ArticleDonators_article_Article_donations_edges_node;
}

export interface ArticleDonators_article_Article_donations {
  __typename: "UserConnection";
  totalCount: number;
  pageInfo: ArticleDonators_article_Article_donations_pageInfo;
  edges: ArticleDonators_article_Article_donations_edges[] | null;
}

export interface ArticleDonators_article_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Transactions history of this article.
   */
  donations: ArticleDonators_article_Article_donations;
}

export type ArticleDonators_article = ArticleDonators_article_User | ArticleDonators_article_Article;

export interface ArticleDonators {
  article: ArticleDonators_article | null;
}

export interface ArticleDonatorsVariables {
  id: string;
  after?: string | null;
}
