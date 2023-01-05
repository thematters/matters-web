/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppreciationPurpose, UserState, BadgeType, ArticleState } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: DigestAppreciation
// ====================================================

export interface DigestAppreciation_sender_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DigestAppreciation_sender_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestAppreciation_sender_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestAppreciation_sender_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DigestAppreciation_sender_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestAppreciation_sender_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DigestAppreciation_sender_info_cryptoWallet | null;
}

export interface DigestAppreciation_sender {
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
  status: DigestAppreciation_sender_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DigestAppreciation_sender_liker;
  /**
   * User information.
   */
  info: DigestAppreciation_sender_info;
}

export interface DigestAppreciation_recipient_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DigestAppreciation_recipient_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestAppreciation_recipient_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestAppreciation_recipient_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DigestAppreciation_recipient_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestAppreciation_recipient_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DigestAppreciation_recipient_info_cryptoWallet | null;
}

export interface DigestAppreciation_recipient {
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
  status: DigestAppreciation_recipient_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DigestAppreciation_recipient_liker;
  /**
   * User information.
   */
  info: DigestAppreciation_recipient_info;
}

export interface DigestAppreciation_target_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface DigestAppreciation_target {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Article title.
   */
  title: string;
  /**
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Author of this article.
   */
  author: DigestAppreciation_target_author;
}

export interface DigestAppreciation {
  __typename: "Appreciation";
  amount: number;
  purpose: AppreciationPurpose;
  content: string;
  /**
   * Sender of appreciation.
   */
  sender: DigestAppreciation_sender | null;
  /**
   * Recipient of appreciation.
   */
  recipient: DigestAppreciation_recipient;
  /**
   * Object that appreciation is meant for.
   */
  target: DigestAppreciation_target | null;
}
