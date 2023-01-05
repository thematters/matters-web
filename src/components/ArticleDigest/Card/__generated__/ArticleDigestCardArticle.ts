/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ArticleDigestCardArticle
// ====================================================

export interface ArticleDigestCardArticle_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ArticleDigestCardArticle_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleDigestCardArticle_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleDigestCardArticle_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ArticleDigestCardArticle_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ArticleDigestCardArticle_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ArticleDigestCardArticle_author_info_cryptoWallet | null;
}

export interface ArticleDigestCardArticle_author {
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
  status: ArticleDigestCardArticle_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ArticleDigestCardArticle_author_liker;
  /**
   * User information.
   */
  info: ArticleDigestCardArticle_author_info;
}

export interface ArticleDigestCardArticle {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * State of this article.
   */
  state: ArticleState;
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
   * A short summary for this article.
   */
  summary: string;
  /**
   * Author of this article.
   */
  author: ArticleDigestCardArticle_author;
  /**
   * State of this article.
   */
  articleState: ArticleState;
}
