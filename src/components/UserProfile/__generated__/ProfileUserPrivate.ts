/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvitationState, BadgeType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ProfileUserPrivate
// ====================================================

export interface ProfileUserPrivate_ownCircles_invitedBy {
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

export interface ProfileUserPrivate_ownCircles {
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
  invitedBy: ProfileUserPrivate_ownCircles_invitedBy | null;
}

export interface ProfileUserPrivate_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ProfileUserPrivate_info_cryptoWallet_nfts {
  __typename: "NFTAsset";
  id: string;
  imageUrl: string;
  imagePreviewUrl: string | null;
  name: string;
  description: string | null;
}

export interface ProfileUserPrivate_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   * NFT assets owned by this wallet address
   */
  nfts: ProfileUserPrivate_info_cryptoWallet_nfts[] | null;
}

export interface ProfileUserPrivate_info {
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
  badges: ProfileUserPrivate_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ProfileUserPrivate_info_cryptoWallet | null;
}

export interface ProfileUserPrivate_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ProfileUserPrivate {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Circles belong to current user.
   */
  ownCircles: ProfileUserPrivate_ownCircles[] | null;
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
  info: ProfileUserPrivate_info;
  /**
   * Liker info of current user
   */
  liker: ProfileUserPrivate_liker;
}
