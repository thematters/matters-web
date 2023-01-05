/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: TagMaintainers
// ====================================================

export interface TagMaintainers_node_Article {
  __typename: "Article" | "User" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface TagMaintainers_node_Tag_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface TagMaintainers_node_Tag_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface TagMaintainers_node_Tag_owner_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: TagMaintainers_node_Tag_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: TagMaintainers_node_Tag_owner_info_cryptoWallet | null;
}

export interface TagMaintainers_node_Tag_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface TagMaintainers_node_Tag_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface TagMaintainers_node_Tag_owner {
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
  info: TagMaintainers_node_Tag_owner_info;
  /**
   * Status of current user.
   */
  status: TagMaintainers_node_Tag_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: TagMaintainers_node_Tag_owner_liker;
}

export interface TagMaintainers_node_Tag_editors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface TagMaintainers_node_Tag_editors_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface TagMaintainers_node_Tag_editors_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: TagMaintainers_node_Tag_editors_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: TagMaintainers_node_Tag_editors_info_cryptoWallet | null;
}

export interface TagMaintainers_node_Tag_editors_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface TagMaintainers_node_Tag_editors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface TagMaintainers_node_Tag_editors {
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
  info: TagMaintainers_node_Tag_editors_info;
  /**
   * Status of current user.
   */
  status: TagMaintainers_node_Tag_editors_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: TagMaintainers_node_Tag_editors_liker;
}

export interface TagMaintainers_node_Tag {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Owner of this tag.
   */
  owner: TagMaintainers_node_Tag_owner | null;
  /**
   * Editors of this tag.
   */
  editors: TagMaintainers_node_Tag_editors[] | null;
}

export type TagMaintainers_node = TagMaintainers_node_Article | TagMaintainers_node_Tag;

export interface TagMaintainers {
  node: TagMaintainers_node | null;
}

export interface TagMaintainersVariables {
  id: string;
}
