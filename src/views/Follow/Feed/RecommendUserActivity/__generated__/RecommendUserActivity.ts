/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: RecommendUserActivity
// ====================================================

export interface RecommendUserActivity_recommendUsers_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface RecommendUserActivity_recommendUsers_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: RecommendUserActivity_recommendUsers_info_badges[] | null;
}

export interface RecommendUserActivity_recommendUsers_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface RecommendUserActivity_recommendUsers_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface RecommendUserActivity_recommendUsers {
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
   * User information.
   */
  info: RecommendUserActivity_recommendUsers_info;
  /**
   * Status of current user.
   */
  status: RecommendUserActivity_recommendUsers_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: RecommendUserActivity_recommendUsers_liker;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
}

export interface RecommendUserActivity {
  __typename: "UserRecommendationActivity";
  /**
   * Recommended users
   */
  recommendUsers: RecommendUserActivity_recommendUsers[] | null;
}
