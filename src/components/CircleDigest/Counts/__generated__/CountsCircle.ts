/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CountsCircle
// ====================================================

export interface CountsCircle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface CountsCircle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface CountsCircle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * List of Circle member.
   */
  members: CountsCircle_members;
  /**
   * List of works belong to this Circle.
   */
  works: CountsCircle_works;
}
