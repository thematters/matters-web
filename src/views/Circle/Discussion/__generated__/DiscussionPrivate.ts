/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DiscussionPrivate
// ====================================================

export interface DiscussionPrivate_circle_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is blocking viewer.
   */
  isBlocking: boolean;
}

export interface DiscussionPrivate_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Circle owner.
   */
  owner: DiscussionPrivate_circle_owner;
  /**
   * This value determines if current viewer is Member or not.
   */
  circleIsMember: boolean;
}

export interface DiscussionPrivate {
  circle: DiscussionPrivate_circle | null;
}

export interface DiscussionPrivateVariables {
  name: string;
}
