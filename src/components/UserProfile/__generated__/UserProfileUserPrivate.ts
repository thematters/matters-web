/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvitationState, BadgeType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserProfileUserPrivate
// ====================================================

export interface UserProfileUserPrivate_user_ownCircles_invitedBy {
  __typename: "Invitation";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Determine it's specific state.
   */
  state: InvitationState;
  /**
   * Free period of this invitation.
   */
  freePeriod: number;
}

export interface UserProfileUserPrivate_user_ownCircles {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * This value determines if current viewer is Member or not.
   */
  isMember: boolean;
  /**
   * Invitation used by current viewer.
   */
  invitedBy: UserProfileUserPrivate_user_ownCircles_invitedBy | null;
}

export interface UserProfileUserPrivate_user_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UserProfileUserPrivate_user_info_cryptoWallet_nfts {
  __typename: "NFTAsset";
  id: string;
  imageUrl: string;
  imagePreviewUrl: string | null;
  name: string;
  description: string | null;
}

export interface UserProfileUserPrivate_user_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   * NFT assets owned by this wallet address
   */
  nfts: UserProfileUserPrivate_user_info_cryptoWallet_nfts[] | null;
}

export interface UserProfileUserPrivate_user_info {
  __typename: "UserInfo";
  /**
   * Cover of profile page.
   */
  profileCover: string | null;
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: UserProfileUserPrivate_user_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: UserProfileUserPrivate_user_info_cryptoWallet | null;
}

export interface UserProfileUserPrivate_user_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UserProfileUserPrivate_user {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Circles belong to current user.
   */
  ownCircles: UserProfileUserPrivate_user_ownCircles[] | null;
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
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * User information.
   */
  info: UserProfileUserPrivate_user_info;
  /**
   * Liker info of current user
   */
  liker: UserProfileUserPrivate_user_liker;
}

export interface UserProfileUserPrivate {
  user: UserProfileUserPrivate_user | null;
}

export interface UserProfileUserPrivateVariables {
  userName: string;
}
