/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CircleFollowerCount
// ====================================================

export interface CircleFollowerCount_circle_followers {
  __typename: "UserConnection";
  totalCount: number;
}

export interface CircleFollowerCount_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * List of Circle follower.
   */
  followers: CircleFollowerCount_circle_followers;
}

export interface CircleFollowerCount {
  circle: CircleFollowerCount_circle | null;
}

export interface CircleFollowerCountVariables {
  name: string;
}
