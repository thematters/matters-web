/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleFollowTag
// ====================================================

export interface ToggleFollowTag_toggleFollowTag {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * This value determines if current viewer is following or not.
   */
  isFollower: boolean | null;
}

export interface ToggleFollowTag {
  /**
   * Follow or unfollow tag.
   */
  toggleFollowTag: ToggleFollowTag_toggleFollowTag;
}

export interface ToggleFollowTagVariables {
  id: string;
  enabled?: boolean | null;
}
