/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType, ArticleAccessType, ArticleState, UserState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ToolbarArticlePublic
// ====================================================

export interface ToolbarArticlePublic_tags_creator {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface ToolbarArticlePublic_tags_editors {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface ToolbarArticlePublic_tags {
  __typename: "Tag";
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Creator of this tag.
   */
  creator: ToolbarArticlePublic_tags_creator | null;
  /**
   * Editors of this tag.
   */
  editors: ToolbarArticlePublic_tags_editors[] | null;
}

export interface ToolbarArticlePublic_received_edges_node_sender_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ToolbarArticlePublic_received_edges_node_sender_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ToolbarArticlePublic_received_edges_node_sender_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ToolbarArticlePublic_received_edges_node_sender_info_badges[] | null;
}

export interface ToolbarArticlePublic_received_edges_node_sender {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ToolbarArticlePublic_received_edges_node_sender_liker;
  /**
   * User information.
   */
  info: ToolbarArticlePublic_received_edges_node_sender_info;
}

export interface ToolbarArticlePublic_received_edges_node {
  __typename: "Appreciation";
  /**
   * Sender of appreciation.
   */
  sender: ToolbarArticlePublic_received_edges_node_sender | null;
}

export interface ToolbarArticlePublic_received_edges {
  __typename: "AppreciationEdge";
  cursor: string;
  node: ToolbarArticlePublic_received_edges_node;
}

export interface ToolbarArticlePublic_received {
  __typename: "AppreciationConnection";
  totalCount: number;
  edges: ToolbarArticlePublic_received_edges[] | null;
}

export interface ToolbarArticlePublic_appreciationsReceived {
  __typename: "AppreciationConnection";
  totalCount: number;
}

export interface ToolbarArticlePublic_donationsDialog {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ToolbarArticlePublic_author_liker {
  __typename: "Liker";
  /**
   * Liker ID of LikeCoin
   */
  likerId: string | null;
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ToolbarArticlePublic_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ToolbarArticlePublic_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ToolbarArticlePublic_author_info {
  __typename: "UserInfo";
  /**
   * Login address
   */
  ethAddress: string | null;
  /**
   * User badges.
   */
  badges: ToolbarArticlePublic_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ToolbarArticlePublic_author_info_cryptoWallet | null;
}

export interface ToolbarArticlePublic_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ToolbarArticlePublic_author {
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
   * Liker info of current user
   */
  liker: ToolbarArticlePublic_author_liker;
  /**
   * User information.
   */
  info: ToolbarArticlePublic_author_info;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * Status of current user.
   */
  status: ToolbarArticlePublic_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
}

export interface ToolbarArticlePublic_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
}

export interface ToolbarArticlePublic_drafts {
  __typename: "Draft";
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface ToolbarArticlePublic_donationsToolbar {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ToolbarArticlePublic {
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
   * Tags attached to this article.
   */
  tags: ToolbarArticlePublic_tags[] | null;
  /**
   * Total number of appreciations recieved of this article.
   */
  appreciationsReceivedTotal: number;
  /**
   * Appreciations history of this article.
   */
  received: ToolbarArticlePublic_received;
  /**
   * Appreciations history of this article.
   */
  appreciationsReceived: ToolbarArticlePublic_appreciationsReceived;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Transactions history of this article.
   */
  donationsDialog: ToolbarArticlePublic_donationsDialog;
  /**
   * IPFS hash of this article.
   */
  dataHash: string;
  /**
   * the iscnId if published to ISCN
   */
  iscnId: string | null;
  /**
   * Time of this article was created.
   */
  createdAt: any;
  /**
   * Time of this article was revised.
   */
  revisedAt: any | null;
  /**
   * Author of this article.
   */
  author: ToolbarArticlePublic_author;
  /**
   * Access related fields on circle
   */
  access: ToolbarArticlePublic_access;
  /**
   * Drafts linked to this article.
   */
  drafts: ToolbarArticlePublic_drafts[] | null;
  /**
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * This value determines if this article is an author selected article or not.
   */
  sticky: boolean;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Transactions history of this article.
   */
  donationsToolbar: ToolbarArticlePublic_donationsToolbar;
  /**
   * Limit the nuhmber of appreciate per user.
   */
  appreciateLimit: number;
  /**
   * The counting number of this article.
   */
  responseCount: number;
}
