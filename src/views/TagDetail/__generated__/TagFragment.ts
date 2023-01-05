/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: TagFragment
// ====================================================

export interface TagFragment_creator_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface TagFragment_creator_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface TagFragment_creator_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface TagFragment_creator_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface TagFragment_creator_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: TagFragment_creator_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: TagFragment_creator_info_cryptoWallet | null;
}

export interface TagFragment_creator {
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
  status: TagFragment_creator_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: TagFragment_creator_liker;
  /**
   * User information.
   */
  info: TagFragment_creator_info;
}

export interface TagFragment_editors_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface TagFragment_editors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface TagFragment_editors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface TagFragment_editors_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface TagFragment_editors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: TagFragment_editors_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: TagFragment_editors_info_cryptoWallet | null;
}

export interface TagFragment_editors {
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
  status: TagFragment_editors_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: TagFragment_editors_liker;
  /**
   * User information.
   */
  info: TagFragment_editors_info;
}

export interface TagFragment_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface TagFragment_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface TagFragment_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface TagFragment_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface TagFragment_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: TagFragment_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: TagFragment_owner_info_cryptoWallet | null;
}

export interface TagFragment_owner {
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
  status: TagFragment_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: TagFragment_owner_liker;
  /**
   * User information.
   */
  info: TagFragment_owner_info;
}

export interface TagFragment_selectedArticles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface TagFragment_followers_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface TagFragment_followers_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface TagFragment_followers_edges_node_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: TagFragment_followers_edges_node_info_badges[] | null;
}

export interface TagFragment_followers_edges_node {
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
  liker: TagFragment_followers_edges_node_liker;
  /**
   * User information.
   */
  info: TagFragment_followers_edges_node_info;
}

export interface TagFragment_followers_edges {
  __typename: "UserEdge";
  cursor: string;
  node: TagFragment_followers_edges_node;
}

export interface TagFragment_followers {
  __typename: "UserConnection";
  totalCount: number;
  edges: TagFragment_followers_edges[] | null;
}

export interface TagFragment_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface TagFragment_recommended_edges_node {
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
   * Description of this tag.
   */
  description: string | null;
  /**
   * Tag's cover link.
   */
  cover: string | null;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
}

export interface TagFragment_recommended_edges {
  __typename: "TagEdge";
  cursor: string;
  node: TagFragment_recommended_edges_node;
}

export interface TagFragment_recommended {
  __typename: "TagConnection";
  edges: TagFragment_recommended_edges[] | null;
}

export interface TagFragment {
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
   * Tag's cover link.
   */
  cover: string | null;
  /**
   * Description of this tag.
   */
  description: string | null;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
  /**
   * Creator of this tag.
   */
  creator: TagFragment_creator | null;
  /**
   * Editors of this tag.
   */
  editors: TagFragment_editors[] | null;
  /**
   * Owner of this tag.
   */
  owner: TagFragment_owner | null;
  /**
   * List of how many articles were attached with this tag.
   */
  selectedArticles: TagFragment_selectedArticles;
  /**
   * This value determines if it is official.
   */
  isOfficial: boolean | null;
  /**
   * Followers of this tag.
   */
  followers: TagFragment_followers;
  /**
   * List of how many articles were attached with this tag.
   */
  articles: TagFragment_articles;
  /**
   * This value determines if current viewer is following or not.
   */
  isFollower: boolean | null;
  /**
   * Tags recommended based on relations to current tag.
   */
  recommended: TagFragment_recommended;
}
