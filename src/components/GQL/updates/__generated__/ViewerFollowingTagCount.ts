/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewerFollowingTagCount
// ====================================================

export interface ViewerFollowingTagCount_viewer_following_tags {
  __typename: "TagConnection";
  totalCount: number;
}

export interface ViewerFollowingTagCount_viewer_following {
  __typename: "Following";
  tags: ViewerFollowingTagCount_viewer_following_tags;
}

export interface ViewerFollowingTagCount_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Following contents of this user.
   */
  following: ViewerFollowingTagCount_viewer_following;
}

export interface ViewerFollowingTagCount {
  viewer: ViewerFollowingTagCount_viewer | null;
}
