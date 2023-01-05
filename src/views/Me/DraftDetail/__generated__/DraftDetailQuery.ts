/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, TransactionCurrency, PublishState, AssetType, ArticleState, ArticleAccessType, ArticleLicenseType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: DraftDetailQuery
// ====================================================

export interface DraftDetailQuery_viewer_ownCircles_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DraftDetailQuery_viewer_ownCircles_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DraftDetailQuery_viewer_ownCircles_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DraftDetailQuery_viewer_ownCircles_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DraftDetailQuery_viewer_ownCircles_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DraftDetailQuery_viewer_ownCircles_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DraftDetailQuery_viewer_ownCircles_owner_info_cryptoWallet | null;
}

export interface DraftDetailQuery_viewer_ownCircles_owner {
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
  status: DraftDetailQuery_viewer_ownCircles_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DraftDetailQuery_viewer_ownCircles_owner_liker;
  /**
   * User information.
   */
  info: DraftDetailQuery_viewer_ownCircles_owner_info;
}

export interface DraftDetailQuery_viewer_ownCircles_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface DraftDetailQuery_viewer_ownCircles_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface DraftDetailQuery_viewer_ownCircles_prices {
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

export interface DraftDetailQuery_viewer_ownCircles {
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
  owner: DraftDetailQuery_viewer_ownCircles_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: DraftDetailQuery_viewer_ownCircles_members;
  /**
   * List of works belong to this Circle.
   */
  works: DraftDetailQuery_viewer_ownCircles_works;
  /**
   * Prices offered by this Circle.
   */
  prices: DraftDetailQuery_viewer_ownCircles_prices[] | null;
}

export interface DraftDetailQuery_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Circles belong to current user.
   */
  ownCircles: DraftDetailQuery_viewer_ownCircles[] | null;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
}

export interface DraftDetailQuery_node_Article {
  __typename: "Article" | "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter";
  id: string;
}

export interface DraftDetailQuery_node_Draft_article_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface DraftDetailQuery_node_Draft_article {
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
   * Author of this article.
   */
  author: DraftDetailQuery_node_Draft_article_author;
}

export interface DraftDetailQuery_node_Draft_assets {
  __typename: "Asset";
  /**
   * Unique ID of this Asset.
   */
  id: string;
  /**
   * Types of this asset.
   */
  type: AssetType;
  /**
   * Link of this asset.
   */
  path: string;
}

export interface DraftDetailQuery_node_Draft_collection_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DraftDetailQuery_node_Draft_collection_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DraftDetailQuery_node_Draft_collection_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DraftDetailQuery_node_Draft_collection_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DraftDetailQuery_node_Draft_collection_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DraftDetailQuery_node_Draft_collection_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DraftDetailQuery_node_Draft_collection_edges_node_author_info_cryptoWallet | null;
}

export interface DraftDetailQuery_node_Draft_collection_edges_node_author {
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
  status: DraftDetailQuery_node_Draft_collection_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DraftDetailQuery_node_Draft_collection_edges_node_author_liker;
  /**
   * User information.
   */
  info: DraftDetailQuery_node_Draft_collection_edges_node_author_info;
}

export interface DraftDetailQuery_node_Draft_collection_edges_node {
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
  author: DraftDetailQuery_node_Draft_collection_edges_node_author;
}

export interface DraftDetailQuery_node_Draft_collection_edges {
  __typename: "ArticleEdge";
  node: DraftDetailQuery_node_Draft_collection_edges_node;
}

export interface DraftDetailQuery_node_Draft_collection {
  __typename: "ArticleConnection";
  edges: DraftDetailQuery_node_Draft_collection_edges[] | null;
}

export interface DraftDetailQuery_node_Draft_access_circle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DraftDetailQuery_node_Draft_access_circle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DraftDetailQuery_node_Draft_access_circle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DraftDetailQuery_node_Draft_access_circle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DraftDetailQuery_node_Draft_access_circle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DraftDetailQuery_node_Draft_access_circle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DraftDetailQuery_node_Draft_access_circle_owner_info_cryptoWallet | null;
}

export interface DraftDetailQuery_node_Draft_access_circle_owner {
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
  status: DraftDetailQuery_node_Draft_access_circle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DraftDetailQuery_node_Draft_access_circle_owner_liker;
  /**
   * User information.
   */
  info: DraftDetailQuery_node_Draft_access_circle_owner_info;
}

export interface DraftDetailQuery_node_Draft_access_circle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface DraftDetailQuery_node_Draft_access_circle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface DraftDetailQuery_node_Draft_access_circle_prices {
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

export interface DraftDetailQuery_node_Draft_access_circle {
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
  owner: DraftDetailQuery_node_Draft_access_circle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: DraftDetailQuery_node_Draft_access_circle_members;
  /**
   * List of works belong to this Circle.
   */
  works: DraftDetailQuery_node_Draft_access_circle_works;
  /**
   * Prices offered by this Circle.
   */
  prices: DraftDetailQuery_node_Draft_access_circle_prices[] | null;
}

export interface DraftDetailQuery_node_Draft_access {
  __typename: "DraftAccess";
  type: ArticleAccessType;
  circle: DraftDetailQuery_node_Draft_access_circle | null;
}

export interface DraftDetailQuery_node_Draft {
  __typename: "Draft";
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * Draft title.
   */
  title: string | null;
  /**
   * State of draft during publihsing.
   */
  publishState: PublishState;
  /**
   * Content of this draft.
   */
  content: string | null;
  /**
   * Summary of this draft.
   */
  summary: string | null;
  /**
   * This value determines if the summary is customized or not.
   */
  summaryCustomized: boolean;
  /**
   * Published article
   */
  article: DraftDetailQuery_node_Draft_article | null;
  /**
   * Draft's cover link.
   */
  cover: string | null;
  /**
   * List of assets are belonged to this draft.
   */
  assets: DraftDetailQuery_node_Draft_assets[];
  /**
   * Tags are attached to this draft.
   */
  tags: string[] | null;
  /**
   * Collection list of this draft.
   */
  collection: DraftDetailQuery_node_Draft_collection;
  /**
   * Access related fields on circle
   */
  access: DraftDetailQuery_node_Draft_access;
  /**
   * License Type
   */
  license: ArticleLicenseType;
  /**
   * creator message asking for support
   */
  requestForDonation: string | null;
  /**
   * creator message after support
   */
  replyToDonator: string | null;
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export type DraftDetailQuery_node = DraftDetailQuery_node_Article | DraftDetailQuery_node_Draft;

export interface DraftDetailQuery {
  viewer: DraftDetailQuery_viewer | null;
  node: DraftDetailQuery_node | null;
}

export interface DraftDetailQueryVariables {
  id: string;
}
