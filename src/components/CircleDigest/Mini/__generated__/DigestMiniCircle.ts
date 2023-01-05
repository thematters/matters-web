/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DigestMiniCircle
// ====================================================

export interface DigestMiniCircle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface DigestMiniCircle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface DigestMiniCircle {
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
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: DigestMiniCircle_members;
  /**
   * List of works belong to this Circle.
   */
  works: DigestMiniCircle_works;
}
