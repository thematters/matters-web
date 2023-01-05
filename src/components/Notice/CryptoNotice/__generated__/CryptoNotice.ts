/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CryptoNoticeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CryptoNotice
// ====================================================

export interface CryptoNotice_target {
  __typename: "CryptoWallet";
  address: string;
}

export interface CryptoNotice {
  __typename: "CryptoNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  type: CryptoNoticeType;
  target: CryptoNotice_target;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
}
