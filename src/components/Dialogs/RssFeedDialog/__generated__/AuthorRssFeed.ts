/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AuthorRssFeed
// ====================================================

export interface AuthorRssFeed_info {
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

export interface AuthorRssFeed_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface AuthorRssFeed {
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
  info: AuthorRssFeed_info;
  /**
   * Articles authored by current user.
   */
  articles: AuthorRssFeed_articles;
}
