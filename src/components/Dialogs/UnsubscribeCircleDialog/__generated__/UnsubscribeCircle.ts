/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnsubscribeCircle
// ====================================================

export interface UnsubscribeCircle_unsubscribeCircle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * This value determines if current viewer is Member or not.
   */
  isMember: boolean;
}

export interface UnsubscribeCircle {
  /**
   * Unsubscribe a Circle.
   */
  unsubscribeCircle: UnsubscribeCircle_unsubscribeCircle;
}

export interface UnsubscribeCircleVariables {
  id: string;
}
