/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LayoutUser
// ====================================================

export interface LayoutUser_info {
  __typename: 'UserInfo'
  email: any | null
}

export interface LayoutUser {
  __typename: 'User'
  /**
   * URL for avatar
   */
  avatar: any | null
  id: string
  info: LayoutUser_info
}
