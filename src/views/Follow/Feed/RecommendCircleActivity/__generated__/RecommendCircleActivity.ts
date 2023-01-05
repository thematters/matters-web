/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType, TransactionCurrency, InvitationState } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: RecommendCircleActivity
// ====================================================

export interface RecommendCircleActivity_recommendCircles_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface RecommendCircleActivity_recommendCircles_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface RecommendCircleActivity_recommendCircles_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface RecommendCircleActivity_recommendCircles_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface RecommendCircleActivity_recommendCircles_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: RecommendCircleActivity_recommendCircles_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: RecommendCircleActivity_recommendCircles_owner_info_cryptoWallet | null;
}

export interface RecommendCircleActivity_recommendCircles_owner {
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
  status: RecommendCircleActivity_recommendCircles_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: RecommendCircleActivity_recommendCircles_owner_liker;
  /**
   * User information.
   */
  info: RecommendCircleActivity_recommendCircles_owner_info;
}

export interface RecommendCircleActivity_recommendCircles_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface RecommendCircleActivity_recommendCircles_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface RecommendCircleActivity_recommendCircles_prices {
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

export interface RecommendCircleActivity_recommendCircles_invitedBy {
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

export interface RecommendCircleActivity_recommendCircles {
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
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * Circle owner.
   */
  owner: RecommendCircleActivity_recommendCircles_owner;
  /**
   * List of Circle member.
   */
  members: RecommendCircleActivity_recommendCircles_members;
  /**
   * List of works belong to this Circle.
   */
  works: RecommendCircleActivity_recommendCircles_works;
  /**
   * Prices offered by this Circle.
   */
  prices: RecommendCircleActivity_recommendCircles_prices[] | null;
  /**
   * This value determines if current viewer is Member or not.
   */
  isMember: boolean;
  /**
   * Invitation used by current viewer.
   */
  invitedBy: RecommendCircleActivity_recommendCircles_invitedBy | null;
}

export interface RecommendCircleActivity {
  __typename: "CircleRecommendationActivity";
  /**
   * Recommended circles
   */
  recommendCircles: RecommendCircleActivity_recommendCircles[] | null;
}
