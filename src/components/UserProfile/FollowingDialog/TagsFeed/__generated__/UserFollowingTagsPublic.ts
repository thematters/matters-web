/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserFollowingTagsPublic
// ====================================================

export interface UserFollowingTagsPublic_user_info {
  __typename: "UserInfo";
  /**
   * Cover of profile page.
   */
  profileCover: string | null;
  /**
   * User desciption.
   */
  description: string | null;
}

export interface UserFollowingTagsPublic_user_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserFollowingTagsPublic_user_following_tags_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface UserFollowingTagsPublic_user_following_tags_edges_node {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * Description of this tag.
   */
  description: string | null;
  /**
   * This value determines if current viewer is following or not.
   */
  isFollower: boolean | null;
}

export interface UserFollowingTagsPublic_user_following_tags_edges {
  __typename: "TagEdge";
  cursor: string;
  node: UserFollowingTagsPublic_user_following_tags_edges_node;
}

export interface UserFollowingTagsPublic_user_following_tags {
  __typename: "TagConnection";
  pageInfo: UserFollowingTagsPublic_user_following_tags_pageInfo;
  edges: UserFollowingTagsPublic_user_following_tags_edges[] | null;
}

export interface UserFollowingTagsPublic_user_following {
  __typename: "Following";
  tags: UserFollowingTagsPublic_user_following_tags;
}

export interface UserFollowingTagsPublic_user {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User information.
   */
  info: UserFollowingTagsPublic_user_info;
  /**
   * Status of current user.
   */
  status: UserFollowingTagsPublic_user_status | null;
  /**
   * Following contents of this user.
   */
  following: UserFollowingTagsPublic_user_following;
}

export interface UserFollowingTagsPublic {
  user: UserFollowingTagsPublic_user | null;
}

export interface UserFollowingTagsPublicVariables {
  userName: string;
  after?: string | null;
}
