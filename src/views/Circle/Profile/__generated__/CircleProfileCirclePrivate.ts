/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvitationState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: CircleProfileCirclePrivate
// ====================================================

export interface CircleProfileCirclePrivate_circle_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface CircleProfileCirclePrivate_circle_invitedBy {
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

export interface CircleProfileCirclePrivate_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Circle owner.
   */
  owner: CircleProfileCirclePrivate_circle_owner;
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
  invitedBy: CircleProfileCirclePrivate_circle_invitedBy | null;
}

export interface CircleProfileCirclePrivate {
  circle: CircleProfileCirclePrivate_circle | null;
}

export interface CircleProfileCirclePrivateVariables {
  name: string;
}
