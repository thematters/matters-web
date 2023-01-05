/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType, UserState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: UserNewFollowerNotice
// ====================================================

export interface UserNewFollowerNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UserNewFollowerNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UserNewFollowerNotice_actors_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface UserNewFollowerNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: UserNewFollowerNotice_actors_info_badges[] | null;
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: UserNewFollowerNotice_actors_info_cryptoWallet | null;
}

export interface UserNewFollowerNotice_actors_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserNewFollowerNotice_actors {
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
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: UserNewFollowerNotice_actors_liker;
  /**
   * User information.
   */
  info: UserNewFollowerNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * Status of current user.
   */
  status: UserNewFollowerNotice_actors_status | null;
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

export interface UserNewFollowerNotice {
  __typename: "UserNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * List of notice actors.
   */
  actors: UserNewFollowerNotice_actors[] | null;
}
