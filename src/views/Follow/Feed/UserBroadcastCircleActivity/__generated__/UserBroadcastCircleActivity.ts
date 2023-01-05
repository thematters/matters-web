/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CommentState, UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: UserBroadcastCircleActivity
// ====================================================

export interface UserBroadcastCircleActivity_actor {
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
}

export interface UserBroadcastCircleActivity_nodeComment_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface UserBroadcastCircleActivity_nodeComment {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * Time of this comment was created.
   */
  createdAt: any;
  /**
   * Content of this comment.
   */
  content: string | null;
  /**
   * State of this comment.
   */
  state: CommentState;
  /**
   * Author of this comment.
   */
  author: UserBroadcastCircleActivity_nodeComment_author;
}

export interface UserBroadcastCircleActivity_targetCircle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserBroadcastCircleActivity_targetCircle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UserBroadcastCircleActivity_targetCircle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UserBroadcastCircleActivity_targetCircle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface UserBroadcastCircleActivity_targetCircle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: UserBroadcastCircleActivity_targetCircle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: UserBroadcastCircleActivity_targetCircle_owner_info_cryptoWallet | null;
}

export interface UserBroadcastCircleActivity_targetCircle_owner {
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
  status: UserBroadcastCircleActivity_targetCircle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: UserBroadcastCircleActivity_targetCircle_owner_liker;
  /**
   * User information.
   */
  info: UserBroadcastCircleActivity_targetCircle_owner_info;
}

export interface UserBroadcastCircleActivity_targetCircle {
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
  owner: UserBroadcastCircleActivity_targetCircle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * This value determines if current viewer is following Circle or not.
   */
  isFollower: boolean;
}

export interface UserBroadcastCircleActivity {
  __typename: "UserBroadcastCircleActivity";
  actor: UserBroadcastCircleActivity_actor;
  createdAt: any;
  /**
   * Comment broadcast by actor
   */
  nodeComment: UserBroadcastCircleActivity_nodeComment;
  /**
   * Circle that comment belongs to
   */
  targetCircle: UserBroadcastCircleActivity_targetCircle;
}
