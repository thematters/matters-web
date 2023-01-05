/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ArticleAppreciators
// ====================================================

export interface ArticleAppreciators_article_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface ArticleAppreciators_article_Article_appreciationsReceived_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface ArticleAppreciators_article_Article_appreciationsReceived_edges_node_sender_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleAppreciators_article_Article_appreciationsReceived_edges_node_sender_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ArticleAppreciators_article_Article_appreciationsReceived_edges_node_sender_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: ArticleAppreciators_article_Article_appreciationsReceived_edges_node_sender_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ArticleAppreciators_article_Article_appreciationsReceived_edges_node_sender_info_cryptoWallet | null;
}

export interface ArticleAppreciators_article_Article_appreciationsReceived_edges_node_sender_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ArticleAppreciators_article_Article_appreciationsReceived_edges_node_sender_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleAppreciators_article_Article_appreciationsReceived_edges_node_sender {
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
  info: ArticleAppreciators_article_Article_appreciationsReceived_edges_node_sender_info;
  /**
   * Status of current user.
   */
  status: ArticleAppreciators_article_Article_appreciationsReceived_edges_node_sender_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ArticleAppreciators_article_Article_appreciationsReceived_edges_node_sender_liker;
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

export interface ArticleAppreciators_article_Article_appreciationsReceived_edges_node {
  __typename: "Appreciation";
  amount: number;
  /**
   * Sender of appreciation.
   */
  sender: ArticleAppreciators_article_Article_appreciationsReceived_edges_node_sender | null;
}

export interface ArticleAppreciators_article_Article_appreciationsReceived_edges {
  __typename: "AppreciationEdge";
  cursor: string;
  node: ArticleAppreciators_article_Article_appreciationsReceived_edges_node;
}

export interface ArticleAppreciators_article_Article_appreciationsReceived {
  __typename: "AppreciationConnection";
  totalCount: number;
  pageInfo: ArticleAppreciators_article_Article_appreciationsReceived_pageInfo;
  edges: ArticleAppreciators_article_Article_appreciationsReceived_edges[] | null;
}

export interface ArticleAppreciators_article_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Appreciations history of this article.
   */
  appreciationsReceived: ArticleAppreciators_article_Article_appreciationsReceived;
}

export type ArticleAppreciators_article = ArticleAppreciators_article_User | ArticleAppreciators_article_Article;

export interface ArticleAppreciators {
  article: ArticleAppreciators_article | null;
}

export interface ArticleAppreciatorsVariables {
  id: string;
  after?: string | null;
}
