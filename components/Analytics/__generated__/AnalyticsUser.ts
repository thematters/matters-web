/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AnalyticsUser
// ====================================================

export interface AnalyticsUser_info {
  __typename: 'UserInfo'
  email: any | null
}

export interface AnalyticsUser {
  __typename: 'User'
  id: string
  info: AnalyticsUser_info
}
