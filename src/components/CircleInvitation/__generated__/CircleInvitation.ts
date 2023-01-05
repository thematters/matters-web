/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, InvitationState } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CircleInvitation
// ====================================================

export interface CircleInvitation_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
}

export interface CircleInvitation_invitee_Person {
  __typename: "Person";
  email: any;
}

export interface CircleInvitation_invitee_User_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface CircleInvitation_invitee_User_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CircleInvitation_invitee_User_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CircleInvitation_invitee_User_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface CircleInvitation_invitee_User_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: CircleInvitation_invitee_User_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: CircleInvitation_invitee_User_info_cryptoWallet | null;
}

export interface CircleInvitation_invitee_User {
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
  status: CircleInvitation_invitee_User_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: CircleInvitation_invitee_User_liker;
  /**
   * User information.
   */
  info: CircleInvitation_invitee_User_info;
}

export type CircleInvitation_invitee = CircleInvitation_invitee_Person | CircleInvitation_invitee_User;

export interface CircleInvitation {
  __typename: "Invitation";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Invitation of current Circle.
   */
  circle: CircleInvitation_circle;
  /**
   * Free period of this invitation.
   */
  freePeriod: number;
  /**
   * Target person of this invitation.
   */
  invitee: CircleInvitation_invitee;
  /**
   * Accepted time.
   */
  acceptedAt: any | null;
  /**
   * Determine it's specific state.
   */
  state: InvitationState;
}
