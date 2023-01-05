/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, UserGroup, BadgeType, UserLanguage, FeatureName } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: RootQueryPublic
// ====================================================

export interface RootQueryPublic_viewer_liker {
  __typename: "Liker";
  /**
   * Liker ID of LikeCoin
   */
  likerId: string | null;
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface RootQueryPublic_viewer_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
  /**
   * Number of unread notices.
   */
  unreadNoticeCount: number;
  /**
   * Whether user already set payment password.
   */
  hasPaymentPassword: boolean;
}

export interface RootQueryPublic_viewer_ownCircles {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Slugified name of this Circle.
   */
  name: string;
}

export interface RootQueryPublic_viewer_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface RootQueryPublic_viewer_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface RootQueryPublic_viewer_info {
  __typename: "UserInfo";
  /**
   * Timestamp of registration.
   */
  createdAt: any | null;
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User email.
   */
  email: any | null;
  /**
   * Timestamp of user agreement.
   */
  agreeOn: any | null;
  /**
   * Is user name editable.
   */
  userNameEditable: boolean;
  /**
   * Type of group.
   */
  group: UserGroup;
  /**
   * User badges.
   */
  badges: RootQueryPublic_viewer_info_badges[] | null;
  /**
   * Login address
   */
  ethAddress: string | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: RootQueryPublic_viewer_info_cryptoWallet | null;
  isWalletAuth: boolean;
}

export interface RootQueryPublic_viewer_settings {
  __typename: "UserSettings";
  /**
   * User language setting.
   */
  language: UserLanguage;
}

export interface RootQueryPublic_viewer_following_users {
  __typename: "UserConnection";
  totalCount: number;
}

export interface RootQueryPublic_viewer_following_tags {
  __typename: "TagConnection";
  totalCount: number;
}

export interface RootQueryPublic_viewer_following {
  __typename: "Following";
  users: RootQueryPublic_viewer_following_users;
  tags: RootQueryPublic_viewer_following_tags;
}

export interface RootQueryPublic_viewer_followers {
  __typename: "UserConnection";
  totalCount: number;
}

export interface RootQueryPublic_viewer {
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
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Payment pointer that resolves to Open Payments endpoints
   */
  paymentPointer: string | null;
  /**
   * Liker info of current user
   */
  liker: RootQueryPublic_viewer_liker;
  /**
   * Status of current user.
   */
  status: RootQueryPublic_viewer_status | null;
  /**
   * Circles belong to current user.
   */
  ownCircles: RootQueryPublic_viewer_ownCircles[] | null;
  /**
   * User information.
   */
  info: RootQueryPublic_viewer_info;
  /**
   * User settings.
   */
  settings: RootQueryPublic_viewer_settings;
  /**
   * Following contents of this user.
   */
  following: RootQueryPublic_viewer_following;
  /**
   * Followers of this user.
   */
  followers: RootQueryPublic_viewer_followers;
}

export interface RootQueryPublic_official_features {
  __typename: "Feature";
  name: FeatureName;
  enabled: boolean;
}

export interface RootQueryPublic_official {
  __typename: "Official";
  /**
   * Feature flag
   */
  features: RootQueryPublic_official_features[];
}

export interface RootQueryPublic {
  viewer: RootQueryPublic_viewer | null;
  official: RootQueryPublic_official;
}
