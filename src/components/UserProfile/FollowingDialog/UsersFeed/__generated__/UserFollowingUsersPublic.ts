/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserFollowingUsersPublic
// ====================================================

export interface UserFollowingUsersPublic_user_info {
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

export interface UserFollowingUsersPublic_user_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserFollowingUsersPublic_user_following_users_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface UserFollowingUsersPublic_user_following_users_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UserFollowingUsersPublic_user_following_users_edges_node_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface UserFollowingUsersPublic_user_following_users_edges_node_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: UserFollowingUsersPublic_user_following_users_edges_node_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: UserFollowingUsersPublic_user_following_users_edges_node_info_cryptoWallet | null;
}

export interface UserFollowingUsersPublic_user_following_users_edges_node_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserFollowingUsersPublic_user_following_users_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UserFollowingUsersPublic_user_following_users_edges_node {
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
  info: UserFollowingUsersPublic_user_following_users_edges_node_info;
  /**
   * Status of current user.
   */
  status: UserFollowingUsersPublic_user_following_users_edges_node_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: UserFollowingUsersPublic_user_following_users_edges_node_liker;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface UserFollowingUsersPublic_user_following_users_edges {
  __typename: "UserEdge";
  cursor: string;
  node: UserFollowingUsersPublic_user_following_users_edges_node;
}

export interface UserFollowingUsersPublic_user_following_users {
  __typename: "UserConnection";
  pageInfo: UserFollowingUsersPublic_user_following_users_pageInfo;
  edges: UserFollowingUsersPublic_user_following_users_edges[] | null;
}

export interface UserFollowingUsersPublic_user_following {
  __typename: "Following";
  users: UserFollowingUsersPublic_user_following_users;
}

export interface UserFollowingUsersPublic_user {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User information.
   */
  info: UserFollowingUsersPublic_user_info;
  /**
   * Status of current user.
   */
  status: UserFollowingUsersPublic_user_status | null;
  /**
   * Following contents of this user.
   */
  following: UserFollowingUsersPublic_user_following;
}

export interface UserFollowingUsersPublic {
  user: UserFollowingUsersPublic_user | null;
}

export interface UserFollowingUsersPublicVariables {
  userName: string;
  after?: string | null;
}
