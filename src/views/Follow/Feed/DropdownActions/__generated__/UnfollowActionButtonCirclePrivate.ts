/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UnfollowActionButtonCirclePrivate
// ====================================================

export interface UnfollowActionButtonCirclePrivate {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Slugified name of this Circle.
   */
  name: string;
  /**
   * Human readable name of this Circle.
   */
  displayName: string;
  /**
   * This value determines if current viewer is following Circle or not.
   */
  isFollower: boolean;
}
