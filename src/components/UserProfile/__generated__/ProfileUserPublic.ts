/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType, UserState, TransactionCurrency } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ProfileUserPublic
// ====================================================

export interface ProfileUserPublic_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ProfileUserPublic_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ProfileUserPublic_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ProfileUserPublic_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ProfileUserPublic_info_badges[] | null;
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * Cover of profile page.
   */
  profileCover: string | null;
  /**
   * Login address
   */
  ethAddress: string | null;
  /**
   * the ipnsKey (`ipfs.io/ipns/<ipnsKey>/...`) for feed.json / rss.xml / index
   */
  ipnsKey: string | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ProfileUserPublic_info_cryptoWallet | null;
}

export interface ProfileUserPublic_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface ProfileUserPublic_following_users {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ProfileUserPublic_following {
  __typename: "Following";
  users: ProfileUserPublic_following_users;
}

export interface ProfileUserPublic_followers {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ProfileUserPublic_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ProfileUserPublic_ownCircles_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ProfileUserPublic_ownCircles_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ProfileUserPublic_ownCircles_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ProfileUserPublic_ownCircles_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ProfileUserPublic_ownCircles_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ProfileUserPublic_ownCircles_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ProfileUserPublic_ownCircles_owner_info_cryptoWallet | null;
}

export interface ProfileUserPublic_ownCircles_owner {
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
  status: ProfileUserPublic_ownCircles_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ProfileUserPublic_ownCircles_owner_liker;
  /**
   * User information.
   */
  info: ProfileUserPublic_ownCircles_owner_info;
}

export interface ProfileUserPublic_ownCircles_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface ProfileUserPublic_ownCircles_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface ProfileUserPublic_ownCircles_prices {
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

export interface ProfileUserPublic_ownCircles {
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
  owner: ProfileUserPublic_ownCircles_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: ProfileUserPublic_ownCircles_members;
  /**
   * List of works belong to this Circle.
   */
  works: ProfileUserPublic_ownCircles_works;
  /**
   * Prices offered by this Circle.
   */
  prices: ProfileUserPublic_ownCircles_prices[] | null;
}

export interface ProfileUserPublic {
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
   * Liker info of current user
   */
  liker: ProfileUserPublic_liker;
  /**
   * User information.
   */
  info: ProfileUserPublic_info;
  /**
   * Articles authored by current user.
   */
  articles: ProfileUserPublic_articles;
  /**
   * Following contents of this user.
   */
  following: ProfileUserPublic_following;
  /**
   * Followers of this user.
   */
  followers: ProfileUserPublic_followers;
  /**
   * Status of current user.
   */
  status: ProfileUserPublic_status | null;
  /**
   * Circles belong to current user.
   */
  ownCircles: ProfileUserPublic_ownCircles[] | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
}
