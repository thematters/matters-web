/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserTagsPublic
// ====================================================

export interface UserTagsPublic_user_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * Cover of profile page.
   */
  profileCover: string | null;
}

export interface UserTagsPublic_user_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserTagsPublic_user_subscribedCircles {
  __typename: "CircleConnection";
  totalCount: number;
}

export interface UserTagsPublic_user_maintainedTags_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface UserTagsPublic_user_maintainedTags_edges_node {
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
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
}

export interface UserTagsPublic_user_maintainedTags_edges {
  __typename: "TagEdge";
  cursor: string;
  node: UserTagsPublic_user_maintainedTags_edges_node;
}

export interface UserTagsPublic_user_maintainedTags {
  __typename: "TagConnection";
  pageInfo: UserTagsPublic_user_maintainedTags_pageInfo;
  edges: UserTagsPublic_user_maintainedTags_edges[] | null;
}

export interface UserTagsPublic_user {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * User information.
   */
  info: UserTagsPublic_user_info;
  /**
   * Status of current user.
   */
  status: UserTagsPublic_user_status | null;
  /**
   * Circles whiches user has subscribed.
   */
  subscribedCircles: UserTagsPublic_user_subscribedCircles;
  /**
   * Tags owned and maintained by current user.
   */
  maintainedTags: UserTagsPublic_user_maintainedTags;
}

export interface UserTagsPublic {
  user: UserTagsPublic_user | null;
}

export interface UserTagsPublicVariables {
  userName: string;
  after?: string | null;
}
