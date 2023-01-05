/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateTagSettingInput, BadgeType, UserState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTagSetting
// ====================================================

export interface UpdateTagSetting_updateTagSetting_editors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UpdateTagSetting_updateTagSetting_editors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UpdateTagSetting_updateTagSetting_editors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: UpdateTagSetting_updateTagSetting_editors_info_badges[] | null;
}

export interface UpdateTagSetting_updateTagSetting_editors {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: UpdateTagSetting_updateTagSetting_editors_liker;
  /**
   * User information.
   */
  info: UpdateTagSetting_updateTagSetting_editors_info;
}

export interface UpdateTagSetting_updateTagSetting_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UpdateTagSetting_updateTagSetting_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UpdateTagSetting_updateTagSetting_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UpdateTagSetting_updateTagSetting_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: UpdateTagSetting_updateTagSetting_owner_info_badges[] | null;
}

export interface UpdateTagSetting_updateTagSetting_owner {
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
   * Status of current user.
   */
  status: UpdateTagSetting_updateTagSetting_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: UpdateTagSetting_updateTagSetting_owner_liker;
  /**
   * User information.
   */
  info: UpdateTagSetting_updateTagSetting_owner_info;
}

export interface UpdateTagSetting_updateTagSetting_followers_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UpdateTagSetting_updateTagSetting_followers_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UpdateTagSetting_updateTagSetting_followers_edges_node_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: UpdateTagSetting_updateTagSetting_followers_edges_node_info_badges[] | null;
}

export interface UpdateTagSetting_updateTagSetting_followers_edges_node {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: UpdateTagSetting_updateTagSetting_followers_edges_node_liker;
  /**
   * User information.
   */
  info: UpdateTagSetting_updateTagSetting_followers_edges_node_info;
}

export interface UpdateTagSetting_updateTagSetting_followers_edges {
  __typename: "UserEdge";
  cursor: string;
  node: UpdateTagSetting_updateTagSetting_followers_edges_node;
}

export interface UpdateTagSetting_updateTagSetting_followers {
  __typename: "UserConnection";
  totalCount: number;
  edges: UpdateTagSetting_updateTagSetting_followers_edges[] | null;
}

export interface UpdateTagSetting_updateTagSetting {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Editors of this tag.
   */
  editors: UpdateTagSetting_updateTagSetting_editors[] | null;
  /**
   * Owner of this tag.
   */
  owner: UpdateTagSetting_updateTagSetting_owner | null;
  /**
   * Followers of this tag.
   */
  followers: UpdateTagSetting_updateTagSetting_followers;
}

export interface UpdateTagSetting {
  /**
   * Update member, permission and othters of a tag.
   */
  updateTagSetting: UpdateTagSetting_updateTagSetting;
}

export interface UpdateTagSettingVariables {
  input: UpdateTagSettingInput;
}
