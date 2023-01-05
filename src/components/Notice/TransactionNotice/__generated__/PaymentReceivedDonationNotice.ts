/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType, TransactionCurrency, ArticleState, UserState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: PaymentReceivedDonationNotice
// ====================================================

export interface PaymentReceivedDonationNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface PaymentReceivedDonationNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface PaymentReceivedDonationNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: PaymentReceivedDonationNotice_actors_info_badges[] | null;
}

export interface PaymentReceivedDonationNotice_actors {
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
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: PaymentReceivedDonationNotice_actors_liker;
  /**
   * User information.
   */
  info: PaymentReceivedDonationNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface PaymentReceivedDonationNotice_tx_target_Circle {
  __typename: "Circle" | "Transaction";
}

export interface PaymentReceivedDonationNotice_tx_target_Article_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface PaymentReceivedDonationNotice_tx_target_Article_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface PaymentReceivedDonationNotice_tx_target_Article_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface PaymentReceivedDonationNotice_tx_target_Article_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface PaymentReceivedDonationNotice_tx_target_Article_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: PaymentReceivedDonationNotice_tx_target_Article_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: PaymentReceivedDonationNotice_tx_target_Article_author_info_cryptoWallet | null;
}

export interface PaymentReceivedDonationNotice_tx_target_Article_author {
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
  status: PaymentReceivedDonationNotice_tx_target_Article_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: PaymentReceivedDonationNotice_tx_target_Article_author_liker;
  /**
   * User information.
   */
  info: PaymentReceivedDonationNotice_tx_target_Article_author_info;
}

export interface PaymentReceivedDonationNotice_tx_target_Article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * Article title.
   */
  title: string;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Article cover's link.
   */
  cover: string | null;
  /**
   * Author of this article.
   */
  author: PaymentReceivedDonationNotice_tx_target_Article_author;
}

export type PaymentReceivedDonationNotice_tx_target = PaymentReceivedDonationNotice_tx_target_Circle | PaymentReceivedDonationNotice_tx_target_Article;

export interface PaymentReceivedDonationNotice_tx {
  __typename: "Transaction";
  id: string;
  amount: number;
  currency: TransactionCurrency;
  /**
   * Related target article or transaction.
   */
  target: PaymentReceivedDonationNotice_tx_target | null;
}

export interface PaymentReceivedDonationNotice {
  __typename: "TransactionNotice";
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
  actors: PaymentReceivedDonationNotice_actors[] | null;
  tx: PaymentReceivedDonationNotice_tx;
}
