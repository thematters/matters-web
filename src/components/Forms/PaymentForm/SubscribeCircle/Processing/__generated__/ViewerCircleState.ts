/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewerCircleState
// ====================================================

export interface ViewerCircleState_circle {
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

export interface ViewerCircleState {
  circle: ViewerCircleState_circle | null;
}

export interface ViewerCircleStateVariables {
  name: string;
}
