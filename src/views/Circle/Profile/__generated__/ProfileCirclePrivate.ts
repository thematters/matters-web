/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvitationState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ProfileCirclePrivate
// ====================================================

export interface ProfileCirclePrivate_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface ProfileCirclePrivate_invitedBy {
  __typename: "Invitation";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Determine it's specific state.
   */
  state: InvitationState;
  /**
   * Free period of this invitation.
   */
  freePeriod: number;
}

export interface ProfileCirclePrivate {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Circle owner.
   */
  owner: ProfileCirclePrivate_owner;
  /**
   * This value determines if current viewer is Member or not.
   */
  isMember: boolean;
  /**
   * Slugified name of this Circle.
   */
  name: string;
  /**
   * This value determines if current viewer is following Circle or not.
   */
  isFollower: boolean;
  /**
   * Invitation used by current viewer.
   */
  invitedBy: ProfileCirclePrivate_invitedBy | null;
}
