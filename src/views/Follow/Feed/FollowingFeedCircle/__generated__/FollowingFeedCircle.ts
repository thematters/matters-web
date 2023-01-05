/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FollowingFeedCircle
// ====================================================

export interface FollowingFeedCircle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface FollowingFeedCircle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FollowingFeedCircle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FollowingFeedCircle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface FollowingFeedCircle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: FollowingFeedCircle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: FollowingFeedCircle_owner_info_cryptoWallet | null;
}

export interface FollowingFeedCircle_owner {
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
  status: FollowingFeedCircle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: FollowingFeedCircle_owner_liker;
  /**
   * User information.
   */
  info: FollowingFeedCircle_owner_info;
}

export interface FollowingFeedCircle {
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
  owner: FollowingFeedCircle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
}
