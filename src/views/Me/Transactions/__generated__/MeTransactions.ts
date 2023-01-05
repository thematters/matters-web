/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionPurpose, TransactionCurrency, TransactionState, UserState, BadgeType, ArticleState, Chain } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MeTransactions
// ====================================================

export interface MeTransactions_viewer_wallet_transactions_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface MeTransactions_viewer_wallet_transactions_edges_node_recipient_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface MeTransactions_viewer_wallet_transactions_edges_node_recipient_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeTransactions_viewer_wallet_transactions_edges_node_recipient_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeTransactions_viewer_wallet_transactions_edges_node_recipient_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface MeTransactions_viewer_wallet_transactions_edges_node_recipient_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeTransactions_viewer_wallet_transactions_edges_node_recipient_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: MeTransactions_viewer_wallet_transactions_edges_node_recipient_info_cryptoWallet | null;
}

export interface MeTransactions_viewer_wallet_transactions_edges_node_recipient {
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
  status: MeTransactions_viewer_wallet_transactions_edges_node_recipient_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: MeTransactions_viewer_wallet_transactions_edges_node_recipient_liker;
  /**
   * User information.
   */
  info: MeTransactions_viewer_wallet_transactions_edges_node_recipient_info;
}

export interface MeTransactions_viewer_wallet_transactions_edges_node_sender_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface MeTransactions_viewer_wallet_transactions_edges_node_sender_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface MeTransactions_viewer_wallet_transactions_edges_node_sender_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface MeTransactions_viewer_wallet_transactions_edges_node_sender_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface MeTransactions_viewer_wallet_transactions_edges_node_sender_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: MeTransactions_viewer_wallet_transactions_edges_node_sender_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: MeTransactions_viewer_wallet_transactions_edges_node_sender_info_cryptoWallet | null;
}

export interface MeTransactions_viewer_wallet_transactions_edges_node_sender {
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
  status: MeTransactions_viewer_wallet_transactions_edges_node_sender_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: MeTransactions_viewer_wallet_transactions_edges_node_sender_liker;
  /**
   * User information.
   */
  info: MeTransactions_viewer_wallet_transactions_edges_node_sender_info;
}

export interface MeTransactions_viewer_wallet_transactions_edges_node_target_Transaction {
  __typename: "Transaction";
}

export interface MeTransactions_viewer_wallet_transactions_edges_node_target_Article_author {
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

export interface MeTransactions_viewer_wallet_transactions_edges_node_target_Article {
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
  author: MeTransactions_viewer_wallet_transactions_edges_node_target_Article_author;
}

export interface MeTransactions_viewer_wallet_transactions_edges_node_target_Circle {
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

export type MeTransactions_viewer_wallet_transactions_edges_node_target = MeTransactions_viewer_wallet_transactions_edges_node_target_Transaction | MeTransactions_viewer_wallet_transactions_edges_node_target_Article | MeTransactions_viewer_wallet_transactions_edges_node_target_Circle;

export interface MeTransactions_viewer_wallet_transactions_edges_node_blockchainTx {
  __typename: "BlockchainTransaction";
  chain: Chain;
  txHash: string;
}

export interface MeTransactions_viewer_wallet_transactions_edges_node {
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
  recipient: MeTransactions_viewer_wallet_transactions_edges_node_recipient | null;
  /**
   * Sender of transaction.
   */
  sender: MeTransactions_viewer_wallet_transactions_edges_node_sender | null;
  /**
   * Related target article or transaction.
   */
  target: MeTransactions_viewer_wallet_transactions_edges_node_target | null;
  /**
   * Message for end user, including reason of failure.
   */
  message: string | null;
  /**
   * blockchain transaction info of USDT payment transaction
   */
  blockchainTx: MeTransactions_viewer_wallet_transactions_edges_node_blockchainTx | null;
}

export interface MeTransactions_viewer_wallet_transactions_edges {
  __typename: "TransactionEdge";
  cursor: string;
  node: MeTransactions_viewer_wallet_transactions_edges_node;
}

export interface MeTransactions_viewer_wallet_transactions {
  __typename: "TransactionConnection";
  pageInfo: MeTransactions_viewer_wallet_transactions_pageInfo;
  edges: MeTransactions_viewer_wallet_transactions_edges[] | null;
}

export interface MeTransactions_viewer_wallet {
  __typename: "Wallet";
  transactions: MeTransactions_viewer_wallet_transactions;
}

export interface MeTransactions_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User Wallet
   */
  wallet: MeTransactions_viewer_wallet;
}

export interface MeTransactions {
  viewer: MeTransactions_viewer | null;
}

export interface MeTransactionsVariables {
  after?: string | null;
  purpose?: TransactionPurpose | null;
  currency?: TransactionCurrency | null;
}
