/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PublishState, AssetType, ArticleState, UserState, BadgeType, ArticleAccessType, TransactionCurrency, ArticleLicenseType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SetDraftCover
// ====================================================

export interface SetDraftCover_putDraft_assets {
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

export interface SetDraftCover_putDraft_collection_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SetDraftCover_putDraft_collection_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SetDraftCover_putDraft_collection_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SetDraftCover_putDraft_collection_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SetDraftCover_putDraft_collection_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SetDraftCover_putDraft_collection_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SetDraftCover_putDraft_collection_edges_node_author_info_cryptoWallet | null;
}

export interface SetDraftCover_putDraft_collection_edges_node_author {
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
  status: SetDraftCover_putDraft_collection_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SetDraftCover_putDraft_collection_edges_node_author_liker;
  /**
   * User information.
   */
  info: SetDraftCover_putDraft_collection_edges_node_author_info;
}

export interface SetDraftCover_putDraft_collection_edges_node {
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
  author: SetDraftCover_putDraft_collection_edges_node_author;
}

export interface SetDraftCover_putDraft_collection_edges {
  __typename: "ArticleEdge";
  node: SetDraftCover_putDraft_collection_edges_node;
}

export interface SetDraftCover_putDraft_collection {
  __typename: "ArticleConnection";
  edges: SetDraftCover_putDraft_collection_edges[] | null;
}

export interface SetDraftCover_putDraft_access_circle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SetDraftCover_putDraft_access_circle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SetDraftCover_putDraft_access_circle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SetDraftCover_putDraft_access_circle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SetDraftCover_putDraft_access_circle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SetDraftCover_putDraft_access_circle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SetDraftCover_putDraft_access_circle_owner_info_cryptoWallet | null;
}

export interface SetDraftCover_putDraft_access_circle_owner {
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
  status: SetDraftCover_putDraft_access_circle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SetDraftCover_putDraft_access_circle_owner_liker;
  /**
   * User information.
   */
  info: SetDraftCover_putDraft_access_circle_owner_info;
}

export interface SetDraftCover_putDraft_access_circle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface SetDraftCover_putDraft_access_circle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface SetDraftCover_putDraft_access_circle_prices {
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

export interface SetDraftCover_putDraft_access_circle {
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
  owner: SetDraftCover_putDraft_access_circle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: SetDraftCover_putDraft_access_circle_members;
  /**
   * List of works belong to this Circle.
   */
  works: SetDraftCover_putDraft_access_circle_works;
  /**
   * Prices offered by this Circle.
   */
  prices: SetDraftCover_putDraft_access_circle_prices[] | null;
}

export interface SetDraftCover_putDraft_access {
  __typename: "DraftAccess";
  type: ArticleAccessType;
  circle: SetDraftCover_putDraft_access_circle | null;
}

export interface SetDraftCover_putDraft {
  __typename: "Draft";
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * State of draft during publihsing.
   */
  publishState: PublishState;
  /**
   * Draft's cover link.
   */
  cover: string | null;
  /**
   * List of assets are belonged to this draft.
   */
  assets: SetDraftCover_putDraft_assets[];
  /**
   * Tags are attached to this draft.
   */
  tags: string[] | null;
  /**
   * Collection list of this draft.
   */
  collection: SetDraftCover_putDraft_collection;
  /**
   * Access related fields on circle
   */
  access: SetDraftCover_putDraft_access;
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

export interface SetDraftCover {
  /**
   * Create or update a draft.
   */
  putDraft: SetDraftCover_putDraft;
}

export interface SetDraftCoverVariables {
  id: string;
  cover?: string | null;
}
