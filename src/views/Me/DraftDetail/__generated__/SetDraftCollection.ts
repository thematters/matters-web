/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SetDraftCollection
// ====================================================

export interface SetDraftCollection_putDraft_collection_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SetDraftCollection_putDraft_collection_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SetDraftCollection_putDraft_collection_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SetDraftCollection_putDraft_collection_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SetDraftCollection_putDraft_collection_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SetDraftCollection_putDraft_collection_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SetDraftCollection_putDraft_collection_edges_node_author_info_cryptoWallet | null;
}

export interface SetDraftCollection_putDraft_collection_edges_node_author {
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
  status: SetDraftCollection_putDraft_collection_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SetDraftCollection_putDraft_collection_edges_node_author_liker;
  /**
   * User information.
   */
  info: SetDraftCollection_putDraft_collection_edges_node_author_info;
}

export interface SetDraftCollection_putDraft_collection_edges_node {
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
  author: SetDraftCollection_putDraft_collection_edges_node_author;
}

export interface SetDraftCollection_putDraft_collection_edges {
  __typename: "ArticleEdge";
  node: SetDraftCollection_putDraft_collection_edges_node;
}

export interface SetDraftCollection_putDraft_collection {
  __typename: "ArticleConnection";
  edges: SetDraftCollection_putDraft_collection_edges[] | null;
}

export interface SetDraftCollection_putDraft {
  __typename: "Draft";
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * Collection list of this draft.
   */
  collection: SetDraftCollection_putDraft_collection;
}

export interface SetDraftCollection {
  /**
   * Create or update a draft.
   */
  putDraft: SetDraftCollection_putDraft;
}

export interface SetDraftCollectionVariables {
  id: string;
  collection?: (string | null)[] | null;
}
