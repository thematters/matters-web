/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BadgeType, UserState, TransactionCurrency, InvitationState } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserProfileUserPublic
// ====================================================

export interface UserProfileUserPublic_user_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UserProfileUserPublic_user_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UserProfileUserPublic_user_info_cryptoWallet_nfts {
  __typename: "NFTAsset";
  id: string;
  imageUrl: string;
  imagePreviewUrl: string | null;
  name: string;
  description: string | null;
}

export interface UserProfileUserPublic_user_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
  /**
   * NFT assets owned by this wallet address
   */
  nfts: UserProfileUserPublic_user_info_cryptoWallet_nfts[] | null;
}

export interface UserProfileUserPublic_user_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: UserProfileUserPublic_user_info_badges[] | null;
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
  /**
   * Connected wallet.
   */
  cryptoWallet: UserProfileUserPublic_user_info_cryptoWallet | null;
}

export interface UserProfileUserPublic_user_articles {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface UserProfileUserPublic_user_following_users {
  __typename: "UserConnection";
  totalCount: number;
}

export interface UserProfileUserPublic_user_following {
  __typename: "Following";
  users: UserProfileUserPublic_user_following_users;
}

export interface UserProfileUserPublic_user_followers {
  __typename: "UserConnection";
  totalCount: number;
}

export interface UserProfileUserPublic_user_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserProfileUserPublic_user_ownCircles_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface UserProfileUserPublic_user_ownCircles_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface UserProfileUserPublic_user_ownCircles_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface UserProfileUserPublic_user_ownCircles_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface UserProfileUserPublic_user_ownCircles_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: UserProfileUserPublic_user_ownCircles_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: UserProfileUserPublic_user_ownCircles_owner_info_cryptoWallet | null;
}

export interface UserProfileUserPublic_user_ownCircles_owner {
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
  status: UserProfileUserPublic_user_ownCircles_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: UserProfileUserPublic_user_ownCircles_owner_liker;
  /**
   * User information.
   */
  info: UserProfileUserPublic_user_ownCircles_owner_info;
}

export interface UserProfileUserPublic_user_ownCircles_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface UserProfileUserPublic_user_ownCircles_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface UserProfileUserPublic_user_ownCircles_prices {
  __typename: "Price";
  /**
   * Amount of Price.
   */
  amount: number;
  /**
   * Currency of Price.
   */
  currency: TransactionCurrency;
}

export interface UserProfileUserPublic_user_ownCircles_invitedBy {
  __typename: "Invitation";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Determine it's specific state.
   */
  state: InvitationState;
  /**
   * Free period of this invitation.
   */
  freePeriod: number;
}

export interface UserProfileUserPublic_user_ownCircles {
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
  /**
   * A short description of this Circle.
   */
  description: string | null;
  /**
   * Circle owner.
   */
  owner: UserProfileUserPublic_user_ownCircles_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: UserProfileUserPublic_user_ownCircles_members;
  /**
   * List of works belong to this Circle.
   */
  works: UserProfileUserPublic_user_ownCircles_works;
  /**
   * Prices offered by this Circle.
   */
  prices: UserProfileUserPublic_user_ownCircles_prices[] | null;
  /**
   * This value determines if current viewer is Member or not.
   */
  isMember: boolean;
  /**
   * Invitation used by current viewer.
   */
  invitedBy: UserProfileUserPublic_user_ownCircles_invitedBy | null;
}

export interface UserProfileUserPublic_user {
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
   * Liker info of current user
   */
  liker: UserProfileUserPublic_user_liker;
  /**
   * User information.
   */
  info: UserProfileUserPublic_user_info;
  /**
   * Articles authored by current user.
   */
  articles: UserProfileUserPublic_user_articles;
  /**
   * Following contents of this user.
   */
  following: UserProfileUserPublic_user_following;
  /**
   * Followers of this user.
   */
  followers: UserProfileUserPublic_user_followers;
  /**
   * Status of current user.
   */
  status: UserProfileUserPublic_user_status | null;
  /**
   * Circles belong to current user.
   */
  ownCircles: UserProfileUserPublic_user_ownCircles[] | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
}

export interface UserProfileUserPublic {
  user: UserProfileUserPublic_user | null;
}

export interface UserProfileUserPublicVariables {
  userName: string;
}
