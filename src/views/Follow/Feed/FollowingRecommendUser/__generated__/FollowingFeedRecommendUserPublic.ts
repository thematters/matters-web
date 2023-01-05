/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FollowingFeedRecommendUserPublic
// ====================================================

export interface FollowingFeedRecommendUserPublic_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FollowingFeedRecommendUserPublic_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: FollowingFeedRecommendUserPublic_info_badges[] | null;
}

export interface FollowingFeedRecommendUserPublic_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface FollowingFeedRecommendUserPublic_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FollowingFeedRecommendUserPublic {
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
  info: FollowingFeedRecommendUserPublic_info;
  /**
   * Status of current user.
   */
  status: FollowingFeedRecommendUserPublic_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: FollowingFeedRecommendUserPublic_liker;
}
