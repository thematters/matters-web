/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DropdownActionsCirclePublic
// ====================================================

export interface DropdownActionsCirclePublic_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface DropdownActionsCirclePublic {
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
   * Circle owner.
   */
  owner: DropdownActionsCirclePublic_owner;
}
