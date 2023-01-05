/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType, ArticleState, UserState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ArticleNewAppreciationNotice
// ====================================================

export interface ArticleNewAppreciationNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleNewAppreciationNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleNewAppreciationNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ArticleNewAppreciationNotice_actors_info_badges[] | null;
}

export interface ArticleNewAppreciationNotice_actors {
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
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ArticleNewAppreciationNotice_actors_liker;
  /**
   * User information.
   */
  info: ArticleNewAppreciationNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface ArticleNewAppreciationNotice_article_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ArticleNewAppreciationNotice_article_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleNewAppreciationNotice_article_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleNewAppreciationNotice_article_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ArticleNewAppreciationNotice_article_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ArticleNewAppreciationNotice_article_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ArticleNewAppreciationNotice_article_author_info_cryptoWallet | null;
}

export interface ArticleNewAppreciationNotice_article_author {
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
  status: ArticleNewAppreciationNotice_article_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ArticleNewAppreciationNotice_article_author_liker;
  /**
   * User information.
   */
  info: ArticleNewAppreciationNotice_article_author_info;
}

export interface ArticleNewAppreciationNotice_article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * Article title.
   */
  title: string;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Article cover's link.
   */
  cover: string | null;
  /**
   * Author of this article.
   */
  author: ArticleNewAppreciationNotice_article_author;
}

export interface ArticleNewAppreciationNotice {
  __typename: "ArticleNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * List of notice actors.
   */
  actors: ArticleNewAppreciationNotice_actors[] | null;
  article: ArticleNewAppreciationNotice_article;
}
