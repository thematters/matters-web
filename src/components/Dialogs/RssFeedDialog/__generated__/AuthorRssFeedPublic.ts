/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AuthorRssFeedPublic
// ====================================================

export interface AuthorRssFeedPublic_user_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * Cover of profile page.
   */
  profileCover: string | null;
  /**
   * Login address
   */
  ethAddress: string | null;
  /**
   * the ipnsKey (`ipfs.io/ipns/<ipnsKey>/...`) for feed.json / rss.xml / index
   */
  ipnsKey: string | null;
}

export interface AuthorRssFeedPublic_user_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface AuthorRssFeedPublic_user {
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
   * User information.
   */
  info: AuthorRssFeedPublic_user_info;
  /**
   * Articles authored by current user.
   */
  articles: AuthorRssFeedPublic_user_articles;
}

export interface AuthorRssFeedPublic {
  user: AuthorRssFeedPublic_user | null;
}

export interface AuthorRssFeedPublicVariables {
  userName: string;
}
