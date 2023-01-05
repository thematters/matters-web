/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleAccessType, ArticleLicenseType, UserState, BadgeType, TransactionCurrency } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SetDraftAccess
// ====================================================

export interface SetDraftAccess_putDraft_access_circle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface SetDraftAccess_putDraft_access_circle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface SetDraftAccess_putDraft_access_circle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface SetDraftAccess_putDraft_access_circle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface SetDraftAccess_putDraft_access_circle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: SetDraftAccess_putDraft_access_circle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: SetDraftAccess_putDraft_access_circle_owner_info_cryptoWallet | null;
}

export interface SetDraftAccess_putDraft_access_circle_owner {
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
  status: SetDraftAccess_putDraft_access_circle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: SetDraftAccess_putDraft_access_circle_owner_liker;
  /**
   * User information.
   */
  info: SetDraftAccess_putDraft_access_circle_owner_info;
}

export interface SetDraftAccess_putDraft_access_circle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface SetDraftAccess_putDraft_access_circle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface SetDraftAccess_putDraft_access_circle_prices {
  __typename: "Price";
  /**
   * Amount of Price.
   */
  amount: number;
  /**
   * Currency of Price.
   */
  currency: TransactionCurrency;
}

export interface SetDraftAccess_putDraft_access_circle {
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
   * Circle owner.
   */
  owner: SetDraftAccess_putDraft_access_circle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: SetDraftAccess_putDraft_access_circle_members;
  /**
   * List of works belong to this Circle.
   */
  works: SetDraftAccess_putDraft_access_circle_works;
  /**
   * Prices offered by this Circle.
   */
  prices: SetDraftAccess_putDraft_access_circle_prices[] | null;
}

export interface SetDraftAccess_putDraft_access {
  __typename: "DraftAccess";
  type: ArticleAccessType;
  circle: SetDraftAccess_putDraft_access_circle | null;
}

export interface SetDraftAccess_putDraft {
  __typename: "Draft";
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * Access related fields on circle
   */
  access: SetDraftAccess_putDraft_access;
  /**
   * License Type
   */
  license: ArticleLicenseType;
}

export interface SetDraftAccess {
  /**
   * Create or update a draft.
   */
  putDraft: SetDraftAccess_putDraft;
}

export interface SetDraftAccessVariables {
  id: string;
  circle?: string | null;
  accessType?: ArticleAccessType | null;
  license?: ArticleLicenseType | null;
}
