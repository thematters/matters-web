/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserFollowingCirclesPublic
// ====================================================

export interface UserFollowingCirclesPublic_user_info {
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

export interface UserFollowingCirclesPublic_user_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserFollowingCirclesPublic_user_following_circles_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface UserFollowingCirclesPublic_user_following_circles_edges_node_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface UserFollowingCirclesPublic_user_following_circles_edges_node_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface UserFollowingCirclesPublic_user_following_circles_edges_node {
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
  members: UserFollowingCirclesPublic_user_following_circles_edges_node_members;
  /**
   * List of works belong to this Circle.
   */
  works: UserFollowingCirclesPublic_user_following_circles_edges_node_works;
}

export interface UserFollowingCirclesPublic_user_following_circles_edges {
  __typename: "CircleEdge";
  cursor: string;
  node: UserFollowingCirclesPublic_user_following_circles_edges_node;
}

export interface UserFollowingCirclesPublic_user_following_circles {
  __typename: "CircleConnection";
  pageInfo: UserFollowingCirclesPublic_user_following_circles_pageInfo;
  edges: UserFollowingCirclesPublic_user_following_circles_edges[] | null;
}

export interface UserFollowingCirclesPublic_user_following {
  __typename: "Following";
  circles: UserFollowingCirclesPublic_user_following_circles;
}

export interface UserFollowingCirclesPublic_user {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User information.
   */
  info: UserFollowingCirclesPublic_user_info;
  /**
   * Status of current user.
   */
  status: UserFollowingCirclesPublic_user_status | null;
  /**
   * Following contents of this user.
   */
  following: UserFollowingCirclesPublic_user_following;
}

export interface UserFollowingCirclesPublic {
  user: UserFollowingCirclesPublic_user | null;
}

export interface UserFollowingCirclesPublicVariables {
  userName: string;
  after?: string | null;
}
