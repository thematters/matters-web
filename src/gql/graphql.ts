export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any }
  Upload: { input: any; output: any }
  amount_Float_NotNull_exclusiveMin_0: { input: any; output: any }
  amount_Float_exclusiveMin_0: { input: any; output: any }
  amount_Int_NotNull_min_1: { input: any; output: any }
  banDays_Int_exclusiveMin_0: { input: any; output: any }
  boost_Float_NotNull_min_0: { input: any; output: any }
  description_String_maxLength_140: { input: any; output: any }
  email_String_NotNull_format_email: { input: any; output: any }
  email_String_format_email: { input: any; output: any }
  first_Int_NotNull_min_0: { input: any; output: any }
  first_Int_min_0: { input: any; output: any }
  freePeriod_Int_NotNull_exclusiveMin_0: { input: any; output: any }
  last_Int_min_0: { input: any; output: any }
  link_String_NotNull_format_uri: { input: any; output: any }
  link_String_format_uri: { input: any; output: any }
  random_Int_min_0_max_49: { input: any; output: any }
  redirectUrl_String_format_uri: { input: any; output: any }
  replyToDonator_String_maxLength_140: { input: any; output: any }
  requestForDonation_String_maxLength_140: { input: any; output: any }
  url_String_format_uri: { input: any; output: any }
  website_String_format_uri: { input: any; output: any }
}

export type AdStatus = {
  __typename?: 'AdStatus'
  /** Whether this article is labeled as ad by human, null for not labeled yet.  */
  isAd?: Maybe<Scalars['Boolean']['output']>
}

export type AddCollectionsArticlesInput = {
  articles: Array<Scalars['ID']['input']>
  collections: Array<Scalars['ID']['input']>
}

export type AddCreditInput = {
  amount: Scalars['amount_Float_NotNull_exclusiveMin_0']['input']
}

export type AddCreditResult = {
  __typename?: 'AddCreditResult'
  /** The client secret of this PaymentIntent. */
  client_secret: Scalars['String']['output']
  transaction: Transaction
}

export type AddCurationChannelArticlesInput = {
  articles: Array<Scalars['ID']['input']>
  channel: Scalars['ID']['input']
}

export type Announcement = {
  __typename?: 'Announcement'
  channels: Array<AnnouncementChannel>
  content?: Maybe<Scalars['String']['output']>
  cover?: Maybe<Scalars['String']['output']>
  createdAt: Scalars['DateTime']['output']
  expiredAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  link?: Maybe<Scalars['String']['output']>
  order: Scalars['Int']['output']
  title?: Maybe<Scalars['String']['output']>
  /** @deprecated Use title, content, link with TranslationArgs instead */
  translations?: Maybe<Array<TranslatedAnnouncement>>
  type: AnnouncementType
  updatedAt: Scalars['DateTime']['output']
  visible: Scalars['Boolean']['output']
}

export type AnnouncementContentArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type AnnouncementLinkArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type AnnouncementTitleArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type AnnouncementChannel = {
  __typename?: 'AnnouncementChannel'
  channel: Channel
  order: Scalars['Int']['output']
  visible: Scalars['Boolean']['output']
}

export type AnnouncementChannelInput = {
  channel: Scalars['ID']['input']
  order: Scalars['Int']['input']
  visible: Scalars['Boolean']['input']
}

export enum AnnouncementType {
  Community = 'community',
  Product = 'product',
  Seminar = 'seminar',
}

export type AnnouncementsInput = {
  channel?: InputMaybe<IdentityInput>
  id?: InputMaybe<Scalars['ID']['input']>
  visible?: InputMaybe<Scalars['Boolean']['input']>
}

export type ApplyCampaignInput = {
  id: Scalars['ID']['input']
}

export type AppreciateArticleInput = {
  amount: Scalars['amount_Int_NotNull_min_1']['input']
  id: Scalars['ID']['input']
  superLike?: InputMaybe<Scalars['Boolean']['input']>
  token?: InputMaybe<Scalars['String']['input']>
}

export type Appreciation = {
  __typename?: 'Appreciation'
  amount: Scalars['Int']['output']
  content: Scalars['String']['output']
  /** Timestamp of appreciation. */
  createdAt: Scalars['DateTime']['output']
  purpose: AppreciationPurpose
  /** Recipient of appreciation. */
  recipient: User
  /** Sender of appreciation. */
  sender?: Maybe<User>
  /** Object that appreciation is meant for. */
  target?: Maybe<Article>
}

export type AppreciationConnection = Connection & {
  __typename?: 'AppreciationConnection'
  edges?: Maybe<Array<AppreciationEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type AppreciationEdge = {
  __typename?: 'AppreciationEdge'
  cursor: Scalars['String']['output']
  node: Appreciation
}

export enum AppreciationPurpose {
  Appreciate = 'appreciate',
  AppreciateComment = 'appreciateComment',
  AppreciateSubsidy = 'appreciateSubsidy',
  FirstPost = 'firstPost',
  InvitationAccepted = 'invitationAccepted',
  JoinByInvitation = 'joinByInvitation',
  JoinByTask = 'joinByTask',
  SystemSubsidy = 'systemSubsidy',
}

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type Article = Node &
  PinnableWork & {
    __typename?: 'Article'
    /** Access related fields on circle */
    access: ArticleAccess
    /** Number represents how many times per user can appreciate this article. */
    appreciateLeft: Scalars['Int']['output']
    /** Limit the nuhmber of appreciate per user. */
    appreciateLimit: Scalars['Int']['output']
    /** Appreciations history of this article. */
    appreciationsReceived: AppreciationConnection
    /** Total number of appreciations recieved of this article. */
    appreciationsReceivedTotal: Scalars['Int']['output']
    /** List of assets are belonged to this article (Only the author can access currently). */
    assets: Array<Asset>
    /** Author of this article. */
    author: User
    /** Available translation languages. */
    availableTranslations?: Maybe<Array<UserLanguage>>
    /** The number of users who bookmarked this article. */
    bookmarkCount: Scalars['Int']['output']
    bookmarked: Scalars['Boolean']['output']
    /** Associated campaigns */
    campaigns: Array<ArticleCampaign>
    /** Whether readers can comment */
    canComment: Scalars['Boolean']['output']
    /** This value determines if current viewer can SuperLike or not. */
    canSuperLike: Scalars['Boolean']['output']
    /** Classifications status */
    classification: ArticleClassification
    /**
     * List of articles added into this article's connections.
     * @deprecated Use connections instead
     */
    collection: ArticleConnection
    /** Collections of this article. */
    collections: CollectionConnection
    /** The counting number of comments. */
    commentCount: Scalars['Int']['output']
    /** List of comments of this article. */
    comments: CommentConnection
    /** List of articles which added this article into their connections. */
    connectedBy: ArticleConnection
    connections: ArticleConnection
    /** Content (HTML) of this article. */
    content: Scalars['String']['output']
    /** Different foramts of content. */
    contents: ArticleContents
    /** Article cover's link, set by author */
    cover?: Maybe<Scalars['String']['output']>
    /** Time of this article was created. */
    createdAt: Scalars['DateTime']['output']
    /** IPFS hash of this article. */
    dataHash: Scalars['String']['output']
    /** Cover link that is displayed on the article page */
    displayCover?: Maybe<Scalars['String']['output']>
    /** Whether current viewer has donated to this article */
    donated: Scalars['Boolean']['output']
    /** Total number of donation recieved of this article. */
    donationCount: Scalars['Int']['output']
    /** Donations of this article, grouped by sender */
    donations: ArticleDonationConnection
    /** List of featured comments of this article. */
    featuredComments: CommentConnection
    /** Computed federation export eligibility for this article. */
    federationEligibility: ArticleFederationEligibility
    /** Article-level federation setting override. */
    federationSetting?: Maybe<ArticleFederationSetting>
    /** This value determines if current viewer has appreciated or not. */
    hasAppreciate: Scalars['Boolean']['output']
    /** Unique ID of this article */
    id: Scalars['ID']['output']
    /** Whether the first line of paragraph should be indented */
    indentFirstLine: Scalars['Boolean']['output']
    /** The iscnId if published to ISCN */
    iscnId?: Maybe<Scalars['String']['output']>
    /** Original language of content */
    language?: Maybe<Scalars['String']['output']>
    /** License Type */
    license: ArticleLicenseType
    /** Media hash, composed of cid encoding, of this article. */
    mediaHash: Scalars['String']['output']
    /** Whether this article is noindex */
    noindex: Scalars['Boolean']['output']
    oss: ArticleOss
    /** The number determines how many comments can be set as pinned comment. */
    pinCommentLeft: Scalars['Int']['output']
    /** The number determines how many pinned comments can be set. */
    pinCommentLimit: Scalars['Int']['output']
    /** This value determines if this article is an author selected article or not. */
    pinned: Scalars['Boolean']['output']
    /** List of pinned comments. */
    pinnedComments?: Maybe<Array<Comment>>
    /** Cumulative reading time in seconds */
    readTime: Scalars['Float']['output']
    /** Total number of readers of this article. */
    readerCount: Scalars['Int']['output']
    /** Related articles to this article. */
    relatedArticles: ArticleConnection
    /** Donation-related articles to this article. */
    relatedDonationArticles: ArticleConnection
    remark?: Maybe<Scalars['String']['output']>
    /** Creator message after support */
    replyToDonator?: Maybe<Scalars['String']['output']>
    /** Creator message asking for support */
    requestForDonation?: Maybe<Scalars['String']['output']>
    /** The counting number of this article. */
    responseCount: Scalars['Int']['output']
    /** List of responses of a article. */
    responses: ResponseConnection
    /** Time of this article was revised. */
    revisedAt?: Maybe<Scalars['DateTime']['output']>
    /** Revision Count */
    revisionCount: Scalars['Int']['output']
    /** Whether content is marked as sensitive by admin */
    sensitiveByAdmin: Scalars['Boolean']['output']
    /** whether content is marked as sensitive by author */
    sensitiveByAuthor: Scalars['Boolean']['output']
    /** Short hash for shorter url addressing */
    shortHash: Scalars['String']['output']
    /** Slugified article title. */
    slug: Scalars['String']['output']
    /** State of this article. */
    state: ArticleState
    /**
     * This value determines if current Viewer has bookmarked of not.
     * @deprecated Use bookmarked instead
     */
    subscribed: Scalars['Boolean']['output']
    /** A short summary for this article. */
    summary: Scalars['String']['output']
    /** This value determines if the summary is customized or not. */
    summaryCustomized: Scalars['Boolean']['output']
    /** Tags attached to this article. */
    tags?: Maybe<Array<Tag>>
    /** Article title. */
    title: Scalars['String']['output']
    /** Transactions history of this article. */
    transactionsReceivedBy: UserConnection
    /** Translation of article title and content. */
    translation?: Maybe<ArticleTranslation>
    /** History versions */
    versions: ArticleVersionsConnection
    /** Word count of this article. */
    wordCount?: Maybe<Scalars['Int']['output']>
  }

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type ArticleAppreciationsReceivedArgs = {
  input: ConnectionArgs
}

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type ArticleCollectionArgs = {
  input: ConnectionArgs
}

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type ArticleCollectionsArgs = {
  input: ConnectionArgs
}

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type ArticleCommentsArgs = {
  input: CommentsInput
}

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type ArticleConnectedByArgs = {
  input: ConnectionArgs
}

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type ArticleConnectionsArgs = {
  input: ConnectionArgs
}

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type ArticleDonationsArgs = {
  input: ConnectionArgs
}

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type ArticleFeaturedCommentsArgs = {
  input: FeaturedCommentsInput
}

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type ArticleRelatedArticlesArgs = {
  input: ConnectionArgs
}

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type ArticleRelatedDonationArticlesArgs = {
  input: RelatedDonationArticlesInput
}

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type ArticleResponsesArgs = {
  input: ResponsesInput
}

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type ArticleTransactionsReceivedByArgs = {
  input: TransactionsReceivedByArgs
}

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type ArticleTranslationArgs = {
  input?: InputMaybe<ArticleTranslationInput>
}

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type ArticleVersionsArgs = {
  input: ArticleVersionsInput
}

export type ArticleAccess = {
  __typename?: 'ArticleAccess'
  circle?: Maybe<Circle>
  secret?: Maybe<Scalars['String']['output']>
  type: ArticleAccessType
}

/** Enums for types of article access */
export enum ArticleAccessType {
  Paywall = 'paywall',
  Public = 'public',
}

export type ArticleArticleNotice = Notice & {
  __typename?: 'ArticleArticleNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  article: Article
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']['output']
  /** Unique ID of this notice. */
  id: Scalars['ID']['output']
  target: Article
  type: ArticleArticleNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']['output']
}

export enum ArticleArticleNoticeType {
  ArticleNewCollected = 'ArticleNewCollected',
}

export type ArticleCampaign = {
  __typename?: 'ArticleCampaign'
  campaign: Campaign
  stage?: Maybe<CampaignStage>
}

export type ArticleCampaignInput = {
  campaign: Scalars['ID']['input']
  stage?: InputMaybe<Scalars['ID']['input']>
}

export type ArticleClassification = {
  __typename?: 'ArticleClassification'
  topicChannel: TopicChannelClassification
}

export type ArticleConnection = Connection & {
  __typename?: 'ArticleConnection'
  edges?: Maybe<Array<ArticleEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type ArticleContents = {
  __typename?: 'ArticleContents'
  /** HTML content of this article. */
  html: Scalars['String']['output']
  /** Markdown content of this article. */
  markdown: Scalars['String']['output']
}

export type ArticleDonation = {
  __typename?: 'ArticleDonation'
  id: Scalars['ID']['output']
  sender?: Maybe<User>
}

export type ArticleDonationConnection = {
  __typename?: 'ArticleDonationConnection'
  edges?: Maybe<Array<ArticleDonationEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type ArticleDonationEdge = {
  __typename?: 'ArticleDonationEdge'
  cursor: Scalars['String']['output']
  node: ArticleDonation
}

export type ArticleEdge = {
  __typename?: 'ArticleEdge'
  cursor: Scalars['String']['output']
  node: Article
}

export type ArticleFederationEligibility = {
  __typename?: 'ArticleFederationEligibility'
  effectiveArticleSetting: FederationArticleSettingState
  eligible: Scalars['Boolean']['output']
  reason: FederationExportDecisionReason
}

export type ArticleFederationSetting = {
  __typename?: 'ArticleFederationSetting'
  articleId: Scalars['ID']['output']
  state: FederationArticleSettingState
  updatedBy?: Maybe<Scalars['ID']['output']>
}

export type ArticleInput = {
  mediaHash?: InputMaybe<Scalars['String']['input']>
  shortHash?: InputMaybe<Scalars['String']['input']>
}

/** Enums for types of article license */
export enum ArticleLicenseType {
  Arr = 'arr',
  Cc_0 = 'cc_0',
  CcByNcNd_2 = 'cc_by_nc_nd_2',
  CcByNcNd_4 = 'cc_by_nc_nd_4',
}

export type ArticleNotice = Notice & {
  __typename?: 'ArticleNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']['output']
  entities: Array<Node>
  /** Unique ID of this notice. */
  id: Scalars['ID']['output']
  target: Article
  type: ArticleNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']['output']
}

export enum ArticleNoticeType {
  ArticleMentionedYou = 'ArticleMentionedYou',
  ArticleNewAppreciation = 'ArticleNewAppreciation',
  ArticleNewSubscriber = 'ArticleNewSubscriber',
  ArticlePublished = 'ArticlePublished',
  CircleNewArticle = 'CircleNewArticle',
  RevisedArticleNotPublished = 'RevisedArticleNotPublished',
  RevisedArticlePublished = 'RevisedArticlePublished',
  ScheduledArticlePublished = 'ScheduledArticlePublished',
  TopicChannelFeedbackAccepted = 'TopicChannelFeedbackAccepted',
}

export type ArticleOss = {
  __typename?: 'ArticleOSS'
  adStatus: AdStatus
  boost: Scalars['Float']['output']
  inRecommendHottest: Scalars['Boolean']['output']
  inRecommendIcymi: Scalars['Boolean']['output']
  inRecommendNewest: Scalars['Boolean']['output']
  inSearch: Scalars['Boolean']['output']
  pinHistory: Array<Maybe<PinHistory>>
  score: Scalars['Float']['output']
  spamStatus: SpamStatus
  /** @deprecated Use classification.topicChannel.channels instead */
  topicChannels?: Maybe<Array<ArticleTopicChannel>>
}

export type ArticleRecommendationActivity = {
  __typename?: 'ArticleRecommendationActivity'
  /** Recommended articles */
  nodes?: Maybe<Array<Article>>
  /** The source type of recommendation */
  source?: Maybe<ArticleRecommendationActivitySource>
}

export enum ArticleRecommendationActivitySource {
  ReadArticlesTags = 'ReadArticlesTags',
  UserDonation = 'UserDonation',
}

/** Enums for an article state. */
export enum ArticleState {
  Active = 'active',
  Archived = 'archived',
  Banned = 'banned',
}

export type ArticleTopicChannel = {
  __typename?: 'ArticleTopicChannel'
  /** Whether this article is filtered out by anti-flood in this channel */
  antiFlooded: Scalars['Boolean']['output']
  channel: TopicChannel
  /** Datetime when this article is classified */
  classicfiedAt: Scalars['DateTime']['output']
  /** Whether this article channel is enabled */
  enabled: Scalars['Boolean']['output']
  /** Whether this article is labeled by human, null for not labeled yet.  */
  isLabeled: Scalars['Boolean']['output']
  /** Whether this article is pinned */
  pinned: Scalars['Boolean']['output']
  /** Confident score by machine */
  score?: Maybe<Scalars['Float']['output']>
}

export type ArticleTranslation = {
  __typename?: 'ArticleTranslation'
  content?: Maybe<Scalars['String']['output']>
  language?: Maybe<Scalars['String']['output']>
  model?: Maybe<TranslationModel>
  summary?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ArticleTranslationInput = {
  language: UserLanguage
  model?: InputMaybe<TranslationModel>
}

export type ArticleVersion = Node & {
  __typename?: 'ArticleVersion'
  contents: ArticleContents
  createdAt: Scalars['DateTime']['output']
  dataHash?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  mediaHash?: Maybe<Scalars['String']['output']>
  summary: Scalars['String']['output']
  title: Scalars['String']['output']
  translation?: Maybe<ArticleTranslation>
}

export type ArticleVersionTranslationArgs = {
  input?: InputMaybe<ArticleTranslationInput>
}

export type ArticleVersionEdge = {
  __typename?: 'ArticleVersionEdge'
  cursor: Scalars['String']['output']
  node: ArticleVersion
}

export type ArticleVersionsConnection = Connection & {
  __typename?: 'ArticleVersionsConnection'
  edges: Array<Maybe<ArticleVersionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type ArticleVersionsInput = {
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
}

export enum ArticlesSort {
  MostAppreciations = 'mostAppreciations',
  MostBookmarks = 'mostBookmarks',
  MostComments = 'mostComments',
  MostDonations = 'mostDonations',
  MostReadTime = 'mostReadTime',
  Newest = 'newest',
}

/** This type contains type, link and related data of an asset. */
export type Asset = {
  __typename?: 'Asset'
  /** Time of this asset was created. */
  createdAt: Scalars['DateTime']['output']
  draft?: Maybe<Scalars['Boolean']['output']>
  /** Unique ID of this Asset. */
  id: Scalars['ID']['output']
  /** Link of this asset. */
  path: Scalars['String']['output']
  /** Types of this asset. */
  type: AssetType
  uploadURL?: Maybe<Scalars['String']['output']>
}

/** Enums for asset types. */
export enum AssetType {
  AnnouncementCover = 'announcementCover',
  Avatar = 'avatar',
  CampaignCover = 'campaignCover',
  CircleAvatar = 'circleAvatar',
  CircleCover = 'circleCover',
  CollectionCover = 'collectionCover',
  Cover = 'cover',
  Embed = 'embed',
  Embedaudio = 'embedaudio',
  Moment = 'moment',
  OauthClientAvatar = 'oauthClientAvatar',
  ProfileCover = 'profileCover',
  TagCover = 'tagCover',
}

export type AuthResult = {
  __typename?: 'AuthResult'
  auth: Scalars['Boolean']['output']
  token?: Maybe<Scalars['String']['output']>
  type: AuthResultType
  user?: Maybe<User>
}

export enum AuthResultType {
  LinkAccount = 'LinkAccount',
  Login = 'Login',
  Signup = 'Signup',
}

export enum AuthorsType {
  Active = 'active',
  Appreciated = 'appreciated',
  Default = 'default',
  Trendy = 'trendy',
}

export type Badge = {
  __typename?: 'Badge'
  type: BadgeType
}

export enum BadgeType {
  Architect = 'architect',
  CarbonBased = 'carbon_based',
  CommunityWatch = 'community_watch',
  GoldenMotor = 'golden_motor',
  GrandSlam = 'grand_slam',
  Nomad1 = 'nomad1',
  Nomad2 = 'nomad2',
  Nomad3 = 'nomad3',
  Nomad4 = 'nomad4',
  Seed = 'seed',
}

export type BadgedUsersInput = {
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  type?: InputMaybe<BadgeType>
}

export type Balance = {
  __typename?: 'Balance'
  HKD: Scalars['Float']['output']
}

export type BanCampaignArticlesInput = {
  articles: Array<Scalars['ID']['input']>
  campaign: Scalars['ID']['input']
}

export type BlockchainTransaction = {
  __typename?: 'BlockchainTransaction'
  chain: Chain
  txHash: Scalars['String']['output']
}

export type BlockedSearchKeyword = {
  __typename?: 'BlockedSearchKeyword'
  /** Time of this search keyword was created. */
  createdAt: Scalars['DateTime']['output']
  /** Unique ID of bloked search keyword. */
  id: Scalars['ID']['output']
  /** Types of this search keyword. */
  searchKey: Scalars['String']['output']
}

export enum BoostTypes {
  Article = 'Article',
  Campaign = 'Campaign',
  Tag = 'Tag',
  User = 'User',
}

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type Campaign = {
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  shortHash: Scalars['String']['output']
  state: CampaignState
}

export type CampaignApplication = {
  __typename?: 'CampaignApplication'
  createdAt: Scalars['DateTime']['output']
  state: CampaignApplicationState
}

export enum CampaignApplicationState {
  Pending = 'pending',
  Rejected = 'rejected',
  Succeeded = 'succeeded',
}

export type CampaignArticleConnection = Connection & {
  __typename?: 'CampaignArticleConnection'
  edges: Array<CampaignArticleEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type CampaignArticleEdge = {
  __typename?: 'CampaignArticleEdge'
  announcement: Scalars['Boolean']['output']
  cursor: Scalars['String']['output']
  featured: Scalars['Boolean']['output']
  node: Article
}

export type CampaignArticleNotice = Notice & {
  __typename?: 'CampaignArticleNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  article: Article
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']['output']
  /** Unique ID of this notice. */
  id: Scalars['ID']['output']
  target: Campaign
  type: CampaignArticleNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']['output']
}

export enum CampaignArticleNoticeType {
  CampaignArticleFeatured = 'CampaignArticleFeatured',
}

export type CampaignArticlesFilter = {
  featured?: InputMaybe<Scalars['Boolean']['input']>
  stage?: InputMaybe<Scalars['ID']['input']>
}

export type CampaignArticlesInput = {
  after?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<CampaignArticlesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
}

export type CampaignConnection = Connection & {
  __typename?: 'CampaignConnection'
  edges?: Maybe<Array<CampaignEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type CampaignEdge = {
  __typename?: 'CampaignEdge'
  cursor: Scalars['String']['output']
  node: Campaign
}

export type CampaignInput = {
  shortHash: Scalars['String']['input']
}

export type CampaignOss = {
  __typename?: 'CampaignOSS'
  boost: Scalars['Float']['output']
  exclusive: Scalars['Boolean']['output']
  managers: Array<User>
}

export type CampaignParticipantConnection = Connection & {
  __typename?: 'CampaignParticipantConnection'
  edges?: Maybe<Array<CampaignParticipantEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type CampaignParticipantEdge = {
  __typename?: 'CampaignParticipantEdge'
  application?: Maybe<CampaignApplication>
  cursor: Scalars['String']['output']
  node: User
}

export type CampaignParticipantsInput = {
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  /** return all state participants */
  oss?: InputMaybe<Scalars['Boolean']['input']>
}

export type CampaignStage = {
  __typename?: 'CampaignStage'
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  period?: Maybe<DatetimeRange>
}

export type CampaignStageDescriptionArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type CampaignStageNameArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type CampaignStageInput = {
  description?: InputMaybe<Array<TranslationInput>>
  name: Array<TranslationInput>
  period?: InputMaybe<DatetimeRangeInput>
}

export enum CampaignState {
  Active = 'active',
  Archived = 'archived',
  Finished = 'finished',
  Pending = 'pending',
}

export type CampaignsFilter = {
  excludes?: InputMaybe<Array<Scalars['ID']['input']>>
  sort?: InputMaybe<CampaignsFilterSort>
  state?: InputMaybe<CampaignsFilterState>
}

export enum CampaignsFilterSort {
  WritingPeriod = 'writingPeriod',
}

export enum CampaignsFilterState {
  Active = 'active',
  Finished = 'finished',
}

export type CampaignsInput = {
  after?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<CampaignsFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  /** return pending and archived campaigns */
  oss?: InputMaybe<Scalars['Boolean']['input']>
}

export enum Chain {
  Optimism = 'Optimism',
  Polygon = 'Polygon',
}

export type Channel = {
  id: Scalars['ID']['output']
  navbarTitle: Scalars['String']['output']
  shortHash: Scalars['String']['output']
}

export type ChannelNavbarTitleArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type ChannelArticleConnection = Connection & {
  __typename?: 'ChannelArticleConnection'
  edges?: Maybe<Array<ChannelArticleEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type ChannelArticleEdge = {
  __typename?: 'ChannelArticleEdge'
  cursor: Scalars['String']['output']
  node: Article
  pinned: Scalars['Boolean']['output']
}

export type ChannelArticlesFilter = {
  datetimeRange?: InputMaybe<DatetimeRangeInput>
  searchKey?: InputMaybe<Scalars['String']['input']>
}

export type ChannelArticlesInput = {
  after?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<ChannelArticlesFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  oss?: InputMaybe<Scalars['Boolean']['input']>
  sort?: InputMaybe<ArticlesSort>
}

export type ChannelInput = {
  shortHash: Scalars['String']['input']
}

export type ChannelsInput = {
  /** return all channels if true, only active channels by default */
  oss?: InputMaybe<Scalars['Boolean']['input']>
}

export type Circle = Node & {
  __typename?: 'Circle'
  /** Analytics dashboard. */
  analytics: CircleAnalytics
  /**
   * Circle avatar's link.
   * @deprecated No longer in use
   */
  avatar?: Maybe<Scalars['String']['output']>
  /** Comments broadcasted by Circle owner. */
  broadcast: CommentConnection
  /**
   * Circle cover's link.
   * @deprecated No longer in use
   */
  cover?: Maybe<Scalars['String']['output']>
  /**
   * Created time.
   * @deprecated No longer in use
   */
  createdAt: Scalars['DateTime']['output']
  /** A short description of this Circle. */
  description?: Maybe<Scalars['String']['output']>
  /** Comments made by Circle member. */
  discussion: CommentConnection
  /** Discussion (include replies) count of this circle. */
  discussionCount: Scalars['Int']['output']
  /** Discussion (exclude replies) count of this circle. */
  discussionThreadCount: Scalars['Int']['output']
  /**
   * Human readable name of this Circle.
   * @deprecated No longer in use
   */
  displayName: Scalars['String']['output']
  /**
   * List of Circle follower.
   * @deprecated No longer in use
   */
  followers: UserConnection
  /** Unique ID. */
  id: Scalars['ID']['output']
  /** Invitation used by current viewer. */
  invitedBy?: Maybe<Invitation>
  /** Invitations belonged to this Circle. */
  invites: Invites
  /**
   * This value determines if current viewer is following Circle or not.
   * @deprecated No longer in use
   */
  isFollower: Scalars['Boolean']['output']
  /**
   * This value determines if current viewer is Member or not.
   * @deprecated No longer in use
   */
  isMember: Scalars['Boolean']['output']
  /**
   * List of Circle member.
   * @deprecated No longer in use
   */
  members: MemberConnection
  /**
   * Slugified name of this Circle.
   * @deprecated No longer in use
   */
  name: Scalars['String']['output']
  /** Circle owner. */
  owner: User
  /** Pinned comments broadcasted by Circle owner. */
  pinnedBroadcast?: Maybe<Array<Comment>>
  /** Prices offered by this Circle. */
  prices?: Maybe<Array<Price>>
  /**
   * State of this Circle.
   * @deprecated No longer in use
   */
  state: CircleState
  /**
   * Updated time.
   * @deprecated No longer in use
   */
  updatedAt: Scalars['DateTime']['output']
  /**
   * List of works belong to this Circle.
   * @deprecated No longer in use
   */
  works: ArticleConnection
}

export type CircleBroadcastArgs = {
  input: CommentsInput
}

export type CircleDiscussionArgs = {
  input: CommentsInput
}

export type CircleFollowersArgs = {
  input: ConnectionArgs
}

export type CircleMembersArgs = {
  input: ConnectionArgs
}

export type CircleWorksArgs = {
  input: ConnectionArgs
}

export type CircleAnalytics = {
  __typename?: 'CircleAnalytics'
  content: CircleContentAnalytics
  follower: CircleFollowerAnalytics
  income: CircleIncomeAnalytics
  subscriber: CircleSubscriberAnalytics
}

export type CircleConnection = Connection & {
  __typename?: 'CircleConnection'
  edges?: Maybe<Array<CircleEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type CircleContentAnalytics = {
  __typename?: 'CircleContentAnalytics'
  paywall?: Maybe<Array<CircleContentAnalyticsDatum>>
  public?: Maybe<Array<CircleContentAnalyticsDatum>>
}

export type CircleContentAnalyticsDatum = {
  __typename?: 'CircleContentAnalyticsDatum'
  node: Article
  readCount: Scalars['Int']['output']
}

export type CircleEdge = {
  __typename?: 'CircleEdge'
  cursor: Scalars['String']['output']
  node: Circle
}

export type CircleFollowerAnalytics = {
  __typename?: 'CircleFollowerAnalytics'
  /** current follower count */
  current: Scalars['Int']['output']
  /** the percentage of follower count in reader count of circle articles */
  followerPercentage: Scalars['Float']['output']
  /** subscriber count history of last 4 months */
  history: Array<MonthlyDatum>
}

export type CircleIncomeAnalytics = {
  __typename?: 'CircleIncomeAnalytics'
  /** income history of last 4 months */
  history: Array<MonthlyDatum>
  /** income of next month */
  nextMonth: Scalars['Float']['output']
  /** income of this month */
  thisMonth: Scalars['Float']['output']
  /** total income of all time */
  total: Scalars['Float']['output']
}

export type CircleInput = {
  /** Slugified name of a Circle. */
  name: Scalars['String']['input']
}

export type CircleNotice = Notice & {
  __typename?: 'CircleNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  /** Optional discussion/broadcast comments for bundled notices */
  comments?: Maybe<Array<Comment>>
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']['output']
  /** Unique ID of this notice. */
  id: Scalars['ID']['output']
  /** Optional mention comments for bundled notices */
  mentions?: Maybe<Array<Comment>>
  /** Optional discussion/broadcast replies for bundled notices */
  replies?: Maybe<Array<Comment>>
  target: Circle
  type: CircleNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']['output']
}

export enum CircleNoticeType {
  CircleInvitation = 'CircleInvitation',
  CircleNewBroadcastComments = 'CircleNewBroadcastComments',
  CircleNewDiscussionComments = 'CircleNewDiscussionComments',
  CircleNewFollower = 'CircleNewFollower',
  CircleNewSubscriber = 'CircleNewSubscriber',
  CircleNewUnsubscriber = 'CircleNewUnsubscriber',
}

export type CircleRecommendationActivity = {
  __typename?: 'CircleRecommendationActivity'
  /** Recommended circles */
  nodes?: Maybe<Array<Circle>>
  /** The source type of recommendation */
  source?: Maybe<CircleRecommendationActivitySource>
}

export enum CircleRecommendationActivitySource {
  UserSubscription = 'UserSubscription',
}

export enum CircleState {
  Active = 'active',
  Archived = 'archived',
}

export type CircleSubscriberAnalytics = {
  __typename?: 'CircleSubscriberAnalytics'
  /** current invitee count */
  currentInvitee: Scalars['Int']['output']
  /** current subscriber count */
  currentSubscriber: Scalars['Int']['output']
  /** invitee count history of last 4 months */
  inviteeHistory: Array<MonthlyDatum>
  /** subscriber count history of last 4 months */
  subscriberHistory: Array<MonthlyDatum>
}

export type ClaimLogbooksInput = {
  ethAddress: Scalars['String']['input']
  /** nonce from generateSigningMessage */
  nonce: Scalars['String']['input']
  /** sign'ed by wallet */
  signature: Scalars['String']['input']
  /** the message being sign'ed, including nonce */
  signedMessage: Scalars['String']['input']
}

export type ClaimLogbooksResult = {
  __typename?: 'ClaimLogbooksResult'
  ids?: Maybe<Array<Scalars['ID']['output']>>
  txHash: Scalars['String']['output']
}

export type ClassifyArticlesChannelsInput = {
  ids: Array<Scalars['ID']['input']>
}

export type ClearCommunityWatchOriginalContentInput = {
  note?: InputMaybe<Scalars['String']['input']>
  uuid: Scalars['ID']['input']
}

export type ClearReadHistoryInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ClientPreference = {
  __typename?: 'ClientPreference'
  /** Whether cicle banner is shown */
  circleBanner: Scalars['Boolean']['output']
  id: Scalars['ID']['output']
  /** Local language setting */
  language?: Maybe<Language>
  /** Login or sign up wall in article detail page */
  wall: Scalars['Boolean']['output']
}

export type Collection = Node &
  PinnableWork & {
    __typename?: 'Collection'
    articles: ArticleConnection
    author: User
    /** Check if the collection contains the article */
    contains: Scalars['Boolean']['output']
    cover?: Maybe<Scalars['String']['output']>
    description?: Maybe<Scalars['String']['output']>
    id: Scalars['ID']['output']
    likeCount: Scalars['Int']['output']
    /** whether current user has liked it */
    liked: Scalars['Boolean']['output']
    pinned: Scalars['Boolean']['output']
    title: Scalars['String']['output']
    updatedAt: Scalars['DateTime']['output']
  }

export type CollectionArticlesArgs = {
  input: CollectionArticlesInput
}

export type CollectionContainsArgs = {
  input: NodeInput
}

export type CollectionArticlesInput = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  includeAfter?: Scalars['Boolean']['input']
  includeBefore?: Scalars['Boolean']['input']
  last?: InputMaybe<Scalars['last_Int_min_0']['input']>
  reversed?: Scalars['Boolean']['input']
}

export type CollectionConnection = Connection & {
  __typename?: 'CollectionConnection'
  edges?: Maybe<Array<CollectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type CollectionEdge = {
  __typename?: 'CollectionEdge'
  cursor: Scalars['String']['output']
  node: Collection
}

export type CollectionNotice = Notice & {
  __typename?: 'CollectionNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']['output']
  /** Unique ID of this notice. */
  id: Scalars['ID']['output']
  target: Collection
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']['output']
}

export enum Color {
  Brown = 'brown',
  Gray = 'gray',
  Green = 'green',
  Orange = 'orange',
  Pink = 'pink',
  Purple = 'purple',
  Red = 'red',
  Yellow = 'yellow',
}

/** This type contains content, author, descendant comments and related data of a comment. */
export type Comment = Node & {
  __typename?: 'Comment'
  /** Author of this comment. */
  author: User
  /** Descendant comments of this comment. */
  comments: CommentConnection
  /** Community Watch audit action when this comment was removed by Community Watch. */
  communityWatchAction?: Maybe<CommunityWatchAction>
  /** Content of this comment. */
  content?: Maybe<Scalars['String']['output']>
  /** Time of this comment was created. */
  createdAt: Scalars['DateTime']['output']
  /**
   * The counting number of downvotes.
   * @deprecated No longer in use in querying
   */
  downvotes: Scalars['Int']['output']
  /** This value determines this comment is from article donator or not. */
  fromDonator: Scalars['Boolean']['output']
  /** Unique ID of this comment. */
  id: Scalars['ID']['output']
  /** The value determines current user's vote. */
  myVote?: Maybe<Vote>
  /** Current comment belongs to which Node. */
  node: Node
  /** Parent comment of this comment. */
  parentComment?: Maybe<Comment>
  /** This value determines this comment is pinned or not. */
  pinned: Scalars['Boolean']['output']
  remark?: Maybe<Scalars['String']['output']>
  /** A Comment that this comment replied to. */
  replyTo?: Maybe<Comment>
  spamStatus: SpamStatus
  /** State of this comment. */
  state: CommentState
  type: CommentType
  /** The counting number of upvotes. */
  upvotes: Scalars['Int']['output']
}

/** This type contains content, author, descendant comments and related data of a comment. */
export type CommentCommentsArgs = {
  input: CommentCommentsInput
}

export type CommentCommentNotice = Notice & {
  __typename?: 'CommentCommentNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  comment: Comment
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']['output']
  /** Unique ID of this notice. */
  id: Scalars['ID']['output']
  target: Comment
  type: CommentCommentNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']['output']
}

export enum CommentCommentNoticeType {
  CommentNewReply = 'CommentNewReply',
}

export type CommentCommentsInput = {
  after?: InputMaybe<Scalars['String']['input']>
  author?: InputMaybe<Scalars['ID']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  sort?: InputMaybe<CommentSort>
}

export type CommentConnection = Connection & {
  __typename?: 'CommentConnection'
  edges?: Maybe<Array<CommentEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type CommentEdge = {
  __typename?: 'CommentEdge'
  cursor: Scalars['String']['output']
  node: Comment
}

export type CommentInput = {
  articleId?: InputMaybe<Scalars['ID']['input']>
  circleId?: InputMaybe<Scalars['ID']['input']>
  content: Scalars['String']['input']
  mentions?: InputMaybe<Array<Scalars['ID']['input']>>
  momentId?: InputMaybe<Scalars['ID']['input']>
  parentId?: InputMaybe<Scalars['ID']['input']>
  replyTo?: InputMaybe<Scalars['ID']['input']>
  type: CommentType
}

export type CommentNotice = Notice & {
  __typename?: 'CommentNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']['output']
  /** Unique ID of this notice. */
  id: Scalars['ID']['output']
  target: Comment
  type: CommentNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']['output']
}

export enum CommentNoticeType {
  ArticleNewComment = 'ArticleNewComment',
  CircleNewBroadcast = 'CircleNewBroadcast',
  CommentLiked = 'CommentLiked',
  CommentMentionedYou = 'CommentMentionedYou',
  CommentPinned = 'CommentPinned',
  MomentNewComment = 'MomentNewComment',
  SubscribedArticleNewComment = 'SubscribedArticleNewComment',
}

/** Enums for sorting comments by time. */
export enum CommentSort {
  Newest = 'newest',
  Oldest = 'oldest',
}

/** Enums for comment state. */
export enum CommentState {
  Active = 'active',
  Archived = 'archived',
  Banned = 'banned',
  Collapsed = 'collapsed',
}

export enum CommentType {
  Article = 'article',
  CircleBroadcast = 'circleBroadcast',
  CircleDiscussion = 'circleDiscussion',
  Moment = 'moment',
}

export type CommentsFilter = {
  author?: InputMaybe<Scalars['ID']['input']>
  parentComment?: InputMaybe<Scalars['ID']['input']>
  state?: InputMaybe<CommentState>
}

export type CommentsInput = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<CommentsFilter>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  includeAfter?: InputMaybe<Scalars['Boolean']['input']>
  includeBefore?: InputMaybe<Scalars['Boolean']['input']>
  sort?: InputMaybe<CommentSort>
}

export type CommunityWatchAction = {
  __typename?: 'CommunityWatchAction'
  actionState: CommunityWatchActionState
  actorDisplayName: Scalars['String']['output']
  appealState: CommunityWatchAppealState
  commentId: Scalars['ID']['output']
  contentCleared: Scalars['Boolean']['output']
  createdAt: Scalars['DateTime']['output']
  originalContent?: Maybe<Scalars['String']['output']>
  reason: CommunityWatchRemoveCommentReason
  reviewState: CommunityWatchReviewState
  sourceId: Scalars['ID']['output']
  sourceTitle: Scalars['String']['output']
  sourceType: CommunityWatchActionSourceType
  /** Public identifier used by the Community Watch transparency page. */
  uuid: Scalars['ID']['output']
}

export type CommunityWatchActionConnection = Connection & {
  __typename?: 'CommunityWatchActionConnection'
  edges?: Maybe<Array<CommunityWatchActionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type CommunityWatchActionEdge = {
  __typename?: 'CommunityWatchActionEdge'
  cursor: Scalars['String']['output']
  node: CommunityWatchAction
}

export type CommunityWatchActionInput = {
  uuid: Scalars['ID']['input']
}

export enum CommunityWatchActionSourceType {
  Article = 'article',
  Moment = 'moment',
}

export enum CommunityWatchActionState {
  Active = 'active',
  Restored = 'restored',
  Voided = 'voided',
}

export type CommunityWatchActionsInput = {
  actionState?: InputMaybe<CommunityWatchActionState>
  after?: InputMaybe<Scalars['String']['input']>
  appealState?: InputMaybe<CommunityWatchAppealState>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  reason?: InputMaybe<CommunityWatchRemoveCommentReason>
  reviewState?: InputMaybe<CommunityWatchReviewState>
}

export enum CommunityWatchAppealState {
  None = 'none',
  Received = 'received',
  Resolved = 'resolved',
}

export type CommunityWatchRemoveCommentInput = {
  id: Scalars['ID']['input']
  reason: CommunityWatchRemoveCommentReason
}

export enum CommunityWatchRemoveCommentReason {
  PornAd = 'porn_ad',
  SpamAd = 'spam_ad',
}

export enum CommunityWatchReviewState {
  Pending = 'pending',
  ReasonAdjusted = 'reason_adjusted',
  Reversed = 'reversed',
  Upheld = 'upheld',
}

export type ConfirmVerificationCodeInput = {
  code: Scalars['String']['input']
  email: Scalars['email_String_NotNull_format_email']['input']
  type: VerificationCodeType
}

export type ConnectStripeAccountInput = {
  country: StripeAccountCountry
}

export type ConnectStripeAccountResult = {
  __typename?: 'ConnectStripeAccountResult'
  redirectUrl: Scalars['String']['output']
}

export type Connection = {
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<FilterInput>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  oss?: InputMaybe<Scalars['Boolean']['input']>
}

export type CryptoWallet = {
  __typename?: 'CryptoWallet'
  address: Scalars['String']['output']
  /**  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query  */
  hasNFTs: Scalars['Boolean']['output']
  id: Scalars['ID']['output']
  /** NFT assets owned by this wallet address */
  nfts?: Maybe<Array<NftAsset>>
}

export enum CryptoWalletSignaturePurpose {
  Airdrop = 'airdrop',
  Connect = 'connect',
  Login = 'login',
  Signup = 'signup',
}

export type CurationChannel = Channel &
  Node & {
    __typename?: 'CurationChannel'
    /** both activePeriod and state determine if the channel is active */
    activePeriod: DatetimeRange
    articles: ChannelArticleConnection
    color: Color
    id: Scalars['ID']['output']
    name: Scalars['String']['output']
    navbarTitle: Scalars['String']['output']
    note?: Maybe<Scalars['String']['output']>
    pinAmount: Scalars['Int']['output']
    shortHash: Scalars['String']['output']
    showRecommendation: Scalars['Boolean']['output']
    state: CurationChannelState
  }

export type CurationChannelArticlesArgs = {
  input: ChannelArticlesInput
}

export type CurationChannelNameArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type CurationChannelNavbarTitleArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type CurationChannelNoteArgs = {
  input?: InputMaybe<TranslationArgs>
}

export enum CurationChannelState {
  Archived = 'archived',
  Editing = 'editing',
  Published = 'published',
}

export type DatetimeRange = {
  __typename?: 'DatetimeRange'
  end?: Maybe<Scalars['DateTime']['output']>
  start: Scalars['DateTime']['output']
}

export type DatetimeRangeInput = {
  end?: InputMaybe<Scalars['DateTime']['input']>
  start: Scalars['DateTime']['input']
}

export type DeleteAnnouncementsInput = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>
}

export type DeleteCollectionArticlesInput = {
  articles: Array<Scalars['ID']['input']>
  collection: Scalars['ID']['input']
}

export type DeleteCollectionsInput = {
  ids: Array<Scalars['ID']['input']>
}

export type DeleteCommentInput = {
  id: Scalars['ID']['input']
}

export type DeleteCurationChannelArticlesInput = {
  articles: Array<Scalars['ID']['input']>
  channel: Scalars['ID']['input']
}

export type DeleteDraftInput = {
  id: Scalars['ID']['input']
}

export type DeleteMomentInput = {
  id: Scalars['ID']['input']
}

export type DeleteTagsInput = {
  ids: Array<Scalars['ID']['input']>
}

export type DirectImageUploadInput = {
  draft?: InputMaybe<Scalars['Boolean']['input']>
  entityId?: InputMaybe<Scalars['ID']['input']>
  entityType: EntityType
  mime?: InputMaybe<Scalars['String']['input']>
  type: AssetType
  url?: InputMaybe<Scalars['url_String_format_uri']['input']>
}

export type Donator = CryptoWallet | User

/** This type contains content, collections, assets and related data of a draft. */
export type Draft = Node & {
  __typename?: 'Draft'
  /** Access related fields on circle */
  access: DraftAccess
  /** Published article */
  article?: Maybe<Article>
  /** List of assets are belonged to this draft. */
  assets: Array<Asset>
  /** Associated campaigns */
  campaigns: Array<ArticleCampaign>
  /** Whether readers can comment */
  canComment: Scalars['Boolean']['output']
  /** @deprecated Use connections instead */
  collection: ArticleConnection
  /** Collections of this draft. */
  collections: CollectionConnection
  /** Connection articles of this draft. */
  connections: ArticleConnection
  /** Content (HTML) of this draft. */
  content?: Maybe<Scalars['String']['output']>
  /** Draft's cover link. */
  cover?: Maybe<Scalars['String']['output']>
  /** Time of this draft was created. */
  createdAt: Scalars['DateTime']['output']
  /** Unique ID of this draft. */
  id: Scalars['ID']['output']
  /** Whether the first line of paragraph should be indented */
  indentFirstLine: Scalars['Boolean']['output']
  /** Whether publish to ISCN */
  iscnPublish?: Maybe<Scalars['Boolean']['output']>
  /** License Type */
  license: ArticleLicenseType
  /** Media hash, composed of cid encoding, of this draft. */
  mediaHash?: Maybe<Scalars['String']['output']>
  /** Scheduled publish date of the article. */
  publishAt?: Maybe<Scalars['DateTime']['output']>
  /** State of draft during publihsing. */
  publishState: PublishState
  /** Creator message after support */
  replyToDonator?: Maybe<Scalars['String']['output']>
  /** Creator message asking for support */
  requestForDonation?: Maybe<Scalars['String']['output']>
  /** Whether content is marked as sensitive by author */
  sensitiveByAuthor: Scalars['Boolean']['output']
  /** Slugified draft title. */
  slug: Scalars['String']['output']
  /** Summary of this draft. */
  summary?: Maybe<Scalars['String']['output']>
  /** This value determines if the summary is customized or not. */
  summaryCustomized: Scalars['Boolean']['output']
  /** Tags are attached to this draft. */
  tags?: Maybe<Array<Scalars['String']['output']>>
  /** Draft title. */
  title?: Maybe<Scalars['String']['output']>
  /** Last time of this draft was upadted. */
  updatedAt: Scalars['DateTime']['output']
  /** The counting number of words in this draft. */
  wordCount: Scalars['Int']['output']
}

/** This type contains content, collections, assets and related data of a draft. */
export type DraftCollectionArgs = {
  input: ConnectionArgs
}

/** This type contains content, collections, assets and related data of a draft. */
export type DraftCollectionsArgs = {
  input: ConnectionArgs
}

/** This type contains content, collections, assets and related data of a draft. */
export type DraftConnectionsArgs = {
  input: ConnectionArgs
}

export type DraftAccess = {
  __typename?: 'DraftAccess'
  circle?: Maybe<Circle>
  type: ArticleAccessType
}

export type DraftConnection = Connection & {
  __typename?: 'DraftConnection'
  edges?: Maybe<Array<DraftEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type DraftEdge = {
  __typename?: 'DraftEdge'
  cursor: Scalars['String']['output']
  node: Draft
}

export type EditArticleInput = {
  accessType?: InputMaybe<ArticleAccessType>
  /** which campaigns to attach */
  campaigns?: InputMaybe<Array<ArticleCampaignInput>>
  /** whether readers can comment */
  canComment?: InputMaybe<Scalars['Boolean']['input']>
  circle?: InputMaybe<Scalars['ID']['input']>
  /** Deprecated, use connections instead */
  collection?: InputMaybe<Array<Scalars['ID']['input']>>
  collections?: InputMaybe<Array<Scalars['ID']['input']>>
  connections?: InputMaybe<Array<Scalars['ID']['input']>>
  content?: InputMaybe<Scalars['String']['input']>
  cover?: InputMaybe<Scalars['ID']['input']>
  /** revision description */
  description?: InputMaybe<Scalars['description_String_maxLength_140']['input']>
  id: Scalars['ID']['input']
  indentFirstLine?: InputMaybe<Scalars['Boolean']['input']>
  /** whether publish to ISCN */
  iscnPublish?: InputMaybe<Scalars['Boolean']['input']>
  license?: InputMaybe<ArticleLicenseType>
  pinned?: InputMaybe<Scalars['Boolean']['input']>
  replyToDonator?: InputMaybe<
    Scalars['replyToDonator_String_maxLength_140']['input']
  >
  requestForDonation?: InputMaybe<
    Scalars['requestForDonation_String_maxLength_140']['input']
  >
  sensitive?: InputMaybe<Scalars['Boolean']['input']>
  state?: InputMaybe<ArticleState>
  summary?: InputMaybe<Scalars['String']['input']>
  tags?: InputMaybe<Array<Scalars['String']['input']>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type EmailLoginInput = {
  email: Scalars['String']['input']
  /** used in register */
  language?: InputMaybe<UserLanguage>
  passwordOrCode: Scalars['String']['input']
  referralCode?: InputMaybe<Scalars['String']['input']>
}

export enum EntityType {
  Announcement = 'announcement',
  Article = 'article',
  Campaign = 'campaign',
  Circle = 'circle',
  Collection = 'collection',
  Draft = 'draft',
  Moment = 'moment',
  Tag = 'tag',
  User = 'user',
}

export type ExchangeRate = {
  __typename?: 'ExchangeRate'
  from: TransactionCurrency
  rate: Scalars['Float']['output']
  to: QuoteCurrency
  /** Last updated time from currency convertor APIs */
  updatedAt: Scalars['DateTime']['output']
}

export type ExchangeRatesInput = {
  from?: InputMaybe<TransactionCurrency>
  to?: InputMaybe<QuoteCurrency>
}

export type Feature = {
  __typename?: 'Feature'
  enabled: Scalars['Boolean']['output']
  name: FeatureName
  value?: Maybe<Scalars['Float']['output']>
}

export enum FeatureFlag {
  Admin = 'admin',
  Off = 'off',
  On = 'on',
  Seeding = 'seeding',
}

export enum FeatureName {
  AddCredit = 'add_credit',
  ArticleChannel = 'article_channel',
  CircleInteract = 'circle_interact',
  CircleManagement = 'circle_management',
  Fingerprint = 'fingerprint',
  Payment = 'payment',
  Payout = 'payout',
  SpamDetection = 'spam_detection',
  TagAdoption = 'tag_adoption',
  VerifyAppreciate = 'verify_appreciate',
}

export type FeaturedCommentsInput = {
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  sort?: InputMaybe<CommentSort>
}

export type FeaturedTagsInput = {
  /**  tagIds  */
  ids: Array<Scalars['ID']['input']>
}

export enum FederationArticleSettingState {
  Disabled = 'disabled',
  Enabled = 'enabled',
  Inherit = 'inherit',
}

export enum FederationAuthorSettingState {
  Disabled = 'disabled',
  Enabled = 'enabled',
}

export enum FederationExportDecisionReason {
  ArticleDisabled = 'article_disabled',
  ArticleNotPublic = 'article_not_public',
  AuthorNotOptedIn = 'author_not_opted_in',
  Eligible = 'eligible',
}

export type FilterInput = {
  inRangeEnd?: InputMaybe<Scalars['DateTime']['input']>
  inRangeStart?: InputMaybe<Scalars['DateTime']['input']>
  /** Used in User Articles filter, by tags or by time range, or both */
  tagIds?: InputMaybe<Array<Scalars['ID']['input']>>
}

export type Following = {
  __typename?: 'Following'
  circles: CircleConnection
  users: UserConnection
}

export type FollowingCirclesArgs = {
  input: ConnectionArgs
}

export type FollowingUsersArgs = {
  input: ConnectionArgs
}

export type FollowingActivity =
  | ArticleRecommendationActivity
  | CircleRecommendationActivity
  | UserAddArticleTagActivity
  | UserBroadcastCircleActivity
  | UserCreateCircleActivity
  | UserPostMomentActivity
  | UserPublishArticleActivity
  | UserRecommendationActivity

export type FollowingActivityConnection = Connection & {
  __typename?: 'FollowingActivityConnection'
  edges?: Maybe<Array<FollowingActivityEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type FollowingActivityEdge = {
  __typename?: 'FollowingActivityEdge'
  cursor: Scalars['String']['output']
  node: FollowingActivity
}

export type FrequentSearchInput = {
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  key?: InputMaybe<Scalars['String']['input']>
}

export type GenerateSigningMessageInput = {
  address: Scalars['String']['input']
  purpose?: InputMaybe<SigningMessagePurpose>
}

export enum GrantType {
  AuthorizationCode = 'authorization_code',
  RefreshToken = 'refresh_token',
}

export type IcymiTopic = Node & {
  __typename?: 'IcymiTopic'
  archivedAt?: Maybe<Scalars['DateTime']['output']>
  articles: Array<Article>
  id: Scalars['ID']['output']
  note?: Maybe<Scalars['String']['output']>
  pinAmount: Scalars['Int']['output']
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  state: IcymiTopicState
  title: Scalars['String']['output']
}

export type IcymiTopicNoteArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type IcymiTopicTitleArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type IcymiTopicConnection = Connection & {
  __typename?: 'IcymiTopicConnection'
  edges: Array<IcymiTopicEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type IcymiTopicEdge = {
  __typename?: 'IcymiTopicEdge'
  cursor: Scalars['String']['output']
  node: IcymiTopic
}

export enum IcymiTopicState {
  Archived = 'archived',
  Editing = 'editing',
  Published = 'published',
}

export type IdentityInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  shortHash?: InputMaybe<Scalars['String']['input']>
}

export type Invitation = {
  __typename?: 'Invitation'
  /** Accepted time. */
  acceptedAt?: Maybe<Scalars['DateTime']['output']>
  /** Invitation of current Circle. */
  circle: Circle
  /** Created time. */
  createdAt: Scalars['DateTime']['output']
  /** Free period of this invitation. */
  freePeriod: Scalars['Int']['output']
  /** Unique ID. */
  id: Scalars['ID']['output']
  /** Target person of this invitation. */
  invitee: Invitee
  /** Creator of this invitation. */
  inviter: User
  /** Sent time. */
  sentAt: Scalars['DateTime']['output']
  /** Determine it's specific state. */
  state: InvitationState
}

export type InvitationConnection = Connection & {
  __typename?: 'InvitationConnection'
  edges?: Maybe<Array<InvitationEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type InvitationEdge = {
  __typename?: 'InvitationEdge'
  cursor: Scalars['String']['output']
  node: Invitation
}

export enum InvitationState {
  Accepted = 'accepted',
  Pending = 'pending',
  TransferFailed = 'transfer_failed',
  TransferSucceeded = 'transfer_succeeded',
}

export type InviteCircleInput = {
  circleId: Scalars['ID']['input']
  freePeriod: Scalars['freePeriod_Int_NotNull_exclusiveMin_0']['input']
  invitees: Array<InviteCircleInvitee>
}

export type InviteCircleInvitee = {
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type Invitee = Person | User

export type Invites = {
  __typename?: 'Invites'
  /** Accepted invitation list */
  accepted: InvitationConnection
  /** Pending invitation list */
  pending: InvitationConnection
}

export type InvitesAcceptedArgs = {
  input: ConnectionArgs
}

export type InvitesPendingArgs = {
  input: ConnectionArgs
}

export type KeywordInput = {
  keyword: Scalars['String']['input']
}

export type KeywordsInput = {
  keywords?: InputMaybe<Array<Scalars['String']['input']>>
}

export enum Language {
  En = 'en',
  ZhHans = 'zh_hans',
  ZhHant = 'zh_hant',
}

/** To record the last random variable on homepage queries */
export type LastFetchRandom = {
  __typename?: 'LastFetchRandom'
  feedAuthors?: Maybe<Scalars['Int']['output']>
  feedTags?: Maybe<Scalars['Int']['output']>
  id: Scalars['ID']['output']
  sidebarAuthors?: Maybe<Scalars['Int']['output']>
  sidebarTags?: Maybe<Scalars['Int']['output']>
}

export type LikeCollectionInput = {
  id: Scalars['ID']['input']
}

export type LikeMomentInput = {
  id: Scalars['ID']['input']
}

export type Liker = {
  __typename?: 'Liker'
  /** Whether liker is a civic liker */
  civicLiker: Scalars['Boolean']['output']
  /** Liker ID of LikeCoin */
  likerId?: Maybe<Scalars['String']['output']>
  /** Total LIKE left in wallet. */
  total: Scalars['Float']['output']
}

export type LogRecordInput = {
  type: LogRecordTypes
}

export enum LogRecordTypes {
  ReadFolloweeArticles = 'ReadFolloweeArticles',
  ReadFollowingFeed = 'ReadFollowingFeed',
  ReadResponseInfoPopUp = 'ReadResponseInfoPopUp',
}

export type Member = {
  __typename?: 'Member'
  /** Price chosen by user when joining a Circle. */
  price: Price
  /** User who join to a Circle. */
  user: User
}

export type MemberConnection = Connection & {
  __typename?: 'MemberConnection'
  edges?: Maybe<Array<MemberEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type MemberEdge = {
  __typename?: 'MemberEdge'
  cursor: Scalars['String']['output']
  node: Member
}

export type MergeTagsInput = {
  content: Scalars['String']['input']
  ids: Array<Scalars['ID']['input']>
}

export type MigrationInput = {
  files: Array<InputMaybe<Scalars['Upload']['input']>>
  type?: InputMaybe<MigrationType>
}

export enum MigrationType {
  Medium = 'medium',
}

export type Moment = Node & {
  __typename?: 'Moment'
  articles: Array<Article>
  assets: Array<Asset>
  author: User
  commentCount: Scalars['Int']['output']
  commentedFollowees: Array<User>
  comments: CommentConnection
  content?: Maybe<Scalars['String']['output']>
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  likeCount: Scalars['Int']['output']
  /** whether current user has liked it */
  liked: Scalars['Boolean']['output']
  shortHash: Scalars['String']['output']
  spamStatus: SpamStatus
  state: MomentState
  tags: Array<Maybe<Tag>>
}

export type MomentCommentsArgs = {
  input: CommentsInput
}

export type MomentConnection = Connection & {
  __typename?: 'MomentConnection'
  edges?: Maybe<Array<MomentEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type MomentEdge = {
  __typename?: 'MomentEdge'
  cursor: Scalars['String']['output']
  node: Moment
}

export type MomentInput = {
  shortHash: Scalars['String']['input']
}

export type MomentNotice = Notice & {
  __typename?: 'MomentNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']['output']
  /** Unique ID of this notice. */
  id: Scalars['ID']['output']
  target: Moment
  type: MomentNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']['output']
}

export enum MomentNoticeType {
  MomentLiked = 'MomentLiked',
  MomentMentionedYou = 'MomentMentionedYou',
}

export enum MomentState {
  Active = 'active',
  Archived = 'archived',
}

export type MonthlyDatum = {
  __typename?: 'MonthlyDatum'
  date: Scalars['DateTime']['output']
  value: Scalars['Float']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Add blocked search keyword to blocked_search_word db */
  addBlockedSearchKeyword: BlockedSearchKeyword
  /** Add articles to the begining of the collections. */
  addCollectionsArticles: Array<Collection>
  /** Add Credit to User Wallet */
  addCredit: AddCreditResult
  addCurationChannelArticles: CurationChannel
  /** Add a social login to current user. */
  addSocialLogin: User
  /** Add a wallet login to current user. */
  addWalletLogin: User
  applyCampaign: Campaign
  /** Appreciate an article. */
  appreciateArticle: Article
  banCampaignArticles: Campaign
  /** Let Traveloggers owner claims a Logbook, returns transaction hash */
  claimLogbooks: ClaimLogbooksResult
  classifyArticlesChannels: Scalars['Boolean']['output']
  /** Clear stored original content for a Community Watch action as staff. */
  clearCommunityWatchOriginalContent: CommunityWatchAction
  /** Clear read history for user. */
  clearReadHistory: User
  /** Clear search history for user. */
  clearSearchHistory?: Maybe<Scalars['Boolean']['output']>
  /** Remove a spam comment as a Community Watch member. */
  communityWatchRemoveComment: Comment
  /** Confirm verification code from email. */
  confirmVerificationCode: Scalars['ID']['output']
  /** Create Stripe Connect account for Payout */
  connectStripeAccount: ConnectStripeAccountResult
  deleteAnnouncements: Scalars['Boolean']['output']
  /** Delete blocked search keywords from search_history db */
  deleteBlockedSearchKeywords?: Maybe<Scalars['Boolean']['output']>
  /** Remove articles from the collection. */
  deleteCollectionArticles: Collection
  deleteCollections: Scalars['Boolean']['output']
  /** Remove a comment. */
  deleteComment: Comment
  deleteCurationChannelArticles: CurationChannel
  /** Remove a draft. */
  deleteDraft?: Maybe<Scalars['Boolean']['output']>
  deleteMoment: Moment
  deleteTags?: Maybe<Scalars['Boolean']['output']>
  directImageUpload: Asset
  /** Edit an article. */
  editArticle: Article
  /** Login user. */
  emailLogin: AuthResult
  /** Get signing message. */
  generateSigningMessage: SigningMessageResult
  /** Invite others to join circle */
  invite?: Maybe<Array<Invitation>>
  likeCollection: Collection
  likeMoment: Moment
  /** Add specific user behavior record. */
  logRecord?: Maybe<Scalars['Boolean']['output']>
  /** Mark all received notices as read. */
  markAllNoticesAsRead?: Maybe<Scalars['Boolean']['output']>
  mergeTags: Tag
  /** Migrate articles from other service provider. */
  migration?: Maybe<Scalars['Boolean']['output']>
  /** Pay to another user or article */
  payTo: PayToResult
  /** Payout to user */
  payout: Transaction
  /** Pin a comment. */
  pinComment: Comment
  /** Publish an article onto IPFS. */
  publishArticle: Draft
  putAnnouncement: Announcement
  putArticleFederationSetting: ArticleFederationSetting
  /** Create or update a Circle. */
  putCircle: Circle
  /**
   * Add or remove Circle's articles
   * @deprecated No longer in use
   */
  putCircleArticles: Circle
  putCollection: Collection
  /** Publish or update a comment. */
  putComment: Comment
  putCurationChannel: CurationChannel
  /** Create or update a draft. */
  putDraft: Draft
  /** update tags for showing on profile page */
  putFeaturedTags?: Maybe<Array<Tag>>
  putIcymiTopic?: Maybe<IcymiTopic>
  putMoment: Moment
  /** Create or Update an OAuth Client, used in OSS. */
  putOAuthClient?: Maybe<OAuthClient>
  putRemark?: Maybe<Scalars['String']['output']>
  putRestrictedUsers: Array<User>
  putSkippedListItem?: Maybe<Array<SkippedListItem>>
  putTagChannel: Tag
  putTopicChannel: TopicChannel
  putUserFeatureFlags: Array<User>
  putUserFederationSetting: UserFederationSetting
  putWritingChallenge: WritingChallenge
  /** Read an article. */
  readArticle: Article
  /** Remove a social login from current user. */
  removeSocialLogin: User
  /** Remove a wallet login from current user. */
  removeWalletLogin: User
  renameTag: Tag
  reorderChannels: Scalars['Boolean']['output']
  /** Reorder articles in the collection. */
  reorderCollectionArticles: Collection
  /** Reset Liker ID */
  resetLikerId: User
  /** Reset user or payment password. */
  resetPassword?: Maybe<Scalars['Boolean']['output']>
  /** Restore a comment removed by Community Watch as staff. */
  restoreCommunityWatchComment: CommunityWatchAction
  reviewTopicChannelFeedback: TopicChannelFeedback
  sendCampaignAnnouncement?: Maybe<Scalars['Boolean']['output']>
  /** Send verification code for email. */
  sendVerificationCode?: Maybe<Scalars['Boolean']['output']>
  setAdStatus: Article
  /** Set current author's Fediverse federation preference for an article. */
  setArticleFederationSetting: ArticleFederationSetting
  setArticleTopicChannels: Article
  setBoost: Node
  /** Set user currency preference. */
  setCurrency: User
  /** Set user email. */
  setEmail: User
  setFeature: Feature
  /** Set user email login password. */
  setPassword: User
  setSpamStatus: Writing
  /** Set user name. */
  setUserName: User
  /** Set current viewer's Fediverse federation preference. */
  setViewerFederationSetting: UserFederationSetting
  /** Upload a single file. */
  singleFileUpload: Asset
  /** Login/Signup via social accounts. */
  socialLogin: AuthResult
  /** Submit inappropriate content report */
  submitReport: Report
  /** Feedback on topic channel classification */
  submitTopicChannelFeedback: TopicChannelFeedback
  /** Subscribe a Circle. */
  subscribeCircle: SubscribeCircleResult
  toggleArticleRecommend: Article
  /** Block or Unblock a given user. */
  toggleBlockUser: User
  toggleBookmarkArticle: Article
  toggleBookmarkTag: Tag
  /**
   * Follow or unfollow a Circle.
   * @deprecated No longer in use
   */
  toggleFollowCircle: Circle
  /**
   * Bookmark or unbookmark tag.
   * @deprecated Use toggleBookmarkTag instead
   */
  toggleFollowTag: Tag
  /** Follow or Unfollow current user. */
  toggleFollowUser: User
  togglePinChannelArticles: Array<Channel>
  /** Pin or Unpin a comment. */
  togglePinComment: Comment
  toggleSeedingUsers: Array<Maybe<User>>
  /**
   * Bookmark or unbookmark article
   * @deprecated Use toggleBookmarkArticle instead
   */
  toggleSubscribeArticle: Article
  toggleUsersBadge: Array<Maybe<User>>
  toggleWritingChallengeFeaturedArticles: Campaign
  unbindLikerId: User
  unlikeCollection: Collection
  unlikeMoment: Moment
  /** Unpin a comment. */
  unpinComment: Comment
  /** Unsubscribe a Circle. */
  unsubscribeCircle: Circle
  /** Unvote a comment. */
  unvoteComment: Comment
  updateArticleSensitive: Article
  updateArticleState: Article
  updateCampaignApplicationState: Campaign
  /** Update a comments' state. */
  updateCommentsState: Array<Comment>
  /** Update Community Watch appeal, review, or reason as staff. */
  updateCommunityWatchActionState: CommunityWatchAction
  /** Update user notification settings. */
  updateNotificationSetting: User
  /** Update referralCode of a user, used in OSS. */
  updateUserExtra: User
  /** Update user information. */
  updateUserInfo: User
  /** Update state of a user, used in OSS. */
  updateUserRole: User
  /** Update state of a user, used in OSS. */
  updateUserState?: Maybe<Array<User>>
  /** Logout user. */
  userLogout: Scalars['Boolean']['output']
  /** Verify user email. */
  verifyEmail: AuthResult
  /** Upvote or downvote a comment. */
  voteComment: Comment
  /** Login/Signup via a wallet. */
  walletLogin: AuthResult
  /** Withdraw locked ERC20/native token from donation vault */
  withdrawLockedTokens: WithdrawLockedTokensResult
}

export type MutationAddBlockedSearchKeywordArgs = {
  input: KeywordInput
}

export type MutationAddCollectionsArticlesArgs = {
  input: AddCollectionsArticlesInput
}

export type MutationAddCreditArgs = {
  input: AddCreditInput
}

export type MutationAddCurationChannelArticlesArgs = {
  input: AddCurationChannelArticlesInput
}

export type MutationAddSocialLoginArgs = {
  input: SocialLoginInput
}

export type MutationAddWalletLoginArgs = {
  input: WalletLoginInput
}

export type MutationApplyCampaignArgs = {
  input: ApplyCampaignInput
}

export type MutationAppreciateArticleArgs = {
  input: AppreciateArticleInput
}

export type MutationBanCampaignArticlesArgs = {
  input: BanCampaignArticlesInput
}

export type MutationClaimLogbooksArgs = {
  input: ClaimLogbooksInput
}

export type MutationClassifyArticlesChannelsArgs = {
  input: ClassifyArticlesChannelsInput
}

export type MutationClearCommunityWatchOriginalContentArgs = {
  input: ClearCommunityWatchOriginalContentInput
}

export type MutationClearReadHistoryArgs = {
  input: ClearReadHistoryInput
}

export type MutationCommunityWatchRemoveCommentArgs = {
  input: CommunityWatchRemoveCommentInput
}

export type MutationConfirmVerificationCodeArgs = {
  input: ConfirmVerificationCodeInput
}

export type MutationConnectStripeAccountArgs = {
  input: ConnectStripeAccountInput
}

export type MutationDeleteAnnouncementsArgs = {
  input: DeleteAnnouncementsInput
}

export type MutationDeleteBlockedSearchKeywordsArgs = {
  input: KeywordsInput
}

export type MutationDeleteCollectionArticlesArgs = {
  input: DeleteCollectionArticlesInput
}

export type MutationDeleteCollectionsArgs = {
  input: DeleteCollectionsInput
}

export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput
}

export type MutationDeleteCurationChannelArticlesArgs = {
  input: DeleteCurationChannelArticlesInput
}

export type MutationDeleteDraftArgs = {
  input: DeleteDraftInput
}

export type MutationDeleteMomentArgs = {
  input: DeleteMomentInput
}

export type MutationDeleteTagsArgs = {
  input: DeleteTagsInput
}

export type MutationDirectImageUploadArgs = {
  input: DirectImageUploadInput
}

export type MutationEditArticleArgs = {
  input: EditArticleInput
}

export type MutationEmailLoginArgs = {
  input: EmailLoginInput
}

export type MutationGenerateSigningMessageArgs = {
  input: GenerateSigningMessageInput
}

export type MutationInviteArgs = {
  input: InviteCircleInput
}

export type MutationLikeCollectionArgs = {
  input: LikeCollectionInput
}

export type MutationLikeMomentArgs = {
  input: LikeMomentInput
}

export type MutationLogRecordArgs = {
  input: LogRecordInput
}

export type MutationMergeTagsArgs = {
  input: MergeTagsInput
}

export type MutationMigrationArgs = {
  input: MigrationInput
}

export type MutationPayToArgs = {
  input: PayToInput
}

export type MutationPayoutArgs = {
  input: PayoutInput
}

export type MutationPinCommentArgs = {
  input: PinCommentInput
}

export type MutationPublishArticleArgs = {
  input: PublishArticleInput
}

export type MutationPutAnnouncementArgs = {
  input: PutAnnouncementInput
}

export type MutationPutArticleFederationSettingArgs = {
  input: PutArticleFederationSettingInput
}

export type MutationPutCircleArgs = {
  input: PutCircleInput
}

export type MutationPutCircleArticlesArgs = {
  input: PutCircleArticlesInput
}

export type MutationPutCollectionArgs = {
  input: PutCollectionInput
}

export type MutationPutCommentArgs = {
  input: PutCommentInput
}

export type MutationPutCurationChannelArgs = {
  input: PutCurationChannelInput
}

export type MutationPutDraftArgs = {
  input: PutDraftInput
}

export type MutationPutFeaturedTagsArgs = {
  input: FeaturedTagsInput
}

export type MutationPutIcymiTopicArgs = {
  input: PutIcymiTopicInput
}

export type MutationPutMomentArgs = {
  input: PutMomentInput
}

export type MutationPutOAuthClientArgs = {
  input: PutOAuthClientInput
}

export type MutationPutRemarkArgs = {
  input: PutRemarkInput
}

export type MutationPutRestrictedUsersArgs = {
  input: PutRestrictedUsersInput
}

export type MutationPutSkippedListItemArgs = {
  input: PutSkippedListItemInput
}

export type MutationPutTagChannelArgs = {
  input: PutTagChannelInput
}

export type MutationPutTopicChannelArgs = {
  input: PutTopicChannelInput
}

export type MutationPutUserFeatureFlagsArgs = {
  input: PutUserFeatureFlagsInput
}

export type MutationPutUserFederationSettingArgs = {
  input: PutUserFederationSettingInput
}

export type MutationPutWritingChallengeArgs = {
  input: PutWritingChallengeInput
}

export type MutationReadArticleArgs = {
  input: ReadArticleInput
}

export type MutationRemoveSocialLoginArgs = {
  input: RemoveSocialLoginInput
}

export type MutationRenameTagArgs = {
  input: RenameTagInput
}

export type MutationReorderChannelsArgs = {
  input: ReorderChannelsInput
}

export type MutationReorderCollectionArticlesArgs = {
  input: ReorderCollectionArticlesInput
}

export type MutationResetLikerIdArgs = {
  input: ResetLikerIdInput
}

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput
}

export type MutationRestoreCommunityWatchCommentArgs = {
  input: RestoreCommunityWatchCommentInput
}

export type MutationReviewTopicChannelFeedbackArgs = {
  input: ReviewTopicChannelFeedbackInput
}

export type MutationSendCampaignAnnouncementArgs = {
  input: SendCampaignAnnouncementInput
}

export type MutationSendVerificationCodeArgs = {
  input: SendVerificationCodeInput
}

export type MutationSetAdStatusArgs = {
  input: SetAdStatusInput
}

export type MutationSetArticleFederationSettingArgs = {
  input: SetArticleFederationSettingInput
}

export type MutationSetArticleTopicChannelsArgs = {
  input: SetArticleTopicChannelsInput
}

export type MutationSetBoostArgs = {
  input: SetBoostInput
}

export type MutationSetCurrencyArgs = {
  input: SetCurrencyInput
}

export type MutationSetEmailArgs = {
  input: SetEmailInput
}

export type MutationSetFeatureArgs = {
  input: SetFeatureInput
}

export type MutationSetPasswordArgs = {
  input: SetPasswordInput
}

export type MutationSetSpamStatusArgs = {
  input: SetSpamStatusInput
}

export type MutationSetUserNameArgs = {
  input: SetUserNameInput
}

export type MutationSetViewerFederationSettingArgs = {
  input: SetViewerFederationSettingInput
}

export type MutationSingleFileUploadArgs = {
  input: SingleFileUploadInput
}

export type MutationSocialLoginArgs = {
  input: SocialLoginInput
}

export type MutationSubmitReportArgs = {
  input: SubmitReportInput
}

export type MutationSubmitTopicChannelFeedbackArgs = {
  input: SubmitTopicChannelFeedbackInput
}

export type MutationSubscribeCircleArgs = {
  input: SubscribeCircleInput
}

export type MutationToggleArticleRecommendArgs = {
  input: ToggleRecommendInput
}

export type MutationToggleBlockUserArgs = {
  input: ToggleItemInput
}

export type MutationToggleBookmarkArticleArgs = {
  input: ToggleItemInput
}

export type MutationToggleBookmarkTagArgs = {
  input: ToggleItemInput
}

export type MutationToggleFollowCircleArgs = {
  input: ToggleItemInput
}

export type MutationToggleFollowTagArgs = {
  input: ToggleItemInput
}

export type MutationToggleFollowUserArgs = {
  input: ToggleItemInput
}

export type MutationTogglePinChannelArticlesArgs = {
  input: TogglePinChannelArticlesInput
}

export type MutationTogglePinCommentArgs = {
  input: ToggleItemInput
}

export type MutationToggleSeedingUsersArgs = {
  input: ToggleSeedingUsersInput
}

export type MutationToggleSubscribeArticleArgs = {
  input: ToggleItemInput
}

export type MutationToggleUsersBadgeArgs = {
  input: ToggleUsersBadgeInput
}

export type MutationToggleWritingChallengeFeaturedArticlesArgs = {
  input: ToggleWritingChallengeFeaturedArticlesInput
}

export type MutationUnbindLikerIdArgs = {
  input: UnbindLikerIdInput
}

export type MutationUnlikeCollectionArgs = {
  input: UnlikeCollectionInput
}

export type MutationUnlikeMomentArgs = {
  input: UnlikeMomentInput
}

export type MutationUnpinCommentArgs = {
  input: UnpinCommentInput
}

export type MutationUnsubscribeCircleArgs = {
  input: UnsubscribeCircleInput
}

export type MutationUnvoteCommentArgs = {
  input: UnvoteCommentInput
}

export type MutationUpdateArticleSensitiveArgs = {
  input: UpdateArticleSensitiveInput
}

export type MutationUpdateArticleStateArgs = {
  input: UpdateArticleStateInput
}

export type MutationUpdateCampaignApplicationStateArgs = {
  input: UpdateCampaignApplicationStateInput
}

export type MutationUpdateCommentsStateArgs = {
  input: UpdateCommentsStateInput
}

export type MutationUpdateCommunityWatchActionStateArgs = {
  input: UpdateCommunityWatchActionStateInput
}

export type MutationUpdateNotificationSettingArgs = {
  input: UpdateNotificationSettingInput
}

export type MutationUpdateUserExtraArgs = {
  input: UpdateUserExtraInput
}

export type MutationUpdateUserInfoArgs = {
  input: UpdateUserInfoInput
}

export type MutationUpdateUserRoleArgs = {
  input: UpdateUserRoleInput
}

export type MutationUpdateUserStateArgs = {
  input: UpdateUserStateInput
}

export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput
}

export type MutationVoteCommentArgs = {
  input: VoteCommentInput
}

export type MutationWalletLoginArgs = {
  input: WalletLoginInput
}

/**  NFT Asset  */
export type NftAsset = {
  __typename?: 'NFTAsset'
  collectionName: Scalars['String']['output']
  /** imageOriginalUrl: String! */
  contractAddress: Scalars['String']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  imagePreviewUrl?: Maybe<Scalars['String']['output']>
  imageUrl: Scalars['String']['output']
  name: Scalars['String']['output']
}

export type Node = {
  id: Scalars['ID']['output']
}

export type NodeInput = {
  id: Scalars['ID']['input']
}

export type NodesInput = {
  ids: Array<Scalars['ID']['input']>
}

/** This interface contains common fields of a notice. */
export type Notice = {
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']['output']
  /** Unique ID of this notice. */
  id: Scalars['ID']['output']
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']['output']
}

export type NoticeConnection = Connection & {
  __typename?: 'NoticeConnection'
  edges?: Maybe<Array<NoticeEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type NoticeEdge = {
  __typename?: 'NoticeEdge'
  cursor: Scalars['String']['output']
  node: Notice
}

export type NotificationSetting = {
  __typename?: 'NotificationSetting'
  articleNewAppreciation: Scalars['Boolean']['output']
  articleNewCollected: Scalars['Boolean']['output']
  articleNewComment: Scalars['Boolean']['output']
  articleNewSubscription: Scalars['Boolean']['output']
  circleMemberNewBroadcastReply: Scalars['Boolean']['output']
  circleMemberNewDiscussion: Scalars['Boolean']['output']
  circleMemberNewDiscussionReply: Scalars['Boolean']['output']
  circleNewFollower: Scalars['Boolean']['output']
  /** for circle owners */
  circleNewSubscriber: Scalars['Boolean']['output']
  circleNewUnsubscriber: Scalars['Boolean']['output']
  email: Scalars['Boolean']['output']
  /** for circle members & followers */
  inCircleNewArticle: Scalars['Boolean']['output']
  inCircleNewBroadcast: Scalars['Boolean']['output']
  inCircleNewBroadcastReply: Scalars['Boolean']['output']
  inCircleNewDiscussion: Scalars['Boolean']['output']
  inCircleNewDiscussionReply: Scalars['Boolean']['output']
  mention: Scalars['Boolean']['output']
  newComment: Scalars['Boolean']['output']
  newLike: Scalars['Boolean']['output']
  userNewFollower: Scalars['Boolean']['output']
}

export enum NotificationSettingType {
  ArticleNewAppreciation = 'articleNewAppreciation',
  ArticleNewCollected = 'articleNewCollected',
  ArticleNewComment = 'articleNewComment',
  ArticleNewSubscription = 'articleNewSubscription',
  CircleMemberBroadcast = 'circleMemberBroadcast',
  CircleMemberNewBroadcastReply = 'circleMemberNewBroadcastReply',
  CircleMemberNewDiscussion = 'circleMemberNewDiscussion',
  CircleMemberNewDiscussionReply = 'circleMemberNewDiscussionReply',
  CircleNewDiscussion = 'circleNewDiscussion',
  CircleNewFollower = 'circleNewFollower',
  /** for circle owners */
  CircleNewSubscriber = 'circleNewSubscriber',
  CircleNewUnsubscriber = 'circleNewUnsubscriber',
  Email = 'email',
  /** for circle members */
  InCircleNewArticle = 'inCircleNewArticle',
  InCircleNewBroadcast = 'inCircleNewBroadcast',
  InCircleNewBroadcastReply = 'inCircleNewBroadcastReply',
  InCircleNewDiscussion = 'inCircleNewDiscussion',
  InCircleNewDiscussionReply = 'inCircleNewDiscussionReply',
  Mention = 'mention',
  NewComment = 'newComment',
  NewLike = 'newLike',
  UserNewFollower = 'userNewFollower',
}

export type OAuthClient = {
  __typename?: 'OAuthClient'
  /** URL for oauth client's avatar. */
  avatar?: Maybe<Scalars['String']['output']>
  /** Creation Date */
  createdAt: Scalars['DateTime']['output']
  /** App Description */
  description?: Maybe<Scalars['String']['output']>
  /** Grant Types */
  grantTypes?: Maybe<Array<GrantType>>
  /** Unique Client ID of this OAuth Client. */
  id: Scalars['ID']['output']
  /** App name */
  name: Scalars['String']['output']
  /** Redirect URIs */
  redirectURIs?: Maybe<Array<Scalars['String']['output']>>
  /** Scopes */
  scope?: Maybe<Array<Scalars['String']['output']>>
  /** Client secret */
  secret: Scalars['String']['output']
  /** Linked Developer Account */
  user?: Maybe<User>
  /** URL for oauth client's official website */
  website?: Maybe<Scalars['String']['output']>
}

export type OAuthClientConnection = Connection & {
  __typename?: 'OAuthClientConnection'
  edges?: Maybe<Array<OAuthClientEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type OAuthClientEdge = {
  __typename?: 'OAuthClientEdge'
  cursor: Scalars['String']['output']
  node: OAuthClient
}

export type OAuthClientInput = {
  id: Scalars['ID']['input']
}

export type Oss = {
  __typename?: 'OSS'
  articles: ArticleConnection
  badgedUsers: UserConnection
  comments: CommentConnection
  icymiTopics: IcymiTopicConnection
  moments: MomentConnection
  oauthClients: OAuthClientConnection
  reports: ReportConnection
  restrictedUsers: UserConnection
  seedingUsers: UserConnection
  skippedListItems: SkippedListItemsConnection
  tags: TagConnection
  topicChannelFeedbacks: TopicChannelFeedbackConnection
  users: UserConnection
}

export type OssArticlesArgs = {
  input: OssArticlesInput
}

export type OssBadgedUsersArgs = {
  input: BadgedUsersInput
}

export type OssCommentsArgs = {
  input: ConnectionArgs
}

export type OssIcymiTopicsArgs = {
  input: ConnectionArgs
}

export type OssMomentsArgs = {
  input: ConnectionArgs
}

export type OssOauthClientsArgs = {
  input: ConnectionArgs
}

export type OssReportsArgs = {
  input: ConnectionArgs
}

export type OssRestrictedUsersArgs = {
  input: ConnectionArgs
}

export type OssSeedingUsersArgs = {
  input: ConnectionArgs
}

export type OssSkippedListItemsArgs = {
  input: SkippedListItemsInput
}

export type OssTagsArgs = {
  input: TagsInput
}

export type OssTopicChannelFeedbacksArgs = {
  input: TopicChannelFeedbacksInput
}

export type OssUsersArgs = {
  input: ConnectionArgs
}

export type OssArticlesFilterInput = {
  datetimeRange?: InputMaybe<DatetimeRangeInput>
  isSpam?: InputMaybe<Scalars['Boolean']['input']>
  searchKey?: InputMaybe<Scalars['String']['input']>
}

export type OssArticlesInput = {
  after?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<OssArticlesFilterInput>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  sort?: InputMaybe<ArticlesSort>
}

export type Oauth1CredentialInput = {
  oauthToken: Scalars['String']['input']
  oauthVerifier: Scalars['String']['input']
}

/** This type contains system-wise info and settings. */
export type Official = {
  __typename?: 'Official'
  /** Announcements */
  announcements?: Maybe<Array<Announcement>>
  /** Feature flag */
  features: Array<Feature>
  gatewayUrls?: Maybe<Array<Scalars['String']['output']>>
}

/** This type contains system-wise info and settings. */
export type OfficialAnnouncementsArgs = {
  input: AnnouncementsInput
}

/** The notice type contains info about official announcement. */
export type OfficialAnnouncementNotice = Notice & {
  __typename?: 'OfficialAnnouncementNotice'
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']['output']
  /** Unique ID of this notice. */
  id: Scalars['ID']['output']
  /** The link to a specific page if provided. */
  link?: Maybe<Scalars['String']['output']>
  /** The message content. */
  message: Scalars['String']['output']
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']['output']
}

export type OnboardingTasks = {
  __typename?: 'OnboardingTasks'
  enabled: Scalars['Boolean']['output']
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['String']['output']>
  hasNextPage: Scalars['Boolean']['output']
  hasPreviousPage: Scalars['Boolean']['output']
  startCursor?: Maybe<Scalars['String']['output']>
}

export type PayToInput = {
  amount: Scalars['amount_Float_NotNull_exclusiveMin_0']['input']
  /** for ERC20/native token payment */
  chain?: InputMaybe<Chain>
  currency: TransactionCurrency
  id?: InputMaybe<Scalars['ID']['input']>
  /** for HKD payment */
  password?: InputMaybe<Scalars['String']['input']>
  purpose: TransactionPurpose
  recipientId: Scalars['ID']['input']
  targetId?: InputMaybe<Scalars['ID']['input']>
  txHash?: InputMaybe<Scalars['String']['input']>
}

export type PayToResult = {
  __typename?: 'PayToResult'
  /** Only available when paying with LIKE. */
  redirectUrl?: Maybe<Scalars['String']['output']>
  transaction: Transaction
}

export type PayoutInput = {
  amount: Scalars['amount_Float_NotNull_exclusiveMin_0']['input']
  password: Scalars['String']['input']
}

export type Person = {
  __typename?: 'Person'
  email: Scalars['email_String_NotNull_format_email']['output']
}

export type PinCommentInput = {
  id: Scalars['ID']['input']
}

export type PinHistory = {
  __typename?: 'PinHistory'
  /** Which feed (IcymiTopic / Channel) the article was pinned */
  feed: Node
  pinnedAt: Scalars['DateTime']['output']
}

export type PinnableWork = {
  cover?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  pinned: Scalars['Boolean']['output']
  title: Scalars['String']['output']
}

export type Price = {
  __typename?: 'Price'
  /** Amount of Price. */
  amount: Scalars['Float']['output']
  /** Current Price belongs to whcih Circle. */
  circle: Circle
  /**
   * Created time.
   * @deprecated No longer in use
   */
  createdAt: Scalars['DateTime']['output']
  /** Currency of Price. */
  currency: TransactionCurrency
  /** Unique ID. */
  id: Scalars['ID']['output']
  /** State of Price. */
  state: PriceState
  /**
   * Updated time.
   * @deprecated No longer in use
   */
  updatedAt: Scalars['DateTime']['output']
}

export enum PriceState {
  Active = 'active',
  Archived = 'archived',
}

export type PublishArticleInput = {
  id: Scalars['ID']['input']
  /** whether publish to ISCN */
  iscnPublish?: InputMaybe<Scalars['Boolean']['input']>
  /** Scheduled publish date of the article. */
  publishAt?: InputMaybe<Scalars['DateTime']['input']>
}

/** Enums for publishing state. */
export enum PublishState {
  Error = 'error',
  Pending = 'pending',
  Published = 'published',
  Unpublished = 'unpublished',
}

export type PutAnnouncementInput = {
  channels?: InputMaybe<Array<AnnouncementChannelInput>>
  content?: InputMaybe<Array<TranslationInput>>
  cover?: InputMaybe<Scalars['String']['input']>
  expiredAt?: InputMaybe<Scalars['DateTime']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  link?: InputMaybe<Array<TranslationInput>>
  order?: InputMaybe<Scalars['Int']['input']>
  title?: InputMaybe<Array<TranslationInput>>
  type?: InputMaybe<AnnouncementType>
  visible?: InputMaybe<Scalars['Boolean']['input']>
}

export type PutArticleFederationSettingInput = {
  id: Scalars['ID']['input']
  state: FederationArticleSettingState
}

export type PutCircleArticlesInput = {
  /** Access Type, `public` or `paywall` only. */
  accessType: ArticleAccessType
  /** Article Ids */
  articles?: InputMaybe<Array<Scalars['ID']['input']>>
  /** Circle ID */
  id: Scalars['ID']['input']
  license?: InputMaybe<ArticleLicenseType>
  /** Action Type */
  type: PutCircleArticlesType
}

export enum PutCircleArticlesType {
  Add = 'add',
  Remove = 'remove',
}

export type PutCircleInput = {
  /** Circle's subscription fee. */
  amount?: InputMaybe<Scalars['amount_Float_exclusiveMin_0']['input']>
  /** Unique ID of a Circle's avatar. */
  avatar?: InputMaybe<Scalars['ID']['input']>
  /** Unique ID of a Circle's cover. */
  cover?: InputMaybe<Scalars['ID']['input']>
  /** A short description of this Circle. */
  description?: InputMaybe<Scalars['String']['input']>
  /** Human readable name of this Circle. */
  displayName?: InputMaybe<Scalars['String']['input']>
  /** Unique ID. */
  id?: InputMaybe<Scalars['ID']['input']>
  /** Slugified name of a Circle. */
  name?: InputMaybe<Scalars['String']['input']>
}

export type PutCollectionInput = {
  cover?: InputMaybe<Scalars['ID']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  pinned?: InputMaybe<Scalars['Boolean']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type PutCommentInput = {
  comment: CommentInput
  id?: InputMaybe<Scalars['ID']['input']>
}

export type PutCurationChannelInput = {
  activePeriod?: InputMaybe<DatetimeRangeInput>
  color?: InputMaybe<Color>
  id?: InputMaybe<Scalars['ID']['input']>
  name?: InputMaybe<Array<TranslationInput>>
  navbarTitle?: InputMaybe<Array<TranslationInput>>
  note?: InputMaybe<Array<TranslationInput>>
  pinAmount?: InputMaybe<Scalars['Int']['input']>
  showRecommendation?: InputMaybe<Scalars['Boolean']['input']>
  state?: InputMaybe<CurationChannelState>
}

export type PutDraftInput = {
  accessType?: InputMaybe<ArticleAccessType>
  /** Which campaigns to attach */
  campaigns?: InputMaybe<Array<ArticleCampaignInput>>
  /** Whether readers can comment */
  canComment?: InputMaybe<Scalars['Boolean']['input']>
  circle?: InputMaybe<Scalars['ID']['input']>
  /** Deprecated, use connections instead */
  collection?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  /** Add article to these collections when published */
  collections?: InputMaybe<Array<Scalars['ID']['input']>>
  connections?: InputMaybe<Array<Scalars['ID']['input']>>
  content?: InputMaybe<Scalars['String']['input']>
  cover?: InputMaybe<Scalars['ID']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  indentFirstLine?: InputMaybe<Scalars['Boolean']['input']>
  /** Whether publish to ISCN */
  iscnPublish?: InputMaybe<Scalars['Boolean']['input']>
  /** Last known update timestamp for version conflict detection */
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>
  license?: InputMaybe<ArticleLicenseType>
  replyToDonator?: InputMaybe<
    Scalars['replyToDonator_String_maxLength_140']['input']
  >
  requestForDonation?: InputMaybe<
    Scalars['requestForDonation_String_maxLength_140']['input']
  >
  sensitive?: InputMaybe<Scalars['Boolean']['input']>
  summary?: InputMaybe<Scalars['String']['input']>
  tags?: InputMaybe<Array<Scalars['String']['input']>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type PutIcymiTopicInput = {
  articles?: InputMaybe<Array<Scalars['ID']['input']>>
  id?: InputMaybe<Scalars['ID']['input']>
  note?: InputMaybe<Array<TranslationInput>>
  pinAmount?: InputMaybe<Scalars['Int']['input']>
  state?: InputMaybe<IcymiTopicState>
  title?: InputMaybe<Array<TranslationInput>>
}

export type PutMomentInput = {
  articles?: InputMaybe<Array<Scalars['ID']['input']>>
  assets?: InputMaybe<Array<Scalars['ID']['input']>>
  content: Scalars['String']['input']
  tags?: InputMaybe<Array<Scalars['String']['input']>>
}

export type PutOAuthClientInput = {
  avatar?: InputMaybe<Scalars['ID']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  grantTypes?: InputMaybe<Array<GrantType>>
  id?: InputMaybe<Scalars['ID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  redirectURIs?: InputMaybe<Array<Scalars['String']['input']>>
  scope?: InputMaybe<Array<Scalars['String']['input']>>
  secret?: InputMaybe<Scalars['String']['input']>
  user?: InputMaybe<Scalars['ID']['input']>
  website?: InputMaybe<Scalars['website_String_format_uri']['input']>
}

export type PutRemarkInput = {
  id: Scalars['ID']['input']
  remark: Scalars['String']['input']
  type: RemarkTypes
}

export type PutRestrictedUsersInput = {
  ids: Array<Scalars['ID']['input']>
  restrictions: Array<UserRestrictionType>
}

export type PutSkippedListItemInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  type?: InputMaybe<SkippedListItemType>
  value?: InputMaybe<Scalars['String']['input']>
}

export type PutTagChannelInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>
  id: Scalars['ID']['input']
  navbarTitle?: InputMaybe<Array<TranslationInput>>
}

export type PutTopicChannelInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  name?: InputMaybe<Array<TranslationInput>>
  navbarTitle?: InputMaybe<Array<TranslationInput>>
  note?: InputMaybe<Array<TranslationInput>>
  providerId?: InputMaybe<Scalars['String']['input']>
  subChannels?: InputMaybe<Array<Scalars['ID']['input']>>
}

export type PutUserFeatureFlagsInput = {
  flags: Array<UserFeatureFlagType>
  ids: Array<Scalars['ID']['input']>
}

export type PutUserFederationSettingInput = {
  id: Scalars['ID']['input']
  state: FederationAuthorSettingState
}

export type PutWritingChallengeInput = {
  announcements?: InputMaybe<Array<Scalars['ID']['input']>>
  applicationPeriod?: InputMaybe<DatetimeRangeInput>
  channelEnabled?: InputMaybe<Scalars['Boolean']['input']>
  cover?: InputMaybe<Scalars['ID']['input']>
  description?: InputMaybe<Array<TranslationInput>>
  /** exclude articles of this campaign in topic channels and newest */
  exclusive?: InputMaybe<Scalars['Boolean']['input']>
  featuredDescription?: InputMaybe<Array<TranslationInput>>
  id?: InputMaybe<Scalars['ID']['input']>
  link?: InputMaybe<Scalars['String']['input']>
  managers?: InputMaybe<Array<Scalars['ID']['input']>>
  name?: InputMaybe<Array<TranslationInput>>
  navbarTitle?: InputMaybe<Array<TranslationInput>>
  newStages?: InputMaybe<Array<CampaignStageInput>>
  organizers?: InputMaybe<Array<Scalars['ID']['input']>>
  showAd?: InputMaybe<Scalars['Boolean']['input']>
  showOther?: InputMaybe<Scalars['Boolean']['input']>
  stages?: InputMaybe<Array<CampaignStageInput>>
  state?: InputMaybe<CampaignState>
  writingPeriod?: InputMaybe<DatetimeRangeInput>
}

export type Query = {
  __typename?: 'Query'
  article?: Maybe<Article>
  campaign?: Maybe<Campaign>
  campaignOrganizers: UserConnection
  campaigns: CampaignConnection
  channel?: Maybe<Channel>
  channels: Array<Channel>
  circle?: Maybe<Circle>
  clientPreference: ClientPreference
  /** One public Community Watch audit record. */
  communityWatchAction?: Maybe<CommunityWatchAction>
  /** Recent public Community Watch audit records. */
  communityWatchActions: CommunityWatchActionConnection
  exchangeRates?: Maybe<Array<ExchangeRate>>
  frequentSearch?: Maybe<Array<Scalars['String']['output']>>
  lastFetchRandom: LastFetchRandom
  moment?: Maybe<Moment>
  node?: Maybe<Node>
  nodes?: Maybe<Array<Node>>
  oauthClient?: Maybe<OAuthClient>
  oauthRequestToken?: Maybe<Scalars['String']['output']>
  official: Official
  oss: Oss
  search: SearchResultConnection
  user?: Maybe<User>
  viewer?: Maybe<User>
}

export type QueryArticleArgs = {
  input: ArticleInput
}

export type QueryCampaignArgs = {
  input: CampaignInput
}

export type QueryCampaignOrganizersArgs = {
  input: ConnectionArgs
}

export type QueryCampaignsArgs = {
  input: CampaignsInput
}

export type QueryChannelArgs = {
  input: ChannelInput
}

export type QueryChannelsArgs = {
  input?: InputMaybe<ChannelsInput>
}

export type QueryCircleArgs = {
  input: CircleInput
}

export type QueryCommunityWatchActionArgs = {
  input: CommunityWatchActionInput
}

export type QueryCommunityWatchActionsArgs = {
  input: CommunityWatchActionsInput
}

export type QueryExchangeRatesArgs = {
  input?: InputMaybe<ExchangeRatesInput>
}

export type QueryFrequentSearchArgs = {
  input: FrequentSearchInput
}

export type QueryMomentArgs = {
  input: MomentInput
}

export type QueryNodeArgs = {
  input: NodeInput
}

export type QueryNodesArgs = {
  input: NodesInput
}

export type QueryOauthClientArgs = {
  input: OAuthClientInput
}

export type QuerySearchArgs = {
  input: SearchInput
}

export type QueryUserArgs = {
  input: UserInput
}

export enum QuoteCurrency {
  Hkd = 'HKD',
  Twd = 'TWD',
  Usd = 'USD',
}

export type ReadArticleInput = {
  id: Scalars['ID']['input']
}

export type ReadHistory = {
  __typename?: 'ReadHistory'
  article: Article
  readAt: Scalars['DateTime']['output']
}

export type ReadHistoryConnection = Connection & {
  __typename?: 'ReadHistoryConnection'
  edges?: Maybe<Array<ReadHistoryEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type ReadHistoryEdge = {
  __typename?: 'ReadHistoryEdge'
  cursor: Scalars['String']['output']
  node: ReadHistory
}

export type RecentSearchConnection = Connection & {
  __typename?: 'RecentSearchConnection'
  edges?: Maybe<Array<RecentSearchEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type RecentSearchEdge = {
  __typename?: 'RecentSearchEdge'
  cursor: Scalars['String']['output']
  node: Scalars['String']['output']
}

export type RecommendFilterInput = {
  channel?: InputMaybe<IdentityInput>
  /** filter out followed users */
  followed?: InputMaybe<Scalars['Boolean']['input']>
  /** index of list, min: 0, max: 49 */
  random?: InputMaybe<Scalars['random_Int_min_0_max_49']['input']>
}

export type RecommendInput = {
  after?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<RecommendFilterInput>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  newAlgo?: InputMaybe<Scalars['Boolean']['input']>
  oss?: InputMaybe<Scalars['Boolean']['input']>
}

/** Enums for types of recommend articles. */
export enum RecommendTypes {
  Hottest = 'hottest',
  Icymi = 'icymi',
  Newest = 'newest',
  Search = 'search',
}

export type Recommendation = {
  __typename?: 'Recommendation'
  /** Global user list, sort by activities in recent 6 month. */
  authors: UserConnection
  /** Activities based on user's following, sort by creation time. */
  following: FollowingActivityConnection
  /** Global articles sort by latest activity time. */
  hottest: ArticleConnection
  /** 'In case you missed it' recommendation. */
  icymi: ArticleConnection
  /** 'In case you missed it' topic. */
  icymiTopic?: Maybe<IcymiTopic>
  /** Global articles sort by publish time. */
  newest: ArticleConnection
  /** Global tag list, sort by activities in recent 14 days. */
  tags: TagConnection
}

export type RecommendationAuthorsArgs = {
  input: RecommendInput
}

export type RecommendationFollowingArgs = {
  input: RecommendationFollowingInput
}

export type RecommendationHottestArgs = {
  input: RecommendInput
}

export type RecommendationIcymiArgs = {
  input: ConnectionArgs
}

export type RecommendationNewestArgs = {
  input: RecommendationNewestInput
}

export type RecommendationTagsArgs = {
  input: RecommendInput
}

export type RecommendationFollowingFilterInput = {
  type?: InputMaybe<RecommendationFollowingFilterType>
}

export enum RecommendationFollowingFilterType {
  Article = 'article',
}

export type RecommendationFollowingInput = {
  after?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<RecommendationFollowingFilterInput>
  first?: InputMaybe<Scalars['Int']['input']>
}

export type RecommendationNewestInput = {
  after?: InputMaybe<Scalars['String']['input']>
  excludeChannelArticles?: InputMaybe<Scalars['Boolean']['input']>
  filter?: InputMaybe<FilterInput>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  oss?: InputMaybe<Scalars['Boolean']['input']>
}

export type RefreshIpnsFeedInput = {
  /** refresh how many recent articles, default to 50 */
  numArticles?: InputMaybe<Scalars['Int']['input']>
  userName: Scalars['String']['input']
}

export type RelatedDonationArticlesInput = {
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  oss?: InputMaybe<Scalars['Boolean']['input']>
  /** index of article list, min: 0, max: 49 */
  random?: InputMaybe<Scalars['random_Int_min_0_max_49']['input']>
}

export enum RemarkTypes {
  Article = 'Article',
  Comment = 'Comment',
  Feedback = 'Feedback',
  Report = 'Report',
  Tag = 'Tag',
  User = 'User',
}

export type RemoveSocialLoginInput = {
  type: SocialAccountType
}

export type RenameTagInput = {
  content: Scalars['String']['input']
  id: Scalars['ID']['input']
}

export type ReorderChannelsInput = {
  ids: Array<Scalars['ID']['input']>
}

export type ReorderCollectionArticlesInput = {
  collection: Scalars['ID']['input']
  moves: Array<ReorderMoveInput>
}

export type ReorderMoveInput = {
  item: Scalars['ID']['input']
  /** The new position move to. To move item to the beginning of the list, set to 0. To the end of the list, set to the length of the list - 1. */
  newPosition: Scalars['Int']['input']
}

export type Report = Node & {
  __typename?: 'Report'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  reason: ReportReason
  reporter: User
  target: Node
}

export type ReportConnection = Connection & {
  __typename?: 'ReportConnection'
  edges?: Maybe<Array<ReportEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type ReportEdge = {
  __typename?: 'ReportEdge'
  cursor: Scalars['String']['output']
  node: Report
}

export enum ReportReason {
  DiscriminationInsultHatred = 'discrimination_insult_hatred',
  IllegalAdvertising = 'illegal_advertising',
  Other = 'other',
  PornographyInvolvingMinors = 'pornography_involving_minors',
  Tort = 'tort',
}

export type ResetLikerIdInput = {
  id: Scalars['ID']['input']
}

export type ResetPasswordInput = {
  codeId: Scalars['ID']['input']
  password: Scalars['String']['input']
  type?: InputMaybe<ResetPasswordType>
}

export enum ResetPasswordType {
  Account = 'account',
  Payment = 'payment',
}

export type Response = Article | Comment

export type ResponseConnection = Connection & {
  __typename?: 'ResponseConnection'
  edges?: Maybe<Array<ResponseEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type ResponseEdge = {
  __typename?: 'ResponseEdge'
  cursor: Scalars['String']['output']
  node: Response
}

/** Enums for sorting responses. */
export enum ResponseSort {
  Newest = 'newest',
  Oldest = 'oldest',
}

export type ResponsesInput = {
  after?: InputMaybe<Scalars['String']['input']>
  articleOnly?: InputMaybe<Scalars['Boolean']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  includeAfter?: InputMaybe<Scalars['Boolean']['input']>
  includeBefore?: InputMaybe<Scalars['Boolean']['input']>
  sort?: InputMaybe<ResponseSort>
}

export type RestoreCommunityWatchCommentInput = {
  note?: InputMaybe<Scalars['String']['input']>
  uuid: Scalars['ID']['input']
}

export type ReviewTopicChannelFeedbackInput = {
  action: TopicChannelFeedbackAction
  feedback: Scalars['ID']['input']
}

/** Enums for user roles. */
export enum Role {
  Admin = 'admin',
  User = 'user',
  Vistor = 'vistor',
}

export enum SearchApiVersion {
  V20230301 = 'v20230301',
  V20230601 = 'v20230601',
}

export enum SearchExclude {
  Blocked = 'blocked',
}

export type SearchFilter = {
  authorId?: InputMaybe<Scalars['ID']['input']>
}

export type SearchInput = {
  after?: InputMaybe<Scalars['String']['input']>
  /** specific condition for rule data out */
  exclude?: InputMaybe<SearchExclude>
  /** extra query filter for searching */
  filter?: InputMaybe<SearchFilter>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  /** should include tags used by author */
  includeAuthorTags?: InputMaybe<Scalars['Boolean']['input']>
  /** search keyword */
  key: Scalars['String']['input']
  oss?: InputMaybe<Scalars['Boolean']['input']>
  quicksearch?: InputMaybe<Scalars['Boolean']['input']>
  /** whether this search operation should be recorded in search history */
  record?: InputMaybe<Scalars['Boolean']['input']>
  /** types of search target */
  type: SearchTypes
}

export type SearchResultConnection = Connection & {
  __typename?: 'SearchResultConnection'
  edges?: Maybe<Array<SearchResultEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type SearchResultEdge = {
  __typename?: 'SearchResultEdge'
  cursor: Scalars['String']['output']
  node: Node
}

export enum SearchTypes {
  Article = 'Article',
  Tag = 'Tag',
  User = 'User',
}

export type SendCampaignAnnouncementInput = {
  announcement: Array<TranslationInput>
  campaign: Scalars['ID']['input']
  link: Scalars['link_String_NotNull_format_uri']['input']
  password: Scalars['String']['input']
}

export type SendVerificationCodeInput = {
  email: Scalars['email_String_NotNull_format_email']['input']
  /** email content language */
  language?: InputMaybe<UserLanguage>
  /**
   * Redirect URL embedded in the verification email,
   * use code instead if not provided.
   */
  redirectUrl?: InputMaybe<Scalars['redirectUrl_String_format_uri']['input']>
  token?: InputMaybe<Scalars['String']['input']>
  type: VerificationCodeType
}

export type SetAdStatusInput = {
  id: Scalars['ID']['input']
  isAd: Scalars['Boolean']['input']
}

export type SetArticleFederationSettingInput = {
  id: Scalars['ID']['input']
  state: FederationArticleSettingState
}

export type SetArticleTopicChannelsInput = {
  channels: Array<Scalars['ID']['input']>
  id: Scalars['ID']['input']
}

export type SetBoostInput = {
  boost: Scalars['boost_Float_NotNull_min_0']['input']
  id: Scalars['ID']['input']
  type: BoostTypes
}

export type SetCurrencyInput = {
  currency?: InputMaybe<QuoteCurrency>
}

export type SetEmailInput = {
  email: Scalars['String']['input']
}

export type SetFeatureInput = {
  flag: FeatureFlag
  name: FeatureName
  value?: InputMaybe<Scalars['Float']['input']>
}

export type SetPasswordInput = {
  password: Scalars['String']['input']
}

export type SetSpamStatusInput = {
  id: Scalars['ID']['input']
  isSpam: Scalars['Boolean']['input']
}

export type SetUserNameInput = {
  userName: Scalars['String']['input']
}

export type SetViewerFederationSettingInput = {
  state: FederationAuthorSettingState
}

export enum SigningMessagePurpose {
  Airdrop = 'airdrop',
  ClaimLogbook = 'claimLogbook',
  Connect = 'connect',
  Login = 'login',
  Signup = 'signup',
}

export type SigningMessageResult = {
  __typename?: 'SigningMessageResult'
  createdAt: Scalars['DateTime']['output']
  expiredAt: Scalars['DateTime']['output']
  nonce: Scalars['String']['output']
  purpose: SigningMessagePurpose
  signingMessage: Scalars['String']['output']
}

export type SingleFileUploadInput = {
  draft?: InputMaybe<Scalars['Boolean']['input']>
  entityId?: InputMaybe<Scalars['ID']['input']>
  entityType: EntityType
  file?: InputMaybe<Scalars['Upload']['input']>
  type: AssetType
  url?: InputMaybe<Scalars['url_String_format_uri']['input']>
}

export type SkippedListItem = {
  __typename?: 'SkippedListItem'
  archived: Scalars['Boolean']['output']
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  type: SkippedListItemType
  updatedAt: Scalars['DateTime']['output']
  uuid: Scalars['ID']['output']
  value: Scalars['String']['output']
}

export type SkippedListItemEdge = {
  __typename?: 'SkippedListItemEdge'
  cursor: Scalars['String']['output']
  node?: Maybe<SkippedListItem>
}

export enum SkippedListItemType {
  AgentHash = 'agent_hash',
  Domain = 'domain',
  Email = 'email',
}

export type SkippedListItemsConnection = Connection & {
  __typename?: 'SkippedListItemsConnection'
  edges?: Maybe<Array<SkippedListItemEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type SkippedListItemsInput = {
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  type?: InputMaybe<SkippedListItemType>
}

export type SocialAccount = {
  __typename?: 'SocialAccount'
  email?: Maybe<Scalars['String']['output']>
  type: SocialAccountType
  userName?: Maybe<Scalars['String']['output']>
}

export enum SocialAccountType {
  Facebook = 'Facebook',
  Google = 'Google',
  Threads = 'Threads',
  Twitter = 'Twitter',
}

export type SocialLoginInput = {
  authorizationCode?: InputMaybe<Scalars['String']['input']>
  /** OAuth2 PKCE code_verifier for Facebook and Twitter */
  codeVerifier?: InputMaybe<Scalars['String']['input']>
  /** used in register */
  language?: InputMaybe<UserLanguage>
  /** OIDC nonce for Google */
  nonce?: InputMaybe<Scalars['String']['input']>
  /** oauth token/verifier in OAuth1.0a for Twitter */
  oauth1Credential?: InputMaybe<Oauth1CredentialInput>
  referralCode?: InputMaybe<Scalars['String']['input']>
  type: SocialAccountType
}

export type SpamStatus = {
  __typename?: 'SpamStatus'
  /** Whether this work is labeled as spam by human, null for not labeled yet.  */
  isSpam?: Maybe<Scalars['Boolean']['output']>
  /** Spam confident score by machine, null for not checked yet.  */
  score?: Maybe<Scalars['Float']['output']>
}

export type StripeAccount = {
  __typename?: 'StripeAccount'
  id: Scalars['ID']['output']
  loginUrl: Scalars['String']['output']
}

export enum StripeAccountCountry {
  Australia = 'Australia',
  Austria = 'Austria',
  Belgium = 'Belgium',
  Bulgaria = 'Bulgaria',
  Canada = 'Canada',
  Cyprus = 'Cyprus',
  Denmark = 'Denmark',
  Estonia = 'Estonia',
  Finland = 'Finland',
  France = 'France',
  Germany = 'Germany',
  Greece = 'Greece',
  HongKong = 'HongKong',
  Ireland = 'Ireland',
  Italy = 'Italy',
  Latvia = 'Latvia',
  Lithuania = 'Lithuania',
  Luxembourg = 'Luxembourg',
  Malta = 'Malta',
  Netherlands = 'Netherlands',
  NewZealand = 'NewZealand',
  Norway = 'Norway',
  Poland = 'Poland',
  Portugal = 'Portugal',
  Romania = 'Romania',
  Singapore = 'Singapore',
  Slovakia = 'Slovakia',
  Slovenia = 'Slovenia',
  Spain = 'Spain',
  Sweden = 'Sweden',
  UnitedKingdom = 'UnitedKingdom',
  UnitedStates = 'UnitedStates',
}

export type SubmitReportInput = {
  reason: ReportReason
  targetId: Scalars['ID']['input']
}

export type SubmitTopicChannelFeedbackInput = {
  article: Scalars['ID']['input']
  channels?: InputMaybe<Array<Scalars['ID']['input']>>
  type: TopicChannelFeedbackType
}

export type SubscribeCircleInput = {
  /** Unique ID. */
  id: Scalars['ID']['input']
  /** Wallet password. */
  password?: InputMaybe<Scalars['String']['input']>
}

export type SubscribeCircleResult = {
  __typename?: 'SubscribeCircleResult'
  circle: Circle
  /** client secret for SetupIntent. */
  client_secret?: Maybe<Scalars['String']['output']>
}

/** This type contains content, count and related data of an article tag. */
export type Tag = Channel &
  Node & {
    __typename?: 'Tag'
    /** List of articles were attached with this tag. */
    articles: ChannelArticleConnection
    /** Whether this tag is enabled as a channel */
    channelEnabled: Scalars['Boolean']['output']
    /** Content of this tag. */
    content: Scalars['String']['output']
    /** Time of this tag was created. */
    createdAt: Scalars['DateTime']['output']
    deleted: Scalars['Boolean']['output']
    /** Unique id of this tag. */
    id: Scalars['ID']['output']
    /** This value determines if current viewer is following or not. */
    isFollower?: Maybe<Scalars['Boolean']['output']>
    /** Navbar title for this tag channel */
    navbarTitle: Scalars['String']['output']
    /** Counts of this tag. */
    numArticles: Scalars['Int']['output']
    numAuthors: Scalars['Int']['output']
    numMoments: Scalars['Int']['output']
    oss: TagOss
    /** Tags recommended based on relations to current tag. */
    recommended: TagConnection
    /** Authors recommended based on relations to current tag. */
    recommendedAuthors: UserConnection
    remark?: Maybe<Scalars['String']['output']>
    /** Short hash for shorter url addressing */
    shortHash: Scalars['String']['output']
    /** Articles and moments were attached with this tag. */
    writings: TagWritingConnection
  }

/** This type contains content, count and related data of an article tag. */
export type TagArticlesArgs = {
  input: TagArticlesInput
}

/** This type contains content, count and related data of an article tag. */
export type TagNavbarTitleArgs = {
  input?: InputMaybe<TranslationArgs>
}

/** This type contains content, count and related data of an article tag. */
export type TagRecommendedArgs = {
  input: RecommendInput
}

/** This type contains content, count and related data of an article tag. */
export type TagRecommendedAuthorsArgs = {
  input: ConnectionArgs
}

/** This type contains content, count and related data of an article tag. */
export type TagWritingsArgs = {
  input: WritingInput
}

export type TagArticlesInput = {
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  oss?: InputMaybe<Scalars['Boolean']['input']>
  sortBy?: InputMaybe<TagArticlesSortBy>
}

export enum TagArticlesSortBy {
  ByCreatedAtDesc = 'byCreatedAtDesc',
  ByHottestDesc = 'byHottestDesc',
}

export type TagConnection = Connection & {
  __typename?: 'TagConnection'
  edges?: Maybe<Array<TagEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type TagEdge = {
  __typename?: 'TagEdge'
  cursor: Scalars['String']['output']
  node: Tag
}

export type TagOss = {
  __typename?: 'TagOSS'
  boost: Scalars['Float']['output']
  score: Scalars['Float']['output']
}

export type TagWritingConnection = Connection & {
  __typename?: 'TagWritingConnection'
  edges?: Maybe<Array<TagWritingEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type TagWritingEdge = {
  __typename?: 'TagWritingEdge'
  cursor: Scalars['String']['output']
  node: Writing
  pinned: Scalars['Boolean']['output']
}

export type TagsInput = {
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  sort?: InputMaybe<TagsSort>
}

/** Enums for sorting tags. */
export enum TagsSort {
  Hottest = 'hottest',
  Newest = 'newest',
  Oldest = 'oldest',
}

export type ToggleCircleMemberInput = {
  /** Toggle value. */
  enabled: Scalars['Boolean']['input']
  /** Unique ID. */
  id: Scalars['ID']['input']
  /** Unique ID of target user. */
  targetId: Scalars['ID']['input']
}

/** Common input to toggle single item for `toggleXXX` mutations */
export type ToggleItemInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>
  id: Scalars['ID']['input']
}

export type TogglePinChannelArticlesInput = {
  articles: Array<Scalars['ID']['input']>
  /** id of TopicChannel or CurationChannel */
  channels: Array<Scalars['ID']['input']>
  pinned: Scalars['Boolean']['input']
}

export type ToggleRecommendInput = {
  enabled: Scalars['Boolean']['input']
  id: Scalars['ID']['input']
  type?: InputMaybe<RecommendTypes>
}

export type ToggleSeedingUsersInput = {
  enabled: Scalars['Boolean']['input']
  ids?: InputMaybe<Array<Scalars['ID']['input']>>
}

export type ToggleUsersBadgeInput = {
  enabled: Scalars['Boolean']['input']
  ids: Array<Scalars['ID']['input']>
  type: BadgeType
}

export type ToggleWritingChallengeFeaturedArticlesInput = {
  articles: Array<Scalars['ID']['input']>
  campaign: Scalars['ID']['input']
  enabled: Scalars['Boolean']['input']
}

export type TopDonatorConnection = Connection & {
  __typename?: 'TopDonatorConnection'
  edges?: Maybe<Array<TopDonatorEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type TopDonatorEdge = {
  __typename?: 'TopDonatorEdge'
  cursor: Scalars['String']['output']
  donationCount: Scalars['Int']['output']
  node: Donator
}

export type TopDonatorFilter = {
  inRangeEnd?: InputMaybe<Scalars['DateTime']['input']>
  inRangeStart?: InputMaybe<Scalars['DateTime']['input']>
}

export type TopDonatorInput = {
  after?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<TopDonatorFilter>
  first?: InputMaybe<Scalars['Int']['input']>
}

export type TopicChannel = Channel &
  Node & {
    __typename?: 'TopicChannel'
    articles: ChannelArticleConnection
    enabled: Scalars['Boolean']['output']
    id: Scalars['ID']['output']
    name: Scalars['String']['output']
    navbarTitle: Scalars['String']['output']
    note?: Maybe<Scalars['String']['output']>
    parent?: Maybe<TopicChannel>
    providerId?: Maybe<Scalars['String']['output']>
    shortHash: Scalars['String']['output']
  }

export type TopicChannelArticlesArgs = {
  input: ChannelArticlesInput
}

export type TopicChannelNameArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type TopicChannelNavbarTitleArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type TopicChannelNoteArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type TopicChannelClassification = {
  __typename?: 'TopicChannelClassification'
  /** Which channels this article is in, null for not classified, empty for not in any channel */
  channels?: Maybe<Array<ArticleTopicChannel>>
  /** whether user enable channel classification */
  enabled: Scalars['Boolean']['output']
  /** Feedback from author */
  feedback?: Maybe<TopicChannelFeedback>
}

export type TopicChannelFeedback = {
  __typename?: 'TopicChannelFeedback'
  article: Article
  /** Which channels author want to be in, empty for no channels */
  channels?: Maybe<Array<TopicChannel>>
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  state?: Maybe<TopicChannelFeedbackState>
  type: TopicChannelFeedbackType
}

export enum TopicChannelFeedbackAction {
  Accept = 'accept',
  Reject = 'reject',
}

export type TopicChannelFeedbackConnection = Connection & {
  __typename?: 'TopicChannelFeedbackConnection'
  edges: Array<TopicChannelFeedbackEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type TopicChannelFeedbackEdge = {
  __typename?: 'TopicChannelFeedbackEdge'
  cursor: Scalars['String']['output']
  node: TopicChannelFeedback
}

export enum TopicChannelFeedbackState {
  Accepted = 'accepted',
  Pending = 'pending',
  Rejected = 'rejected',
  Resolved = 'resolved',
}

export enum TopicChannelFeedbackType {
  Negative = 'negative',
  Positive = 'positive',
}

export type TopicChannelFeedbacksFilterInput = {
  spam?: InputMaybe<Scalars['Boolean']['input']>
  state?: InputMaybe<TopicChannelFeedbackState>
  type?: InputMaybe<TopicChannelFeedbackType>
}

export type TopicChannelFeedbacksInput = {
  after?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<TopicChannelFeedbacksFilterInput>
  first: Scalars['first_Int_NotNull_min_0']['input']
}

export type Transaction = {
  __typename?: 'Transaction'
  amount: Scalars['Float']['output']
  /** blockchain transaction info of ERC20/native token payment transaction */
  blockchainTx?: Maybe<BlockchainTransaction>
  /** Timestamp of transaction. */
  createdAt: Scalars['DateTime']['output']
  currency: TransactionCurrency
  fee: Scalars['Float']['output']
  id: Scalars['ID']['output']
  /** Message for end user, including reason of failure. */
  message?: Maybe<Scalars['String']['output']>
  purpose: TransactionPurpose
  /** Recipient of transaction. */
  recipient?: Maybe<User>
  /** Sender of transaction. */
  sender?: Maybe<User>
  state: TransactionState
  /** Related target article or transaction. */
  target?: Maybe<TransactionTarget>
}

export type TransactionConnection = Connection & {
  __typename?: 'TransactionConnection'
  edges?: Maybe<Array<TransactionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export enum TransactionCurrency {
  Hkd = 'HKD',
  Like = 'LIKE',
  Usdt = 'USDT',
}

export type TransactionEdge = {
  __typename?: 'TransactionEdge'
  cursor: Scalars['String']['output']
  node: Transaction
}

export type TransactionNotice = Notice & {
  __typename?: 'TransactionNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']['output']
  /** Unique ID of this notice. */
  id: Scalars['ID']['output']
  target: Transaction
  type: TransactionNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']['output']
}

export enum TransactionNoticeType {
  PaymentReceivedDonation = 'PaymentReceivedDonation',
  WithdrewLockedTokens = 'WithdrewLockedTokens',
}

export enum TransactionPurpose {
  AddCredit = 'addCredit',
  CurationVaultWithdrawal = 'curationVaultWithdrawal',
  Dispute = 'dispute',
  Donation = 'donation',
  Payout = 'payout',
  PayoutReversal = 'payoutReversal',
  Refund = 'refund',
  SubscriptionSplit = 'subscriptionSplit',
}

export enum TransactionState {
  Canceled = 'canceled',
  Failed = 'failed',
  Pending = 'pending',
  Succeeded = 'succeeded',
}

export type TransactionTarget = Article | Circle | Transaction

export type TransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<TransactionsFilter>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  /** deprecated, use TransactionsFilter.id instead. */
  id?: InputMaybe<Scalars['ID']['input']>
  /** deprecated, use TransactionsFilter.states instead. */
  states?: InputMaybe<Array<TransactionState>>
}

export type TransactionsFilter = {
  currency?: InputMaybe<TransactionCurrency>
  id?: InputMaybe<Scalars['ID']['input']>
  purpose?: InputMaybe<TransactionPurpose>
  states?: InputMaybe<Array<TransactionState>>
}

export type TransactionsReceivedByArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  purpose: TransactionPurpose
  senderId?: InputMaybe<Scalars['ID']['input']>
}

export type TranslatedAnnouncement = {
  __typename?: 'TranslatedAnnouncement'
  content?: Maybe<Scalars['String']['output']>
  cover?: Maybe<Scalars['String']['output']>
  language: UserLanguage
  link?: Maybe<Scalars['link_String_format_uri']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type TranslationArgs = {
  language: UserLanguage
}

export type TranslationInput = {
  language: UserLanguage
  text: Scalars['String']['input']
}

export enum TranslationModel {
  GoogleGemini_2_0Flash = 'google_gemini_2_0_flash',
  GoogleGemini_2_5Flash = 'google_gemini_2_5_flash',
  GoogleTranslationV2 = 'google_translation_v2',
  Opencc = 'opencc',
}

export type UnbindLikerIdInput = {
  id: Scalars['ID']['input']
  likerId: Scalars['String']['input']
}

export type UnlikeCollectionInput = {
  id: Scalars['ID']['input']
}

export type UnlikeMomentInput = {
  id: Scalars['ID']['input']
}

export type UnpinCommentInput = {
  id: Scalars['ID']['input']
}

export type UnsubscribeCircleInput = {
  /** Unique ID. */
  id: Scalars['ID']['input']
}

export type UnvoteCommentInput = {
  id: Scalars['ID']['input']
}

export type UpdateArticleSensitiveInput = {
  id: Scalars['ID']['input']
  sensitive: Scalars['Boolean']['input']
}

export type UpdateArticleStateInput = {
  id: Scalars['ID']['input']
  state: ArticleState
}

export type UpdateCampaignApplicationStateInput = {
  campaign: Scalars['ID']['input']
  state: CampaignApplicationState
  user: Scalars['ID']['input']
}

export type UpdateCommentsStateInput = {
  ids: Array<Scalars['ID']['input']>
  state: CommentState
}

export type UpdateCommunityWatchActionStateInput = {
  appealState?: InputMaybe<CommunityWatchAppealState>
  note?: InputMaybe<Scalars['String']['input']>
  reason?: InputMaybe<CommunityWatchRemoveCommentReason>
  reviewState?: InputMaybe<CommunityWatchReviewState>
  uuid: Scalars['ID']['input']
}

export type UpdateNotificationSettingInput = {
  enabled: Scalars['Boolean']['input']
  type: NotificationSettingType
}

export type UpdateUserExtraInput = {
  id: Scalars['ID']['input']
  referralCode?: InputMaybe<Scalars['String']['input']>
}

export type UpdateUserInfoInput = {
  agreeOn?: InputMaybe<Scalars['Boolean']['input']>
  avatar?: InputMaybe<Scalars['ID']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  displayName?: InputMaybe<Scalars['String']['input']>
  language?: InputMaybe<UserLanguage>
  paymentPassword?: InputMaybe<Scalars['String']['input']>
  paymentPointer?: InputMaybe<Scalars['String']['input']>
  profileCover?: InputMaybe<Scalars['ID']['input']>
  referralCode?: InputMaybe<Scalars['String']['input']>
}

export type UpdateUserRoleInput = {
  id: Scalars['ID']['input']
  role: UserRole
}

export type UpdateUserStateInput = {
  banDays?: InputMaybe<Scalars['banDays_Int_exclusiveMin_0']['input']>
  emails?: InputMaybe<Array<Scalars['String']['input']>>
  id?: InputMaybe<Scalars['ID']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  state: UserState
}

export type User = Node & {
  __typename?: 'User'
  /** Record of user activity, only accessable by current user. */
  activity: UserActivity
  /** user data analytics, only accessable by current user. */
  analytics: UserAnalytics
  /** Articles authored by current user. */
  articles: ArticleConnection
  /** URL for user avatar. */
  avatar?: Maybe<Scalars['String']['output']>
  /** Users that blocked by current user. */
  blockList: UserConnection
  /** Artilces current user bookmarked. */
  bookmarkedArticles: ArticleConnection
  /** Tags current user bookmarked. */
  bookmarkedTags: TagConnection
  /** active applied campaigns */
  campaigns: CampaignConnection
  /** collections authored by current user. */
  collections: CollectionConnection
  /** Articles current user commented on */
  commentedArticles: ArticleConnection
  /** Display name on user profile, can be duplicated. */
  displayName?: Maybe<Scalars['String']['output']>
  /** Drafts authored by current user. */
  drafts: DraftConnection
  /** User-level federation opt-in setting. */
  federationSetting?: Maybe<UserFederationSetting>
  /** Followers of this user. */
  followers: UserConnection
  /** Following contents of this user. */
  following: Following
  /** Global id of an user. */
  id: Scalars['ID']['output']
  /** User information. */
  info: UserInfo
  /** Whether current user is blocked by viewer. */
  isBlocked: Scalars['Boolean']['output']
  /** Whether current user is blocking viewer. */
  isBlocking: Scalars['Boolean']['output']
  /** Whether viewer is following current user. */
  isFollowee: Scalars['Boolean']['output']
  /** Whether current user is following viewer. */
  isFollower: Scalars['Boolean']['output']
  /** user latest articles or collections */
  latestWorks: Array<PinnableWork>
  /** Liker info of current user */
  liker: Liker
  /** LikerID of LikeCoin, being used by LikeCoin OAuth */
  likerId?: Maybe<Scalars['String']['output']>
  notices: NoticeConnection
  oss: UserOss
  /** Circles belong to current user. */
  ownCircles?: Maybe<Array<Circle>>
  /** Payment pointer that resolves to Open Payments endpoints */
  paymentPointer?: Maybe<Scalars['String']['output']>
  /** user pinned articles or collections */
  pinnedWorks: Array<PinnableWork>
  /** Recommendations for current user. */
  recommendation: Recommendation
  remark?: Maybe<Scalars['String']['output']>
  /** User settings. */
  settings: UserSettings
  /** Status of current user. */
  status?: Maybe<UserStatus>
  /** Circles whiches user has subscribed. */
  subscribedCircles: CircleConnection
  /** Tags by usage order of current user. */
  tags: TagConnection
  /** Global unique user name of a user. */
  userName?: Maybe<Scalars['String']['output']>
  /** User Wallet */
  wallet: Wallet
  /** Articles and moments authored by current user. */
  writings: WritingConnection
}

export type UserArticlesArgs = {
  input: UserArticlesInput
}

export type UserBlockListArgs = {
  input: ConnectionArgs
}

export type UserBookmarkedArticlesArgs = {
  input: ConnectionArgs
}

export type UserBookmarkedTagsArgs = {
  input: ConnectionArgs
}

export type UserCampaignsArgs = {
  input: ConnectionArgs
}

export type UserCollectionsArgs = {
  input: ConnectionArgs
}

export type UserCommentedArticlesArgs = {
  input: ConnectionArgs
}

export type UserDraftsArgs = {
  input: ConnectionArgs
}

export type UserFollowersArgs = {
  input: ConnectionArgs
}

export type UserNoticesArgs = {
  input: ConnectionArgs
}

export type UserSubscribedCirclesArgs = {
  input: ConnectionArgs
}

export type UserTagsArgs = {
  input: ConnectionArgs
}

export type UserWritingsArgs = {
  input: WritingInput
}

export type UserActivity = {
  __typename?: 'UserActivity'
  /** Appreciations current user received. */
  appreciationsReceived: AppreciationConnection
  /** Total number of appreciation current user received. */
  appreciationsReceivedTotal: Scalars['Int']['output']
  /** Appreciations current user gave. */
  appreciationsSent: AppreciationConnection
  /** Total number of appreciation current user gave. */
  appreciationsSentTotal: Scalars['Int']['output']
  /** User reading history. */
  history: ReadHistoryConnection
  /** User search history. */
  recentSearches: RecentSearchConnection
}

export type UserActivityAppreciationsReceivedArgs = {
  input: ConnectionArgs
}

export type UserActivityAppreciationsSentArgs = {
  input: ConnectionArgs
}

export type UserActivityHistoryArgs = {
  input: ConnectionArgs
}

export type UserActivityRecentSearchesArgs = {
  input: ConnectionArgs
}

export type UserAddArticleTagActivity = {
  __typename?: 'UserAddArticleTagActivity'
  actor: User
  createdAt: Scalars['DateTime']['output']
  /** Article added to tag */
  node: Article
  /** Tag added by article */
  target: Tag
}

export type UserAnalytics = {
  __typename?: 'UserAnalytics'
  /** Top donators of current user. */
  topDonators: TopDonatorConnection
}

export type UserAnalyticsTopDonatorsArgs = {
  input: TopDonatorInput
}

export type UserArticlesFilter = {
  state?: InputMaybe<ArticleState>
}

export type UserArticlesInput = {
  after?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<UserArticlesFilter>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  sort?: InputMaybe<UserArticlesSort>
}

export enum UserArticlesSort {
  MostAppreciations = 'mostAppreciations',
  MostComments = 'mostComments',
  MostDonations = 'mostDonations',
  MostReaders = 'mostReaders',
  Newest = 'newest',
}

export type UserBroadcastCircleActivity = {
  __typename?: 'UserBroadcastCircleActivity'
  actor: User
  createdAt: Scalars['DateTime']['output']
  /** Comment broadcast by actor */
  node: Comment
  /** Circle that comment belongs to */
  target: Circle
}

export type UserConnection = Connection & {
  __typename?: 'UserConnection'
  edges?: Maybe<Array<UserEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type UserCreateCircleActivity = {
  __typename?: 'UserCreateCircleActivity'
  actor: User
  createdAt: Scalars['DateTime']['output']
  /** Circle created by actor */
  node: Circle
}

export type UserEdge = {
  __typename?: 'UserEdge'
  cursor: Scalars['String']['output']
  node: User
}

export type UserFeatureFlag = {
  __typename?: 'UserFeatureFlag'
  createdAt: Scalars['DateTime']['output']
  type: UserFeatureFlagType
}

export enum UserFeatureFlagType {
  BypassSpamDetection = 'bypassSpamDetection',
  CommunityWatch = 'communityWatch',
  FediverseBeta = 'fediverseBeta',
  ReadSpamStatus = 'readSpamStatus',
  UnlimitedArticleFetch = 'unlimitedArticleFetch',
}

export type UserFederationSetting = {
  __typename?: 'UserFederationSetting'
  state: FederationAuthorSettingState
  updatedBy?: Maybe<Scalars['ID']['output']>
  userId: Scalars['ID']['output']
}

export enum UserGroup {
  A = 'a',
  B = 'b',
}

export type UserInfo = {
  __typename?: 'UserInfo'
  /** Timestamp of user agreement. */
  agreeOn?: Maybe<Scalars['DateTime']['output']>
  /** User badges. */
  badges?: Maybe<Array<Badge>>
  /** Timestamp of registration. */
  createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Connected wallet. */
  cryptoWallet?: Maybe<CryptoWallet>
  /** User desciption. */
  description?: Maybe<Scalars['String']['output']>
  /** User email. */
  email?: Maybe<Scalars['email_String_format_email']['output']>
  /** Weather user email is verified. */
  emailVerified: Scalars['Boolean']['output']
  /** Login address */
  ethAddress?: Maybe<Scalars['String']['output']>
  /** saved tags for showing on profile page, API allows up to 100, front-end lock'ed at lower limit */
  featuredTags?: Maybe<Array<Tag>>
  /** Type of group. */
  group: UserGroup
  /** the ipnsKey (`ipfs.io/ipns/<ipnsKey>/...`) for feed.json / rss.xml / index */
  ipnsKey?: Maybe<Scalars['String']['output']>
  isWalletAuth: Scalars['Boolean']['output']
  /** Cover of profile page. */
  profileCover?: Maybe<Scalars['String']['output']>
  /** User connected social accounts. */
  socialAccounts: Array<SocialAccount>
  /** Is user name editable. */
  userNameEditable: Scalars['Boolean']['output']
}

export enum UserInfoFields {
  AgreeOn = 'agreeOn',
  Avatar = 'avatar',
  Description = 'description',
  DisplayName = 'displayName',
  Email = 'email',
}

export type UserInput = {
  ethAddress?: InputMaybe<Scalars['String']['input']>
  userName?: InputMaybe<Scalars['String']['input']>
  /** used for case insensitive username search  */
  userNameCaseIgnore?: InputMaybe<Scalars['Boolean']['input']>
}

export enum UserLanguage {
  En = 'en',
  ZhHans = 'zh_hans',
  ZhHant = 'zh_hant',
}

export type UserNotice = Notice & {
  __typename?: 'UserNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']['output']
  /** Unique ID of this notice. */
  id: Scalars['ID']['output']
  target: User
  type: UserNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']['output']
}

export enum UserNoticeType {
  UserNewFollower = 'UserNewFollower',
}

export type UserOss = {
  __typename?: 'UserOSS'
  boost: Scalars['Float']['output']
  featureFlags: Array<UserFeatureFlag>
  restrictions: Array<UserRestriction>
  score: Scalars['Float']['output']
}

export type UserPostMomentActivity = {
  __typename?: 'UserPostMomentActivity'
  actor: User
  createdAt: Scalars['DateTime']['output']
  /** Another 3 moments posted by actor */
  more: Array<Moment>
  /** Moment posted by actor */
  node: Moment
}

export type UserPublishArticleActivity = {
  __typename?: 'UserPublishArticleActivity'
  actor: User
  createdAt: Scalars['DateTime']['output']
  /** Article published by actor */
  node: Article
}

export type UserRecommendationActivity = {
  __typename?: 'UserRecommendationActivity'
  /** Recommended users */
  nodes?: Maybe<Array<User>>
  /** The source type of recommendation */
  source?: Maybe<UserRecommendationActivitySource>
}

export enum UserRecommendationActivitySource {
  UserFollowing = 'UserFollowing',
}

export type UserRestriction = {
  __typename?: 'UserRestriction'
  createdAt: Scalars['DateTime']['output']
  type: UserRestrictionType
}

export enum UserRestrictionType {
  ArticleHottest = 'articleHottest',
  ArticleNewest = 'articleNewest',
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export type UserSettings = {
  __typename?: 'UserSettings'
  /** User currency preference. */
  currency: QuoteCurrency
  /** User language setting. */
  language: UserLanguage
  /** Notification settings. */
  notification?: Maybe<NotificationSetting>
}

export enum UserState {
  Active = 'active',
  Archived = 'archived',
  Banned = 'banned',
  Frozen = 'frozen',
}

export type UserStatus = {
  __typename?: 'UserStatus'
  /** Number of articles published by user */
  articleCount: Scalars['Int']['output']
  /** Number of chances for the user to change email in a nature day. Reset in UTC+8 0:00 */
  changeEmailTimesLeft: Scalars['Int']['output']
  /** Number of comments posted by user. */
  commentCount: Scalars['Int']['output']
  /** Number of articles donated by user */
  donatedArticleCount: Scalars['Int']['output']
  /** Weather login password is set for email login. */
  hasEmailLoginPassword: Scalars['Boolean']['output']
  /** Whether user already set payment password. */
  hasPaymentPassword: Scalars['Boolean']['output']
  /** Number of moments posted by user */
  momentCount: Scalars['Int']['output']
  /** Number of times of donations received by user */
  receivedDonationCount: Scalars['Int']['output']
  /** User role and access level. */
  role: UserRole
  /** User state. */
  state: UserState
  /** Number of referred user registration count (in Digital Nomad Campaign). */
  totalReferredCount: Scalars['Int']['output']
  /** Number of total written words. */
  totalWordCount: Scalars['Int']['output']
  /** Whether there are unread activities from following. */
  unreadFollowing: Scalars['Boolean']['output']
  /** Number of unread notices. */
  unreadNoticeCount: Scalars['Int']['output']
}

export enum VerificationCodeType {
  EmailOtp = 'email_otp',
  EmailVerify = 'email_verify',
  PaymentPasswordReset = 'payment_password_reset',
  Register = 'register',
}

export type VerifyEmailInput = {
  code: Scalars['String']['input']
  email: Scalars['String']['input']
}

/** Enums for vote types. */
export enum Vote {
  Down = 'down',
  Up = 'up',
}

export type VoteCommentInput = {
  id: Scalars['ID']['input']
  vote: Vote
}

export type Wallet = {
  __typename?: 'Wallet'
  balance: Balance
  /** The last four digits of the card. */
  cardLast4?: Maybe<Scalars['String']['output']>
  /** URL of Stripe Dashboard to manage subscription invoice and payment method */
  customerPortal?: Maybe<Scalars['String']['output']>
  /** Account of Stripe Connect to manage payout */
  stripeAccount?: Maybe<StripeAccount>
  transactions: TransactionConnection
}

export type WalletTransactionsArgs = {
  input: TransactionsArgs
}

export type WalletLoginInput = {
  ethAddress: Scalars['String']['input']
  /** used in register */
  language?: InputMaybe<UserLanguage>
  /** nonce from generateSigningMessage */
  nonce: Scalars['String']['input']
  referralCode?: InputMaybe<Scalars['String']['input']>
  /** sign'ed by wallet */
  signature: Scalars['String']['input']
  /** the message being sign'ed, including nonce */
  signedMessage: Scalars['String']['input']
}

export type WithdrawLockedTokensResult = {
  __typename?: 'WithdrawLockedTokensResult'
  transaction: Transaction
}

export type Writing = Article | Comment | Moment

export type WritingChallenge = Campaign &
  Channel &
  Node & {
    __typename?: 'WritingChallenge'
    announcements: Array<Article>
    application?: Maybe<CampaignApplication>
    applicationPeriod?: Maybe<DatetimeRange>
    articles: CampaignArticleConnection
    channelEnabled: Scalars['Boolean']['output']
    cover?: Maybe<Scalars['String']['output']>
    description?: Maybe<Scalars['String']['output']>
    featuredDescription: Scalars['String']['output']
    id: Scalars['ID']['output']
    isManager: Scalars['Boolean']['output']
    link: Scalars['String']['output']
    name: Scalars['String']['output']
    navbarTitle: Scalars['String']['output']
    organizers: Array<User>
    oss: CampaignOss
    participants: CampaignParticipantConnection
    shortHash: Scalars['String']['output']
    showAd: Scalars['Boolean']['output']
    showOther: Scalars['Boolean']['output']
    stages: Array<CampaignStage>
    state: CampaignState
    writingPeriod?: Maybe<DatetimeRange>
  }

export type WritingChallengeArticlesArgs = {
  input: CampaignArticlesInput
}

export type WritingChallengeDescriptionArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type WritingChallengeFeaturedDescriptionArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type WritingChallengeNameArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type WritingChallengeNavbarTitleArgs = {
  input?: InputMaybe<TranslationArgs>
}

export type WritingChallengeParticipantsArgs = {
  input: CampaignParticipantsInput
}

export type WritingConnection = Connection & {
  __typename?: 'WritingConnection'
  edges?: Maybe<Array<WritingEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type WritingEdge = {
  __typename?: 'WritingEdge'
  cursor: Scalars['String']['output']
  node: Writing
}

export type WritingInput = {
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
}

export type AnalyticsUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  info: { __typename?: 'UserInfo'; email?: any | null }
}

export type VisibleAnnouncementsQueryVariables = Exact<{
  input: AnnouncementsInput
}>

export type VisibleAnnouncementsQuery = {
  __typename?: 'Query'
  official: {
    __typename?: 'Official'
    announcements?: Array<{
      __typename?: 'Announcement'
      id: string
      title?: string | null
      cover?: string | null
      content?: string | null
      link?: string | null
      type: AnnouncementType
      visible: boolean
      createdAt: any
      translations?: Array<{
        __typename?: 'TranslatedAnnouncement'
        language: UserLanguage
        title?: string | null
        cover?: string | null
        content?: string | null
        link?: any | null
      }> | null
    }> | null
  }
}

export type ArticleDigestDropdownArticleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  shortHash: string
  state: ArticleState
  articleState: ArticleState
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    isBlocking: boolean
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
}

export type ArchiveArticleMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type ArchiveArticleMutation = {
  __typename?: 'Mutation'
  editArticle: {
    __typename?: 'Article'
    id: string
    articleState: ArticleState
  }
}

export type ArchiveArticleArticleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  articleState: ArticleState
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type BanCampaignArticleMutationVariables = Exact<{
  campaign: Scalars['ID']['input']
  articles: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type BanCampaignArticleMutation = {
  __typename?: 'Mutation'
  banCampaignArticles: { __typename?: 'WritingChallenge'; id: string }
}

export type EditArticleButtonArticleFragment = {
  __typename?: 'Article'
  id: string
  shortHash: string
  slug: string
  revisionCount: number
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type ExtendArticleMutationVariables = Exact<{
  title: Scalars['String']['input']
  collection?: InputMaybe<
    | Array<InputMaybe<Scalars['ID']['input']>>
    | InputMaybe<Scalars['ID']['input']>
  >
}>

export type ExtendArticleMutation = {
  __typename?: 'Mutation'
  putDraft: { __typename?: 'Draft'; id: string; slug: string }
}

export type ExtendButtonArticleFragment = {
  __typename?: 'Article'
  id: string
  articleState: ArticleState
}

export type TogglePinMutationVariables = Exact<{
  id: Scalars['ID']['input']
  pinned: Scalars['Boolean']['input']
}>

export type TogglePinMutation = {
  __typename?: 'Mutation'
  editArticle: { __typename?: 'Article'; id: string; pinned: boolean }
}

export type PinButtonArticleFragment = {
  __typename?: 'Article'
  id: string
  pinned: boolean
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type GetArticleTopicChannelsQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
}>

export type GetArticleTopicChannelsQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    classification: {
      __typename?: 'ArticleClassification'
      topicChannel: {
        __typename?: 'TopicChannelClassification'
        enabled: boolean
        channels?: Array<{
          __typename?: 'ArticleTopicChannel'
          enabled: boolean
          pinned: boolean
          channel: { __typename?: 'TopicChannel'; id: string }
        }> | null
      }
    }
  } | null
  channels: Array<
    | { __typename?: 'CurationChannel'; id: string; shortHash: string }
    | { __typename?: 'Tag'; id: string; shortHash: string }
    | {
        __typename?: 'TopicChannel'
        name: string
        providerId?: string | null
        enabled: boolean
        id: string
        shortHash: string
        parent?: {
          __typename?: 'TopicChannel'
          id: string
          name: string
        } | null
      }
    | { __typename?: 'WritingChallenge'; id: string; shortHash: string }
  >
}

export type SetArticleTopicChannelsMutationVariables = Exact<{
  id: Scalars['ID']['input']
  channels: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type SetArticleTopicChannelsMutation = {
  __typename?: 'Mutation'
  setArticleTopicChannels: {
    __typename?: 'Article'
    id: string
    classification: {
      __typename?: 'ArticleClassification'
      topicChannel: {
        __typename?: 'TopicChannelClassification'
        enabled: boolean
        channels?: Array<{
          __typename?: 'ArticleTopicChannel'
          enabled: boolean
          pinned: boolean
          channel: { __typename?: 'TopicChannel'; id: string }
        }> | null
      }
    }
  }
}

export type SetBottomCollectionMutationVariables = Exact<{
  collectionId: Scalars['ID']['input']
  articleId: Scalars['ID']['input']
  newPosition: Scalars['Int']['input']
}>

export type SetBottomCollectionMutation = {
  __typename?: 'Mutation'
  reorderCollectionArticles: { __typename?: 'Collection'; id: string }
}

export type SetTopCollectionMutationVariables = Exact<{
  collectionId: Scalars['ID']['input']
  articleId: Scalars['ID']['input']
}>

export type SetTopCollectionMutation = {
  __typename?: 'Mutation'
  reorderCollectionArticles: { __typename?: 'Collection'; id: string }
}

export type ToggleAdArticleArticleFragment = {
  __typename?: 'Article'
  id: string
  oss: {
    __typename?: 'ArticleOSS'
    adStatus: { __typename?: 'AdStatus'; isAd?: boolean | null }
  }
}

export type ToggleAdArticleMutationVariables = Exact<{
  articleId: Scalars['ID']['input']
  isAd: Scalars['Boolean']['input']
}>

export type ToggleAdArticleMutation = {
  __typename?: 'Mutation'
  setAdStatus: {
    __typename?: 'Article'
    id: string
    oss: {
      __typename?: 'ArticleOSS'
      adStatus: { __typename?: 'AdStatus'; isAd?: boolean | null }
    }
  }
}

export type FetchArticleAdStatusQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
}>

export type FetchArticleAdStatusQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    oss: {
      __typename?: 'ArticleOSS'
      adStatus: { __typename?: 'AdStatus'; isAd?: boolean | null }
    }
  } | null
}

export type ToggleCampaignFeaturedArticleMutationVariables = Exact<{
  campaign: Scalars['ID']['input']
  articles: Array<Scalars['ID']['input']> | Scalars['ID']['input']
  isFeatured: Scalars['Boolean']['input']
}>

export type ToggleCampaignFeaturedArticleMutation = {
  __typename?: 'Mutation'
  toggleWritingChallengeFeaturedArticles: {
    __typename?: 'WritingChallenge'
    id: string
  }
}

export type ToggleRecommendArticleArticleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  oss: { __typename?: 'ArticleOSS'; inRecommendIcymi: boolean }
}

export type ArticleRecommendAdminQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type ArticleRecommendAdminQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        title: string
        oss: { __typename?: 'ArticleOSS'; inRecommendIcymi: boolean }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type ToggleRecommendArticleMutationVariables = Exact<{
  id: Scalars['ID']['input']
  enabled: Scalars['Boolean']['input']
  type: RecommendTypes
}>

export type ToggleRecommendArticleMutation = {
  __typename?: 'Mutation'
  toggleArticleRecommend: {
    __typename?: 'Article'
    id: string
    oss: { __typename?: 'ArticleOSS'; inRecommendHottest: boolean }
  }
}

export type DropdownActionsArticleFragment = {
  __typename?: 'Article'
  id: string
  shortHash: string
  title: string
  pinned: boolean
  slug: string
  revisionCount: number
  articleState: ArticleState
  author: {
    __typename?: 'User'
    id: string
    displayName?: string | null
    userName?: string | null
  }
  tags?: Array<{ __typename?: 'Tag'; id: string; content: string }> | null
  likesReceived: { __typename?: 'AppreciationConnection'; totalCount: number }
  donationsDialog: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
  }
}

export type ActionsDonationCountArticleFragment = {
  __typename?: 'Article'
  id: string
  donations: { __typename?: 'ArticleDonationConnection'; totalCount: number }
}

export type ActionsReadTimeArticleFragment = {
  __typename?: 'Article'
  id: string
  readTime: number
}

export type ActionsResponseCountArticleFragment = {
  __typename?: 'Article'
  id: string
  slug: string
  shortHash: string
  responseCount: number
  articleState: ArticleState
  author: { __typename?: 'User'; userName?: string | null }
}

export type FooterActionsArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  shortHash: string
  createdAt: any
  readTime: number
  pinned: boolean
  revisionCount: number
  articleState: ArticleState
  author: {
    __typename?: 'User'
    id: string
    displayName?: string | null
    userName?: string | null
  }
  access: {
    __typename?: 'ArticleAccess'
    type: ArticleAccessType
    circle?: {
      __typename?: 'Circle'
      id: string
      name: string
      displayName: string
    } | null
  }
  collections: {
    __typename?: 'CollectionConnection'
    edges?: Array<{
      __typename?: 'CollectionEdge'
      node: {
        __typename?: 'Collection'
        id: string
        title: string
        articles: { __typename?: 'ArticleConnection'; totalCount: number }
      }
    }> | null
  }
  campaigns: Array<{
    __typename?: 'ArticleCampaign'
    campaign: {
      __typename?: 'WritingChallenge'
      id: string
      name: string
      shortHash: string
      nameZhHant: string
      nameZhHans: string
      nameEn: string
    }
    stage?: { __typename?: 'CampaignStage'; id: string } | null
  }>
  tags?: Array<{ __typename?: 'Tag'; id: string; content: string }> | null
  donations: { __typename?: 'ArticleDonationConnection'; totalCount: number }
  likesReceived: { __typename?: 'AppreciationConnection'; totalCount: number }
  donationsDialog: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
  }
}

export type FooterActionsArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  bookmarked: boolean
}

export type ArticleDigestFeedArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  shortHash: string
  displayCover?: string | null
  summary: string
  createdAt: any
  readTime: number
  pinned: boolean
  revisionCount: number
  articleState: ArticleState
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  access: {
    __typename?: 'ArticleAccess'
    type: ArticleAccessType
    circle?: {
      __typename?: 'Circle'
      id: string
      name: string
      displayName: string
    } | null
  }
  collections: {
    __typename?: 'CollectionConnection'
    edges?: Array<{
      __typename?: 'CollectionEdge'
      node: {
        __typename?: 'Collection'
        id: string
        title: string
        articles: { __typename?: 'ArticleConnection'; totalCount: number }
      }
    }> | null
  }
  campaigns: Array<{
    __typename?: 'ArticleCampaign'
    campaign: {
      __typename?: 'WritingChallenge'
      id: string
      name: string
      shortHash: string
      nameZhHant: string
      nameZhHans: string
      nameEn: string
    }
    stage?: { __typename?: 'CampaignStage'; id: string } | null
  }>
  tags?: Array<{ __typename?: 'Tag'; id: string; content: string }> | null
  donations: { __typename?: 'ArticleDonationConnection'; totalCount: number }
  likesReceived: { __typename?: 'AppreciationConnection'; totalCount: number }
  donationsDialog: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
  }
}

export type ArticleDigestFeedArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  bookmarked: boolean
}

export type ArticleDigestListArticleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  shortHash: string
  articleState: ArticleState
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
}

export type ArticleDigestNoticeArticleFragment = {
  __typename?: 'Article'
  id: string
  summary: string
  title: string
  slug: string
  shortHash: string
  articleState: ArticleState
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type ArticleDigestNoticeCardArticleFragment = {
  __typename?: 'Article'
  id: string
  summary: string
  title: string
  slug: string
  shortHash: string
  articleState: ArticleState
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type ArticleDigestTitleArticleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  shortHash: string
  articleState: ArticleState
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type AvatarUserFragment = {
  __typename?: 'User'
  avatar?: string | null
  liker: { __typename?: 'Liker'; civicLiker: boolean }
  info: {
    __typename?: 'UserInfo'
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
  }
}

export type AvatarUserLogbookFragment = {
  __typename?: 'User'
  info: {
    __typename?: 'UserInfo'
    cryptoWallet?: {
      __typename?: 'CryptoWallet'
      id: string
      address: string
      hasNFTs: boolean
    } | null
  }
}

export type BlockUserPublicFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
}

export type BlockUserPrivateFragment = {
  __typename?: 'User'
  id: string
  isBlocked: boolean
}

export type BookmarkArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  bookmarked: boolean
}

export type FollowStateUserPrivateFragment = {
  __typename?: 'User'
  id: string
  isFollower: boolean
  isFollowee: boolean
}

export type FollowButtonUserPrivateFragment = {
  __typename?: 'User'
  id: string
  isFollower: boolean
  isFollowee: boolean
  status?: { __typename?: 'UserStatus'; state: UserState } | null
}

export type TagBookmarkButtonTagPrivateFragment = {
  __typename?: 'Tag'
  id: string
  isFollower?: boolean | null
}

export type CampaignDigestCardCampaignFragment = {
  __typename?: 'WritingChallenge'
  id: string
  cover?: string | null
  shortHash: string
  description?: string | null
  nameZhHant: string
  nameZhHans: string
  nameEn: string
  stages: Array<{
    __typename?: 'CampaignStage'
    id: string
    nameZhHant: string
    nameZhHans: string
    nameEn: string
    period?: {
      __typename?: 'DatetimeRange'
      start: any
      end?: any | null
    } | null
  }>
  applicationPeriod?: {
    __typename?: 'DatetimeRange'
    start: any
    end?: any | null
  } | null
  writingPeriod?: {
    __typename?: 'DatetimeRange'
    start: any
    end?: any | null
  } | null
  participants: {
    __typename?: 'CampaignParticipantConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'CampaignParticipantEdge'
      node: {
        __typename?: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        avatar?: string | null
        status?: { __typename?: 'UserStatus'; state: UserState } | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          cryptoWallet?: {
            __typename?: 'CryptoWallet'
            id: string
            address: string
            hasNFTs: boolean
          } | null
        }
      }
    }> | null
  }
  organizers: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }>
}

export type CampaignDigestFeedCampaignFragment = {
  __typename?: 'WritingChallenge'
  id: string
  cover?: string | null
  shortHash: string
  description?: string | null
  nameZhHant: string
  nameZhHans: string
  nameEn: string
  applicationPeriod?: {
    __typename?: 'DatetimeRange'
    start: any
    end?: any | null
  } | null
  writingPeriod?: {
    __typename?: 'DatetimeRange'
    start: any
    end?: any | null
  } | null
  organizers: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }>
}

export type CampaignDigestMiniCampaignFragment = {
  __typename?: 'WritingChallenge'
  id: string
  cover?: string | null
  shortHash: string
  nameZhHant: string
  nameZhHans: string
  nameEn: string
}

export type CampaignDigestTitleCampaignFragment = {
  __typename?: 'WritingChallenge'
  id: string
  shortHash: string
  nameZhHant: string
  nameZhHans: string
  nameEn: string
}

export type AvatarCircleFragment = {
  __typename?: 'Circle'
  avatar?: string | null
}

export type CircleCommentContentCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  content?: string | null
  state: CommentState
}

export type CircleCommentContentCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  author: { __typename?: 'User'; id: string; isBlocked: boolean }
}

export type CreatedAtCommentFragment = {
  __typename?: 'Comment'
  id: string
  type: CommentType
  createdAt: any
  parentComment?: { __typename?: 'Comment'; id: string } | null
  node:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle'; id: string; name: string }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
}

export type CollapseCommentMutationVariables = Exact<{
  id: Scalars['ID']['input']
  state: CommentState
}>

export type CollapseCommentMutation = {
  __typename?: 'Mutation'
  updateCommentsState: Array<{
    __typename?: 'Comment'
    id: string
    state: CommentState
  }>
}

export type DeleteCircleCommentMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteCircleCommentMutation = {
  __typename?: 'Mutation'
  deleteComment: { __typename?: 'Comment'; id: string; state: CommentState }
}

export type CircleCommentPinButtonCommentFragment = {
  __typename?: 'Comment'
  id: string
  pinned: boolean
  node:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle'; id: string; name: string }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
}

export type UncollapseCommentMutationVariables = Exact<{
  id: Scalars['ID']['input']
  state: CommentState
}>

export type UncollapseCommentMutation = {
  __typename?: 'Mutation'
  updateCommentsState: Array<{
    __typename?: 'Comment'
    id: string
    state: CommentState
  }>
}

export type CircleCommentDropdownActionsCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  state: CommentState
  content?: string | null
  pinned: boolean
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
  }
  parentComment?: { __typename?: 'Comment'; id: string } | null
  node:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | {
        __typename?: 'Circle'
        id: string
        name: string
        owner: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
}

export type CircleCommentDropdownActionsCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  author: { __typename?: 'User'; id: string; isBlocked: boolean }
  node:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | {
        __typename?: 'Circle'
        id: string
        owner: { __typename?: 'User'; id: string; isBlocking: boolean }
      }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
}

export type CircleCommentFeedCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  state: CommentState
  content?: string | null
  type: CommentType
  createdAt: any
  upvotes: number
  downvotes: number
  pinned: boolean
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  replyTo?: {
    __typename?: 'Comment'
    id: string
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
  } | null
  parentComment?: { __typename?: 'Comment'; id: string } | null
  node:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | {
        __typename?: 'Circle'
        id: string
        name: string
        owner: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
}

export type CircleCommentFeedCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  myVote?: Vote | null
  type: CommentType
  createdAt: any
  node:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | {
        __typename?: 'Circle'
        id: string
        name: string
        owner: { __typename?: 'User'; id: string; isBlocking: boolean }
      }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
  author: { __typename?: 'User'; id: string; isBlocked: boolean }
  parentComment?: { __typename?: 'Comment'; id: string } | null
}

export type RefetchCircleCommentQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type RefetchCircleCommentQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | {
        __typename?: 'Comment'
        id: string
        state: CommentState
        content?: string | null
        type: CommentType
        createdAt: any
        upvotes: number
        downvotes: number
        pinned: boolean
        myVote?: Vote | null
        comments: {
          __typename?: 'CommentConnection'
          edges?: Array<{
            __typename?: 'CommentEdge'
            cursor: string
            node: {
              __typename?: 'Comment'
              id: string
              state: CommentState
              content?: string | null
              type: CommentType
              createdAt: any
              upvotes: number
              downvotes: number
              pinned: boolean
              myVote?: Vote | null
              author: {
                __typename?: 'User'
                id: string
                isBlocked: boolean
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
              replyTo?: {
                __typename?: 'Comment'
                id: string
                author: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                  avatar?: string | null
                  status?: {
                    __typename?: 'UserStatus'
                    state: UserState
                  } | null
                  liker: { __typename?: 'Liker'; civicLiker: boolean }
                  info: {
                    __typename?: 'UserInfo'
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                    cryptoWallet?: {
                      __typename?: 'CryptoWallet'
                      id: string
                      address: string
                      hasNFTs: boolean
                    } | null
                  }
                }
              } | null
              parentComment?: { __typename?: 'Comment'; id: string } | null
              node:
                | { __typename?: 'Article' }
                | { __typename?: 'ArticleVersion' }
                | {
                    __typename?: 'Circle'
                    id: string
                    name: string
                    owner: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                    }
                  }
                | { __typename?: 'Collection' }
                | { __typename?: 'Comment' }
                | { __typename?: 'CurationChannel' }
                | { __typename?: 'Draft' }
                | { __typename?: 'IcymiTopic' }
                | { __typename?: 'Moment' }
                | { __typename?: 'Report' }
                | { __typename?: 'Tag' }
                | { __typename?: 'TopicChannel' }
                | { __typename?: 'User' }
                | { __typename?: 'WritingChallenge' }
            }
          }> | null
        }
        author: {
          __typename?: 'User'
          id: string
          isBlocked: boolean
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        replyTo?: {
          __typename?: 'Comment'
          id: string
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        } | null
        parentComment?: { __typename?: 'Comment'; id: string } | null
        node:
          | { __typename?: 'Article' }
          | { __typename?: 'ArticleVersion' }
          | {
              __typename?: 'Circle'
              id: string
              name: string
              owner: { __typename?: 'User'; id: string; isBlocking: boolean }
            }
          | { __typename?: 'Collection' }
          | { __typename?: 'Comment' }
          | { __typename?: 'CurationChannel' }
          | { __typename?: 'Draft' }
          | { __typename?: 'IcymiTopic' }
          | { __typename?: 'Moment' }
          | { __typename?: 'Report' }
          | { __typename?: 'Tag' }
          | { __typename?: 'TopicChannel' }
          | { __typename?: 'User' }
          | { __typename?: 'WritingChallenge' }
      }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type CircleCommentDownvoteCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  upvotes: number
  downvotes: number
}

export type CircleCommentDownvoteCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  myVote?: Vote | null
}

export type CircleCommentReplyComemntFragment = {
  __typename?: 'Comment'
  id: string
  state: CommentState
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  node:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | {
        __typename?: 'Circle'
        id: string
        owner: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
  parentComment?: { __typename?: 'Comment'; id: string } | null
}

export type CircleCommentUpvoteCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  upvotes: number
  downvotes: number
}

export type CircleCommentUpvoteCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  myVote?: Vote | null
}

export type CircleCommentFooterActionsCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  state: CommentState
  type: CommentType
  createdAt: any
  upvotes: number
  downvotes: number
  parentComment?: { __typename?: 'Comment'; id: string } | null
  node:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | {
        __typename?: 'Circle'
        id: string
        name: string
        owner: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
}

export type CircleCommentFooterActionsCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  myVote?: Vote | null
  type: CommentType
  createdAt: any
  node:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | {
        __typename?: 'Circle'
        id: string
        name: string
        owner: { __typename?: 'User'; id: string; isBlocking: boolean }
      }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
  parentComment?: { __typename?: 'Comment'; id: string } | null
}

export type ReplyToUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  status?: { __typename?: 'UserStatus'; state: UserState } | null
  liker: { __typename?: 'Liker'; civicLiker: boolean }
  info: {
    __typename?: 'UserInfo'
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    cryptoWallet?: {
      __typename?: 'CryptoWallet'
      id: string
      address: string
      hasNFTs: boolean
    } | null
  }
}

export type CircleCommentThreadCommentCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  state: CommentState
  content?: string | null
  type: CommentType
  createdAt: any
  upvotes: number
  downvotes: number
  pinned: boolean
  comments: {
    __typename?: 'CommentConnection'
    edges?: Array<{
      __typename?: 'CommentEdge'
      cursor: string
      node: {
        __typename?: 'Comment'
        id: string
        state: CommentState
        content?: string | null
        type: CommentType
        createdAt: any
        upvotes: number
        downvotes: number
        pinned: boolean
        author: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        replyTo?: {
          __typename?: 'Comment'
          id: string
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        } | null
        parentComment?: { __typename?: 'Comment'; id: string } | null
        node:
          | { __typename?: 'Article' }
          | { __typename?: 'ArticleVersion' }
          | {
              __typename?: 'Circle'
              id: string
              name: string
              owner: { __typename?: 'User'; id: string }
            }
          | { __typename?: 'Collection' }
          | { __typename?: 'Comment' }
          | { __typename?: 'CurationChannel' }
          | { __typename?: 'Draft' }
          | { __typename?: 'IcymiTopic' }
          | { __typename?: 'Moment' }
          | { __typename?: 'Report' }
          | { __typename?: 'Tag' }
          | { __typename?: 'TopicChannel' }
          | { __typename?: 'User' }
          | { __typename?: 'WritingChallenge' }
      }
    }> | null
  }
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  replyTo?: {
    __typename?: 'Comment'
    id: string
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
  } | null
  parentComment?: { __typename?: 'Comment'; id: string } | null
  node:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | {
        __typename?: 'Circle'
        id: string
        name: string
        owner: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
}

export type CircleCommentThreadCommentCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  myVote?: Vote | null
  type: CommentType
  createdAt: any
  comments: {
    __typename?: 'CommentConnection'
    edges?: Array<{
      __typename?: 'CommentEdge'
      cursor: string
      node: {
        __typename?: 'Comment'
        id: string
        myVote?: Vote | null
        type: CommentType
        createdAt: any
        node:
          | { __typename?: 'Article' }
          | { __typename?: 'ArticleVersion' }
          | {
              __typename?: 'Circle'
              id: string
              name: string
              owner: { __typename?: 'User'; id: string; isBlocking: boolean }
            }
          | { __typename?: 'Collection' }
          | { __typename?: 'Comment' }
          | { __typename?: 'CurationChannel' }
          | { __typename?: 'Draft' }
          | { __typename?: 'IcymiTopic' }
          | { __typename?: 'Moment' }
          | { __typename?: 'Report' }
          | { __typename?: 'Tag' }
          | { __typename?: 'TopicChannel' }
          | { __typename?: 'User' }
          | { __typename?: 'WritingChallenge' }
        author: { __typename?: 'User'; id: string; isBlocked: boolean }
        parentComment?: { __typename?: 'Comment'; id: string } | null
      }
    }> | null
  }
  node:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | {
        __typename?: 'Circle'
        id: string
        name: string
        owner: { __typename?: 'User'; id: string; isBlocking: boolean }
      }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
  author: { __typename?: 'User'; id: string; isBlocked: boolean }
  parentComment?: { __typename?: 'Comment'; id: string } | null
}

export type CountsCircleFragment = {
  __typename?: 'Circle'
  id: string
  members: { __typename?: 'MemberConnection'; totalCount: number }
  works: { __typename?: 'ArticleConnection'; totalCount: number }
}

export type DigestMiniCircleFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  displayName: string
  description?: string | null
  avatar?: string | null
  members: { __typename?: 'MemberConnection'; totalCount: number }
  works: { __typename?: 'ArticleConnection'; totalCount: number }
}

export type DigestPlainCircleFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  displayName: string
}

export type PriceCirclePublicFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  prices?: Array<{
    __typename?: 'Price'
    amount: number
    currency: TransactionCurrency
  }> | null
}

export type PriceCirclePrivateFragment = {
  __typename?: 'Circle'
  id: string
  isMember: boolean
  invitedBy?: {
    __typename?: 'Invitation'
    id: string
    state: InvitationState
    freePeriod: number
  } | null
}

export type FooterCirclePublicFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  members: { __typename?: 'MemberConnection'; totalCount: number }
  works: { __typename?: 'ArticleConnection'; totalCount: number }
  prices?: Array<{
    __typename?: 'Price'
    amount: number
    currency: TransactionCurrency
  }> | null
}

export type FooterCirclePrivateFragment = {
  __typename?: 'Circle'
  id: string
  isMember: boolean
  invitedBy?: {
    __typename?: 'Invitation'
    id: string
    state: InvitationState
    freePeriod: number
  } | null
}

export type DigestRichCirclePublicFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  displayName: string
  description?: string | null
  avatar?: string | null
  owner: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  members: { __typename?: 'MemberConnection'; totalCount: number }
  works: { __typename?: 'ArticleConnection'; totalCount: number }
  prices?: Array<{
    __typename?: 'Price'
    amount: number
    currency: TransactionCurrency
  }> | null
}

export type DigestRichCirclePrivateFragment = {
  __typename?: 'Circle'
  id: string
  isMember: boolean
  invitedBy?: {
    __typename?: 'Invitation'
    id: string
    state: InvitationState
    freePeriod: number
  } | null
}

export type DigestTitleCircleFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  displayName: string
}

export type CollectionDigestAuthorSidebarCollectionFragment = {
  __typename?: 'Collection'
  id: string
  title: string
  cover?: string | null
  author: { __typename?: 'User'; id: string; userName?: string | null }
  articles: { __typename?: 'ArticleConnection'; totalCount: number }
}

export type DeleteCollectionMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteCollectionMutation = {
  __typename?: 'Mutation'
  deleteCollections: boolean
}

export type ViewerTabsCountQueryVariables = Exact<{ [key: string]: never }>

export type ViewerTabsCountQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    status?: { __typename?: 'UserStatus'; articleCount: number } | null
    collections: { __typename?: 'CollectionConnection'; totalCount: number }
  } | null
}

export type DeleteCollectionCollectionFragment = {
  __typename?: 'Collection'
  id: string
  title: string
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type PutCollectionMutationVariables = Exact<{
  input: PutCollectionInput
}>

export type PutCollectionMutation = {
  __typename?: 'Mutation'
  putCollection: {
    __typename?: 'Collection'
    id: string
    title: string
    description?: string | null
    cover?: string | null
  }
}

export type EditCollectionCollectionFragment = {
  __typename?: 'Collection'
  id: string
  title: string
  description?: string | null
  cover?: string | null
}

export type TogglePinWorkMutationVariables = Exact<{
  id: Scalars['ID']['input']
  pinned: Scalars['Boolean']['input']
}>

export type TogglePinWorkMutation = {
  __typename?: 'Mutation'
  putCollection: { __typename?: 'Collection'; id: string; pinned: boolean }
}

export type PinButtonCollectionFragment = {
  __typename?: 'Collection'
  id: string
  pinned: boolean
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type DropdownActionsCollectionFragment = {
  __typename?: 'Collection'
  id: string
  pinned: boolean
  title: string
  description?: string | null
  cover?: string | null
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type CollectionDigestFeedCollectionFragment = {
  __typename?: 'Collection'
  id: string
  title: string
  description?: string | null
  cover?: string | null
  updatedAt: any
  pinned: boolean
  author: {
    __typename?: 'User'
    id: string
    displayName?: string | null
    userName?: string | null
  }
  articles: { __typename?: 'ArticleConnection'; totalCount: number }
}

export type CommentContentCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  content?: string | null
  state: CommentState
  communityWatchAction?: {
    __typename?: 'CommunityWatchAction'
    uuid: string
  } | null
}

export type CommentContentCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  author: { __typename?: 'User'; id: string; isBlocked: boolean }
}

export type RestoreCommunityWatchCommentMutationVariables = Exact<{
  uuid: Scalars['ID']['input']
  note?: InputMaybe<Scalars['String']['input']>
}>

export type RestoreCommunityWatchCommentMutation = {
  __typename?: 'Mutation'
  restoreCommunityWatchComment: {
    __typename?: 'CommunityWatchAction'
    uuid: string
    actionState: CommunityWatchActionState
    reviewState: CommunityWatchReviewState
    commentId: string
  }
}

export type CommunityWatchRemoveCommentMutationVariables = Exact<{
  id: Scalars['ID']['input']
  reason: CommunityWatchRemoveCommentReason
}>

export type CommunityWatchRemoveCommentMutation = {
  __typename?: 'Mutation'
  communityWatchRemoveComment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
      reason: CommunityWatchRemoveCommentReason
      createdAt: any
    } | null
  }
}

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteCommentMutation = {
  __typename?: 'Mutation'
  deleteComment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    node:
      | { __typename?: 'Article'; id: string }
      | { __typename?: 'ArticleVersion'; id: string }
      | { __typename?: 'Circle'; id: string }
      | { __typename?: 'Collection'; id: string }
      | { __typename?: 'Comment'; id: string }
      | { __typename?: 'CurationChannel'; id: string }
      | { __typename?: 'Draft'; id: string }
      | { __typename?: 'IcymiTopic'; id: string }
      | { __typename?: 'Moment'; id: string; commentCount: number }
      | { __typename?: 'Report'; id: string }
      | { __typename?: 'Tag'; id: string }
      | { __typename?: 'TopicChannel'; id: string }
      | { __typename?: 'User'; id: string }
      | { __typename?: 'WritingChallenge'; id: string }
  }
}

export type CommentPinButtonCommentFragment = {
  __typename?: 'Comment'
  id: string
  pinned: boolean
  node:
    | { __typename?: 'Article'; id: string; pinCommentLeft: number }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
}

export type CommentDropdownActionsCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  type: CommentType
  state: CommentState
  content?: string | null
  pinned: boolean
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
  }
  parentComment?: { __typename?: 'Comment'; id: string } | null
  dropdownComments: { __typename?: 'CommentConnection'; totalCount: number }
  node:
    | {
        __typename?: 'Article'
        id: string
        shortHash: string
        commentCount: number
        pinCommentLeft: number
        author: { __typename?: 'User'; id: string; userName?: string | null }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | {
        __typename?: 'Moment'
        id: string
        shortHash: string
        commentCount: number
        author: { __typename?: 'User'; id: string; userName?: string | null }
      }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
}

export type CommentDropdownActionsCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  author: { __typename?: 'User'; id: string; isBlocked: boolean }
  node:
    | {
        __typename?: 'Article'
        id: string
        author: {
          __typename?: 'User'
          id: string
          userName?: string | null
          isBlocking: boolean
        }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | {
        __typename?: 'Moment'
        id: string
        shortHash: string
        author: {
          __typename?: 'User'
          id: string
          userName?: string | null
          isBlocking: boolean
        }
      }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
}

export type CommentFeedCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  type: CommentType
  createdAt: any
  fromDonator: boolean
  pinned: boolean
  state: CommentState
  content?: string | null
  upvotes: number
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  replyTo?: {
    __typename?: 'Comment'
    id: string
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
  } | null
  node:
    | {
        __typename?: 'Article'
        id: string
        shortHash: string
        commentCount: number
        pinCommentLeft: number
        author: { __typename?: 'User'; id: string; userName?: string | null }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | {
        __typename?: 'Moment'
        id: string
        shortHash: string
        commentCount: number
        author: { __typename?: 'User'; id: string; userName?: string | null }
      }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
  parentComment?: { __typename?: 'Comment'; id: string } | null
  dropdownComments: { __typename?: 'CommentConnection'; totalCount: number }
  communityWatchAction?: {
    __typename?: 'CommunityWatchAction'
    uuid: string
  } | null
}

export type CommentFeedCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  myVote?: Vote | null
  node:
    | {
        __typename?: 'Article'
        id: string
        commentCount: number
        author: {
          __typename?: 'User'
          id: string
          isBlocking: boolean
          userName?: string | null
        }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | {
        __typename?: 'Moment'
        id: string
        commentCount: number
        shortHash: string
        author: {
          __typename?: 'User'
          id: string
          isBlocking: boolean
          userName?: string | null
        }
      }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
  author: { __typename?: 'User'; id: string; isBlocked: boolean }
}

export type RefetchArticleCommentQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type RefetchArticleCommentQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | {
        __typename?: 'Comment'
        id: string
        type: CommentType
        createdAt: any
        fromDonator: boolean
        pinned: boolean
        state: CommentState
        content?: string | null
        upvotes: number
        myVote?: Vote | null
        comments: {
          __typename?: 'CommentConnection'
          edges?: Array<{
            __typename?: 'CommentEdge'
            cursor: string
            node: {
              __typename?: 'Comment'
              id: string
              type: CommentType
              createdAt: any
              fromDonator: boolean
              pinned: boolean
              state: CommentState
              content?: string | null
              upvotes: number
              myVote?: Vote | null
              author: {
                __typename?: 'User'
                id: string
                isBlocked: boolean
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
              replyTo?: {
                __typename?: 'Comment'
                id: string
                author: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                  avatar?: string | null
                  status?: {
                    __typename?: 'UserStatus'
                    state: UserState
                  } | null
                  liker: { __typename?: 'Liker'; civicLiker: boolean }
                  info: {
                    __typename?: 'UserInfo'
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                    cryptoWallet?: {
                      __typename?: 'CryptoWallet'
                      id: string
                      address: string
                      hasNFTs: boolean
                    } | null
                  }
                }
              } | null
              node:
                | {
                    __typename?: 'Article'
                    id: string
                    shortHash: string
                    commentCount: number
                    pinCommentLeft: number
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
                | { __typename?: 'ArticleVersion' }
                | { __typename?: 'Circle' }
                | { __typename?: 'Collection' }
                | { __typename?: 'Comment' }
                | { __typename?: 'CurationChannel' }
                | { __typename?: 'Draft' }
                | { __typename?: 'IcymiTopic' }
                | {
                    __typename?: 'Moment'
                    id: string
                    shortHash: string
                    commentCount: number
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
                | { __typename?: 'Report' }
                | { __typename?: 'Tag' }
                | { __typename?: 'TopicChannel' }
                | { __typename?: 'User' }
                | { __typename?: 'WritingChallenge' }
              parentComment?: { __typename?: 'Comment'; id: string } | null
              dropdownComments: {
                __typename?: 'CommentConnection'
                totalCount: number
              }
              communityWatchAction?: {
                __typename?: 'CommunityWatchAction'
                uuid: string
              } | null
            }
          }> | null
        }
        author: {
          __typename?: 'User'
          id: string
          isBlocked: boolean
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        replyTo?: {
          __typename?: 'Comment'
          id: string
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        } | null
        node:
          | {
              __typename?: 'Article'
              id: string
              shortHash: string
              commentCount: number
              pinCommentLeft: number
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | { __typename?: 'ArticleVersion' }
          | { __typename?: 'Circle' }
          | { __typename?: 'Collection' }
          | { __typename?: 'Comment' }
          | { __typename?: 'CurationChannel' }
          | { __typename?: 'Draft' }
          | { __typename?: 'IcymiTopic' }
          | {
              __typename?: 'Moment'
              id: string
              shortHash: string
              commentCount: number
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | { __typename?: 'Report' }
          | { __typename?: 'Tag' }
          | { __typename?: 'TopicChannel' }
          | { __typename?: 'User' }
          | { __typename?: 'WritingChallenge' }
        parentComment?: { __typename?: 'Comment'; id: string } | null
        dropdownComments: {
          __typename?: 'CommentConnection'
          totalCount: number
        }
        communityWatchAction?: {
          __typename?: 'CommunityWatchAction'
          uuid: string
        } | null
      }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type CommentReplyComemntFragment = {
  __typename?: 'Comment'
  id: string
  state: CommentState
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  node:
    | {
        __typename?: 'Article'
        id: string
        author: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | {
        __typename?: 'Moment'
        id: string
        author: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
  parentComment?: { __typename?: 'Comment'; id: string } | null
}

export type CommentUpvoteCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  upvotes: number
}

export type CommentUpvoteCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  myVote?: Vote | null
}

export type CommentFooterActionsCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  state: CommentState
  upvotes: number
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  node:
    | {
        __typename?: 'Article'
        id: string
        author: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | {
        __typename?: 'Moment'
        id: string
        author: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
  parentComment?: { __typename?: 'Comment'; id: string } | null
}

export type CommentFooterActionsCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  myVote?: Vote | null
  node:
    | {
        __typename?: 'Article'
        id: string
        commentCount: number
        author: { __typename?: 'User'; id: string; isBlocking: boolean }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | {
        __typename?: 'Moment'
        id: string
        commentCount: number
        author: { __typename?: 'User'; id: string; isBlocking: boolean }
      }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
}

export type PinnedLabelCommentFragment = {
  __typename?: 'Comment'
  id: string
  pinned: boolean
  node:
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
}

export type RoleLabelCommentFragment = {
  __typename?: 'Comment'
  id: string
  fromDonator: boolean
  author: { __typename?: 'User'; id: string }
  node:
    | {
        __typename?: 'Article'
        id: string
        author: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | {
        __typename?: 'Moment'
        id: string
        author: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
}

export type CommentThreadCommentCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  type: CommentType
  createdAt: any
  fromDonator: boolean
  pinned: boolean
  state: CommentState
  content?: string | null
  upvotes: number
  comments: {
    __typename?: 'CommentConnection'
    edges?: Array<{
      __typename?: 'CommentEdge'
      cursor: string
      node: {
        __typename?: 'Comment'
        id: string
        type: CommentType
        createdAt: any
        fromDonator: boolean
        pinned: boolean
        state: CommentState
        content?: string | null
        upvotes: number
        author: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        replyTo?: {
          __typename?: 'Comment'
          id: string
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        } | null
        node:
          | {
              __typename?: 'Article'
              id: string
              shortHash: string
              commentCount: number
              pinCommentLeft: number
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
              }
            }
          | { __typename?: 'ArticleVersion' }
          | { __typename?: 'Circle' }
          | { __typename?: 'Collection' }
          | { __typename?: 'Comment' }
          | { __typename?: 'CurationChannel' }
          | { __typename?: 'Draft' }
          | { __typename?: 'IcymiTopic' }
          | {
              __typename?: 'Moment'
              id: string
              shortHash: string
              commentCount: number
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
              }
            }
          | { __typename?: 'Report' }
          | { __typename?: 'Tag' }
          | { __typename?: 'TopicChannel' }
          | { __typename?: 'User' }
          | { __typename?: 'WritingChallenge' }
        parentComment?: { __typename?: 'Comment'; id: string } | null
        dropdownComments: {
          __typename?: 'CommentConnection'
          totalCount: number
        }
        communityWatchAction?: {
          __typename?: 'CommunityWatchAction'
          uuid: string
        } | null
      }
    }> | null
  }
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  replyTo?: {
    __typename?: 'Comment'
    id: string
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
  } | null
  node:
    | {
        __typename?: 'Article'
        id: string
        shortHash: string
        commentCount: number
        pinCommentLeft: number
        author: { __typename?: 'User'; id: string; userName?: string | null }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | {
        __typename?: 'Moment'
        id: string
        shortHash: string
        commentCount: number
        author: { __typename?: 'User'; id: string; userName?: string | null }
      }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
  parentComment?: { __typename?: 'Comment'; id: string } | null
  dropdownComments: { __typename?: 'CommentConnection'; totalCount: number }
  communityWatchAction?: {
    __typename?: 'CommunityWatchAction'
    uuid: string
  } | null
}

export type CommentThreadCommentCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  myVote?: Vote | null
  comments: {
    __typename?: 'CommentConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      startCursor?: string | null
      endCursor?: string | null
      hasNextPage: boolean
    }
    edges?: Array<{
      __typename?: 'CommentEdge'
      cursor: string
      node: {
        __typename?: 'Comment'
        id: string
        myVote?: Vote | null
        node:
          | {
              __typename?: 'Article'
              id: string
              commentCount: number
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | { __typename?: 'ArticleVersion' }
          | { __typename?: 'Circle' }
          | { __typename?: 'Collection' }
          | { __typename?: 'Comment' }
          | { __typename?: 'CurationChannel' }
          | { __typename?: 'Draft' }
          | { __typename?: 'IcymiTopic' }
          | {
              __typename?: 'Moment'
              id: string
              commentCount: number
              shortHash: string
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | { __typename?: 'Report' }
          | { __typename?: 'Tag' }
          | { __typename?: 'TopicChannel' }
          | { __typename?: 'User' }
          | { __typename?: 'WritingChallenge' }
        author: { __typename?: 'User'; id: string; isBlocked: boolean }
      }
    }> | null
  }
  node:
    | {
        __typename?: 'Article'
        id: string
        commentCount: number
        author: {
          __typename?: 'User'
          id: string
          isBlocking: boolean
          userName?: string | null
        }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | {
        __typename?: 'Moment'
        id: string
        commentCount: number
        shortHash: string
        author: {
          __typename?: 'User'
          id: string
          isBlocking: boolean
          userName?: string | null
        }
      }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
  author: { __typename?: 'User'; id: string; isBlocked: boolean }
}

export type DescendantCommentsCommentPublicQueryVariables = Exact<{
  id: Scalars['ID']['input']
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
}>

export type DescendantCommentsCommentPublicQuery = {
  __typename?: 'Query'
  comment?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | {
        __typename?: 'Comment'
        comments: {
          __typename?: 'CommentConnection'
          totalCount: number
          pageInfo: {
            __typename?: 'PageInfo'
            startCursor?: string | null
            endCursor?: string | null
            hasNextPage: boolean
          }
          edges?: Array<{
            __typename?: 'CommentEdge'
            node: {
              __typename?: 'Comment'
              id: string
              type: CommentType
              createdAt: any
              fromDonator: boolean
              pinned: boolean
              state: CommentState
              content?: string | null
              upvotes: number
              myVote?: Vote | null
              comments: {
                __typename?: 'CommentConnection'
                edges?: Array<{
                  __typename?: 'CommentEdge'
                  cursor: string
                  node: {
                    __typename?: 'Comment'
                    id: string
                    type: CommentType
                    createdAt: any
                    fromDonator: boolean
                    pinned: boolean
                    state: CommentState
                    content?: string | null
                    upvotes: number
                    myVote?: Vote | null
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocked: boolean
                      userName?: string | null
                      displayName?: string | null
                      avatar?: string | null
                      status?: {
                        __typename?: 'UserStatus'
                        state: UserState
                      } | null
                      liker: { __typename?: 'Liker'; civicLiker: boolean }
                      info: {
                        __typename?: 'UserInfo'
                        badges?: Array<{
                          __typename?: 'Badge'
                          type: BadgeType
                        }> | null
                        cryptoWallet?: {
                          __typename?: 'CryptoWallet'
                          id: string
                          address: string
                          hasNFTs: boolean
                        } | null
                      }
                    }
                    replyTo?: {
                      __typename?: 'Comment'
                      id: string
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                        displayName?: string | null
                        avatar?: string | null
                        status?: {
                          __typename?: 'UserStatus'
                          state: UserState
                        } | null
                        liker: { __typename?: 'Liker'; civicLiker: boolean }
                        info: {
                          __typename?: 'UserInfo'
                          badges?: Array<{
                            __typename?: 'Badge'
                            type: BadgeType
                          }> | null
                          cryptoWallet?: {
                            __typename?: 'CryptoWallet'
                            id: string
                            address: string
                            hasNFTs: boolean
                          } | null
                        }
                      }
                    } | null
                    node:
                      | {
                          __typename?: 'Article'
                          id: string
                          shortHash: string
                          commentCount: number
                          pinCommentLeft: number
                          author: {
                            __typename?: 'User'
                            id: string
                            isBlocking: boolean
                            userName?: string | null
                          }
                        }
                      | { __typename?: 'ArticleVersion' }
                      | { __typename?: 'Circle' }
                      | { __typename?: 'Collection' }
                      | { __typename?: 'Comment' }
                      | { __typename?: 'CurationChannel' }
                      | { __typename?: 'Draft' }
                      | { __typename?: 'IcymiTopic' }
                      | {
                          __typename?: 'Moment'
                          id: string
                          shortHash: string
                          commentCount: number
                          author: {
                            __typename?: 'User'
                            id: string
                            isBlocking: boolean
                            userName?: string | null
                          }
                        }
                      | { __typename?: 'Report' }
                      | { __typename?: 'Tag' }
                      | { __typename?: 'TopicChannel' }
                      | { __typename?: 'User' }
                      | { __typename?: 'WritingChallenge' }
                    parentComment?: {
                      __typename?: 'Comment'
                      id: string
                    } | null
                    dropdownComments: {
                      __typename?: 'CommentConnection'
                      totalCount: number
                    }
                    communityWatchAction?: {
                      __typename?: 'CommunityWatchAction'
                      uuid: string
                    } | null
                  }
                }> | null
                pageInfo: {
                  __typename?: 'PageInfo'
                  startCursor?: string | null
                  endCursor?: string | null
                  hasNextPage: boolean
                }
              }
              author: {
                __typename?: 'User'
                id: string
                isBlocked: boolean
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
              replyTo?: {
                __typename?: 'Comment'
                id: string
                author: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                  avatar?: string | null
                  status?: {
                    __typename?: 'UserStatus'
                    state: UserState
                  } | null
                  liker: { __typename?: 'Liker'; civicLiker: boolean }
                  info: {
                    __typename?: 'UserInfo'
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                    cryptoWallet?: {
                      __typename?: 'CryptoWallet'
                      id: string
                      address: string
                      hasNFTs: boolean
                    } | null
                  }
                }
              } | null
              node:
                | {
                    __typename?: 'Article'
                    id: string
                    shortHash: string
                    commentCount: number
                    pinCommentLeft: number
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
                | { __typename?: 'ArticleVersion' }
                | { __typename?: 'Circle' }
                | { __typename?: 'Collection' }
                | { __typename?: 'Comment' }
                | { __typename?: 'CurationChannel' }
                | { __typename?: 'Draft' }
                | { __typename?: 'IcymiTopic' }
                | {
                    __typename?: 'Moment'
                    id: string
                    shortHash: string
                    commentCount: number
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
                | { __typename?: 'Report' }
                | { __typename?: 'Tag' }
                | { __typename?: 'TopicChannel' }
                | { __typename?: 'User' }
                | { __typename?: 'WritingChallenge' }
              parentComment?: { __typename?: 'Comment'; id: string } | null
              dropdownComments: {
                __typename?: 'CommentConnection'
                totalCount: number
              }
              communityWatchAction?: {
                __typename?: 'CommunityWatchAction'
                uuid: string
              } | null
            }
          }> | null
        }
      }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type DescendantCommentsCommentPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type DescendantCommentsCommentPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | {
        __typename?: 'Comment'
        id: string
        myVote?: Vote | null
        comments: {
          __typename?: 'CommentConnection'
          pageInfo: {
            __typename?: 'PageInfo'
            startCursor?: string | null
            endCursor?: string | null
            hasNextPage: boolean
          }
          edges?: Array<{
            __typename?: 'CommentEdge'
            cursor: string
            node: {
              __typename?: 'Comment'
              id: string
              myVote?: Vote | null
              node:
                | {
                    __typename?: 'Article'
                    id: string
                    commentCount: number
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
                | { __typename?: 'ArticleVersion' }
                | { __typename?: 'Circle' }
                | { __typename?: 'Collection' }
                | { __typename?: 'Comment' }
                | { __typename?: 'CurationChannel' }
                | { __typename?: 'Draft' }
                | { __typename?: 'IcymiTopic' }
                | {
                    __typename?: 'Moment'
                    id: string
                    commentCount: number
                    shortHash: string
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
                | { __typename?: 'Report' }
                | { __typename?: 'Tag' }
                | { __typename?: 'TopicChannel' }
                | { __typename?: 'User' }
                | { __typename?: 'WritingChallenge' }
              author: { __typename?: 'User'; id: string; isBlocked: boolean }
            }
          }> | null
        }
        node:
          | {
              __typename?: 'Article'
              id: string
              commentCount: number
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | { __typename?: 'ArticleVersion' }
          | { __typename?: 'Circle' }
          | { __typename?: 'Collection' }
          | { __typename?: 'Comment' }
          | { __typename?: 'CurationChannel' }
          | { __typename?: 'Draft' }
          | { __typename?: 'IcymiTopic' }
          | {
              __typename?: 'Moment'
              id: string
              commentCount: number
              shortHash: string
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | { __typename?: 'Report' }
          | { __typename?: 'Tag' }
          | { __typename?: 'TopicChannel' }
          | { __typename?: 'User' }
          | { __typename?: 'WritingChallenge' }
        author: { __typename?: 'User'; id: string; isBlocked: boolean }
      }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
  > | null
}

export type DraftUpdatedAtFragment = {
  __typename?: 'Draft'
  id: string
  updatedAt: any
}

export type FeatureOfficialFragment = {
  __typename?: 'Official'
  features: Array<{
    __typename?: 'Feature'
    name: FeatureName
    enabled: boolean
  }>
}

export type UpdateLanguageMutationVariables = Exact<{
  input: UpdateUserInfoInput
}>

export type UpdateLanguageMutation = {
  __typename?: 'Mutation'
  updateUserInfo: {
    __typename?: 'User'
    id: string
    settings: { __typename?: 'UserSettings'; language: UserLanguage }
  }
}

export type ViewerUserPublicFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  liker: { __typename?: 'Liker'; likerId?: string | null; civicLiker: boolean }
  status?: {
    __typename?: 'UserStatus'
    state: UserState
    unreadNoticeCount: number
    hasPaymentPassword: boolean
  } | null
  ownCircles?: Array<{ __typename?: 'Circle'; id: string; name: string }> | null
  info: {
    __typename?: 'UserInfo'
    createdAt?: any | null
    description?: string | null
    email?: any | null
    agreeOn?: any | null
    userNameEditable: boolean
    group: UserGroup
    ethAddress?: string | null
    isWalletAuth: boolean
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    cryptoWallet?: {
      __typename?: 'CryptoWallet'
      id: string
      address: string
      hasNFTs: boolean
    } | null
  }
  settings: { __typename?: 'UserSettings'; language: UserLanguage }
  following: {
    __typename?: 'Following'
    users: { __typename?: 'UserConnection'; totalCount: number }
  }
  followers: { __typename?: 'UserConnection'; totalCount: number }
}

export type ViewerUserPrivateFragment = {
  __typename?: 'User'
  id: string
  info: {
    __typename?: 'UserInfo'
    emailVerified: boolean
    socialAccounts: Array<{
      __typename?: 'SocialAccount'
      type: SocialAccountType
      userName?: string | null
      email?: string | null
    }>
  }
  status?: {
    __typename?: 'UserStatus'
    role: UserRole
    hasEmailLoginPassword: boolean
    changeEmailTimesLeft: number
  } | null
  articles: { __typename?: 'ArticleConnection'; totalCount: number }
  settings: { __typename?: 'UserSettings'; currency: QuoteCurrency }
}

export type ViewerFeatureFlagsQueryVariables = Exact<{ [key: string]: never }>

export type ViewerFeatureFlagsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    oss: {
      __typename?: 'UserOSS'
      featureFlags: Array<{
        __typename?: 'UserFeatureFlag'
        type: UserFeatureFlagType
      }>
    }
  } | null
}

export type UserArticlesUserFragment = {
  __typename?: 'User'
  id: string
  articles: {
    __typename?: 'ArticleConnection'
    totalCount: number
    pageInfo: {
      __typename?: 'PageInfo'
      startCursor?: string | null
      endCursor?: string | null
      hasNextPage: boolean
    }
    edges?: Array<{
      __typename?: 'ArticleEdge'
      cursor: string
      node: {
        __typename?: 'Article'
        id: string
        title: string
        state: ArticleState
        createdAt: any
      }
    }> | null
  }
}

export type AddArticlesCollectionUserQueryVariables = Exact<{
  userName?: InputMaybe<Scalars['String']['input']>
  after?: InputMaybe<Scalars['String']['input']>
}>

export type AddArticlesCollectionUserQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    articles: {
      __typename?: 'ArticleConnection'
      totalCount: number
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'ArticleEdge'
        cursor: string
        node: {
          __typename?: 'Article'
          id: string
          title: string
          state: ArticleState
          createdAt: any
        }
      }> | null
    }
  } | null
}

export type UserArticlesSearchQueryVariables = Exact<{
  authorId: Scalars['ID']['input']
  key: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type UserArticlesSearchQuery = {
  __typename?: 'Query'
  search: {
    __typename?: 'SearchResultConnection'
    totalCount: number
    pageInfo: {
      __typename?: 'PageInfo'
      startCursor?: string | null
      endCursor?: string | null
      hasNextPage: boolean
    }
    edges?: Array<{
      __typename?: 'SearchResultEdge'
      cursor: string
      node:
        | {
            __typename?: 'Article'
            id: string
            title: string
            state: ArticleState
            createdAt: any
          }
        | { __typename?: 'ArticleVersion' }
        | { __typename?: 'Circle' }
        | { __typename?: 'Collection' }
        | { __typename?: 'Comment' }
        | { __typename?: 'CurationChannel' }
        | { __typename?: 'Draft' }
        | { __typename?: 'IcymiTopic' }
        | { __typename?: 'Moment' }
        | { __typename?: 'Report' }
        | { __typename?: 'Tag' }
        | { __typename?: 'TopicChannel' }
        | { __typename?: 'User' }
        | { __typename?: 'WritingChallenge' }
    }> | null
  }
}

export type AddArticlesCollectionMutationVariables = Exact<{
  input: AddCollectionsArticlesInput
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
}>

export type AddArticlesCollectionMutation = {
  __typename?: 'Mutation'
  addCollectionsArticles: Array<{
    __typename?: 'Collection'
    id: string
    title: string
    articles: {
      __typename?: 'ArticleConnection'
      totalCount: number
      edges?: Array<{
        __typename?: 'ArticleEdge'
        cursor: string
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          displayCover?: string | null
          summary: string
          createdAt: any
          readTime: number
          bookmarked: boolean
          pinned: boolean
          revisionCount: number
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
          access: {
            __typename?: 'ArticleAccess'
            type: ArticleAccessType
            circle?: {
              __typename?: 'Circle'
              id: string
              name: string
              displayName: string
            } | null
          }
          collections: {
            __typename?: 'CollectionConnection'
            edges?: Array<{
              __typename?: 'CollectionEdge'
              node: {
                __typename?: 'Collection'
                id: string
                title: string
                articles: {
                  __typename?: 'ArticleConnection'
                  totalCount: number
                }
              }
            }> | null
          }
          campaigns: Array<{
            __typename?: 'ArticleCampaign'
            campaign: {
              __typename?: 'WritingChallenge'
              id: string
              name: string
              shortHash: string
              nameZhHant: string
              nameZhHans: string
              nameEn: string
            }
            stage?: { __typename?: 'CampaignStage'; id: string } | null
          }>
          tags?: Array<{
            __typename?: 'Tag'
            id: string
            content: string
          }> | null
          donations: {
            __typename?: 'ArticleDonationConnection'
            totalCount: number
          }
          likesReceived: {
            __typename?: 'AppreciationConnection'
            totalCount: number
          }
          donationsDialog: {
            __typename?: 'ArticleDonationConnection'
            totalCount: number
          }
        }
      }> | null
    }
  }>
}

export type CreateCollectionMutationVariables = Exact<{
  input: PutCollectionInput
}>

export type CreateCollectionMutation = {
  __typename?: 'Mutation'
  putCollection: {
    __typename?: 'Collection'
    id: string
    title: string
    description?: string | null
    cover?: string | null
    updatedAt: any
    pinned: boolean
    author: {
      __typename?: 'User'
      id: string
      displayName?: string | null
      userName?: string | null
    }
    articles: { __typename?: 'ArticleConnection'; totalCount: number }
  }
}

export type AddCollectionsArticleUserPublicFragment = {
  __typename?: 'User'
  id: string
  collections: {
    __typename?: 'CollectionConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'CollectionEdge'
      node: {
        __typename?: 'Collection'
        id: string
        title: string
        contains: boolean
        articles: {
          __typename?: 'ArticleConnection'
          totalCount: number
          edges?: Array<{
            __typename?: 'ArticleEdge'
            node: { __typename?: 'Article'; id: string }
          }> | null
        }
      }
    }> | null
  }
}

export type AddCollectionsArticleUserPublicQueryVariables = Exact<{
  userName: Scalars['String']['input']
  id: Scalars['ID']['input']
}>

export type AddCollectionsArticleUserPublicQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    collections: {
      __typename?: 'CollectionConnection'
      totalCount: number
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          contains: boolean
          articles: {
            __typename?: 'ArticleConnection'
            totalCount: number
            edges?: Array<{
              __typename?: 'ArticleEdge'
              node: { __typename?: 'Article'; id: string }
            }> | null
          }
        }
      }> | null
    }
  } | null
}

export type AddCollectionsArticlesMutationVariables = Exact<{
  input: AddCollectionsArticlesInput
}>

export type AddCollectionsArticlesMutation = {
  __typename?: 'Mutation'
  addCollectionsArticles: Array<{
    __typename?: 'Collection'
    id: string
    title: string
  }>
}

export type ArticleAppreciatorsQueryVariables = Exact<{
  id: Scalars['ID']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type ArticleAppreciatorsQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        likesReceived: {
          __typename?: 'AppreciationConnection'
          totalCount: number
          pageInfo: {
            __typename?: 'PageInfo'
            startCursor?: string | null
            endCursor?: string | null
            hasNextPage: boolean
          }
          edges?: Array<{
            __typename?: 'AppreciationEdge'
            cursor: string
            node: {
              __typename?: 'Appreciation'
              amount: number
              sender?: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                isFollower: boolean
                isFollowee: boolean
                info: {
                  __typename?: 'UserInfo'
                  description?: string | null
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
              } | null
            }
          }> | null
        }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type AppreciatorsDialogArticleFragment = {
  __typename?: 'Article'
  id: string
  likesReceived: { __typename?: 'AppreciationConnection'; totalCount: number }
}

export type UpdateUserInfoProfileMutationVariables = Exact<{
  input: UpdateUserInfoInput
}>

export type UpdateUserInfoProfileMutation = {
  __typename?: 'Mutation'
  updateUserInfo: {
    __typename?: 'User'
    id: string
    avatar?: string | null
    displayName?: string | null
    info: {
      __typename?: 'UserInfo'
      profileCover?: string | null
      description?: string | null
    }
  }
}

export type EditProfileDialogUserPublicFragment = {
  __typename?: 'User'
  id: string
  avatar?: string | null
  displayName?: string | null
  info: {
    __typename?: 'UserInfo'
    profileCover?: string | null
    description?: string | null
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
  }
  liker: { __typename?: 'Liker'; civicLiker: boolean }
}

export type ViewerLikerIdQueryVariables = Exact<{ [key: string]: never }>

export type ViewerLikerIdQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    liker: { __typename?: 'Liker'; likerId?: string | null }
  } | null
}

export type MomentDigestDetailCommentsMomentFragment = {
  __typename?: 'Moment'
  id: string
  comments: {
    __typename?: 'CommentConnection'
    edges?: Array<{
      __typename?: 'CommentEdge'
      cursor: string
      node: {
        __typename?: 'Comment'
        id: string
        type: CommentType
        createdAt: any
        fromDonator: boolean
        pinned: boolean
        state: CommentState
        content?: string | null
        upvotes: number
        myVote?: Vote | null
        author: {
          __typename?: 'User'
          id: string
          isBlocked: boolean
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        replyTo?: {
          __typename?: 'Comment'
          id: string
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        } | null
        node:
          | {
              __typename?: 'Article'
              id: string
              shortHash: string
              commentCount: number
              pinCommentLeft: number
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | { __typename?: 'ArticleVersion' }
          | { __typename?: 'Circle' }
          | { __typename?: 'Collection' }
          | { __typename?: 'Comment' }
          | { __typename?: 'CurationChannel' }
          | { __typename?: 'Draft' }
          | { __typename?: 'IcymiTopic' }
          | {
              __typename?: 'Moment'
              id: string
              shortHash: string
              commentCount: number
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | { __typename?: 'Report' }
          | { __typename?: 'Tag' }
          | { __typename?: 'TopicChannel' }
          | { __typename?: 'User' }
          | { __typename?: 'WritingChallenge' }
        parentComment?: { __typename?: 'Comment'; id: string } | null
        dropdownComments: {
          __typename?: 'CommentConnection'
          totalCount: number
        }
        communityWatchAction?: {
          __typename?: 'CommunityWatchAction'
          uuid: string
        } | null
      }
    }> | null
  }
}

export type MomentDetailQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
}>

export type MomentDetailQuery = {
  __typename?: 'Query'
  moment?: {
    __typename?: 'Moment'
    id: string
    shortHash: string
    createdAt: any
    state: MomentState
    content?: string | null
    likeCount: number
    liked: boolean
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    comments: {
      __typename?: 'CommentConnection'
      edges?: Array<{
        __typename?: 'CommentEdge'
        cursor: string
        node: {
          __typename?: 'Comment'
          id: string
          type: CommentType
          createdAt: any
          fromDonator: boolean
          pinned: boolean
          state: CommentState
          content?: string | null
          upvotes: number
          myVote?: Vote | null
          author: {
            __typename?: 'User'
            id: string
            isBlocked: boolean
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
          replyTo?: {
            __typename?: 'Comment'
            id: string
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
          } | null
          node:
            | {
                __typename?: 'Article'
                id: string
                shortHash: string
                commentCount: number
                pinCommentLeft: number
                author: {
                  __typename?: 'User'
                  id: string
                  isBlocking: boolean
                  userName?: string | null
                }
              }
            | { __typename?: 'ArticleVersion' }
            | { __typename?: 'Circle' }
            | { __typename?: 'Collection' }
            | { __typename?: 'Comment' }
            | { __typename?: 'CurationChannel' }
            | { __typename?: 'Draft' }
            | { __typename?: 'IcymiTopic' }
            | {
                __typename?: 'Moment'
                id: string
                shortHash: string
                commentCount: number
                author: {
                  __typename?: 'User'
                  id: string
                  isBlocking: boolean
                  userName?: string | null
                }
              }
            | { __typename?: 'Report' }
            | { __typename?: 'Tag' }
            | { __typename?: 'TopicChannel' }
            | { __typename?: 'User' }
            | { __typename?: 'WritingChallenge' }
          parentComment?: { __typename?: 'Comment'; id: string } | null
          dropdownComments: {
            __typename?: 'CommentConnection'
            totalCount: number
          }
          communityWatchAction?: {
            __typename?: 'CommunityWatchAction'
            uuid: string
          } | null
        }
      }> | null
    }
    assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
  } | null
}

export type RemoveArticleCollectionMutationVariables = Exact<{
  collection: Scalars['ID']['input']
  article: Scalars['ID']['input']
}>

export type RemoveArticleCollectionMutation = {
  __typename?: 'Mutation'
  deleteCollectionArticles: { __typename?: 'Collection'; id: string }
}

export type RemoveSocialLoginMutationVariables = Exact<{
  input: RemoveSocialLoginInput
}>

export type RemoveSocialLoginMutation = {
  __typename?: 'Mutation'
  removeSocialLogin: {
    __typename?: 'User'
    id: string
    info: {
      __typename?: 'UserInfo'
      socialAccounts: Array<{
        __typename?: 'SocialAccount'
        type: SocialAccountType
        userName?: string | null
        email?: string | null
      }>
    }
  }
}

export type RemoveWalletLoginMutationVariables = Exact<{ [key: string]: never }>

export type RemoveWalletLoginMutation = {
  __typename?: 'Mutation'
  removeWalletLogin: {
    __typename?: 'User'
    id: string
    info: { __typename?: 'UserInfo'; ethAddress?: string | null }
  }
}

export type SetEmailMutationVariables = Exact<{
  input: SetEmailInput
}>

export type SetEmailMutation = {
  __typename?: 'Mutation'
  setEmail: {
    __typename?: 'User'
    id: string
    info: {
      __typename?: 'UserInfo'
      email?: any | null
      emailVerified: boolean
    }
    status?: { __typename?: 'UserStatus'; changeEmailTimesLeft: number } | null
  }
}

export type SetPasswordMutationVariables = Exact<{
  input: SetPasswordInput
}>

export type SetPasswordMutation = {
  __typename?: 'Mutation'
  setPassword: {
    __typename?: 'User'
    id: string
    info: { __typename?: 'UserInfo'; email?: any | null }
    status?: {
      __typename?: 'UserStatus'
      hasEmailLoginPassword: boolean
    } | null
  }
}

export type QueryUserNameQueryVariables = Exact<{
  userName: Scalars['String']['input']
}>

export type QueryUserNameQuery = {
  __typename?: 'Query'
  user?: { __typename?: 'User'; id: string; userName?: string | null } | null
}

export type SetUserNameMutationVariables = Exact<{
  userName: Scalars['String']['input']
}>

export type SetUserNameMutation = {
  __typename?: 'Mutation'
  setUserName: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
  }
}

export type SubmitReportMutationVariables = Exact<{
  id: Scalars['ID']['input']
  reason: ReportReason
}>

export type SubmitReportMutation = {
  __typename?: 'Mutation'
  submitReport: {
    __typename?: 'Report'
    id: string
    target:
      | { __typename?: 'Article' }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle' }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment'; id: string; state: CommentState }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | { __typename?: 'Moment' }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
  }
}

export type SubscribeCirclePublicFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  displayName: string
  description?: string | null
  avatar?: string | null
  owner: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  members: { __typename?: 'MemberConnection'; totalCount: number }
  works: { __typename?: 'ArticleConnection'; totalCount: number }
  prices?: Array<{
    __typename?: 'Price'
    amount: number
    currency: TransactionCurrency
  }> | null
}

export type SubscribeCirclePrivateFragment = {
  __typename?: 'Circle'
  id: string
  isMember: boolean
  invitedBy?: {
    __typename?: 'Invitation'
    id: string
    state: InvitationState
    freePeriod: number
  } | null
}

export type ArticleDonatorsQueryVariables = Exact<{
  id: Scalars['ID']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type ArticleDonatorsQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        donations: {
          __typename?: 'ArticleDonationConnection'
          totalCount: number
          pageInfo: {
            __typename?: 'PageInfo'
            startCursor?: string | null
            endCursor?: string | null
            hasNextPage: boolean
          }
          edges?: Array<{
            __typename?: 'ArticleDonationEdge'
            cursor: string
            node: {
              __typename?: 'ArticleDonation'
              id: string
              sender?: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                isFollower: boolean
                isFollowee: boolean
                info: {
                  __typename?: 'UserInfo'
                  description?: string | null
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
              } | null
            }
          }> | null
        }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type SupportsDialogArticleFragment = {
  __typename?: 'Article'
  id: string
  shortHash: string
  donationsDialog: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
  }
}

export type UnsubscribeCircleMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UnsubscribeCircleMutation = {
  __typename?: 'Mutation'
  unsubscribeCircle: { __typename?: 'Circle'; id: string; isMember: boolean }
}

export type WithdrawVaultUsdtMutationVariables = Exact<{ [key: string]: never }>

export type WithdrawVaultUsdtMutation = {
  __typename?: 'Mutation'
  withdrawLockedTokens: {
    __typename?: 'WithdrawLockedTokensResult'
    transaction: {
      __typename?: 'Transaction'
      id: string
      state: TransactionState
    }
  }
}

export type WithdrawVaultUsdtPollingQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type WithdrawVaultUsdtPollingQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    wallet: {
      __typename?: 'Wallet'
      transactions: {
        __typename?: 'TransactionConnection'
        edges?: Array<{
          __typename?: 'TransactionEdge'
          node: {
            __typename?: 'Transaction'
            id: string
            state: TransactionState
          }
        }> | null
      }
    }
  } | null
}

export type CancelScheduleArticleMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type CancelScheduleArticleMutation = {
  __typename?: 'Mutation'
  publishArticle: {
    __typename?: 'Draft'
    id: string
    publishAt?: any | null
    updatedAt: any
  }
}

export type CancelScheduleButtonDraftFragment = {
  __typename?: 'Draft'
  id: string
  title?: string | null
  publishAt?: any | null
  updatedAt: any
}

export type DeleteDraftMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteDraftMutation = {
  __typename?: 'Mutation'
  deleteDraft?: boolean | null
}

export type DeleteButtonDraftFragment = {
  __typename?: 'Draft'
  id: string
  title?: string | null
}

export type SchedulePublishArticleMutationVariables = Exact<{
  id: Scalars['ID']['input']
  publishAt: Scalars['DateTime']['input']
}>

export type SchedulePublishArticleMutation = {
  __typename?: 'Mutation'
  publishArticle: {
    __typename?: 'Draft'
    id: string
    publishAt?: any | null
    updatedAt: any
  }
}

export type SchedulePublishButtonDraftFragment = {
  __typename?: 'Draft'
  id: string
  publishAt?: any | null
  updatedAt: any
}

export type DraftDigestDropdownActionsDraftFragment = {
  __typename?: 'Draft'
  id: string
  title?: string | null
  summary?: string | null
  content?: string | null
  cover?: string | null
  publishAt?: any | null
  tags?: Array<string> | null
  license: ArticleLicenseType
  canComment: boolean
  sensitiveByAuthor: boolean
  campaigns: Array<{
    __typename?: 'ArticleCampaign'
    campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
  }>
  connections: {
    __typename?: 'ArticleConnection'
    edges?: Array<{
      __typename?: 'ArticleEdge'
      node: { __typename?: 'Article'; id: string; title: string }
    }> | null
  }
  collections: {
    __typename?: 'CollectionConnection'
    edges?: Array<{
      __typename?: 'CollectionEdge'
      node: { __typename?: 'Collection'; id: string; title: string }
    }> | null
  }
  access: {
    __typename?: 'DraftAccess'
    circle?: { __typename?: 'Circle'; id: string } | null
  }
}

export type DraftDigestFeedDraftFragment = {
  __typename?: 'Draft'
  id: string
  title?: string | null
  slug: string
  updatedAt: any
  publishAt?: any | null
  summary?: string | null
  content?: string | null
  cover?: string | null
  tags?: Array<string> | null
  license: ArticleLicenseType
  canComment: boolean
  sensitiveByAuthor: boolean
  campaigns: Array<{
    __typename?: 'ArticleCampaign'
    campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
  }>
  connections: {
    __typename?: 'ArticleConnection'
    edges?: Array<{
      __typename?: 'ArticleEdge'
      node: { __typename?: 'Article'; id: string; title: string }
    }> | null
  }
  collections: {
    __typename?: 'CollectionConnection'
    edges?: Array<{
      __typename?: 'CollectionEdge'
      node: { __typename?: 'Collection'; id: string; title: string }
    }> | null
  }
  access: {
    __typename?: 'DraftAccess'
    circle?: { __typename?: 'Circle'; id: string } | null
  }
}

export type GetArticleByShortHashQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
}>

export type GetArticleByShortHashQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    title: string
    shortHash: string
  } | null
}

export type GetCampaignByShortHashQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
}>

export type GetCampaignByShortHashQuery = {
  __typename?: 'Query'
  campaign?: {
    __typename?: 'WritingChallenge'
    id: string
    shortHash: string
    nameZhHant: string
    nameZhHans: string
    nameEn: string
  } | null
}

export type EditorPreviewDialogCampaignDraftFragment = {
  __typename?: 'Draft'
  id: string
  campaigns: Array<{
    __typename?: 'ArticleCampaign'
    campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
  }>
}

export type EditorPreviewDialogCollectionDraftFragment = {
  __typename?: 'Draft'
  id: string
  collections: {
    __typename?: 'CollectionConnection'
    edges?: Array<{
      __typename?: 'CollectionEdge'
      node: { __typename?: 'Collection'; id: string; title: string }
    }> | null
  }
}

export type EditorPreviewDialogConnectionsDraftFragment = {
  __typename?: 'Draft'
  id: string
  connections: {
    __typename?: 'ArticleConnection'
    edges?: Array<{
      __typename?: 'ArticleEdge'
      node: { __typename?: 'Article'; id: string; title: string }
    }> | null
  }
}

export type FeedDigestDraftFragment = {
  __typename?: 'Draft'
  id: string
  title?: string | null
  summary?: string | null
  content?: string | null
  cover?: string | null
  publishAt?: any | null
}

export type EditorPreviewDialogLicenseDraftFragment = {
  __typename?: 'Draft'
  id: string
  license: ArticleLicenseType
}

export type EditorPreviewDialogMiscDraftFragment = {
  __typename?: 'Draft'
  id: string
  canComment: boolean
  sensitiveByAuthor: boolean
  access: {
    __typename?: 'DraftAccess'
    circle?: { __typename?: 'Circle'; id: string } | null
  }
}

export type EditorPreviewDialogTagsDraftFragment = {
  __typename?: 'Draft'
  id: string
  tags?: Array<string> | null
}

export type EditorPreviewDialogDraftFragment = {
  __typename?: 'Draft'
  id: string
  title?: string | null
  summary?: string | null
  content?: string | null
  cover?: string | null
  publishAt?: any | null
  tags?: Array<string> | null
  license: ArticleLicenseType
  canComment: boolean
  sensitiveByAuthor: boolean
  campaigns: Array<{
    __typename?: 'ArticleCampaign'
    campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
  }>
  connections: {
    __typename?: 'ArticleConnection'
    edges?: Array<{
      __typename?: 'ArticleEdge'
      node: { __typename?: 'Article'; id: string; title: string }
    }> | null
  }
  collections: {
    __typename?: 'CollectionConnection'
    edges?: Array<{
      __typename?: 'CollectionEdge'
      node: { __typename?: 'Collection'; id: string; title: string }
    }> | null
  }
  access: {
    __typename?: 'DraftAccess'
    circle?: { __typename?: 'Circle'; id: string } | null
  }
}

export type GetDraftPublishAtQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetDraftPublishAtQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft'; id: string; publishAt?: any | null }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type EditorSelectCampaignFragment = {
  __typename?: 'WritingChallenge'
  id: string
  state: CampaignState
  name: string
  writingPeriod?: {
    __typename?: 'DatetimeRange'
    start: any
    end?: any | null
  } | null
  stages: Array<{
    __typename?: 'CampaignStage'
    id: string
    name: string
    period?: {
      __typename?: 'DatetimeRange'
      start: any
      end?: any | null
    } | null
  }>
}

export type CollectionDigestCollectionPublicFragment = {
  __typename?: 'Collection'
  id: string
  title: string
  articles: { __typename?: 'ArticleConnection'; totalCount: number }
}

export type ArticleDigestDraftTitleArticleFragment = {
  __typename?: 'Article'
  id: string
  title: string
}

export type EditorViewerFederationSettingQueryVariables = Exact<{
  [key: string]: never
}>

export type EditorViewerFederationSettingQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    federationSetting?: {
      __typename?: 'UserFederationSetting'
      state: FederationAuthorSettingState
    } | null
  } | null
}

export type SetArticleFederationSettingMutationVariables = Exact<{
  input: SetArticleFederationSettingInput
}>

export type SetArticleFederationSettingMutation = {
  __typename?: 'Mutation'
  setArticleFederationSetting: {
    __typename?: 'ArticleFederationSetting'
    articleId: string
    state: FederationArticleSettingState
  }
}

export type SetViewerFederationSettingMutationVariables = Exact<{
  input: SetViewerFederationSettingInput
}>

export type SetViewerFederationSettingMutation = {
  __typename?: 'Mutation'
  setViewerFederationSetting: {
    __typename?: 'UserFederationSetting'
    userId: string
    state: FederationAuthorSettingState
  }
}

export type EditorRecentTagsQueryVariables = Exact<{ [key: string]: never }>

export type EditorRecentTagsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    tags: {
      __typename?: 'TagConnection'
      edges?: Array<{
        __typename?: 'TagEdge'
        cursor: string
        node: {
          __typename?: 'Tag'
          id: string
          content: string
          numArticles: number
        }
      }> | null
    }
  } | null
}

export type EditorRecommendedTagsQueryVariables = Exact<{
  [key: string]: never
}>

export type EditorRecommendedTagsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    tags: {
      __typename?: 'TagConnection'
      edges?: Array<{
        __typename?: 'TagEdge'
        cursor: string
        node: {
          __typename?: 'Tag'
          id: string
          content: string
          numArticles: number
        }
      }> | null
    }
  } | null
}

export type EditorDraftFragment = {
  __typename?: 'Draft'
  id: string
  title?: string | null
  publishState: PublishState
  content?: string | null
  summary?: string | null
  summaryCustomized: boolean
  indentFirstLine: boolean
}

export type MomentCommentFormMomentFragment = {
  __typename?: 'Moment'
  id: string
  shortHash: string
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type NewCommentFragment = { __typename?: 'Comment'; id: string }

export type AddCreditMutationVariables = Exact<{
  input: AddCreditInput
}>

export type AddCreditMutation = {
  __typename?: 'Mutation'
  addCredit: {
    __typename?: 'AddCreditResult'
    client_secret: string
    transaction: {
      __typename?: 'Transaction'
      id: string
      amount: number
      fee: number
      currency: TransactionCurrency
    }
  }
}

export type ViewerStripeAccountQueryVariables = Exact<{ [key: string]: never }>

export type ViewerStripeAccountQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    wallet: {
      __typename?: 'Wallet'
      stripeAccount?: { __typename?: 'StripeAccount'; id: string } | null
    }
  } | null
}

export type ConnectStripeAccountMutationVariables = Exact<{
  country: StripeAccountCountry
}>

export type ConnectStripeAccountMutation = {
  __typename?: 'Mutation'
  connectStripeAccount: {
    __typename?: 'ConnectStripeAccountResult'
    redirectUrl: string
  }
}

export type QueryUserByAddressQueryVariables = Exact<{
  ethAddress: Scalars['String']['input']
}>

export type QueryUserByAddressQuery = {
  __typename?: 'Query'
  user?: { __typename?: 'User'; id: string } | null
}

export type ViewerTxStateQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type ViewerTxStateQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    wallet: {
      __typename?: 'Wallet'
      balance: { __typename?: 'Balance'; HKD: number }
      transactions: {
        __typename?: 'TransactionConnection'
        edges?: Array<{
          __typename?: 'TransactionEdge'
          node: {
            __typename?: 'Transaction'
            id: string
            state: TransactionState
          }
        }> | null
      }
    }
  } | null
}

export type ResetPaymentPasswordMutationVariables = Exact<{
  input: ResetPasswordInput
}>

export type ResetPaymentPasswordMutation = {
  __typename?: 'Mutation'
  resetPassword?: boolean | null
}

export type ViewerCircleStateQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type ViewerCircleStateQuery = {
  __typename?: 'Query'
  circle?: { __typename?: 'Circle'; id: string; isMember: boolean } | null
}

export type SubscribeCircleMutationVariables = Exact<{
  input: SubscribeCircleInput
}>

export type SubscribeCircleMutation = {
  __typename?: 'Mutation'
  subscribeCircle: {
    __typename?: 'SubscribeCircleResult'
    client_secret?: string | null
    circle: { __typename?: 'Circle'; id: string; isMember: boolean }
  }
}

export type WalletPaymentMethodQueryVariables = Exact<{ [key: string]: never }>

export type WalletPaymentMethodQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    wallet: { __typename?: 'Wallet'; cardLast4?: string | null }
  } | null
}

export type SetPaymentPasswordMutationVariables = Exact<{
  password?: InputMaybe<Scalars['String']['input']>
}>

export type SetPaymentPasswordMutation = {
  __typename?: 'Mutation'
  updateUserInfo: {
    __typename?: 'User'
    id: string
    status?: { __typename?: 'UserStatus'; hasPaymentPassword: boolean } | null
  }
}

export type ArticleConnectionsFragment = {
  __typename?: 'Article'
  id: string
  connections: {
    __typename?: 'ArticleConnection'
    totalCount: number
    pageInfo: {
      __typename?: 'PageInfo'
      startCursor?: string | null
      endCursor?: string | null
      hasNextPage: boolean
    }
    edges?: Array<{
      __typename?: 'ArticleEdge'
      cursor: string
      node: {
        __typename?: 'Article'
        id: string
        title: string
        slug: string
        shortHash: string
        state: ArticleState
        articleState: ArticleState
        author: {
          __typename?: 'User'
          id: string
          userName?: string | null
          isBlocking: boolean
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
      }
    }> | null
  }
}

export type AssetFragment = {
  __typename?: 'Asset'
  id: string
  type: AssetType
  path: string
  draft?: boolean | null
  uploadURL?: string | null
}

export type FollowersCircleFragment = {
  __typename?: 'Circle'
  id: string
  followers: {
    __typename?: 'UserConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'UserEdge'
      cursor: string
      node: {
        __typename?: 'User'
        id: string
        avatar?: string | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        }
      }
    }> | null
  }
}

export type PublishStateDraftFragment = {
  __typename?: 'Draft'
  id: string
  publishState: PublishState
  campaigns: Array<{
    __typename?: 'ArticleCampaign'
    campaign: { __typename?: 'WritingChallenge'; id: string }
  }>
  access: {
    __typename?: 'DraftAccess'
    circle?: { __typename?: 'Circle'; id: string } | null
  }
  article?: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    shortHash: string
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
    }
    tags?: Array<{ __typename?: 'Tag'; id: string; content: string }> | null
  } | null
}

export type CreateDraftMutationVariables = Exact<{ [key: string]: never }>

export type CreateDraftMutation = {
  __typename?: 'Mutation'
  putDraft: { __typename?: 'Draft'; id: string; slug: string }
}

export type EmailLoginMutationVariables = Exact<{
  input: EmailLoginInput
}>

export type EmailLoginMutation = {
  __typename?: 'Mutation'
  emailLogin: {
    __typename?: 'AuthResult'
    auth: boolean
    token?: string | null
    user?: {
      __typename?: 'User'
      id: string
      settings: { __typename?: 'UserSettings'; language: UserLanguage }
      info: { __typename?: 'UserInfo'; group: UserGroup }
    } | null
  }
}

export type GenerateSigningMessageMutationVariables = Exact<{
  input: GenerateSigningMessageInput
}>

export type GenerateSigningMessageMutation = {
  __typename?: 'Mutation'
  generateSigningMessage: {
    __typename?: 'SigningMessageResult'
    nonce: string
    signingMessage: string
    createdAt: any
    expiredAt: any
  }
}

export type InviteCircleMutationVariables = Exact<{
  circleId: Scalars['ID']['input']
  freePeriod: Scalars['freePeriod_Int_NotNull_exclusiveMin_0']['input']
  invitees: Array<InviteCircleInvitee> | InviteCircleInvitee
}>

export type InviteCircleMutation = {
  __typename?: 'Mutation'
  invite?: Array<{ __typename?: 'Invitation'; id: string }> | null
}

export type LikeCollectionMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type LikeCollectionMutation = {
  __typename?: 'Mutation'
  likeCollection: {
    __typename?: 'Collection'
    id: string
    likeCount: number
    liked: boolean
  }
}

export type UnlikeCollectionMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UnlikeCollectionMutation = {
  __typename?: 'Mutation'
  unlikeCollection: {
    __typename?: 'Collection'
    id: string
    likeCount: number
    liked: boolean
  }
}

export type LikeMomentMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type LikeMomentMutation = {
  __typename?: 'Mutation'
  likeMoment: {
    __typename?: 'Moment'
    id: string
    likeCount: number
    liked: boolean
  }
}

export type UnlikeMomentMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UnlikeMomentMutation = {
  __typename?: 'Mutation'
  unlikeMoment: {
    __typename?: 'Moment'
    id: string
    likeCount: number
    liked: boolean
  }
}

export type MigrationMutationVariables = Exact<{
  input: MigrationInput
}>

export type MigrationMutation = {
  __typename?: 'Mutation'
  migration?: boolean | null
}

export type PayToMutationVariables = Exact<{
  amount: Scalars['amount_Float_NotNull_exclusiveMin_0']['input']
  currency: TransactionCurrency
  purpose: TransactionPurpose
  recipientId: Scalars['ID']['input']
  targetId?: InputMaybe<Scalars['ID']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  chain?: InputMaybe<Chain>
  txHash?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}>

export type PayToMutation = {
  __typename?: 'Mutation'
  payTo: {
    __typename?: 'PayToResult'
    redirectUrl?: string | null
    transaction: {
      __typename?: 'Transaction'
      id: string
      state: TransactionState
    }
  }
}

export type PayoutMutationVariables = Exact<{
  amount: Scalars['amount_Float_NotNull_exclusiveMin_0']['input']
  password: Scalars['String']['input']
}>

export type PayoutMutation = {
  __typename?: 'Mutation'
  payout: { __typename?: 'Transaction'; id: string; state: TransactionState }
}

export type PublishArticleMutationVariables = Exact<{
  id: Scalars['ID']['input']
  publishAt?: InputMaybe<Scalars['DateTime']['input']>
}>

export type PublishArticleMutation = {
  __typename?: 'Mutation'
  publishArticle: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    publishAt?: any | null
    updatedAt: any
  }
}

export type PutCircleMutationVariables = Exact<{
  input: PutCircleInput
}>

export type PutCircleMutation = {
  __typename?: 'Mutation'
  putCircle: {
    __typename?: 'Circle'
    id: string
    name: string
    displayName: string
    description?: string | null
    avatar?: string | null
    cover?: string | null
    prices?: Array<{
      __typename?: 'Price'
      id: string
      amount: number
      currency: TransactionCurrency
    }> | null
  }
}

export type PutCircleArticlesMutationVariables = Exact<{
  id: Scalars['ID']['input']
  articles?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>
  type: PutCircleArticlesType
  accessType: ArticleAccessType
  license: ArticleLicenseType
}>

export type PutCircleArticlesMutation = {
  __typename?: 'Mutation'
  putCircleArticles: { __typename?: 'Circle'; id: string }
}

export type PutArticleCommentMutationVariables = Exact<{
  input: PutCommentInput
}>

export type PutArticleCommentMutation = {
  __typename?: 'Mutation'
  putComment: {
    __typename?: 'Comment'
    id: string
    type: CommentType
    createdAt: any
    fromDonator: boolean
    pinned: boolean
    state: CommentState
    content?: string | null
    upvotes: number
    myVote?: Vote | null
    comments: {
      __typename?: 'CommentConnection'
      edges?: Array<{
        __typename?: 'CommentEdge'
        cursor: string
        node: {
          __typename?: 'Comment'
          id: string
          type: CommentType
          createdAt: any
          fromDonator: boolean
          pinned: boolean
          state: CommentState
          content?: string | null
          upvotes: number
          myVote?: Vote | null
          author: {
            __typename?: 'User'
            id: string
            isBlocked: boolean
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
          replyTo?: {
            __typename?: 'Comment'
            id: string
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
          } | null
          node:
            | {
                __typename?: 'Article'
                id: string
                shortHash: string
                commentCount: number
                pinCommentLeft: number
                author: {
                  __typename?: 'User'
                  id: string
                  isBlocking: boolean
                  userName?: string | null
                }
              }
            | { __typename?: 'ArticleVersion' }
            | { __typename?: 'Circle' }
            | { __typename?: 'Collection' }
            | { __typename?: 'Comment' }
            | { __typename?: 'CurationChannel' }
            | { __typename?: 'Draft' }
            | { __typename?: 'IcymiTopic' }
            | {
                __typename?: 'Moment'
                id: string
                shortHash: string
                commentCount: number
                author: {
                  __typename?: 'User'
                  id: string
                  isBlocking: boolean
                  userName?: string | null
                }
              }
            | { __typename?: 'Report' }
            | { __typename?: 'Tag' }
            | { __typename?: 'TopicChannel' }
            | { __typename?: 'User' }
            | { __typename?: 'WritingChallenge' }
          parentComment?: { __typename?: 'Comment'; id: string } | null
          dropdownComments: {
            __typename?: 'CommentConnection'
            totalCount: number
          }
          communityWatchAction?: {
            __typename?: 'CommunityWatchAction'
            uuid: string
          } | null
        }
      }> | null
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
    }
    author: {
      __typename?: 'User'
      id: string
      isBlocked: boolean
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    replyTo?: {
      __typename?: 'Comment'
      id: string
      author: {
        __typename?: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        avatar?: string | null
        status?: { __typename?: 'UserStatus'; state: UserState } | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          cryptoWallet?: {
            __typename?: 'CryptoWallet'
            id: string
            address: string
            hasNFTs: boolean
          } | null
        }
      }
    } | null
    node:
      | {
          __typename?: 'Article'
          id: string
          shortHash: string
          commentCount: number
          pinCommentLeft: number
          author: {
            __typename?: 'User'
            id: string
            isBlocking: boolean
            userName?: string | null
          }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle' }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          commentCount: number
          author: {
            __typename?: 'User'
            id: string
            isBlocking: boolean
            userName?: string | null
          }
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    dropdownComments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
  }
}

export type PutMomentCommentMutationVariables = Exact<{
  input: PutCommentInput
}>

export type PutMomentCommentMutation = {
  __typename?: 'Mutation'
  putComment: {
    __typename?: 'Comment'
    id: string
    type: CommentType
    createdAt: any
    fromDonator: boolean
    pinned: boolean
    state: CommentState
    content?: string | null
    upvotes: number
    myVote?: Vote | null
    author: {
      __typename?: 'User'
      id: string
      isBlocked: boolean
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    replyTo?: {
      __typename?: 'Comment'
      id: string
      author: {
        __typename?: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        avatar?: string | null
        status?: { __typename?: 'UserStatus'; state: UserState } | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          cryptoWallet?: {
            __typename?: 'CryptoWallet'
            id: string
            address: string
            hasNFTs: boolean
          } | null
        }
      }
    } | null
    node:
      | {
          __typename?: 'Article'
          id: string
          shortHash: string
          commentCount: number
          pinCommentLeft: number
          author: {
            __typename?: 'User'
            id: string
            isBlocking: boolean
            userName?: string | null
          }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle' }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          commentCount: number
          author: {
            __typename?: 'User'
            id: string
            isBlocking: boolean
            userName?: string | null
          }
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    dropdownComments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
  }
}

export type PutCircleCommentMutationVariables = Exact<{
  input: PutCommentInput
}>

export type PutCircleCommentMutation = {
  __typename?: 'Mutation'
  putComment: { __typename?: 'Comment'; id: string; content?: string | null }
}

export type PutMomentMutationVariables = Exact<{
  input: PutMomentInput
}>

export type PutMomentMutation = {
  __typename?: 'Mutation'
  putMoment: {
    __typename?: 'Moment'
    id: string
    createdAt: any
    shortHash: string
    state: MomentState
    content?: string | null
    commentCount: number
    likeCount: number
    liked: boolean
    momentState: MomentState
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
    commentedFollowees: Array<{
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }>
  }
}

export type SendVerificationCodeMutationVariables = Exact<{
  input: SendVerificationCodeInput
}>

export type SendVerificationCodeMutation = {
  __typename?: 'Mutation'
  sendVerificationCode?: boolean | null
}

export type ToggleBlockUserMutationVariables = Exact<{
  id: Scalars['ID']['input']
  enabled?: InputMaybe<Scalars['Boolean']['input']>
}>

export type ToggleBlockUserMutation = {
  __typename?: 'Mutation'
  toggleBlockUser: { __typename?: 'User'; id: string; isBlocked: boolean }
}

export type ToggleBookmarkArticleMutationVariables = Exact<{
  id: Scalars['ID']['input']
  enabled?: InputMaybe<Scalars['Boolean']['input']>
}>

export type ToggleBookmarkArticleMutation = {
  __typename?: 'Mutation'
  toggleBookmarkArticle: {
    __typename?: 'Article'
    id: string
    bookmarked: boolean
  }
}

export type ToggleBookmarkTagMutationVariables = Exact<{
  id: Scalars['ID']['input']
  enabled?: InputMaybe<Scalars['Boolean']['input']>
}>

export type ToggleBookmarkTagMutation = {
  __typename?: 'Mutation'
  toggleBookmarkTag: {
    __typename?: 'Tag'
    id: string
    isFollower?: boolean | null
  }
}

export type ToggleFollowCircleMutationVariables = Exact<{
  id: Scalars['ID']['input']
  enabled?: InputMaybe<Scalars['Boolean']['input']>
}>

export type ToggleFollowCircleMutation = {
  __typename?: 'Mutation'
  toggleFollowCircle: { __typename?: 'Circle'; id: string; isFollower: boolean }
}

export type ToggleFollowUserMutationVariables = Exact<{
  id: Scalars['ID']['input']
  enabled?: InputMaybe<Scalars['Boolean']['input']>
}>

export type ToggleFollowUserMutation = {
  __typename?: 'Mutation'
  toggleFollowUser: {
    __typename?: 'User'
    id: string
    isFollowee: boolean
    isFollower: boolean
  }
}

export type TogglePinChannelArticlesMutationVariables = Exact<{
  channels: Array<Scalars['ID']['input']> | Scalars['ID']['input']
  articles: Array<Scalars['ID']['input']> | Scalars['ID']['input']
  pinned: Scalars['Boolean']['input']
}>

export type TogglePinChannelArticlesMutation = {
  __typename?: 'Mutation'
  togglePinChannelArticles: Array<
    | { __typename?: 'CurationChannel'; id: string; shortHash: string }
    | { __typename?: 'Tag'; id: string; shortHash: string }
    | { __typename?: 'TopicChannel'; id: string; shortHash: string }
    | { __typename?: 'WritingChallenge'; id: string; shortHash: string }
  >
}

export type BatchPinUnpinChannelArticlesMutationVariables = Exact<{
  pinChannels: Array<Scalars['ID']['input']> | Scalars['ID']['input']
  unpinChannels: Array<Scalars['ID']['input']> | Scalars['ID']['input']
  articles: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type BatchPinUnpinChannelArticlesMutation = {
  __typename?: 'Mutation'
  pinChannelArticles: Array<
    | { __typename?: 'CurationChannel'; id: string; shortHash: string }
    | { __typename?: 'Tag'; id: string; shortHash: string }
    | { __typename?: 'TopicChannel'; id: string; shortHash: string }
    | { __typename?: 'WritingChallenge'; id: string; shortHash: string }
  >
  unpinChannelArticles: Array<
    | { __typename?: 'CurationChannel'; id: string; shortHash: string }
    | { __typename?: 'Tag'; id: string; shortHash: string }
    | { __typename?: 'TopicChannel'; id: string; shortHash: string }
    | { __typename?: 'WritingChallenge'; id: string; shortHash: string }
  >
}

export type ToggleArticlePinCommentMutationVariables = Exact<{
  id: Scalars['ID']['input']
  enabled?: InputMaybe<Scalars['Boolean']['input']>
}>

export type ToggleArticlePinCommentMutation = {
  __typename?: 'Mutation'
  togglePinComment: {
    __typename?: 'Comment'
    id: string
    pinned: boolean
    node:
      | { __typename?: 'Article'; id: string; pinCommentLeft: number }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle' }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | { __typename?: 'Moment' }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
  }
}

export type ToggleCirclePinCommentMutationVariables = Exact<{
  id: Scalars['ID']['input']
  enabled?: InputMaybe<Scalars['Boolean']['input']>
}>

export type ToggleCirclePinCommentMutation = {
  __typename?: 'Mutation'
  togglePinComment: {
    __typename?: 'Comment'
    id: string
    pinned: boolean
    node:
      | { __typename?: 'Article' }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | { __typename?: 'Moment' }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
  }
}

export type SingleFileUploadMutationVariables = Exact<{
  input: SingleFileUploadInput
}>

export type SingleFileUploadMutation = {
  __typename?: 'Mutation'
  singleFileUpload: {
    __typename?: 'Asset'
    id: string
    type: AssetType
    path: string
    draft?: boolean | null
    uploadURL?: string | null
  }
}

export type DirectImageUploadMutationVariables = Exact<{
  input: DirectImageUploadInput
}>

export type DirectImageUploadMutation = {
  __typename?: 'Mutation'
  directImageUpload: {
    __typename?: 'Asset'
    id: string
    type: AssetType
    path: string
    draft?: boolean | null
    uploadURL?: string | null
  }
}

export type DirectImageUploadDoneMutationVariables = Exact<{
  url: Scalars['url_String_format_uri']['input']
  type: AssetType
  entityType: EntityType
  entityId?: InputMaybe<Scalars['ID']['input']>
}>

export type DirectImageUploadDoneMutation = {
  __typename?: 'Mutation'
  directImageUpload: {
    __typename?: 'Asset'
    id: string
    type: AssetType
    path: string
    draft?: boolean | null
    uploadURL?: string | null
  }
}

export type UserLogoutMutationVariables = Exact<{ [key: string]: never }>

export type UserLogoutMutation = {
  __typename?: 'Mutation'
  userLogout: boolean
}

export type ConfirmVerificationCodeMutationVariables = Exact<{
  input: ConfirmVerificationCodeInput
}>

export type ConfirmVerificationCodeMutation = {
  __typename?: 'Mutation'
  confirmVerificationCode: string
}

export type VoteCommentMutationVariables = Exact<{
  id: Scalars['ID']['input']
  vote: Vote
}>

export type VoteCommentMutation = {
  __typename?: 'Mutation'
  voteComment: {
    __typename?: 'Comment'
    id: string
    upvotes: number
    downvotes: number
    myVote?: Vote | null
  }
}

export type UnvoteCommentMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UnvoteCommentMutation = {
  __typename?: 'Mutation'
  unvoteComment: {
    __typename?: 'Comment'
    id: string
    upvotes: number
    downvotes: number
    myVote?: Vote | null
  }
}

export type WalletLoginMutationVariables = Exact<{
  input: WalletLoginInput
}>

export type WalletLoginMutation = {
  __typename?: 'Mutation'
  walletLogin: {
    __typename?: 'AuthResult'
    token?: string | null
    auth: boolean
    type: AuthResultType
    user?: {
      __typename?: 'User'
      id: string
      settings: { __typename?: 'UserSettings'; language: UserLanguage }
      info: { __typename?: 'UserInfo'; group: UserGroup }
    } | null
  }
}

export type AddWalletLoginMutationVariables = Exact<{
  input: WalletLoginInput
}>

export type AddWalletLoginMutation = {
  __typename?: 'Mutation'
  addWalletLogin: {
    __typename?: 'User'
    id: string
    info: { __typename?: 'UserInfo'; ethAddress?: string | null }
  }
}

export type ChannelByShortHashQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
  userLanguage: UserLanguage
}>

export type ChannelByShortHashQuery = {
  __typename?: 'Query'
  channel?:
    | {
        __typename?: 'CurationChannel'
        name: string
        note?: string | null
        id: string
      }
    | { __typename?: 'Tag'; id: string }
    | {
        __typename?: 'TopicChannel'
        name: string
        note?: string | null
        id: string
      }
    | { __typename?: 'WritingChallenge'; name: string; id: string }
    | null
}

export type CircleFollowerCountQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type CircleFollowerCountQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    followers: { __typename?: 'UserConnection'; totalCount: number }
  } | null
}

export type ClientPreferenceQueryVariables = Exact<{ [key: string]: never }>

export type ClientPreferenceQuery = {
  __typename?: 'Query'
  clientPreference: {
    __typename?: 'ClientPreference'
    id: string
    wall: boolean
    circleBanner: boolean
  }
}

export type DraftPublishStateQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DraftPublishStateQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | {
        __typename?: 'Draft'
        id: string
        publishState: PublishState
        campaigns: Array<{
          __typename?: 'ArticleCampaign'
          campaign: { __typename?: 'WritingChallenge'; id: string }
        }>
        access: {
          __typename?: 'DraftAccess'
          circle?: { __typename?: 'Circle'; id: string } | null
        }
        article?: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
          }
          tags?: Array<{
            __typename?: 'Tag'
            id: string
            content: string
          }> | null
        } | null
      }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type ExchangeRatesQueryVariables = Exact<{
  from?: InputMaybe<TransactionCurrency>
  to?: InputMaybe<QuoteCurrency>
}>

export type ExchangeRatesQuery = {
  __typename?: 'Query'
  exchangeRates?: Array<{
    __typename?: 'ExchangeRate'
    from: TransactionCurrency
    to: QuoteCurrency
    rate: number
    updatedAt: any
  }> | null
}

export type LastFetchRandomQueryVariables = Exact<{ [key: string]: never }>

export type LastFetchRandomQuery = {
  __typename?: 'Query'
  lastFetchRandom: {
    __typename?: 'LastFetchRandom'
    id: string
    sidebarTags?: number | null
    feedTags?: number | null
    sidebarAuthors?: number | null
    feedAuthors?: number | null
  }
}

export type UnreadNoticeCountQueryVariables = Exact<{ [key: string]: never }>

export type UnreadNoticeCountQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    status?: { __typename?: 'UserStatus'; unreadNoticeCount: number } | null
  } | null
}

export type OauthRequestTokenQueryVariables = Exact<{ [key: string]: never }>

export type OauthRequestTokenQuery = {
  __typename?: 'Query'
  oauthRequestToken?: string | null
}

export type SearchArticlesQueryVariables = Exact<{
  search: Scalars['String']['input']
  filter?: InputMaybe<SearchFilter>
}>

export type SearchArticlesQuery = {
  __typename?: 'Query'
  search: {
    __typename?: 'SearchResultConnection'
    edges?: Array<{
      __typename?: 'SearchResultEdge'
      node:
        | {
            __typename?: 'Article'
            id: string
            title: string
            slug: string
            shortHash: string
            state: ArticleState
            articleState: ArticleState
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              isBlocking: boolean
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
          }
        | { __typename?: 'ArticleVersion' }
        | { __typename?: 'Circle' }
        | { __typename?: 'Collection' }
        | { __typename?: 'Comment' }
        | { __typename?: 'CurationChannel' }
        | { __typename?: 'Draft' }
        | { __typename?: 'IcymiTopic' }
        | { __typename?: 'Moment' }
        | { __typename?: 'Report' }
        | { __typename?: 'Tag' }
        | { __typename?: 'TopicChannel' }
        | { __typename?: 'User' }
        | { __typename?: 'WritingChallenge' }
    }> | null
  }
}

export type SearchUsersQueryVariables = Exact<{
  search: Scalars['String']['input']
  exclude?: InputMaybe<SearchExclude>
}>

export type SearchUsersQuery = {
  __typename?: 'Query'
  search: {
    __typename?: 'SearchResultConnection'
    edges?: Array<{
      __typename?: 'SearchResultEdge'
      node:
        | { __typename?: 'Article' }
        | { __typename?: 'ArticleVersion' }
        | { __typename?: 'Circle' }
        | { __typename?: 'Collection' }
        | { __typename?: 'Comment' }
        | { __typename?: 'CurationChannel' }
        | { __typename?: 'Draft' }
        | { __typename?: 'IcymiTopic' }
        | { __typename?: 'Moment' }
        | { __typename?: 'Report' }
        | { __typename?: 'Tag' }
        | { __typename?: 'TopicChannel' }
        | {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        | { __typename?: 'WritingChallenge' }
    }> | null
  }
}

export type TagArticlesPublicQueryVariables = Exact<{
  id: Scalars['ID']['input']
  after?: InputMaybe<Scalars['String']['input']>
  sortBy?: InputMaybe<TagArticlesSortBy>
}>

export type TagArticlesPublicQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | {
        __typename?: 'Tag'
        id: string
        articles: {
          __typename?: 'ChannelArticleConnection'
          pageInfo: {
            __typename?: 'PageInfo'
            startCursor?: string | null
            endCursor?: string | null
            hasNextPage: boolean
          }
          edges?: Array<{
            __typename?: 'ChannelArticleEdge'
            cursor: string
            node: {
              __typename?: 'Article'
              id: string
              title: string
              slug: string
              shortHash: string
              displayCover?: string | null
              summary: string
              createdAt: any
              readTime: number
              bookmarked: boolean
              pinned: boolean
              revisionCount: number
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
              access: {
                __typename?: 'ArticleAccess'
                type: ArticleAccessType
                circle?: {
                  __typename?: 'Circle'
                  id: string
                  name: string
                  displayName: string
                } | null
              }
              collections: {
                __typename?: 'CollectionConnection'
                edges?: Array<{
                  __typename?: 'CollectionEdge'
                  node: {
                    __typename?: 'Collection'
                    id: string
                    title: string
                    articles: {
                      __typename?: 'ArticleConnection'
                      totalCount: number
                    }
                  }
                }> | null
              }
              campaigns: Array<{
                __typename?: 'ArticleCampaign'
                campaign: {
                  __typename?: 'WritingChallenge'
                  id: string
                  name: string
                  shortHash: string
                  nameZhHant: string
                  nameZhHans: string
                  nameEn: string
                }
                stage?: { __typename?: 'CampaignStage'; id: string } | null
              }>
              tags?: Array<{
                __typename?: 'Tag'
                id: string
                content: string
              }> | null
              donations: {
                __typename?: 'ArticleDonationConnection'
                totalCount: number
              }
              likesReceived: {
                __typename?: 'AppreciationConnection'
                totalCount: number
              }
              donationsDialog: {
                __typename?: 'ArticleDonationConnection'
                totalCount: number
              }
            }
          }> | null
        }
      }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type TagArticlesPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type TagArticlesPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string; bookmarked: boolean }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
  > | null
}

export type UnreadFollowingQueryVariables = Exact<{ [key: string]: never }>

export type UnreadFollowingQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    status?: { __typename?: 'UserStatus'; unreadFollowing: boolean } | null
  } | null
}

export type UserFollowerCountQueryVariables = Exact<{
  userName: Scalars['String']['input']
}>

export type UserFollowerCountQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    followers: { __typename?: 'UserConnection'; totalCount: number }
  } | null
}

export type WalletBalanceQueryVariables = Exact<{ [key: string]: never }>

export type WalletBalanceQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    wallet: {
      __typename?: 'Wallet'
      balance: { __typename?: 'Balance'; HKD: number }
      stripeAccount?: { __typename?: 'StripeAccount'; id: string } | null
    }
    liker: { __typename?: 'Liker'; total: number }
  } | null
}

export type ViewerEmailQueryVariables = Exact<{ [key: string]: never }>

export type ViewerEmailQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    info: {
      __typename?: 'UserInfo'
      email?: any | null
      emailVerified: boolean
    }
  } | null
}

export type MeNoticesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type MeNoticesQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    notices: {
      __typename?: 'NoticeConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'NoticeEdge'
        cursor: string
        node:
          | {
              __typename: 'ArticleArticleNotice'
              id: string
              createdAt: any
              unread: boolean
              articleArticleNoticeType: ArticleArticleNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              article: {
                __typename?: 'Article'
                id: string
                title: string
                slug: string
                shortHash: string
                summary: string
                articleState: ArticleState
                author: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                }
              }
              collection: {
                __typename?: 'Article'
                id: string
                summary: string
                title: string
                slug: string
                shortHash: string
                articleState: ArticleState
                author: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                }
              }
            }
          | {
              __typename: 'ArticleNotice'
              id: string
              createdAt: any
              unread: boolean
              articleNoticeType: ArticleNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              article: {
                __typename?: 'Article'
                id: string
                summary: string
                title: string
                slug: string
                shortHash: string
                articleState: ArticleState
                author: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                  avatar?: string | null
                  status?: {
                    __typename?: 'UserStatus'
                    state: UserState
                  } | null
                  liker: { __typename?: 'Liker'; civicLiker: boolean }
                  info: {
                    __typename?: 'UserInfo'
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                    cryptoWallet?: {
                      __typename?: 'CryptoWallet'
                      id: string
                      address: string
                      hasNFTs: boolean
                    } | null
                  }
                }
                access: {
                  __typename?: 'ArticleAccess'
                  circle?: {
                    __typename?: 'Circle'
                    id: string
                    name: string
                    displayName: string
                  } | null
                }
              }
              entities: Array<
                | { __typename?: 'Article'; id: string }
                | { __typename?: 'ArticleVersion'; id: string }
                | { __typename?: 'Circle'; id: string }
                | { __typename?: 'Collection'; id: string }
                | { __typename?: 'Comment'; id: string }
                | { __typename?: 'CurationChannel'; id: string }
                | { __typename?: 'Draft'; id: string }
                | { __typename?: 'IcymiTopic'; id: string }
                | { __typename?: 'Moment'; id: string }
                | { __typename?: 'Report'; id: string }
                | { __typename?: 'Tag'; id: string }
                | { __typename?: 'TopicChannel'; id: string }
                | { __typename?: 'User'; id: string }
                | { __typename?: 'WritingChallenge'; id: string }
              >
            }
          | {
              __typename: 'CampaignArticleNotice'
              id: string
              createdAt: any
              unread: boolean
              campaignArticleNoticeType: CampaignArticleNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              campaign: {
                __typename?: 'WritingChallenge'
                id: string
                shortHash: string
              }
              article: {
                __typename?: 'Article'
                id: string
                summary: string
                title: string
                slug: string
                shortHash: string
                articleState: ArticleState
                author: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                }
              }
            }
          | {
              __typename: 'CircleNotice'
              id: string
              createdAt: any
              unread: boolean
              circleNoticeType: CircleNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                isFollower: boolean
                isFollowee: boolean
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                info: {
                  __typename?: 'UserInfo'
                  description?: string | null
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
                liker: { __typename?: 'Liker'; civicLiker: boolean }
              }> | null
              circle: {
                __typename?: 'Circle'
                id: string
                name: string
                displayName: string
                description?: string | null
                avatar?: string | null
                invitedBy?: {
                  __typename?: 'Invitation'
                  id: string
                  freePeriod: number
                } | null
                owner: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                  avatar?: string | null
                  status?: {
                    __typename?: 'UserStatus'
                    state: UserState
                  } | null
                  liker: { __typename?: 'Liker'; civicLiker: boolean }
                  info: {
                    __typename?: 'UserInfo'
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                    cryptoWallet?: {
                      __typename?: 'CryptoWallet'
                      id: string
                      address: string
                      hasNFTs: boolean
                    } | null
                  }
                }
                members: { __typename?: 'MemberConnection'; totalCount: number }
                works: { __typename?: 'ArticleConnection'; totalCount: number }
                prices?: Array<{
                  __typename?: 'Price'
                  amount: number
                  currency: TransactionCurrency
                }> | null
              }
              comments?: Array<{
                __typename?: 'Comment'
                id: string
                type: CommentType
                content?: string | null
                state: CommentState
                parentComment?: { __typename?: 'Comment'; id: string } | null
                node:
                  | {
                      __typename?: 'Article'
                      id: string
                      title: string
                      slug: string
                      shortHash: string
                      articleState: ArticleState
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                      }
                    }
                  | { __typename?: 'ArticleVersion' }
                  | { __typename?: 'Circle'; id: string; name: string }
                  | { __typename?: 'Collection' }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'CurationChannel' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'IcymiTopic' }
                  | {
                      __typename?: 'Moment'
                      id: string
                      shortHash: string
                      momentState: MomentState
                    }
                  | { __typename?: 'Report' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'TopicChannel' }
                  | { __typename?: 'User' }
                  | { __typename?: 'WritingChallenge' }
                comments: {
                  __typename?: 'CommentConnection'
                  totalCount: number
                }
                communityWatchAction?: {
                  __typename?: 'CommunityWatchAction'
                  uuid: string
                } | null
                author: { __typename?: 'User'; id: string; isBlocked: boolean }
              }> | null
              replies?: Array<{
                __typename?: 'Comment'
                id: string
                type: CommentType
                content?: string | null
                state: CommentState
                parentComment?: { __typename?: 'Comment'; id: string } | null
                author: { __typename?: 'User'; id: string; isBlocked: boolean }
                replyTo?: {
                  __typename?: 'Comment'
                  author: { __typename?: 'User'; id: string }
                } | null
                node:
                  | {
                      __typename?: 'Article'
                      id: string
                      title: string
                      slug: string
                      shortHash: string
                      articleState: ArticleState
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                      }
                    }
                  | { __typename?: 'ArticleVersion' }
                  | { __typename?: 'Circle'; id: string; name: string }
                  | { __typename?: 'Collection' }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'CurationChannel' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'IcymiTopic' }
                  | {
                      __typename?: 'Moment'
                      id: string
                      shortHash: string
                      momentState: MomentState
                    }
                  | { __typename?: 'Report' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'TopicChannel' }
                  | { __typename?: 'User' }
                  | { __typename?: 'WritingChallenge' }
                comments: {
                  __typename?: 'CommentConnection'
                  totalCount: number
                }
                communityWatchAction?: {
                  __typename?: 'CommunityWatchAction'
                  uuid: string
                } | null
              }> | null
              mentions?: Array<{
                __typename?: 'Comment'
                id: string
                type: CommentType
                content?: string | null
                state: CommentState
                parentComment?: { __typename?: 'Comment'; id: string } | null
                node:
                  | {
                      __typename?: 'Article'
                      id: string
                      title: string
                      slug: string
                      shortHash: string
                      articleState: ArticleState
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                      }
                    }
                  | { __typename?: 'ArticleVersion' }
                  | { __typename?: 'Circle'; id: string; name: string }
                  | { __typename?: 'Collection' }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'CurationChannel' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'IcymiTopic' }
                  | {
                      __typename?: 'Moment'
                      id: string
                      shortHash: string
                      momentState: MomentState
                    }
                  | { __typename?: 'Report' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'TopicChannel' }
                  | { __typename?: 'User' }
                  | { __typename?: 'WritingChallenge' }
                comments: {
                  __typename?: 'CommentConnection'
                  totalCount: number
                }
                communityWatchAction?: {
                  __typename?: 'CommunityWatchAction'
                  uuid: string
                } | null
                author: { __typename?: 'User'; id: string; isBlocked: boolean }
              }> | null
            }
          | {
              __typename: 'CollectionNotice'
              id: string
              createdAt: any
              unread: boolean
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              collection: {
                __typename?: 'Collection'
                id: string
                title: string
                author: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                }
              }
            }
          | {
              __typename: 'CommentCommentNotice'
              id: string
              createdAt: any
              unread: boolean
              commentCommentNoticeType: CommentCommentNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              comment: {
                __typename?: 'Comment'
                id: string
                state: CommentState
                type: CommentType
                content?: string | null
                node:
                  | {
                      __typename?: 'Article'
                      id: string
                      title: string
                      slug: string
                      shortHash: string
                      articleState: ArticleState
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                      }
                    }
                  | { __typename?: 'ArticleVersion' }
                  | { __typename?: 'Circle'; id: string; name: string }
                  | { __typename?: 'Collection' }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'CurationChannel' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'IcymiTopic' }
                  | {
                      __typename?: 'Moment'
                      id: string
                      shortHash: string
                      momentState: MomentState
                    }
                  | { __typename?: 'Report' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'TopicChannel' }
                  | { __typename?: 'User' }
                  | { __typename?: 'WritingChallenge' }
                parentComment?: { __typename?: 'Comment'; id: string } | null
                comments: {
                  __typename?: 'CommentConnection'
                  totalCount: number
                }
                communityWatchAction?: {
                  __typename?: 'CommunityWatchAction'
                  uuid: string
                } | null
                author: { __typename?: 'User'; id: string; isBlocked: boolean }
              }
              reply: {
                __typename?: 'Comment'
                id: string
                state: CommentState
                type: CommentType
                content?: string | null
                node:
                  | {
                      __typename?: 'Article'
                      id: string
                      title: string
                      slug: string
                      shortHash: string
                      summary: string
                      articleState: ArticleState
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                      }
                    }
                  | { __typename?: 'ArticleVersion' }
                  | {
                      __typename?: 'Circle'
                      id: string
                      name: string
                      displayName: string
                    }
                  | { __typename?: 'Collection' }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'CurationChannel' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'IcymiTopic' }
                  | {
                      __typename?: 'Moment'
                      id: string
                      shortHash: string
                      momentState: MomentState
                    }
                  | { __typename?: 'Report' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'TopicChannel' }
                  | { __typename?: 'User' }
                  | { __typename?: 'WritingChallenge' }
                parentComment?: { __typename?: 'Comment'; id: string } | null
                comments: {
                  __typename?: 'CommentConnection'
                  totalCount: number
                }
                communityWatchAction?: {
                  __typename?: 'CommunityWatchAction'
                  uuid: string
                } | null
                author: { __typename?: 'User'; id: string; isBlocked: boolean }
              }
            }
          | {
              __typename: 'CommentNotice'
              id: string
              createdAt: any
              unread: boolean
              commentNoticeType: CommentNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              comment: {
                __typename?: 'Comment'
                id: string
                state: CommentState
                type: CommentType
                content?: string | null
                node:
                  | {
                      __typename?: 'Article'
                      id: string
                      title: string
                      slug: string
                      shortHash: string
                      summary: string
                      articleState: ArticleState
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                      }
                    }
                  | { __typename?: 'ArticleVersion' }
                  | {
                      __typename?: 'Circle'
                      id: string
                      name: string
                      displayName: string
                    }
                  | { __typename?: 'Collection' }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'CurationChannel' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'IcymiTopic' }
                  | {
                      __typename?: 'Moment'
                      state: MomentState
                      id: string
                      shortHash: string
                      content?: string | null
                      momentState: MomentState
                      assets: Array<{
                        __typename?: 'Asset'
                        id: string
                        path: string
                      }>
                    }
                  | { __typename?: 'Report' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'TopicChannel' }
                  | { __typename?: 'User' }
                  | { __typename?: 'WritingChallenge' }
                parentComment?: { __typename?: 'Comment'; id: string } | null
                comments: {
                  __typename?: 'CommentConnection'
                  totalCount: number
                }
                communityWatchAction?: {
                  __typename?: 'CommunityWatchAction'
                  uuid: string
                } | null
                author: { __typename?: 'User'; id: string; isBlocked: boolean }
              }
            }
          | {
              __typename: 'MomentNotice'
              id: string
              createdAt: any
              unread: boolean
              momentNoticeType: MomentNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              moment: {
                __typename?: 'Moment'
                id: string
                state: MomentState
                content?: string | null
                shortHash: string
                assets: Array<{
                  __typename?: 'Asset'
                  id: string
                  path: string
                }>
              }
            }
          | {
              __typename: 'OfficialAnnouncementNotice'
              id: string
              createdAt: any
              unread: boolean
              link?: string | null
              message: string
            }
          | {
              __typename: 'TransactionNotice'
              id: string
              createdAt: any
              unread: boolean
              txNoticeType: TransactionNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              tx: {
                __typename?: 'Transaction'
                id: string
                amount: number
                currency: TransactionCurrency
                state: TransactionState
                target?:
                  | {
                      __typename: 'Article'
                      id: string
                      summary: string
                      title: string
                      slug: string
                      shortHash: string
                      articleState: ArticleState
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                      }
                    }
                  | { __typename: 'Circle' }
                  | { __typename: 'Transaction' }
                  | null
                blockchainTx?: {
                  __typename?: 'BlockchainTransaction'
                  chain: Chain
                  txHash: string
                } | null
              }
            }
          | {
              __typename: 'UserNotice'
              id: string
              createdAt: any
              unread: boolean
              userNoticeType: UserNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
            }
      }> | null
    }
  } | null
}

export type MarkAllNoticesAsReadMutationVariables = Exact<{
  [key: string]: never
}>

export type MarkAllNoticesAsReadMutation = {
  __typename?: 'Mutation'
  markAllNoticesAsRead?: boolean | null
}

export type MomentDigestAssetsMomentFragment = {
  __typename?: 'Moment'
  assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
}

export type MomentDigestDetailMomentFragment = {
  __typename?: 'Moment'
  id: string
  createdAt: any
  shortHash: string
  state: MomentState
  content?: string | null
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
}

export type DeleteMomentMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteMomentMutation = {
  __typename?: 'Mutation'
  deleteMoment: { __typename?: 'Moment'; id: string; momentState: MomentState }
}

export type MomentDigestDropdownActionsMomentFragment = {
  __typename?: 'Moment'
  id: string
  state: MomentState
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type MomentDigestFeedMomentPublicFragment = {
  __typename?: 'Moment'
  id: string
  createdAt: any
  shortHash: string
  state: MomentState
  content?: string | null
  commentCount: number
  likeCount: number
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
}

export type MomentDigestFeedMomentPrivateFragment = {
  __typename?: 'Moment'
  id: string
  liked: boolean
  commentedFollowees: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }>
}

export type MomentDigestFooterActionsCommentedFolloweesMomentFragment = {
  __typename?: 'Moment'
  id: string
  commentedFollowees: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }>
}

export type MomentDigestFooterActionsLikeButtonMomentPublicFragment = {
  __typename?: 'Moment'
  id: string
  likeCount: number
}

export type MomentDigestFooterActionsLikeButtonMomentPrivateFragment = {
  __typename?: 'Moment'
  id: string
  liked: boolean
}

export type MomentDigestFooterActionsReplyButtonMomentFragment = {
  __typename?: 'Moment'
  id: string
  commentCount: number
}

export type MomentDigestFooterActionsMomentPublicFragment = {
  __typename?: 'Moment'
  id: string
  commentCount: number
  likeCount: number
  state: MomentState
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type MomentDigestFooterActionsMomentPrivateFragment = {
  __typename?: 'Moment'
  id: string
  liked: boolean
  commentedFollowees: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }>
}

export type ActorActionUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  status?: { __typename?: 'UserStatus'; state: UserState } | null
}

export type ActorNameUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  status?: { __typename?: 'UserStatus'; state: UserState } | null
}

export type ArticleNewCollectedFragment = {
  __typename: 'ArticleArticleNotice'
  id: string
  unread: boolean
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    shortHash: string
    summary: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
  collection: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type ArticleNewCollectedNoticeFragment = {
  __typename: 'ArticleArticleNotice'
  id: string
  unread: boolean
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
  collection: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type ArticleArticleNoticeFragment = {
  __typename: 'ArticleArticleNotice'
  id: string
  unread: boolean
  createdAt: any
  articleArticleNoticeType: ArticleArticleNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    shortHash: string
    summary: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
  collection: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type ArticleCardArticleFragment = {
  __typename?: 'Article'
  id: string
  summary: string
  title: string
  slug: string
  shortHash: string
  articleState: ArticleState
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type ArticleMentionedYouFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type ArticleMentionedYouNoticeFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type ArticleNewAppreciationFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type ArticleNewAppreciationNoticeFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type ArticleNewSubscriberFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type ArticleNewSubscriberNoticeFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type ArticlePublishedFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type ArticlePublishedNoticeFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type CircleNewArticleNoticeFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    access: {
      __typename?: 'ArticleAccess'
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
      } | null
    }
  }
}

export type RevisedArticleNotPublishedNoticeFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type RevisedArticlePublishedNoticeFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type ScheduledArticlePublishedFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
  entities: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
  >
}

export type ScheduledArticlePublishedNoticeFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
  entities: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
  >
}

export type TopicChannelFeedbackAcceptedFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    shortHash: string
    summary: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type TopicChannelFeedbackAcceptedNoticeFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type ArticleNoticeFragment = {
  __typename: 'ArticleNotice'
  id: string
  unread: boolean
  createdAt: any
  articleNoticeType: ArticleNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    access: {
      __typename?: 'ArticleAccess'
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
      } | null
    }
  }
  entities: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
  >
}

export type CampaignArticleFeaturedFragment = {
  __typename: 'CampaignArticleNotice'
  id: string
  unread: boolean
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  campaign: { __typename?: 'WritingChallenge'; id: string; shortHash: string }
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type CampaignArticleFeaturedNoticeFragment = {
  __typename: 'CampaignArticleNotice'
  id: string
  unread: boolean
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  campaign: { __typename?: 'WritingChallenge'; id: string; shortHash: string }
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type CampaignArticleNoticeFragment = {
  __typename: 'CampaignArticleNotice'
  id: string
  unread: boolean
  createdAt: any
  campaignArticleNoticeType: CampaignArticleNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  campaign: { __typename?: 'WritingChallenge'; id: string; shortHash: string }
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type CircleInvitationNoticeFragment = {
  __typename?: 'CircleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  circle: {
    __typename?: 'Circle'
    id: string
    name: string
    displayName: string
    description?: string | null
    avatar?: string | null
    invitedBy?: {
      __typename?: 'Invitation'
      id: string
      freePeriod: number
    } | null
    owner: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    members: { __typename?: 'MemberConnection'; totalCount: number }
    works: { __typename?: 'ArticleConnection'; totalCount: number }
    prices?: Array<{
      __typename?: 'Price'
      amount: number
      currency: TransactionCurrency
    }> | null
  }
}

export type CircleNewBroadcastCommentsFragment = {
  __typename?: 'CircleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  circle: {
    __typename?: 'Circle'
    id: string
    name: string
    displayName: string
    description?: string | null
    avatar?: string | null
    owner: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    members: { __typename?: 'MemberConnection'; totalCount: number }
    works: { __typename?: 'ArticleConnection'; totalCount: number }
    prices?: Array<{
      __typename?: 'Price'
      amount: number
      currency: TransactionCurrency
    }> | null
  }
  comments?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    content?: string | null
    state: CommentState
    parentComment?: { __typename?: 'Comment'; id: string } | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }> | null
  replies?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    content?: string | null
    state: CommentState
    parentComment?: { __typename?: 'Comment'; id: string } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
  }> | null
  mentions?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    content?: string | null
    state: CommentState
    parentComment?: { __typename?: 'Comment'; id: string } | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }> | null
}

export type CircleNewBroadcastCommentsNoticeFragment = {
  __typename?: 'CircleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  circle: {
    __typename?: 'Circle'
    id: string
    name: string
    displayName: string
    description?: string | null
    avatar?: string | null
    owner: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    members: { __typename?: 'MemberConnection'; totalCount: number }
    works: { __typename?: 'ArticleConnection'; totalCount: number }
    prices?: Array<{
      __typename?: 'Price'
      amount: number
      currency: TransactionCurrency
    }> | null
  }
  comments?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    content?: string | null
    parentComment?: { __typename?: 'Comment'; id: string } | null
  }> | null
  replies?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    content?: string | null
    parentComment?: { __typename?: 'Comment'; id: string } | null
    author: { __typename?: 'User'; id: string }
  }> | null
  mentions?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    content?: string | null
    parentComment?: { __typename?: 'Comment'; id: string } | null
  }> | null
}

export type CircleNewDiscussionCommentsFragment = {
  __typename?: 'CircleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  circle: {
    __typename?: 'Circle'
    id: string
    name: string
    displayName: string
    description?: string | null
    avatar?: string | null
    owner: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    members: { __typename?: 'MemberConnection'; totalCount: number }
    works: { __typename?: 'ArticleConnection'; totalCount: number }
    prices?: Array<{
      __typename?: 'Price'
      amount: number
      currency: TransactionCurrency
    }> | null
  }
  comments?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    state: CommentState
    content?: string | null
    parentComment?: { __typename?: 'Comment'; id: string } | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }> | null
  replies?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    state: CommentState
    content?: string | null
    parentComment?: { __typename?: 'Comment'; id: string } | null
    replyTo?: {
      __typename?: 'Comment'
      author: { __typename?: 'User'; id: string }
    } | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }> | null
  mentions?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    state: CommentState
    content?: string | null
    parentComment?: { __typename?: 'Comment'; id: string } | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }> | null
}

export type CircleNewDiscussionCommentsNoticeFragment = {
  __typename?: 'CircleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  circle: {
    __typename?: 'Circle'
    id: string
    name: string
    displayName: string
    description?: string | null
    avatar?: string | null
    owner: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    members: { __typename?: 'MemberConnection'; totalCount: number }
    works: { __typename?: 'ArticleConnection'; totalCount: number }
    prices?: Array<{
      __typename?: 'Price'
      amount: number
      currency: TransactionCurrency
    }> | null
  }
  comments?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    parentComment?: { __typename?: 'Comment'; id: string } | null
  }> | null
  replies?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    parentComment?: { __typename?: 'Comment'; id: string } | null
    replyTo?: {
      __typename?: 'Comment'
      author: { __typename?: 'User'; id: string }
    } | null
  }> | null
  mentions?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    parentComment?: { __typename?: 'Comment'; id: string } | null
  }> | null
}

export type CircleNewInvitationFragment = {
  __typename?: 'CircleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  circle: {
    __typename?: 'Circle'
    id: string
    name: string
    displayName: string
    description?: string | null
    avatar?: string | null
    invitedBy?: {
      __typename?: 'Invitation'
      id: string
      freePeriod: number
    } | null
    owner: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    members: { __typename?: 'MemberConnection'; totalCount: number }
    works: { __typename?: 'ArticleConnection'; totalCount: number }
    prices?: Array<{
      __typename?: 'Price'
      amount: number
      currency: TransactionCurrency
    }> | null
  }
}

export type CircleNewUserFragment = {
  __typename?: 'CircleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    isFollower: boolean
    isFollowee: boolean
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
    liker: { __typename?: 'Liker'; civicLiker: boolean }
  }> | null
}

export type CircleNewUserNoticeFragment = {
  __typename?: 'CircleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    isFollower: boolean
    isFollowee: boolean
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
    liker: { __typename?: 'Liker'; civicLiker: boolean }
  }> | null
}

export type CircleNoticeFragment = {
  __typename: 'CircleNotice'
  id: string
  unread: boolean
  createdAt: any
  circleNoticeType: CircleNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    isFollower: boolean
    isFollowee: boolean
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
    liker: { __typename?: 'Liker'; civicLiker: boolean }
  }> | null
  circle: {
    __typename?: 'Circle'
    id: string
    name: string
    displayName: string
    description?: string | null
    avatar?: string | null
    invitedBy?: {
      __typename?: 'Invitation'
      id: string
      freePeriod: number
    } | null
    owner: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    members: { __typename?: 'MemberConnection'; totalCount: number }
    works: { __typename?: 'ArticleConnection'; totalCount: number }
    prices?: Array<{
      __typename?: 'Price'
      amount: number
      currency: TransactionCurrency
    }> | null
  }
  comments?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    content?: string | null
    state: CommentState
    parentComment?: { __typename?: 'Comment'; id: string } | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }> | null
  replies?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    content?: string | null
    state: CommentState
    parentComment?: { __typename?: 'Comment'; id: string } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
    replyTo?: {
      __typename?: 'Comment'
      author: { __typename?: 'User'; id: string }
    } | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
  }> | null
  mentions?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    content?: string | null
    state: CommentState
    parentComment?: { __typename?: 'Comment'; id: string } | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }> | null
}

export type CollectionCardCollectionFragment = {
  __typename?: 'Collection'
  id: string
  title: string
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type CollectionNewLikeFragment = {
  __typename?: 'CollectionNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  collection: {
    __typename?: 'Collection'
    id: string
    title: string
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type CollectionNewLikeNoticeFragment = {
  __typename?: 'CollectionNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  collection: {
    __typename?: 'Collection'
    id: string
    title: string
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type CollectionNoticeFragment = {
  __typename: 'CollectionNotice'
  id: string
  unread: boolean
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  collection: {
    __typename?: 'Collection'
    id: string
    title: string
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

export type CommentCardCommentFragment = {
  __typename?: 'Comment'
  id: string
  state: CommentState
  type: CommentType
  content?: string | null
  node:
    | {
        __typename?: 'Article'
        id: string
        title: string
        slug: string
        shortHash: string
        articleState: ArticleState
        author: { __typename?: 'User'; id: string; userName?: string | null }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle'; id: string; name: string }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | {
        __typename?: 'Moment'
        id: string
        shortHash: string
        momentState: MomentState
      }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
  parentComment?: { __typename?: 'Comment'; id: string } | null
  comments: { __typename?: 'CommentConnection'; totalCount: number }
  communityWatchAction?: {
    __typename?: 'CommunityWatchAction'
    uuid: string
  } | null
  author: { __typename?: 'User'; id: string; isBlocked: boolean }
}

export type CommentNewReplyFragment = {
  __typename?: 'CommentCommentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
  reply: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          summary: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type CommentNewReplyNoticeFragment = {
  __typename?: 'CommentCommentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
  reply: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type CommentCommentNoticeFragment = {
  __typename: 'CommentCommentNotice'
  id: string
  unread: boolean
  createdAt: any
  commentCommentNoticeType: CommentCommentNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
  reply: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          summary: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type ArticleNewCommentFragment = {
  __typename?: 'CommentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          summary: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type ArticleNewCommentNoticeFragment = {
  __typename?: 'CommentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type CircleNewBroadcastFragment = {
  __typename?: 'CommentNotice'
  id: string
  createdAt: any
  commentNoticeType: CommentNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type CircleNewBroadcastNoticeFragment = {
  __typename?: 'CommentNotice'
  id: string
  createdAt: any
  commentNoticeType: CommentNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type CommentLikedFragment = {
  __typename?: 'CommentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          state: MomentState
          content?: string | null
          momentState: MomentState
          assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type CommentLikedNoticeFragment = {
  __typename?: 'CommentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          state: MomentState
          content?: string | null
          momentState: MomentState
          assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type CommentMentionedYouFragment = {
  __typename?: 'CommentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          summary: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          state: MomentState
          id: string
          shortHash: string
          content?: string | null
          momentState: MomentState
          assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type CommentMentionedYouNoticeFragment = {
  __typename?: 'CommentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          state: MomentState
          id: string
          shortHash: string
          content?: string | null
          momentState: MomentState
          assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type CommentPinnedNoticeFragment = {
  __typename?: 'CommentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type MomentNewCommentFragment = {
  __typename?: 'CommentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          state: MomentState
          content?: string | null
          momentState: MomentState
          assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type MomentNewCommentNoticeFragment = {
  __typename?: 'CommentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          state: MomentState
          content?: string | null
          momentState: MomentState
          assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type CommentNoticeFragment = {
  __typename: 'CommentNotice'
  id: string
  unread: boolean
  createdAt: any
  commentNoticeType: CommentNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          summary: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          state: MomentState
          id: string
          shortHash: string
          content?: string | null
          momentState: MomentState
          assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type MomentCardMomentFragment = {
  __typename?: 'Moment'
  id: string
  state: MomentState
  content?: string | null
  shortHash: string
  assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
}

export type MomentLikedFragment = {
  __typename?: 'MomentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  moment: {
    __typename?: 'Moment'
    id: string
    state: MomentState
    content?: string | null
    shortHash: string
    assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
  }
}

export type MomentLikedNoticeFragment = {
  __typename?: 'MomentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  moment: {
    __typename?: 'Moment'
    id: string
    state: MomentState
    content?: string | null
    shortHash: string
    assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
  }
}

export type MomentMentionedYouFragment = {
  __typename?: 'MomentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  moment: {
    __typename?: 'Moment'
    id: string
    state: MomentState
    content?: string | null
    shortHash: string
    assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
  }
}

export type MomentMentionedYouNoticeFragment = {
  __typename?: 'MomentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  moment: {
    __typename?: 'Moment'
    id: string
    state: MomentState
    content?: string | null
    shortHash: string
    assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
  }
}

export type MomentNoticeFragment = {
  __typename: 'MomentNotice'
  id: string
  unread: boolean
  createdAt: any
  momentNoticeType: MomentNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  moment: {
    __typename?: 'Moment'
    id: string
    state: MomentState
    content?: string | null
    shortHash: string
    assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
  }
}

export type NoticeActorAvatarUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  status?: { __typename?: 'UserStatus'; state: UserState } | null
  liker: { __typename?: 'Liker'; civicLiker: boolean }
  info: {
    __typename?: 'UserInfo'
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    cryptoWallet?: {
      __typename?: 'CryptoWallet'
      id: string
      address: string
      hasNFTs: boolean
    } | null
  }
}

export type NoticeActorNameUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  status?: { __typename?: 'UserStatus'; state: UserState } | null
}

export type NoticeHeadActorsUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  status?: { __typename?: 'UserStatus'; state: UserState } | null
}

export type NoticeArticleCardFragment = {
  __typename?: 'Article'
  id: string
  summary: string
  title: string
  slug: string
  shortHash: string
  articleState: ArticleState
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type NoticeArticleTitleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  shortHash: string
  articleState: ArticleState
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type NoticeCircleCardFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  displayName: string
  description?: string | null
  avatar?: string | null
  owner: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  members: { __typename?: 'MemberConnection'; totalCount: number }
  works: { __typename?: 'ArticleConnection'; totalCount: number }
  prices?: Array<{
    __typename?: 'Price'
    amount: number
    currency: TransactionCurrency
  }> | null
}

export type NoticeCircleNameFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  displayName: string
}

export type NoticeCollectionTitleFragment = {
  __typename?: 'Collection'
  id: string
  title: string
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type NoticeCommentFragment = {
  __typename?: 'Comment'
  id: string
  state: CommentState
  type: CommentType
  content?: string | null
  node:
    | {
        __typename?: 'Article'
        id: string
        title: string
        slug: string
        shortHash: string
        articleState: ArticleState
        author: { __typename?: 'User'; id: string; userName?: string | null }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle'; id: string; name: string }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | {
        __typename?: 'Moment'
        id: string
        shortHash: string
        momentState: MomentState
      }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
  parentComment?: { __typename?: 'Comment'; id: string } | null
  comments: { __typename?: 'CommentConnection'; totalCount: number }
  communityWatchAction?: {
    __typename?: 'CommunityWatchAction'
    uuid: string
  } | null
  author: { __typename?: 'User'; id: string; isBlocked: boolean }
}

type NoticeDate_ArticleArticleNotice_Fragment = {
  __typename?: 'ArticleArticleNotice'
  id: string
  createdAt: any
}

type NoticeDate_ArticleNotice_Fragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
}

type NoticeDate_CampaignArticleNotice_Fragment = {
  __typename?: 'CampaignArticleNotice'
  id: string
  createdAt: any
}

type NoticeDate_CircleNotice_Fragment = {
  __typename?: 'CircleNotice'
  id: string
  createdAt: any
}

type NoticeDate_CollectionNotice_Fragment = {
  __typename?: 'CollectionNotice'
  id: string
  createdAt: any
}

type NoticeDate_CommentCommentNotice_Fragment = {
  __typename?: 'CommentCommentNotice'
  id: string
  createdAt: any
}

type NoticeDate_CommentNotice_Fragment = {
  __typename?: 'CommentNotice'
  id: string
  createdAt: any
}

type NoticeDate_MomentNotice_Fragment = {
  __typename?: 'MomentNotice'
  id: string
  createdAt: any
}

type NoticeDate_OfficialAnnouncementNotice_Fragment = {
  __typename?: 'OfficialAnnouncementNotice'
  id: string
  createdAt: any
}

type NoticeDate_TransactionNotice_Fragment = {
  __typename?: 'TransactionNotice'
  id: string
  createdAt: any
}

type NoticeDate_UserNotice_Fragment = {
  __typename?: 'UserNotice'
  id: string
  createdAt: any
}

export type NoticeDateFragment =
  | NoticeDate_ArticleArticleNotice_Fragment
  | NoticeDate_ArticleNotice_Fragment
  | NoticeDate_CampaignArticleNotice_Fragment
  | NoticeDate_CircleNotice_Fragment
  | NoticeDate_CollectionNotice_Fragment
  | NoticeDate_CommentCommentNotice_Fragment
  | NoticeDate_CommentNotice_Fragment
  | NoticeDate_MomentNotice_Fragment
  | NoticeDate_OfficialAnnouncementNotice_Fragment
  | NoticeDate_TransactionNotice_Fragment
  | NoticeDate_UserNotice_Fragment

export type NoticeMomentTitleFragment = {
  __typename?: 'Moment'
  id: string
  state: MomentState
  content?: string | null
  shortHash: string
  assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
}

export type NoticeTagFragment = {
  __typename?: 'Tag'
  id: string
  content: string
  numArticles: number
}

export type NoticeUserCardFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  isFollower: boolean
  isFollowee: boolean
  info: {
    __typename?: 'UserInfo'
    description?: string | null
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    cryptoWallet?: {
      __typename?: 'CryptoWallet'
      id: string
      address: string
      hasNFTs: boolean
    } | null
  }
  status?: { __typename?: 'UserStatus'; state: UserState } | null
  liker: { __typename?: 'Liker'; civicLiker: boolean }
}

export type OfficialAnnouncementNoticeFragment = {
  __typename: 'OfficialAnnouncementNotice'
  id: string
  unread: boolean
  link?: string | null
  message: string
  createdAt: any
}

export type OfficialAnnouncementFragment = {
  __typename: 'OfficialAnnouncementNotice'
  id: string
  unread: boolean
  link?: string | null
  message: string
  createdAt: any
}

export type PaymentReceivedDonationFragment = {
  __typename?: 'TransactionNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  tx: {
    __typename?: 'Transaction'
    id: string
    amount: number
    currency: TransactionCurrency
    target?:
      | {
          __typename: 'Article'
          id: string
          summary: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename: 'Circle' }
      | { __typename: 'Transaction' }
      | null
  }
}

export type PaymentReceivedDonationNoticeFragment = {
  __typename?: 'TransactionNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  tx: {
    __typename?: 'Transaction'
    id: string
    amount: number
    currency: TransactionCurrency
    target?:
      | {
          __typename: 'Article'
          id: string
          summary: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename: 'Circle' }
      | { __typename: 'Transaction' }
      | null
  }
}

export type WithdrewLockedTokensFragment = {
  __typename?: 'TransactionNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  tx: {
    __typename?: 'Transaction'
    id: string
    amount: number
    currency: TransactionCurrency
    state: TransactionState
    blockchainTx?: {
      __typename?: 'BlockchainTransaction'
      chain: Chain
      txHash: string
    } | null
  }
}

export type WithdrewLockedTokensNoticeFragment = {
  __typename?: 'TransactionNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  tx: {
    __typename?: 'Transaction'
    id: string
    amount: number
    currency: TransactionCurrency
    state: TransactionState
    blockchainTx?: {
      __typename?: 'BlockchainTransaction'
      chain: Chain
      txHash: string
    } | null
  }
}

export type TransactionNoticeFragment = {
  __typename: 'TransactionNotice'
  id: string
  unread: boolean
  createdAt: any
  txNoticeType: TransactionNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  tx: {
    __typename?: 'Transaction'
    id: string
    amount: number
    currency: TransactionCurrency
    state: TransactionState
    target?:
      | {
          __typename: 'Article'
          id: string
          summary: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename: 'Circle' }
      | { __typename: 'Transaction' }
      | null
    blockchainTx?: {
      __typename?: 'BlockchainTransaction'
      chain: Chain
      txHash: string
    } | null
  }
}

export type UserNewFollowerFragment = {
  __typename?: 'UserNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
}

export type UserNewFollowerNoticeFragment = {
  __typename?: 'UserNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
}

export type UserNoticeFragment = {
  __typename: 'UserNotice'
  id: string
  unread: boolean
  createdAt: any
  userNoticeType: UserNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
}

type DigestNotice_ArticleArticleNotice_Fragment = {
  __typename: 'ArticleArticleNotice'
  id: string
  unread: boolean
  createdAt: any
  articleArticleNoticeType: ArticleArticleNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    shortHash: string
    summary: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
  collection: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

type DigestNotice_ArticleNotice_Fragment = {
  __typename: 'ArticleNotice'
  id: string
  unread: boolean
  createdAt: any
  articleNoticeType: ArticleNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    access: {
      __typename?: 'ArticleAccess'
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
      } | null
    }
  }
  entities: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
  >
}

type DigestNotice_CampaignArticleNotice_Fragment = {
  __typename: 'CampaignArticleNotice'
  id: string
  unread: boolean
  createdAt: any
  campaignArticleNoticeType: CampaignArticleNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  campaign: { __typename?: 'WritingChallenge'; id: string; shortHash: string }
  article: {
    __typename?: 'Article'
    id: string
    summary: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

type DigestNotice_CircleNotice_Fragment = {
  __typename: 'CircleNotice'
  id: string
  unread: boolean
  createdAt: any
  circleNoticeType: CircleNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    isFollower: boolean
    isFollowee: boolean
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
    liker: { __typename?: 'Liker'; civicLiker: boolean }
  }> | null
  circle: {
    __typename?: 'Circle'
    id: string
    name: string
    displayName: string
    description?: string | null
    avatar?: string | null
    invitedBy?: {
      __typename?: 'Invitation'
      id: string
      freePeriod: number
    } | null
    owner: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    members: { __typename?: 'MemberConnection'; totalCount: number }
    works: { __typename?: 'ArticleConnection'; totalCount: number }
    prices?: Array<{
      __typename?: 'Price'
      amount: number
      currency: TransactionCurrency
    }> | null
  }
  comments?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    content?: string | null
    state: CommentState
    parentComment?: { __typename?: 'Comment'; id: string } | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }> | null
  replies?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    content?: string | null
    state: CommentState
    parentComment?: { __typename?: 'Comment'; id: string } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
    replyTo?: {
      __typename?: 'Comment'
      author: { __typename?: 'User'; id: string }
    } | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
  }> | null
  mentions?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    content?: string | null
    state: CommentState
    parentComment?: { __typename?: 'Comment'; id: string } | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }> | null
}

type DigestNotice_CollectionNotice_Fragment = {
  __typename: 'CollectionNotice'
  id: string
  unread: boolean
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  collection: {
    __typename?: 'Collection'
    id: string
    title: string
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
}

type DigestNotice_CommentCommentNotice_Fragment = {
  __typename: 'CommentCommentNotice'
  id: string
  unread: boolean
  createdAt: any
  commentCommentNoticeType: CommentCommentNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
  reply: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          summary: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          id: string
          shortHash: string
          momentState: MomentState
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

type DigestNotice_CommentNotice_Fragment = {
  __typename: 'CommentNotice'
  id: string
  unread: boolean
  createdAt: any
  commentNoticeType: CommentNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  comment: {
    __typename?: 'Comment'
    id: string
    state: CommentState
    type: CommentType
    content?: string | null
    node:
      | {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          summary: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'ArticleVersion' }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Collection' }
      | { __typename?: 'Comment' }
      | { __typename?: 'CurationChannel' }
      | { __typename?: 'Draft' }
      | { __typename?: 'IcymiTopic' }
      | {
          __typename?: 'Moment'
          state: MomentState
          id: string
          shortHash: string
          content?: string | null
          momentState: MomentState
          assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
        }
      | { __typename?: 'Report' }
      | { __typename?: 'Tag' }
      | { __typename?: 'TopicChannel' }
      | { __typename?: 'User' }
      | { __typename?: 'WritingChallenge' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

type DigestNotice_MomentNotice_Fragment = {
  __typename: 'MomentNotice'
  id: string
  unread: boolean
  createdAt: any
  momentNoticeType: MomentNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  moment: {
    __typename?: 'Moment'
    id: string
    state: MomentState
    content?: string | null
    shortHash: string
    assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
  }
}

type DigestNotice_OfficialAnnouncementNotice_Fragment = {
  __typename: 'OfficialAnnouncementNotice'
  id: string
  unread: boolean
  link?: string | null
  message: string
  createdAt: any
}

type DigestNotice_TransactionNotice_Fragment = {
  __typename: 'TransactionNotice'
  id: string
  unread: boolean
  createdAt: any
  txNoticeType: TransactionNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
  tx: {
    __typename?: 'Transaction'
    id: string
    amount: number
    currency: TransactionCurrency
    state: TransactionState
    target?:
      | {
          __typename: 'Article'
          id: string
          summary: string
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename: 'Circle' }
      | { __typename: 'Transaction' }
      | null
    blockchainTx?: {
      __typename?: 'BlockchainTransaction'
      chain: Chain
      txHash: string
    } | null
  }
}

type DigestNotice_UserNotice_Fragment = {
  __typename: 'UserNotice'
  id: string
  unread: boolean
  createdAt: any
  userNoticeType: UserNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }> | null
}

export type DigestNoticeFragment =
  | DigestNotice_ArticleArticleNotice_Fragment
  | DigestNotice_ArticleNotice_Fragment
  | DigestNotice_CampaignArticleNotice_Fragment
  | DigestNotice_CircleNotice_Fragment
  | DigestNotice_CollectionNotice_Fragment
  | DigestNotice_CommentCommentNotice_Fragment
  | DigestNotice_CommentNotice_Fragment
  | DigestNotice_MomentNotice_Fragment
  | DigestNotice_OfficialAnnouncementNotice_Fragment
  | DigestNotice_TransactionNotice_Fragment
  | DigestNotice_UserNotice_Fragment

export type ViewerPublicFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  liker: { __typename?: 'Liker'; likerId?: string | null; civicLiker: boolean }
  status?: {
    __typename?: 'UserStatus'
    state: UserState
    unreadNoticeCount: number
    hasPaymentPassword: boolean
  } | null
  ownCircles?: Array<{ __typename?: 'Circle'; id: string; name: string }> | null
  info: {
    __typename?: 'UserInfo'
    createdAt?: any | null
    description?: string | null
    email?: any | null
    agreeOn?: any | null
    userNameEditable: boolean
    group: UserGroup
    ethAddress?: string | null
    isWalletAuth: boolean
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    cryptoWallet?: {
      __typename?: 'CryptoWallet'
      id: string
      address: string
      hasNFTs: boolean
    } | null
  }
  settings: { __typename?: 'UserSettings'; language: UserLanguage }
  following: {
    __typename?: 'Following'
    users: { __typename?: 'UserConnection'; totalCount: number }
  }
  followers: { __typename?: 'UserConnection'; totalCount: number }
}

export type ViewerPrivateFragment = {
  __typename?: 'User'
  id: string
  info: {
    __typename?: 'UserInfo'
    emailVerified: boolean
    socialAccounts: Array<{
      __typename?: 'SocialAccount'
      type: SocialAccountType
      userName?: string | null
      email?: string | null
    }>
  }
  status?: {
    __typename?: 'UserStatus'
    role: UserRole
    hasEmailLoginPassword: boolean
    changeEmailTimesLeft: number
  } | null
  articles: { __typename?: 'ArticleConnection'; totalCount: number }
  settings: { __typename?: 'UserSettings'; currency: QuoteCurrency }
}

export type OfficialFragment = {
  __typename?: 'Official'
  features: Array<{
    __typename?: 'Feature'
    name: FeatureName
    enabled: boolean
  }>
}

export type RootQueryPrivateQueryVariables = Exact<{ [key: string]: never }>

export type RootQueryPrivateQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: {
      __typename?: 'Liker'
      likerId?: string | null
      civicLiker: boolean
    }
    status?: {
      __typename?: 'UserStatus'
      state: UserState
      unreadNoticeCount: number
      hasPaymentPassword: boolean
      role: UserRole
      hasEmailLoginPassword: boolean
      changeEmailTimesLeft: number
    } | null
    ownCircles?: Array<{
      __typename?: 'Circle'
      id: string
      name: string
    }> | null
    info: {
      __typename?: 'UserInfo'
      createdAt?: any | null
      description?: string | null
      email?: any | null
      agreeOn?: any | null
      userNameEditable: boolean
      group: UserGroup
      ethAddress?: string | null
      isWalletAuth: boolean
      emailVerified: boolean
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
      socialAccounts: Array<{
        __typename?: 'SocialAccount'
        type: SocialAccountType
        userName?: string | null
        email?: string | null
      }>
    }
    settings: {
      __typename?: 'UserSettings'
      language: UserLanguage
      currency: QuoteCurrency
    }
    following: {
      __typename?: 'Following'
      users: { __typename?: 'UserConnection'; totalCount: number }
    }
    followers: { __typename?: 'UserConnection'; totalCount: number }
    articles: { __typename?: 'ArticleConnection'; totalCount: number }
  } | null
  official: {
    __typename?: 'Official'
    features: Array<{
      __typename?: 'Feature'
      name: FeatureName
      enabled: boolean
    }>
  }
  channels: Array<
    | {
        __typename?: 'CurationChannel'
        showRecommendation: boolean
        id: string
        shortHash: string
        nameZhHans: string
        nameZhHant: string
        nameEn: string
        navbarTitleZhHans: string
        navbarTitleZhHant: string
        navbarTitleEn: string
      }
    | { __typename?: 'Tag'; id: string; shortHash: string }
    | {
        __typename?: 'TopicChannel'
        enabled: boolean
        id: string
        shortHash: string
        nameZhHans: string
        nameZhHant: string
        nameEn: string
        navbarTitleZhHans: string
        navbarTitleZhHant: string
        navbarTitleEn: string
      }
    | {
        __typename?: 'WritingChallenge'
        id: string
        shortHash: string
        nameZhHans: string
        nameZhHant: string
        nameEn: string
        navbarTitleZhHans: string
        navbarTitleZhHant: string
        navbarTitleEn: string
      }
  >
}

export type QuickResultQueryVariables = Exact<{
  key: Scalars['String']['input']
}>

export type QuickResultQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'SearchResultConnection'
    edges?: Array<{
      __typename?: 'SearchResultEdge'
      cursor: string
      node:
        | { __typename?: 'Article' }
        | { __typename?: 'ArticleVersion' }
        | { __typename?: 'Circle' }
        | { __typename?: 'Collection' }
        | { __typename?: 'Comment' }
        | { __typename?: 'CurationChannel' }
        | { __typename?: 'Draft' }
        | { __typename?: 'IcymiTopic' }
        | { __typename?: 'Moment' }
        | { __typename?: 'Report' }
        | { __typename?: 'Tag' }
        | { __typename?: 'TopicChannel' }
        | {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            info: {
              __typename?: 'UserInfo'
              description?: string | null
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
          }
        | { __typename?: 'WritingChallenge' }
    }> | null
  }
  tag: {
    __typename?: 'SearchResultConnection'
    edges?: Array<{
      __typename?: 'SearchResultEdge'
      cursor: string
      node:
        | { __typename?: 'Article' }
        | { __typename?: 'ArticleVersion' }
        | { __typename?: 'Circle' }
        | { __typename?: 'Collection' }
        | { __typename?: 'Comment' }
        | { __typename?: 'CurationChannel' }
        | { __typename?: 'Draft' }
        | { __typename?: 'IcymiTopic' }
        | { __typename?: 'Moment' }
        | { __typename?: 'Report' }
        | {
            __typename?: 'Tag'
            id: string
            content: string
            numArticles: number
          }
        | { __typename?: 'TopicChannel' }
        | { __typename?: 'User' }
        | { __typename?: 'WritingChallenge' }
    }> | null
  }
}

export type SelectSearchQueryVariables = Exact<{
  key: Scalars['String']['input']
  type: SearchTypes
  filter?: InputMaybe<SearchFilter>
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  exclude?: InputMaybe<SearchExclude>
  includeAuthorTags?: InputMaybe<Scalars['Boolean']['input']>
}>

export type SelectSearchQuery = {
  __typename?: 'Query'
  search: {
    __typename?: 'SearchResultConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      startCursor?: string | null
      endCursor?: string | null
      hasNextPage: boolean
    }
    edges?: Array<{
      __typename?: 'SearchResultEdge'
      cursor: string
      node:
        | {
            __typename?: 'Article'
            id: string
            title: string
            slug: string
            shortHash: string
            state: ArticleState
            articleState: ArticleState
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              isBlocking: boolean
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
          }
        | { __typename?: 'ArticleVersion'; id: string }
        | { __typename?: 'Circle'; id: string }
        | { __typename?: 'Collection'; id: string }
        | { __typename?: 'Comment'; id: string }
        | { __typename?: 'CurationChannel'; id: string }
        | { __typename?: 'Draft'; id: string }
        | { __typename?: 'IcymiTopic'; id: string }
        | { __typename?: 'Moment'; id: string }
        | { __typename?: 'Report'; id: string }
        | {
            __typename?: 'Tag'
            id: string
            content: string
            numArticles: number
          }
        | { __typename?: 'TopicChannel'; id: string }
        | {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        | { __typename?: 'WritingChallenge'; id: string }
    }> | null
  }
}

export type ListViewerArticlesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type ListViewerArticlesQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    articles: {
      __typename?: 'ArticleConnection'
      totalCount: number
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'ArticleEdge'
        cursor: string
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
  } | null
}

export type ArticleUrlQueryQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
}>

export type ArticleUrlQueryQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    shortHash: string
    state: ArticleState
    articleState: ArticleState
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      isBlocking: boolean
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
  } | null
}

export type DigestTagFragment = {
  __typename?: 'Tag'
  id: string
  content: string
  numArticles: number
}

export type TagDigestBookmarkTagFragment = {
  __typename?: 'Tag'
  id: string
  content: string
  isFollower?: boolean | null
}

export type TagDigestFollowButtonPrivateFragment = {
  __typename?: 'Tag'
  id: string
  isFollower?: boolean | null
}

export type TagDigestConciseTagFragment = {
  __typename?: 'Tag'
  id: string
  content: string
  numArticles: number
}

export type TagDigestFeedTagFragment = {
  __typename?: 'Tag'
  id: string
  content: string
  numArticles: number
}

export type ToggleSpamArticleFragment = {
  __typename?: 'Article'
  id: string
  oss: {
    __typename?: 'ArticleOSS'
    spamStatus: { __typename?: 'SpamStatus'; isSpam?: boolean | null }
  }
}

export type ToggleSpamCommentFragment = {
  __typename?: 'Comment'
  id: string
  spamStatus: { __typename?: 'SpamStatus'; isSpam?: boolean | null }
}

export type ToggleSpamMomentFragment = {
  __typename?: 'Moment'
  id: string
  spamStatus: { __typename?: 'SpamStatus'; isSpam?: boolean | null }
}

export type ToggleSpamMutationVariables = Exact<{
  id: Scalars['ID']['input']
  isSpam: Scalars['Boolean']['input']
}>

export type ToggleSpamMutation = {
  __typename?: 'Mutation'
  setSpamStatus:
    | {
        __typename?: 'Article'
        id: string
        oss: {
          __typename?: 'ArticleOSS'
          spamStatus: { __typename?: 'SpamStatus'; isSpam?: boolean | null }
        }
      }
    | {
        __typename?: 'Comment'
        id: string
        spamStatus: { __typename?: 'SpamStatus'; isSpam?: boolean | null }
      }
    | {
        __typename?: 'Moment'
        id: string
        spamStatus: { __typename?: 'SpamStatus'; isSpam?: boolean | null }
      }
}

export type FetchArticleSpamStatusQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
}>

export type FetchArticleSpamStatusQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    oss: {
      __typename?: 'ArticleOSS'
      spamStatus: { __typename?: 'SpamStatus'; isSpam?: boolean | null }
    }
  } | null
}

export type FetchCommentSpamStatusQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type FetchCommentSpamStatusQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | {
        __typename?: 'Comment'
        id: string
        spamStatus: { __typename?: 'SpamStatus'; isSpam?: boolean | null }
      }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type FetchMomentSpamStatusQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type FetchMomentSpamStatusQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | {
        __typename?: 'Moment'
        id: string
        spamStatus: { __typename?: 'SpamStatus'; isSpam?: boolean | null }
      }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type DigestTransactionFragment = {
  __typename?: 'Transaction'
  id: string
  state: TransactionState
  purpose: TransactionPurpose
  amount: number
  fee: number
  currency: TransactionCurrency
  createdAt: any
  message?: string | null
  recipient?: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  } | null
  sender?: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  } | null
  target?:
    | {
        __typename?: 'Article'
        id: string
        title: string
        slug: string
        shortHash: string
        articleState: ArticleState
        author: { __typename?: 'User'; id: string; userName?: string | null }
      }
    | { __typename?: 'Circle'; id: string; name: string; displayName: string }
    | { __typename?: 'Transaction' }
    | null
  blockchainTx?: {
    __typename?: 'BlockchainTransaction'
    chain: Chain
    txHash: string
  } | null
}

export type UserDigestMiniUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  status?: { __typename?: 'UserStatus'; state: UserState } | null
  liker: { __typename?: 'Liker'; civicLiker: boolean }
  info: {
    __typename?: 'UserInfo'
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    cryptoWallet?: {
      __typename?: 'CryptoWallet'
      id: string
      address: string
      hasNFTs: boolean
    } | null
  }
}

export type UserDigestPlainUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
}

export type UserDigestRichUserPublicFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  info: {
    __typename?: 'UserInfo'
    description?: string | null
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    cryptoWallet?: {
      __typename?: 'CryptoWallet'
      id: string
      address: string
      hasNFTs: boolean
    } | null
  }
  status?: { __typename?: 'UserStatus'; state: UserState } | null
  liker: { __typename?: 'Liker'; civicLiker: boolean }
}

export type UserDigestRichUserPrivateFragment = {
  __typename?: 'User'
  id: string
  isFollower: boolean
  isFollowee: boolean
  status?: { __typename?: 'UserStatus'; state: UserState } | null
}

export type GetShortHashByIdQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetShortHashByIdQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article'; id: string; shortHash: string }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type GetShortHashByMediaHashQueryVariables = Exact<{
  mediaHash: Scalars['String']['input']
}>

export type GetShortHashByMediaHashQuery = {
  __typename?: 'Query'
  article?: { __typename?: 'Article'; id: string; shortHash: string } | null
}

export type AppreciationButtonArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  shortHash: string
  appreciateLimit: number
  likesReceivedTotal: number
  author: { __typename?: 'User'; id: string }
}

export type AppreciationButtonArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  hasAppreciate: boolean
  appreciateLeft: number
  author: { __typename?: 'User'; id: string; isBlocking: boolean }
}

export type AppreciateArticleMutationVariables = Exact<{
  id: Scalars['ID']['input']
  amount: Scalars['amount_Int_NotNull_min_1']['input']
}>

export type AppreciateArticleMutation = {
  __typename?: 'Mutation'
  appreciateArticle: {
    __typename?: 'Article'
    id: string
    appreciateLeft: number
    likesReceivedTotal: number
  }
}

export type ArticleDigestAuthorSidebarArticleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  shortHash: string
  displayCover?: string | null
  articleState: ArticleState
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
}

export type AuthorSidebarAuthorArticleFragment = {
  __typename?: 'Article'
  id: string
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
    liker: { __typename?: 'Liker'; civicLiker: boolean }
  }
}

export type AuthorSidebarCollectionQueryVariables = Exact<{
  id: Scalars['ID']['input']
  before?: InputMaybe<Scalars['String']['input']>
  after?: InputMaybe<Scalars['String']['input']>
  includeBefore?: InputMaybe<Scalars['Boolean']['input']>
  includeAfter?: InputMaybe<Scalars['Boolean']['input']>
}>

export type AuthorSidebarCollectionQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | {
        __typename?: 'Collection'
        id: string
        title: string
        description?: string | null
        articles: {
          __typename?: 'ArticleConnection'
          totalCount: number
          pageInfo: {
            __typename?: 'PageInfo'
            startCursor?: string | null
            endCursor?: string | null
            hasNextPage: boolean
            hasPreviousPage: boolean
          }
          edges?: Array<{
            __typename?: 'ArticleEdge'
            cursor: string
            node: {
              __typename?: 'Article'
              id: string
              title: string
              slug: string
              shortHash: string
              displayCover?: string | null
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
            }
          }> | null
        }
      }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
    | null
}

export type AuthorSidebarFromAuthorFragment = {
  __typename?: 'Article'
  id: string
  author: {
    __typename?: 'User'
    latestWorks: Array<
      | {
          __typename?: 'Article'
          id: string
          title: string
          cover?: string | null
          slug: string
          shortHash: string
          displayCover?: string | null
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      | {
          __typename?: 'Collection'
          id: string
          title: string
          cover?: string | null
          author: { __typename?: 'User'; id: string; userName?: string | null }
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
    >
  }
}

export type AuthorSidebarRelatedArticlesFragment = {
  __typename?: 'Article'
  id: string
  relatedArticles: {
    __typename?: 'ArticleConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'ArticleEdge'
      cursor: string
      node: {
        __typename?: 'Article'
        id: string
        title: string
        slug: string
        shortHash: string
        displayCover?: string | null
        articleState: ArticleState
        author: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
      }
    }> | null
  }
}

export type AuthorSidebarRelatedArticlesQueryVariables = Exact<{
  shortHash?: InputMaybe<Scalars['String']['input']>
}>

export type AuthorSidebarRelatedArticlesQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    relatedArticles: {
      __typename?: 'ArticleConnection'
      totalCount: number
      edges?: Array<{
        __typename?: 'ArticleEdge'
        cursor: string
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          displayCover?: string | null
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
  } | null
}

export type AuthorSidebarArticleFragment = {
  __typename?: 'Article'
  id: string
  relatedArticles: { __typename?: 'ArticleConnection'; totalCount: number }
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
    latestWorks: Array<
      | {
          __typename?: 'Article'
          id: string
          title: string
          cover?: string | null
          slug: string
          shortHash: string
          displayCover?: string | null
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      | {
          __typename?: 'Collection'
          id: string
          title: string
          cover?: string | null
          author: { __typename?: 'User'; id: string; userName?: string | null }
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
    >
    liker: { __typename?: 'Liker'; civicLiker: boolean }
  }
}

export type ChannelArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  author: { __typename?: 'User'; id: string }
  classification: {
    __typename?: 'ArticleClassification'
    topicChannel: {
      __typename?: 'TopicChannelClassification'
      enabled: boolean
      channels?: Array<{
        __typename?: 'ArticleTopicChannel'
        enabled: boolean
        antiFlooded: boolean
        channel: {
          __typename?: 'TopicChannel'
          id: string
          shortHash: string
          enabled: boolean
          nameZhHans: string
          nameZhHant: string
          nameEn: string
        }
      }> | null
      feedback?: {
        __typename?: 'TopicChannelFeedback'
        id: string
        state?: TopicChannelFeedbackState | null
        type: TopicChannelFeedbackType
        channels?: Array<{ __typename?: 'TopicChannel'; id: string }> | null
      } | null
    }
  }
}

export type ChannelArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  classification: {
    __typename?: 'ArticleClassification'
    topicChannel: {
      __typename?: 'TopicChannelClassification'
      enabled: boolean
      feedback?: {
        __typename?: 'TopicChannelFeedback'
        id: string
        state?: TopicChannelFeedbackState | null
        type: TopicChannelFeedbackType
        channels?: Array<{ __typename?: 'TopicChannel'; id: string }> | null
      } | null
    }
  }
}

export type SubmitTopicChannelFeedbackMutationVariables = Exact<{
  article: Scalars['ID']['input']
  type: TopicChannelFeedbackType
  channels: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type SubmitTopicChannelFeedbackMutation = {
  __typename?: 'Mutation'
  submitTopicChannelFeedback: {
    __typename?: 'TopicChannelFeedback'
    id: string
    type: TopicChannelFeedbackType
    article: {
      __typename?: 'Article'
      id: string
      author: { __typename?: 'User'; id: string }
      classification: {
        __typename?: 'ArticleClassification'
        topicChannel: {
          __typename?: 'TopicChannelClassification'
          enabled: boolean
          channels?: Array<{
            __typename?: 'ArticleTopicChannel'
            enabled: boolean
            antiFlooded: boolean
            channel: {
              __typename?: 'TopicChannel'
              id: string
              shortHash: string
              enabled: boolean
              nameZhHans: string
              nameZhHant: string
              nameEn: string
            }
          }> | null
          feedback?: {
            __typename?: 'TopicChannelFeedback'
            id: string
            state?: TopicChannelFeedbackState | null
            type: TopicChannelFeedbackType
            channels?: Array<{ __typename?: 'TopicChannel'; id: string }> | null
          } | null
        }
      }
    }
  }
}

export type CollectionListQueryVariables = Exact<{
  id: Scalars['ID']['input']
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
}>

export type CollectionListQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        connections: {
          __typename?: 'ArticleConnection'
          totalCount: number
          pageInfo: {
            __typename?: 'PageInfo'
            startCursor?: string | null
            endCursor?: string | null
            hasNextPage: boolean
          }
          edges?: Array<{
            __typename?: 'ArticleEdge'
            cursor: string
            node: {
              __typename?: 'Article'
              id: string
              title: string
              slug: string
              shortHash: string
              state: ArticleState
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                isBlocking: boolean
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
            }
          }> | null
        }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type CommentDetailQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type CommentDetailQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | {
        __typename?: 'Comment'
        id: string
        type: CommentType
        createdAt: any
        fromDonator: boolean
        pinned: boolean
        state: CommentState
        content?: string | null
        upvotes: number
        myVote?: Vote | null
        comments: {
          __typename?: 'CommentConnection'
          pageInfo: {
            __typename?: 'PageInfo'
            startCursor?: string | null
            endCursor?: string | null
            hasNextPage: boolean
          }
          edges?: Array<{
            __typename?: 'CommentEdge'
            cursor: string
            node: {
              __typename?: 'Comment'
              id: string
              type: CommentType
              createdAt: any
              fromDonator: boolean
              pinned: boolean
              state: CommentState
              content?: string | null
              upvotes: number
              myVote?: Vote | null
              author: {
                __typename?: 'User'
                id: string
                isBlocked: boolean
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
              replyTo?: {
                __typename?: 'Comment'
                id: string
                author: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                  avatar?: string | null
                  status?: {
                    __typename?: 'UserStatus'
                    state: UserState
                  } | null
                  liker: { __typename?: 'Liker'; civicLiker: boolean }
                  info: {
                    __typename?: 'UserInfo'
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                    cryptoWallet?: {
                      __typename?: 'CryptoWallet'
                      id: string
                      address: string
                      hasNFTs: boolean
                    } | null
                  }
                }
              } | null
              node:
                | {
                    __typename?: 'Article'
                    id: string
                    shortHash: string
                    commentCount: number
                    pinCommentLeft: number
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
                | { __typename?: 'ArticleVersion' }
                | { __typename?: 'Circle' }
                | { __typename?: 'Collection' }
                | { __typename?: 'Comment' }
                | { __typename?: 'CurationChannel' }
                | { __typename?: 'Draft' }
                | { __typename?: 'IcymiTopic' }
                | {
                    __typename?: 'Moment'
                    id: string
                    shortHash: string
                    commentCount: number
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
                | { __typename?: 'Report' }
                | { __typename?: 'Tag' }
                | { __typename?: 'TopicChannel' }
                | { __typename?: 'User' }
                | { __typename?: 'WritingChallenge' }
              parentComment?: { __typename?: 'Comment'; id: string } | null
              dropdownComments: {
                __typename?: 'CommentConnection'
                totalCount: number
              }
              communityWatchAction?: {
                __typename?: 'CommunityWatchAction'
                uuid: string
              } | null
            }
          }> | null
        }
        author: {
          __typename?: 'User'
          id: string
          isBlocked: boolean
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        replyTo?: {
          __typename?: 'Comment'
          id: string
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        } | null
        node:
          | {
              __typename?: 'Article'
              id: string
              shortHash: string
              commentCount: number
              pinCommentLeft: number
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | { __typename?: 'ArticleVersion' }
          | { __typename?: 'Circle' }
          | { __typename?: 'Collection' }
          | { __typename?: 'Comment' }
          | { __typename?: 'CurationChannel' }
          | { __typename?: 'Draft' }
          | { __typename?: 'IcymiTopic' }
          | {
              __typename?: 'Moment'
              id: string
              shortHash: string
              commentCount: number
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | { __typename?: 'Report' }
          | { __typename?: 'Tag' }
          | { __typename?: 'TopicChannel' }
          | { __typename?: 'User' }
          | { __typename?: 'WritingChallenge' }
        parentComment?: { __typename?: 'Comment'; id: string } | null
        dropdownComments: {
          __typename?: 'CommentConnection'
          totalCount: number
        }
        communityWatchAction?: {
          __typename?: 'CommunityWatchAction'
          uuid: string
        } | null
      }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type LatestCommentsPublicQueryVariables = Exact<{
  id: Scalars['ID']['input']
  before?: InputMaybe<Scalars['String']['input']>
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  includeAfter?: InputMaybe<Scalars['Boolean']['input']>
  includeBefore?: InputMaybe<Scalars['Boolean']['input']>
}>

export type LatestCommentsPublicQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        shortHash: string
        pinnedComments?: Array<{
          __typename?: 'Comment'
          id: string
          type: CommentType
          createdAt: any
          fromDonator: boolean
          pinned: boolean
          state: CommentState
          content?: string | null
          upvotes: number
          myVote?: Vote | null
          comments: {
            __typename?: 'CommentConnection'
            edges?: Array<{
              __typename?: 'CommentEdge'
              cursor: string
              node: {
                __typename?: 'Comment'
                id: string
                type: CommentType
                createdAt: any
                fromDonator: boolean
                pinned: boolean
                state: CommentState
                content?: string | null
                upvotes: number
                myVote?: Vote | null
                author: {
                  __typename?: 'User'
                  id: string
                  isBlocked: boolean
                  userName?: string | null
                  displayName?: string | null
                  avatar?: string | null
                  status?: {
                    __typename?: 'UserStatus'
                    state: UserState
                  } | null
                  liker: { __typename?: 'Liker'; civicLiker: boolean }
                  info: {
                    __typename?: 'UserInfo'
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                    cryptoWallet?: {
                      __typename?: 'CryptoWallet'
                      id: string
                      address: string
                      hasNFTs: boolean
                    } | null
                  }
                }
                replyTo?: {
                  __typename?: 'Comment'
                  id: string
                  author: {
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                    displayName?: string | null
                    avatar?: string | null
                    status?: {
                      __typename?: 'UserStatus'
                      state: UserState
                    } | null
                    liker: { __typename?: 'Liker'; civicLiker: boolean }
                    info: {
                      __typename?: 'UserInfo'
                      badges?: Array<{
                        __typename?: 'Badge'
                        type: BadgeType
                      }> | null
                      cryptoWallet?: {
                        __typename?: 'CryptoWallet'
                        id: string
                        address: string
                        hasNFTs: boolean
                      } | null
                    }
                  }
                } | null
                node:
                  | {
                      __typename?: 'Article'
                      id: string
                      shortHash: string
                      commentCount: number
                      pinCommentLeft: number
                      author: {
                        __typename?: 'User'
                        id: string
                        isBlocking: boolean
                        userName?: string | null
                      }
                    }
                  | { __typename?: 'ArticleVersion' }
                  | { __typename?: 'Circle' }
                  | { __typename?: 'Collection' }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'CurationChannel' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'IcymiTopic' }
                  | {
                      __typename?: 'Moment'
                      id: string
                      shortHash: string
                      commentCount: number
                      author: {
                        __typename?: 'User'
                        id: string
                        isBlocking: boolean
                        userName?: string | null
                      }
                    }
                  | { __typename?: 'Report' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'TopicChannel' }
                  | { __typename?: 'User' }
                  | { __typename?: 'WritingChallenge' }
                parentComment?: { __typename?: 'Comment'; id: string } | null
                dropdownComments: {
                  __typename?: 'CommentConnection'
                  totalCount: number
                }
                communityWatchAction?: {
                  __typename?: 'CommunityWatchAction'
                  uuid: string
                } | null
              }
            }> | null
            pageInfo: {
              __typename?: 'PageInfo'
              startCursor?: string | null
              endCursor?: string | null
              hasNextPage: boolean
            }
          }
          author: {
            __typename?: 'User'
            id: string
            isBlocked: boolean
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
          replyTo?: {
            __typename?: 'Comment'
            id: string
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
          } | null
          node:
            | {
                __typename?: 'Article'
                id: string
                shortHash: string
                commentCount: number
                pinCommentLeft: number
                author: {
                  __typename?: 'User'
                  id: string
                  isBlocking: boolean
                  userName?: string | null
                }
              }
            | { __typename?: 'ArticleVersion' }
            | { __typename?: 'Circle' }
            | { __typename?: 'Collection' }
            | { __typename?: 'Comment' }
            | { __typename?: 'CurationChannel' }
            | { __typename?: 'Draft' }
            | { __typename?: 'IcymiTopic' }
            | {
                __typename?: 'Moment'
                id: string
                shortHash: string
                commentCount: number
                author: {
                  __typename?: 'User'
                  id: string
                  isBlocking: boolean
                  userName?: string | null
                }
              }
            | { __typename?: 'Report' }
            | { __typename?: 'Tag' }
            | { __typename?: 'TopicChannel' }
            | { __typename?: 'User' }
            | { __typename?: 'WritingChallenge' }
          parentComment?: { __typename?: 'Comment'; id: string } | null
          dropdownComments: {
            __typename?: 'CommentConnection'
            totalCount: number
          }
          communityWatchAction?: {
            __typename?: 'CommunityWatchAction'
            uuid: string
          } | null
        }> | null
        comments: {
          __typename?: 'CommentConnection'
          totalCount: number
          pageInfo: {
            __typename?: 'PageInfo'
            startCursor?: string | null
            endCursor?: string | null
            hasNextPage: boolean
          }
          edges?: Array<{
            __typename?: 'CommentEdge'
            node: {
              __typename?: 'Comment'
              id: string
              type: CommentType
              createdAt: any
              fromDonator: boolean
              pinned: boolean
              state: CommentState
              content?: string | null
              upvotes: number
              myVote?: Vote | null
              comments: {
                __typename?: 'CommentConnection'
                edges?: Array<{
                  __typename?: 'CommentEdge'
                  cursor: string
                  node: {
                    __typename?: 'Comment'
                    id: string
                    type: CommentType
                    createdAt: any
                    fromDonator: boolean
                    pinned: boolean
                    state: CommentState
                    content?: string | null
                    upvotes: number
                    myVote?: Vote | null
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocked: boolean
                      userName?: string | null
                      displayName?: string | null
                      avatar?: string | null
                      status?: {
                        __typename?: 'UserStatus'
                        state: UserState
                      } | null
                      liker: { __typename?: 'Liker'; civicLiker: boolean }
                      info: {
                        __typename?: 'UserInfo'
                        badges?: Array<{
                          __typename?: 'Badge'
                          type: BadgeType
                        }> | null
                        cryptoWallet?: {
                          __typename?: 'CryptoWallet'
                          id: string
                          address: string
                          hasNFTs: boolean
                        } | null
                      }
                    }
                    replyTo?: {
                      __typename?: 'Comment'
                      id: string
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                        displayName?: string | null
                        avatar?: string | null
                        status?: {
                          __typename?: 'UserStatus'
                          state: UserState
                        } | null
                        liker: { __typename?: 'Liker'; civicLiker: boolean }
                        info: {
                          __typename?: 'UserInfo'
                          badges?: Array<{
                            __typename?: 'Badge'
                            type: BadgeType
                          }> | null
                          cryptoWallet?: {
                            __typename?: 'CryptoWallet'
                            id: string
                            address: string
                            hasNFTs: boolean
                          } | null
                        }
                      }
                    } | null
                    node:
                      | {
                          __typename?: 'Article'
                          id: string
                          shortHash: string
                          commentCount: number
                          pinCommentLeft: number
                          author: {
                            __typename?: 'User'
                            id: string
                            isBlocking: boolean
                            userName?: string | null
                          }
                        }
                      | { __typename?: 'ArticleVersion' }
                      | { __typename?: 'Circle' }
                      | { __typename?: 'Collection' }
                      | { __typename?: 'Comment' }
                      | { __typename?: 'CurationChannel' }
                      | { __typename?: 'Draft' }
                      | { __typename?: 'IcymiTopic' }
                      | {
                          __typename?: 'Moment'
                          id: string
                          shortHash: string
                          commentCount: number
                          author: {
                            __typename?: 'User'
                            id: string
                            isBlocking: boolean
                            userName?: string | null
                          }
                        }
                      | { __typename?: 'Report' }
                      | { __typename?: 'Tag' }
                      | { __typename?: 'TopicChannel' }
                      | { __typename?: 'User' }
                      | { __typename?: 'WritingChallenge' }
                    parentComment?: {
                      __typename?: 'Comment'
                      id: string
                    } | null
                    dropdownComments: {
                      __typename?: 'CommentConnection'
                      totalCount: number
                    }
                    communityWatchAction?: {
                      __typename?: 'CommunityWatchAction'
                      uuid: string
                    } | null
                  }
                }> | null
                pageInfo: {
                  __typename?: 'PageInfo'
                  startCursor?: string | null
                  endCursor?: string | null
                  hasNextPage: boolean
                }
              }
              author: {
                __typename?: 'User'
                id: string
                isBlocked: boolean
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
              replyTo?: {
                __typename?: 'Comment'
                id: string
                author: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                  avatar?: string | null
                  status?: {
                    __typename?: 'UserStatus'
                    state: UserState
                  } | null
                  liker: { __typename?: 'Liker'; civicLiker: boolean }
                  info: {
                    __typename?: 'UserInfo'
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                    cryptoWallet?: {
                      __typename?: 'CryptoWallet'
                      id: string
                      address: string
                      hasNFTs: boolean
                    } | null
                  }
                }
              } | null
              node:
                | {
                    __typename?: 'Article'
                    id: string
                    shortHash: string
                    commentCount: number
                    pinCommentLeft: number
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
                | { __typename?: 'ArticleVersion' }
                | { __typename?: 'Circle' }
                | { __typename?: 'Collection' }
                | { __typename?: 'Comment' }
                | { __typename?: 'CurationChannel' }
                | { __typename?: 'Draft' }
                | { __typename?: 'IcymiTopic' }
                | {
                    __typename?: 'Moment'
                    id: string
                    shortHash: string
                    commentCount: number
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
                | { __typename?: 'Report' }
                | { __typename?: 'Tag' }
                | { __typename?: 'TopicChannel' }
                | { __typename?: 'User' }
                | { __typename?: 'WritingChallenge' }
              parentComment?: { __typename?: 'Comment'; id: string } | null
              dropdownComments: {
                __typename?: 'CommentConnection'
                totalCount: number
              }
              communityWatchAction?: {
                __typename?: 'CommunityWatchAction'
                uuid: string
              } | null
            }
          }> | null
        }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type LatestCommentsPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type LatestCommentsPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | {
        __typename?: 'Comment'
        id: string
        myVote?: Vote | null
        comments: {
          __typename?: 'CommentConnection'
          pageInfo: {
            __typename?: 'PageInfo'
            startCursor?: string | null
            endCursor?: string | null
            hasNextPage: boolean
          }
          edges?: Array<{
            __typename?: 'CommentEdge'
            cursor: string
            node: {
              __typename?: 'Comment'
              id: string
              myVote?: Vote | null
              node:
                | {
                    __typename?: 'Article'
                    id: string
                    commentCount: number
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
                | { __typename?: 'ArticleVersion' }
                | { __typename?: 'Circle' }
                | { __typename?: 'Collection' }
                | { __typename?: 'Comment' }
                | { __typename?: 'CurationChannel' }
                | { __typename?: 'Draft' }
                | { __typename?: 'IcymiTopic' }
                | {
                    __typename?: 'Moment'
                    id: string
                    commentCount: number
                    shortHash: string
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
                | { __typename?: 'Report' }
                | { __typename?: 'Tag' }
                | { __typename?: 'TopicChannel' }
                | { __typename?: 'User' }
                | { __typename?: 'WritingChallenge' }
              author: { __typename?: 'User'; id: string; isBlocked: boolean }
            }
          }> | null
        }
        node:
          | {
              __typename?: 'Article'
              id: string
              commentCount: number
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | { __typename?: 'ArticleVersion' }
          | { __typename?: 'Circle' }
          | { __typename?: 'Collection' }
          | { __typename?: 'Comment' }
          | { __typename?: 'CurationChannel' }
          | { __typename?: 'Draft' }
          | { __typename?: 'IcymiTopic' }
          | {
              __typename?: 'Moment'
              id: string
              commentCount: number
              shortHash: string
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | { __typename?: 'Report' }
          | { __typename?: 'Tag' }
          | { __typename?: 'TopicChannel' }
          | { __typename?: 'User' }
          | { __typename?: 'WritingChallenge' }
        author: { __typename?: 'User'; id: string; isBlocked: boolean }
      }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
  > | null
}

export type ArticleCommentsQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type ArticleCommentsQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        canComment: boolean
        author: { __typename?: 'User'; id: string; isBlocking: boolean }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type CommentsArticleFragment = {
  __typename?: 'Article'
  id: string
  author: { __typename?: 'User'; id: string; isBlocking: boolean }
}

export type ReadArticleMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type ReadArticleMutation = {
  __typename?: 'Mutation'
  readArticle: { __typename?: 'Article'; id: string }
}

export type ArticleDetailEditHeaderArticleFragment = {
  __typename?: 'Article'
  id: string
  cover?: string | null
  canComment: boolean
  indentFirstLine: boolean
  sensitiveByAuthor: boolean
  license: ArticleLicenseType
  requestForDonation?: string | null
  replyToDonator?: string | null
  tags?: Array<{
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
  }> | null
  access: {
    __typename?: 'ArticleAccess'
    type: ArticleAccessType
    circle?: { __typename?: 'Circle'; id: string } | null
  }
  campaigns: Array<{
    __typename?: 'ArticleCampaign'
    campaign: { __typename?: 'WritingChallenge'; id: string }
    stage?: { __typename?: 'CampaignStage'; id: string } | null
  }>
  collections: {
    __typename?: 'CollectionConnection'
    edges?: Array<{
      __typename?: 'CollectionEdge'
      node: { __typename?: 'Collection'; id: string; title: string }
    }> | null
  }
  connections: {
    __typename?: 'ArticleConnection'
    totalCount: number
    pageInfo: {
      __typename?: 'PageInfo'
      startCursor?: string | null
      endCursor?: string | null
      hasNextPage: boolean
    }
    edges?: Array<{
      __typename?: 'ArticleEdge'
      cursor: string
      node: {
        __typename?: 'Article'
        id: string
        title: string
        slug: string
        shortHash: string
        state: ArticleState
        articleState: ArticleState
        author: {
          __typename?: 'User'
          id: string
          userName?: string | null
          isBlocking: boolean
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
      }
    }> | null
  }
}

export type EditArticleMutationVariables = Exact<{
  id: Scalars['ID']['input']
  description?: InputMaybe<Scalars['description_String_maxLength_140']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  summary?: InputMaybe<Scalars['String']['input']>
  content?: InputMaybe<Scalars['String']['input']>
  cover?: InputMaybe<Scalars['ID']['input']>
  tags?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >
  connections?: InputMaybe<
    Array<Scalars['ID']['input']> | Scalars['ID']['input']
  >
  collections?: InputMaybe<
    Array<Scalars['ID']['input']> | Scalars['ID']['input']
  >
  circle?: InputMaybe<Scalars['ID']['input']>
  accessType?: InputMaybe<ArticleAccessType>
  license?: InputMaybe<ArticleLicenseType>
  iscnPublish?: InputMaybe<Scalars['Boolean']['input']>
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  requestForDonation?: InputMaybe<
    Scalars['requestForDonation_String_maxLength_140']['input']
  >
  replyToDonator?: InputMaybe<
    Scalars['replyToDonator_String_maxLength_140']['input']
  >
  canComment?: InputMaybe<Scalars['Boolean']['input']>
  indented?: InputMaybe<Scalars['Boolean']['input']>
  sensitive?: InputMaybe<Scalars['Boolean']['input']>
  campaigns?: InputMaybe<Array<ArticleCampaignInput> | ArticleCampaignInput>
  isResetCampaign?: Scalars['Boolean']['input']
}>

export type EditArticleMutation = {
  __typename?: 'Mutation'
  editArticle?: {
    __typename?: 'Article'
    id: string
    cover?: string | null
    canComment: boolean
    indentFirstLine: boolean
    sensitiveByAuthor: boolean
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    tags?: Array<{
      __typename?: 'Tag'
      id: string
      content: string
      numArticles: number
    }> | null
    access: {
      __typename?: 'ArticleAccess'
      type: ArticleAccessType
      circle?: { __typename?: 'Circle'; id: string } | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: { __typename?: 'WritingChallenge'; id: string }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: { __typename?: 'Collection'; id: string; title: string }
      }> | null
    }
    connections: {
      __typename?: 'ArticleConnection'
      totalCount: number
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'ArticleEdge'
        cursor: string
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
  }
  editArticleResetCampaign?: {
    __typename?: 'Article'
    id: string
    cover?: string | null
    canComment: boolean
    indentFirstLine: boolean
    sensitiveByAuthor: boolean
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    tags?: Array<{
      __typename?: 'Tag'
      id: string
      content: string
      numArticles: number
    }> | null
    access: {
      __typename?: 'ArticleAccess'
      type: ArticleAccessType
      circle?: { __typename?: 'Circle'; id: string } | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: { __typename?: 'WritingChallenge'; id: string }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: { __typename?: 'Collection'; id: string; title: string }
      }> | null
    }
    connections: {
      __typename?: 'ArticleConnection'
      totalCount: number
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'ArticleEdge'
        cursor: string
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
  }
}

export type LatestVersionArticleQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type LatestVersionArticleQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        slug: string
        title: string
        shortHash: string
        author: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
        }
        tags?: Array<{ __typename?: 'Tag'; id: string; content: string }> | null
        versions: {
          __typename?: 'ArticleVersionsConnection'
          edges: Array<{
            __typename?: 'ArticleVersionEdge'
            node: { __typename?: 'ArticleVersion'; id: string }
          } | null>
        }
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type QueryEditArticleQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
}>

export type QueryEditArticleQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    shortHash: string
    cover?: string | null
    summary: string
    summaryCustomized: boolean
    createdAt: any
    canComment: boolean
    indentFirstLine: boolean
    license: ArticleLicenseType
    sensitiveByAuthor: boolean
    requestForDonation?: string | null
    replyToDonator?: string | null
    revisionCount: number
    contents: { __typename?: 'ArticleContents'; html: string }
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
      draft?: boolean | null
      uploadURL?: string | null
    }>
    tags?: Array<{
      __typename?: 'Tag'
      id: string
      content: string
      numArticles: number
    }> | null
    author: {
      __typename?: 'User'
      id: string
      displayName?: string | null
      avatar?: string | null
      userName?: string | null
      isBlocking: boolean
      ownCircles?: Array<{
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
      }> | null
      campaigns: {
        __typename?: 'CampaignConnection'
        edges?: Array<{
          __typename?: 'CampaignEdge'
          node: {
            __typename?: 'WritingChallenge'
            id: string
            state: CampaignState
            name: string
            writingPeriod?: {
              __typename?: 'DatetimeRange'
              start: any
              end?: any | null
            } | null
            stages: Array<{
              __typename?: 'CampaignStage'
              id: string
              name: string
              period?: {
                __typename?: 'DatetimeRange'
                start: any
                end?: any | null
              } | null
            }>
          }
        }> | null
      }
    }
    access: {
      __typename?: 'ArticleAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
      } | null
    }
    federationSetting?: {
      __typename?: 'ArticleFederationSetting'
      state: FederationArticleSettingState
    } | null
    versions: {
      __typename?: 'ArticleVersionsConnection'
      edges: Array<{
        __typename?: 'ArticleVersionEdge'
        node: { __typename?: 'ArticleVersion'; id: string }
      } | null>
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: {
        __typename?: 'WritingChallenge'
        id: string
        announcements: Array<{ __typename?: 'Article'; id: string }>
      }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    connections: {
      __typename?: 'ArticleConnection'
      totalCount: number
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'ArticleEdge'
        cursor: string
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
  } | null
}

export type QueryEditArticleAssetsQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type QueryEditArticleAssetsQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        assets: Array<{
          __typename?: 'Asset'
          id: string
          type: AssetType
          path: string
          draft?: boolean | null
          uploadURL?: string | null
        }>
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type HeaderArticleFragment = {
  __typename?: 'Article'
  id: string
  campaigns: Array<{
    __typename?: 'ArticleCampaign'
    campaign: {
      __typename?: 'WritingChallenge'
      id: string
      shortHash: string
      nameZhHant: string
      nameZhHans: string
      nameEn: string
      announcements: Array<{ __typename?: 'Article'; id: string }>
    }
    stage?: {
      __typename?: 'CampaignStage'
      id: string
      nameZhHant: string
      nameZhHans: string
      nameEn: string
    } | null
  }>
}

export type InfoHeaderArticleFragment = {
  __typename?: 'Article'
  id: string
  iscnId?: string | null
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  access: {
    __typename?: 'ArticleAccess'
    type: ArticleAccessType
    secret?: string | null
  }
}

export type InfoHeaderArticleVersionFragment = {
  __typename?: 'ArticleVersion'
  id: string
  dataHash?: string | null
  mediaHash?: string | null
  summary: string
  createdAt: any
  description?: string | null
}

export type GatewaysQueryVariables = Exact<{ [key: string]: never }>

export type GatewaysQuery = {
  __typename?: 'Query'
  official: { __typename?: 'Official'; gatewayUrls?: Array<string> | null }
}

export type VersionsArticleFragment = {
  __typename?: 'Article'
  id: string
  slug: string
  shortHash: string
  author: { __typename?: 'User'; id: string; userName?: string | null }
  versions: {
    __typename?: 'ArticleVersionsConnection'
    edges: Array<{
      __typename?: 'ArticleVersionEdge'
      node: { __typename?: 'ArticleVersion'; id: string; createdAt: any }
    } | null>
  }
}

export type ArticleHistoryPublicArticleFragment = {
  __typename?: 'Article'
  id: string
  slug: string
  shortHash: string
  state: ArticleState
  cover?: string | null
  summaryCustomized: boolean
  language?: string | null
  indentFirstLine: boolean
  license: ArticleLicenseType
  sensitiveByAuthor: boolean
  sensitiveByAdmin: boolean
  requestForDonation?: string | null
  replyToDonator?: string | null
  availableTranslations?: Array<UserLanguage> | null
  iscnId?: string | null
  revisionCount: number
  revisedAt?: any | null
  createdAt: any
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  access: {
    __typename?: 'ArticleAccess'
    type: ArticleAccessType
    secret?: string | null
    circle?: {
      __typename?: 'Circle'
      id: string
      name: string
      displayName: string
      description?: string | null
      avatar?: string | null
      isMember: boolean
      owner: {
        __typename?: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        avatar?: string | null
        status?: { __typename?: 'UserStatus'; state: UserState } | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          cryptoWallet?: {
            __typename?: 'CryptoWallet'
            id: string
            address: string
            hasNFTs: boolean
          } | null
        }
      }
      members: { __typename?: 'MemberConnection'; totalCount: number }
      works: { __typename?: 'ArticleConnection'; totalCount: number }
      prices?: Array<{
        __typename?: 'Price'
        amount: number
        currency: TransactionCurrency
      }> | null
      invitedBy?: {
        __typename?: 'Invitation'
        id: string
        state: InvitationState
        freePeriod: number
      } | null
    } | null
  }
  versions: {
    __typename?: 'ArticleVersionsConnection'
    edges: Array<{
      __typename?: 'ArticleVersionEdge'
      node: { __typename?: 'ArticleVersion'; id: string; createdAt: any }
    } | null>
  }
}

export type ArticleVersionFragment = {
  __typename?: 'ArticleVersion'
  id: string
  title: string
  mediaHash?: string | null
  summary: string
  createdAt: any
  dataHash?: string | null
  description?: string | null
  contents: { __typename?: 'ArticleContents'; html: string }
}

export type ArticleHistoryPublicQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
  version: Scalars['ID']['input']
}>

export type ArticleHistoryPublicQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    slug: string
    shortHash: string
    state: ArticleState
    cover?: string | null
    summaryCustomized: boolean
    language?: string | null
    indentFirstLine: boolean
    license: ArticleLicenseType
    sensitiveByAuthor: boolean
    sensitiveByAdmin: boolean
    requestForDonation?: string | null
    replyToDonator?: string | null
    availableTranslations?: Array<UserLanguage> | null
    iscnId?: string | null
    revisionCount: number
    revisedAt?: any | null
    createdAt: any
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    access: {
      __typename?: 'ArticleAccess'
      type: ArticleAccessType
      secret?: string | null
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        isMember: boolean
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
        invitedBy?: {
          __typename?: 'Invitation'
          id: string
          state: InvitationState
          freePeriod: number
        } | null
      } | null
    }
    versions: {
      __typename?: 'ArticleVersionsConnection'
      edges: Array<{
        __typename?: 'ArticleVersionEdge'
        node: { __typename?: 'ArticleVersion'; id: string; createdAt: any }
      } | null>
    }
  } | null
  version?:
    | { __typename?: 'Article' }
    | {
        __typename?: 'ArticleVersion'
        id: string
        title: string
        mediaHash?: string | null
        summary: string
        createdAt: any
        dataHash?: string | null
        description?: string | null
        contents: { __typename?: 'ArticleContents'; html: string }
      }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type ArticleHistoryPrivateQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
  version: Scalars['ID']['input']
}>

export type ArticleHistoryPrivateQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    access: {
      __typename?: 'ArticleAccess'
      circle?: {
        __typename?: 'Circle'
        id: string
        isMember: boolean
        invitedBy?: {
          __typename?: 'Invitation'
          id: string
          state: InvitationState
          freePeriod: number
        } | null
      } | null
    }
  } | null
  version?:
    | { __typename?: 'Article'; id: string }
    | {
        __typename?: 'ArticleVersion'
        id: string
        contents: { __typename?: 'ArticleContents'; html: string }
      }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
    | null
}

export type ArticleLatestVersionQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
}>

export type ArticleLatestVersionQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    versions: {
      __typename?: 'ArticleVersionsConnection'
      edges: Array<{
        __typename?: 'ArticleVersionEdge'
        node: { __typename?: 'ArticleVersion'; id: string }
      } | null>
    }
  } | null
}

export type ArticleHistoryTranslationQueryVariables = Exact<{
  version: Scalars['ID']['input']
  language: UserLanguage
}>

export type ArticleHistoryTranslationQuery = {
  __typename?: 'Query'
  version?:
    | { __typename?: 'Article' }
    | {
        __typename?: 'ArticleVersion'
        id: string
        translation?: {
          __typename?: 'ArticleTranslation'
          content?: string | null
          title?: string | null
          summary?: string | null
          language?: string | null
        } | null
      }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type EditArticleSupportSettingMutationVariables = Exact<{
  id: Scalars['ID']['input']
  requestForDonation?: InputMaybe<
    Scalars['requestForDonation_String_maxLength_140']['input']
  >
  replyToDonator?: InputMaybe<
    Scalars['replyToDonator_String_maxLength_140']['input']
  >
}>

export type EditArticleSupportSettingMutation = {
  __typename?: 'Mutation'
  editArticle: {
    __typename?: 'Article'
    id: string
    requestForDonation?: string | null
    replyToDonator?: string | null
  }
}

export type MetaInfoArticleFragment = {
  __typename?: 'Article'
  id: string
  language?: string | null
  slug: string
  shortHash: string
  revisionCount: number
  revisedAt?: any | null
  createdAt: any
  access: { __typename?: 'ArticleAccess'; type: ArticleAccessType }
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
}

export type MetaInfoArticleVersionFragment = {
  __typename?: 'ArticleVersion'
  id: string
  createdAt: any
}

export type StateArticleFragment = {
  __typename?: 'Article'
  id: string
  state: ArticleState
  slug: string
  shortHash: string
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type UserDonationRecipientFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  liker: { __typename?: 'Liker'; likerId?: string | null; civicLiker: boolean }
  info: {
    __typename?: 'UserInfo'
    ethAddress?: string | null
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    cryptoWallet?: {
      __typename?: 'CryptoWallet'
      id: string
      address: string
      hasNFTs: boolean
    } | null
  }
  status?: { __typename?: 'UserStatus'; state: UserState } | null
}

export type DonatorsArticleFragment = {
  __typename?: 'Article'
  id: string
  shortHash: string
  donations: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'ArticleDonationEdge'
      cursor: string
      node: {
        __typename?: 'ArticleDonation'
        id: string
        sender?: {
          __typename?: 'User'
          id: string
          avatar?: string | null
          userName?: string | null
          displayName?: string | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          }
        } | null
      }
    }> | null
  }
  donationsDialog: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
  }
}

export type SupportWidgetArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  requestForDonation?: string | null
  shortHash: string
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: {
      __typename?: 'Liker'
      likerId?: string | null
      civicLiker: boolean
    }
    info: {
      __typename?: 'UserInfo'
      ethAddress?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
    status?: { __typename?: 'UserStatus'; state: UserState } | null
  }
  access: {
    __typename?: 'ArticleAccess'
    circle?: {
      __typename?: 'Circle'
      id: string
      name: string
      displayName: string
      description?: string | null
      avatar?: string | null
      owner: {
        __typename?: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        avatar?: string | null
        status?: { __typename?: 'UserStatus'; state: UserState } | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          cryptoWallet?: {
            __typename?: 'CryptoWallet'
            id: string
            address: string
            hasNFTs: boolean
          } | null
        }
      }
      members: { __typename?: 'MemberConnection'; totalCount: number }
      works: { __typename?: 'ArticleConnection'; totalCount: number }
      prices?: Array<{
        __typename?: 'Price'
        amount: number
        currency: TransactionCurrency
      }> | null
    } | null
  }
  donations: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'ArticleDonationEdge'
      cursor: string
      node: {
        __typename?: 'ArticleDonation'
        id: string
        sender?: {
          __typename?: 'User'
          id: string
          avatar?: string | null
          userName?: string | null
          displayName?: string | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          }
        } | null
      }
    }> | null
  }
  donationsDialog: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
  }
}

export type SupportWidgetArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  access: {
    __typename?: 'ArticleAccess'
    circle?: {
      __typename?: 'Circle'
      id: string
      isMember: boolean
      invitedBy?: {
        __typename?: 'Invitation'
        id: string
        state: InvitationState
        freePeriod: number
      } | null
    } | null
  }
}

export type HasDonatedQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type HasDonatedQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        donated: boolean
        replyToDonator?: string | null
      }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type TagListArticleFragment = {
  __typename?: 'Article'
  tags?: Array<{
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
  }> | null
}

export type CommentButtonArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  commentCount: number
  canComment: boolean
}

export type CommentButtonArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  author: { __typename?: 'User'; id: string; isBlocking: boolean }
}

export type DonationButtonArticleFragment = {
  __typename?: 'Article'
  id: string
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: {
      __typename?: 'Liker'
      likerId?: string | null
      civicLiker: boolean
    }
    info: {
      __typename?: 'UserInfo'
      ethAddress?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
    status?: { __typename?: 'UserStatus'; state: UserState } | null
  }
}

export type ToolbarArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  title: string
  shortHash: string
  appreciateLimit: number
  commentCount: number
  canComment: boolean
  pinned: boolean
  slug: string
  revisionCount: number
  likesReceivedTotal: number
  articleState: ArticleState
  tags?: Array<{ __typename?: 'Tag'; content: string; id: string }> | null
  author: {
    __typename?: 'User'
    id: string
    displayName?: string | null
    userName?: string | null
    avatar?: string | null
    liker: {
      __typename?: 'Liker'
      likerId?: string | null
      civicLiker: boolean
    }
    info: {
      __typename?: 'UserInfo'
      ethAddress?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
    status?: { __typename?: 'UserStatus'; state: UserState } | null
  }
  likesReceived: { __typename?: 'AppreciationConnection'; totalCount: number }
  donationsDialog: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
  }
}

export type ToolbarArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  bookmarked: boolean
  hasAppreciate: boolean
  appreciateLeft: number
  author: { __typename?: 'User'; id: string; isBlocking: boolean }
}

export type CircleWallCirclePublicFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  displayName: string
  description?: string | null
  avatar?: string | null
  owner: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  members: { __typename?: 'MemberConnection'; totalCount: number }
  works: { __typename?: 'ArticleConnection'; totalCount: number }
  prices?: Array<{
    __typename?: 'Price'
    amount: number
    currency: TransactionCurrency
  }> | null
}

export type CircleWallCirclePrivateFragment = {
  __typename?: 'Circle'
  id: string
  isMember: boolean
  invitedBy?: {
    __typename?: 'Invitation'
    id: string
    state: InvitationState
    freePeriod: number
  } | null
}

export type ArticlePublicArticleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  shortHash: string
  dataHash: string
  mediaHash: string
  state: ArticleState
  cover?: string | null
  summary: string
  summaryCustomized: boolean
  createdAt: any
  revisedAt?: any | null
  language?: string | null
  canComment: boolean
  indentFirstLine: boolean
  commentCount: number
  license: ArticleLicenseType
  sensitiveByAuthor: boolean
  sensitiveByAdmin: boolean
  requestForDonation?: string | null
  replyToDonator?: string | null
  availableTranslations?: Array<UserLanguage> | null
  noindex: boolean
  revisionCount: number
  appreciateLimit: number
  bookmarked: boolean
  hasAppreciate: boolean
  appreciateLeft: number
  pinned: boolean
  likesReceivedTotal: number
  articleState: ArticleState
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    isBlocking: boolean
    avatar?: string | null
    isFollower: boolean
    isFollowee: boolean
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      ethAddress?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
    latestWorks: Array<
      | {
          __typename?: 'Article'
          id: string
          title: string
          cover?: string | null
          slug: string
          shortHash: string
          displayCover?: string | null
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      | {
          __typename?: 'Collection'
          id: string
          title: string
          cover?: string | null
          author: { __typename?: 'User'; id: string; userName?: string | null }
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
    >
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: {
      __typename?: 'Liker'
      likerId?: string | null
      civicLiker: boolean
    }
  }
  collection: { __typename?: 'ArticleConnection'; totalCount: number }
  access: {
    __typename?: 'ArticleAccess'
    type: ArticleAccessType
    circle?: {
      __typename?: 'Circle'
      id: string
      name: string
      displayName: string
      description?: string | null
      avatar?: string | null
      isMember: boolean
      owner: {
        __typename?: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        avatar?: string | null
        status?: { __typename?: 'UserStatus'; state: UserState } | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          cryptoWallet?: {
            __typename?: 'CryptoWallet'
            id: string
            address: string
            hasNFTs: boolean
          } | null
        }
      }
      members: { __typename?: 'MemberConnection'; totalCount: number }
      works: { __typename?: 'ArticleConnection'; totalCount: number }
      prices?: Array<{
        __typename?: 'Price'
        amount: number
        currency: TransactionCurrency
      }> | null
      invitedBy?: {
        __typename?: 'Invitation'
        id: string
        state: InvitationState
        freePeriod: number
      } | null
    } | null
  }
  comments: { __typename?: 'CommentConnection'; totalCount: number }
  translation?: {
    __typename?: 'ArticleTranslation'
    content?: string | null
    title?: string | null
    summary?: string | null
    language?: string | null
    model?: TranslationModel | null
  } | null
  contents: { __typename?: 'ArticleContents'; html: string }
  campaigns: Array<{
    __typename?: 'ArticleCampaign'
    campaign: {
      __typename?: 'WritingChallenge'
      id: string
      shortHash: string
      nameZhHant: string
      nameZhHans: string
      nameEn: string
      announcements: Array<{ __typename?: 'Article'; id: string }>
    }
    stage?: {
      __typename?: 'CampaignStage'
      id: string
      nameZhHant: string
      nameZhHans: string
      nameEn: string
    } | null
  }>
  relatedArticles: { __typename?: 'ArticleConnection'; totalCount: number }
  tags?: Array<{
    __typename?: 'Tag'
    content: string
    id: string
    numArticles: number
  }> | null
  classification: {
    __typename?: 'ArticleClassification'
    topicChannel: {
      __typename?: 'TopicChannelClassification'
      enabled: boolean
      channels?: Array<{
        __typename?: 'ArticleTopicChannel'
        enabled: boolean
        antiFlooded: boolean
        channel: {
          __typename?: 'TopicChannel'
          id: string
          shortHash: string
          enabled: boolean
          nameZhHans: string
          nameZhHant: string
          nameEn: string
        }
      }> | null
      feedback?: {
        __typename?: 'TopicChannelFeedback'
        id: string
        state?: TopicChannelFeedbackState | null
        type: TopicChannelFeedbackType
        channels?: Array<{ __typename?: 'TopicChannel'; id: string }> | null
      } | null
    }
  }
  donations: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'ArticleDonationEdge'
      cursor: string
      node: {
        __typename?: 'ArticleDonation'
        id: string
        sender?: {
          __typename?: 'User'
          id: string
          avatar?: string | null
          userName?: string | null
          displayName?: string | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          }
        } | null
      }
    }> | null
  }
  likesReceived: { __typename?: 'AppreciationConnection'; totalCount: number }
  donationsDialog: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
  }
}

export type ArticleAvailableTranslationsQueryVariables = Exact<{
  shortHash?: InputMaybe<Scalars['String']['input']>
}>

export type ArticleAvailableTranslationsQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    availableTranslations?: Array<UserLanguage> | null
  } | null
}

export type ArticleDetailPublicQueryVariables = Exact<{
  shortHash?: InputMaybe<Scalars['String']['input']>
  language: UserLanguage
  includeTranslation?: InputMaybe<Scalars['Boolean']['input']>
}>

export type ArticleDetailPublicQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    shortHash: string
    dataHash: string
    mediaHash: string
    state: ArticleState
    cover?: string | null
    summary: string
    summaryCustomized: boolean
    createdAt: any
    revisedAt?: any | null
    language?: string | null
    canComment: boolean
    indentFirstLine: boolean
    commentCount: number
    license: ArticleLicenseType
    sensitiveByAuthor: boolean
    sensitiveByAdmin: boolean
    requestForDonation?: string | null
    replyToDonator?: string | null
    availableTranslations?: Array<UserLanguage> | null
    noindex: boolean
    revisionCount: number
    appreciateLimit: number
    bookmarked: boolean
    hasAppreciate: boolean
    appreciateLeft: number
    pinned: boolean
    likesReceivedTotal: number
    articleState: ArticleState
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      isBlocking: boolean
      avatar?: string | null
      isFollower: boolean
      isFollowee: boolean
      info: {
        __typename?: 'UserInfo'
        description?: string | null
        ethAddress?: string | null
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
      latestWorks: Array<
        | {
            __typename?: 'Article'
            id: string
            title: string
            cover?: string | null
            slug: string
            shortHash: string
            displayCover?: string | null
            articleState: ArticleState
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
          }
        | {
            __typename?: 'Collection'
            id: string
            title: string
            cover?: string | null
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
            }
            articles: { __typename?: 'ArticleConnection'; totalCount: number }
          }
      >
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: {
        __typename?: 'Liker'
        likerId?: string | null
        civicLiker: boolean
      }
    }
    collection: { __typename?: 'ArticleConnection'; totalCount: number }
    access: {
      __typename?: 'ArticleAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        isMember: boolean
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
        invitedBy?: {
          __typename?: 'Invitation'
          id: string
          state: InvitationState
          freePeriod: number
        } | null
      } | null
    }
    comments: { __typename?: 'CommentConnection'; totalCount: number }
    translation?: {
      __typename?: 'ArticleTranslation'
      content?: string | null
      title?: string | null
      summary?: string | null
      language?: string | null
      model?: TranslationModel | null
    } | null
    contents: { __typename?: 'ArticleContents'; html: string }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: {
        __typename?: 'WritingChallenge'
        id: string
        shortHash: string
        nameZhHant: string
        nameZhHans: string
        nameEn: string
        announcements: Array<{ __typename?: 'Article'; id: string }>
      }
      stage?: {
        __typename?: 'CampaignStage'
        id: string
        nameZhHant: string
        nameZhHans: string
        nameEn: string
      } | null
    }>
    relatedArticles: { __typename?: 'ArticleConnection'; totalCount: number }
    tags?: Array<{
      __typename?: 'Tag'
      content: string
      id: string
      numArticles: number
    }> | null
    classification: {
      __typename?: 'ArticleClassification'
      topicChannel: {
        __typename?: 'TopicChannelClassification'
        enabled: boolean
        channels?: Array<{
          __typename?: 'ArticleTopicChannel'
          enabled: boolean
          antiFlooded: boolean
          channel: {
            __typename?: 'TopicChannel'
            id: string
            shortHash: string
            enabled: boolean
            nameZhHans: string
            nameZhHant: string
            nameEn: string
          }
        }> | null
        feedback?: {
          __typename?: 'TopicChannelFeedback'
          id: string
          state?: TopicChannelFeedbackState | null
          type: TopicChannelFeedbackType
          channels?: Array<{ __typename?: 'TopicChannel'; id: string }> | null
        } | null
      }
    }
    donations: {
      __typename?: 'ArticleDonationConnection'
      totalCount: number
      edges?: Array<{
        __typename?: 'ArticleDonationEdge'
        cursor: string
        node: {
          __typename?: 'ArticleDonation'
          id: string
          sender?: {
            __typename?: 'User'
            id: string
            avatar?: string | null
            userName?: string | null
            displayName?: string | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            }
          } | null
        }
      }> | null
    }
    likesReceived: { __typename?: 'AppreciationConnection'; totalCount: number }
    donationsDialog: {
      __typename?: 'ArticleDonationConnection'
      totalCount: number
    }
  } | null
}

export type ArticleDetailPrivateQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
}>

export type ArticleDetailPrivateQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    bookmarked: boolean
    hasAppreciate: boolean
    appreciateLeft: number
    author: {
      __typename?: 'User'
      id: string
      isBlocking: boolean
      isFollower: boolean
      isFollowee: boolean
      status?: { __typename?: 'UserStatus'; state: UserState } | null
    }
    access: {
      __typename?: 'ArticleAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        isMember: boolean
        invitedBy?: {
          __typename?: 'Invitation'
          id: string
          state: InvitationState
          freePeriod: number
        } | null
      } | null
    }
    contents: { __typename?: 'ArticleContents'; html: string }
    classification: {
      __typename?: 'ArticleClassification'
      topicChannel: {
        __typename?: 'TopicChannelClassification'
        enabled: boolean
        feedback?: {
          __typename?: 'TopicChannelFeedback'
          id: string
          state?: TopicChannelFeedbackState | null
          type: TopicChannelFeedbackType
          channels?: Array<{ __typename?: 'TopicChannel'; id: string }> | null
        } | null
      }
    }
  } | null
}

export type ArticleTranslationQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
  language: UserLanguage
}>

export type ArticleTranslationQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    translation?: {
      __typename?: 'ArticleTranslation'
      content?: string | null
      title?: string | null
      summary?: string | null
      language?: string | null
      model?: TranslationModel | null
    } | null
  } | null
}

export type AllAuthorsPublicQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type AllAuthorsPublicQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    recommendation: {
      __typename?: 'Recommendation'
      authors: {
        __typename?: 'UserConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'UserEdge'
          cursor: string
          node: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            isFollower: boolean
            isFollowee: boolean
            info: {
              __typename?: 'UserInfo'
              description?: string | null
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
          }
        }> | null
      }
    }
  } | null
}

export type AllAuthorsPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type AllAuthorsPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | {
        __typename?: 'User'
        id: string
        isFollower: boolean
        isFollowee: boolean
        status?: { __typename?: 'UserStatus'; state: UserState } | null
      }
    | { __typename?: 'WritingChallenge'; id: string }
  > | null
}

export type SocialLoginMutationVariables = Exact<{
  input: SocialLoginInput
}>

export type SocialLoginMutation = {
  __typename?: 'Mutation'
  socialLogin: {
    __typename?: 'AuthResult'
    auth: boolean
    token?: string | null
    user?: {
      __typename?: 'User'
      id: string
      settings: { __typename?: 'UserSettings'; language: UserLanguage }
      info: { __typename?: 'UserInfo'; group: UserGroup }
    } | null
  }
}

export type AddSocialLoginMutationVariables = Exact<{
  input: SocialLoginInput
}>

export type AddSocialLoginMutation = {
  __typename?: 'Mutation'
  addSocialLogin: { __typename?: 'User'; id: string }
}

export type VerifyEmailMutationVariables = Exact<{
  input: VerifyEmailInput
}>

export type VerifyEmailMutation = {
  __typename?: 'Mutation'
  verifyEmail: {
    __typename?: 'AuthResult'
    auth: boolean
    token?: string | null
    user?: {
      __typename?: 'User'
      id: string
      settings: { __typename?: 'UserSettings'; language: UserLanguage }
      info: {
        __typename?: 'UserInfo'
        group: UserGroup
        email?: any | null
        emailVerified: boolean
      }
      status?: {
        __typename?: 'UserStatus'
        hasEmailLoginPassword: boolean
      } | null
    } | null
  }
}

export type SubmitCampaignArticleMutationVariables = Exact<{
  title: Scalars['String']['input']
  campaign: Scalars['ID']['input']
  stage: Scalars['ID']['input']
}>

export type SubmitCampaignArticleMutation = {
  __typename?: 'Mutation'
  putDraft: { __typename?: 'Draft'; id: string }
}

export type ApplyCampaignMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type ApplyCampaignMutation = {
  __typename?: 'Mutation'
  applyCampaign: {
    __typename?: 'WritingChallenge'
    id: string
    application?: {
      __typename?: 'CampaignApplication'
      state: CampaignApplicationState
      createdAt: any
    } | null
  }
}

export type ApplyCampaignPublicFragment = {
  __typename?: 'WritingChallenge'
  id: string
  state: CampaignState
  link: string
  applicationPeriod?: {
    __typename?: 'DatetimeRange'
    start: any
    end?: any | null
  } | null
  writingPeriod?: {
    __typename?: 'DatetimeRange'
    start: any
    end?: any | null
  } | null
  stages: Array<{
    __typename?: 'CampaignStage'
    id: string
    nameZhHant: string
    nameZhHans: string
    nameEn: string
    period?: {
      __typename?: 'DatetimeRange'
      start: any
      end?: any | null
    } | null
  }>
}

export type ApplyCampaignPrivateFragment = {
  __typename?: 'WritingChallenge'
  id: string
  application?: {
    __typename?: 'CampaignApplication'
    state: CampaignApplicationState
    createdAt: any
  } | null
}

export type CampaignArticlesPublicQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<CampaignArticlesFilter>
}>

export type CampaignArticlesPublicQuery = {
  __typename?: 'Query'
  campaign?: {
    __typename?: 'WritingChallenge'
    id: string
    isManager: boolean
    articles: {
      __typename?: 'CampaignArticleConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges: Array<{
        __typename?: 'CampaignArticleEdge'
        cursor: string
        featured: boolean
        announcement: boolean
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          displayCover?: string | null
          summary: string
          createdAt: any
          readTime: number
          bookmarked: boolean
          pinned: boolean
          revisionCount: number
          articleState: ArticleState
          campaigns: Array<{
            __typename?: 'ArticleCampaign'
            campaign: {
              __typename?: 'WritingChallenge'
              id: string
              name: string
              shortHash: string
              nameZhHant: string
              nameZhHans: string
              nameEn: string
            }
            stage?: {
              __typename?: 'CampaignStage'
              id: string
              nameZhHant: string
              nameZhHans: string
              nameEn: string
            } | null
          }>
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
          access: {
            __typename?: 'ArticleAccess'
            type: ArticleAccessType
            circle?: {
              __typename?: 'Circle'
              id: string
              name: string
              displayName: string
            } | null
          }
          collections: {
            __typename?: 'CollectionConnection'
            edges?: Array<{
              __typename?: 'CollectionEdge'
              node: {
                __typename?: 'Collection'
                id: string
                title: string
                articles: {
                  __typename?: 'ArticleConnection'
                  totalCount: number
                }
              }
            }> | null
          }
          tags?: Array<{
            __typename?: 'Tag'
            id: string
            content: string
          }> | null
          donations: {
            __typename?: 'ArticleDonationConnection'
            totalCount: number
          }
          likesReceived: {
            __typename?: 'AppreciationConnection'
            totalCount: number
          }
          donationsDialog: {
            __typename?: 'ArticleDonationConnection'
            totalCount: number
          }
        }
      }>
    }
  } | null
}

export type CampaignArticlesPrivateQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type CampaignArticlesPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string; bookmarked: boolean }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
  > | null
  campaign?: {
    __typename?: 'WritingChallenge'
    id: string
    isManager: boolean
  } | null
}

export type ArticleFeedsTabsCampaignFragment = {
  __typename?: 'WritingChallenge'
  id: string
  featuredArticles: {
    __typename?: 'CampaignArticleConnection'
    totalCount: number
  }
  stages: Array<{
    __typename?: 'CampaignStage'
    id: string
    nameZhHant: string
    nameZhHans: string
    nameEn: string
    descriptionZhHant: string
    descriptionZhHans: string
    descriptionEn: string
    period?: {
      __typename?: 'DatetimeRange'
      start: any
      end?: any | null
    } | null
  }>
}

export type ArticleFeedsCampaignPublicFragment = {
  __typename?: 'WritingChallenge'
  id: string
  featuredDescriptionZhHant: string
  featuredDescriptionZhHans: string
  featuredDescriptionEn: string
  announcements: Array<{
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    shortHash: string
    displayCover?: string | null
    summary: string
    createdAt: any
    readTime: number
    bookmarked: boolean
    pinned: boolean
    revisionCount: number
    articleState: ArticleState
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: {
        __typename?: 'WritingChallenge'
        id: string
        name: string
        shortHash: string
        nameZhHant: string
        nameZhHans: string
        nameEn: string
      }
      stage?: {
        __typename?: 'CampaignStage'
        id: string
        nameZhHant: string
        nameZhHans: string
        nameEn: string
      } | null
    }>
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    access: {
      __typename?: 'ArticleAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
      } | null
    }
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    tags?: Array<{ __typename?: 'Tag'; id: string; content: string }> | null
    donations: { __typename?: 'ArticleDonationConnection'; totalCount: number }
    likesReceived: { __typename?: 'AppreciationConnection'; totalCount: number }
    donationsDialog: {
      __typename?: 'ArticleDonationConnection'
      totalCount: number
    }
  }>
  featuredArticles: {
    __typename?: 'CampaignArticleConnection'
    totalCount: number
  }
  stages: Array<{
    __typename?: 'CampaignStage'
    id: string
    nameZhHant: string
    nameZhHans: string
    nameEn: string
    descriptionZhHant: string
    descriptionZhHans: string
    descriptionEn: string
    period?: {
      __typename?: 'DatetimeRange'
      start: any
      end?: any | null
    } | null
  }>
}

export type ArticleFeedsCampaignPrivateFragment = {
  __typename?: 'WritingChallenge'
  id: string
  announcements: Array<{
    __typename?: 'Article'
    id: string
    bookmarked: boolean
  }>
}

export type InfoHeaderParticipantsCampaignFragment = {
  __typename?: 'WritingChallenge'
  id: string
  application?: {
    __typename?: 'CampaignApplication'
    state: CampaignApplicationState
    createdAt: any
  } | null
  participants: {
    __typename?: 'CampaignParticipantConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'CampaignParticipantEdge'
      node: {
        __typename?: 'User'
        id: string
        avatar?: string | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        }
      }
    }> | null
  }
}

export type InfoHeaderCampaignPublicFragment = {
  __typename?: 'WritingChallenge'
  id: string
  cover?: string | null
  state: CampaignState
  link: string
  nameZhHant: string
  nameZhHans: string
  nameEn: string
  descriptionZhHant?: string | null
  descriptionZhHans?: string | null
  descriptionEn?: string | null
  applicationPeriod?: {
    __typename?: 'DatetimeRange'
    start: any
    end?: any | null
  } | null
  writingPeriod?: {
    __typename?: 'DatetimeRange'
    start: any
    end?: any | null
  } | null
  stages: Array<{
    __typename?: 'CampaignStage'
    id: string
    nameZhHant: string
    nameZhHans: string
    nameEn: string
    period?: {
      __typename?: 'DatetimeRange'
      start: any
      end?: any | null
    } | null
  }>
  application?: {
    __typename?: 'CampaignApplication'
    state: CampaignApplicationState
    createdAt: any
  } | null
  participants: {
    __typename?: 'CampaignParticipantConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'CampaignParticipantEdge'
      node: {
        __typename?: 'User'
        id: string
        avatar?: string | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        }
      }
    }> | null
  }
}

export type InfoHeaderCampaignPrivateFragment = {
  __typename?: 'WritingChallenge'
  id: string
  application?: {
    __typename?: 'CampaignApplication'
    state: CampaignApplicationState
    createdAt: any
  } | null
}

export type CampaignDetailOtherCampaignsQueryVariables = Exact<{
  excludes?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>
}>

export type CampaignDetailOtherCampaignsQuery = {
  __typename?: 'Query'
  campaigns: {
    __typename?: 'CampaignConnection'
    edges?: Array<{
      __typename?: 'CampaignEdge'
      node: {
        __typename?: 'WritingChallenge'
        id: string
        cover?: string | null
        shortHash: string
        nameZhHant: string
        nameZhHans: string
        nameEn: string
      }
    }> | null
  }
}

export type SideParticipantsCampaignPublicFragment = {
  __typename?: 'WritingChallenge'
  id: string
  shortHash: string
  sideParticipants: {
    __typename?: 'CampaignParticipantConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'CampaignParticipantEdge'
      cursor: string
      node: {
        __typename?: 'User'
        id: string
        displayName?: string | null
        userName?: string | null
        avatar?: string | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        }
      }
    }> | null
  }
}

export type SideParticipantsCampaignPrivateFragment = {
  __typename?: 'WritingChallenge'
  id: string
  application?: {
    __typename?: 'CampaignApplication'
    state: CampaignApplicationState
  } | null
}

export type CampaignDetailPublicQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
}>

export type CampaignDetailPublicQuery = {
  __typename?: 'Query'
  campaign?: {
    __typename?: 'WritingChallenge'
    id: string
    showOther: boolean
    showAd: boolean
    shortHash: string
    cover?: string | null
    state: CampaignState
    link: string
    nameZhHant: string
    nameZhHans: string
    nameEn: string
    descriptionZhHant?: string | null
    descriptionZhHans?: string | null
    descriptionEn?: string | null
    featuredDescriptionZhHant: string
    featuredDescriptionZhHans: string
    featuredDescriptionEn: string
    applicationPeriod?: {
      __typename?: 'DatetimeRange'
      start: any
      end?: any | null
    } | null
    writingPeriod?: {
      __typename?: 'DatetimeRange'
      start: any
      end?: any | null
    } | null
    sideParticipants: {
      __typename?: 'CampaignParticipantConnection'
      totalCount: number
      edges?: Array<{
        __typename?: 'CampaignParticipantEdge'
        cursor: string
        node: {
          __typename?: 'User'
          id: string
          displayName?: string | null
          userName?: string | null
          avatar?: string | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          }
        }
      }> | null
    }
    application?: {
      __typename?: 'CampaignApplication'
      state: CampaignApplicationState
      createdAt: any
    } | null
    announcements: Array<{
      __typename?: 'Article'
      id: string
      title: string
      slug: string
      shortHash: string
      displayCover?: string | null
      summary: string
      createdAt: any
      readTime: number
      bookmarked: boolean
      pinned: boolean
      revisionCount: number
      articleState: ArticleState
      campaigns: Array<{
        __typename?: 'ArticleCampaign'
        campaign: {
          __typename?: 'WritingChallenge'
          id: string
          name: string
          shortHash: string
          nameZhHant: string
          nameZhHans: string
          nameEn: string
        }
        stage?: {
          __typename?: 'CampaignStage'
          id: string
          nameZhHant: string
          nameZhHans: string
          nameEn: string
        } | null
      }>
      author: {
        __typename?: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        avatar?: string | null
        status?: { __typename?: 'UserStatus'; state: UserState } | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          cryptoWallet?: {
            __typename?: 'CryptoWallet'
            id: string
            address: string
            hasNFTs: boolean
          } | null
        }
      }
      access: {
        __typename?: 'ArticleAccess'
        type: ArticleAccessType
        circle?: {
          __typename?: 'Circle'
          id: string
          name: string
          displayName: string
        } | null
      }
      collections: {
        __typename?: 'CollectionConnection'
        edges?: Array<{
          __typename?: 'CollectionEdge'
          node: {
            __typename?: 'Collection'
            id: string
            title: string
            articles: { __typename?: 'ArticleConnection'; totalCount: number }
          }
        }> | null
      }
      tags?: Array<{ __typename?: 'Tag'; id: string; content: string }> | null
      donations: {
        __typename?: 'ArticleDonationConnection'
        totalCount: number
      }
      likesReceived: {
        __typename?: 'AppreciationConnection'
        totalCount: number
      }
      donationsDialog: {
        __typename?: 'ArticleDonationConnection'
        totalCount: number
      }
    }>
    stages: Array<{
      __typename?: 'CampaignStage'
      id: string
      nameZhHant: string
      nameZhHans: string
      nameEn: string
      descriptionZhHant: string
      descriptionZhHans: string
      descriptionEn: string
      period?: {
        __typename?: 'DatetimeRange'
        start: any
        end?: any | null
      } | null
    }>
    participants: {
      __typename?: 'CampaignParticipantConnection'
      totalCount: number
      edges?: Array<{
        __typename?: 'CampaignParticipantEdge'
        node: {
          __typename?: 'User'
          id: string
          avatar?: string | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          }
        }
      }> | null
    }
    featuredArticles: {
      __typename?: 'CampaignArticleConnection'
      totalCount: number
    }
  } | null
}

export type CampaignDetailPrivateQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
}>

export type CampaignDetailPrivateQuery = {
  __typename?: 'Query'
  campaign?: {
    __typename?: 'WritingChallenge'
    id: string
    application?: {
      __typename?: 'CampaignApplication'
      state: CampaignApplicationState
      createdAt: any
    } | null
    announcements: Array<{
      __typename?: 'Article'
      id: string
      bookmarked: boolean
    }>
  } | null
}

export type GetParticipantsQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type GetParticipantsQuery = {
  __typename?: 'Query'
  campaign?: {
    __typename?: 'WritingChallenge'
    id: string
    application?: {
      __typename?: 'CampaignApplication'
      state: CampaignApplicationState
    } | null
    participants: {
      __typename?: 'CampaignParticipantConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'CampaignParticipantEdge'
        cursor: string
        node: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          info: {
            __typename?: 'UserInfo'
            description?: string | null
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
        }
      }> | null
    }
  } | null
}

export type CampaignsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
  state?: InputMaybe<CampaignsFilterState>
}>

export type CampaignsQuery = {
  __typename?: 'Query'
  campaigns: {
    __typename?: 'CampaignConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      startCursor?: string | null
      endCursor?: string | null
      hasNextPage: boolean
    }
    edges?: Array<{
      __typename?: 'CampaignEdge'
      cursor: string
      node: {
        __typename?: 'WritingChallenge'
        id: string
        cover?: string | null
        shortHash: string
        description?: string | null
        nameZhHant: string
        nameZhHans: string
        nameEn: string
        stages: Array<{
          __typename?: 'CampaignStage'
          id: string
          nameZhHant: string
          nameZhHans: string
          nameEn: string
          period?: {
            __typename?: 'DatetimeRange'
            start: any
            end?: any | null
          } | null
        }>
        applicationPeriod?: {
          __typename?: 'DatetimeRange'
          start: any
          end?: any | null
        } | null
        writingPeriod?: {
          __typename?: 'DatetimeRange'
          start: any
          end?: any | null
        } | null
        participants: {
          __typename?: 'CampaignParticipantConnection'
          totalCount: number
          edges?: Array<{
            __typename?: 'CampaignParticipantEdge'
            node: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
          }> | null
        }
        organizers: Array<{
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }>
      }
    }> | null
  }
}

export type CampaignOrganizersQueryVariables = Exact<{ [key: string]: never }>

export type CampaignOrganizersQuery = {
  __typename?: 'Query'
  campaignOrganizers: {
    __typename?: 'UserConnection'
    edges?: Array<{
      __typename?: 'UserEdge'
      node: {
        __typename?: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        avatar?: string | null
        isFollower: boolean
        isFollowee: boolean
        info: {
          __typename?: 'UserInfo'
          description?: string | null
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          cryptoWallet?: {
            __typename?: 'CryptoWallet'
            id: string
            address: string
            hasNFTs: boolean
          } | null
        }
        status?: { __typename?: 'UserStatus'; state: UserState } | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
      }
    }> | null
  }
}

export type CircleContentAnalyticsArticleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  shortHash: string
  createdAt: any
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type CircleContentAnalyticsPublicQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type CircleContentAnalyticsPublicQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    analytics: {
      __typename?: 'CircleAnalytics'
      content: {
        __typename?: 'CircleContentAnalytics'
        public?: Array<{
          __typename?: 'CircleContentAnalyticsDatum'
          readCount: number
          node: {
            __typename?: 'Article'
            id: string
            title: string
            slug: string
            shortHash: string
            createdAt: any
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
            }
          }
        }> | null
      }
    }
  } | null
}

export type CircleContentAnalyticsPaywallQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type CircleContentAnalyticsPaywallQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    analytics: {
      __typename?: 'CircleAnalytics'
      content: {
        __typename?: 'CircleContentAnalytics'
        paywall?: Array<{
          __typename?: 'CircleContentAnalyticsDatum'
          readCount: number
          node: {
            __typename?: 'Article'
            id: string
            title: string
            slug: string
            shortHash: string
            createdAt: any
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
            }
          }
        }> | null
      }
    }
  } | null
}

export type CircleFollowerAnalyticsQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type CircleFollowerAnalyticsQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    analytics: {
      __typename?: 'CircleAnalytics'
      follower: {
        __typename?: 'CircleFollowerAnalytics'
        current: number
        followerPercentage: number
        history: Array<{
          __typename?: 'MonthlyDatum'
          value: number
          date: any
        }>
      }
    }
  } | null
}

export type CircleIncomeAnalyticsQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type CircleIncomeAnalyticsQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    analytics: {
      __typename?: 'CircleAnalytics'
      income: {
        __typename?: 'CircleIncomeAnalytics'
        thisMonth: number
        nextMonth: number
        total: number
        history: Array<{
          __typename?: 'MonthlyDatum'
          value: number
          date: any
        }>
      }
    }
  } | null
}

export type CircleSubscriberAnalyticsQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type CircleSubscriberAnalyticsQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    analytics: {
      __typename?: 'CircleAnalytics'
      subscriber: {
        __typename?: 'CircleSubscriberAnalytics'
        currentSubscriber: number
        currentInvitee: number
        subscriberHistory: Array<{
          __typename?: 'MonthlyDatum'
          value: number
          date: any
        }>
        inviteeHistory: Array<{
          __typename?: 'MonthlyDatum'
          value: number
          date: any
        }>
      }
    }
  } | null
}

export type BroadcastPublicQueryVariables = Exact<{
  name: Scalars['String']['input']
  before?: InputMaybe<Scalars['String']['input']>
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  includeAfter?: InputMaybe<Scalars['Boolean']['input']>
  includeBefore?: InputMaybe<Scalars['Boolean']['input']>
}>

export type BroadcastPublicQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    circleIsMember: boolean
    owner: { __typename?: 'User'; id: string }
    broadcast: {
      __typename?: 'CommentConnection'
      totalCount: number
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'CommentEdge'
        node: {
          __typename?: 'Comment'
          id: string
          state: CommentState
          content?: string | null
          type: CommentType
          createdAt: any
          upvotes: number
          downvotes: number
          pinned: boolean
          myVote?: Vote | null
          comments: {
            __typename?: 'CommentConnection'
            edges?: Array<{
              __typename?: 'CommentEdge'
              cursor: string
              node: {
                __typename?: 'Comment'
                id: string
                state: CommentState
                content?: string | null
                type: CommentType
                createdAt: any
                upvotes: number
                downvotes: number
                pinned: boolean
                myVote?: Vote | null
                author: {
                  __typename?: 'User'
                  id: string
                  isBlocked: boolean
                  userName?: string | null
                  displayName?: string | null
                  avatar?: string | null
                  status?: {
                    __typename?: 'UserStatus'
                    state: UserState
                  } | null
                  liker: { __typename?: 'Liker'; civicLiker: boolean }
                  info: {
                    __typename?: 'UserInfo'
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                    cryptoWallet?: {
                      __typename?: 'CryptoWallet'
                      id: string
                      address: string
                      hasNFTs: boolean
                    } | null
                  }
                }
                replyTo?: {
                  __typename?: 'Comment'
                  id: string
                  author: {
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                    displayName?: string | null
                    avatar?: string | null
                    status?: {
                      __typename?: 'UserStatus'
                      state: UserState
                    } | null
                    liker: { __typename?: 'Liker'; civicLiker: boolean }
                    info: {
                      __typename?: 'UserInfo'
                      badges?: Array<{
                        __typename?: 'Badge'
                        type: BadgeType
                      }> | null
                      cryptoWallet?: {
                        __typename?: 'CryptoWallet'
                        id: string
                        address: string
                        hasNFTs: boolean
                      } | null
                    }
                  }
                } | null
                parentComment?: { __typename?: 'Comment'; id: string } | null
                node:
                  | { __typename?: 'Article' }
                  | { __typename?: 'ArticleVersion' }
                  | {
                      __typename?: 'Circle'
                      id: string
                      name: string
                      owner: {
                        __typename?: 'User'
                        id: string
                        isBlocking: boolean
                      }
                    }
                  | { __typename?: 'Collection' }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'CurationChannel' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'IcymiTopic' }
                  | { __typename?: 'Moment' }
                  | { __typename?: 'Report' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'TopicChannel' }
                  | { __typename?: 'User' }
                  | { __typename?: 'WritingChallenge' }
              }
            }> | null
          }
          author: {
            __typename?: 'User'
            id: string
            isBlocked: boolean
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
          replyTo?: {
            __typename?: 'Comment'
            id: string
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
          } | null
          parentComment?: { __typename?: 'Comment'; id: string } | null
          node:
            | { __typename?: 'Article' }
            | { __typename?: 'ArticleVersion' }
            | {
                __typename?: 'Circle'
                id: string
                name: string
                owner: { __typename?: 'User'; id: string; isBlocking: boolean }
              }
            | { __typename?: 'Collection' }
            | { __typename?: 'Comment' }
            | { __typename?: 'CurationChannel' }
            | { __typename?: 'Draft' }
            | { __typename?: 'IcymiTopic' }
            | { __typename?: 'Moment' }
            | { __typename?: 'Report' }
            | { __typename?: 'Tag' }
            | { __typename?: 'TopicChannel' }
            | { __typename?: 'User' }
            | { __typename?: 'WritingChallenge' }
        }
      }> | null
    }
  } | null
}

export type BroadcastPrivateQueryVariables = Exact<{
  name: Scalars['String']['input']
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type BroadcastPrivateQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    circleIsMember: boolean
    owner: { __typename?: 'User'; id: string }
  } | null
  nodes?: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | {
        __typename?: 'Comment'
        id: string
        myVote?: Vote | null
        type: CommentType
        createdAt: any
        comments: {
          __typename?: 'CommentConnection'
          edges?: Array<{
            __typename?: 'CommentEdge'
            cursor: string
            node: {
              __typename?: 'Comment'
              id: string
              myVote?: Vote | null
              type: CommentType
              createdAt: any
              node:
                | { __typename?: 'Article' }
                | { __typename?: 'ArticleVersion' }
                | {
                    __typename?: 'Circle'
                    id: string
                    name: string
                    owner: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                    }
                  }
                | { __typename?: 'Collection' }
                | { __typename?: 'Comment' }
                | { __typename?: 'CurationChannel' }
                | { __typename?: 'Draft' }
                | { __typename?: 'IcymiTopic' }
                | { __typename?: 'Moment' }
                | { __typename?: 'Report' }
                | { __typename?: 'Tag' }
                | { __typename?: 'TopicChannel' }
                | { __typename?: 'User' }
                | { __typename?: 'WritingChallenge' }
              author: { __typename?: 'User'; id: string; isBlocked: boolean }
              parentComment?: { __typename?: 'Comment'; id: string } | null
            }
          }> | null
        }
        node:
          | { __typename?: 'Article' }
          | { __typename?: 'ArticleVersion' }
          | {
              __typename?: 'Circle'
              id: string
              name: string
              owner: { __typename?: 'User'; id: string; isBlocking: boolean }
            }
          | { __typename?: 'Collection' }
          | { __typename?: 'Comment' }
          | { __typename?: 'CurationChannel' }
          | { __typename?: 'Draft' }
          | { __typename?: 'IcymiTopic' }
          | { __typename?: 'Moment' }
          | { __typename?: 'Report' }
          | { __typename?: 'Tag' }
          | { __typename?: 'TopicChannel' }
          | { __typename?: 'User' }
          | { __typename?: 'WritingChallenge' }
        author: { __typename?: 'User'; id: string; isBlocked: boolean }
        parentComment?: { __typename?: 'Comment'; id: string } | null
      }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
  > | null
}

export type DiscussionPublicQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type DiscussionPublicQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    discussionCount: number
    discussionThreadCount: number
    circleIsMember: boolean
    owner: { __typename?: 'User'; id: string; isBlocking: boolean }
  } | null
}

export type DiscussionPrivateQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type DiscussionPrivateQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    circleIsMember: boolean
    owner: { __typename?: 'User'; id: string; isBlocking: boolean }
  } | null
}

export type DiscussionCommentsQueryVariables = Exact<{
  name: Scalars['String']['input']
  before?: InputMaybe<Scalars['String']['input']>
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  includeAfter?: InputMaybe<Scalars['Boolean']['input']>
  includeBefore?: InputMaybe<Scalars['Boolean']['input']>
}>

export type DiscussionCommentsQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    discussion: {
      __typename?: 'CommentConnection'
      totalCount: number
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'CommentEdge'
        node: {
          __typename?: 'Comment'
          id: string
          state: CommentState
          content?: string | null
          type: CommentType
          createdAt: any
          upvotes: number
          downvotes: number
          pinned: boolean
          myVote?: Vote | null
          comments: {
            __typename?: 'CommentConnection'
            edges?: Array<{
              __typename?: 'CommentEdge'
              cursor: string
              node: {
                __typename?: 'Comment'
                id: string
                state: CommentState
                content?: string | null
                type: CommentType
                createdAt: any
                upvotes: number
                downvotes: number
                pinned: boolean
                myVote?: Vote | null
                author: {
                  __typename?: 'User'
                  id: string
                  isBlocked: boolean
                  userName?: string | null
                  displayName?: string | null
                  avatar?: string | null
                  status?: {
                    __typename?: 'UserStatus'
                    state: UserState
                  } | null
                  liker: { __typename?: 'Liker'; civicLiker: boolean }
                  info: {
                    __typename?: 'UserInfo'
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                    cryptoWallet?: {
                      __typename?: 'CryptoWallet'
                      id: string
                      address: string
                      hasNFTs: boolean
                    } | null
                  }
                }
                replyTo?: {
                  __typename?: 'Comment'
                  id: string
                  author: {
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                    displayName?: string | null
                    avatar?: string | null
                    status?: {
                      __typename?: 'UserStatus'
                      state: UserState
                    } | null
                    liker: { __typename?: 'Liker'; civicLiker: boolean }
                    info: {
                      __typename?: 'UserInfo'
                      badges?: Array<{
                        __typename?: 'Badge'
                        type: BadgeType
                      }> | null
                      cryptoWallet?: {
                        __typename?: 'CryptoWallet'
                        id: string
                        address: string
                        hasNFTs: boolean
                      } | null
                    }
                  }
                } | null
                parentComment?: { __typename?: 'Comment'; id: string } | null
                node:
                  | { __typename?: 'Article' }
                  | { __typename?: 'ArticleVersion' }
                  | {
                      __typename?: 'Circle'
                      id: string
                      name: string
                      owner: {
                        __typename?: 'User'
                        id: string
                        isBlocking: boolean
                      }
                    }
                  | { __typename?: 'Collection' }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'CurationChannel' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'IcymiTopic' }
                  | { __typename?: 'Moment' }
                  | { __typename?: 'Report' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'TopicChannel' }
                  | { __typename?: 'User' }
                  | { __typename?: 'WritingChallenge' }
              }
            }> | null
          }
          author: {
            __typename?: 'User'
            id: string
            isBlocked: boolean
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
          replyTo?: {
            __typename?: 'Comment'
            id: string
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
          } | null
          parentComment?: { __typename?: 'Comment'; id: string } | null
          node:
            | { __typename?: 'Article' }
            | { __typename?: 'ArticleVersion' }
            | {
                __typename?: 'Circle'
                id: string
                name: string
                owner: { __typename?: 'User'; id: string; isBlocking: boolean }
              }
            | { __typename?: 'Collection' }
            | { __typename?: 'Comment' }
            | { __typename?: 'CurationChannel' }
            | { __typename?: 'Draft' }
            | { __typename?: 'IcymiTopic' }
            | { __typename?: 'Moment' }
            | { __typename?: 'Report' }
            | { __typename?: 'Tag' }
            | { __typename?: 'TopicChannel' }
            | { __typename?: 'User' }
            | { __typename?: 'WritingChallenge' }
        }
      }> | null
    }
  } | null
}

export type AuthorWidgetCircleFragment = {
  __typename?: 'Circle'
  id: string
  owner: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
  }
  pinnedBroadcast?: Array<{
    __typename?: 'Comment'
    id: string
    content?: string | null
    state: CommentState
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }> | null
}

export type DropdownActionsCirclePublicFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  owner: { __typename?: 'User'; id: string }
}

export type DropdownActionsCirclePrivateFragment = {
  __typename?: 'Circle'
  id: string
  isMember: boolean
}

export type FollowButtonCirclePrivateFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  isFollower: boolean
}

export type CircleFollowersPublicQueryVariables = Exact<{
  name: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type CircleFollowersPublicQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    cover?: string | null
    displayName: string
    description?: string | null
    followers: {
      __typename?: 'UserConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'UserEdge'
        cursor: string
        node: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          isFollower: boolean
          isFollowee: boolean
          info: {
            __typename?: 'UserInfo'
            description?: string | null
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
        }
      }> | null
    }
  } | null
}

export type CircleFollowersPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type CircleFollowersPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | {
        __typename?: 'User'
        id: string
        isFollower: boolean
        isFollowee: boolean
        status?: { __typename?: 'UserStatus'; state: UserState } | null
      }
    | { __typename?: 'WritingChallenge' }
  > | null
}

export type CircleMembersPublicQueryVariables = Exact<{
  name: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type CircleMembersPublicQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    cover?: string | null
    displayName: string
    description?: string | null
    members: {
      __typename?: 'MemberConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'MemberEdge'
        cursor: string
        node: {
          __typename?: 'Member'
          user: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            isFollower: boolean
            isFollowee: boolean
            info: {
              __typename?: 'UserInfo'
              description?: string | null
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
          }
        }
      }> | null
    }
  } | null
}

export type CircleMembersPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type CircleMembersPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | {
        __typename?: 'User'
        id: string
        isFollower: boolean
        isFollowee: boolean
        status?: { __typename?: 'UserStatus'; state: UserState } | null
      }
    | { __typename?: 'WritingChallenge' }
  > | null
}

export type ProfileCirclePublicFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  displayName: string
  description?: string | null
  cover?: string | null
  isMember: boolean
  avatar?: string | null
  owner: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
  }
  members: { __typename?: 'MemberConnection'; totalCount: number }
  followers: { __typename?: 'UserConnection'; totalCount: number }
  pinnedBroadcast?: Array<{
    __typename?: 'Comment'
    id: string
    content?: string | null
    state: CommentState
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }> | null
  prices?: Array<{
    __typename?: 'Price'
    amount: number
    currency: TransactionCurrency
  }> | null
  works: { __typename?: 'ArticleConnection'; totalCount: number }
}

export type ProfileCirclePrivateFragment = {
  __typename?: 'Circle'
  id: string
  isMember: boolean
  name: string
  isFollower: boolean
  owner: { __typename?: 'User'; id: string }
  invitedBy?: {
    __typename?: 'Invitation'
    id: string
    state: InvitationState
    freePeriod: number
  } | null
}

export type CircleProfileCirclePublicQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type CircleProfileCirclePublicQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    name: string
    displayName: string
    description?: string | null
    cover?: string | null
    isMember: boolean
    avatar?: string | null
    isFollower: boolean
    owner: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      info: {
        __typename?: 'UserInfo'
        description?: string | null
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
    }
    members: { __typename?: 'MemberConnection'; totalCount: number }
    followers: { __typename?: 'UserConnection'; totalCount: number }
    pinnedBroadcast?: Array<{
      __typename?: 'Comment'
      id: string
      content?: string | null
      state: CommentState
      author: { __typename?: 'User'; id: string; isBlocked: boolean }
    }> | null
    prices?: Array<{
      __typename?: 'Price'
      amount: number
      currency: TransactionCurrency
    }> | null
    works: { __typename?: 'ArticleConnection'; totalCount: number }
    invitedBy?: {
      __typename?: 'Invitation'
      id: string
      state: InvitationState
      freePeriod: number
    } | null
  } | null
}

export type CircleProfileCirclePrivateQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type CircleProfileCirclePrivateQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    isMember: boolean
    name: string
    isFollower: boolean
    owner: { __typename?: 'User'; id: string }
    invitedBy?: {
      __typename?: 'Invitation'
      id: string
      state: InvitationState
      freePeriod: number
    } | null
  } | null
}

export type CircleBasicProfileQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type CircleBasicProfileQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    name: string
    displayName: string
    description?: string | null
    cover?: string | null
    avatar?: string | null
    owner: { __typename?: 'User'; id: string }
  } | null
}

export type InvitationsCircleQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type InvitationsCircleQuery = {
  __typename?: 'Query'
  circle?: { __typename?: 'Circle'; id: string } | null
}

export type CircleAcceptedInvitesQueryVariables = Exact<{
  name: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type CircleAcceptedInvitesQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    owner: { __typename?: 'User'; id: string }
    invites: {
      __typename?: 'Invites'
      accepted: {
        __typename?: 'InvitationConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'InvitationEdge'
          cursor: string
          node: {
            __typename?: 'Invitation'
            id: string
            freePeriod: number
            acceptedAt?: any | null
            state: InvitationState
            circle: { __typename?: 'Circle'; id: string }
            invitee:
              | { __typename: 'Person'; email: any }
              | {
                  __typename: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                  avatar?: string | null
                  status?: {
                    __typename?: 'UserStatus'
                    state: UserState
                  } | null
                  liker: { __typename?: 'Liker'; civicLiker: boolean }
                  info: {
                    __typename?: 'UserInfo'
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                    cryptoWallet?: {
                      __typename?: 'CryptoWallet'
                      id: string
                      address: string
                      hasNFTs: boolean
                    } | null
                  }
                }
          }
        }> | null
      }
    }
  } | null
}

export type CircleInvitationFragment = {
  __typename?: 'Invitation'
  id: string
  freePeriod: number
  acceptedAt?: any | null
  state: InvitationState
  circle: { __typename?: 'Circle'; id: string }
  invitee:
    | { __typename: 'Person'; email: any }
    | {
        __typename: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        avatar?: string | null
        status?: { __typename?: 'UserStatus'; state: UserState } | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          cryptoWallet?: {
            __typename?: 'CryptoWallet'
            id: string
            address: string
            hasNFTs: boolean
          } | null
        }
      }
}

export type CirclePendingInvitesQueryVariables = Exact<{
  name: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type CirclePendingInvitesQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    owner: { __typename?: 'User'; id: string }
    invites: {
      __typename?: 'Invites'
      pending: {
        __typename?: 'InvitationConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'InvitationEdge'
          cursor: string
          node: {
            __typename?: 'Invitation'
            id: string
            freePeriod: number
            acceptedAt?: any | null
            state: InvitationState
            circle: { __typename?: 'Circle'; id: string }
            invitee:
              | { __typename: 'Person'; email: any }
              | {
                  __typename: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                  avatar?: string | null
                  status?: {
                    __typename?: 'UserStatus'
                    state: UserState
                  } | null
                  liker: { __typename?: 'Liker'; civicLiker: boolean }
                  info: {
                    __typename?: 'UserInfo'
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                    cryptoWallet?: {
                      __typename?: 'CryptoWallet'
                      id: string
                      address: string
                      hasNFTs: boolean
                    } | null
                  }
                }
          }
        }> | null
      }
    }
  } | null
}

export type SubscriptionBannerCirclePublicFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  displayName: string
  description?: string | null
  avatar?: string | null
  prices?: Array<{
    __typename?: 'Price'
    amount: number
    currency: TransactionCurrency
  }> | null
  owner: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  members: { __typename?: 'MemberConnection'; totalCount: number }
  works: { __typename?: 'ArticleConnection'; totalCount: number }
}

export type SubscriptionBannerCirclePrivateFragment = {
  __typename?: 'Circle'
  id: string
  isMember: boolean
  owner: { __typename?: 'User'; id: string }
  invitedBy?: {
    __typename?: 'Invitation'
    id: string
    state: InvitationState
    freePeriod: number
  } | null
}

export type CircleWorksPublicQueryVariables = Exact<{
  name: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type CircleWorksPublicQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    articles: {
      __typename?: 'ArticleConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'ArticleEdge'
        cursor: string
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          displayCover?: string | null
          summary: string
          createdAt: any
          readTime: number
          bookmarked: boolean
          pinned: boolean
          revisionCount: number
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
          access: {
            __typename?: 'ArticleAccess'
            type: ArticleAccessType
            circle?: {
              __typename?: 'Circle'
              id: string
              name: string
              displayName: string
            } | null
          }
          collections: {
            __typename?: 'CollectionConnection'
            edges?: Array<{
              __typename?: 'CollectionEdge'
              node: {
                __typename?: 'Collection'
                id: string
                title: string
                articles: {
                  __typename?: 'ArticleConnection'
                  totalCount: number
                }
              }
            }> | null
          }
          campaigns: Array<{
            __typename?: 'ArticleCampaign'
            campaign: {
              __typename?: 'WritingChallenge'
              id: string
              name: string
              shortHash: string
              nameZhHant: string
              nameZhHans: string
              nameEn: string
            }
            stage?: { __typename?: 'CampaignStage'; id: string } | null
          }>
          tags?: Array<{
            __typename?: 'Tag'
            id: string
            content: string
          }> | null
          donations: {
            __typename?: 'ArticleDonationConnection'
            totalCount: number
          }
          likesReceived: {
            __typename?: 'AppreciationConnection'
            totalCount: number
          }
          donationsDialog: {
            __typename?: 'ArticleDonationConnection'
            totalCount: number
          }
        }
      }> | null
    }
  } | null
}

export type CircleWorksPrivateQueryVariables = Exact<{
  name: Scalars['String']['input']
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type CircleWorksPrivateQuery = {
  __typename?: 'Query'
  circle?: { __typename?: 'Circle'; id: string } | null
  nodes?: Array<
    | { __typename?: 'Article'; id: string; bookmarked: boolean }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
  > | null
}

export type UnfollowActionButtonCirclePrivateFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  displayName: string
  isFollower: boolean
}

export type UnfollowActionButtonTagPrivateFragment = {
  __typename?: 'Tag'
  id: string
  content: string
  isFollower?: boolean | null
}

export type UnfollowActionButtonUserPrivateFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  isFollower: boolean
  isFollowee: boolean
}

export type FollowingFeedCircleFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  displayName: string
  description?: string | null
  createdAt: any
  avatar?: string | null
  owner: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
}

export type FollowingFeedCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  createdAt: any
  content?: string | null
  state: CommentState
  communityWatchAction?: {
    __typename?: 'CommunityWatchAction'
    uuid: string
  } | null
}

export type FollowingFeedCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  author: { __typename?: 'User'; id: string; isBlocked: boolean }
}

export type FollowingFeedUserPublicFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  info: {
    __typename?: 'UserInfo'
    description?: string | null
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    cryptoWallet?: {
      __typename?: 'CryptoWallet'
      id: string
      address: string
      hasNFTs: boolean
    } | null
  }
  status?: { __typename?: 'UserStatus'; state: UserState } | null
  liker: { __typename?: 'Liker'; civicLiker: boolean }
}

export type FollowingFeedUserPrivateFragment = {
  __typename?: 'User'
  id: string
  isFollower: boolean
  isFollowee: boolean
  status?: { __typename?: 'UserStatus'; state: UserState } | null
}

export type FollowingFeedRecommendArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  shortHash: string
  cover?: string | null
  summary: string
  recommendArticleState: ArticleState
  articleState: ArticleState
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
}

export type FollowingFeedRecommendCircleFooterPublicFragment = {
  __typename?: 'Circle'
  id: string
  members: { __typename?: 'MemberConnection'; totalCount: number }
  works: { __typename?: 'ArticleConnection'; totalCount: number }
  prices?: Array<{
    __typename?: 'Price'
    amount: number
    currency: TransactionCurrency
  }> | null
}

export type FollowingFeedRecommendCircleFooterPrivateFragment = {
  __typename?: 'Circle'
  id: string
  isMember: boolean
  invitedBy?: {
    __typename?: 'Invitation'
    id: string
    state: InvitationState
    freePeriod: number
  } | null
}

export type FollowingFeedRecommendCirclePublicFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  displayName: string
  description?: string | null
  avatar?: string | null
  members: { __typename?: 'MemberConnection'; totalCount: number }
  works: { __typename?: 'ArticleConnection'; totalCount: number }
  prices?: Array<{
    __typename?: 'Price'
    amount: number
    currency: TransactionCurrency
  }> | null
  owner: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
}

export type FollowingFeedRecommendCirclePrivateFragment = {
  __typename?: 'Circle'
  id: string
  isMember: boolean
  invitedBy?: {
    __typename?: 'Invitation'
    id: string
    state: InvitationState
    freePeriod: number
  } | null
}

export type FollowingFeedRecommendUserPublicFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  info: {
    __typename?: 'UserInfo'
    description?: string | null
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
  }
  status?: { __typename?: 'UserStatus'; state: UserState } | null
  liker: { __typename?: 'Liker'; civicLiker: boolean }
}

export type FollowingFeedRecommendUserPrivateFragment = {
  __typename?: 'User'
  id: string
  isFollower: boolean
  isFollowee: boolean
  status?: { __typename?: 'UserStatus'; state: UserState } | null
}

export type RecommendArticleActivityFragment = {
  __typename?: 'ArticleRecommendationActivity'
  source?: ArticleRecommendationActivitySource | null
  recommendArticles?: Array<{
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    shortHash: string
    cover?: string | null
    summary: string
    recommendArticleState: ArticleState
    articleState: ArticleState
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
  }> | null
}

export type RecommendUserActivityFragment = {
  __typename?: 'UserRecommendationActivity'
  recommendUsers?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    isFollower: boolean
    isFollowee: boolean
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
  }> | null
}

export type UserAddArticleTagActivityFragment = {
  __typename?: 'UserAddArticleTagActivity'
  createdAt: any
  actor: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
  }
  nodeArticle: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    shortHash: string
    displayCover?: string | null
    summary: string
    createdAt: any
    readTime: number
    bookmarked: boolean
    pinned: boolean
    revisionCount: number
    articleState: ArticleState
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    access: {
      __typename?: 'ArticleAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
      } | null
    }
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: {
        __typename?: 'WritingChallenge'
        id: string
        name: string
        shortHash: string
        nameZhHant: string
        nameZhHans: string
        nameEn: string
      }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
    tags?: Array<{ __typename?: 'Tag'; id: string; content: string }> | null
    donations: { __typename?: 'ArticleDonationConnection'; totalCount: number }
    likesReceived: { __typename?: 'AppreciationConnection'; totalCount: number }
    donationsDialog: {
      __typename?: 'ArticleDonationConnection'
      totalCount: number
    }
  }
  targetTag: {
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
    isFollower?: boolean | null
  }
}

export type UserBroadcastCircleActivityFragment = {
  __typename?: 'UserBroadcastCircleActivity'
  createdAt: any
  actor: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
  }
  nodeComment: {
    __typename?: 'Comment'
    id: string
    createdAt: any
    content?: string | null
    state: CommentState
    communityWatchAction?: {
      __typename?: 'CommunityWatchAction'
      uuid: string
    } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
  targetCircle: {
    __typename?: 'Circle'
    id: string
    name: string
    displayName: string
    description?: string | null
    createdAt: any
    isFollower: boolean
    avatar?: string | null
    owner: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
  }
}

export type UserCreateCircleActivityFragment = {
  __typename?: 'UserCreateCircleActivity'
  createdAt: any
  actor: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    isFollower: boolean
    isFollowee: boolean
  }
  nodeCircle: {
    __typename?: 'Circle'
    id: string
    name: string
    displayName: string
    description?: string | null
    createdAt: any
    avatar?: string | null
    owner: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
  }
}

export type UserPostMomentActivityFragment = {
  __typename?: 'UserPostMomentActivity'
  createdAt: any
  actor: { __typename?: 'User'; id: string }
  nodeMoment: {
    __typename?: 'Moment'
    id: string
    createdAt: any
    shortHash: string
    state: MomentState
    content?: string | null
    commentCount: number
    likeCount: number
    liked: boolean
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
    commentedFollowees: Array<{
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }>
  }
  more: Array<{
    __typename?: 'Moment'
    id: string
    createdAt: any
    shortHash: string
    state: MomentState
    content?: string | null
    commentCount: number
    likeCount: number
    liked: boolean
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
    commentedFollowees: Array<{
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }>
  }>
}

export type UserPublishArticleActivityFragment = {
  __typename?: 'UserPublishArticleActivity'
  createdAt: any
  actor: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    isFollower: boolean
    isFollowee: boolean
  }
  nodeArticle: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    shortHash: string
    displayCover?: string | null
    summary: string
    createdAt: any
    readTime: number
    bookmarked: boolean
    pinned: boolean
    revisionCount: number
    articleState: ArticleState
    access: {
      __typename?: 'ArticleAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
      } | null
    }
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: {
        __typename?: 'WritingChallenge'
        id: string
        name: string
        shortHash: string
        nameZhHant: string
        nameZhHans: string
        nameEn: string
      }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
    tags?: Array<{ __typename?: 'Tag'; id: string; content: string }> | null
    donations: { __typename?: 'ArticleDonationConnection'; totalCount: number }
    likesReceived: { __typename?: 'AppreciationConnection'; totalCount: number }
    donationsDialog: {
      __typename?: 'ArticleDonationConnection'
      totalCount: number
    }
  }
}

export type FollowingFeedQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<RecommendationFollowingFilterType>
}>

export type FollowingFeedQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    recommendation: {
      __typename?: 'Recommendation'
      following: {
        __typename?: 'FollowingActivityConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'FollowingActivityEdge'
          cursor: string
          node:
            | {
                __typename: 'ArticleRecommendationActivity'
                source?: ArticleRecommendationActivitySource | null
                recommendArticles?: Array<{
                  __typename?: 'Article'
                  id: string
                  title: string
                  slug: string
                  shortHash: string
                  cover?: string | null
                  summary: string
                  recommendArticleState: ArticleState
                  articleState: ArticleState
                  author: {
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                    displayName?: string | null
                    avatar?: string | null
                    status?: {
                      __typename?: 'UserStatus'
                      state: UserState
                    } | null
                    liker: { __typename?: 'Liker'; civicLiker: boolean }
                    info: {
                      __typename?: 'UserInfo'
                      badges?: Array<{
                        __typename?: 'Badge'
                        type: BadgeType
                      }> | null
                      cryptoWallet?: {
                        __typename?: 'CryptoWallet'
                        id: string
                        address: string
                        hasNFTs: boolean
                      } | null
                    }
                  }
                }> | null
              }
            | { __typename: 'CircleRecommendationActivity' }
            | {
                __typename: 'UserAddArticleTagActivity'
                createdAt: any
                actor: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                }
                nodeArticle: {
                  __typename?: 'Article'
                  id: string
                  title: string
                  slug: string
                  shortHash: string
                  displayCover?: string | null
                  summary: string
                  createdAt: any
                  readTime: number
                  bookmarked: boolean
                  pinned: boolean
                  revisionCount: number
                  articleState: ArticleState
                  author: {
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                    displayName?: string | null
                    avatar?: string | null
                    status?: {
                      __typename?: 'UserStatus'
                      state: UserState
                    } | null
                    liker: { __typename?: 'Liker'; civicLiker: boolean }
                    info: {
                      __typename?: 'UserInfo'
                      badges?: Array<{
                        __typename?: 'Badge'
                        type: BadgeType
                      }> | null
                      cryptoWallet?: {
                        __typename?: 'CryptoWallet'
                        id: string
                        address: string
                        hasNFTs: boolean
                      } | null
                    }
                  }
                  access: {
                    __typename?: 'ArticleAccess'
                    type: ArticleAccessType
                    circle?: {
                      __typename?: 'Circle'
                      id: string
                      name: string
                      displayName: string
                    } | null
                  }
                  collections: {
                    __typename?: 'CollectionConnection'
                    edges?: Array<{
                      __typename?: 'CollectionEdge'
                      node: {
                        __typename?: 'Collection'
                        id: string
                        title: string
                        articles: {
                          __typename?: 'ArticleConnection'
                          totalCount: number
                        }
                      }
                    }> | null
                  }
                  campaigns: Array<{
                    __typename?: 'ArticleCampaign'
                    campaign: {
                      __typename?: 'WritingChallenge'
                      id: string
                      name: string
                      shortHash: string
                      nameZhHant: string
                      nameZhHans: string
                      nameEn: string
                    }
                    stage?: { __typename?: 'CampaignStage'; id: string } | null
                  }>
                  tags?: Array<{
                    __typename?: 'Tag'
                    id: string
                    content: string
                  }> | null
                  donations: {
                    __typename?: 'ArticleDonationConnection'
                    totalCount: number
                  }
                  likesReceived: {
                    __typename?: 'AppreciationConnection'
                    totalCount: number
                  }
                  donationsDialog: {
                    __typename?: 'ArticleDonationConnection'
                    totalCount: number
                  }
                }
                targetTag: {
                  __typename?: 'Tag'
                  id: string
                  content: string
                  numArticles: number
                  isFollower?: boolean | null
                }
              }
            | {
                __typename: 'UserBroadcastCircleActivity'
                createdAt: any
                actor: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                }
                nodeComment: {
                  __typename?: 'Comment'
                  id: string
                  createdAt: any
                  content?: string | null
                  state: CommentState
                  communityWatchAction?: {
                    __typename?: 'CommunityWatchAction'
                    uuid: string
                  } | null
                  author: {
                    __typename?: 'User'
                    id: string
                    isBlocked: boolean
                  }
                }
                targetCircle: {
                  __typename?: 'Circle'
                  id: string
                  name: string
                  displayName: string
                  description?: string | null
                  createdAt: any
                  isFollower: boolean
                  avatar?: string | null
                  owner: {
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                    displayName?: string | null
                    avatar?: string | null
                    status?: {
                      __typename?: 'UserStatus'
                      state: UserState
                    } | null
                    liker: { __typename?: 'Liker'; civicLiker: boolean }
                    info: {
                      __typename?: 'UserInfo'
                      badges?: Array<{
                        __typename?: 'Badge'
                        type: BadgeType
                      }> | null
                      cryptoWallet?: {
                        __typename?: 'CryptoWallet'
                        id: string
                        address: string
                        hasNFTs: boolean
                      } | null
                    }
                  }
                }
              }
            | {
                __typename: 'UserCreateCircleActivity'
                createdAt: any
                actor: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                  isFollower: boolean
                  isFollowee: boolean
                }
                nodeCircle: {
                  __typename?: 'Circle'
                  id: string
                  name: string
                  displayName: string
                  description?: string | null
                  createdAt: any
                  avatar?: string | null
                  owner: {
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                    displayName?: string | null
                    avatar?: string | null
                    status?: {
                      __typename?: 'UserStatus'
                      state: UserState
                    } | null
                    liker: { __typename?: 'Liker'; civicLiker: boolean }
                    info: {
                      __typename?: 'UserInfo'
                      badges?: Array<{
                        __typename?: 'Badge'
                        type: BadgeType
                      }> | null
                      cryptoWallet?: {
                        __typename?: 'CryptoWallet'
                        id: string
                        address: string
                        hasNFTs: boolean
                      } | null
                    }
                  }
                }
              }
            | {
                __typename: 'UserPostMomentActivity'
                createdAt: any
                actor: { __typename?: 'User'; id: string }
                nodeMoment: {
                  __typename?: 'Moment'
                  id: string
                  createdAt: any
                  shortHash: string
                  state: MomentState
                  content?: string | null
                  commentCount: number
                  likeCount: number
                  liked: boolean
                  author: {
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                    displayName?: string | null
                    avatar?: string | null
                    status?: {
                      __typename?: 'UserStatus'
                      state: UserState
                    } | null
                    liker: { __typename?: 'Liker'; civicLiker: boolean }
                    info: {
                      __typename?: 'UserInfo'
                      badges?: Array<{
                        __typename?: 'Badge'
                        type: BadgeType
                      }> | null
                      cryptoWallet?: {
                        __typename?: 'CryptoWallet'
                        id: string
                        address: string
                        hasNFTs: boolean
                      } | null
                    }
                  }
                  assets: Array<{
                    __typename?: 'Asset'
                    id: string
                    path: string
                  }>
                  commentedFollowees: Array<{
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                    displayName?: string | null
                    avatar?: string | null
                    status?: {
                      __typename?: 'UserStatus'
                      state: UserState
                    } | null
                    liker: { __typename?: 'Liker'; civicLiker: boolean }
                    info: {
                      __typename?: 'UserInfo'
                      badges?: Array<{
                        __typename?: 'Badge'
                        type: BadgeType
                      }> | null
                      cryptoWallet?: {
                        __typename?: 'CryptoWallet'
                        id: string
                        address: string
                        hasNFTs: boolean
                      } | null
                    }
                  }>
                }
                more: Array<{
                  __typename?: 'Moment'
                  id: string
                  createdAt: any
                  shortHash: string
                  state: MomentState
                  content?: string | null
                  commentCount: number
                  likeCount: number
                  liked: boolean
                  author: {
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                    displayName?: string | null
                    avatar?: string | null
                    status?: {
                      __typename?: 'UserStatus'
                      state: UserState
                    } | null
                    liker: { __typename?: 'Liker'; civicLiker: boolean }
                    info: {
                      __typename?: 'UserInfo'
                      badges?: Array<{
                        __typename?: 'Badge'
                        type: BadgeType
                      }> | null
                      cryptoWallet?: {
                        __typename?: 'CryptoWallet'
                        id: string
                        address: string
                        hasNFTs: boolean
                      } | null
                    }
                  }
                  assets: Array<{
                    __typename?: 'Asset'
                    id: string
                    path: string
                  }>
                  commentedFollowees: Array<{
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                    displayName?: string | null
                    avatar?: string | null
                    status?: {
                      __typename?: 'UserStatus'
                      state: UserState
                    } | null
                    liker: { __typename?: 'Liker'; civicLiker: boolean }
                    info: {
                      __typename?: 'UserInfo'
                      badges?: Array<{
                        __typename?: 'Badge'
                        type: BadgeType
                      }> | null
                      cryptoWallet?: {
                        __typename?: 'CryptoWallet'
                        id: string
                        address: string
                        hasNFTs: boolean
                      } | null
                    }
                  }>
                }>
              }
            | {
                __typename: 'UserPublishArticleActivity'
                createdAt: any
                actor: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                  isFollower: boolean
                  isFollowee: boolean
                }
                nodeArticle: {
                  __typename?: 'Article'
                  id: string
                  title: string
                  slug: string
                  shortHash: string
                  displayCover?: string | null
                  summary: string
                  createdAt: any
                  readTime: number
                  bookmarked: boolean
                  pinned: boolean
                  revisionCount: number
                  articleState: ArticleState
                  access: {
                    __typename?: 'ArticleAccess'
                    type: ArticleAccessType
                    circle?: {
                      __typename?: 'Circle'
                      id: string
                      name: string
                      displayName: string
                    } | null
                  }
                  author: {
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                    displayName?: string | null
                    avatar?: string | null
                    status?: {
                      __typename?: 'UserStatus'
                      state: UserState
                    } | null
                    liker: { __typename?: 'Liker'; civicLiker: boolean }
                    info: {
                      __typename?: 'UserInfo'
                      badges?: Array<{
                        __typename?: 'Badge'
                        type: BadgeType
                      }> | null
                      cryptoWallet?: {
                        __typename?: 'CryptoWallet'
                        id: string
                        address: string
                        hasNFTs: boolean
                      } | null
                    }
                  }
                  collections: {
                    __typename?: 'CollectionConnection'
                    edges?: Array<{
                      __typename?: 'CollectionEdge'
                      node: {
                        __typename?: 'Collection'
                        id: string
                        title: string
                        articles: {
                          __typename?: 'ArticleConnection'
                          totalCount: number
                        }
                      }
                    }> | null
                  }
                  campaigns: Array<{
                    __typename?: 'ArticleCampaign'
                    campaign: {
                      __typename?: 'WritingChallenge'
                      id: string
                      name: string
                      shortHash: string
                      nameZhHant: string
                      nameZhHans: string
                      nameEn: string
                    }
                    stage?: { __typename?: 'CampaignStage'; id: string } | null
                  }>
                  tags?: Array<{
                    __typename?: 'Tag'
                    id: string
                    content: string
                  }> | null
                  donations: {
                    __typename?: 'ArticleDonationConnection'
                    totalCount: number
                  }
                  likesReceived: {
                    __typename?: 'AppreciationConnection'
                    totalCount: number
                  }
                  donationsDialog: {
                    __typename?: 'ArticleDonationConnection'
                    totalCount: number
                  }
                }
              }
            | {
                __typename: 'UserRecommendationActivity'
                recommendUsers?: Array<{
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                  avatar?: string | null
                  isFollower: boolean
                  isFollowee: boolean
                  info: {
                    __typename?: 'UserInfo'
                    description?: string | null
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                  }
                  status?: {
                    __typename?: 'UserStatus'
                    state: UserState
                  } | null
                  liker: { __typename?: 'Liker'; civicLiker: boolean }
                }> | null
              }
        }> | null
      }
    }
  } | null
}

export type ReadFollowingFeedMutationVariables = Exact<{ [key: string]: never }>

export type ReadFollowingFeedMutation = {
  __typename?: 'Mutation'
  logRecord?: boolean | null
}

export type MeFollowQueryVariables = Exact<{ [key: string]: never }>

export type MeFollowQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    following: {
      __typename?: 'Following'
      users: { __typename?: 'UserConnection'; totalCount: number }
    }
  } | null
}

export type CuratedFooterActionsArticleFragment = {
  __typename?: 'Article'
  id: string
  shortHash: string
  title: string
  pinned: boolean
  slug: string
  revisionCount: number
  articleState: ArticleState
  author: {
    __typename?: 'User'
    id: string
    displayName?: string | null
    userName?: string | null
  }
  tags?: Array<{ __typename?: 'Tag'; id: string; content: string }> | null
  likesReceived: { __typename?: 'AppreciationConnection'; totalCount: number }
  donationsDialog: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
  }
}

export type ArticleDigestCuratedArticleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  shortHash: string
  displayCover?: string | null
  pinned: boolean
  revisionCount: number
  articleState: ArticleState
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  campaigns: Array<{
    __typename?: 'ArticleCampaign'
    campaign: {
      __typename?: 'WritingChallenge'
      name: string
      id: string
      nameZhHant: string
      nameZhHans: string
      nameEn: string
    }
  }>
  tags?: Array<{ __typename?: 'Tag'; id: string; content: string }> | null
  likesReceived: { __typename?: 'AppreciationConnection'; totalCount: number }
  donationsDialog: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
  }
}

export type TopicChannelHeaderFragment = {
  __typename?: 'TopicChannel'
  id: string
  nameZhHant: string
  nameZhHans: string
  nameEn: string
  noteZhHant?: string | null
  noteZhHans?: string | null
  noteEn?: string | null
}

export type CurationChannelHeaderFragment = {
  __typename?: 'CurationChannel'
  id: string
  nameZhHant: string
  nameZhHans: string
  nameEn: string
  noteZhHant?: string | null
  noteZhHans?: string | null
  noteEn?: string | null
}

export type IcymiCuratedFeedRecommendationFragment = {
  __typename?: 'Recommendation'
  icymiTopic?: {
    __typename?: 'IcymiTopic'
    id: string
    pinAmount: number
    noteEn?: string | null
    noteZhHant?: string | null
    noteZhHans?: string | null
    articles: Array<{
      __typename?: 'Article'
      id: string
      title: string
      slug: string
      shortHash: string
      displayCover?: string | null
      summary: string
      createdAt: any
      readTime: number
      bookmarked: boolean
      pinned: boolean
      revisionCount: number
      articleState: ArticleState
      author: {
        __typename?: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        avatar?: string | null
        status?: { __typename?: 'UserStatus'; state: UserState } | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          cryptoWallet?: {
            __typename?: 'CryptoWallet'
            id: string
            address: string
            hasNFTs: boolean
          } | null
        }
      }
      campaigns: Array<{
        __typename?: 'ArticleCampaign'
        campaign: {
          __typename?: 'WritingChallenge'
          id: string
          name: string
          shortHash: string
          nameZhHant: string
          nameZhHans: string
          nameEn: string
        }
        stage?: { __typename?: 'CampaignStage'; id: string } | null
      }>
      access: {
        __typename?: 'ArticleAccess'
        type: ArticleAccessType
        circle?: {
          __typename?: 'Circle'
          id: string
          name: string
          displayName: string
        } | null
      }
      collections: {
        __typename?: 'CollectionConnection'
        edges?: Array<{
          __typename?: 'CollectionEdge'
          node: {
            __typename?: 'Collection'
            id: string
            title: string
            articles: { __typename?: 'ArticleConnection'; totalCount: number }
          }
        }> | null
      }
      tags?: Array<{ __typename?: 'Tag'; content: string; id: string }> | null
      donations: {
        __typename?: 'ArticleDonationConnection'
        totalCount: number
      }
      likesReceived: {
        __typename?: 'AppreciationConnection'
        totalCount: number
      }
      donationsDialog: {
        __typename?: 'ArticleDonationConnection'
        totalCount: number
      }
    }>
  } | null
}

export type ArticleNodeFragmentFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  shortHash: string
  displayCover?: string | null
  summary: string
  createdAt: any
  readTime: number
  bookmarked: boolean
  pinned: boolean
  revisionCount: number
  articleState: ArticleState
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  campaigns: Array<{
    __typename?: 'ArticleCampaign'
    campaign: {
      __typename?: 'WritingChallenge'
      id: string
      name: string
      shortHash: string
      nameZhHant: string
      nameZhHans: string
      nameEn: string
    }
    stage?: { __typename?: 'CampaignStage'; id: string } | null
  }>
  access: {
    __typename?: 'ArticleAccess'
    type: ArticleAccessType
    circle?: {
      __typename?: 'Circle'
      id: string
      name: string
      displayName: string
    } | null
  }
  collections: {
    __typename?: 'CollectionConnection'
    edges?: Array<{
      __typename?: 'CollectionEdge'
      node: {
        __typename?: 'Collection'
        id: string
        title: string
        articles: { __typename?: 'ArticleConnection'; totalCount: number }
      }
    }> | null
  }
  tags?: Array<{ __typename?: 'Tag'; content: string; id: string }> | null
  donations: { __typename?: 'ArticleDonationConnection'; totalCount: number }
  likesReceived: { __typename?: 'AppreciationConnection'; totalCount: number }
  donationsDialog: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
  }
}

export type FeedArticleConnectionFragment = {
  __typename?: 'ArticleConnection'
  pageInfo: {
    __typename?: 'PageInfo'
    startCursor?: string | null
    endCursor?: string | null
    hasNextPage: boolean
  }
  edges?: Array<{
    __typename?: 'ArticleEdge'
    cursor: string
    node: {
      __typename?: 'Article'
      id: string
      title: string
      slug: string
      shortHash: string
      displayCover?: string | null
      summary: string
      createdAt: any
      readTime: number
      bookmarked: boolean
      pinned: boolean
      revisionCount: number
      articleState: ArticleState
      author: {
        __typename?: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        avatar?: string | null
        status?: { __typename?: 'UserStatus'; state: UserState } | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          cryptoWallet?: {
            __typename?: 'CryptoWallet'
            id: string
            address: string
            hasNFTs: boolean
          } | null
        }
      }
      campaigns: Array<{
        __typename?: 'ArticleCampaign'
        campaign: {
          __typename?: 'WritingChallenge'
          id: string
          name: string
          shortHash: string
          nameZhHant: string
          nameZhHans: string
          nameEn: string
        }
        stage?: { __typename?: 'CampaignStage'; id: string } | null
      }>
      access: {
        __typename?: 'ArticleAccess'
        type: ArticleAccessType
        circle?: {
          __typename?: 'Circle'
          id: string
          name: string
          displayName: string
        } | null
      }
      collections: {
        __typename?: 'CollectionConnection'
        edges?: Array<{
          __typename?: 'CollectionEdge'
          node: {
            __typename?: 'Collection'
            id: string
            title: string
            articles: { __typename?: 'ArticleConnection'; totalCount: number }
          }
        }> | null
      }
      tags?: Array<{ __typename?: 'Tag'; content: string; id: string }> | null
      donations: {
        __typename?: 'ArticleDonationConnection'
        totalCount: number
      }
      likesReceived: {
        __typename?: 'AppreciationConnection'
        totalCount: number
      }
      donationsDialog: {
        __typename?: 'ArticleDonationConnection'
        totalCount: number
      }
    }
  }> | null
}

export type ChannelArticleConnectionFragmentFragment = {
  __typename?: 'ChannelArticleConnection'
  pageInfo: {
    __typename?: 'PageInfo'
    startCursor?: string | null
    endCursor?: string | null
    hasNextPage: boolean
  }
  edges?: Array<{
    __typename?: 'ChannelArticleEdge'
    cursor: string
    pinned: boolean
    node: {
      __typename?: 'Article'
      id: string
      title: string
      slug: string
      shortHash: string
      displayCover?: string | null
      summary: string
      createdAt: any
      readTime: number
      bookmarked: boolean
      pinned: boolean
      revisionCount: number
      articleState: ArticleState
      author: {
        __typename?: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        avatar?: string | null
        status?: { __typename?: 'UserStatus'; state: UserState } | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          cryptoWallet?: {
            __typename?: 'CryptoWallet'
            id: string
            address: string
            hasNFTs: boolean
          } | null
        }
      }
      campaigns: Array<{
        __typename?: 'ArticleCampaign'
        campaign: {
          __typename?: 'WritingChallenge'
          id: string
          name: string
          shortHash: string
          nameZhHant: string
          nameZhHans: string
          nameEn: string
        }
        stage?: { __typename?: 'CampaignStage'; id: string } | null
      }>
      access: {
        __typename?: 'ArticleAccess'
        type: ArticleAccessType
        circle?: {
          __typename?: 'Circle'
          id: string
          name: string
          displayName: string
        } | null
      }
      collections: {
        __typename?: 'CollectionConnection'
        edges?: Array<{
          __typename?: 'CollectionEdge'
          node: {
            __typename?: 'Collection'
            id: string
            title: string
            articles: { __typename?: 'ArticleConnection'; totalCount: number }
          }
        }> | null
      }
      tags?: Array<{ __typename?: 'Tag'; content: string; id: string }> | null
      donations: {
        __typename?: 'ArticleDonationConnection'
        totalCount: number
      }
      likesReceived: {
        __typename?: 'AppreciationConnection'
        totalCount: number
      }
      donationsDialog: {
        __typename?: 'ArticleDonationConnection'
        totalCount: number
      }
    }
  }> | null
}

export type NewestFeedPublicQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type NewestFeedPublicQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    recommendation: {
      __typename?: 'Recommendation'
      feed: {
        __typename?: 'ArticleConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'ArticleEdge'
          cursor: string
          node: {
            __typename?: 'Article'
            id: string
            title: string
            slug: string
            shortHash: string
            displayCover?: string | null
            summary: string
            createdAt: any
            readTime: number
            bookmarked: boolean
            pinned: boolean
            revisionCount: number
            articleState: ArticleState
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
            campaigns: Array<{
              __typename?: 'ArticleCampaign'
              campaign: {
                __typename?: 'WritingChallenge'
                id: string
                name: string
                shortHash: string
                nameZhHant: string
                nameZhHans: string
                nameEn: string
              }
              stage?: { __typename?: 'CampaignStage'; id: string } | null
            }>
            access: {
              __typename?: 'ArticleAccess'
              type: ArticleAccessType
              circle?: {
                __typename?: 'Circle'
                id: string
                name: string
                displayName: string
              } | null
            }
            collections: {
              __typename?: 'CollectionConnection'
              edges?: Array<{
                __typename?: 'CollectionEdge'
                node: {
                  __typename?: 'Collection'
                  id: string
                  title: string
                  articles: {
                    __typename?: 'ArticleConnection'
                    totalCount: number
                  }
                }
              }> | null
            }
            tags?: Array<{
              __typename?: 'Tag'
              content: string
              id: string
            }> | null
            donations: {
              __typename?: 'ArticleDonationConnection'
              totalCount: number
            }
            likesReceived: {
              __typename?: 'AppreciationConnection'
              totalCount: number
            }
            donationsDialog: {
              __typename?: 'ArticleDonationConnection'
              totalCount: number
            }
          }
        }> | null
      }
    }
  } | null
}

export type IcymiFeedPublicQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type IcymiFeedPublicQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    recommendation: {
      __typename?: 'Recommendation'
      feed: {
        __typename?: 'ArticleConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'ArticleEdge'
          cursor: string
          node: {
            __typename?: 'Article'
            id: string
            title: string
            slug: string
            shortHash: string
            displayCover?: string | null
            summary: string
            createdAt: any
            readTime: number
            bookmarked: boolean
            pinned: boolean
            revisionCount: number
            articleState: ArticleState
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
            campaigns: Array<{
              __typename?: 'ArticleCampaign'
              campaign: {
                __typename?: 'WritingChallenge'
                id: string
                name: string
                shortHash: string
                nameZhHant: string
                nameZhHans: string
                nameEn: string
              }
              stage?: { __typename?: 'CampaignStage'; id: string } | null
            }>
            access: {
              __typename?: 'ArticleAccess'
              type: ArticleAccessType
              circle?: {
                __typename?: 'Circle'
                id: string
                name: string
                displayName: string
              } | null
            }
            collections: {
              __typename?: 'CollectionConnection'
              edges?: Array<{
                __typename?: 'CollectionEdge'
                node: {
                  __typename?: 'Collection'
                  id: string
                  title: string
                  articles: {
                    __typename?: 'ArticleConnection'
                    totalCount: number
                  }
                }
              }> | null
            }
            tags?: Array<{
              __typename?: 'Tag'
              content: string
              id: string
            }> | null
            donations: {
              __typename?: 'ArticleDonationConnection'
              totalCount: number
            }
            likesReceived: {
              __typename?: 'AppreciationConnection'
              totalCount: number
            }
            donationsDialog: {
              __typename?: 'ArticleDonationConnection'
              totalCount: number
            }
          }
        }> | null
      }
      icymiTopic?: {
        __typename?: 'IcymiTopic'
        id: string
        pinAmount: number
        noteEn?: string | null
        noteZhHant?: string | null
        noteZhHans?: string | null
        articles: Array<{
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          displayCover?: string | null
          summary: string
          createdAt: any
          readTime: number
          bookmarked: boolean
          pinned: boolean
          revisionCount: number
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
          campaigns: Array<{
            __typename?: 'ArticleCampaign'
            campaign: {
              __typename?: 'WritingChallenge'
              id: string
              name: string
              shortHash: string
              nameZhHant: string
              nameZhHans: string
              nameEn: string
            }
            stage?: { __typename?: 'CampaignStage'; id: string } | null
          }>
          access: {
            __typename?: 'ArticleAccess'
            type: ArticleAccessType
            circle?: {
              __typename?: 'Circle'
              id: string
              name: string
              displayName: string
            } | null
          }
          collections: {
            __typename?: 'CollectionConnection'
            edges?: Array<{
              __typename?: 'CollectionEdge'
              node: {
                __typename?: 'Collection'
                id: string
                title: string
                articles: {
                  __typename?: 'ArticleConnection'
                  totalCount: number
                }
              }
            }> | null
          }
          tags?: Array<{
            __typename?: 'Tag'
            content: string
            id: string
          }> | null
          donations: {
            __typename?: 'ArticleDonationConnection'
            totalCount: number
          }
          likesReceived: {
            __typename?: 'AppreciationConnection'
            totalCount: number
          }
          donationsDialog: {
            __typename?: 'ArticleDonationConnection'
            totalCount: number
          }
        }>
      } | null
    }
  } | null
}

export type HottestFeedPublicQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type HottestFeedPublicQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    recommendation: {
      __typename?: 'Recommendation'
      feed: {
        __typename?: 'ArticleConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'ArticleEdge'
          cursor: string
          node: {
            __typename?: 'Article'
            id: string
            title: string
            slug: string
            shortHash: string
            displayCover?: string | null
            summary: string
            createdAt: any
            readTime: number
            bookmarked: boolean
            pinned: boolean
            revisionCount: number
            articleState: ArticleState
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
            campaigns: Array<{
              __typename?: 'ArticleCampaign'
              campaign: {
                __typename?: 'WritingChallenge'
                id: string
                name: string
                shortHash: string
                nameZhHant: string
                nameZhHans: string
                nameEn: string
              }
              stage?: { __typename?: 'CampaignStage'; id: string } | null
            }>
            access: {
              __typename?: 'ArticleAccess'
              type: ArticleAccessType
              circle?: {
                __typename?: 'Circle'
                id: string
                name: string
                displayName: string
              } | null
            }
            collections: {
              __typename?: 'CollectionConnection'
              edges?: Array<{
                __typename?: 'CollectionEdge'
                node: {
                  __typename?: 'Collection'
                  id: string
                  title: string
                  articles: {
                    __typename?: 'ArticleConnection'
                    totalCount: number
                  }
                }
              }> | null
            }
            tags?: Array<{
              __typename?: 'Tag'
              content: string
              id: string
            }> | null
            donations: {
              __typename?: 'ArticleDonationConnection'
              totalCount: number
            }
            likesReceived: {
              __typename?: 'AppreciationConnection'
              totalCount: number
            }
            donationsDialog: {
              __typename?: 'ArticleDonationConnection'
              totalCount: number
            }
          }
        }> | null
      }
    }
  } | null
}

export type FeedArticlesPublicChannelQueryVariables = Exact<{
  shortHash: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type FeedArticlesPublicChannelQuery = {
  __typename?: 'Query'
  channel?:
    | {
        __typename?: 'CurationChannel'
        id: string
        nameZhHant: string
        nameZhHans: string
        nameEn: string
        noteZhHant?: string | null
        noteZhHans?: string | null
        noteEn?: string | null
        articles: {
          __typename?: 'ChannelArticleConnection'
          pageInfo: {
            __typename?: 'PageInfo'
            startCursor?: string | null
            endCursor?: string | null
            hasNextPage: boolean
          }
          edges?: Array<{
            __typename?: 'ChannelArticleEdge'
            cursor: string
            pinned: boolean
            node: {
              __typename?: 'Article'
              id: string
              title: string
              slug: string
              shortHash: string
              displayCover?: string | null
              summary: string
              createdAt: any
              readTime: number
              bookmarked: boolean
              pinned: boolean
              revisionCount: number
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
              campaigns: Array<{
                __typename?: 'ArticleCampaign'
                campaign: {
                  __typename?: 'WritingChallenge'
                  id: string
                  name: string
                  shortHash: string
                  nameZhHant: string
                  nameZhHans: string
                  nameEn: string
                }
                stage?: { __typename?: 'CampaignStage'; id: string } | null
              }>
              access: {
                __typename?: 'ArticleAccess'
                type: ArticleAccessType
                circle?: {
                  __typename?: 'Circle'
                  id: string
                  name: string
                  displayName: string
                } | null
              }
              collections: {
                __typename?: 'CollectionConnection'
                edges?: Array<{
                  __typename?: 'CollectionEdge'
                  node: {
                    __typename?: 'Collection'
                    id: string
                    title: string
                    articles: {
                      __typename?: 'ArticleConnection'
                      totalCount: number
                    }
                  }
                }> | null
              }
              tags?: Array<{
                __typename?: 'Tag'
                content: string
                id: string
              }> | null
              donations: {
                __typename?: 'ArticleDonationConnection'
                totalCount: number
              }
              likesReceived: {
                __typename?: 'AppreciationConnection'
                totalCount: number
              }
              donationsDialog: {
                __typename?: 'ArticleDonationConnection'
                totalCount: number
              }
            }
          }> | null
        }
      }
    | { __typename?: 'Tag'; id: string }
    | {
        __typename?: 'TopicChannel'
        id: string
        nameZhHant: string
        nameZhHans: string
        nameEn: string
        noteZhHant?: string | null
        noteZhHans?: string | null
        noteEn?: string | null
        articles: {
          __typename?: 'ChannelArticleConnection'
          pageInfo: {
            __typename?: 'PageInfo'
            startCursor?: string | null
            endCursor?: string | null
            hasNextPage: boolean
          }
          edges?: Array<{
            __typename?: 'ChannelArticleEdge'
            cursor: string
            pinned: boolean
            node: {
              __typename?: 'Article'
              id: string
              title: string
              slug: string
              shortHash: string
              displayCover?: string | null
              summary: string
              createdAt: any
              readTime: number
              bookmarked: boolean
              pinned: boolean
              revisionCount: number
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
              campaigns: Array<{
                __typename?: 'ArticleCampaign'
                campaign: {
                  __typename?: 'WritingChallenge'
                  id: string
                  name: string
                  shortHash: string
                  nameZhHant: string
                  nameZhHans: string
                  nameEn: string
                }
                stage?: { __typename?: 'CampaignStage'; id: string } | null
              }>
              access: {
                __typename?: 'ArticleAccess'
                type: ArticleAccessType
                circle?: {
                  __typename?: 'Circle'
                  id: string
                  name: string
                  displayName: string
                } | null
              }
              collections: {
                __typename?: 'CollectionConnection'
                edges?: Array<{
                  __typename?: 'CollectionEdge'
                  node: {
                    __typename?: 'Collection'
                    id: string
                    title: string
                    articles: {
                      __typename?: 'ArticleConnection'
                      totalCount: number
                    }
                  }
                }> | null
              }
              tags?: Array<{
                __typename?: 'Tag'
                content: string
                id: string
              }> | null
              donations: {
                __typename?: 'ArticleDonationConnection'
                totalCount: number
              }
              likesReceived: {
                __typename?: 'AppreciationConnection'
                totalCount: number
              }
              donationsDialog: {
                __typename?: 'ArticleDonationConnection'
                totalCount: number
              }
            }
          }> | null
        }
      }
    | { __typename?: 'WritingChallenge'; id: string }
    | null
}

export type FeedArticlesPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type FeedArticlesPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string; bookmarked: boolean }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
  > | null
}

export type AuthorsRecommendationPublicQueryVariables = Exact<{
  random?: InputMaybe<Scalars['random_Int_min_0_max_49']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  shortHash?: InputMaybe<Scalars['String']['input']>
}>

export type AuthorsRecommendationPublicQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    recommendation: {
      __typename?: 'Recommendation'
      authors: {
        __typename?: 'UserConnection'
        totalCount: number
        edges?: Array<{
          __typename?: 'UserEdge'
          cursor: string
          node: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            isFollower: boolean
            isFollowee: boolean
            info: {
              __typename?: 'UserInfo'
              description?: string | null
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
          }
        }> | null
      }
    }
  } | null
}

export type TagsRecommendationPublicQueryVariables = Exact<{
  random?: InputMaybe<Scalars['random_Int_min_0_max_49']['input']>
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  shortHash?: InputMaybe<Scalars['String']['input']>
}>

export type TagsRecommendationPublicQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    recommendation: {
      __typename?: 'Recommendation'
      tags: {
        __typename?: 'TagConnection'
        totalCount: number
        edges?: Array<{
          __typename?: 'TagEdge'
          cursor: string
          node: {
            __typename?: 'Tag'
            id: string
            content: string
            numArticles: number
          }
        }> | null
      }
    }
  } | null
}

export type MeAnalyticsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<TopDonatorFilter>
}>

export type MeAnalyticsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    articles: { __typename?: 'ArticleConnection'; totalCount: number }
    analytics: {
      __typename?: 'UserAnalytics'
      topDonators: {
        __typename?: 'TopDonatorConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'TopDonatorEdge'
          cursor: string
          donationCount: number
          node:
            | { __typename?: 'CryptoWallet'; id: string; address: string }
            | {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
        }> | null
      }
    }
  } | null
}

export type MeBookmarkArticlesFeedQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type MeBookmarkArticlesFeedQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    bookmarkedArticles: {
      __typename?: 'ArticleConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'ArticleEdge'
        cursor: string
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          displayCover?: string | null
          summary: string
          createdAt: any
          readTime: number
          bookmarked: boolean
          pinned: boolean
          revisionCount: number
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
          access: {
            __typename?: 'ArticleAccess'
            type: ArticleAccessType
            circle?: {
              __typename?: 'Circle'
              id: string
              name: string
              displayName: string
            } | null
          }
          collections: {
            __typename?: 'CollectionConnection'
            edges?: Array<{
              __typename?: 'CollectionEdge'
              node: {
                __typename?: 'Collection'
                id: string
                title: string
                articles: {
                  __typename?: 'ArticleConnection'
                  totalCount: number
                }
              }
            }> | null
          }
          campaigns: Array<{
            __typename?: 'ArticleCampaign'
            campaign: {
              __typename?: 'WritingChallenge'
              id: string
              name: string
              shortHash: string
              nameZhHant: string
              nameZhHans: string
              nameEn: string
            }
            stage?: { __typename?: 'CampaignStage'; id: string } | null
          }>
          tags?: Array<{
            __typename?: 'Tag'
            id: string
            content: string
          }> | null
          donations: {
            __typename?: 'ArticleDonationConnection'
            totalCount: number
          }
          likesReceived: {
            __typename?: 'AppreciationConnection'
            totalCount: number
          }
          donationsDialog: {
            __typename?: 'ArticleDonationConnection'
            totalCount: number
          }
        }
      }> | null
    }
  } | null
}

export type MeBookmarkTagsFeedQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type MeBookmarkTagsFeedQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    bookmarkedTags: {
      __typename?: 'TagConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'TagEdge'
        cursor: string
        node: {
          __typename?: 'Tag'
          id: string
          content: string
          isFollower?: boolean | null
        }
      }> | null
    }
  } | null
}

export type RetryPublishMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type RetryPublishMutation = {
  __typename?: 'Mutation'
  retryPublish: { __typename?: 'Draft'; id: string; publishState: PublishState }
}

export type EditMetaDraftFragment = {
  __typename?: 'Draft'
  id: string
  publishState: PublishState
  createdAt: any
  updatedAt: any
  cover?: string | null
  tags?: Array<string> | null
  license: ArticleLicenseType
  requestForDonation?: string | null
  replyToDonator?: string | null
  sensitiveByAuthor: boolean
  iscnPublish?: boolean | null
  canComment: boolean
  indentFirstLine: boolean
  assets: Array<{
    __typename?: 'Asset'
    id: string
    type: AssetType
    path: string
    draft?: boolean | null
    uploadURL?: string | null
  }>
  collections: {
    __typename?: 'CollectionConnection'
    edges?: Array<{
      __typename?: 'CollectionEdge'
      node: {
        __typename?: 'Collection'
        id: string
        title: string
        articles: { __typename?: 'ArticleConnection'; totalCount: number }
      }
    }> | null
  }
  connections: {
    __typename?: 'ArticleConnection'
    edges?: Array<{
      __typename?: 'ArticleEdge'
      node: {
        __typename?: 'Article'
        id: string
        title: string
        slug: string
        shortHash: string
        state: ArticleState
        articleState: ArticleState
        author: {
          __typename?: 'User'
          id: string
          userName?: string | null
          isBlocking: boolean
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
      }
    }> | null
  }
  access: {
    __typename?: 'DraftAccess'
    type: ArticleAccessType
    circle?: {
      __typename?: 'Circle'
      id: string
      name: string
      displayName: string
      description?: string | null
      avatar?: string | null
      owner: {
        __typename?: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        avatar?: string | null
        status?: { __typename?: 'UserStatus'; state: UserState } | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          cryptoWallet?: {
            __typename?: 'CryptoWallet'
            id: string
            address: string
            hasNFTs: boolean
          } | null
        }
      }
      members: { __typename?: 'MemberConnection'; totalCount: number }
      works: { __typename?: 'ArticleConnection'; totalCount: number }
      prices?: Array<{
        __typename?: 'Price'
        amount: number
        currency: TransactionCurrency
      }> | null
    } | null
  }
  campaigns: Array<{
    __typename?: 'ArticleCampaign'
    campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
    stage?: { __typename?: 'CampaignStage'; id: string } | null
  }>
}

export type DraftDetailViewerQueryQueryVariables = Exact<{
  collectionsAfter?: InputMaybe<Scalars['String']['input']>
}>

export type DraftDetailViewerQueryQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    displayName?: string | null
    avatar?: string | null
    campaigns: {
      __typename?: 'CampaignConnection'
      edges?: Array<{
        __typename?: 'CampaignEdge'
        node: {
          __typename?: 'WritingChallenge'
          id: string
          state: CampaignState
          name: string
          writingPeriod?: {
            __typename?: 'DatetimeRange'
            start: any
            end?: any | null
          } | null
          stages: Array<{
            __typename?: 'CampaignStage'
            id: string
            name: string
            period?: {
              __typename?: 'DatetimeRange'
              start: any
              end?: any | null
            } | null
          }>
        }
      }> | null
    }
    ownCircles?: Array<{
      __typename?: 'Circle'
      id: string
      name: string
      displayName: string
      description?: string | null
      avatar?: string | null
      owner: {
        __typename?: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        avatar?: string | null
        status?: { __typename?: 'UserStatus'; state: UserState } | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          cryptoWallet?: {
            __typename?: 'CryptoWallet'
            id: string
            address: string
            hasNFTs: boolean
          } | null
        }
      }
      members: { __typename?: 'MemberConnection'; totalCount: number }
      works: { __typename?: 'ArticleConnection'; totalCount: number }
      prices?: Array<{
        __typename?: 'Price'
        amount: number
        currency: TransactionCurrency
      }> | null
    }> | null
    oss: {
      __typename?: 'UserOSS'
      featureFlags: Array<{
        __typename?: 'UserFeatureFlag'
        type: UserFeatureFlagType
      }>
    }
    collections: {
      __typename?: 'CollectionConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        hasNextPage: boolean
        endCursor?: string | null
      }
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
  } | null
}

export type DraftDetailQueryQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DraftDetailQueryQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | {
        __typename?: 'Draft'
        id: string
        title?: string | null
        publishState: PublishState
        content?: string | null
        summary?: string | null
        summaryCustomized: boolean
        indentFirstLine: boolean
        createdAt: any
        updatedAt: any
        cover?: string | null
        tags?: Array<string> | null
        license: ArticleLicenseType
        requestForDonation?: string | null
        replyToDonator?: string | null
        sensitiveByAuthor: boolean
        iscnPublish?: boolean | null
        canComment: boolean
        campaigns: Array<{
          __typename?: 'ArticleCampaign'
          campaign: {
            __typename?: 'WritingChallenge'
            id: string
            name: string
          }
          stage?: { __typename?: 'CampaignStage'; id: string } | null
        }>
        access: {
          __typename?: 'DraftAccess'
          type: ArticleAccessType
          circle?: {
            __typename?: 'Circle'
            id: string
            name: string
            displayName: string
            description?: string | null
            avatar?: string | null
            owner: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
            members: { __typename?: 'MemberConnection'; totalCount: number }
            works: { __typename?: 'ArticleConnection'; totalCount: number }
            prices?: Array<{
              __typename?: 'Price'
              amount: number
              currency: TransactionCurrency
            }> | null
          } | null
        }
        article?: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
          }
          tags?: Array<{
            __typename?: 'Tag'
            id: string
            content: string
          }> | null
        } | null
        assets: Array<{
          __typename?: 'Asset'
          id: string
          type: AssetType
          path: string
          draft?: boolean | null
          uploadURL?: string | null
        }>
        collections: {
          __typename?: 'CollectionConnection'
          edges?: Array<{
            __typename?: 'CollectionEdge'
            node: {
              __typename?: 'Collection'
              id: string
              title: string
              articles: { __typename?: 'ArticleConnection'; totalCount: number }
            }
          }> | null
        }
        connections: {
          __typename?: 'ArticleConnection'
          edges?: Array<{
            __typename?: 'ArticleEdge'
            node: {
              __typename?: 'Article'
              id: string
              title: string
              slug: string
              shortHash: string
              state: ArticleState
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                isBlocking: boolean
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
            }
          }> | null
        }
      }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
    | null
}

export type DraftAssetsQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DraftAssetsQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | {
        __typename?: 'Draft'
        id: string
        assets: Array<{
          __typename?: 'Asset'
          id: string
          type: AssetType
          path: string
          draft?: boolean | null
          uploadURL?: string | null
        }>
      }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
    | null
}

export type SetDraftContentMutationVariables = Exact<{
  id: Scalars['ID']['input']
  title?: InputMaybe<Scalars['String']['input']>
  content?: InputMaybe<Scalars['String']['input']>
  summary?: InputMaybe<Scalars['String']['input']>
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>
}>

export type SetDraftContentMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    title?: string | null
    content?: string | null
    cover?: string | null
    updatedAt: any
    summary?: string | null
    summaryCustomized: boolean
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
      draft?: boolean | null
      uploadURL?: string | null
    }>
  }
}

export type SetDraftConnectionsMutationVariables = Exact<{
  id: Scalars['ID']['input']
  connections?: InputMaybe<
    Array<Scalars['ID']['input']> | Scalars['ID']['input']
  >
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>
}>

export type SetDraftConnectionsMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    createdAt: any
    updatedAt: any
    cover?: string | null
    tags?: Array<string> | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    sensitiveByAuthor: boolean
    iscnPublish?: boolean | null
    canComment: boolean
    indentFirstLine: boolean
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
      draft?: boolean | null
      uploadURL?: string | null
    }>
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    connections: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
    access: {
      __typename?: 'DraftAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
      } | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
  }
}

export type SetDraftCollectionsMutationVariables = Exact<{
  id: Scalars['ID']['input']
  collections?: InputMaybe<
    Array<Scalars['ID']['input']> | Scalars['ID']['input']
  >
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>
}>

export type SetDraftCollectionsMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    createdAt: any
    updatedAt: any
    cover?: string | null
    tags?: Array<string> | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    sensitiveByAuthor: boolean
    iscnPublish?: boolean | null
    canComment: boolean
    indentFirstLine: boolean
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
      draft?: boolean | null
      uploadURL?: string | null
    }>
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    connections: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
    access: {
      __typename?: 'DraftAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
      } | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
  }
}

export type SetDraftCoverMutationVariables = Exact<{
  id: Scalars['ID']['input']
  cover?: InputMaybe<Scalars['ID']['input']>
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>
}>

export type SetDraftCoverMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    createdAt: any
    updatedAt: any
    cover?: string | null
    tags?: Array<string> | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    sensitiveByAuthor: boolean
    iscnPublish?: boolean | null
    canComment: boolean
    indentFirstLine: boolean
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
      draft?: boolean | null
      uploadURL?: string | null
    }>
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    connections: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
    access: {
      __typename?: 'DraftAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
      } | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
  }
}

export type SetDraftTagsMutationVariables = Exact<{
  id: Scalars['ID']['input']
  tags: Array<Scalars['String']['input']> | Scalars['String']['input']
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>
}>

export type SetDraftTagsMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    createdAt: any
    updatedAt: any
    cover?: string | null
    tags?: Array<string> | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    sensitiveByAuthor: boolean
    iscnPublish?: boolean | null
    canComment: boolean
    indentFirstLine: boolean
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
      draft?: boolean | null
      uploadURL?: string | null
    }>
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    connections: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
    access: {
      __typename?: 'DraftAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
      } | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
  }
}

export type SetSupportRequestReplyMutationVariables = Exact<{
  id: Scalars['ID']['input']
  requestForDonation?: InputMaybe<
    Scalars['requestForDonation_String_maxLength_140']['input']
  >
  replyToDonator?: InputMaybe<
    Scalars['replyToDonator_String_maxLength_140']['input']
  >
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>
}>

export type SetSupportRequestReplyMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    createdAt: any
    updatedAt: any
    cover?: string | null
    tags?: Array<string> | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    sensitiveByAuthor: boolean
    iscnPublish?: boolean | null
    canComment: boolean
    indentFirstLine: boolean
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
      draft?: boolean | null
      uploadURL?: string | null
    }>
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    connections: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
    access: {
      __typename?: 'DraftAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
      } | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
  }
}

export type SetDraftSensitiveByAuthorMutationVariables = Exact<{
  id: Scalars['ID']['input']
  sensitiveByAuthor?: InputMaybe<Scalars['Boolean']['input']>
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>
}>

export type SetDraftSensitiveByAuthorMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    createdAt: any
    updatedAt: any
    cover?: string | null
    tags?: Array<string> | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    sensitiveByAuthor: boolean
    iscnPublish?: boolean | null
    canComment: boolean
    indentFirstLine: boolean
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
      draft?: boolean | null
      uploadURL?: string | null
    }>
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    connections: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
    access: {
      __typename?: 'DraftAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
      } | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
  }
}

export type SetDraftPublishIscnMutationVariables = Exact<{
  id: Scalars['ID']['input']
  iscnPublish?: InputMaybe<Scalars['Boolean']['input']>
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>
}>

export type SetDraftPublishIscnMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    createdAt: any
    updatedAt: any
    cover?: string | null
    tags?: Array<string> | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    sensitiveByAuthor: boolean
    iscnPublish?: boolean | null
    canComment: boolean
    indentFirstLine: boolean
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
      draft?: boolean | null
      uploadURL?: string | null
    }>
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    connections: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
    access: {
      __typename?: 'DraftAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
      } | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
  }
}

export type SetDraftCanCommentMutationVariables = Exact<{
  id: Scalars['ID']['input']
  canComment?: InputMaybe<Scalars['Boolean']['input']>
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>
}>

export type SetDraftCanCommentMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    createdAt: any
    updatedAt: any
    cover?: string | null
    tags?: Array<string> | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    sensitiveByAuthor: boolean
    iscnPublish?: boolean | null
    canComment: boolean
    indentFirstLine: boolean
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
      draft?: boolean | null
      uploadURL?: string | null
    }>
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    connections: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
    access: {
      __typename?: 'DraftAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
      } | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
  }
}

export type SetDraftIndentMutationVariables = Exact<{
  id: Scalars['ID']['input']
  indented?: InputMaybe<Scalars['Boolean']['input']>
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>
}>

export type SetDraftIndentMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    createdAt: any
    updatedAt: any
    cover?: string | null
    tags?: Array<string> | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    sensitiveByAuthor: boolean
    iscnPublish?: boolean | null
    canComment: boolean
    indentFirstLine: boolean
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
      draft?: boolean | null
      uploadURL?: string | null
    }>
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    connections: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
    access: {
      __typename?: 'DraftAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
      } | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
  }
}

export type SetDraftAccessMutationVariables = Exact<{
  id: Scalars['ID']['input']
  circle?: InputMaybe<Scalars['ID']['input']>
  accessType?: InputMaybe<ArticleAccessType>
  license?: InputMaybe<ArticleLicenseType>
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>
}>

export type SetDraftAccessMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    createdAt: any
    updatedAt: any
    cover?: string | null
    tags?: Array<string> | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    sensitiveByAuthor: boolean
    iscnPublish?: boolean | null
    canComment: boolean
    indentFirstLine: boolean
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
      draft?: boolean | null
      uploadURL?: string | null
    }>
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    connections: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
    access: {
      __typename?: 'DraftAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
      } | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
  }
}

export type SetDraftCampaignMutationVariables = Exact<{
  id: Scalars['ID']['input']
  campaigns?: InputMaybe<Array<ArticleCampaignInput> | ArticleCampaignInput>
  isReset: Scalars['Boolean']['input']
  lastUpdatedAt?: InputMaybe<Scalars['DateTime']['input']>
}>

export type SetDraftCampaignMutation = {
  __typename?: 'Mutation'
  setDraftCampaign?: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    createdAt: any
    updatedAt: any
    cover?: string | null
    tags?: Array<string> | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    sensitiveByAuthor: boolean
    iscnPublish?: boolean | null
    canComment: boolean
    indentFirstLine: boolean
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
      draft?: boolean | null
      uploadURL?: string | null
    }>
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    connections: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
    access: {
      __typename?: 'DraftAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
      } | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
  }
  resetDraftCampaign?: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    createdAt: any
    updatedAt: any
    cover?: string | null
    tags?: Array<string> | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    sensitiveByAuthor: boolean
    iscnPublish?: boolean | null
    canComment: boolean
    indentFirstLine: boolean
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
      draft?: boolean | null
      uploadURL?: string | null
    }>
    collections: {
      __typename?: 'CollectionConnection'
      edges?: Array<{
        __typename?: 'CollectionEdge'
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
    connections: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          state: ArticleState
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            isBlocking: boolean
            displayName?: string | null
            avatar?: string | null
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
          }
        }
      }> | null
    }
    access: {
      __typename?: 'DraftAccess'
      type: ArticleAccessType
      circle?: {
        __typename?: 'Circle'
        id: string
        name: string
        displayName: string
        description?: string | null
        avatar?: string | null
        owner: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        members: { __typename?: 'MemberConnection'; totalCount: number }
        works: { __typename?: 'ArticleConnection'; totalCount: number }
        prices?: Array<{
          __typename?: 'Price'
          amount: number
          currency: TransactionCurrency
        }> | null
      } | null
    }
    campaigns: Array<{
      __typename?: 'ArticleCampaign'
      campaign: { __typename?: 'WritingChallenge'; id: string; name: string }
      stage?: { __typename?: 'CampaignStage'; id: string } | null
    }>
  }
}

export type DigestAppreciationFragment = {
  __typename?: 'Appreciation'
  amount: number
  purpose: AppreciationPurpose
  content: string
  sender?: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  } | null
  recipient: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
  }
  target?: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    shortHash: string
    articleState: ArticleState
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
  } | null
}

export type MeCommentsQueryVariables = Exact<{
  id: Scalars['ID']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type MeCommentsQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | {
        __typename?: 'User'
        id: string
        commentedArticles: {
          __typename?: 'ArticleConnection'
          pageInfo: {
            __typename?: 'PageInfo'
            startCursor?: string | null
            endCursor?: string | null
            hasNextPage: boolean
          }
          edges?: Array<{
            __typename?: 'ArticleEdge'
            cursor: string
            node: {
              __typename?: 'Article'
              id: string
              title: string
              slug: string
              shortHash: string
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
              comments: {
                __typename?: 'CommentConnection'
                edges?: Array<{
                  __typename?: 'CommentEdge'
                  cursor: string
                  node: {
                    __typename?: 'Comment'
                    id: string
                    content?: string | null
                    state: CommentState
                    type: CommentType
                    parentComment?: {
                      __typename?: 'Comment'
                      id: string
                    } | null
                  }
                }> | null
              }
            }
          }> | null
        }
      }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type MeLikesReceivedQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type MeLikesReceivedQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    activity: {
      __typename?: 'UserActivity'
      likesReceived: {
        __typename?: 'AppreciationConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'AppreciationEdge'
          cursor: string
          node: {
            __typename?: 'Appreciation'
            amount: number
            purpose: AppreciationPurpose
            content: string
            sender?: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            } | null
            recipient: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
            target?: {
              __typename?: 'Article'
              id: string
              title: string
              slug: string
              shortHash: string
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
            } | null
          }
        }> | null
      }
    }
  } | null
}

export type MeLikesSentQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type MeLikesSentQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    activity: {
      __typename?: 'UserActivity'
      likesSent: {
        __typename?: 'AppreciationConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'AppreciationEdge'
          cursor: string
          node: {
            __typename?: 'Appreciation'
            amount: number
            purpose: AppreciationPurpose
            content: string
            sender?: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            } | null
            recipient: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
            target?: {
              __typename?: 'Article'
              id: string
              title: string
              slug: string
              shortHash: string
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
            } | null
          }
        }> | null
      }
    }
  } | null
}

export type MeHistoryFeedQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type MeHistoryFeedQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    activity: {
      __typename?: 'UserActivity'
      history: {
        __typename?: 'ReadHistoryConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'ReadHistoryEdge'
          cursor: string
          node: {
            __typename?: 'ReadHistory'
            article: {
              __typename?: 'Article'
              id: string
              title: string
              slug: string
              shortHash: string
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
            }
          }
        }> | null
      }
    }
  } | null
}

export type ClearReadHistoryMutationVariables = Exact<{ [key: string]: never }>

export type ClearReadHistoryMutation = {
  __typename?: 'Mutation'
  clearReadHistory: {
    __typename?: 'User'
    activity: {
      __typename?: 'UserActivity'
      history: { __typename?: 'ReadHistoryConnection'; totalCount: number }
    }
  }
}

export type MeNotificationsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type MeNotificationsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    notices: {
      __typename?: 'NoticeConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'NoticeEdge'
        cursor: string
        node:
          | {
              __typename: 'ArticleArticleNotice'
              id: string
              createdAt: any
              unread: boolean
              articleArticleNoticeType: ArticleArticleNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              article: {
                __typename?: 'Article'
                id: string
                title: string
                slug: string
                shortHash: string
                summary: string
                articleState: ArticleState
                author: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                }
              }
              collection: {
                __typename?: 'Article'
                id: string
                summary: string
                title: string
                slug: string
                shortHash: string
                articleState: ArticleState
                author: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                }
              }
            }
          | {
              __typename: 'ArticleNotice'
              id: string
              createdAt: any
              unread: boolean
              articleNoticeType: ArticleNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              article: {
                __typename?: 'Article'
                id: string
                summary: string
                title: string
                slug: string
                shortHash: string
                articleState: ArticleState
                author: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                  avatar?: string | null
                  status?: {
                    __typename?: 'UserStatus'
                    state: UserState
                  } | null
                  liker: { __typename?: 'Liker'; civicLiker: boolean }
                  info: {
                    __typename?: 'UserInfo'
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                    cryptoWallet?: {
                      __typename?: 'CryptoWallet'
                      id: string
                      address: string
                      hasNFTs: boolean
                    } | null
                  }
                }
                access: {
                  __typename?: 'ArticleAccess'
                  circle?: {
                    __typename?: 'Circle'
                    id: string
                    name: string
                    displayName: string
                  } | null
                }
              }
              entities: Array<
                | { __typename?: 'Article'; id: string }
                | { __typename?: 'ArticleVersion'; id: string }
                | { __typename?: 'Circle'; id: string }
                | { __typename?: 'Collection'; id: string }
                | { __typename?: 'Comment'; id: string }
                | { __typename?: 'CurationChannel'; id: string }
                | { __typename?: 'Draft'; id: string }
                | { __typename?: 'IcymiTopic'; id: string }
                | { __typename?: 'Moment'; id: string }
                | { __typename?: 'Report'; id: string }
                | { __typename?: 'Tag'; id: string }
                | { __typename?: 'TopicChannel'; id: string }
                | { __typename?: 'User'; id: string }
                | { __typename?: 'WritingChallenge'; id: string }
              >
            }
          | {
              __typename: 'CampaignArticleNotice'
              id: string
              createdAt: any
              unread: boolean
              campaignArticleNoticeType: CampaignArticleNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              campaign: {
                __typename?: 'WritingChallenge'
                id: string
                shortHash: string
              }
              article: {
                __typename?: 'Article'
                id: string
                summary: string
                title: string
                slug: string
                shortHash: string
                articleState: ArticleState
                author: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                }
              }
            }
          | {
              __typename: 'CircleNotice'
              id: string
              createdAt: any
              unread: boolean
              circleNoticeType: CircleNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                isFollower: boolean
                isFollowee: boolean
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                info: {
                  __typename?: 'UserInfo'
                  description?: string | null
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
                liker: { __typename?: 'Liker'; civicLiker: boolean }
              }> | null
              circle: {
                __typename?: 'Circle'
                id: string
                name: string
                displayName: string
                description?: string | null
                avatar?: string | null
                invitedBy?: {
                  __typename?: 'Invitation'
                  id: string
                  freePeriod: number
                } | null
                owner: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                  displayName?: string | null
                  avatar?: string | null
                  status?: {
                    __typename?: 'UserStatus'
                    state: UserState
                  } | null
                  liker: { __typename?: 'Liker'; civicLiker: boolean }
                  info: {
                    __typename?: 'UserInfo'
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                    cryptoWallet?: {
                      __typename?: 'CryptoWallet'
                      id: string
                      address: string
                      hasNFTs: boolean
                    } | null
                  }
                }
                members: { __typename?: 'MemberConnection'; totalCount: number }
                works: { __typename?: 'ArticleConnection'; totalCount: number }
                prices?: Array<{
                  __typename?: 'Price'
                  amount: number
                  currency: TransactionCurrency
                }> | null
              }
              comments?: Array<{
                __typename?: 'Comment'
                id: string
                type: CommentType
                content?: string | null
                state: CommentState
                parentComment?: { __typename?: 'Comment'; id: string } | null
                node:
                  | {
                      __typename?: 'Article'
                      id: string
                      title: string
                      slug: string
                      shortHash: string
                      articleState: ArticleState
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                      }
                    }
                  | { __typename?: 'ArticleVersion' }
                  | { __typename?: 'Circle'; id: string; name: string }
                  | { __typename?: 'Collection' }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'CurationChannel' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'IcymiTopic' }
                  | {
                      __typename?: 'Moment'
                      id: string
                      shortHash: string
                      momentState: MomentState
                    }
                  | { __typename?: 'Report' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'TopicChannel' }
                  | { __typename?: 'User' }
                  | { __typename?: 'WritingChallenge' }
                comments: {
                  __typename?: 'CommentConnection'
                  totalCount: number
                }
                communityWatchAction?: {
                  __typename?: 'CommunityWatchAction'
                  uuid: string
                } | null
                author: { __typename?: 'User'; id: string; isBlocked: boolean }
              }> | null
              replies?: Array<{
                __typename?: 'Comment'
                id: string
                type: CommentType
                content?: string | null
                state: CommentState
                parentComment?: { __typename?: 'Comment'; id: string } | null
                author: { __typename?: 'User'; id: string; isBlocked: boolean }
                replyTo?: {
                  __typename?: 'Comment'
                  author: { __typename?: 'User'; id: string }
                } | null
                node:
                  | {
                      __typename?: 'Article'
                      id: string
                      title: string
                      slug: string
                      shortHash: string
                      articleState: ArticleState
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                      }
                    }
                  | { __typename?: 'ArticleVersion' }
                  | { __typename?: 'Circle'; id: string; name: string }
                  | { __typename?: 'Collection' }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'CurationChannel' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'IcymiTopic' }
                  | {
                      __typename?: 'Moment'
                      id: string
                      shortHash: string
                      momentState: MomentState
                    }
                  | { __typename?: 'Report' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'TopicChannel' }
                  | { __typename?: 'User' }
                  | { __typename?: 'WritingChallenge' }
                comments: {
                  __typename?: 'CommentConnection'
                  totalCount: number
                }
                communityWatchAction?: {
                  __typename?: 'CommunityWatchAction'
                  uuid: string
                } | null
              }> | null
              mentions?: Array<{
                __typename?: 'Comment'
                id: string
                type: CommentType
                content?: string | null
                state: CommentState
                parentComment?: { __typename?: 'Comment'; id: string } | null
                node:
                  | {
                      __typename?: 'Article'
                      id: string
                      title: string
                      slug: string
                      shortHash: string
                      articleState: ArticleState
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                      }
                    }
                  | { __typename?: 'ArticleVersion' }
                  | { __typename?: 'Circle'; id: string; name: string }
                  | { __typename?: 'Collection' }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'CurationChannel' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'IcymiTopic' }
                  | {
                      __typename?: 'Moment'
                      id: string
                      shortHash: string
                      momentState: MomentState
                    }
                  | { __typename?: 'Report' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'TopicChannel' }
                  | { __typename?: 'User' }
                  | { __typename?: 'WritingChallenge' }
                comments: {
                  __typename?: 'CommentConnection'
                  totalCount: number
                }
                communityWatchAction?: {
                  __typename?: 'CommunityWatchAction'
                  uuid: string
                } | null
                author: { __typename?: 'User'; id: string; isBlocked: boolean }
              }> | null
            }
          | {
              __typename: 'CollectionNotice'
              id: string
              createdAt: any
              unread: boolean
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              collection: {
                __typename?: 'Collection'
                id: string
                title: string
                author: {
                  __typename?: 'User'
                  id: string
                  userName?: string | null
                }
              }
            }
          | {
              __typename: 'CommentCommentNotice'
              id: string
              createdAt: any
              unread: boolean
              commentCommentNoticeType: CommentCommentNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              comment: {
                __typename?: 'Comment'
                id: string
                state: CommentState
                type: CommentType
                content?: string | null
                node:
                  | {
                      __typename?: 'Article'
                      id: string
                      title: string
                      slug: string
                      shortHash: string
                      articleState: ArticleState
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                      }
                    }
                  | { __typename?: 'ArticleVersion' }
                  | { __typename?: 'Circle'; id: string; name: string }
                  | { __typename?: 'Collection' }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'CurationChannel' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'IcymiTopic' }
                  | {
                      __typename?: 'Moment'
                      id: string
                      shortHash: string
                      momentState: MomentState
                    }
                  | { __typename?: 'Report' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'TopicChannel' }
                  | { __typename?: 'User' }
                  | { __typename?: 'WritingChallenge' }
                parentComment?: { __typename?: 'Comment'; id: string } | null
                comments: {
                  __typename?: 'CommentConnection'
                  totalCount: number
                }
                communityWatchAction?: {
                  __typename?: 'CommunityWatchAction'
                  uuid: string
                } | null
                author: { __typename?: 'User'; id: string; isBlocked: boolean }
              }
              reply: {
                __typename?: 'Comment'
                id: string
                state: CommentState
                type: CommentType
                content?: string | null
                node:
                  | {
                      __typename?: 'Article'
                      id: string
                      title: string
                      slug: string
                      shortHash: string
                      summary: string
                      articleState: ArticleState
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                      }
                    }
                  | { __typename?: 'ArticleVersion' }
                  | {
                      __typename?: 'Circle'
                      id: string
                      name: string
                      displayName: string
                    }
                  | { __typename?: 'Collection' }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'CurationChannel' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'IcymiTopic' }
                  | {
                      __typename?: 'Moment'
                      id: string
                      shortHash: string
                      momentState: MomentState
                    }
                  | { __typename?: 'Report' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'TopicChannel' }
                  | { __typename?: 'User' }
                  | { __typename?: 'WritingChallenge' }
                parentComment?: { __typename?: 'Comment'; id: string } | null
                comments: {
                  __typename?: 'CommentConnection'
                  totalCount: number
                }
                communityWatchAction?: {
                  __typename?: 'CommunityWatchAction'
                  uuid: string
                } | null
                author: { __typename?: 'User'; id: string; isBlocked: boolean }
              }
            }
          | {
              __typename: 'CommentNotice'
              id: string
              createdAt: any
              unread: boolean
              commentNoticeType: CommentNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              comment: {
                __typename?: 'Comment'
                id: string
                state: CommentState
                type: CommentType
                content?: string | null
                node:
                  | {
                      __typename?: 'Article'
                      id: string
                      title: string
                      slug: string
                      shortHash: string
                      summary: string
                      articleState: ArticleState
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                      }
                    }
                  | { __typename?: 'ArticleVersion' }
                  | {
                      __typename?: 'Circle'
                      id: string
                      name: string
                      displayName: string
                    }
                  | { __typename?: 'Collection' }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'CurationChannel' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'IcymiTopic' }
                  | {
                      __typename?: 'Moment'
                      state: MomentState
                      id: string
                      shortHash: string
                      content?: string | null
                      momentState: MomentState
                      assets: Array<{
                        __typename?: 'Asset'
                        id: string
                        path: string
                      }>
                    }
                  | { __typename?: 'Report' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'TopicChannel' }
                  | { __typename?: 'User' }
                  | { __typename?: 'WritingChallenge' }
                parentComment?: { __typename?: 'Comment'; id: string } | null
                comments: {
                  __typename?: 'CommentConnection'
                  totalCount: number
                }
                communityWatchAction?: {
                  __typename?: 'CommunityWatchAction'
                  uuid: string
                } | null
                author: { __typename?: 'User'; id: string; isBlocked: boolean }
              }
            }
          | {
              __typename: 'MomentNotice'
              id: string
              createdAt: any
              unread: boolean
              momentNoticeType: MomentNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              moment: {
                __typename?: 'Moment'
                id: string
                state: MomentState
                content?: string | null
                shortHash: string
                assets: Array<{
                  __typename?: 'Asset'
                  id: string
                  path: string
                }>
              }
            }
          | {
              __typename: 'OfficialAnnouncementNotice'
              id: string
              createdAt: any
              unread: boolean
              link?: string | null
              message: string
            }
          | {
              __typename: 'TransactionNotice'
              id: string
              createdAt: any
              unread: boolean
              txNoticeType: TransactionNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
              tx: {
                __typename?: 'Transaction'
                id: string
                amount: number
                currency: TransactionCurrency
                state: TransactionState
                target?:
                  | {
                      __typename: 'Article'
                      id: string
                      summary: string
                      title: string
                      slug: string
                      shortHash: string
                      articleState: ArticleState
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                      }
                    }
                  | { __typename: 'Circle' }
                  | { __typename: 'Transaction' }
                  | null
                blockchainTx?: {
                  __typename?: 'BlockchainTransaction'
                  chain: Chain
                  txHash: string
                } | null
              }
            }
          | {
              __typename: 'UserNotice'
              id: string
              createdAt: any
              unread: boolean
              userNoticeType: UserNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }> | null
            }
      }> | null
    }
  } | null
}

export type ViewerBlockListQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type ViewerBlockListQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    blockList: {
      __typename?: 'UserConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'UserEdge'
        cursor: string
        node: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          isBlocked: boolean
          avatar?: string | null
          isFollower: boolean
          isFollowee: boolean
          info: {
            __typename?: 'UserInfo'
            description?: string | null
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
        }
      }> | null
    }
  } | null
}

export type ToggleBlockUserButtonUserPrivateFragment = {
  __typename?: 'User'
  id: string
  isBlocked: boolean
}

export type SetCurrencyMutationVariables = Exact<{
  input: SetCurrencyInput
}>

export type SetCurrencyMutation = {
  __typename?: 'Mutation'
  setCurrency: {
    __typename?: 'User'
    id: string
    settings: { __typename?: 'UserSettings'; currency: QuoteCurrency }
  }
}

export type ViewerFederationSettingQueryVariables = Exact<{
  [key: string]: never
}>

export type ViewerFederationSettingQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    federationSetting?: {
      __typename?: 'UserFederationSetting'
      state: FederationAuthorSettingState
    } | null
    oss: {
      __typename?: 'UserOSS'
      featureFlags: Array<{
        __typename?: 'UserFeatureFlag'
        type: UserFeatureFlagType
      }>
    }
  } | null
}

export type ViewerBlockedUsersQueryVariables = Exact<{ [key: string]: never }>

export type ViewerBlockedUsersQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    blockList: { __typename?: 'UserConnection'; totalCount: number }
  } | null
}

export type ViewerNotificationsCircleSettingsQueryVariables = Exact<{
  [key: string]: never
}>

export type ViewerNotificationsCircleSettingsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    settings: {
      __typename?: 'UserSettings'
      language: UserLanguage
      notification?: {
        __typename?: 'NotificationSetting'
        circleNewSubscriber: boolean
        circleNewFollower: boolean
        circleNewUnsubscriber: boolean
        circleMemberNewBroadcastReply: boolean
        circleMemberNewDiscussion: boolean
        circleMemberNewDiscussionReply: boolean
        inCircleNewArticle: boolean
        inCircleNewBroadcast: boolean
        inCircleNewBroadcastReply: boolean
        inCircleNewDiscussion: boolean
        inCircleNewDiscussionReply: boolean
      } | null
    }
  } | null
}

export type UpdateViewerNotificationsCircleMutationVariables = Exact<{
  type: NotificationSettingType
  enabled: Scalars['Boolean']['input']
}>

export type UpdateViewerNotificationsCircleMutation = {
  __typename?: 'Mutation'
  updateNotificationSetting: {
    __typename?: 'User'
    id: string
    settings: {
      __typename?: 'UserSettings'
      notification?: {
        __typename?: 'NotificationSetting'
        circleNewSubscriber: boolean
        circleNewFollower: boolean
        circleNewUnsubscriber: boolean
        circleMemberNewBroadcastReply: boolean
        circleMemberNewDiscussion: boolean
        circleMemberNewDiscussionReply: boolean
        inCircleNewArticle: boolean
        inCircleNewBroadcast: boolean
        inCircleNewBroadcastReply: boolean
        inCircleNewDiscussion: boolean
        inCircleNewDiscussionReply: boolean
      } | null
    }
  }
}

export type ViewerNotificationsGeneralSettingsQueryVariables = Exact<{
  [key: string]: never
}>

export type ViewerNotificationsGeneralSettingsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    settings: {
      __typename?: 'UserSettings'
      language: UserLanguage
      notification?: {
        __typename?: 'NotificationSetting'
        email: boolean
        mention: boolean
        userNewFollower: boolean
        newComment: boolean
        newLike: boolean
        articleNewSubscription: boolean
        articleNewCollected: boolean
      } | null
    }
  } | null
}

export type UpdateViewerNotificationsGeneralMutationVariables = Exact<{
  type: NotificationSettingType
  enabled: Scalars['Boolean']['input']
}>

export type UpdateViewerNotificationsGeneralMutation = {
  __typename?: 'Mutation'
  updateNotificationSetting: {
    __typename?: 'User'
    id: string
    settings: {
      __typename?: 'UserSettings'
      notification?: {
        __typename?: 'NotificationSetting'
        email: boolean
        mention: boolean
        userNewFollower: boolean
        newComment: boolean
        newLike: boolean
        articleNewSubscription: boolean
        articleNewCollected: boolean
      } | null
    }
  }
}

export type MeSubscriptionTransactionsCountQueryVariables = Exact<{
  [key: string]: never
}>

export type MeSubscriptionTransactionsCountQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    wallet: {
      __typename?: 'Wallet'
      subscriptionTrannsactions: {
        __typename?: 'TransactionConnection'
        totalCount: number
      }
    }
  } | null
}

export type MeTransactionsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
  purpose?: InputMaybe<TransactionPurpose>
  currency?: InputMaybe<TransactionCurrency>
}>

export type MeTransactionsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    wallet: {
      __typename?: 'Wallet'
      transactions: {
        __typename?: 'TransactionConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'TransactionEdge'
          cursor: string
          node: {
            __typename?: 'Transaction'
            id: string
            state: TransactionState
            purpose: TransactionPurpose
            amount: number
            fee: number
            currency: TransactionCurrency
            createdAt: any
            message?: string | null
            recipient?: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            } | null
            sender?: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            } | null
            target?:
              | {
                  __typename?: 'Article'
                  id: string
                  title: string
                  slug: string
                  shortHash: string
                  articleState: ArticleState
                  author: {
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                  }
                }
              | {
                  __typename?: 'Circle'
                  id: string
                  name: string
                  displayName: string
                }
              | { __typename?: 'Transaction' }
              | null
            blockchainTx?: {
              __typename?: 'BlockchainTransaction'
              chain: Chain
              txHash: string
            } | null
          }
        }> | null
      }
    }
  } | null
}

export type ViewerLikeBalanceQueryVariables = Exact<{ [key: string]: never }>

export type ViewerLikeBalanceQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    liker: { __typename?: 'Liker'; total: number }
  } | null
}

export type GetStripeLoginUrlQueryVariables = Exact<{ [key: string]: never }>

export type GetStripeLoginUrlQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    wallet: {
      __typename?: 'Wallet'
      stripeAccount?: {
        __typename?: 'StripeAccount'
        id: string
        loginUrl: string
      } | null
    }
  } | null
}

export type GetCustomerPortalQueryVariables = Exact<{ [key: string]: never }>

export type GetCustomerPortalQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    wallet: { __typename?: 'Wallet'; customerPortal?: string | null }
  } | null
}

export type MeWorksArchivedFeedQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type MeWorksArchivedFeedQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    articles: {
      __typename?: 'ArticleConnection'
      totalCount: number
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'ArticleEdge'
        cursor: string
        node: {
          __typename?: 'Article'
          id: string
          createdAt: any
          title: string
          slug: string
          shortHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      }> | null
    }
  } | null
}

export type MeWorksDraftFeedQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type MeWorksDraftFeedQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    drafts: {
      __typename?: 'DraftConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'DraftEdge'
        cursor: string
        node: {
          __typename?: 'Draft'
          id: string
          title?: string | null
          slug: string
          updatedAt: any
          publishAt?: any | null
          summary?: string | null
          content?: string | null
          cover?: string | null
          tags?: Array<string> | null
          license: ArticleLicenseType
          canComment: boolean
          sensitiveByAuthor: boolean
          campaigns: Array<{
            __typename?: 'ArticleCampaign'
            campaign: {
              __typename?: 'WritingChallenge'
              id: string
              name: string
            }
          }>
          connections: {
            __typename?: 'ArticleConnection'
            edges?: Array<{
              __typename?: 'ArticleEdge'
              node: { __typename?: 'Article'; id: string; title: string }
            }> | null
          }
          collections: {
            __typename?: 'CollectionConnection'
            edges?: Array<{
              __typename?: 'CollectionEdge'
              node: { __typename?: 'Collection'; id: string; title: string }
            }> | null
          }
          access: {
            __typename?: 'DraftAccess'
            circle?: { __typename?: 'Circle'; id: string } | null
          }
        }
      }> | null
    }
  } | null
}

export type FooterActionsPublishedArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  shortHash: string
  createdAt: any
  readerCount: number
  appreciationsReceivedTotal: number
  commentCount: number
  donationCount: number
  pinned: boolean
  revisionCount: number
  articleState: ArticleState
  author: {
    __typename?: 'User'
    id: string
    displayName?: string | null
    userName?: string | null
  }
  tags?: Array<{ __typename?: 'Tag'; id: string; content: string }> | null
  likesReceived: { __typename?: 'AppreciationConnection'; totalCount: number }
  donationsDialog: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
  }
}

export type FooterActionsPublishedArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  bookmarked: boolean
}

export type ArticleDigestPublishedArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  shortHash: string
  createdAt: any
  readerCount: number
  appreciationsReceivedTotal: number
  commentCount: number
  donationCount: number
  pinned: boolean
  revisionCount: number
  articleState: ArticleState
  author: {
    __typename?: 'User'
    id: string
    displayName?: string | null
    userName?: string | null
  }
  tags?: Array<{ __typename?: 'Tag'; id: string; content: string }> | null
  likesReceived: { __typename?: 'AppreciationConnection'; totalCount: number }
  donationsDialog: {
    __typename?: 'ArticleDonationConnection'
    totalCount: number
  }
}

export type ArticleDigestPublishedArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  bookmarked: boolean
}

export type MeWorksPublishedFeedQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<UserArticlesSort>
}>

export type MeWorksPublishedFeedQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    articles: {
      __typename?: 'ArticleConnection'
      totalCount: number
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'ArticleEdge'
        cursor: string
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          shortHash: string
          createdAt: any
          readerCount: number
          appreciationsReceivedTotal: number
          commentCount: number
          donationCount: number
          bookmarked: boolean
          pinned: boolean
          revisionCount: number
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            displayName?: string | null
            userName?: string | null
          }
          tags?: Array<{
            __typename?: 'Tag'
            id: string
            content: string
          }> | null
          likesReceived: {
            __typename?: 'AppreciationConnection'
            totalCount: number
          }
          donationsDialog: {
            __typename?: 'ArticleDonationConnection'
            totalCount: number
          }
        }
      }> | null
    }
  } | null
}

export type MeWorksTabsQueryVariables = Exact<{ [key: string]: never }>

export type MeWorksTabsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    drafts: { __typename?: 'DraftConnection'; totalCount: number }
    publishedArticles: { __typename?: 'ArticleConnection'; totalCount: number }
    archivedArticles: { __typename?: 'ArticleConnection'; totalCount: number }
  } | null
}

export type OAuthClientInfoQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type OAuthClientInfoQuery = {
  __typename?: 'Query'
  oauthClient?: {
    __typename?: 'OAuthClient'
    id: string
    name: string
    avatar?: string | null
    website?: string | null
    scope?: Array<string> | null
  } | null
}

export type SearchAggregateArticlesPublicQueryVariables = Exact<{
  key: Scalars['String']['input']
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  after?: InputMaybe<Scalars['String']['input']>
}>

export type SearchAggregateArticlesPublicQuery = {
  __typename?: 'Query'
  search: {
    __typename?: 'SearchResultConnection'
    totalCount: number
    pageInfo: {
      __typename?: 'PageInfo'
      startCursor?: string | null
      endCursor?: string | null
      hasNextPage: boolean
    }
    edges?: Array<{
      __typename?: 'SearchResultEdge'
      cursor: string
      node:
        | {
            __typename?: 'Article'
            id: string
            title: string
            slug: string
            shortHash: string
            displayCover?: string | null
            summary: string
            createdAt: any
            readTime: number
            pinned: boolean
            revisionCount: number
            articleState: ArticleState
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
            access: {
              __typename?: 'ArticleAccess'
              type: ArticleAccessType
              circle?: {
                __typename?: 'Circle'
                id: string
                name: string
                displayName: string
              } | null
            }
            collections: {
              __typename?: 'CollectionConnection'
              edges?: Array<{
                __typename?: 'CollectionEdge'
                node: {
                  __typename?: 'Collection'
                  id: string
                  title: string
                  articles: {
                    __typename?: 'ArticleConnection'
                    totalCount: number
                  }
                }
              }> | null
            }
            campaigns: Array<{
              __typename?: 'ArticleCampaign'
              campaign: {
                __typename?: 'WritingChallenge'
                id: string
                name: string
                shortHash: string
                nameZhHant: string
                nameZhHans: string
                nameEn: string
              }
              stage?: { __typename?: 'CampaignStage'; id: string } | null
            }>
            tags?: Array<{
              __typename?: 'Tag'
              id: string
              content: string
            }> | null
            donations: {
              __typename?: 'ArticleDonationConnection'
              totalCount: number
            }
            likesReceived: {
              __typename?: 'AppreciationConnection'
              totalCount: number
            }
            donationsDialog: {
              __typename?: 'ArticleDonationConnection'
              totalCount: number
            }
          }
        | { __typename?: 'ArticleVersion' }
        | { __typename?: 'Circle' }
        | { __typename?: 'Collection' }
        | { __typename?: 'Comment' }
        | { __typename?: 'CurationChannel' }
        | { __typename?: 'Draft' }
        | { __typename?: 'IcymiTopic' }
        | { __typename?: 'Moment' }
        | { __typename?: 'Report' }
        | { __typename?: 'Tag' }
        | { __typename?: 'TopicChannel' }
        | { __typename?: 'User' }
        | { __typename?: 'WritingChallenge' }
    }> | null
  }
}

export type SearchAggregateTagsPublicQueryVariables = Exact<{
  key: Scalars['String']['input']
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  after?: InputMaybe<Scalars['String']['input']>
}>

export type SearchAggregateTagsPublicQuery = {
  __typename?: 'Query'
  search: {
    __typename?: 'SearchResultConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      startCursor?: string | null
      endCursor?: string | null
      hasNextPage: boolean
    }
    edges?: Array<{
      __typename?: 'SearchResultEdge'
      cursor: string
      node:
        | { __typename?: 'Article' }
        | { __typename?: 'ArticleVersion' }
        | { __typename?: 'Circle' }
        | { __typename?: 'Collection' }
        | { __typename?: 'Comment' }
        | { __typename?: 'CurationChannel' }
        | { __typename?: 'Draft' }
        | { __typename?: 'IcymiTopic' }
        | { __typename?: 'Moment' }
        | { __typename?: 'Report' }
        | {
            __typename?: 'Tag'
            id: string
            content: string
            numArticles: number
          }
        | { __typename?: 'TopicChannel' }
        | { __typename?: 'User' }
        | { __typename?: 'WritingChallenge' }
    }> | null
  }
}

export type SearchAggregateUsersPublicQueryVariables = Exact<{
  key: Scalars['String']['input']
  first?: InputMaybe<Scalars['first_Int_min_0']['input']>
  after?: InputMaybe<Scalars['String']['input']>
}>

export type SearchAggregateUsersPublicQuery = {
  __typename?: 'Query'
  search: {
    __typename?: 'SearchResultConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      startCursor?: string | null
      endCursor?: string | null
      hasNextPage: boolean
    }
    edges?: Array<{
      __typename?: 'SearchResultEdge'
      cursor: string
      node:
        | { __typename?: 'Article' }
        | { __typename?: 'ArticleVersion' }
        | { __typename?: 'Circle' }
        | { __typename?: 'Collection' }
        | { __typename?: 'Comment' }
        | { __typename?: 'CurationChannel' }
        | { __typename?: 'Draft' }
        | { __typename?: 'IcymiTopic' }
        | { __typename?: 'Moment' }
        | { __typename?: 'Report' }
        | { __typename?: 'Tag' }
        | { __typename?: 'TopicChannel' }
        | {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            info: {
              __typename?: 'UserInfo'
              description?: string | null
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
          }
        | { __typename?: 'WritingChallenge' }
    }> | null
  }
}

export type TagDetailRecommendedAuthorsQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type TagDetailRecommendedAuthorsQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | {
        __typename?: 'Tag'
        id: string
        recommendedAuthors: {
          __typename?: 'UserConnection'
          edges?: Array<{
            __typename?: 'UserEdge'
            cursor: string
            node: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              info: {
                __typename?: 'UserInfo'
                description?: string | null
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
            }
          }> | null
        }
      }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type TagDetailRecommendedQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type TagDetailRecommendedQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | {
        __typename?: 'Tag'
        id: string
        recommended: {
          __typename?: 'TagConnection'
          edges?: Array<{
            __typename?: 'TagEdge'
            cursor: string
            node: {
              __typename?: 'Tag'
              id: string
              content: string
              numArticles: number
            }
          }> | null
        }
      }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type TagFragmentFragment = {
  __typename?: 'Tag'
  id: string
  content: string
  numArticles: number
  isFollower?: boolean | null
  selectedArticles: {
    __typename?: 'ChannelArticleConnection'
    totalCount: number
  }
  hottestArticles: {
    __typename?: 'ChannelArticleConnection'
    totalCount: number
  }
  recommended: {
    __typename?: 'TagConnection'
    edges?: Array<{
      __typename?: 'TagEdge'
      cursor: string
      node: {
        __typename?: 'Tag'
        id: string
        content: string
        numArticles: number
      }
    }> | null
  }
}

export type TagDetailPublicQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type TagDetailPublicQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | {
        __typename?: 'Tag'
        id: string
        content: string
        numArticles: number
        isFollower?: boolean | null
        selectedArticles: {
          __typename?: 'ChannelArticleConnection'
          totalCount: number
        }
        hottestArticles: {
          __typename?: 'ChannelArticleConnection'
          totalCount: number
        }
        recommended: {
          __typename?: 'TagConnection'
          edges?: Array<{
            __typename?: 'TagEdge'
            cursor: string
            node: {
              __typename?: 'Tag'
              id: string
              content: string
              numArticles: number
            }
          }> | null
        }
      }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type TagDetailPublicBySearchQueryVariables = Exact<{
  key: Scalars['String']['input']
}>

export type TagDetailPublicBySearchQuery = {
  __typename?: 'Query'
  search: {
    __typename?: 'SearchResultConnection'
    totalCount: number
    pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean }
    edges?: Array<{
      __typename?: 'SearchResultEdge'
      cursor: string
      node:
        | { __typename?: 'Article' }
        | { __typename?: 'ArticleVersion' }
        | { __typename?: 'Circle' }
        | { __typename?: 'Collection' }
        | { __typename?: 'Comment' }
        | { __typename?: 'CurationChannel' }
        | { __typename?: 'Draft' }
        | { __typename?: 'IcymiTopic' }
        | { __typename?: 'Moment' }
        | { __typename?: 'Report' }
        | {
            __typename?: 'Tag'
            id: string
            content: string
            numArticles: number
            isFollower?: boolean | null
            selectedArticles: {
              __typename?: 'ChannelArticleConnection'
              totalCount: number
            }
            hottestArticles: {
              __typename?: 'ChannelArticleConnection'
              totalCount: number
            }
            recommended: {
              __typename?: 'TagConnection'
              edges?: Array<{
                __typename?: 'TagEdge'
                cursor: string
                node: {
                  __typename?: 'Tag'
                  id: string
                  content: string
                  numArticles: number
                }
              }> | null
            }
          }
        | { __typename?: 'TopicChannel' }
        | { __typename?: 'User' }
        | { __typename?: 'WritingChallenge' }
    }> | null
  }
}

export type TagDetailPrivateQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type TagDetailPrivateQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag'; id: string; isFollower?: boolean | null }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type AllTagsHottestPublicQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
}>

export type AllTagsHottestPublicQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    recommendation: {
      __typename?: 'Recommendation'
      tags: {
        __typename?: 'TagConnection'
        totalCount: number
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'TagEdge'
          cursor: string
          node: {
            __typename?: 'Tag'
            id: string
            content: string
            numArticles: number
          }
        }> | null
      }
    }
  } | null
}

export type ReorderCollectionArticlesMutationVariables = Exact<{
  collectionId: Scalars['ID']['input']
  articleId: Scalars['ID']['input']
  newPosition: Scalars['Int']['input']
}>

export type ReorderCollectionArticlesMutation = {
  __typename?: 'Mutation'
  reorderCollectionArticles: { __typename?: 'Collection'; id: string }
}

export type CollectionArticlesCollectionFragment = {
  __typename?: 'Collection'
  id: string
  updatedAt: any
  pinned: boolean
  title: string
  description?: string | null
  cover?: string | null
  articleList: {
    __typename?: 'ArticleConnection'
    totalCount: number
    pageInfo: {
      __typename?: 'PageInfo'
      startCursor?: string | null
      endCursor?: string | null
      hasNextPage: boolean
    }
    edges?: Array<{
      __typename?: 'ArticleEdge'
      cursor: string
      node: {
        __typename?: 'Article'
        id: string
        title: string
        slug: string
        shortHash: string
        displayCover?: string | null
        summary: string
        createdAt: any
        readTime: number
        bookmarked: boolean
        pinned: boolean
        revisionCount: number
        articleState: ArticleState
        author: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }
        access: {
          __typename?: 'ArticleAccess'
          type: ArticleAccessType
          circle?: {
            __typename?: 'Circle'
            id: string
            name: string
            displayName: string
          } | null
        }
        collections: {
          __typename?: 'CollectionConnection'
          edges?: Array<{
            __typename?: 'CollectionEdge'
            node: {
              __typename?: 'Collection'
              id: string
              title: string
              articles: { __typename?: 'ArticleConnection'; totalCount: number }
            }
          }> | null
        }
        campaigns: Array<{
          __typename?: 'ArticleCampaign'
          campaign: {
            __typename?: 'WritingChallenge'
            id: string
            name: string
            shortHash: string
            nameZhHant: string
            nameZhHans: string
            nameEn: string
          }
          stage?: { __typename?: 'CampaignStage'; id: string } | null
        }>
        tags?: Array<{ __typename?: 'Tag'; id: string; content: string }> | null
        donations: {
          __typename?: 'ArticleDonationConnection'
          totalCount: number
        }
        likesReceived: {
          __typename?: 'AppreciationConnection'
          totalCount: number
        }
        donationsDialog: {
          __typename?: 'ArticleDonationConnection'
          totalCount: number
        }
      }
    }> | null
  }
  author: {
    __typename?: 'User'
    id: string
    displayName?: string | null
    userName?: string | null
  }
  articles: { __typename?: 'ArticleConnection'; totalCount: number }
}

export type CollectionArticlesPublicQueryVariables = Exact<{
  id: Scalars['ID']['input']
  first: Scalars['first_Int_min_0']['input']
  after?: InputMaybe<Scalars['String']['input']>
  reversed?: InputMaybe<Scalars['Boolean']['input']>
}>

export type CollectionArticlesPublicQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | {
        __typename?: 'Collection'
        id: string
        updatedAt: any
        pinned: boolean
        title: string
        description?: string | null
        cover?: string | null
        articleList: {
          __typename?: 'ArticleConnection'
          totalCount: number
          pageInfo: {
            __typename?: 'PageInfo'
            startCursor?: string | null
            endCursor?: string | null
            hasNextPage: boolean
          }
          edges?: Array<{
            __typename?: 'ArticleEdge'
            cursor: string
            node: {
              __typename?: 'Article'
              id: string
              title: string
              slug: string
              shortHash: string
              displayCover?: string | null
              summary: string
              createdAt: any
              readTime: number
              bookmarked: boolean
              pinned: boolean
              revisionCount: number
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
              access: {
                __typename?: 'ArticleAccess'
                type: ArticleAccessType
                circle?: {
                  __typename?: 'Circle'
                  id: string
                  name: string
                  displayName: string
                } | null
              }
              collections: {
                __typename?: 'CollectionConnection'
                edges?: Array<{
                  __typename?: 'CollectionEdge'
                  node: {
                    __typename?: 'Collection'
                    id: string
                    title: string
                    articles: {
                      __typename?: 'ArticleConnection'
                      totalCount: number
                    }
                  }
                }> | null
              }
              campaigns: Array<{
                __typename?: 'ArticleCampaign'
                campaign: {
                  __typename?: 'WritingChallenge'
                  id: string
                  name: string
                  shortHash: string
                  nameZhHant: string
                  nameZhHans: string
                  nameEn: string
                }
                stage?: { __typename?: 'CampaignStage'; id: string } | null
              }>
              tags?: Array<{
                __typename?: 'Tag'
                id: string
                content: string
              }> | null
              donations: {
                __typename?: 'ArticleDonationConnection'
                totalCount: number
              }
              likesReceived: {
                __typename?: 'AppreciationConnection'
                totalCount: number
              }
              donationsDialog: {
                __typename?: 'ArticleDonationConnection'
                totalCount: number
              }
            }
          }> | null
        }
        author: {
          __typename?: 'User'
          id: string
          displayName?: string | null
          userName?: string | null
        }
        articles: { __typename?: 'ArticleConnection'; totalCount: number }
      }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type CollectionArticlesPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type CollectionArticlesPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string; bookmarked: boolean }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
  > | null
}

export type CollectionLikeButtonPublicFragment = {
  __typename?: 'Collection'
  id: string
  likeCount: number
}

export type CollectionLikeButtonPrivateFragment = {
  __typename?: 'Collection'
  id: string
  liked: boolean
}

export type CollectionProfileCollectionPublicFragment = {
  __typename?: 'Collection'
  id: string
  title: string
  description?: string | null
  cover?: string | null
  likeCount: number
  author: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
  }
}

export type CollectionProfileCollectionPrivateFragment = {
  __typename?: 'Collection'
  id: string
  liked: boolean
}

export type CollectionDetailPublicQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type CollectionDetailPublicQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | {
        __typename?: 'Collection'
        id: string
        title: string
        description?: string | null
        cover?: string | null
        likeCount: number
        liked: boolean
        author: {
          __typename?: 'User'
          id: string
          displayName?: string | null
          userName?: string | null
        }
      }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
    | null
}

export type CollectionDetailPrivateQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type CollectionDetailPrivateQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection'; id: string; liked: boolean }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | { __typename?: 'User' }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type CollectionsUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  info: {
    __typename?: 'UserInfo'
    description?: string | null
    profileCover?: string | null
  }
  status?: { __typename?: 'UserStatus'; state: UserState } | null
  collections: {
    __typename?: 'CollectionConnection'
    totalCount: number
    pageInfo: {
      __typename?: 'PageInfo'
      startCursor?: string | null
      endCursor?: string | null
      hasNextPage: boolean
    }
    edges?: Array<{
      __typename?: 'CollectionEdge'
      cursor: string
      node: {
        __typename?: 'Collection'
        id: string
        title: string
        description?: string | null
        cover?: string | null
        updatedAt: any
        pinned: boolean
        author: {
          __typename?: 'User'
          id: string
          displayName?: string | null
          userName?: string | null
        }
        articles: { __typename?: 'ArticleConnection'; totalCount: number }
      }
    }> | null
  }
}

export type UserCollectionsQueryVariables = Exact<{
  userName: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type UserCollectionsQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      profileCover?: string | null
    }
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    collections: {
      __typename?: 'CollectionConnection'
      totalCount: number
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'CollectionEdge'
        cursor: string
        node: {
          __typename?: 'Collection'
          id: string
          title: string
          description?: string | null
          cover?: string | null
          updatedAt: any
          pinned: boolean
          author: {
            __typename?: 'User'
            id: string
            displayName?: string | null
            userName?: string | null
          }
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
  } | null
}

export type DigestUserProfileCircleFragment = {
  __typename?: 'Circle'
  id: string
  name: string
  displayName: string
  description?: string | null
}

export type ArchiveUserMutationVariables = Exact<{
  id: Scalars['ID']['input']
  password: Scalars['String']['input']
}>

export type ArchiveUserMutation = {
  __typename?: 'Mutation'
  updateUserState?: Array<{
    __typename?: 'User'
    id: string
    status?: { __typename?: 'UserStatus'; state: UserState } | null
  }> | null
}

export type ToggleCommunityWatchUserFragment = {
  __typename?: 'User'
  id: string
  oss: {
    __typename?: 'UserOSS'
    featureFlags: Array<{
      __typename?: 'UserFeatureFlag'
      type: UserFeatureFlagType
    }>
  }
}

export type UserCommunityWatchAdminQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UserCommunityWatchAdminQuery = {
  __typename?: 'Query'
  user?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | {
        __typename?: 'User'
        id: string
        oss: {
          __typename?: 'UserOSS'
          featureFlags: Array<{
            __typename?: 'UserFeatureFlag'
            type: UserFeatureFlagType
          }>
        }
      }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type ToggleCommunityWatchMutationVariables = Exact<{
  id: Scalars['ID']['input']
  flags: Array<UserFeatureFlagType> | UserFeatureFlagType
}>

export type ToggleCommunityWatchMutation = {
  __typename?: 'Mutation'
  putUserFeatureFlags: Array<{
    __typename?: 'User'
    id: string
    oss: {
      __typename?: 'UserOSS'
      featureFlags: Array<{
        __typename?: 'UserFeatureFlag'
        type: UserFeatureFlagType
      }>
    }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }>
}

export type ToggleFreezeUserFragment = {
  __typename?: 'User'
  id: string
  status?: { __typename?: 'UserStatus'; state: UserState } | null
}

export type UserFreezeAdminQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UserFreezeAdminQuery = {
  __typename?: 'Query'
  user?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | {
        __typename?: 'User'
        id: string
        status?: { __typename?: 'UserStatus'; state: UserState } | null
      }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type ToggleFreezeUserMutationVariables = Exact<{
  id: Scalars['ID']['input']
  state: UserState
}>

export type ToggleFreezeUserMutation = {
  __typename?: 'Mutation'
  updateUserState?: Array<{
    __typename?: 'User'
    id: string
    status?: { __typename?: 'UserStatus'; state: UserState } | null
  }> | null
}

export type ToggleRestrictUserFragment = {
  __typename?: 'User'
  id: string
  oss: {
    __typename?: 'UserOSS'
    restrictions: Array<{
      __typename?: 'UserRestriction'
      type: UserRestrictionType
    }>
  }
}

export type UserRestrictionsAdminQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UserRestrictionsAdminQuery = {
  __typename?: 'Query'
  user?:
    | { __typename?: 'Article' }
    | { __typename?: 'ArticleVersion' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Collection' }
    | { __typename?: 'Comment' }
    | { __typename?: 'CurationChannel' }
    | { __typename?: 'Draft' }
    | { __typename?: 'IcymiTopic' }
    | { __typename?: 'Moment' }
    | { __typename?: 'Report' }
    | { __typename?: 'Tag' }
    | { __typename?: 'TopicChannel' }
    | {
        __typename?: 'User'
        id: string
        oss: {
          __typename?: 'UserOSS'
          restrictions: Array<{
            __typename?: 'UserRestriction'
            type: UserRestrictionType
          }>
        }
      }
    | { __typename?: 'WritingChallenge' }
    | null
}

export type ToggleRestrictUserMutationVariables = Exact<{
  id: Scalars['ID']['input']
  restrictions: Array<UserRestrictionType> | UserRestrictionType
}>

export type ToggleRestrictUserMutation = {
  __typename?: 'Mutation'
  putRestrictedUsers: Array<{
    __typename?: 'User'
    id: string
    oss: {
      __typename?: 'UserOSS'
      restrictions: Array<{
        __typename?: 'UserRestriction'
        type: UserRestrictionType
      }>
    }
  }>
}

export type DropdownActionsUserPublicFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  info: {
    __typename?: 'UserInfo'
    profileCover?: string | null
    description?: string | null
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
  }
  liker: { __typename?: 'Liker'; civicLiker: boolean }
}

export type DropdownActionsUserPrivateFragment = {
  __typename?: 'User'
  id: string
  isBlocked: boolean
}

export type UserFollowerPublicQueryVariables = Exact<{
  userName: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type UserFollowerPublicQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    displayName?: string | null
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      profileCover?: string | null
    }
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    followers: {
      __typename?: 'UserConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'UserEdge'
        cursor: string
        node: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          isFollower: boolean
          isFollowee: boolean
          info: {
            __typename?: 'UserInfo'
            description?: string | null
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
        }
      }> | null
    }
  } | null
}

export type UserFollowerPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type UserFollowerPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | {
        __typename?: 'User'
        id: string
        isFollower: boolean
        isFollowee: boolean
        status?: { __typename?: 'UserStatus'; state: UserState } | null
      }
    | { __typename?: 'WritingChallenge'; id: string }
  > | null
}

export type UserFollowingCirclesPublicQueryVariables = Exact<{
  userName: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type UserFollowingCirclesPublicQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    info: {
      __typename?: 'UserInfo'
      profileCover?: string | null
      description?: string | null
    }
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    following: {
      __typename?: 'Following'
      circles: {
        __typename?: 'CircleConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'CircleEdge'
          cursor: string
          node: {
            __typename?: 'Circle'
            id: string
            name: string
            displayName: string
            description?: string | null
            avatar?: string | null
            members: { __typename?: 'MemberConnection'; totalCount: number }
            works: { __typename?: 'ArticleConnection'; totalCount: number }
          }
        }> | null
      }
    }
  } | null
}

export type UserSubscriptionsQueryVariables = Exact<{
  userName: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type UserSubscriptionsQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    info: {
      __typename?: 'UserInfo'
      profileCover?: string | null
      description?: string | null
    }
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    subscribedCircles: {
      __typename?: 'CircleConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'CircleEdge'
        cursor: string
        node: {
          __typename?: 'Circle'
          id: string
          name: string
          displayName: string
          description?: string | null
          avatar?: string | null
          members: { __typename?: 'MemberConnection'; totalCount: number }
          works: { __typename?: 'ArticleConnection'; totalCount: number }
        }
      }> | null
    }
  } | null
}

export type UserFollowingUsersPublicQueryVariables = Exact<{
  userName: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type UserFollowingUsersPublicQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    info: {
      __typename?: 'UserInfo'
      profileCover?: string | null
      description?: string | null
    }
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    following: {
      __typename?: 'Following'
      users: {
        __typename?: 'UserConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'UserEdge'
          cursor: string
          node: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            isFollower: boolean
            isFollowee: boolean
            info: {
              __typename?: 'UserInfo'
              description?: string | null
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
              cryptoWallet?: {
                __typename?: 'CryptoWallet'
                id: string
                address: string
                hasNFTs: boolean
              } | null
            }
            status?: { __typename?: 'UserStatus'; state: UserState } | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
          }
        }> | null
      }
    }
  } | null
}

export type UserFollowingUsersPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type UserFollowingUsersPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | { __typename?: 'Moment'; id: string }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | {
        __typename?: 'User'
        id: string
        isFollower: boolean
        isFollowee: boolean
        status?: { __typename?: 'UserStatus'; state: UserState } | null
      }
    | { __typename?: 'WritingChallenge'; id: string }
  > | null
}

export type ProfileUserPublicFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  liker: { __typename?: 'Liker'; civicLiker: boolean }
  info: {
    __typename?: 'UserInfo'
    description?: string | null
    profileCover?: string | null
    ethAddress?: string | null
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    cryptoWallet?: {
      __typename?: 'CryptoWallet'
      id: string
      address: string
      hasNFTs: boolean
    } | null
  }
  articles: { __typename?: 'ArticleConnection'; totalCount: number }
  following: {
    __typename?: 'Following'
    users: { __typename?: 'UserConnection'; totalCount: number }
  }
  followers: { __typename?: 'UserConnection'; totalCount: number }
  status?: {
    __typename?: 'UserStatus'
    state: UserState
    articleCount: number
    momentCount: number
  } | null
  ownCircles?: Array<{
    __typename?: 'Circle'
    id: string
    name: string
    displayName: string
    description?: string | null
    avatar?: string | null
    owner: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      status?: { __typename?: 'UserStatus'; state: UserState } | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
        cryptoWallet?: {
          __typename?: 'CryptoWallet'
          id: string
          address: string
          hasNFTs: boolean
        } | null
      }
    }
    members: { __typename?: 'MemberConnection'; totalCount: number }
    works: { __typename?: 'ArticleConnection'; totalCount: number }
    prices?: Array<{
      __typename?: 'Price'
      amount: number
      currency: TransactionCurrency
    }> | null
  }> | null
  userCollections: { __typename?: 'CollectionConnection'; totalCount: number }
}

export type ProfileUserPrivateFragment = {
  __typename?: 'User'
  id: string
  isFollower: boolean
  isFollowee: boolean
  isBlocked: boolean
  ownCircles?: Array<{
    __typename?: 'Circle'
    id: string
    isMember: boolean
    invitedBy?: {
      __typename?: 'Invitation'
      id: string
      state: InvitationState
      freePeriod: number
    } | null
  }> | null
  status?: { __typename?: 'UserStatus'; state: UserState } | null
}

export type UserProfileUserPublicQueryVariables = Exact<{
  userName: Scalars['String']['input']
}>

export type UserProfileUserPublicQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    isFollower: boolean
    isFollowee: boolean
    isBlocked: boolean
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      profileCover?: string | null
      ethAddress?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
    articles: { __typename?: 'ArticleConnection'; totalCount: number }
    following: {
      __typename?: 'Following'
      users: { __typename?: 'UserConnection'; totalCount: number }
    }
    followers: { __typename?: 'UserConnection'; totalCount: number }
    status?: {
      __typename?: 'UserStatus'
      state: UserState
      articleCount: number
      momentCount: number
    } | null
    ownCircles?: Array<{
      __typename?: 'Circle'
      id: string
      name: string
      displayName: string
      description?: string | null
      avatar?: string | null
      isMember: boolean
      owner: {
        __typename?: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        avatar?: string | null
        status?: { __typename?: 'UserStatus'; state: UserState } | null
        liker: { __typename?: 'Liker'; civicLiker: boolean }
        info: {
          __typename?: 'UserInfo'
          badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          cryptoWallet?: {
            __typename?: 'CryptoWallet'
            id: string
            address: string
            hasNFTs: boolean
          } | null
        }
      }
      members: { __typename?: 'MemberConnection'; totalCount: number }
      works: { __typename?: 'ArticleConnection'; totalCount: number }
      prices?: Array<{
        __typename?: 'Price'
        amount: number
        currency: TransactionCurrency
      }> | null
      invitedBy?: {
        __typename?: 'Invitation'
        id: string
        state: InvitationState
        freePeriod: number
      } | null
    }> | null
    userCollections: { __typename?: 'CollectionConnection'; totalCount: number }
  } | null
}

export type UserProfileUserPrivateQueryVariables = Exact<{
  userName: Scalars['String']['input']
}>

export type UserProfileUserPrivateQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    isFollower: boolean
    isFollowee: boolean
    isBlocked: boolean
    ownCircles?: Array<{
      __typename?: 'Circle'
      id: string
      isMember: boolean
      invitedBy?: {
        __typename?: 'Invitation'
        id: string
        state: InvitationState
        freePeriod: number
      } | null
    }> | null
    status?: { __typename?: 'UserStatus'; state: UserState } | null
  } | null
}

export type TabsUserFragment = {
  __typename?: 'User'
  id: string
  status?: {
    __typename?: 'UserStatus'
    articleCount: number
    momentCount: number
  } | null
  userCollections: { __typename?: 'CollectionConnection'; totalCount: number }
}

export type UnpinArticleMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UnpinArticleMutation = {
  __typename?: 'Mutation'
  editArticle: { __typename?: 'Article'; id: string; pinned: boolean }
}

export type UnpinCollectionMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UnpinCollectionMutation = {
  __typename?: 'Mutation'
  putCollection: { __typename?: 'Collection'; id: string; pinned: boolean }
}

export type PinnedWorksUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  pinnedWorks: Array<
    | {
        __typename?: 'Article'
        slug: string
        shortHash: string
        summary: string
        id: string
        pinned: boolean
        title: string
        cover?: string | null
        author: { __typename?: 'User'; id: string; userName?: string | null }
      }
    | {
        __typename?: 'Collection'
        id: string
        pinned: boolean
        title: string
        cover?: string | null
        articles: { __typename?: 'ArticleConnection'; totalCount: number }
      }
  >
}

export type UserPinnedWorksQueryVariables = Exact<{
  userName: Scalars['String']['input']
}>

export type UserPinnedWorksQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    userName?: string | null
    pinnedWorks: Array<
      | {
          __typename?: 'Article'
          slug: string
          shortHash: string
          summary: string
          id: string
          pinned: boolean
          title: string
          cover?: string | null
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | {
          __typename?: 'Collection'
          id: string
          pinned: boolean
          title: string
          cover?: string | null
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
    >
  } | null
}

export type WritingsUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  info: {
    __typename?: 'UserInfo'
    description?: string | null
    profileCover?: string | null
  }
  writings: {
    __typename?: 'WritingConnection'
    totalCount: number
    pageInfo: {
      __typename?: 'PageInfo'
      startCursor?: string | null
      endCursor?: string | null
      hasNextPage: boolean
    }
    edges?: Array<{
      __typename?: 'WritingEdge'
      cursor: string
      node:
        | {
            __typename: 'Article'
            id: string
            createdAt: any
            wordCount?: number | null
            title: string
            slug: string
            shortHash: string
            displayCover?: string | null
            summary: string
            readTime: number
            bookmarked: boolean
            pinned: boolean
            revisionCount: number
            artileState: ArticleState
            articleState: ArticleState
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
            access: {
              __typename?: 'ArticleAccess'
              type: ArticleAccessType
              circle?: {
                __typename?: 'Circle'
                id: string
                name: string
                displayName: string
              } | null
            }
            collections: {
              __typename?: 'CollectionConnection'
              edges?: Array<{
                __typename?: 'CollectionEdge'
                node: {
                  __typename?: 'Collection'
                  id: string
                  title: string
                  articles: {
                    __typename?: 'ArticleConnection'
                    totalCount: number
                  }
                }
              }> | null
            }
            campaigns: Array<{
              __typename?: 'ArticleCampaign'
              campaign: {
                __typename?: 'WritingChallenge'
                id: string
                name: string
                shortHash: string
                nameZhHant: string
                nameZhHans: string
                nameEn: string
              }
              stage?: { __typename?: 'CampaignStage'; id: string } | null
            }>
            tags?: Array<{
              __typename?: 'Tag'
              id: string
              content: string
            }> | null
            donations: {
              __typename?: 'ArticleDonationConnection'
              totalCount: number
            }
            likesReceived: {
              __typename?: 'AppreciationConnection'
              totalCount: number
            }
            donationsDialog: {
              __typename?: 'ArticleDonationConnection'
              totalCount: number
            }
          }
        | { __typename: 'Comment' }
        | {
            __typename: 'Moment'
            id: string
            createdAt: any
            shortHash: string
            state: MomentState
            content?: string | null
            commentCount: number
            likeCount: number
            liked: boolean
            momentState: MomentState
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }
            assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
            commentedFollowees: Array<{
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              avatar?: string | null
              status?: { __typename?: 'UserStatus'; state: UserState } | null
              liker: { __typename?: 'Liker'; civicLiker: boolean }
              info: {
                __typename?: 'UserInfo'
                badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
                cryptoWallet?: {
                  __typename?: 'CryptoWallet'
                  id: string
                  address: string
                  hasNFTs: boolean
                } | null
              }
            }>
          }
    }> | null
  }
  status?: { __typename?: 'UserStatus'; state: UserState } | null
  pinnedWorks: Array<
    | {
        __typename?: 'Article'
        slug: string
        shortHash: string
        summary: string
        id: string
        pinned: boolean
        title: string
        cover?: string | null
        author: { __typename?: 'User'; id: string; userName?: string | null }
      }
    | {
        __typename?: 'Collection'
        id: string
        pinned: boolean
        title: string
        cover?: string | null
        articles: { __typename?: 'ArticleConnection'; totalCount: number }
      }
  >
}

export type ViewerWritingsQueryVariables = Exact<{
  userName: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type ViewerWritingsQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      profileCover?: string | null
    }
    writings: {
      __typename?: 'WritingConnection'
      totalCount: number
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'WritingEdge'
        cursor: string
        node:
          | {
              __typename: 'Article'
              id: string
              createdAt: any
              wordCount?: number | null
              title: string
              slug: string
              shortHash: string
              displayCover?: string | null
              summary: string
              readTime: number
              bookmarked: boolean
              pinned: boolean
              revisionCount: number
              artileState: ArticleState
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
              access: {
                __typename?: 'ArticleAccess'
                type: ArticleAccessType
                circle?: {
                  __typename?: 'Circle'
                  id: string
                  name: string
                  displayName: string
                } | null
              }
              collections: {
                __typename?: 'CollectionConnection'
                edges?: Array<{
                  __typename?: 'CollectionEdge'
                  node: {
                    __typename?: 'Collection'
                    id: string
                    title: string
                    articles: {
                      __typename?: 'ArticleConnection'
                      totalCount: number
                    }
                  }
                }> | null
              }
              campaigns: Array<{
                __typename?: 'ArticleCampaign'
                campaign: {
                  __typename?: 'WritingChallenge'
                  id: string
                  name: string
                  shortHash: string
                  nameZhHant: string
                  nameZhHans: string
                  nameEn: string
                }
                stage?: { __typename?: 'CampaignStage'; id: string } | null
              }>
              tags?: Array<{
                __typename?: 'Tag'
                id: string
                content: string
              }> | null
              donations: {
                __typename?: 'ArticleDonationConnection'
                totalCount: number
              }
              likesReceived: {
                __typename?: 'AppreciationConnection'
                totalCount: number
              }
              donationsDialog: {
                __typename?: 'ArticleDonationConnection'
                totalCount: number
              }
            }
          | { __typename: 'Comment' }
          | {
              __typename: 'Moment'
              id: string
              createdAt: any
              shortHash: string
              state: MomentState
              content?: string | null
              commentCount: number
              likeCount: number
              liked: boolean
              momentState: MomentState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
              assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
              commentedFollowees: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }>
            }
      }> | null
    }
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    pinnedWorks: Array<
      | {
          __typename?: 'Article'
          slug: string
          shortHash: string
          summary: string
          id: string
          pinned: boolean
          title: string
          cover?: string | null
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | {
          __typename?: 'Collection'
          id: string
          pinned: boolean
          title: string
          cover?: string | null
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
    >
  } | null
}

export type UserWritingsPublicQueryVariables = Exact<{
  userName: Scalars['String']['input']
  after?: InputMaybe<Scalars['String']['input']>
}>

export type UserWritingsPublicQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      profileCover?: string | null
    }
    writings: {
      __typename?: 'WritingConnection'
      totalCount: number
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'WritingEdge'
        cursor: string
        node:
          | {
              __typename: 'Article'
              id: string
              createdAt: any
              wordCount?: number | null
              title: string
              slug: string
              shortHash: string
              displayCover?: string | null
              summary: string
              readTime: number
              bookmarked: boolean
              pinned: boolean
              revisionCount: number
              artileState: ArticleState
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
              access: {
                __typename?: 'ArticleAccess'
                type: ArticleAccessType
                circle?: {
                  __typename?: 'Circle'
                  id: string
                  name: string
                  displayName: string
                } | null
              }
              collections: {
                __typename?: 'CollectionConnection'
                edges?: Array<{
                  __typename?: 'CollectionEdge'
                  node: {
                    __typename?: 'Collection'
                    id: string
                    title: string
                    articles: {
                      __typename?: 'ArticleConnection'
                      totalCount: number
                    }
                  }
                }> | null
              }
              campaigns: Array<{
                __typename?: 'ArticleCampaign'
                campaign: {
                  __typename?: 'WritingChallenge'
                  id: string
                  name: string
                  shortHash: string
                  nameZhHant: string
                  nameZhHans: string
                  nameEn: string
                }
                stage?: { __typename?: 'CampaignStage'; id: string } | null
              }>
              tags?: Array<{
                __typename?: 'Tag'
                id: string
                content: string
              }> | null
              donations: {
                __typename?: 'ArticleDonationConnection'
                totalCount: number
              }
              likesReceived: {
                __typename?: 'AppreciationConnection'
                totalCount: number
              }
              donationsDialog: {
                __typename?: 'ArticleDonationConnection'
                totalCount: number
              }
            }
          | { __typename: 'Comment' }
          | {
              __typename: 'Moment'
              id: string
              createdAt: any
              shortHash: string
              state: MomentState
              content?: string | null
              commentCount: number
              likeCount: number
              liked: boolean
              momentState: MomentState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }
              assets: Array<{ __typename?: 'Asset'; id: string; path: string }>
              commentedFollowees: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                status?: { __typename?: 'UserStatus'; state: UserState } | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                  cryptoWallet?: {
                    __typename?: 'CryptoWallet'
                    id: string
                    address: string
                    hasNFTs: boolean
                  } | null
                }
              }>
            }
      }> | null
    }
    status?: { __typename?: 'UserStatus'; state: UserState } | null
    pinnedWorks: Array<
      | {
          __typename?: 'Article'
          slug: string
          shortHash: string
          summary: string
          id: string
          pinned: boolean
          title: string
          cover?: string | null
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | {
          __typename?: 'Collection'
          id: string
          pinned: boolean
          title: string
          cover?: string | null
          articles: { __typename?: 'ArticleConnection'; totalCount: number }
        }
    >
  } | null
}

export type UserWritingsPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type UserWritingsPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string; bookmarked: boolean }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | {
        __typename?: 'Moment'
        id: string
        liked: boolean
        commentedFollowees: Array<{
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          status?: { __typename?: 'UserStatus'; state: UserState } | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            cryptoWallet?: {
              __typename?: 'CryptoWallet'
              id: string
              address: string
              hasNFTs: boolean
            } | null
          }
        }>
      }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
  > | null
}

export type UserMomentsReactiveDataQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input']
}>

export type UserMomentsReactiveDataQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'ArticleVersion'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Collection'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'CurationChannel'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'IcymiTopic'; id: string }
    | {
        __typename?: 'Moment'
        likeCount: number
        commentCount: number
        id: string
      }
    | { __typename?: 'Report'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'TopicChannel'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'WritingChallenge'; id: string }
  > | null
}
