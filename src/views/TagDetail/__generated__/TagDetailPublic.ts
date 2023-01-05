/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: TagDetailPublic
// ====================================================

export interface TagDetailPublic_node_Article {
  __typename: "Article" | "User" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface TagDetailPublic_node_Tag_creator_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface TagDetailPublic_node_Tag_creator_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface TagDetailPublic_node_Tag_creator_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface TagDetailPublic_node_Tag_creator_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface TagDetailPublic_node_Tag_creator_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: TagDetailPublic_node_Tag_creator_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: TagDetailPublic_node_Tag_creator_info_cryptoWallet | null;
}

export interface TagDetailPublic_node_Tag_creator {
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
  status: TagDetailPublic_node_Tag_creator_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: TagDetailPublic_node_Tag_creator_liker;
  /**
   * User information.
   */
  info: TagDetailPublic_node_Tag_creator_info;
}

export interface TagDetailPublic_node_Tag_editors_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface TagDetailPublic_node_Tag_editors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface TagDetailPublic_node_Tag_editors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface TagDetailPublic_node_Tag_editors_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface TagDetailPublic_node_Tag_editors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: TagDetailPublic_node_Tag_editors_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: TagDetailPublic_node_Tag_editors_info_cryptoWallet | null;
}

export interface TagDetailPublic_node_Tag_editors {
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
  status: TagDetailPublic_node_Tag_editors_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: TagDetailPublic_node_Tag_editors_liker;
  /**
   * User information.
   */
  info: TagDetailPublic_node_Tag_editors_info;
}

export interface TagDetailPublic_node_Tag_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface TagDetailPublic_node_Tag_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface TagDetailPublic_node_Tag_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface TagDetailPublic_node_Tag_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface TagDetailPublic_node_Tag_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: TagDetailPublic_node_Tag_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: TagDetailPublic_node_Tag_owner_info_cryptoWallet | null;
}

export interface TagDetailPublic_node_Tag_owner {
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
  status: TagDetailPublic_node_Tag_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: TagDetailPublic_node_Tag_owner_liker;
  /**
   * User information.
   */
  info: TagDetailPublic_node_Tag_owner_info;
}

export interface TagDetailPublic_node_Tag_selectedArticles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface TagDetailPublic_node_Tag_followers_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface TagDetailPublic_node_Tag_followers_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface TagDetailPublic_node_Tag_followers_edges_node_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: TagDetailPublic_node_Tag_followers_edges_node_info_badges[] | null;
}

export interface TagDetailPublic_node_Tag_followers_edges_node {
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
  liker: TagDetailPublic_node_Tag_followers_edges_node_liker;
  /**
   * User information.
   */
  info: TagDetailPublic_node_Tag_followers_edges_node_info;
}

export interface TagDetailPublic_node_Tag_followers_edges {
  __typename: "UserEdge";
  cursor: string;
  node: TagDetailPublic_node_Tag_followers_edges_node;
}

export interface TagDetailPublic_node_Tag_followers {
  __typename: "UserConnection";
  totalCount: number;
  edges: TagDetailPublic_node_Tag_followers_edges[] | null;
}

export interface TagDetailPublic_node_Tag_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface TagDetailPublic_node_Tag_recommended_edges_node {
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

export interface TagDetailPublic_node_Tag_recommended_edges {
  __typename: "TagEdge";
  cursor: string;
  node: TagDetailPublic_node_Tag_recommended_edges_node;
}

export interface TagDetailPublic_node_Tag_recommended {
  __typename: "TagConnection";
  edges: TagDetailPublic_node_Tag_recommended_edges[] | null;
}

export interface TagDetailPublic_node_Tag {
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
  creator: TagDetailPublic_node_Tag_creator | null;
  /**
   * Editors of this tag.
   */
  editors: TagDetailPublic_node_Tag_editors[] | null;
  /**
   * Owner of this tag.
   */
  owner: TagDetailPublic_node_Tag_owner | null;
  /**
   * List of how many articles were attached with this tag.
   */
  selectedArticles: TagDetailPublic_node_Tag_selectedArticles;
  /**
   * This value determines if it is official.
   */
  isOfficial: boolean | null;
  /**
   * Followers of this tag.
   */
  followers: TagDetailPublic_node_Tag_followers;
  /**
   * List of how many articles were attached with this tag.
   */
  articles: TagDetailPublic_node_Tag_articles;
  /**
   * This value determines if current viewer is following or not.
   */
  isFollower: boolean | null;
  /**
   * Tags recommended based on relations to current tag.
   */
  recommended: TagDetailPublic_node_Tag_recommended;
}

export type TagDetailPublic_node = TagDetailPublic_node_Article | TagDetailPublic_node_Tag;

export interface TagDetailPublic {
  node: TagDetailPublic_node | null;
}

export interface TagDetailPublicVariables {
  id: string;
}
