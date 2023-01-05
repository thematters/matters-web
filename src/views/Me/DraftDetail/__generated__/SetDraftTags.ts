/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PublishState, AssetType, ArticleState, UserState, BadgeType, ArticleAccessType, TransactionCurrency, ArticleLicenseType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SetDraftTags
// ====================================================

export interface SetDraftTags_putDraft_assets {
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

export interface SetDraftTags_putDraft_collection_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SetDraftTags_putDraft_collection_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SetDraftTags_putDraft_collection_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SetDraftTags_putDraft_collection_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SetDraftTags_putDraft_collection_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SetDraftTags_putDraft_collection_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SetDraftTags_putDraft_collection_edges_node_author_info_cryptoWallet | null;
}

export interface SetDraftTags_putDraft_collection_edges_node_author {
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
  status: SetDraftTags_putDraft_collection_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SetDraftTags_putDraft_collection_edges_node_author_liker;
  /**
   * User information.
   */
  info: SetDraftTags_putDraft_collection_edges_node_author_info;
}

export interface SetDraftTags_putDraft_collection_edges_node {
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
  author: SetDraftTags_putDraft_collection_edges_node_author;
}

export interface SetDraftTags_putDraft_collection_edges {
  __typename: "ArticleEdge";
  node: SetDraftTags_putDraft_collection_edges_node;
}

export interface SetDraftTags_putDraft_collection {
  __typename: "ArticleConnection";
  edges: SetDraftTags_putDraft_collection_edges[] | null;
}

export interface SetDraftTags_putDraft_access_circle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SetDraftTags_putDraft_access_circle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SetDraftTags_putDraft_access_circle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SetDraftTags_putDraft_access_circle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SetDraftTags_putDraft_access_circle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SetDraftTags_putDraft_access_circle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SetDraftTags_putDraft_access_circle_owner_info_cryptoWallet | null;
}

export interface SetDraftTags_putDraft_access_circle_owner {
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
  status: SetDraftTags_putDraft_access_circle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SetDraftTags_putDraft_access_circle_owner_liker;
  /**
   * User information.
   */
  info: SetDraftTags_putDraft_access_circle_owner_info;
}

export interface SetDraftTags_putDraft_access_circle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface SetDraftTags_putDraft_access_circle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface SetDraftTags_putDraft_access_circle_prices {
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

export interface SetDraftTags_putDraft_access_circle {
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
  owner: SetDraftTags_putDraft_access_circle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: SetDraftTags_putDraft_access_circle_members;
  /**
   * List of works belong to this Circle.
   */
  works: SetDraftTags_putDraft_access_circle_works;
  /**
   * Prices offered by this Circle.
   */
  prices: SetDraftTags_putDraft_access_circle_prices[] | null;
}

export interface SetDraftTags_putDraft_access {
  __typename: "DraftAccess";
  type: ArticleAccessType;
  circle: SetDraftTags_putDraft_access_circle | null;
}

export interface SetDraftTags_putDraft {
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
  assets: SetDraftTags_putDraft_assets[];
  /**
   * Tags are attached to this draft.
   */
  tags: string[] | null;
  /**
   * Collection list of this draft.
   */
  collection: SetDraftTags_putDraft_collection;
  /**
   * Access related fields on circle
   */
  access: SetDraftTags_putDraft_access;
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

export interface SetDraftTags {
  /**
   * Create or update a draft.
   */
  putDraft: SetDraftTags_putDraft;
}

export interface SetDraftTagsVariables {
  id: string;
  tags: string[];
}
