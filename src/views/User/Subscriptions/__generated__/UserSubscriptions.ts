/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserSubscriptions
// ====================================================

export interface UserSubscriptions_user_info {
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

export interface UserSubscriptions_user_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserSubscriptions_user_subscribedCircles_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface UserSubscriptions_user_subscribedCircles_edges_node_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface UserSubscriptions_user_subscribedCircles_edges_node_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface UserSubscriptions_user_subscribedCircles_edges_node {
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
  members: UserSubscriptions_user_subscribedCircles_edges_node_members;
  /**
   * List of works belong to this Circle.
   */
  works: UserSubscriptions_user_subscribedCircles_edges_node_works;
}

export interface UserSubscriptions_user_subscribedCircles_edges {
  __typename: "CircleEdge";
  node: UserSubscriptions_user_subscribedCircles_edges_node;
}

export interface UserSubscriptions_user_subscribedCircles {
  __typename: "CircleConnection";
  pageInfo: UserSubscriptions_user_subscribedCircles_pageInfo;
  edges: UserSubscriptions_user_subscribedCircles_edges[] | null;
}

export interface UserSubscriptions_user {
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
  info: UserSubscriptions_user_info;
  /**
   * Status of current user.
   */
  status: UserSubscriptions_user_status | null;
  /**
   * Circles whiches user has subscribed.
   */
  subscribedCircles: UserSubscriptions_user_subscribedCircles;
}

export interface UserSubscriptions {
  user: UserSubscriptions_user | null;
}

export interface UserSubscriptionsVariables {
  userName: string;
  after?: string | null;
}
