/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, UserGroup, BadgeType, UserLanguage } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ViewerUserPublic
// ====================================================

export interface ViewerUserPublic_liker {
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

export interface ViewerUserPublic_status {
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

export interface ViewerUserPublic_ownCircles {
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

export interface ViewerUserPublic_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ViewerUserPublic_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ViewerUserPublic_info {
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
  badges: ViewerUserPublic_info_badges[] | null;
  /**
   * Login address
   */
  ethAddress: string | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ViewerUserPublic_info_cryptoWallet | null;
  isWalletAuth: boolean;
}

export interface ViewerUserPublic_settings {
  __typename: "UserSettings";
  /**
   * User language setting.
   */
  language: UserLanguage;
}

export interface ViewerUserPublic_following_users {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ViewerUserPublic_following_tags {
  __typename: "TagConnection";
  totalCount: number;
}

export interface ViewerUserPublic_following {
  __typename: "Following";
  users: ViewerUserPublic_following_users;
  tags: ViewerUserPublic_following_tags;
}

export interface ViewerUserPublic_followers {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ViewerUserPublic {
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
  liker: ViewerUserPublic_liker;
  /**
   * Status of current user.
   */
  status: ViewerUserPublic_status | null;
  /**
   * Circles belong to current user.
   */
  ownCircles: ViewerUserPublic_ownCircles[] | null;
  /**
   * User information.
   */
  info: ViewerUserPublic_info;
  /**
   * User settings.
   */
  settings: ViewerUserPublic_settings;
  /**
   * Following contents of this user.
   */
  following: ViewerUserPublic_following;
  /**
   * Followers of this user.
   */
  followers: ViewerUserPublic_followers;
}
