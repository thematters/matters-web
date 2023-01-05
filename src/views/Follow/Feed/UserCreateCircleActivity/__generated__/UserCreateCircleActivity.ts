/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: UserCreateCircleActivity
// ====================================================

export interface UserCreateCircleActivity_actor {
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
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
}

export interface UserCreateCircleActivity_nodeCircle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserCreateCircleActivity_nodeCircle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UserCreateCircleActivity_nodeCircle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UserCreateCircleActivity_nodeCircle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface UserCreateCircleActivity_nodeCircle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: UserCreateCircleActivity_nodeCircle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: UserCreateCircleActivity_nodeCircle_owner_info_cryptoWallet | null;
}

export interface UserCreateCircleActivity_nodeCircle_owner {
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
  status: UserCreateCircleActivity_nodeCircle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: UserCreateCircleActivity_nodeCircle_owner_liker;
  /**
   * User information.
   */
  info: UserCreateCircleActivity_nodeCircle_owner_info;
}

export interface UserCreateCircleActivity_nodeCircle {
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
   * Created time.
   */
  createdAt: any;
  /**
   * Circle owner.
   */
  owner: UserCreateCircleActivity_nodeCircle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
}

export interface UserCreateCircleActivity {
  __typename: "UserCreateCircleActivity";
  actor: UserCreateCircleActivity_actor;
  createdAt: any;
  /**
   * Circle created by actor
   */
  nodeCircle: UserCreateCircleActivity_nodeCircle;
}
