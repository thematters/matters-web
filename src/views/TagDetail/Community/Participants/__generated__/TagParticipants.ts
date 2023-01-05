/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: TagParticipants
// ====================================================

export interface TagParticipants_node_Article {
  __typename: "Article" | "User" | "Comment" | "Circle" | "Topic" | "Chapter" | "Draft";
}

export interface TagParticipants_node_Tag_participants_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface TagParticipants_node_Tag_participants_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface TagParticipants_node_Tag_participants_edges_node_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface TagParticipants_node_Tag_participants_edges_node_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: TagParticipants_node_Tag_participants_edges_node_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: TagParticipants_node_Tag_participants_edges_node_info_cryptoWallet | null;
}

export interface TagParticipants_node_Tag_participants_edges_node_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface TagParticipants_node_Tag_participants_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface TagParticipants_node_Tag_participants_edges_node {
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
  info: TagParticipants_node_Tag_participants_edges_node_info;
  /**
   * Status of current user.
   */
  status: TagParticipants_node_Tag_participants_edges_node_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: TagParticipants_node_Tag_participants_edges_node_liker;
}

export interface TagParticipants_node_Tag_participants_edges {
  __typename: "UserEdge";
  cursor: string;
  node: TagParticipants_node_Tag_participants_edges_node;
}

export interface TagParticipants_node_Tag_participants {
  __typename: "UserConnection";
  totalCount: number;
  pageInfo: TagParticipants_node_Tag_participants_pageInfo;
  edges: TagParticipants_node_Tag_participants_edges[] | null;
}

export interface TagParticipants_node_Tag {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Participants of this tag.
   */
  participants: TagParticipants_node_Tag_participants;
}

export type TagParticipants_node = TagParticipants_node_Article | TagParticipants_node_Tag;

export interface TagParticipants {
  node: TagParticipants_node | null;
}

export interface TagParticipantsVariables {
  id: string;
  after?: string | null;
}
