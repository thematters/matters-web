/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, TransactionCurrency } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CircleInvitationNotice
// ====================================================

export interface CircleInvitationNotice_actors {
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

export interface CircleInvitationNotice_circle_invitedBy {
  __typename: "Invitation";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Free period of this invitation.
   */
  freePeriod: number;
}

export interface CircleInvitationNotice_circle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface CircleInvitationNotice_circle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CircleInvitationNotice_circle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CircleInvitationNotice_circle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface CircleInvitationNotice_circle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: CircleInvitationNotice_circle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: CircleInvitationNotice_circle_owner_info_cryptoWallet | null;
}

export interface CircleInvitationNotice_circle_owner {
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
  status: CircleInvitationNotice_circle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: CircleInvitationNotice_circle_owner_liker;
  /**
   * User information.
   */
  info: CircleInvitationNotice_circle_owner_info;
}

export interface CircleInvitationNotice_circle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface CircleInvitationNotice_circle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface CircleInvitationNotice_circle_prices {
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

export interface CircleInvitationNotice_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Invitation used by current viewer.
   */
  invitedBy: CircleInvitationNotice_circle_invitedBy | null;
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
  owner: CircleInvitationNotice_circle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: CircleInvitationNotice_circle_members;
  /**
   * List of works belong to this Circle.
   */
  works: CircleInvitationNotice_circle_works;
  /**
   * Prices offered by this Circle.
   */
  prices: CircleInvitationNotice_circle_prices[] | null;
}

export interface CircleInvitationNotice {
  __typename: "CircleNotice";
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
  actors: CircleInvitationNotice_actors[] | null;
  circle: CircleInvitationNotice_circle;
}
