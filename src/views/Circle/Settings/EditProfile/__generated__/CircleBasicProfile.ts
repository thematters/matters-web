/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CircleBasicProfile
// ====================================================

export interface CircleBasicProfile_circle_owner {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface CircleBasicProfile_circle {
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
   * A short description of this Circle.
   */
  description: string | null;
  /**
   * Circle cover's link.
   */
  cover: string | null;
  /**
   * Circle owner.
   */
  owner: CircleBasicProfile_circle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
}

export interface CircleBasicProfile {
  circle: CircleBasicProfile_circle | null;
}

export interface CircleBasicProfileVariables {
  name: string;
}
