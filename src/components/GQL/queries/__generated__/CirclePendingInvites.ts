/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, InvitationState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: CirclePendingInvites
// ====================================================

export interface CirclePendingInvites_circle_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface CirclePendingInvites_circle_invites_pending_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface CirclePendingInvites_circle_invites_pending_edges_node_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
}

export interface CirclePendingInvites_circle_invites_pending_edges_node_invitee_Person {
  __typename: "Person";
  email: any;
}

export interface CirclePendingInvites_circle_invites_pending_edges_node_invitee_User_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface CirclePendingInvites_circle_invites_pending_edges_node_invitee_User_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CirclePendingInvites_circle_invites_pending_edges_node_invitee_User_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CirclePendingInvites_circle_invites_pending_edges_node_invitee_User_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface CirclePendingInvites_circle_invites_pending_edges_node_invitee_User_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: CirclePendingInvites_circle_invites_pending_edges_node_invitee_User_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: CirclePendingInvites_circle_invites_pending_edges_node_invitee_User_info_cryptoWallet | null;
}

export interface CirclePendingInvites_circle_invites_pending_edges_node_invitee_User {
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
  status: CirclePendingInvites_circle_invites_pending_edges_node_invitee_User_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: CirclePendingInvites_circle_invites_pending_edges_node_invitee_User_liker;
  /**
   * User information.
   */
  info: CirclePendingInvites_circle_invites_pending_edges_node_invitee_User_info;
}

export type CirclePendingInvites_circle_invites_pending_edges_node_invitee = CirclePendingInvites_circle_invites_pending_edges_node_invitee_Person | CirclePendingInvites_circle_invites_pending_edges_node_invitee_User;

export interface CirclePendingInvites_circle_invites_pending_edges_node {
  __typename: "Invitation";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Invitation of current Circle.
   */
  circle: CirclePendingInvites_circle_invites_pending_edges_node_circle;
  /**
   * Free period of this invitation.
   */
  freePeriod: number;
  /**
   * Target person of this invitation.
   */
  invitee: CirclePendingInvites_circle_invites_pending_edges_node_invitee;
  /**
   * Accepted time.
   */
  acceptedAt: any | null;
  /**
   * Determine it's specific state.
   */
  state: InvitationState;
}

export interface CirclePendingInvites_circle_invites_pending_edges {
  __typename: "InvitationEdge";
  cursor: string;
  node: CirclePendingInvites_circle_invites_pending_edges_node;
}

export interface CirclePendingInvites_circle_invites_pending {
  __typename: "InvitationConnection";
  pageInfo: CirclePendingInvites_circle_invites_pending_pageInfo;
  edges: CirclePendingInvites_circle_invites_pending_edges[] | null;
}

export interface CirclePendingInvites_circle_invites {
  __typename: "Invites";
  /**
   * Pending invitation list
   */
  pending: CirclePendingInvites_circle_invites_pending;
}

export interface CirclePendingInvites_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Circle owner.
   */
  owner: CirclePendingInvites_circle_owner;
  /**
   * Invitations belonged to this Circle.
   */
  invites: CirclePendingInvites_circle_invites;
}

export interface CirclePendingInvites {
  circle: CirclePendingInvites_circle | null;
}

export interface CirclePendingInvitesVariables {
  name: string;
  after?: string | null;
}
