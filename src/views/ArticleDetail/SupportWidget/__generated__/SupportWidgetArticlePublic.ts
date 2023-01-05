/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, TransactionCurrency } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: SupportWidgetArticlePublic
// ====================================================

export interface SupportWidgetArticlePublic_author_liker {
  __typename: "Liker";
  /**
   * Liker ID of LikeCoin
   */
  likerId: string | null;
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SupportWidgetArticlePublic_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SupportWidgetArticlePublic_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SupportWidgetArticlePublic_author_info {
  __typename: "UserInfo";
  /**
   * Login address
   */
  ethAddress: string | null;
  /**
   * User badges.
   */
  badges: SupportWidgetArticlePublic_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SupportWidgetArticlePublic_author_info_cryptoWallet | null;
}

export interface SupportWidgetArticlePublic_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SupportWidgetArticlePublic_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Liker info of current user
   */
  liker: SupportWidgetArticlePublic_author_liker;
  /**
   * User information.
   */
  info: SupportWidgetArticlePublic_author_info;
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
  status: SupportWidgetArticlePublic_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
}

export interface SupportWidgetArticlePublic_access_circle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SupportWidgetArticlePublic_access_circle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SupportWidgetArticlePublic_access_circle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SupportWidgetArticlePublic_access_circle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SupportWidgetArticlePublic_access_circle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SupportWidgetArticlePublic_access_circle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SupportWidgetArticlePublic_access_circle_owner_info_cryptoWallet | null;
}

export interface SupportWidgetArticlePublic_access_circle_owner {
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
  status: SupportWidgetArticlePublic_access_circle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SupportWidgetArticlePublic_access_circle_owner_liker;
  /**
   * User information.
   */
  info: SupportWidgetArticlePublic_access_circle_owner_info;
}

export interface SupportWidgetArticlePublic_access_circle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface SupportWidgetArticlePublic_access_circle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface SupportWidgetArticlePublic_access_circle_prices {
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

export interface SupportWidgetArticlePublic_access_circle {
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
   * Circle owner.
   */
  owner: SupportWidgetArticlePublic_access_circle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: SupportWidgetArticlePublic_access_circle_members;
  /**
   * List of works belong to this Circle.
   */
  works: SupportWidgetArticlePublic_access_circle_works;
  /**
   * Prices offered by this Circle.
   */
  prices: SupportWidgetArticlePublic_access_circle_prices[] | null;
}

export interface SupportWidgetArticlePublic_access {
  __typename: "ArticleAccess";
  circle: SupportWidgetArticlePublic_access_circle | null;
}

export interface SupportWidgetArticlePublic_donations_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SupportWidgetArticlePublic_donations_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SupportWidgetArticlePublic_donations_edges_node_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SupportWidgetArticlePublic_donations_edges_node_info_badges[] | null;
}

export interface SupportWidgetArticlePublic_donations_edges_node {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SupportWidgetArticlePublic_donations_edges_node_liker;
  /**
   * User information.
   */
  info: SupportWidgetArticlePublic_donations_edges_node_info;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface SupportWidgetArticlePublic_donations_edges {
  __typename: "UserEdge";
  cursor: string;
  node: SupportWidgetArticlePublic_donations_edges_node;
}

export interface SupportWidgetArticlePublic_donations {
  __typename: "UserConnection";
  totalCount: number;
  edges: SupportWidgetArticlePublic_donations_edges[] | null;
}

export interface SupportWidgetArticlePublic_donationsDialog {
  __typename: "UserConnection";
  totalCount: number;
}

export interface SupportWidgetArticlePublic {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: SupportWidgetArticlePublic_author;
  /**
   * Access related fields on circle
   */
  access: SupportWidgetArticlePublic_access;
  /**
   * creator message asking for support
   */
  requestForDonation: string | null;
  /**
   * Transactions history of this article.
   */
  donations: SupportWidgetArticlePublic_donations;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Transactions history of this article.
   */
  donationsDialog: SupportWidgetArticlePublic_donationsDialog;
}
