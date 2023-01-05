/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleFollowCircle
// ====================================================

export interface ToggleFollowCircle_toggleFollowCircle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * This value determines if current viewer is following Circle or not.
   */
  isFollower: boolean;
}

export interface ToggleFollowCircle {
  /**
   * Follow or unfollow a Circle.
   */
  toggleFollowCircle: ToggleFollowCircle_toggleFollowCircle;
}

export interface ToggleFollowCircleVariables {
  id: string;
  enabled?: boolean | null;
}
