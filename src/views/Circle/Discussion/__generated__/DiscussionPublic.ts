/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DiscussionPublic
// ====================================================

export interface DiscussionPublic_circle_owner {
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

export interface DiscussionPublic_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Circle owner.
   */
  owner: DiscussionPublic_circle_owner;
  /**
   * This value determines if current viewer is Member or not.
   */
  circleIsMember: boolean;
  /**
   * Discussion (include replies) count of this circle.
   */
  discussionCount: number;
  /**
   * Discussion (exclude replies) count of this circle.
   */
  discussionThreadCount: number;
}

export interface DiscussionPublic {
  circle: DiscussionPublic_circle | null;
}

export interface DiscussionPublicVariables {
  name: string;
}
