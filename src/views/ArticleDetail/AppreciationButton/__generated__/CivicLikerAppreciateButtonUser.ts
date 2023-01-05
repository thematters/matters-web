/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CivicLikerAppreciateButtonUser
// ====================================================

export interface CivicLikerAppreciateButtonUser_liker {
  __typename: "Liker";
  /**
   * Liker ID of LikeCoin
   */
  likerId: string | null;
}

export interface CivicLikerAppreciateButtonUser {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Liker info of current user
   */
  liker: CivicLikerAppreciateButtonUser_liker;
}
