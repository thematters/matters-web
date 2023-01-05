/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewerLikeInfo
// ====================================================

export interface ViewerLikeInfo_viewer_info {
  __typename: "UserInfo";
  /**
   * User email.
   */
  email: any | null;
  /**
   * Login address
   */
  ethAddress: string | null;
}

export interface ViewerLikeInfo_viewer_liker {
  __typename: "Liker";
  /**
   * Total LIKE left in wallet.
   */
  total: number;
  /**
   * Rate of LikeCoin/USD
   */
  rateUSD: number | null;
}

export interface ViewerLikeInfo_viewer {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * User information.
   */
  info: ViewerLikeInfo_viewer_info;
  /**
   * Liker info of current user
   */
  liker: ViewerLikeInfo_viewer_liker;
}

export interface ViewerLikeInfo {
  viewer: ViewerLikeInfo_viewer | null;
}
