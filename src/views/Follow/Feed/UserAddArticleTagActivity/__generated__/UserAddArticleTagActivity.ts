/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType, ArticleAccessType } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: UserAddArticleTagActivity
// ====================================================

export interface UserAddArticleTagActivity_actor {
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
}

export interface UserAddArticleTagActivity_nodeArticle_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserAddArticleTagActivity_nodeArticle_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UserAddArticleTagActivity_nodeArticle_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UserAddArticleTagActivity_nodeArticle_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface UserAddArticleTagActivity_nodeArticle_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: UserAddArticleTagActivity_nodeArticle_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: UserAddArticleTagActivity_nodeArticle_author_info_cryptoWallet | null;
}

export interface UserAddArticleTagActivity_nodeArticle_author {
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
  status: UserAddArticleTagActivity_nodeArticle_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: UserAddArticleTagActivity_nodeArticle_author_liker;
  /**
   * User information.
   */
  info: UserAddArticleTagActivity_nodeArticle_author_info;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
}

export interface UserAddArticleTagActivity_nodeArticle_access_circle {
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

export interface UserAddArticleTagActivity_nodeArticle_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
  circle: UserAddArticleTagActivity_nodeArticle_access_circle | null;
}

export interface UserAddArticleTagActivity_nodeArticle_appreciationsReceived {
  __typename: "AppreciationConnection";
  totalCount: number;
}

export interface UserAddArticleTagActivity_nodeArticle_donationsDialog {
  __typename: "UserConnection";
  totalCount: number;
}

export interface UserAddArticleTagActivity_nodeArticle_drafts {
  __typename: "Draft";
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface UserAddArticleTagActivity_nodeArticle_tags_creator {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface UserAddArticleTagActivity_nodeArticle_tags_editors {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface UserAddArticleTagActivity_nodeArticle_tags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Creator of this tag.
   */
  creator: UserAddArticleTagActivity_nodeArticle_tags_creator | null;
  /**
   * Editors of this tag.
   */
  editors: UserAddArticleTagActivity_nodeArticle_tags_editors[] | null;
}

export interface UserAddArticleTagActivity_nodeArticle_transactionsReceivedBy {
  __typename: "UserConnection";
  totalCount: number;
}

export interface UserAddArticleTagActivity_nodeArticle {
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
  author: UserAddArticleTagActivity_nodeArticle_author;
  /**
   * Access related fields on circle
   */
  access: UserAddArticleTagActivity_nodeArticle_access;
  /**
   * Time of this article was created.
   */
  createdAt: any;
  /**
   * Appreciations history of this article.
   */
  appreciationsReceived: UserAddArticleTagActivity_nodeArticle_appreciationsReceived;
  /**
   * Transactions history of this article.
   */
  donationsDialog: UserAddArticleTagActivity_nodeArticle_donationsDialog;
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
  drafts: UserAddArticleTagActivity_nodeArticle_drafts[] | null;
  /**
   * This value determines if this article is an author selected article or not.
   */
  sticky: boolean;
  /**
   * Tags attached to this article.
   */
  tags: UserAddArticleTagActivity_nodeArticle_tags[] | null;
  /**
   * Cumulative reading time in seconds
   */
  readTime: number;
  /**
   * Transactions history of this article.
   */
  transactionsReceivedBy: UserAddArticleTagActivity_nodeArticle_transactionsReceivedBy;
  /**
   * This value determines if current Viewer has subscribed of not.
   */
  subscribed: boolean;
}

export interface UserAddArticleTagActivity_targetTag {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
  /**
   * This value determines if current viewer is following or not.
   */
  isFollower: boolean | null;
}

export interface UserAddArticleTagActivity {
  __typename: "UserAddArticleTagActivity";
  actor: UserAddArticleTagActivity_actor;
  createdAt: any;
  /**
   * Article added to tag
   */
  nodeArticle: UserAddArticleTagActivity_nodeArticle;
  /**
   * Tag added by article
   */
  targetTag: UserAddArticleTagActivity_targetTag;
}
