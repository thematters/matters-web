/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionState, TransactionPurpose, TransactionCurrency, UserState, BadgeType, ArticleState, Chain } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: DigestTransaction
// ====================================================

export interface DigestTransaction_recipient_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DigestTransaction_recipient_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestTransaction_recipient_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestTransaction_recipient_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DigestTransaction_recipient_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestTransaction_recipient_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DigestTransaction_recipient_info_cryptoWallet | null;
}

export interface DigestTransaction_recipient {
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
  status: DigestTransaction_recipient_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DigestTransaction_recipient_liker;
  /**
   * User information.
   */
  info: DigestTransaction_recipient_info;
}

export interface DigestTransaction_sender_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface DigestTransaction_sender_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface DigestTransaction_sender_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface DigestTransaction_sender_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface DigestTransaction_sender_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: DigestTransaction_sender_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: DigestTransaction_sender_info_cryptoWallet | null;
}

export interface DigestTransaction_sender {
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
  status: DigestTransaction_sender_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: DigestTransaction_sender_liker;
  /**
   * User information.
   */
  info: DigestTransaction_sender_info;
}

export interface DigestTransaction_target_Transaction {
  __typename: "Transaction";
}

export interface DigestTransaction_target_Article_author {
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

export interface DigestTransaction_target_Article {
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
  author: DigestTransaction_target_Article_author;
}

export interface DigestTransaction_target_Circle {
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
}

export type DigestTransaction_target = DigestTransaction_target_Transaction | DigestTransaction_target_Article | DigestTransaction_target_Circle;

export interface DigestTransaction_blockchainTx {
  __typename: "BlockchainTransaction";
  chain: Chain;
  txHash: string;
}

export interface DigestTransaction {
  __typename: "Transaction";
  id: string;
  state: TransactionState;
  purpose: TransactionPurpose;
  amount: number;
  fee: number;
  currency: TransactionCurrency;
  /**
   * Timestamp of transaction.
   */
  createdAt: any;
  /**
   * Recipient of transaction.
   */
  recipient: DigestTransaction_recipient | null;
  /**
   * Sender of transaction.
   */
  sender: DigestTransaction_sender | null;
  /**
   * Related target article or transaction.
   */
  target: DigestTransaction_target | null;
  /**
   * Message for end user, including reason of failure.
   */
  message: string | null;
  /**
   * blockchain transaction info of USDT payment transaction
   */
  blockchainTx: DigestTransaction_blockchainTx | null;
}
