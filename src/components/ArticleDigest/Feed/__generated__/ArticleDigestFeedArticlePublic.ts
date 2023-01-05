/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType, ArticleAccessType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ArticleDigestFeedArticlePublic
// ====================================================

export interface ArticleDigestFeedArticlePublic_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ArticleDigestFeedArticlePublic_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleDigestFeedArticlePublic_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleDigestFeedArticlePublic_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ArticleDigestFeedArticlePublic_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ArticleDigestFeedArticlePublic_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ArticleDigestFeedArticlePublic_author_info_cryptoWallet | null;
}

export interface ArticleDigestFeedArticlePublic_author {
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
  status: ArticleDigestFeedArticlePublic_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ArticleDigestFeedArticlePublic_author_liker;
  /**
   * User information.
   */
  info: ArticleDigestFeedArticlePublic_author_info;
}

export interface ArticleDigestFeedArticlePublic_access_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Slugified name of this Circle.
   */
  name: string;
  /**
   * Human readable name of this Circle.
   */
  displayName: string;
}

export interface ArticleDigestFeedArticlePublic_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
  circle: ArticleDigestFeedArticlePublic_access_circle | null;
}

export interface ArticleDigestFeedArticlePublic_appreciationsReceived {
  __typename: "AppreciationConnection";
  totalCount: number;
}

export interface ArticleDigestFeedArticlePublic_donationsDialog {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ArticleDigestFeedArticlePublic_drafts {
  __typename: "Draft";
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface ArticleDigestFeedArticlePublic_tags_creator {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface ArticleDigestFeedArticlePublic_tags_editors {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface ArticleDigestFeedArticlePublic_tags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Creator of this tag.
   */
  creator: ArticleDigestFeedArticlePublic_tags_creator | null;
  /**
   * Editors of this tag.
   */
  editors: ArticleDigestFeedArticlePublic_tags_editors[] | null;
}

export interface ArticleDigestFeedArticlePublic_transactionsReceivedBy {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ArticleDigestFeedArticlePublic {
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
  articleState: ArticleState;
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
  author: ArticleDigestFeedArticlePublic_author;
  /**
   * Access related fields on circle
   */
  access: ArticleDigestFeedArticlePublic_access;
  /**
   * Time of this article was created.
   */
  createdAt: any;
  /**
   * Appreciations history of this article.
   */
  appreciationsReceived: ArticleDigestFeedArticlePublic_appreciationsReceived;
  /**
   * Transactions history of this article.
   */
  donationsDialog: ArticleDigestFeedArticlePublic_donationsDialog;
  /**
   * IPFS hash of this article.
   */
  dataHash: string;
  /**
   * the iscnId if published to ISCN
   */
  iscnId: string | null;
  /**
   * Time of this article was revised.
   */
  revisedAt: any | null;
  /**
   * Drafts linked to this article.
   */
  drafts: ArticleDigestFeedArticlePublic_drafts[] | null;
  /**
   * This value determines if this article is an author selected article or not.
   */
  sticky: boolean;
  /**
   * Tags attached to this article.
   */
  tags: ArticleDigestFeedArticlePublic_tags[] | null;
  /**
   * Cumulative reading time in seconds
   */
  readTime: number;
  /**
   * Transactions history of this article.
   */
  transactionsReceivedBy: ArticleDigestFeedArticlePublic_transactionsReceivedBy;
}
