/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AssetType, UserState, BadgeType, TransactionCurrency, ArticleAccessType, ArticleLicenseType, PublishState, ArticleState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: EditModeArticle
// ====================================================

export interface EditModeArticle_article_User {
  __typename: "User" | "Tag" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface EditModeArticle_article_Article_assets {
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

export interface EditModeArticle_article_Article_tags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
}

export interface EditModeArticle_article_Article_author_ownCircles_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface EditModeArticle_article_Article_author_ownCircles_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface EditModeArticle_article_Article_author_ownCircles_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface EditModeArticle_article_Article_author_ownCircles_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface EditModeArticle_article_Article_author_ownCircles_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: EditModeArticle_article_Article_author_ownCircles_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: EditModeArticle_article_Article_author_ownCircles_owner_info_cryptoWallet | null;
}

export interface EditModeArticle_article_Article_author_ownCircles_owner {
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
  status: EditModeArticle_article_Article_author_ownCircles_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: EditModeArticle_article_Article_author_ownCircles_owner_liker;
  /**
   * User information.
   */
  info: EditModeArticle_article_Article_author_ownCircles_owner_info;
}

export interface EditModeArticle_article_Article_author_ownCircles_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface EditModeArticle_article_Article_author_ownCircles_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface EditModeArticle_article_Article_author_ownCircles_prices {
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

export interface EditModeArticle_article_Article_author_ownCircles {
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
  owner: EditModeArticle_article_Article_author_ownCircles_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: EditModeArticle_article_Article_author_ownCircles_members;
  /**
   * List of works belong to this Circle.
   */
  works: EditModeArticle_article_Article_author_ownCircles_works;
  /**
   * Prices offered by this Circle.
   */
  prices: EditModeArticle_article_Article_author_ownCircles_prices[] | null;
}

export interface EditModeArticle_article_Article_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Circles belong to current user.
   */
  ownCircles: EditModeArticle_article_Article_author_ownCircles[] | null;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
}

export interface EditModeArticle_article_Article_access_circle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface EditModeArticle_article_Article_access_circle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface EditModeArticle_article_Article_access_circle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface EditModeArticle_article_Article_access_circle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface EditModeArticle_article_Article_access_circle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: EditModeArticle_article_Article_access_circle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: EditModeArticle_article_Article_access_circle_owner_info_cryptoWallet | null;
}

export interface EditModeArticle_article_Article_access_circle_owner {
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
  status: EditModeArticle_article_Article_access_circle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: EditModeArticle_article_Article_access_circle_owner_liker;
  /**
   * User information.
   */
  info: EditModeArticle_article_Article_access_circle_owner_info;
}

export interface EditModeArticle_article_Article_access_circle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface EditModeArticle_article_Article_access_circle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface EditModeArticle_article_Article_access_circle_prices {
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

export interface EditModeArticle_article_Article_access_circle {
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
  owner: EditModeArticle_article_Article_access_circle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: EditModeArticle_article_Article_access_circle_members;
  /**
   * List of works belong to this Circle.
   */
  works: EditModeArticle_article_Article_access_circle_works;
  /**
   * Prices offered by this Circle.
   */
  prices: EditModeArticle_article_Article_access_circle_prices[] | null;
}

export interface EditModeArticle_article_Article_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
  circle: EditModeArticle_article_Article_access_circle | null;
}

export interface EditModeArticle_article_Article_drafts {
  __typename: "Draft";
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * Media hash, composed of cid encoding, of this draft.
   */
  mediaHash: string | null;
  /**
   * State of draft during publihsing.
   */
  publishState: PublishState;
  /**
   * Draft title.
   */
  title: string | null;
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
}

export interface EditModeArticle_article_Article_collection_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface EditModeArticle_article_Article_collection_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface EditModeArticle_article_Article_collection_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface EditModeArticle_article_Article_collection_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface EditModeArticle_article_Article_collection_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface EditModeArticle_article_Article_collection_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: EditModeArticle_article_Article_collection_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: EditModeArticle_article_Article_collection_edges_node_author_info_cryptoWallet | null;
}

export interface EditModeArticle_article_Article_collection_edges_node_author {
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
  status: EditModeArticle_article_Article_collection_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: EditModeArticle_article_Article_collection_edges_node_author_liker;
  /**
   * User information.
   */
  info: EditModeArticle_article_Article_collection_edges_node_author_info;
}

export interface EditModeArticle_article_Article_collection_edges_node {
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
  author: EditModeArticle_article_Article_collection_edges_node_author;
}

export interface EditModeArticle_article_Article_collection_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: EditModeArticle_article_Article_collection_edges_node;
}

export interface EditModeArticle_article_Article_collection {
  __typename: "ArticleConnection";
  pageInfo: EditModeArticle_article_Article_collection_pageInfo;
  totalCount: number;
  edges: EditModeArticle_article_Article_collection_edges[] | null;
}

export interface EditModeArticle_article_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
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
   * List of assets are belonged to this article (Only the author can access currently).
   */
  assets: EditModeArticle_article_Article_assets[];
  /**
   * Tags attached to this article.
   */
  tags: EditModeArticle_article_Article_tags[] | null;
  /**
   * Author of this article.
   */
  author: EditModeArticle_article_Article_author;
  /**
   * Access related fields on circle
   */
  access: EditModeArticle_article_Article_access;
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
   * Revision Count
   */
  revisionCount: number;
  /**
   * Drafts linked to this article.
   */
  drafts: EditModeArticle_article_Article_drafts[] | null;
  /**
   * List of articles added into this article' collection.
   */
  collection: EditModeArticle_article_Article_collection;
}

export type EditModeArticle_article = EditModeArticle_article_User | EditModeArticle_article_Article;

export interface EditModeArticle {
  article: EditModeArticle_article | null;
}

export interface EditModeArticleVariables {
  id: string;
  after?: string | null;
  first?: any | null;
}
