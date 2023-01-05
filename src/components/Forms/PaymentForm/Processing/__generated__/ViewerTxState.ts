/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TransactionState } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ViewerTxState
// ====================================================

export interface ViewerTxState_viewer_wallet_balance {
  __typename: "Balance";
  HKD: number;
}

export interface ViewerTxState_viewer_wallet_transactions_edges_node {
  __typename: "Transaction";
  id: string;
  state: TransactionState;
}

export interface ViewerTxState_viewer_wallet_transactions_edges {
  __typename: "TransactionEdge";
  node: ViewerTxState_viewer_wallet_transactions_edges_node;
}

export interface ViewerTxState_viewer_wallet_transactions {
  __typename: "TransactionConnection";
  edges: ViewerTxState_viewer_wallet_transactions_edges[] | null;
}

export interface ViewerTxState_viewer_wallet {
  __typename: "Wallet";
  balance: ViewerTxState_viewer_wallet_balance;
  transactions: ViewerTxState_viewer_wallet_transactions;
}

export interface ViewerTxState_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User Wallet
   */
  wallet: ViewerTxState_viewer_wallet;
}

export interface ViewerTxState {
  viewer: ViewerTxState_viewer | null;
}

export interface ViewerTxStateVariables {
  id: string;
}
