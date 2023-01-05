/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: InvitationsCircle
// ====================================================

export interface InvitationsCircle_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
}

export interface InvitationsCircle {
  circle: InvitationsCircle_circle | null;
}

export interface InvitationsCircleVariables {
  name: string;
}
