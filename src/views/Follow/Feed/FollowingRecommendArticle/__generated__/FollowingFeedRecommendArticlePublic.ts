/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FollowingFeedRecommendArticlePublic
// ====================================================

export interface FollowingFeedRecommendArticlePublic_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface FollowingFeedRecommendArticlePublic_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface FollowingFeedRecommendArticlePublic_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface FollowingFeedRecommendArticlePublic_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface FollowingFeedRecommendArticlePublic_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: FollowingFeedRecommendArticlePublic_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: FollowingFeedRecommendArticlePublic_author_info_cryptoWallet | null;
}

export interface FollowingFeedRecommendArticlePublic_author {
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
  status: FollowingFeedRecommendArticlePublic_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: FollowingFeedRecommendArticlePublic_author_liker;
  /**
   * User information.
   */
  info: FollowingFeedRecommendArticlePublic_author_info;
}

export interface FollowingFeedRecommendArticlePublic {
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
  author: FollowingFeedRecommendArticlePublic_author;
  /**
   * State of this article.
   */
  articleState: ArticleState;
}
