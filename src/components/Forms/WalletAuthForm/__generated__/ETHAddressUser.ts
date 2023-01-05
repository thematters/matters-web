/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ETHAddressUser
// ====================================================

export interface ETHAddressUser_user {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface ETHAddressUser {
  user: ETHAddressUser_user | null;
}

export interface ETHAddressUserVariables {
  ethAddress?: string | null;
}
