/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleArticleNoticeType, BadgeType, ArticleState, UserState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ArticleArticleNotice
// ====================================================

export interface ArticleArticleNotice_actors_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleArticleNotice_actors_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleArticleNotice_actors_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ArticleArticleNotice_actors_info_badges[] | null;
}

export interface ArticleArticleNotice_actors {
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
  liker: ArticleArticleNotice_actors_liker;
  /**
   * User information.
   */
  info: ArticleArticleNotice_actors_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface ArticleArticleNotice_article_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
}

export interface ArticleArticleNotice_article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Article title.
   */
  title: string;
  /**
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Author of this article.
   */
  author: ArticleArticleNotice_article_author;
}

export interface ArticleArticleNotice_collection_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ArticleArticleNotice_collection_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleArticleNotice_collection_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleArticleNotice_collection_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ArticleArticleNotice_collection_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ArticleArticleNotice_collection_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ArticleArticleNotice_collection_author_info_cryptoWallet | null;
}

export interface ArticleArticleNotice_collection_author {
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
  status: ArticleArticleNotice_collection_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ArticleArticleNotice_collection_author_liker;
  /**
   * User information.
   */
  info: ArticleArticleNotice_collection_author_info;
}

export interface ArticleArticleNotice_collection {
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
  author: ArticleArticleNotice_collection_author;
}

export interface ArticleArticleNotice {
  __typename: "ArticleArticleNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * The value determines if the notice is unread or not.
   */
  unread: boolean;
  articleArticleNoticeType: ArticleArticleNoticeType;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  /**
   * List of notice actors.
   */
  actors: ArticleArticleNotice_actors[] | null;
  article: ArticleArticleNotice_article;
  collection: ArticleArticleNotice_collection;
}
