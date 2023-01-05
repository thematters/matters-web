/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: DonationButtonArticle
// ====================================================

export interface DonationButtonArticle_donationsToolbar {
  __typename: "UserConnection";
  totalCount: number;
}

export interface DonationButtonArticle_author_liker {
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

export interface DonationButtonArticle_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DonationButtonArticle_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DonationButtonArticle_author_info {
  __typename: "UserInfo";
  /**
   * Login address
   */
  ethAddress: string | null;
  /**
   * User badges.
   */
  badges: DonationButtonArticle_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DonationButtonArticle_author_info_cryptoWallet | null;
}

export interface DonationButtonArticle_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DonationButtonArticle_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Liker info of current user
   */
  liker: DonationButtonArticle_author_liker;
  /**
   * User information.
   */
  info: DonationButtonArticle_author_info;
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
  status: DonationButtonArticle_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
}

export interface DonationButtonArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Transactions history of this article.
   */
  donationsToolbar: DonationButtonArticle_donationsToolbar;
  /**
   * Author of this article.
   */
  author: DonationButtonArticle_author;
}
