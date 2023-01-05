/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, InvitationState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: CircleAcceptedInvites
// ====================================================

export interface CircleAcceptedInvites_circle_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface CircleAcceptedInvites_circle_invites_accepted_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface CircleAcceptedInvites_circle_invites_accepted_edges_node_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
}

export interface CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee_Person {
  __typename: "Person";
  email: any;
}

export interface CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee_User_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee_User_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee_User_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee_User_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee_User_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee_User_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee_User_info_cryptoWallet | null;
}

export interface CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee_User {
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
  status: CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee_User_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee_User_liker;
  /**
   * User information.
   */
  info: CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee_User_info;
}

export type CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee = CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee_Person | CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee_User;

export interface CircleAcceptedInvites_circle_invites_accepted_edges_node {
  __typename: "Invitation";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Invitation of current Circle.
   */
  circle: CircleAcceptedInvites_circle_invites_accepted_edges_node_circle;
  /**
   * Free period of this invitation.
   */
  freePeriod: number;
  /**
   * Target person of this invitation.
   */
  invitee: CircleAcceptedInvites_circle_invites_accepted_edges_node_invitee;
  /**
   * Accepted time.
   */
  acceptedAt: any | null;
  /**
   * Determine it's specific state.
   */
  state: InvitationState;
}

export interface CircleAcceptedInvites_circle_invites_accepted_edges {
  __typename: "InvitationEdge";
  cursor: string;
  node: CircleAcceptedInvites_circle_invites_accepted_edges_node;
}

export interface CircleAcceptedInvites_circle_invites_accepted {
  __typename: "InvitationConnection";
  pageInfo: CircleAcceptedInvites_circle_invites_accepted_pageInfo;
  edges: CircleAcceptedInvites_circle_invites_accepted_edges[] | null;
}

export interface CircleAcceptedInvites_circle_invites {
  __typename: "Invites";
  /**
   * Accepted invitation list
   */
  accepted: CircleAcceptedInvites_circle_invites_accepted;
}

export interface CircleAcceptedInvites_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Circle owner.
   */
  owner: CircleAcceptedInvites_circle_owner;
  /**
   * Invitations belonged to this Circle.
   */
  invites: CircleAcceptedInvites_circle_invites;
}

export interface CircleAcceptedInvites {
  circle: CircleAcceptedInvites_circle | null;
}

export interface CircleAcceptedInvitesVariables {
  name: string;
  after?: string | null;
}
