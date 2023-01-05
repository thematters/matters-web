/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, UserGroup, BadgeType, UserLanguage, QuoteCurrency, FeatureName } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: RootQueryPrivate
// ====================================================

export interface RootQueryPrivate_viewer_liker {
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

export interface RootQueryPrivate_viewer_status {
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

export interface RootQueryPrivate_viewer_ownCircles {
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

export interface RootQueryPrivate_viewer_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface RootQueryPrivate_viewer_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface RootQueryPrivate_viewer_info {
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
  badges: RootQueryPrivate_viewer_info_badges[] | null;
  /**
   * Login address
   */
  ethAddress: string | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: RootQueryPrivate_viewer_info_cryptoWallet | null;
  isWalletAuth: boolean;
}

export interface RootQueryPrivate_viewer_settings {
  __typename: "UserSettings";
  /**
   * User language setting.
   */
  language: UserLanguage;
  /**
   * User currency preference.
   */
  currency: QuoteCurrency;
}

export interface RootQueryPrivate_viewer_following_users {
  __typename: "UserConnection";
  totalCount: number;
}

export interface RootQueryPrivate_viewer_following_tags {
  __typename: "TagConnection";
  totalCount: number;
}

export interface RootQueryPrivate_viewer_following {
  __typename: "Following";
  users: RootQueryPrivate_viewer_following_users;
  tags: RootQueryPrivate_viewer_following_tags;
}

export interface RootQueryPrivate_viewer_followers {
  __typename: "UserConnection";
  totalCount: number;
}

export interface RootQueryPrivate_viewer_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface RootQueryPrivate_viewer {
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
  liker: RootQueryPrivate_viewer_liker;
  /**
   * Status of current user.
   */
  status: RootQueryPrivate_viewer_status | null;
  /**
   * Circles belong to current user.
   */
  ownCircles: RootQueryPrivate_viewer_ownCircles[] | null;
  /**
   * User information.
   */
  info: RootQueryPrivate_viewer_info;
  /**
   * User settings.
   */
  settings: RootQueryPrivate_viewer_settings;
  /**
   * Following contents of this user.
   */
  following: RootQueryPrivate_viewer_following;
  /**
   * Followers of this user.
   */
  followers: RootQueryPrivate_viewer_followers;
  /**
   * Articles authored by current user.
   */
  articles: RootQueryPrivate_viewer_articles;
}

export interface RootQueryPrivate_official_features {
  __typename: "Feature";
  name: FeatureName;
  enabled: boolean;
}

export interface RootQueryPrivate_official {
  __typename: "Official";
  /**
   * Feature flag
   */
  features: RootQueryPrivate_official_features[];
}

export interface RootQueryPrivate {
  viewer: RootQueryPrivate_viewer | null;
  official: RootQueryPrivate_official;
}
