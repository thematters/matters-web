/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: RelatedDonations
// ====================================================

export interface RelatedDonations_sender_status {
  __typename: "UserStatus";
  /**
   * Number of articles donated by user
   */
  donatedArticleCount: number;
}

export interface RelatedDonations_sender {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Status of current user.
   */
  status: RelatedDonations_sender_status | null;
}

export interface RelatedDonations_recipient_status {
  __typename: "UserStatus";
  /**
   * Number of times of donations received by user
   */
  receivedDonationCount: number;
}

export interface RelatedDonations_recipient {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Status of current user.
   */
  status: RelatedDonations_recipient_status | null;
}

export interface RelatedDonations_node_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
  id: string;
}

export interface RelatedDonations_node_Article_relatedDonationArticles_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface RelatedDonations_node_Article_relatedDonationArticles_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface RelatedDonations_node_Article_relatedDonationArticles_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface RelatedDonations_node_Article_relatedDonationArticles_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface RelatedDonations_node_Article_relatedDonationArticles_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface RelatedDonations_node_Article_relatedDonationArticles_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: RelatedDonations_node_Article_relatedDonationArticles_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: RelatedDonations_node_Article_relatedDonationArticles_edges_node_author_info_cryptoWallet | null;
}

export interface RelatedDonations_node_Article_relatedDonationArticles_edges_node_author {
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
  status: RelatedDonations_node_Article_relatedDonationArticles_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: RelatedDonations_node_Article_relatedDonationArticles_edges_node_author_liker;
  /**
   * User information.
   */
  info: RelatedDonations_node_Article_relatedDonationArticles_edges_node_author_info;
}

export interface RelatedDonations_node_Article_relatedDonationArticles_edges_node {
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
  author: RelatedDonations_node_Article_relatedDonationArticles_edges_node_author;
}

export interface RelatedDonations_node_Article_relatedDonationArticles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: RelatedDonations_node_Article_relatedDonationArticles_edges_node;
}

export interface RelatedDonations_node_Article_relatedDonationArticles {
  __typename: "ArticleConnection";
  pageInfo: RelatedDonations_node_Article_relatedDonationArticles_pageInfo;
  totalCount: number;
  edges: RelatedDonations_node_Article_relatedDonationArticles_edges[] | null;
}

export interface RelatedDonations_node_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Donation-related articles to this article.
   */
  relatedDonationArticles: RelatedDonations_node_Article_relatedDonationArticles;
}

export type RelatedDonations_node = RelatedDonations_node_User | RelatedDonations_node_Article;

export interface RelatedDonations {
  sender: RelatedDonations_sender | null;
  recipient: RelatedDonations_recipient | null;
  node: RelatedDonations_node | null;
}

export interface RelatedDonationsVariables {
  senderUserName: string;
  recipientUserName: string;
  targetId: string;
  first?: any | null;
  random: any;
}
