/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionNoticeType, TransactionCurrency, BadgeType, ArticleState, UserState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: TransactionNotice
// ====================================================

export interface TransactionNotice_tx_target_Circle {
  __typename: "Circle" | "Transaction";
}

export interface TransactionNotice_tx_target_Article_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface TransactionNotice_tx_target_Article_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface TransactionNotice_tx_target_Article_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface TransactionNotice_tx_target_Article_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface TransactionNotice_tx_target_Article_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: TransactionNotice_tx_target_Article_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: TransactionNotice_tx_target_Article_author_info_cryptoWallet | null;
}

export interface TransactionNotice_tx_target_Article_author {
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
  status: TransactionNotice_tx_target_Article_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: TransactionNotice_tx_target_Article_author_liker;
  /**
   * User information.
   */
  info: TransactionNotice_tx_target_Article_author_info;
}

export interface TransactionNotice_tx_target_Article {
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
  author: TransactionNotice_tx_target_Article_author;
}

export type TransactionNotice_tx_target = TransactionNotice_tx_target_Circle | TransactionNotice_tx_target_Article;

export interface TransactionNotice_tx {
  __typename: "Transaction";
  id: string;
  amount: number;
  currency: TransactionCurrency;
  /**
   * Related target article or transaction.
   */
  target: TransactionNotice_tx_target | null;
}

export interface TransactionNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface TransactionNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface TransactionNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: TransactionNotice_actors_info_badges[] | null;
}

export interface TransactionNotice_actors {
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
  liker: TransactionNotice_actors_liker;
  /**
   * User information.
   */
  info: TransactionNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface TransactionNotice {
  __typename: "TransactionNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  txNoticeType: TransactionNoticeType;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  tx: TransactionNotice_tx;
  /**
   * List of notice actors.
   */
  actors: TransactionNotice_actors[] | null;
}
