/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AnnouncementType {
  community = "community",
  product = "product",
  seminar = "seminar",
}

export enum AppreciationPurpose {
  appreciate = "appreciate",
  appreciateComment = "appreciateComment",
  appreciateSubsidy = "appreciateSubsidy",
  firstPost = "firstPost",
  invitationAccepted = "invitationAccepted",
  joinByInvitation = "joinByInvitation",
  joinByTask = "joinByTask",
  systemSubsidy = "systemSubsidy",
}

/**
 * Enums for types of article access
 */
export enum ArticleAccessType {
  paywall = "paywall",
  public = "public",
}

export enum ArticleArticleNoticeType {
  ArticleNewCollected = "ArticleNewCollected",
}

/**
 * Enums for types of article license
 */
export enum ArticleLicenseType {
  arr = "arr",
  cc_0 = "cc_0",
  cc_by_nc_nd_2 = "cc_by_nc_nd_2",
}

export enum ArticleNoticeType {
  ArticleMentionedYou = "ArticleMentionedYou",
  ArticleNewAppreciation = "ArticleNewAppreciation",
  ArticleNewSubscriber = "ArticleNewSubscriber",
  ArticlePublished = "ArticlePublished",
  CircleNewArticle = "CircleNewArticle",
  RevisedArticleNotPublished = "RevisedArticleNotPublished",
  RevisedArticlePublished = "RevisedArticlePublished",
}

export enum ArticleRecommendationActivitySource {
  ReadArticlesTags = "ReadArticlesTags",
  UserDonation = "UserDonation",
}

/**
 * Enums for an article state.
 */
export enum ArticleState {
  active = "active",
  archived = "archived",
  banned = "banned",
}

export enum ArticleTagNoticeType {
  ArticleTagAdded = "ArticleTagAdded",
  ArticleTagRemoved = "ArticleTagRemoved",
  ArticleTagUnselected = "ArticleTagUnselected",
}

/**
 * Enums for asset types.
 */
export enum AssetType {
  announcementCover = "announcementCover",
  avatar = "avatar",
  circleAvatar = "circleAvatar",
  circleCover = "circleCover",
  cover = "cover",
  embed = "embed",
  embedaudio = "embedaudio",
  imgCached = "imgCached",
  oauthClientAvatar = "oauthClientAvatar",
  profileCover = "profileCover",
  tagCover = "tagCover",
  topicCover = "topicCover",
}

export enum AuthResultType {
  LinkAccount = "LinkAccount",
  Login = "Login",
  Signup = "Signup",
}

export enum AuthorsType {
  active = "active",
  appreciated = "appreciated",
  default = "default",
  trendy = "trendy",
}

export enum BadgeType {
  architect = "architect",
  golden_motor = "golden_motor",
  seed = "seed",
}

export enum Chain {
  Polygon = "Polygon",
}

export enum CircleNoticeType {
  CircleInvitation = "CircleInvitation",
  CircleNewBroadcastComments = "CircleNewBroadcastComments",
  CircleNewDiscussionComments = "CircleNewDiscussionComments",
  CircleNewFollower = "CircleNewFollower",
  CircleNewSubscriber = "CircleNewSubscriber",
  CircleNewUnsubscriber = "CircleNewUnsubscriber",
}

export enum CommentCommentNoticeType {
  CommentNewReply = "CommentNewReply",
}

export enum CommentNoticeType {
  ArticleNewComment = "ArticleNewComment",
  CircleNewBroadcast = "CircleNewBroadcast",
  CommentMentionedYou = "CommentMentionedYou",
  CommentPinned = "CommentPinned",
  SubscribedArticleNewComment = "SubscribedArticleNewComment",
}

/**
 * Enums for comment state.
 */
export enum CommentState {
  active = "active",
  archived = "archived",
  banned = "banned",
  collapsed = "collapsed",
}

export enum CommentType {
  article = "article",
  circleBroadcast = "circleBroadcast",
  circleDiscussion = "circleDiscussion",
}

export enum CryptoNoticeType {
  CryptoWalletAirdrop = "CryptoWalletAirdrop",
  CryptoWalletConnected = "CryptoWalletConnected",
}

export enum EntityType {
  announcement = "announcement",
  article = "article",
  circle = "circle",
  draft = "draft",
  tag = "tag",
  topic = "topic",
  user = "user",
}

export enum FeatureName {
  add_credit = "add_credit",
  circle_interact = "circle_interact",
  circle_management = "circle_management",
  fingerprint = "fingerprint",
  payment = "payment",
  payout = "payout",
  tag_adoption = "tag_adoption",
  verify_appreciate = "verify_appreciate",
}

export enum InvitationState {
  accepted = "accepted",
  pending = "pending",
  transfer_failed = "transfer_failed",
  transfer_succeeded = "transfer_succeeded",
}

export enum MigrationType {
  medium = "medium",
}

export enum NotificationSettingType {
  articleCommentPinned = "articleCommentPinned",
  articleNewAppreciation = "articleNewAppreciation",
  articleNewCollected = "articleNewCollected",
  articleNewComment = "articleNewComment",
  articleNewSubscription = "articleNewSubscription",
  articleSubscribedNewComment = "articleSubscribedNewComment",
  circleMemberBroadcast = "circleMemberBroadcast",
  circleMemberNewBroadcastReply = "circleMemberNewBroadcastReply",
  circleMemberNewDiscussion = "circleMemberNewDiscussion",
  circleMemberNewDiscussionReply = "circleMemberNewDiscussionReply",
  circleNewDiscussion = "circleNewDiscussion",
  circleNewFollower = "circleNewFollower",
  circleNewSubscriber = "circleNewSubscriber",
  circleNewUnsubscriber = "circleNewUnsubscriber",
  email = "email",
  enable = "enable",
  inCircleNewArticle = "inCircleNewArticle",
  inCircleNewBroadcast = "inCircleNewBroadcast",
  inCircleNewBroadcastReply = "inCircleNewBroadcastReply",
  inCircleNewDiscussion = "inCircleNewDiscussion",
  inCircleNewDiscussionReply = "inCircleNewDiscussionReply",
  mention = "mention",
  userNewFollower = "userNewFollower",
}

/**
 * Enums for publishing state.
 */
export enum PublishState {
  error = "error",
  pending = "pending",
  published = "published",
  unpublished = "unpublished",
}

export enum PutCircleArticlesType {
  add = "add",
  remove = "remove",
}

export enum QuoteCurrency {
  HKD = "HKD",
  TWD = "TWD",
  USD = "USD",
}

export enum ResetPasswordType {
  account = "account",
  payment = "payment",
}

export enum SearchExclude {
  blocked = "blocked",
}

export enum SearchTypes {
  Article = "Article",
  Tag = "Tag",
  User = "User",
}

export enum SigningMessagePurpose {
  airdrop = "airdrop",
  claimLogbook = "claimLogbook",
  connect = "connect",
  login = "login",
  signup = "signup",
}

export enum StripeAccountCountry {
  Australia = "Australia",
  Austria = "Austria",
  Belgium = "Belgium",
  Bulgaria = "Bulgaria",
  Canada = "Canada",
  Cyprus = "Cyprus",
  Denmark = "Denmark",
  Estonia = "Estonia",
  Finland = "Finland",
  France = "France",
  Germany = "Germany",
  Greece = "Greece",
  HongKong = "HongKong",
  Ireland = "Ireland",
  Italy = "Italy",
  Latvia = "Latvia",
  Lithuania = "Lithuania",
  Luxembourg = "Luxembourg",
  Malta = "Malta",
  Netherlands = "Netherlands",
  NewZealand = "NewZealand",
  Norway = "Norway",
  Poland = "Poland",
  Portugal = "Portugal",
  Romania = "Romania",
  Singapore = "Singapore",
  Slovakia = "Slovakia",
  Slovenia = "Slovenia",
  Spain = "Spain",
  Sweden = "Sweden",
  UnitedKingdom = "UnitedKingdom",
  UnitedStates = "UnitedStates",
}

export enum TagArticlesSortBy {
  byCreatedAtDesc = "byCreatedAtDesc",
  byHottestDesc = "byHottestDesc",
}

export enum TagNoticeType {
  TagAddEditor = "TagAddEditor",
  TagAdoption = "TagAdoption",
  TagLeave = "TagLeave",
  TagLeaveEditor = "TagLeaveEditor",
}

export enum TransactionCurrency {
  HKD = "HKD",
  LIKE = "LIKE",
  USDT = "USDT",
}

export enum TransactionNoticeType {
  PaymentPayout = "PaymentPayout",
  PaymentReceivedDonation = "PaymentReceivedDonation",
}

export enum TransactionPurpose {
  addCredit = "addCredit",
  donation = "donation",
  payout = "payout",
  refund = "refund",
  subscriptionSplit = "subscriptionSplit",
}

export enum TransactionState {
  canceled = "canceled",
  failed = "failed",
  pending = "pending",
  succeeded = "succeeded",
}

export enum UpdateTagSettingType {
  add_editor = "add_editor",
  adopt = "adopt",
  leave = "leave",
  leave_editor = "leave_editor",
  remove_editor = "remove_editor",
}

export enum UserGroup {
  a = "a",
  b = "b",
}

export enum UserLanguage {
  en = "en",
  zh_hans = "zh_hans",
  zh_hant = "zh_hant",
}

export enum UserNoticeType {
  UserNewFollower = "UserNewFollower",
}

export enum UserState {
  active = "active",
  archived = "archived",
  banned = "banned",
  frozen = "frozen",
  onboarding = "onboarding",
}

export enum VerificationCodeType {
  email_reset = "email_reset",
  email_reset_confirm = "email_reset_confirm",
  password_reset = "password_reset",
  payment_password_reset = "payment_password_reset",
  register = "register",
}

/**
 * Enums for vote types.
 */
export enum Vote {
  down = "down",
  up = "up",
}

/**
 * Add Credit
 */
export interface AddCreditInput {
  amount: any;
}

export interface AnnouncementsInput {
  id?: string | null;
  visible?: boolean | null;
}

export interface ChangeEmailInput {
  oldEmail: any;
  oldEmailCodeId: string;
  newEmail: any;
  newEmailCodeId: string;
}

export interface CommentInput {
  content: string;
  replyTo?: string | null;
  parentId?: string | null;
  mentions?: string[] | null;
  type: CommentType;
  articleId?: string | null;
  circleId?: string | null;
}

export interface ConfirmVerificationCodeInput {
  email: any;
  type: VerificationCodeType;
  code: string;
}

export interface GenerateSigningMessageInput {
  address: string;
  purpose?: SigningMessagePurpose | null;
}

export interface InviteCircleInvitee {
  id?: string | null;
  email?: string | null;
}

export interface MigrationInput {
  type?: MigrationType | null;
  files: (any | null)[];
}

export interface PutCircleInput {
  id?: string | null;
  avatar?: string | null;
  cover?: string | null;
  name?: string | null;
  displayName?: string | null;
  description?: string | null;
  amount?: any | null;
}

export interface PutCommentInput {
  comment: CommentInput;
  id?: string | null;
}

export interface PutTagInput {
  id?: string | null;
  content?: string | null;
  cover?: string | null;
  description?: string | null;
}

export interface ResetPasswordInput {
  password: string;
  codeId: string;
  type?: ResetPasswordType | null;
}

export interface SearchFilter {
  authorId?: string | null;
}

export interface SendVerificationCodeInput {
  email: any;
  type: VerificationCodeType;
  token?: string | null;
  redirectUrl?: any | null;
}

export interface SetCurrencyInput {
  currency?: QuoteCurrency | null;
}

export interface SingleFileUploadInput {
  type: AssetType;
  file?: any | null;
  url?: any | null;
  entityType: EntityType;
  entityId?: string | null;
}

export interface SubscribeCircleInput {
  id: string;
  password?: string | null;
}

export interface TopDonatorFilter {
  inRangeStart?: any | null;
  inRangeEnd?: any | null;
}

export interface UpdateTagSettingInput {
  id: string;
  type: UpdateTagSettingType;
  editors?: string[] | null;
}

export interface UpdateUserInfoInput {
  displayName?: string | null;
  userName?: string | null;
  avatar?: string | null;
  description?: string | null;
  language?: UserLanguage | null;
  agreeOn?: boolean | null;
  profileCover?: string | null;
  paymentPassword?: string | null;
  paymentPointer?: string | null;
}

export interface UserLoginInput {
  email: any;
  password: string;
}

export interface UserRegisterInput {
  email: any;
  userName?: string | null;
  displayName: string;
  password: string;
  description?: string | null;
  codeId: string;
}

export interface WalletLoginInput {
  ethAddress: string;
  signedMessage: string;
  signature: string;
  nonce: string;
  email?: any | null;
  codeId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
