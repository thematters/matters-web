/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleRecommendationActivitySource, ArticleState, UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: RecommendArticleActivity
// ====================================================

export interface RecommendArticleActivity_recommendArticles_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface RecommendArticleActivity_recommendArticles_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface RecommendArticleActivity_recommendArticles_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface RecommendArticleActivity_recommendArticles_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface RecommendArticleActivity_recommendArticles_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: RecommendArticleActivity_recommendArticles_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: RecommendArticleActivity_recommendArticles_author_info_cryptoWallet | null;
}

export interface RecommendArticleActivity_recommendArticles_author {
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
  status: RecommendArticleActivity_recommendArticles_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: RecommendArticleActivity_recommendArticles_author_liker;
  /**
   * User information.
   */
  info: RecommendArticleActivity_recommendArticles_author_info;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
}

export interface RecommendArticleActivity_recommendArticles {
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
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * State of this article.
   */
  recommendArticleState: ArticleState;
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
  author: RecommendArticleActivity_recommendArticles_author;
  /**
   * State of this article.
   */
  articleState: ArticleState;
}

export interface RecommendArticleActivity {
  __typename: "ArticleRecommendationActivity";
  /**
   * The source type of recommendation
   */
  source: ArticleRecommendationActivitySource | null;
  /**
   * Recommended articles
   */
  recommendArticles: RecommendArticleActivity_recommendArticles[] | null;
}
