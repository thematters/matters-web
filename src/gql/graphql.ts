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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  first_Int_min_0: any
  random_Int_min_0_max_49: any
  email_String_format_email: any
  email_String_NotNull_format_email: any
  link_String_format_uri: any
  amount_Float_NotNull_exclusiveMin_0: any
  amount_Int_NotNull_min_1: any
  newEmail_String_NotNull_format_email: any
  oldEmail_String_NotNull_format_email: any
  replyToDonator_String_maxLength_140: any
  requestForDonation_String_maxLength_140: any
  freePeriod_Int_NotNull_exclusiveMin_0: any
  Upload: any
  amount_Float_exclusiveMin_0: any
  website_String_format_uri: any
  redirectUrl_String_format_uri: any
  boost_Float_NotNull_min_0: any
  url_String_format_uri: any
  banDays_Int_exclusiveMin_0: any
}

export type Query = {
  __typename?: 'Query'
  article?: Maybe<Article>
  circle?: Maybe<Circle>
  clientInfo: ClientInfo
  clientPreference: ClientPreference
  commentDraft: CommentDraft
  exchangeRates?: Maybe<Array<ExchangeRate>>
  frequentSearch?: Maybe<Array<Scalars['String']>>
  lastFetchRandom: LastFetchRandom
  node?: Maybe<Node>
  nodes?: Maybe<Array<Node>>
  oauthClient?: Maybe<OAuthClient>
  official: Official
  oss: Oss
  search: SearchResultConnection
  user?: Maybe<User>
  viewer?: Maybe<User>
}

export type QueryArticleArgs = {
  input: ArticleInput
}

export type QueryCircleArgs = {
  input: CircleInput
}

export type QueryCommentDraftArgs = {
  input: CommentDraftInput
}

export type QueryExchangeRatesArgs = {
  input?: InputMaybe<ExchangeRatesInput>
}

export type QueryFrequentSearchArgs = {
  input: FrequentSearchInput
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

export type ArticleInput = {
  mediaHash: Scalars['String']
}

/**
 * This type contains metadata, content, hash and related data of an article. If you
 * want information about article's comments. Please check Comment type.
 */
export type Article = Node & {
  __typename?: 'Article'
  /** Access related fields on circle */
  access: ArticleAccess
  /** Number represents how many times per user can appreciate this article. */
  appreciateLeft: Scalars['Int']
  /** Limit the nuhmber of appreciate per user. */
  appreciateLimit: Scalars['Int']
  /** Appreciations history of this article. */
  appreciationsReceived: AppreciationConnection
  /** Total number of appreciations recieved of this article. */
  appreciationsReceivedTotal: Scalars['Int']
  /** List of assets are belonged to this article (Only the author can access currently). */
  assets: Array<Asset>
  /** Author of this article. */
  author: User
  /** Available translation languages. */
  availableTranslations?: Maybe<Array<UserLanguage>>
  /** This value determines if current viewer can SuperLike or not. */
  canSuperLike: Scalars['Boolean']
  /** List of articles which added this article into their collections. */
  collectedBy: ArticleConnection
  /** List of articles added into this article' collection. */
  collection: ArticleConnection
  /** The counting number of comments. */
  commentCount: Scalars['Int']
  /** List of comments of this article. */
  comments: CommentConnection
  /** Content of this article. */
  content: Scalars['String']
  /** Article cover's link. */
  cover?: Maybe<Scalars['String']>
  /** Time of this article was created. */
  createdAt: Scalars['DateTime']
  /** IPFS hash of this article. */
  dataHash: Scalars['String']
  /**
   * Drafts linked to this article.
   * @deprecated Use Article.newestUnpublishedDraft or Article.newestPublishedDraft instead
   */
  drafts?: Maybe<Array<Draft>>
  /** List of featured comments of this article. */
  featuredComments: CommentConnection
  /** This value determines if current viewer has appreciated or not. */
  hasAppreciate: Scalars['Boolean']
  /** Unique ID of this article */
  id: Scalars['ID']
  /** the iscnId if published to ISCN */
  iscnId?: Maybe<Scalars['String']>
  /** Original language of content */
  language?: Maybe<Scalars['String']>
  /** License Type */
  license: ArticleLicenseType
  /** Media hash, composed of cid encoding, of this article. */
  mediaHash: Scalars['String']
  /** Newest published draft linked to this article. */
  newestPublishedDraft: Draft
  /** Newest unpublished draft linked to this article. */
  newestUnpublishedDraft: Draft
  /**
   * #############
   *      OSS    #
   * #############
   */
  oss: ArticleOss
  /** The number determines how many comments can be set as pinned comment. */
  pinCommentLeft: Scalars['Int']
  /** The number determines how many pinned comments can be set. */
  pinCommentLimit: Scalars['Int']
  /** List of pinned comments. */
  pinnedComments?: Maybe<Array<Comment>>
  /** Cumulative reading time in seconds */
  readTime: Scalars['Float']
  /** Related articles to this article. */
  relatedArticles: ArticleConnection
  /** Donation-related articles to this article. */
  relatedDonationArticles: ArticleConnection
  remark?: Maybe<Scalars['String']>
  /** creator message after support */
  replyToDonator?: Maybe<Scalars['String']>
  /** creator message asking for support */
  requestForDonation?: Maybe<Scalars['String']>
  /** The counting number of this article. */
  responseCount: Scalars['Int']
  /** List of responses of a article. */
  responses: ResponseConnection
  /** Time of this article was revised. */
  revisedAt?: Maybe<Scalars['DateTime']>
  /** Revision Count */
  revisionCount: Scalars['Int']
  /** Slugified article title. */
  slug: Scalars['String']
  /** State of this article. */
  state: ArticleState
  /** This value determines if this article is an author selected article or not. */
  sticky: Scalars['Boolean']
  /** This value determines if current Viewer has subscribed of not. */
  subscribed: Scalars['Boolean']
  /** Subscribers of this article. */
  subscribers: UserConnection
  /** A short summary for this article. */
  summary: Scalars['String']
  /** This value determines if the summary is customized or not. */
  summaryCustomized: Scalars['Boolean']
  /** Tags attached to this article. */
  tags?: Maybe<Array<Tag>>
  /** Article title. */
  title: Scalars['String']
  /** The number represents how popular is this article. */
  topicScore?: Maybe<Scalars['Int']>
  /** Transactions history of this article. */
  transactionsReceivedBy: UserConnection
  /** Translation of article title and content. */
  translation?: Maybe<ArticleTranslation>
  /** Word count of this article. */
  wordCount?: Maybe<Scalars['Int']>
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
export type ArticleCollectedByArgs = {
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
export type ArticleCommentsArgs = {
  input: CommentsInput
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
export type ArticleSubscribersArgs = {
  input: ConnectionArgs
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
  input?: InputMaybe<TranslationArgs>
}

export type Node = {
  id: Scalars['ID']
}

export type ArticleAccess = {
  __typename?: 'ArticleAccess'
  circle?: Maybe<Circle>
  secret?: Maybe<Scalars['String']>
  type: ArticleAccessType
}

export type Circle = Node & {
  __typename?: 'Circle'
  /** Analytics dashboard. */
  analytics: CircleAnalytics
  /**
   * Circle avatar's link.
   * @deprecated No longer in use
   */
  avatar?: Maybe<Scalars['String']>
  /** Comments broadcasted by Circle owner. */
  broadcast: CommentConnection
  /**
   * Circle cover's link.
   * @deprecated No longer in use
   */
  cover?: Maybe<Scalars['String']>
  /**
   * Created time.
   * @deprecated No longer in use
   */
  createdAt: Scalars['DateTime']
  /** A short description of this Circle. */
  description?: Maybe<Scalars['String']>
  /** Comments made by Circle member. */
  discussion: CommentConnection
  /** Discussion (include replies) count of this circle. */
  discussionCount: Scalars['Int']
  /** Discussion (exclude replies) count of this circle. */
  discussionThreadCount: Scalars['Int']
  /**
   * Human readable name of this Circle.
   * @deprecated No longer in use
   */
  displayName: Scalars['String']
  /**
   * List of Circle follower.
   * @deprecated No longer in use
   */
  followers: UserConnection
  /** Unique ID. */
  id: Scalars['ID']
  /** Invitation used by current viewer. */
  invitedBy?: Maybe<Invitation>
  /** Invitations belonged to this Circle. */
  invites: Invites
  /**
   * This value determines if current viewer is following Circle or not.
   * @deprecated No longer in use
   */
  isFollower: Scalars['Boolean']
  /**
   * This value determines if current viewer is Member or not.
   * @deprecated No longer in use
   */
  isMember: Scalars['Boolean']
  /**
   * List of Circle member.
   * @deprecated No longer in use
   */
  members: MemberConnection
  /**
   * Slugified name of this Circle.
   * @deprecated No longer in use
   */
  name: Scalars['String']
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
  updatedAt: Scalars['DateTime']
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

export type CircleContentAnalytics = {
  __typename?: 'CircleContentAnalytics'
  paywall?: Maybe<Array<CircleContentAnalyticsDatum>>
  public?: Maybe<Array<CircleContentAnalyticsDatum>>
}

export type CircleContentAnalyticsDatum = {
  __typename?: 'CircleContentAnalyticsDatum'
  node: Article
  readCount: Scalars['Int']
}

export type CircleFollowerAnalytics = {
  __typename?: 'CircleFollowerAnalytics'
  /** current follower count */
  current: Scalars['Int']
  /** the percentage of follower count in reader count of circle articles */
  followerPercentage: Scalars['Float']
  /** subscriber count history of last 4 months */
  history: Array<MonthlyDatum>
}

export type MonthlyDatum = {
  __typename?: 'MonthlyDatum'
  date: Scalars['DateTime']
  value: Scalars['Float']
}

export type CircleIncomeAnalytics = {
  __typename?: 'CircleIncomeAnalytics'
  /** income history of last 4 months */
  history: Array<MonthlyDatum>
  /** income of next month */
  nextMonth: Scalars['Float']
  /** income of this month */
  thisMonth: Scalars['Float']
  /** total income of all time */
  total: Scalars['Float']
}

export type CircleSubscriberAnalytics = {
  __typename?: 'CircleSubscriberAnalytics'
  /** current invitee count */
  currentInvitee: Scalars['Int']
  /** current subscriber count */
  currentSubscriber: Scalars['Int']
  /** invitee count history of last 4 months */
  inviteeHistory: Array<MonthlyDatum>
  /** subscriber count history of last 4 months */
  subscriberHistory: Array<MonthlyDatum>
}

export type CommentsInput = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<CommentsFilter>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  includeAfter?: InputMaybe<Scalars['Boolean']>
  includeBefore?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<CommentSort>
}

export type CommentsFilter = {
  author?: InputMaybe<Scalars['ID']>
  parentComment?: InputMaybe<Scalars['ID']>
  state?: InputMaybe<CommentState>
}

/** Enums for comment state. */
export enum CommentState {
  Active = 'active',
  Archived = 'archived',
  Banned = 'banned',
  Collapsed = 'collapsed',
}

/** Enums for sorting comments by time. */
export enum CommentSort {
  Newest = 'newest',
  Oldest = 'oldest',
}

export type CommentConnection = Connection & {
  __typename?: 'CommentConnection'
  edges?: Maybe<Array<CommentEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type Connection = {
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['String']>
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
}

export type CommentEdge = {
  __typename?: 'CommentEdge'
  cursor: Scalars['String']
  node: Comment
}

/** This type contains content, author, descendant comments and related data of a comment. */
export type Comment = Node & {
  __typename?: 'Comment'
  /** Author of this comment. */
  author: User
  /** Descendant comments of this comment. */
  comments: CommentConnection
  /** Content of this comment. */
  content?: Maybe<Scalars['String']>
  /** Time of this comment was created. */
  createdAt: Scalars['DateTime']
  /**
   * The counting number of downvotes.
   * @deprecated No longer in use in querying
   */
  downvotes: Scalars['Int']
  /** This value determines this comment is from article donator or not. */
  fromDonator: Scalars['Boolean']
  /** Unique ID of this comment. */
  id: Scalars['ID']
  /** The value determines current user's vote. */
  myVote?: Maybe<Vote>
  /** Current comment belongs to which Node. */
  node: Node
  /** Parent comment of this comment. */
  parentComment?: Maybe<Comment>
  /** This value determines this comment is pinned or not. */
  pinned: Scalars['Boolean']
  remark?: Maybe<Scalars['String']>
  /** A Comment that this comment replied to. */
  replyTo?: Maybe<Comment>
  /** State of this comment. */
  state: CommentState
  type: CommentType
  /** The counting number of upvotes. */
  upvotes: Scalars['Int']
}

/** This type contains content, author, descendant comments and related data of a comment. */
export type CommentCommentsArgs = {
  input: CommentCommentsInput
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
  avatar?: Maybe<Scalars['String']>
  /** Users that blocked by current user. */
  blockList: UserConnection
  /** Articles current user commented on */
  commentedArticles: ArticleConnection
  /** Display name on user profile, can be duplicated. */
  displayName?: Maybe<Scalars['String']>
  /** Drafts authored by current user. */
  drafts: DraftConnection
  /** Followers of this user. */
  followers: UserConnection
  /** Following contents of this user. */
  following: Following
  /** Global id of an user. */
  id: Scalars['ID']
  /** User information. */
  info: UserInfo
  /** Whether current user is blocked by viewer. */
  isBlocked: Scalars['Boolean']
  /** Whether current user is blocking viewer. */
  isBlocking: Scalars['Boolean']
  /** Whether viewer is following current user. */
  isFollowee: Scalars['Boolean']
  /** Whether current user is following viewer. */
  isFollower: Scalars['Boolean']
  /** Liker info of current user */
  liker: Liker
  /** LikerID of LikeCoin, being used by LikeCoin OAuth */
  likerId?: Maybe<Scalars['String']>
  /** Tags owned and maintained by current user. */
  maintainedTags: TagConnection
  notices: NoticeConnection
  /**
   * #############
   *      OSS    #
   * #############
   */
  oss: UserOss
  /** Circles belong to current user. */
  ownCircles?: Maybe<Array<Circle>>
  /** Payment pointer that resolves to Open Payments endpoints */
  paymentPointer?: Maybe<Scalars['String']>
  /** Tags pinned by current user. */
  pinnedTags: TagConnection
  /** Article recommendations for current user. */
  recommendation: Recommendation
  remark?: Maybe<Scalars['String']>
  /** User settings. */
  settings: UserSettings
  /** Status of current user. */
  status?: Maybe<UserStatus>
  /** Circles whiches user has subscribed. */
  subscribedCircles: CircleConnection
  /** Artilces current user subscribed to. */
  subscriptions: ArticleConnection
  /** Tags by by usage order of current user. */
  tags: TagConnection
  /** Topics created by current user. */
  topics: TopicConnection
  /** Global unique user name of a user. */
  userName?: Maybe<Scalars['String']>
  /** User Wallet */
  wallet: Wallet
}

export type UserArticlesArgs = {
  input: ConnectionArgs
}

export type UserBlockListArgs = {
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

export type UserMaintainedTagsArgs = {
  input: ConnectionArgs
}

export type UserNoticesArgs = {
  input: ConnectionArgs
}

export type UserPinnedTagsArgs = {
  input: ConnectionArgs
}

export type UserSubscribedCirclesArgs = {
  input: ConnectionArgs
}

export type UserSubscriptionsArgs = {
  input: ConnectionArgs
}

export type UserTagsArgs = {
  input: ConnectionArgs
}

export type UserTopicsArgs = {
  input: TopicInput
}

export type UserActivity = {
  __typename?: 'UserActivity'
  /** Appreciations current user received. */
  appreciationsReceived: AppreciationConnection
  /** Total number of appreciation current user received. */
  appreciationsReceivedTotal: Scalars['Int']
  /** Appreciations current user gave. */
  appreciationsSent: AppreciationConnection
  /** Total number of appreciation current user gave. */
  appreciationsSentTotal: Scalars['Int']
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

export type ConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<FilterInput>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  oss?: InputMaybe<Scalars['Boolean']>
}

export type FilterInput = {
  /** Used in RecommendInput */
  followed?: InputMaybe<Scalars['Boolean']>
  inRangeEnd?: InputMaybe<Scalars['DateTime']>
  inRangeStart?: InputMaybe<Scalars['DateTime']>
  /** Used in User.topics */
  public?: InputMaybe<Scalars['Boolean']>
  /** index of list, min: 0, max: 49 */
  random?: InputMaybe<Scalars['random_Int_min_0_max_49']>
  /** Used in User Articles filter, by tags or by time range, or both */
  tagIds?: InputMaybe<Array<Scalars['ID']>>
}

export type AppreciationConnection = Connection & {
  __typename?: 'AppreciationConnection'
  edges?: Maybe<Array<AppreciationEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type AppreciationEdge = {
  __typename?: 'AppreciationEdge'
  cursor: Scalars['String']
  node: Appreciation
}

export type Appreciation = {
  __typename?: 'Appreciation'
  amount: Scalars['Int']
  content: Scalars['String']
  /** Timestamp of appreciation. */
  createdAt: Scalars['DateTime']
  purpose: AppreciationPurpose
  /** Recipient of appreciation. */
  recipient: User
  /** Sender of appreciation. */
  sender?: Maybe<User>
  /** Object that appreciation is meant for. */
  target?: Maybe<Article>
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

export type ReadHistoryConnection = Connection & {
  __typename?: 'ReadHistoryConnection'
  edges?: Maybe<Array<ReadHistoryEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ReadHistoryEdge = {
  __typename?: 'ReadHistoryEdge'
  cursor: Scalars['String']
  node: ReadHistory
}

export type ReadHistory = {
  __typename?: 'ReadHistory'
  article: Article
  readAt: Scalars['DateTime']
}

export type RecentSearchConnection = Connection & {
  __typename?: 'RecentSearchConnection'
  edges?: Maybe<Array<RecentSearchEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type RecentSearchEdge = {
  __typename?: 'RecentSearchEdge'
  cursor: Scalars['String']
  node: Scalars['String']
}

export type UserAnalytics = {
  __typename?: 'UserAnalytics'
  /** Top donators of current user. */
  topDonators: TopDonatorConnection
}

export type UserAnalyticsTopDonatorsArgs = {
  input: TopDonatorInput
}

export type TopDonatorInput = {
  after?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<TopDonatorFilter>
  first?: InputMaybe<Scalars['Int']>
}

export type TopDonatorFilter = {
  inRangeEnd?: InputMaybe<Scalars['DateTime']>
  inRangeStart?: InputMaybe<Scalars['DateTime']>
}

export type TopDonatorConnection = Connection & {
  __typename?: 'TopDonatorConnection'
  edges?: Maybe<Array<TopDonatorEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type TopDonatorEdge = {
  __typename?: 'TopDonatorEdge'
  cursor: Scalars['String']
  donationCount: Scalars['Int']
  node: User
}

export type ArticleConnection = Connection & {
  __typename?: 'ArticleConnection'
  edges?: Maybe<Array<ArticleEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ArticleEdge = {
  __typename?: 'ArticleEdge'
  cursor: Scalars['String']
  node: Article
}

export type UserConnection = Connection & {
  __typename?: 'UserConnection'
  edges?: Maybe<Array<UserEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserEdge = {
  __typename?: 'UserEdge'
  cursor: Scalars['String']
  node: User
}

export type DraftConnection = Connection & {
  __typename?: 'DraftConnection'
  edges?: Maybe<Array<DraftEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type DraftEdge = {
  __typename?: 'DraftEdge'
  cursor: Scalars['String']
  node: Draft
}

/** This type contains content, collections, assets and related data of a draft. */
export type Draft = Node & {
  __typename?: 'Draft'
  /** Access related fields on circle */
  access: DraftAccess
  /** Published article */
  article?: Maybe<Article>
  /** List of assets are belonged to this draft. */
  assets: Array<Asset>
  /** Collection list of this draft. */
  collection: ArticleConnection
  /** Content of this draft. */
  content?: Maybe<Scalars['String']>
  /** Draft's cover link. */
  cover?: Maybe<Scalars['String']>
  /** Time of this draft was created. */
  createdAt: Scalars['DateTime']
  /** Unique ID of this draft. */
  id: Scalars['ID']
  /** whether publish to ISCN */
  iscnPublish?: Maybe<Scalars['Boolean']>
  /** License Type */
  license: ArticleLicenseType
  /** Media hash, composed of cid encoding, of this draft. */
  mediaHash?: Maybe<Scalars['String']>
  /** State of draft during publihsing. */
  publishState: PublishState
  /** creator message after support */
  replyToDonator?: Maybe<Scalars['String']>
  /** creator message asking for support */
  requestForDonation?: Maybe<Scalars['String']>
  /** Slugified draft title. */
  slug: Scalars['String']
  /** Summary of this draft. */
  summary?: Maybe<Scalars['String']>
  /** This value determines if the summary is customized or not. */
  summaryCustomized: Scalars['Boolean']
  /** Tags are attached to this draft. */
  tags?: Maybe<Array<Scalars['String']>>
  /** Draft title. */
  title?: Maybe<Scalars['String']>
  /** Last time of this draft was upadted. */
  updatedAt: Scalars['DateTime']
  /** The counting number of words in this draft. */
  wordCount: Scalars['Int']
}

/** This type contains content, collections, assets and related data of a draft. */
export type DraftCollectionArgs = {
  input: ConnectionArgs
}

export type DraftAccess = {
  __typename?: 'DraftAccess'
  circle?: Maybe<Circle>
  type: ArticleAccessType
}

/** Enums for types of article access */
export enum ArticleAccessType {
  Paywall = 'paywall',
  Public = 'public',
}

/** This type contains type, link and related data of an asset. */
export type Asset = {
  __typename?: 'Asset'
  /** Time of this asset was created. */
  createdAt: Scalars['DateTime']
  /** Unique ID of this Asset. */
  id: Scalars['ID']
  /** Link of this asset. */
  path: Scalars['String']
  /** Types of this asset. */
  type: AssetType
}

/** Enums for asset types. */
export enum AssetType {
  AnnouncementCover = 'announcementCover',
  Avatar = 'avatar',
  CircleAvatar = 'circleAvatar',
  CircleCover = 'circleCover',
  Cover = 'cover',
  Embed = 'embed',
  Embedaudio = 'embedaudio',
  /** img-cached */
  ImgCached = 'imgCached',
  OauthClientAvatar = 'oauthClientAvatar',
  ProfileCover = 'profileCover',
  TagCover = 'tagCover',
  TopicCover = 'topicCover',
}

/** Enums for types of article license */
export enum ArticleLicenseType {
  Arr = 'arr',
  Cc_0 = 'cc_0',
  CcByNcNd_2 = 'cc_by_nc_nd_2',
}

/** Enums for publishing state. */
export enum PublishState {
  Error = 'error',
  Pending = 'pending',
  Published = 'published',
  Unpublished = 'unpublished',
}

export type Following = {
  __typename?: 'Following'
  circles: CircleConnection
  tags: TagConnection
  users: UserConnection
}

export type FollowingCirclesArgs = {
  input: ConnectionArgs
}

export type FollowingTagsArgs = {
  input: ConnectionArgs
}

export type FollowingUsersArgs = {
  input: ConnectionArgs
}

export type CircleConnection = Connection & {
  __typename?: 'CircleConnection'
  edges?: Maybe<Array<CircleEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type CircleEdge = {
  __typename?: 'CircleEdge'
  cursor: Scalars['String']
  node: Circle
}

export type TagConnection = Connection & {
  __typename?: 'TagConnection'
  edges?: Maybe<Array<TagEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type TagEdge = {
  __typename?: 'TagEdge'
  cursor: Scalars['String']
  node: Tag
}

/** This type contains content, count and related data of an article tag. */
export type Tag = Node & {
  __typename?: 'Tag'
  /** List of how many articles were attached with this tag. */
  articles: ArticleConnection
  /** Content of this tag. */
  content: Scalars['String']
  /** Tag's cover link. */
  cover?: Maybe<Scalars['String']>
  /** Time of this tag was created. */
  createdAt: Scalars['DateTime']
  /** Creator of this tag. */
  creator?: Maybe<User>
  deleted: Scalars['Boolean']
  /** Description of this tag. */
  description?: Maybe<Scalars['String']>
  /** Editors of this tag. */
  editors?: Maybe<Array<User>>
  /** Followers of this tag. */
  followers: UserConnection
  /** Unique id of this tag. */
  id: Scalars['ID']
  /** This value determines if current viewer is following or not. */
  isFollower?: Maybe<Scalars['Boolean']>
  /** This value determines if it is official. */
  isOfficial?: Maybe<Scalars['Boolean']>
  /** This value determines if the tag is pinned by current viewer. */
  isPinned?: Maybe<Scalars['Boolean']>
  /** Counts of this tag. */
  numArticles: Scalars['Int']
  numAuthors: Scalars['Int']
  /**
   * #############
   *      OSS    #
   * #############
   */
  oss: TagOss
  /** Owner of this tag. */
  owner?: Maybe<User>
  /** Participants of this tag. */
  participants: UserConnection
  /** Tags recommended based on relations to current tag. */
  recommended: TagConnection
  remark?: Maybe<Scalars['String']>
  /** This value determines if this article is selected by this tag or not. */
  selected: Scalars['Boolean']
}

/** This type contains content, count and related data of an article tag. */
export type TagArticlesArgs = {
  input: TagArticlesInput
}

/** This type contains content, count and related data of an article tag. */
export type TagEditorsArgs = {
  input?: InputMaybe<TagEditorsInput>
}

/** This type contains content, count and related data of an article tag. */
export type TagFollowersArgs = {
  input: ConnectionArgs
}

/** This type contains content, count and related data of an article tag. */
export type TagParticipantsArgs = {
  input: ConnectionArgs
}

/** This type contains content, count and related data of an article tag. */
export type TagRecommendedArgs = {
  input: ConnectionArgs
}

/** This type contains content, count and related data of an article tag. */
export type TagSelectedArgs = {
  input: TagSelectedInput
}

export type TagArticlesInput = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  oss?: InputMaybe<Scalars['Boolean']>
  selected?: InputMaybe<Scalars['Boolean']>
  sortBy?: InputMaybe<TagArticlesSortBy>
}

export enum TagArticlesSortBy {
  ByCreatedAtDesc = 'byCreatedAtDesc',
  ByHottestDesc = 'byHottestDesc',
}

export type TagEditorsInput = {
  excludeAdmin?: InputMaybe<Scalars['Boolean']>
  excludeOwner?: InputMaybe<Scalars['Boolean']>
}

export type TagOss = {
  __typename?: 'TagOSS'
  boost: Scalars['Float']
  score: Scalars['Float']
  selected: Scalars['Boolean']
}

export type TagSelectedInput = {
  id?: InputMaybe<Scalars['ID']>
  mediaHash?: InputMaybe<Scalars['String']>
}

export type UserInfo = {
  __typename?: 'UserInfo'
  /** Timestamp of user agreement. */
  agreeOn?: Maybe<Scalars['DateTime']>
  /** User badges. */
  badges?: Maybe<Array<Badge>>
  /** Timestamp of registration. */
  createdAt?: Maybe<Scalars['DateTime']>
  /** Connected wallet. */
  cryptoWallet?: Maybe<CryptoWallet>
  /** User desciption. */
  description?: Maybe<Scalars['String']>
  /** User email. */
  email?: Maybe<Scalars['email_String_format_email']>
  /** Login address */
  ethAddress?: Maybe<Scalars['String']>
  /** saved tags for showing on profile page, API allows up to 100, front-end lock'ed at lower limit */
  featuredTags?: Maybe<Array<Tag>>
  /** Type of group. */
  group: UserGroup
  /** the ipnsKey (`ipfs.io/ipns/<ipnsKey>/...`) for feed.json / rss.xml / index */
  ipnsKey?: Maybe<Scalars['String']>
  isWalletAuth: Scalars['Boolean']
  /** Cover of profile page. */
  profileCover?: Maybe<Scalars['String']>
  /** Is user name editable. */
  userNameEditable: Scalars['Boolean']
}

export type Badge = {
  __typename?: 'Badge'
  type: BadgeType
}

export enum BadgeType {
  Architect = 'architect',
  GoldenMotor = 'golden_motor',
  Seed = 'seed',
}

export type CryptoWallet = {
  __typename?: 'CryptoWallet'
  address: Scalars['String']
  /**  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query  */
  hasNFTs: Scalars['Boolean']
  id: Scalars['ID']
  /** NFT assets owned by this wallet address */
  nfts?: Maybe<Array<NftAsset>>
}

/**  NFT Asset  */
export type NftAsset = {
  __typename?: 'NFTAsset'
  collectionName: Scalars['String']
  /** imageOriginalUrl: String! */
  contractAddress: Scalars['String']
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  imagePreviewUrl?: Maybe<Scalars['String']>
  imageUrl: Scalars['String']
  name: Scalars['String']
}

export enum UserGroup {
  A = 'a',
  B = 'b',
}

export type Liker = {
  __typename?: 'Liker'
  /** Whether liker is a civic liker */
  civicLiker: Scalars['Boolean']
  /** Liker ID of LikeCoin */
  likerId?: Maybe<Scalars['String']>
  /**
   * Rate of LikeCoin/USD
   * @deprecated No longer in use
   */
  rateUSD?: Maybe<Scalars['Float']>
  /** Total LIKE left in wallet. */
  total: Scalars['Float']
}

export type NoticeConnection = Connection & {
  __typename?: 'NoticeConnection'
  edges?: Maybe<Array<NoticeEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type NoticeEdge = {
  __typename?: 'NoticeEdge'
  cursor: Scalars['String']
  node: Notice
}

/** This interface contains common fields of a notice. */
export type Notice = {
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']
  /** Unique ID of this notice. */
  id: Scalars['ID']
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']
}

export type UserOss = {
  __typename?: 'UserOSS'
  boost: Scalars['Float']
  score: Scalars['Float']
}

export type Recommendation = {
  __typename?: 'Recommendation'
  /** Global user list, sort by activities in recent 6 month. */
  authors: UserConnection
  /** Activities based on user's following, sort by creation time. */
  following: FollowingActivityConnection
  /** Global articles sort by latest activity time. */
  hottest: ArticleConnection
  /** Global circles sort by latest activity time. */
  hottestCircles: CircleConnection
  /** Hottest tag list */
  hottestTags: TagConnection
  /** 'In case you missed it' recommendation. */
  icymi: ArticleConnection
  /** Global articles sort by publish time. */
  newest: ArticleConnection
  /** Global circles sort by created time. */
  newestCircles: CircleConnection
  /**
   * Articles recommended based on recently read article tags.
   * @deprecated Merged into following
   */
  readTagsArticles: ArticleConnection
  /** Selected tag list */
  selectedTags: TagConnection
  /** Global tag list, sort by activities in recent 14 days. */
  tags: TagConnection
}

export type RecommendationAuthorsArgs = {
  input: RecommendInput
}

export type RecommendationFollowingArgs = {
  input: ConnectionArgs
}

export type RecommendationHottestArgs = {
  input: ConnectionArgs
}

export type RecommendationHottestCirclesArgs = {
  input: ConnectionArgs
}

export type RecommendationHottestTagsArgs = {
  input: RecommendInput
}

export type RecommendationIcymiArgs = {
  input: ConnectionArgs
}

export type RecommendationNewestArgs = {
  input: ConnectionArgs
}

export type RecommendationNewestCirclesArgs = {
  input: ConnectionArgs
}

export type RecommendationReadTagsArticlesArgs = {
  input: ConnectionArgs
}

export type RecommendationSelectedTagsArgs = {
  input: RecommendInput
}

export type RecommendationTagsArgs = {
  input: RecommendInput
}

export type RecommendInput = {
  after?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<FilterInput>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  oss?: InputMaybe<Scalars['Boolean']>
  type?: InputMaybe<AuthorsType>
}

export enum AuthorsType {
  Active = 'active',
  Appreciated = 'appreciated',
  Default = 'default',
  Trendy = 'trendy',
}

export type FollowingActivityConnection = Connection & {
  __typename?: 'FollowingActivityConnection'
  edges?: Maybe<Array<FollowingActivityEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type FollowingActivityEdge = {
  __typename?: 'FollowingActivityEdge'
  cursor: Scalars['String']
  node: FollowingActivity
}

export type FollowingActivity =
  | ArticleRecommendationActivity
  | CircleRecommendationActivity
  | UserAddArticleTagActivity
  | UserBroadcastCircleActivity
  | UserCreateCircleActivity
  | UserPublishArticleActivity
  | UserRecommendationActivity

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

export type UserAddArticleTagActivity = {
  __typename?: 'UserAddArticleTagActivity'
  actor: User
  createdAt: Scalars['DateTime']
  /** Article added to tag */
  node: Article
  /** Tag added by article */
  target: Tag
}

export type UserBroadcastCircleActivity = {
  __typename?: 'UserBroadcastCircleActivity'
  actor: User
  createdAt: Scalars['DateTime']
  /** Comment broadcast by actor */
  node: Comment
  /** Circle that comment belongs to */
  target: Circle
}

export type UserCreateCircleActivity = {
  __typename?: 'UserCreateCircleActivity'
  actor: User
  createdAt: Scalars['DateTime']
  /** Circle created by actor */
  node: Circle
}

export type UserPublishArticleActivity = {
  __typename?: 'UserPublishArticleActivity'
  actor: User
  createdAt: Scalars['DateTime']
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

export type UserSettings = {
  __typename?: 'UserSettings'
  /** User currency preference. */
  currency: QuoteCurrency
  /** User language setting. */
  language: UserLanguage
  /** Notification settings. */
  notification?: Maybe<NotificationSetting>
}

export enum QuoteCurrency {
  Hkd = 'HKD',
  Twd = 'TWD',
  Usd = 'USD',
}

export enum UserLanguage {
  En = 'en',
  ZhHans = 'zh_hans',
  ZhHant = 'zh_hant',
}

export type NotificationSetting = {
  __typename?: 'NotificationSetting'
  articleCommentPinned: Scalars['Boolean']
  articleNewAppreciation: Scalars['Boolean']
  articleNewCollected: Scalars['Boolean']
  articleNewComment: Scalars['Boolean']
  articleNewSubscription: Scalars['Boolean']
  articleSubscribedNewComment: Scalars['Boolean']
  circleMemberNewBroadcastReply: Scalars['Boolean']
  circleMemberNewDiscussion: Scalars['Boolean']
  circleMemberNewDiscussionReply: Scalars['Boolean']
  circleNewFollower: Scalars['Boolean']
  /** for circle owners */
  circleNewSubscriber: Scalars['Boolean']
  circleNewUnsubscriber: Scalars['Boolean']
  email: Scalars['Boolean']
  enable: Scalars['Boolean']
  /** for circle members & followers */
  inCircleNewArticle: Scalars['Boolean']
  inCircleNewBroadcast: Scalars['Boolean']
  inCircleNewBroadcastReply: Scalars['Boolean']
  inCircleNewDiscussion: Scalars['Boolean']
  inCircleNewDiscussionReply: Scalars['Boolean']
  mention: Scalars['Boolean']
  userNewFollower: Scalars['Boolean']
}

export type UserStatus = {
  __typename?: 'UserStatus'
  /** Number of articles published by user */
  articleCount: Scalars['Int']
  /** Number of comments posted by user. */
  commentCount: Scalars['Int']
  /** Number of articles donated by user */
  donatedArticleCount: Scalars['Int']
  /** Whether user already set payment password. */
  hasPaymentPassword: Scalars['Boolean']
  /** Number of times of donations received by user */
  receivedDonationCount: Scalars['Int']
  /** User role and access level. */
  role: UserRole
  /** User state. */
  state: UserState
  /** Number of total written words. */
  totalWordCount: Scalars['Int']
  /** Whether there are unread activities from following. */
  unreadFollowing: Scalars['Boolean']
  /** Number of unread notices. */
  unreadNoticeCount: Scalars['Int']
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export enum UserState {
  Active = 'active',
  Archived = 'archived',
  Banned = 'banned',
  Frozen = 'frozen',
  Onboarding = 'onboarding',
}

export type TopicInput = {
  after?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<FilterInput>
  first?: InputMaybe<Scalars['first_Int_min_0']>
}

export type TopicConnection = Connection & {
  __typename?: 'TopicConnection'
  edges?: Maybe<Array<TopicEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type TopicEdge = {
  __typename?: 'TopicEdge'
  cursor: Scalars['String']
  node: Topic
}

/** This type contains metadata, content and related data of a topic, which is a container for Article and Chapter types. */
export type Topic = Node & {
  __typename?: 'Topic'
  /** Number articles included in this topic. */
  articleCount: Scalars['Int']
  /** List of articles included in this topic. */
  articles?: Maybe<Array<Article>>
  /** Author of this topic. */
  author: User
  /** Number of chapters included in this topic. */
  chapterCount: Scalars['Int']
  /** List of chapters included in this topic. */
  chapters?: Maybe<Array<Chapter>>
  /** Cover of this topic. */
  cover?: Maybe<Scalars['String']>
  /** Description of this topic. */
  description?: Maybe<Scalars['String']>
  /** Unique id of this topic. */
  id: Scalars['ID']
  /** Latest published article on this topic */
  latestArticle?: Maybe<Article>
  /** Whether this topic is public or not. */
  public: Scalars['Boolean']
  /** Title of this topic. */
  title: Scalars['String']
}

/** This type contains metadata, content and related data of Chapter type, which is a container for Article type. A Chapter belong to a Topic. */
export type Chapter = Node & {
  __typename?: 'Chapter'
  /** Number articles included in this chapter. */
  articleCount: Scalars['Int']
  /** Articles included in this Chapter */
  articles?: Maybe<Array<Article>>
  /** Description of this chapter. */
  description?: Maybe<Scalars['String']>
  /** Unique id of this chapter. */
  id: Scalars['ID']
  /** Title of this chapter. */
  title: Scalars['String']
  /** The topic that this Chapter belongs to. */
  topic: Topic
}

export type Wallet = {
  __typename?: 'Wallet'
  balance: Balance
  /** The last four digits of the card. */
  cardLast4?: Maybe<Scalars['String']>
  /** URL of Stripe Dashboard to manage subscription invoice and payment method */
  customerPortal?: Maybe<Scalars['String']>
  /** Account of Stripe Connect to manage payout */
  stripeAccount?: Maybe<StripeAccount>
  transactions: TransactionConnection
}

export type WalletTransactionsArgs = {
  input: TransactionsArgs
}

export type Balance = {
  __typename?: 'Balance'
  HKD: Scalars['Float']
}

export type StripeAccount = {
  __typename?: 'StripeAccount'
  id: Scalars['ID']
  loginUrl: Scalars['String']
}

export type TransactionsArgs = {
  after?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<TransactionsFilter>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  /** deprecated, use TransactionsFilter.id instead. */
  id?: InputMaybe<Scalars['ID']>
  /** deprecated, use TransactionsFilter.states instead. */
  states?: InputMaybe<Array<TransactionState>>
}

export type TransactionsFilter = {
  currency?: InputMaybe<TransactionCurrency>
  id?: InputMaybe<Scalars['ID']>
  purpose?: InputMaybe<TransactionPurpose>
  states?: InputMaybe<Array<TransactionState>>
}

export enum TransactionCurrency {
  Hkd = 'HKD',
  Like = 'LIKE',
  Usdt = 'USDT',
}

export enum TransactionPurpose {
  AddCredit = 'addCredit',
  Donation = 'donation',
  Payout = 'payout',
  Refund = 'refund',
  SubscriptionSplit = 'subscriptionSplit',
}

export enum TransactionState {
  Canceled = 'canceled',
  Failed = 'failed',
  Pending = 'pending',
  Succeeded = 'succeeded',
}

export type TransactionConnection = Connection & {
  __typename?: 'TransactionConnection'
  edges?: Maybe<Array<TransactionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type TransactionEdge = {
  __typename?: 'TransactionEdge'
  cursor: Scalars['String']
  node: Transaction
}

export type Transaction = {
  __typename?: 'Transaction'
  amount: Scalars['Float']
  /** blockchain transaction info of USDT payment transaction */
  blockchainTx?: Maybe<BlockchainTransaction>
  /** Timestamp of transaction. */
  createdAt: Scalars['DateTime']
  currency: TransactionCurrency
  fee: Scalars['Float']
  id: Scalars['ID']
  /** Message for end user, including reason of failure. */
  message?: Maybe<Scalars['String']>
  purpose: TransactionPurpose
  /** Recipient of transaction. */
  recipient?: Maybe<User>
  /** Sender of transaction. */
  sender?: Maybe<User>
  state: TransactionState
  /** Related target article or transaction. */
  target?: Maybe<TransactionTarget>
}

export type BlockchainTransaction = {
  __typename?: 'BlockchainTransaction'
  chain: Chain
  txHash: Scalars['String']
}

export enum Chain {
  Polygon = 'Polygon',
}

export type TransactionTarget = Article | Circle | Transaction

export type CommentCommentsInput = {
  after?: InputMaybe<Scalars['String']>
  author?: InputMaybe<Scalars['ID']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  sort?: InputMaybe<CommentSort>
}

/** Enums for vote types. */
export enum Vote {
  Down = 'down',
  Up = 'up',
}

export enum CommentType {
  Article = 'article',
  CircleBroadcast = 'circleBroadcast',
  CircleDiscussion = 'circleDiscussion',
}

export type Invitation = {
  __typename?: 'Invitation'
  /** Accepted time. */
  acceptedAt?: Maybe<Scalars['DateTime']>
  /** Invitation of current Circle. */
  circle: Circle
  /** Created time. */
  createdAt: Scalars['DateTime']
  /** Free period of this invitation. */
  freePeriod: Scalars['Int']
  /** Unique ID. */
  id: Scalars['ID']
  /** Target person of this invitation. */
  invitee: Invitee
  /** Creator of this invitation. */
  inviter: User
  /** Sent time. */
  sentAt: Scalars['DateTime']
  /** Determine it's specific state. */
  state: InvitationState
}

export type Invitee = Person | User

export type Person = {
  __typename?: 'Person'
  email: Scalars['email_String_NotNull_format_email']
}

export enum InvitationState {
  Accepted = 'accepted',
  Pending = 'pending',
  TransferFailed = 'transfer_failed',
  TransferSucceeded = 'transfer_succeeded',
}

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

export type InvitationConnection = Connection & {
  __typename?: 'InvitationConnection'
  edges?: Maybe<Array<InvitationEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type InvitationEdge = {
  __typename?: 'InvitationEdge'
  cursor: Scalars['String']
  node: Invitation
}

export type MemberConnection = Connection & {
  __typename?: 'MemberConnection'
  edges?: Maybe<Array<MemberEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type MemberEdge = {
  __typename?: 'MemberEdge'
  cursor: Scalars['String']
  node: Member
}

export type Member = {
  __typename?: 'Member'
  /** Price chosen by user when joining a Circle. */
  price: Price
  /** User who join to a Circle. */
  user: User
}

export type Price = {
  __typename?: 'Price'
  /** Amount of Price. */
  amount: Scalars['Float']
  /** Current Price belongs to whcih Circle. */
  circle: Circle
  /**
   * Created time.
   * @deprecated No longer in use
   */
  createdAt: Scalars['DateTime']
  /** Currency of Price. */
  currency: TransactionCurrency
  /** Unique ID. */
  id: Scalars['ID']
  /** State of Price. */
  state: PriceState
  /**
   * Updated time.
   * @deprecated No longer in use
   */
  updatedAt: Scalars['DateTime']
}

export enum PriceState {
  Active = 'active',
  Archived = 'archived',
}

export enum CircleState {
  Active = 'active',
  Archived = 'archived',
}

export type FeaturedCommentsInput = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  sort?: InputMaybe<CommentSort>
}

export type ArticleOss = {
  __typename?: 'ArticleOSS'
  boost: Scalars['Float']
  inRecommendHottest: Scalars['Boolean']
  inRecommendIcymi: Scalars['Boolean']
  inRecommendNewest: Scalars['Boolean']
  score: Scalars['Float']
}

export type RelatedDonationArticlesInput = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  oss?: InputMaybe<Scalars['Boolean']>
  /** index of article list, min: 0, max: 49 */
  random?: InputMaybe<Scalars['random_Int_min_0_max_49']>
}

export type ResponsesInput = {
  after?: InputMaybe<Scalars['String']>
  articleOnly?: InputMaybe<Scalars['Boolean']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  includeAfter?: InputMaybe<Scalars['Boolean']>
  includeBefore?: InputMaybe<Scalars['Boolean']>
  sort?: InputMaybe<ResponseSort>
}

/** Enums for sorting responses. */
export enum ResponseSort {
  Newest = 'newest',
  Oldest = 'oldest',
}

export type ResponseConnection = Connection & {
  __typename?: 'ResponseConnection'
  edges?: Maybe<Array<ResponseEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ResponseEdge = {
  __typename?: 'ResponseEdge'
  cursor: Scalars['String']
  node: Response
}

export type Response = Article | Comment

/** Enums for an article state. */
export enum ArticleState {
  Active = 'active',
  Archived = 'archived',
  Banned = 'banned',
}

export type TransactionsReceivedByArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  purpose: TransactionPurpose
  senderId?: InputMaybe<Scalars['ID']>
}

export type TranslationArgs = {
  language: UserLanguage
}

export type ArticleTranslation = {
  __typename?: 'ArticleTranslation'
  content?: Maybe<Scalars['String']>
  language?: Maybe<Scalars['String']>
  summary?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type CircleInput = {
  /** Slugified name of a Circle. */
  name: Scalars['String']
}

export type ClientInfo = {
  __typename?: 'ClientInfo'
  id: Scalars['ID']
  viewportSize: ViewportSize
}

export type ViewportSize = {
  __typename?: 'ViewportSize'
  height?: Maybe<Scalars['Int']>
  width?: Maybe<Scalars['Int']>
}

export type ClientPreference = {
  __typename?: 'ClientPreference'
  /** Whether announcement is shown */
  announcement?: Maybe<Scalars['Int']>
  /** Whether cicle banner is shown */
  circleBanner: Scalars['Boolean']
  id: Scalars['ID']
  /** Local language setting */
  language?: Maybe<Language>
  onboardingTasks: OnboardingTasks
  /** Whether civic liker dialog is hidden */
  readCivicLikerDialog: Scalars['Boolean']
  /** Log route history for page back button */
  routeHistory?: Maybe<Array<Scalars['String']>>
  /** Login or sign up wall in article detail page */
  wall: Scalars['Boolean']
}

export enum Language {
  En = 'en',
  ZhHans = 'zh_hans',
  ZhHant = 'zh_hant',
}

export type OnboardingTasks = {
  __typename?: 'OnboardingTasks'
  enabled: Scalars['Boolean']
}

export type CommentDraftInput = {
  id: Scalars['ID']
}

export type CommentDraft = {
  __typename?: 'CommentDraft'
  content: Scalars['String']
  id: Scalars['ID']
}

export type ExchangeRatesInput = {
  from?: InputMaybe<TransactionCurrency>
  to?: InputMaybe<QuoteCurrency>
}

export type ExchangeRate = {
  __typename?: 'ExchangeRate'
  from: TransactionCurrency
  rate: Scalars['Float']
  to: QuoteCurrency
  /** Last updated time from currency convertor APIs */
  updatedAt: Scalars['DateTime']
}

export type FrequentSearchInput = {
  first?: InputMaybe<Scalars['first_Int_min_0']>
  key?: InputMaybe<Scalars['String']>
}

/** To record the last random variable on homepage queries */
export type LastFetchRandom = {
  __typename?: 'LastFetchRandom'
  feedAuthors?: Maybe<Scalars['Int']>
  feedTags?: Maybe<Scalars['Int']>
  id: Scalars['ID']
  sidebarAuthors?: Maybe<Scalars['Int']>
  sidebarTags?: Maybe<Scalars['Int']>
}

export type NodeInput = {
  id: Scalars['ID']
}

export type NodesInput = {
  ids: Array<Scalars['ID']>
}

export type OAuthClientInput = {
  id: Scalars['ID']
}

export type OAuthClient = {
  __typename?: 'OAuthClient'
  /** URL for oauth client's avatar. */
  avatar?: Maybe<Scalars['String']>
  /** Creation Date */
  createdAt: Scalars['DateTime']
  /** App Description */
  description?: Maybe<Scalars['String']>
  /** Grant Types */
  grantTypes?: Maybe<Array<GrantType>>
  /** Unique Client ID of this OAuth Client. */
  id: Scalars['ID']
  /** App name */
  name: Scalars['String']
  /** Redirect URIs */
  redirectURIs?: Maybe<Array<Scalars['String']>>
  /** Scopes */
  scope?: Maybe<Array<Scalars['String']>>
  /** Client secret */
  secret: Scalars['String']
  /** Linked Developer Account */
  user?: Maybe<User>
  /** URL for oauth client's official website */
  website?: Maybe<Scalars['String']>
}

export enum GrantType {
  AuthorizationCode = 'authorization_code',
  RefreshToken = 'refresh_token',
}

/** This type contains system-wise info and settings. */
export type Official = {
  __typename?: 'Official'
  /** Announcements */
  announcements?: Maybe<Array<Announcement>>
  /** Feature flag */
  features: Array<Feature>
  gatewayUrls?: Maybe<Array<Scalars['String']>>
}

/** This type contains system-wise info and settings. */
export type OfficialAnnouncementsArgs = {
  input: AnnouncementsInput
}

export type AnnouncementsInput = {
  id?: InputMaybe<Scalars['ID']>
  visible?: InputMaybe<Scalars['Boolean']>
}

export type Announcement = {
  __typename?: 'Announcement'
  content?: Maybe<Scalars['String']>
  cover?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  link?: Maybe<Scalars['String']>
  order: Scalars['Int']
  title?: Maybe<Scalars['String']>
  translations?: Maybe<Array<TranslatedAnnouncement>>
  type: AnnouncementType
  updatedAt: Scalars['DateTime']
  visible: Scalars['Boolean']
}

export type TranslatedAnnouncement = {
  __typename?: 'TranslatedAnnouncement'
  content?: Maybe<Scalars['String']>
  cover?: Maybe<Scalars['String']>
  language: UserLanguage
  link?: Maybe<Scalars['link_String_format_uri']>
  title?: Maybe<Scalars['String']>
}

export enum AnnouncementType {
  Community = 'community',
  Product = 'product',
  Seminar = 'seminar',
}

export type Feature = {
  __typename?: 'Feature'
  enabled: Scalars['Boolean']
  name: FeatureName
}

export enum FeatureName {
  AddCredit = 'add_credit',
  CircleInteract = 'circle_interact',
  CircleManagement = 'circle_management',
  Fingerprint = 'fingerprint',
  Payment = 'payment',
  Payout = 'payout',
  TagAdoption = 'tag_adoption',
  VerifyAppreciate = 'verify_appreciate',
}

export type Oss = {
  __typename?: 'OSS'
  articles: ArticleConnection
  badgedUsers: UserConnection
  comments: CommentConnection
  oauthClients: OAuthClientConnection
  seedingUsers: UserConnection
  skippedListItems: SkippedListItemsConnection
  tags: TagConnection
  users: UserConnection
}

export type OssArticlesArgs = {
  input: ConnectionArgs
}

export type OssBadgedUsersArgs = {
  input: BadgedUsersInput
}

export type OssCommentsArgs = {
  input: ConnectionArgs
}

export type OssOauthClientsArgs = {
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

export type OssUsersArgs = {
  input: ConnectionArgs
}

export type BadgedUsersInput = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  type?: InputMaybe<BadgeType>
}

export type OAuthClientConnection = Connection & {
  __typename?: 'OAuthClientConnection'
  edges?: Maybe<Array<OAuthClientEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type OAuthClientEdge = {
  __typename?: 'OAuthClientEdge'
  cursor: Scalars['String']
  node: OAuthClient
}

export type SkippedListItemsInput = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  type?: InputMaybe<SkippedListItemType>
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
  totalCount: Scalars['Int']
}

export type SkippedListItemEdge = {
  __typename?: 'SkippedListItemEdge'
  cursor: Scalars['String']
  node?: Maybe<SkippedListItem>
}

export type SkippedListItem = {
  __typename?: 'SkippedListItem'
  archived: Scalars['Boolean']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  type: SkippedListItemType
  updatedAt: Scalars['DateTime']
  uuid: Scalars['ID']
  value: Scalars['String']
}

export type TagsInput = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  sort?: InputMaybe<TagsSort>
}

/** Enums for sorting tags. */
export enum TagsSort {
  Hottest = 'hottest',
  Newest = 'newest',
  Oldest = 'oldest',
}

export type SearchInput = {
  after?: InputMaybe<Scalars['String']>
  /** specific condition for rule data out */
  exclude?: InputMaybe<SearchExclude>
  /** extra query filter for searching */
  filter?: InputMaybe<SearchFilter>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  /** should include tags used by author */
  includeAuthorTags?: InputMaybe<Scalars['Boolean']>
  /** search keyword */
  key: Scalars['String']
  oss?: InputMaybe<Scalars['Boolean']>
  /** whether this search operation should be recorded in search history */
  record?: InputMaybe<Scalars['Boolean']>
  /** types of search target */
  type: SearchTypes
  /** use the api version; omit to use latest version */
  version?: InputMaybe<SearchApiVersion>
}

export enum SearchExclude {
  Blocked = 'blocked',
}

export type SearchFilter = {
  authorId?: InputMaybe<Scalars['ID']>
}

export enum SearchTypes {
  Article = 'Article',
  Tag = 'Tag',
  User = 'User',
}

export enum SearchApiVersion {
  V20221212 = 'v20221212',
  V20221212prior = 'v20221212prior',
}

export type SearchResultConnection = Connection & {
  __typename?: 'SearchResultConnection'
  edges?: Maybe<Array<SearchResultEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type SearchResultEdge = {
  __typename?: 'SearchResultEdge'
  cursor: Scalars['String']
  node: Node
}

export type UserInput = {
  ethAddress?: InputMaybe<Scalars['String']>
  userName?: InputMaybe<Scalars['String']>
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Add one tag to articles. */
  addArticlesTags: Tag
  /** Add blocked search keyword to blocked_search_word db */
  addBlockedSearchKeyword: BlockedSearchKeyword
  /** Add Credit to User Wallet */
  addCredit: AddCreditResult
  /** Appreciate an article. */
  appreciateArticle: Article
  /** Change user email. */
  changeEmail: User
  /** Let Traveloggers owner claims a Logbook, returns transaction hash */
  claimLogbooks: ClaimLogbooksResult
  /** Clear read history for user. */
  clearReadHistory?: Maybe<Scalars['Boolean']>
  /** Clear search history for user. */
  clearSearchHistory?: Maybe<Scalars['Boolean']>
  /** Confirm verification code from email. */
  confirmVerificationCode: Scalars['ID']
  /** Create Stripe Connect account for Payout */
  connectStripeAccount: ConnectStripeAccountResult
  deleteAnnouncements: Scalars['Boolean']
  /** Delete one tag from articles */
  deleteArticlesTags: Tag
  /** Delete blocked search keywords from search_history db */
  deleteBlockedSearchKeywords?: Maybe<Scalars['Boolean']>
  /** Remove a comment. */
  deleteComment: Comment
  /** Remove a draft. */
  deleteDraft?: Maybe<Scalars['Boolean']>
  deleteTags?: Maybe<Scalars['Boolean']>
  /** Delete topics */
  deleteTopics: Scalars['Boolean']
  /** Edit an article. */
  editArticle: Article
  /** Generate or claim a Liker ID through LikeCoin */
  generateLikerId: User
  /** Get signing message. */
  generateSigningMessage: SigningMessageResult
  /** Invite others to join circle */
  invite?: Maybe<Array<Invitation>>
  /** Add specific user behavior record. */
  logRecord?: Maybe<Scalars['Boolean']>
  /** Mark all received notices as read. */
  markAllNoticesAsRead?: Maybe<Scalars['Boolean']>
  mergeTags: Tag
  /** Migrate articles from other service provider. */
  migration?: Maybe<Scalars['Boolean']>
  /** Payout to user */
  payout: Transaction
  /** Pay to another user or article */
  payTo: PayToResult
  /** Pin a comment. */
  pinComment: Comment
  /** Publish an article onto IPFS. */
  publishArticle: Draft
  putAnnouncement: Announcement
  /** Create a Chapter when no id is given, update fields when id is given. Throw error if no id & no title, or no id & no topic. */
  putChapter: Chapter
  /** Create or update a Circle. */
  putCircle: Circle
  /**
   * Add or remove Circle's articles
   * @deprecated No longer in use
   */
  putCircleArticles: Circle
  /** Publish or update a comment. */
  putComment: Comment
  /** Create or update a draft. */
  putDraft: Draft
  /** update tags for showing on profile page */
  putFeaturedTags?: Maybe<Array<Tag>>
  /** Create or Update an OAuth Client, used in OSS. */
  putOAuthClient?: Maybe<OAuthClient>
  putRemark?: Maybe<Scalars['String']>
  putSkippedListItem?: Maybe<Array<SkippedListItem>>
  /** Create or update tag. */
  putTag: Tag
  /** Create a Topic when no id is given, update fields when id is given. Throw error if no id & no title. */
  putTopic: Topic
  /** Read an article. */
  readArticle: Article
  /** Update state of a user, used in OSS. */
  refreshIPNSFeed: User
  renameTag: Tag
  /** Reset Liker ID */
  resetLikerId: User
  /** Reset user or payment password. */
  resetPassword?: Maybe<Scalars['Boolean']>
  /** Reset crypto wallet. */
  resetWallet: User
  /** Send verification code for email. */
  sendVerificationCode?: Maybe<Scalars['Boolean']>
  /**
   * #############
   *      OSS    #
   * #############
   */
  setBoost: Node
  /** Set user currency preference. */
  setCurrency: User
  setFeature: Feature
  /** Upload a single file. */
  singleFileUpload: Asset
  /** Sort topics */
  sortTopics: Array<Topic>
  /** Subscribe a Circle. */
  subscribeCircle: SubscribeCircleResult
  /**
   * #############
   *      OSS    #
   * #############
   */
  toggleArticleRecommend: Article
  /** Block or Unblock a given user. */
  toggleBlockUser: User
  /**
   * Follow or unfollow a Circle.
   * @deprecated No longer in use
   */
  toggleFollowCircle: Circle
  /** Follow or unfollow tag. */
  toggleFollowTag: Tag
  /** Follow or Unfollow current user. */
  toggleFollowUser: User
  /** Pin or Unpin a comment. */
  togglePinComment: Comment
  /** pin or unpin tag. */
  togglePinTag: Tag
  toggleSeedingUsers: Array<Maybe<User>>
  /** Subscribe or Unsubscribe article */
  toggleSubscribeArticle: Article
  toggleTagRecommend: Tag
  toggleUsersBadge: Array<Maybe<User>>
  unbindLikerId: User
  /** Unpin a comment. */
  unpinComment: Comment
  /** Unsubscribe a Circle. */
  unsubscribeCircle: Circle
  /** Unvote a comment. */
  unvoteComment: Comment
  /** Update articles' tag. */
  updateArticlesTags: Tag
  updateArticleState: Article
  /** Update a comments' state. */
  updateCommentsState: Array<Comment>
  /** Update user notification settings. */
  updateNotificationSetting: User
  /** Update member, permission and othters of a tag. */
  updateTagSetting: Tag
  /** Update user information. */
  updateUserInfo: User
  /** Update state of a user, used in OSS. */
  updateUserRole: User
  /** Update state of a user, used in OSS. */
  updateUserState?: Maybe<Array<User>>
  /** Login user. */
  userLogin: AuthResult
  /** Logout user. */
  userLogout: Scalars['Boolean']
  /** Register user, can only be used on matters.news website. */
  userRegister: AuthResult
  /** Upvote or downvote a comment. */
  voteComment: Comment
  /** Login/Signup via a wallet. */
  walletLogin: AuthResult
}

export type MutationAddArticlesTagsArgs = {
  input: AddArticlesTagsInput
}

export type MutationAddBlockedSearchKeywordArgs = {
  input: KeywordInput
}

export type MutationAddCreditArgs = {
  input: AddCreditInput
}

export type MutationAppreciateArticleArgs = {
  input: AppreciateArticleInput
}

export type MutationChangeEmailArgs = {
  input: ChangeEmailInput
}

export type MutationClaimLogbooksArgs = {
  input: ClaimLogbooksInput
}

export type MutationClearReadHistoryArgs = {
  input: ClearReadHistoryInput
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

export type MutationDeleteArticlesTagsArgs = {
  input: DeleteArticlesTagsInput
}

export type MutationDeleteBlockedSearchKeywordsArgs = {
  input: KeywordsInput
}

export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput
}

export type MutationDeleteDraftArgs = {
  input: DeleteDraftInput
}

export type MutationDeleteTagsArgs = {
  input: DeleteTagsInput
}

export type MutationDeleteTopicsArgs = {
  input: DeleteTopicsInput
}

export type MutationEditArticleArgs = {
  input: EditArticleInput
}

export type MutationGenerateSigningMessageArgs = {
  input: GenerateSigningMessageInput
}

export type MutationInviteArgs = {
  input: InviteCircleInput
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

export type MutationPayoutArgs = {
  input: PayoutInput
}

export type MutationPayToArgs = {
  input: PayToInput
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

export type MutationPutChapterArgs = {
  input: PutChapterInput
}

export type MutationPutCircleArgs = {
  input: PutCircleInput
}

export type MutationPutCircleArticlesArgs = {
  input: PutCircleArticlesInput
}

export type MutationPutCommentArgs = {
  input: PutCommentInput
}

export type MutationPutDraftArgs = {
  input: PutDraftInput
}

export type MutationPutFeaturedTagsArgs = {
  input: FeaturedTagsInput
}

export type MutationPutOAuthClientArgs = {
  input: PutOAuthClientInput
}

export type MutationPutRemarkArgs = {
  input: PutRemarkInput
}

export type MutationPutSkippedListItemArgs = {
  input: PutSkippedListItemInput
}

export type MutationPutTagArgs = {
  input: PutTagInput
}

export type MutationPutTopicArgs = {
  input: PutTopicInput
}

export type MutationReadArticleArgs = {
  input: ReadArticleInput
}

export type MutationRefreshIpnsFeedArgs = {
  input: RefreshIpnsFeedInput
}

export type MutationRenameTagArgs = {
  input: RenameTagInput
}

export type MutationResetLikerIdArgs = {
  input: ResetLikerIdInput
}

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput
}

export type MutationResetWalletArgs = {
  input: ResetWalletInput
}

export type MutationSendVerificationCodeArgs = {
  input: SendVerificationCodeInput
}

export type MutationSetBoostArgs = {
  input: SetBoostInput
}

export type MutationSetCurrencyArgs = {
  input: SetCurrencyInput
}

export type MutationSetFeatureArgs = {
  input: SetFeatureInput
}

export type MutationSingleFileUploadArgs = {
  input: SingleFileUploadInput
}

export type MutationSortTopicsArgs = {
  input: SortTopicsInput
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

export type MutationToggleFollowCircleArgs = {
  input: ToggleItemInput
}

export type MutationToggleFollowTagArgs = {
  input: ToggleItemInput
}

export type MutationToggleFollowUserArgs = {
  input: ToggleItemInput
}

export type MutationTogglePinCommentArgs = {
  input: ToggleItemInput
}

export type MutationTogglePinTagArgs = {
  input: ToggleItemInput
}

export type MutationToggleSeedingUsersArgs = {
  input: ToggleSeedingUsersInput
}

export type MutationToggleSubscribeArticleArgs = {
  input: ToggleItemInput
}

export type MutationToggleTagRecommendArgs = {
  input: ToggleRecommendInput
}

export type MutationToggleUsersBadgeArgs = {
  input: ToggleUsersBadgeInput
}

export type MutationUnbindLikerIdArgs = {
  input: UnbindLikerIdInput
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

export type MutationUpdateArticlesTagsArgs = {
  input: UpdateArticlesTagsInput
}

export type MutationUpdateArticleStateArgs = {
  input: UpdateArticleStateInput
}

export type MutationUpdateCommentsStateArgs = {
  input: UpdateCommentsStateInput
}

export type MutationUpdateNotificationSettingArgs = {
  input: UpdateNotificationSettingInput
}

export type MutationUpdateTagSettingArgs = {
  input: UpdateTagSettingInput
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

export type MutationUserLoginArgs = {
  input: UserLoginInput
}

export type MutationUserRegisterArgs = {
  input: UserRegisterInput
}

export type MutationVoteCommentArgs = {
  input: VoteCommentInput
}

export type MutationWalletLoginArgs = {
  input: WalletLoginInput
}

export type AddArticlesTagsInput = {
  articles?: InputMaybe<Array<Scalars['ID']>>
  id: Scalars['ID']
  selected?: InputMaybe<Scalars['Boolean']>
}

export type KeywordInput = {
  keyword: Scalars['String']
}

export type BlockedSearchKeyword = {
  __typename?: 'BlockedSearchKeyword'
  /** Time of this search keyword was created. */
  createdAt: Scalars['DateTime']
  /** Unique ID of bloked search keyword. */
  id: Scalars['ID']
  /** Types of this search keyword. */
  searchKey: Scalars['String']
}

/** Add Credit */
export type AddCreditInput = {
  amount: Scalars['amount_Float_NotNull_exclusiveMin_0']
}

export type AddCreditResult = {
  __typename?: 'AddCreditResult'
  /** The client secret of this PaymentIntent. */
  client_secret: Scalars['String']
  transaction: Transaction
}

export type AppreciateArticleInput = {
  amount: Scalars['amount_Int_NotNull_min_1']
  id: Scalars['ID']
  superLike?: InputMaybe<Scalars['Boolean']>
  token?: InputMaybe<Scalars['String']>
}

export type ChangeEmailInput = {
  newEmail: Scalars['newEmail_String_NotNull_format_email']
  newEmailCodeId: Scalars['ID']
  oldEmail: Scalars['oldEmail_String_NotNull_format_email']
  oldEmailCodeId: Scalars['ID']
}

export type ClaimLogbooksInput = {
  ethAddress: Scalars['String']
  /** nonce from generateSigningMessage */
  nonce: Scalars['String']
  /** sign'ed by wallet */
  signature: Scalars['String']
  /** the message being sign'ed, including nonce */
  signedMessage: Scalars['String']
}

export type ClaimLogbooksResult = {
  __typename?: 'ClaimLogbooksResult'
  /** claimed token ids */
  ids?: Maybe<Array<Scalars['ID']>>
  /** transaction hash */
  txHash: Scalars['String']
}

export type ClearReadHistoryInput = {
  id: Scalars['ID']
}

export type ConfirmVerificationCodeInput = {
  code: Scalars['String']
  email: Scalars['email_String_NotNull_format_email']
  type: VerificationCodeType
}

export enum VerificationCodeType {
  EmailReset = 'email_reset',
  EmailResetConfirm = 'email_reset_confirm',
  PasswordReset = 'password_reset',
  PaymentPasswordReset = 'payment_password_reset',
  Register = 'register',
}

/** Stripe Account */
export type ConnectStripeAccountInput = {
  country: StripeAccountCountry
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

export type ConnectStripeAccountResult = {
  __typename?: 'ConnectStripeAccountResult'
  redirectUrl: Scalars['String']
}

export type DeleteAnnouncementsInput = {
  ids?: InputMaybe<Array<Scalars['ID']>>
}

export type DeleteArticlesTagsInput = {
  articles?: InputMaybe<Array<Scalars['ID']>>
  id: Scalars['ID']
}

export type KeywordsInput = {
  keywords?: InputMaybe<Array<Scalars['String']>>
}

export type DeleteCommentInput = {
  id: Scalars['ID']
}

export type DeleteDraftInput = {
  id: Scalars['ID']
}

export type DeleteTagsInput = {
  ids: Array<Scalars['ID']>
}

export type DeleteTopicsInput = {
  ids: Array<Scalars['ID']>
}

export type EditArticleInput = {
  accessType?: InputMaybe<ArticleAccessType>
  circle?: InputMaybe<Scalars['ID']>
  collection?: InputMaybe<Array<Scalars['ID']>>
  content?: InputMaybe<Scalars['String']>
  cover?: InputMaybe<Scalars['ID']>
  id: Scalars['ID']
  /** whether publish to ISCN */
  iscnPublish?: InputMaybe<Scalars['Boolean']>
  license?: InputMaybe<ArticleLicenseType>
  replyToDonator?: InputMaybe<Scalars['replyToDonator_String_maxLength_140']>
  requestForDonation?: InputMaybe<
    Scalars['requestForDonation_String_maxLength_140']
  >
  state?: InputMaybe<ArticleState>
  sticky?: InputMaybe<Scalars['Boolean']>
  summary?: InputMaybe<Scalars['String']>
  tags?: InputMaybe<Array<Scalars['String']>>
}

export type GenerateSigningMessageInput = {
  address: Scalars['String']
  purpose?: InputMaybe<SigningMessagePurpose>
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
  createdAt: Scalars['DateTime']
  expiredAt: Scalars['DateTime']
  nonce: Scalars['String']
  purpose: SigningMessagePurpose
  signingMessage: Scalars['String']
}

export type InviteCircleInput = {
  circleId: Scalars['ID']
  freePeriod: Scalars['freePeriod_Int_NotNull_exclusiveMin_0']
  invitees: Array<InviteCircleInvitee>
}

export type InviteCircleInvitee = {
  email?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
}

export type LogRecordInput = {
  type: LogRecordTypes
}

export enum LogRecordTypes {
  ReadFolloweeArticles = 'ReadFolloweeArticles',
  ReadFollowingFeed = 'ReadFollowingFeed',
  ReadResponseInfoPopUp = 'ReadResponseInfoPopUp',
}

export type MergeTagsInput = {
  content: Scalars['String']
  ids: Array<Scalars['ID']>
}

export type MigrationInput = {
  files: Array<InputMaybe<Scalars['Upload']>>
  type?: InputMaybe<MigrationType>
}

export enum MigrationType {
  Medium = 'medium',
}

export type PayoutInput = {
  amount: Scalars['amount_Float_NotNull_exclusiveMin_0']
  password: Scalars['String']
}

export type PayToInput = {
  amount: Scalars['amount_Float_NotNull_exclusiveMin_0']
  /** for USDT payment */
  chain?: InputMaybe<Chain>
  currency: TransactionCurrency
  /** for HKD payment */
  password?: InputMaybe<Scalars['String']>
  purpose: TransactionPurpose
  recipientId: Scalars['ID']
  targetId?: InputMaybe<Scalars['ID']>
  txHash?: InputMaybe<Scalars['String']>
}

export type PayToResult = {
  __typename?: 'PayToResult'
  /** Only available when paying with LIKE. */
  redirectUrl?: Maybe<Scalars['String']>
  transaction: Transaction
}

export type PinCommentInput = {
  id: Scalars['ID']
}

export type PublishArticleInput = {
  id: Scalars['ID']
  /** whether publish to ISCN */
  iscnPublish?: InputMaybe<Scalars['Boolean']>
}

export type PutAnnouncementInput = {
  content?: InputMaybe<Scalars['String']>
  cover?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  link?: InputMaybe<Scalars['link_String_format_uri']>
  order?: InputMaybe<Scalars['Int']>
  title?: InputMaybe<Scalars['String']>
  translations?: InputMaybe<Array<TranslatedAnnouncementInput>>
  type?: InputMaybe<AnnouncementType>
  visible?: InputMaybe<Scalars['Boolean']>
}

export type TranslatedAnnouncementInput = {
  content?: InputMaybe<Scalars['String']>
  cover?: InputMaybe<Scalars['String']>
  language: UserLanguage
  link?: InputMaybe<Scalars['link_String_format_uri']>
  title?: InputMaybe<Scalars['String']>
}

export type PutChapterInput = {
  articles?: InputMaybe<Array<Scalars['ID']>>
  description?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
  topic?: InputMaybe<Scalars['ID']>
}

export type PutCircleInput = {
  /** Circle's subscription fee. */
  amount?: InputMaybe<Scalars['amount_Float_exclusiveMin_0']>
  /** Unique ID of a Circle's avatar. */
  avatar?: InputMaybe<Scalars['ID']>
  /** Unique ID of a Circle's cover. */
  cover?: InputMaybe<Scalars['ID']>
  /** A short description of this Circle. */
  description?: InputMaybe<Scalars['String']>
  /** Human readable name of this Circle. */
  displayName?: InputMaybe<Scalars['String']>
  /** Unique ID. */
  id?: InputMaybe<Scalars['ID']>
  /** Slugified name of a Circle. */
  name?: InputMaybe<Scalars['String']>
}

export type PutCircleArticlesInput = {
  /** Access Type, `public` or `paywall` only. */
  accessType: ArticleAccessType
  /** Article Ids */
  articles?: InputMaybe<Array<Scalars['ID']>>
  /** Circle ID */
  id: Scalars['ID']
  license?: InputMaybe<ArticleLicenseType>
  /** Action Type */
  type: PutCircleArticlesType
}

export enum PutCircleArticlesType {
  Add = 'add',
  Remove = 'remove',
}

export type PutCommentInput = {
  comment: CommentInput
  /** edit comment if id is provided */
  id?: InputMaybe<Scalars['ID']>
}

export type CommentInput = {
  /** one of the following ids is required */
  articleId?: InputMaybe<Scalars['ID']>
  circleId?: InputMaybe<Scalars['ID']>
  content: Scalars['String']
  mentions?: InputMaybe<Array<Scalars['ID']>>
  parentId?: InputMaybe<Scalars['ID']>
  replyTo?: InputMaybe<Scalars['ID']>
  type: CommentType
}

export type PutDraftInput = {
  accessType?: InputMaybe<ArticleAccessType>
  circle?: InputMaybe<Scalars['ID']>
  collection?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  content?: InputMaybe<Scalars['String']>
  cover?: InputMaybe<Scalars['ID']>
  id?: InputMaybe<Scalars['ID']>
  /** whether publish to ISCN */
  iscnPublish?: InputMaybe<Scalars['Boolean']>
  license?: InputMaybe<ArticleLicenseType>
  replyToDonator?: InputMaybe<Scalars['replyToDonator_String_maxLength_140']>
  requestForDonation?: InputMaybe<
    Scalars['requestForDonation_String_maxLength_140']
  >
  summary?: InputMaybe<Scalars['String']>
  tags?: InputMaybe<Array<Scalars['String']>>
  title?: InputMaybe<Scalars['String']>
}

export type FeaturedTagsInput = {
  /**  tagIds  */
  ids: Array<Scalars['ID']>
}

export type PutOAuthClientInput = {
  avatar?: InputMaybe<Scalars['ID']>
  description?: InputMaybe<Scalars['String']>
  grantTypes?: InputMaybe<Array<GrantType>>
  id?: InputMaybe<Scalars['ID']>
  name?: InputMaybe<Scalars['String']>
  redirectURIs?: InputMaybe<Array<Scalars['String']>>
  scope?: InputMaybe<Array<Scalars['String']>>
  secret?: InputMaybe<Scalars['String']>
  user?: InputMaybe<Scalars['ID']>
  website?: InputMaybe<Scalars['website_String_format_uri']>
}

export type PutRemarkInput = {
  id: Scalars['ID']
  remark: Scalars['String']
  type: RemarkTypes
}

export enum RemarkTypes {
  Article = 'Article',
  Comment = 'Comment',
  Feedback = 'Feedback',
  Report = 'Report',
  Tag = 'Tag',
  User = 'User',
}

export type PutSkippedListItemInput = {
  archived?: InputMaybe<Scalars['Boolean']>
  id?: InputMaybe<Scalars['ID']>
  type?: InputMaybe<SkippedListItemType>
  value?: InputMaybe<Scalars['String']>
}

export type PutTagInput = {
  content?: InputMaybe<Scalars['String']>
  cover?: InputMaybe<Scalars['ID']>
  description?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
}

export type PutTopicInput = {
  articles?: InputMaybe<Array<Scalars['ID']>>
  chapters?: InputMaybe<Array<Scalars['ID']>>
  cover?: InputMaybe<Scalars['ID']>
  description?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  public?: InputMaybe<Scalars['Boolean']>
  title?: InputMaybe<Scalars['String']>
}

export type ReadArticleInput = {
  id: Scalars['ID']
}

export type RefreshIpnsFeedInput = {
  /** refresh how many recent articles, default to 50 */
  numArticles?: InputMaybe<Scalars['Int']>
  userName: Scalars['String']
}

export type RenameTagInput = {
  content: Scalars['String']
  id: Scalars['ID']
}

export type ResetLikerIdInput = {
  id: Scalars['ID']
}

export type ResetPasswordInput = {
  codeId: Scalars['ID']
  password: Scalars['String']
  type?: InputMaybe<ResetPasswordType>
}

export enum ResetPasswordType {
  Account = 'account',
  Payment = 'payment',
}

export type ResetWalletInput = {
  id: Scalars['ID']
}

export type SendVerificationCodeInput = {
  email: Scalars['email_String_NotNull_format_email']
  /**
   * Redirect URL embedded in the verification email,
   * use code instead if not provided.
   */
  redirectUrl?: InputMaybe<Scalars['redirectUrl_String_format_uri']>
  token?: InputMaybe<Scalars['String']>
  type: VerificationCodeType
}

export type SetBoostInput = {
  boost: Scalars['boost_Float_NotNull_min_0']
  id: Scalars['ID']
  type: BoostTypes
}

export enum BoostTypes {
  Article = 'Article',
  Tag = 'Tag',
  User = 'User',
}

export type SetCurrencyInput = {
  currency?: InputMaybe<QuoteCurrency>
}

export type SetFeatureInput = {
  flag: FeatureFlag
  name: FeatureName
}

export enum FeatureFlag {
  Admin = 'admin',
  Off = 'off',
  On = 'on',
  Seeding = 'seeding',
}

export type SingleFileUploadInput = {
  entityId?: InputMaybe<Scalars['ID']>
  entityType: EntityType
  file?: InputMaybe<Scalars['Upload']>
  type: AssetType
  url?: InputMaybe<Scalars['url_String_format_uri']>
}

export enum EntityType {
  Announcement = 'announcement',
  Article = 'article',
  Circle = 'circle',
  Draft = 'draft',
  Tag = 'tag',
  Topic = 'topic',
  User = 'user',
}

export type SortTopicsInput = {
  ids: Array<Scalars['ID']>
}

export type SubscribeCircleInput = {
  /** Unique ID. */
  id: Scalars['ID']
  /** Wallet password. */
  password?: InputMaybe<Scalars['String']>
}

export type SubscribeCircleResult = {
  __typename?: 'SubscribeCircleResult'
  circle: Circle
  /** client secret for SetupIntent. */
  client_secret?: Maybe<Scalars['String']>
}

export type ToggleRecommendInput = {
  enabled: Scalars['Boolean']
  id: Scalars['ID']
  type?: InputMaybe<RecommendTypes>
}

/** Enums for types of recommend articles. */
export enum RecommendTypes {
  Hottest = 'hottest',
  Icymi = 'icymi',
  Newest = 'newest',
}

/** Common input to toggle single item for `toggleXXX` mutations */
export type ToggleItemInput = {
  enabled?: InputMaybe<Scalars['Boolean']>
  id: Scalars['ID']
}

export type ToggleSeedingUsersInput = {
  enabled: Scalars['Boolean']
  ids?: InputMaybe<Array<Scalars['ID']>>
}

export type ToggleUsersBadgeInput = {
  enabled: Scalars['Boolean']
  ids?: InputMaybe<Array<Scalars['ID']>>
  type: BadgeType
}

export type UnbindLikerIdInput = {
  id: Scalars['ID']
  likerId: Scalars['String']
}

export type UnpinCommentInput = {
  id: Scalars['ID']
}

export type UnsubscribeCircleInput = {
  /** Unique ID. */
  id: Scalars['ID']
}

export type UnvoteCommentInput = {
  id: Scalars['ID']
}

export type UpdateArticlesTagsInput = {
  articles?: InputMaybe<Array<Scalars['ID']>>
  id: Scalars['ID']
  isSelected: Scalars['Boolean']
}

export type UpdateArticleStateInput = {
  id: Scalars['ID']
  state: ArticleState
}

export type UpdateCommentsStateInput = {
  ids: Array<Scalars['ID']>
  state: CommentState
}

export type UpdateNotificationSettingInput = {
  enabled: Scalars['Boolean']
  type: NotificationSettingType
}

export enum NotificationSettingType {
  ArticleCommentPinned = 'articleCommentPinned',
  ArticleNewAppreciation = 'articleNewAppreciation',
  ArticleNewCollected = 'articleNewCollected',
  ArticleNewComment = 'articleNewComment',
  ArticleNewSubscription = 'articleNewSubscription',
  ArticleSubscribedNewComment = 'articleSubscribedNewComment',
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
  Enable = 'enable',
  /** for circle members */
  InCircleNewArticle = 'inCircleNewArticle',
  InCircleNewBroadcast = 'inCircleNewBroadcast',
  InCircleNewBroadcastReply = 'inCircleNewBroadcastReply',
  InCircleNewDiscussion = 'inCircleNewDiscussion',
  InCircleNewDiscussionReply = 'inCircleNewDiscussionReply',
  Mention = 'mention',
  UserNewFollower = 'userNewFollower',
}

export type UpdateTagSettingInput = {
  editors?: InputMaybe<Array<Scalars['ID']>>
  id: Scalars['ID']
  type: UpdateTagSettingType
}

export enum UpdateTagSettingType {
  AddEditor = 'add_editor',
  Adopt = 'adopt',
  Leave = 'leave',
  LeaveEditor = 'leave_editor',
  RemoveEditor = 'remove_editor',
}

export type UpdateUserInfoInput = {
  agreeOn?: InputMaybe<Scalars['Boolean']>
  avatar?: InputMaybe<Scalars['ID']>
  description?: InputMaybe<Scalars['String']>
  displayName?: InputMaybe<Scalars['String']>
  language?: InputMaybe<UserLanguage>
  paymentPassword?: InputMaybe<Scalars['String']>
  paymentPointer?: InputMaybe<Scalars['String']>
  profileCover?: InputMaybe<Scalars['ID']>
  userName?: InputMaybe<Scalars['String']>
}

export type UpdateUserRoleInput = {
  id: Scalars['ID']
  role: UserRole
}

export type UpdateUserStateInput = {
  banDays?: InputMaybe<Scalars['banDays_Int_exclusiveMin_0']>
  emails?: InputMaybe<Array<Scalars['String']>>
  id?: InputMaybe<Scalars['ID']>
  password?: InputMaybe<Scalars['String']>
  state: UserState
}

export type UserLoginInput = {
  email: Scalars['email_String_NotNull_format_email']
  password: Scalars['String']
}

export type AuthResult = {
  __typename?: 'AuthResult'
  auth: Scalars['Boolean']
  token?: Maybe<Scalars['String']>
  type: AuthResultType
}

export enum AuthResultType {
  LinkAccount = 'LinkAccount',
  Login = 'Login',
  Signup = 'Signup',
}

export type UserRegisterInput = {
  codeId: Scalars['ID']
  description?: InputMaybe<Scalars['String']>
  displayName: Scalars['String']
  email: Scalars['email_String_NotNull_format_email']
  password: Scalars['String']
  userName?: InputMaybe<Scalars['String']>
}

export type VoteCommentInput = {
  id: Scalars['ID']
  vote: Vote
}

export type WalletLoginInput = {
  /** email verification code, required for wallet register */
  codeId?: InputMaybe<Scalars['ID']>
  /** required for wallet register */
  email?: InputMaybe<Scalars['email_String_format_email']>
  ethAddress: Scalars['String']
  /** nonce from generateSigningMessage */
  nonce: Scalars['String']
  /** sign'ed by wallet */
  signature: Scalars['String']
  /** the message being sign'ed, including nonce */
  signedMessage: Scalars['String']
}

export type ArticleArticleNotice = Notice & {
  __typename?: 'ArticleArticleNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  article: Article
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']
  /** Unique ID of this notice. */
  id: Scalars['ID']
  target: Article
  type: ArticleArticleNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']
}

export enum ArticleArticleNoticeType {
  ArticleNewCollected = 'ArticleNewCollected',
}

/**
 * ################################
 *                                #
 *            Article             #
 *                                #
 * ################################
 */
export type ArticleNotice = Notice & {
  __typename?: 'ArticleNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']
  /** Unique ID of this notice. */
  id: Scalars['ID']
  target: Article
  type: ArticleNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']
}

export enum ArticleNoticeType {
  ArticleMentionedYou = 'ArticleMentionedYou',
  ArticleNewAppreciation = 'ArticleNewAppreciation',
  ArticleNewSubscriber = 'ArticleNewSubscriber',
  ArticlePublished = 'ArticlePublished',
  CircleNewArticle = 'CircleNewArticle',
  RevisedArticleNotPublished = 'RevisedArticleNotPublished',
  RevisedArticlePublished = 'RevisedArticlePublished',
}

/**
 * ################################
 *                                #
 *              Tag               #
 *                                #
 * ################################
 */
export type ArticleTagNotice = Notice & {
  __typename?: 'ArticleTagNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']
  /** Unique ID of this notice. */
  id: Scalars['ID']
  tag: Tag
  target: Article
  type: ArticleTagNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']
}

export enum ArticleTagNoticeType {
  ArticleTagAdded = 'ArticleTagAdded',
  ArticleTagRemoved = 'ArticleTagRemoved',
  /** @deprecated No longer in use */
  ArticleTagUnselected = 'ArticleTagUnselected',
}

/**
 * ###################
 *     Directives    #
 * ###################
 */
export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

/**
 * ################################
 *                                #
 *             Circle             #
 *                                #
 * ################################
 */
export type CircleNotice = Notice & {
  __typename?: 'CircleNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  /** Optional discussion/broadcast comments for bundled notices */
  comments?: Maybe<Array<Comment>>
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']
  /** Unique ID of this notice. */
  id: Scalars['ID']
  /** Optional mention comments for bundled notices */
  mentions?: Maybe<Array<Comment>>
  /** Optional discussion/broadcast replies for bundled notices */
  replies?: Maybe<Array<Comment>>
  target: Circle
  type: CircleNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']
}

export enum CircleNoticeType {
  CircleInvitation = 'CircleInvitation',
  CircleNewBroadcastComments = 'CircleNewBroadcastComments',
  CircleNewDiscussionComments = 'CircleNewDiscussionComments',
  CircleNewFollower = 'CircleNewFollower',
  CircleNewSubscriber = 'CircleNewSubscriber',
  CircleNewUnsubscriber = 'CircleNewUnsubscriber',
}

export type CommentCommentNotice = Notice & {
  __typename?: 'CommentCommentNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  comment: Comment
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']
  /** Unique ID of this notice. */
  id: Scalars['ID']
  target: Comment
  type: CommentCommentNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']
}

export enum CommentCommentNoticeType {
  CommentNewReply = 'CommentNewReply',
}

/**
 * ################################
 *                                #
 *            Comment             #
 *                                #
 * ################################
 */
export type CommentNotice = Notice & {
  __typename?: 'CommentNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']
  /** Unique ID of this notice. */
  id: Scalars['ID']
  target: Comment
  type: CommentNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']
}

export enum CommentNoticeType {
  ArticleNewComment = 'ArticleNewComment',
  CircleNewBroadcast = 'CircleNewBroadcast',
  CommentMentionedYou = 'CommentMentionedYou',
  CommentPinned = 'CommentPinned',
  SubscribedArticleNewComment = 'SubscribedArticleNewComment',
}

export type CostComplexity = {
  max?: InputMaybe<Scalars['Int']>
  min?: InputMaybe<Scalars['Int']>
}

/**
 * ################################
 *                                #
 *             Crypto             #
 *                                #
 * ################################
 */
export type CryptoNotice = Notice & {
  __typename?: 'CryptoNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']
  /** Unique ID of this notice. */
  id: Scalars['ID']
  target: CryptoWallet
  type: CryptoNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']
}

export enum CryptoNoticeType {
  CryptoWalletAirdrop = 'CryptoWalletAirdrop',
  CryptoWalletConnected = 'CryptoWalletConnected',
}

export enum CryptoWalletSignaturePurpose {
  Airdrop = 'airdrop',
  Connect = 'connect',
  Login = 'login',
  Signup = 'signup',
}

/** The notice type contains info about official announcement. */
export type OfficialAnnouncementNotice = Notice & {
  __typename?: 'OfficialAnnouncementNotice'
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']
  /** Unique ID of this notice. */
  id: Scalars['ID']
  /** The link to a specific page if provided. */
  link?: Maybe<Scalars['String']>
  /** The message content. */
  message: Scalars['String']
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']
}

/** Enums for user roles. */
export enum Role {
  Admin = 'admin',
  User = 'user',
  Vistor = 'vistor',
}

export type TagNotice = Notice & {
  __typename?: 'TagNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']
  /** Unique ID of this notice. */
  id: Scalars['ID']
  target: Tag
  type: TagNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']
}

export enum TagNoticeType {
  TagAddEditor = 'TagAddEditor',
  TagAdoption = 'TagAdoption',
  TagLeave = 'TagLeave',
  TagLeaveEditor = 'TagLeaveEditor',
}

export type ToggleCircleMemberInput = {
  /** Toggle value. */
  enabled: Scalars['Boolean']
  /** Unique ID. */
  id: Scalars['ID']
  /** Unique ID of target user. */
  targetId: Scalars['ID']
}

/**
 * ################################
 *                                #
 *          Transaction           #
 *                                #
 * ################################
 */
export type TransactionNotice = Notice & {
  __typename?: 'TransactionNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']
  /** Unique ID of this notice. */
  id: Scalars['ID']
  target: Transaction
  type: TransactionNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']
}

export enum TransactionNoticeType {
  PaymentPayout = 'PaymentPayout',
  PaymentReceivedDonation = 'PaymentReceivedDonation',
}

export enum UserInfoFields {
  AgreeOn = 'agreeOn',
  Avatar = 'avatar',
  Description = 'description',
  DisplayName = 'displayName',
  Email = 'email',
}

/**
 * ################################
 *                                #
 *              User              #
 *                                #
 * ################################
 */
export type UserNotice = Notice & {
  __typename?: 'UserNotice'
  /** List of notice actors. */
  actors?: Maybe<Array<User>>
  /** Time of this notice was created. */
  createdAt: Scalars['DateTime']
  /** Unique ID of this notice. */
  id: Scalars['ID']
  target: User
  type: UserNoticeType
  /** The value determines if the notice is unread or not. */
  unread: Scalars['Boolean']
}

export enum UserNoticeType {
  UserNewFollower = 'UserNewFollower',
}

export type VerifyEmailInput = {
  codeId: Scalars['ID']
}

export type AnalyticsUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  info: { __typename?: 'UserInfo'; email?: any | null }
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
    mediaHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  } | null
}

export type ArticleDigestCardArticleFragment = {
  __typename?: 'Article'
  id: string
  state: ArticleState
  title: string
  slug: string
  mediaHash: string
  cover?: string | null
  summary: string
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

export type ArticleDigestDropdownArticleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  mediaHash: string
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

export type ArchiveArticleMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type ArchiveArticleMutation = {
  __typename?: 'Mutation'
  editArticle: {
    __typename?: 'Article'
    id: string
    sticky: boolean
    articleState: ArticleState
  }
}

export type ArchiveArticleArticleFragment = {
  __typename?: 'Article'
  id: string
  articleState: ArticleState
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type EditArticleButtonArticleFragment = {
  __typename?: 'Article'
  id: string
  mediaHash: string
  slug: string
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type ExtendArticleMutationVariables = Exact<{
  title: Scalars['String']
  collection?: InputMaybe<
    Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>
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

export type DeleteArticlesTagsMutationVariables = Exact<{
  id: Scalars['ID']
  articles?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>
}>

export type DeleteArticlesTagsMutation = {
  __typename?: 'Mutation'
  deleteArticlesTags: {
    __typename?: 'Tag'
    id: string
    articles: { __typename?: 'ArticleConnection'; totalCount: number }
  }
}

export type RemoveTagButtonArticleFragment = {
  __typename?: 'Article'
  id: string
  tags?: Array<{
    __typename?: 'Tag'
    id: string
    creator?: { __typename?: 'User'; id: string } | null
    editors?: Array<{ __typename?: 'User'; id: string }> | null
  }> | null
}

export type SetTagSelectedMutationVariables = Exact<{
  id: Scalars['ID']
  articles?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>
}>

export type SetTagSelectedMutation = {
  __typename?: 'Mutation'
  updateArticlesTags: {
    __typename?: 'Tag'
    id: string
    articles: { __typename?: 'ArticleConnection'; totalCount: number }
  }
}

export type SetTagSelectedButtonArticleFragment = {
  __typename?: 'Article'
  id: string
  tags?: Array<{
    __typename?: 'Tag'
    id: string
    creator?: { __typename?: 'User'; id: string } | null
    editors?: Array<{ __typename?: 'User'; id: string }> | null
  }> | null
}

export type SetTagUnselectedMutationVariables = Exact<{
  id: Scalars['ID']
  articles?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>
}>

export type SetTagUnselectedMutation = {
  __typename?: 'Mutation'
  updateArticlesTags: {
    __typename?: 'Tag'
    id: string
    articles: { __typename?: 'ArticleConnection'; totalCount: number }
  }
}

export type SetTagUnselectedButtonArticleFragment = {
  __typename?: 'Article'
  id: string
  tags?: Array<{
    __typename?: 'Tag'
    id: string
    creator?: { __typename?: 'User'; id: string } | null
    editors?: Array<{ __typename?: 'User'; id: string }> | null
  }> | null
}

export type ToggleStickyMutationVariables = Exact<{
  id: Scalars['ID']
  sticky: Scalars['Boolean']
}>

export type ToggleStickyMutation = {
  __typename?: 'Mutation'
  editArticle: { __typename?: 'Article'; id: string; sticky: boolean }
}

export type StickyButtonArticleFragment = {
  __typename?: 'Article'
  id: string
  sticky: boolean
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type DropdownActionsArticleFragment = {
  __typename?: 'Article'
  id: string
  mediaHash: string
  dataHash: string
  iscnId?: string | null
  createdAt: any
  revisedAt?: any | null
  sticky: boolean
  slug: string
  articleState: ArticleState
  appreciationsReceived: {
    __typename?: 'AppreciationConnection'
    totalCount: number
  }
  donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
  author: { __typename?: 'User'; id: string; userName?: string | null }
  access: { __typename?: 'ArticleAccess'; type: ArticleAccessType }
  drafts?: Array<{ __typename?: 'Draft'; iscnPublish?: boolean | null }> | null
  tags?: Array<{
    __typename?: 'Tag'
    id: string
    creator?: { __typename?: 'User'; id: string } | null
    editors?: Array<{ __typename?: 'User'; id: string }> | null
  }> | null
}

export type ArticleFeedFollowButtonUserPrivateFragment = {
  __typename?: 'User'
  id: string
  isFollower: boolean
  isFollowee: boolean
}

export type ActionsDonationCountArticleFragment = {
  __typename?: 'Article'
  id: string
  transactionsReceivedBy: { __typename?: 'UserConnection'; totalCount: number }
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
  mediaHash: string
  responseCount: number
  articleState: ArticleState
  author: { __typename?: 'User'; userName?: string | null }
}

export type FooterActionsArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  mediaHash: string
  createdAt: any
  readTime: number
  dataHash: string
  iscnId?: string | null
  revisedAt?: any | null
  sticky: boolean
  articleState: ArticleState
  author: { __typename?: 'User'; id: string; userName?: string | null }
  transactionsReceivedBy: { __typename?: 'UserConnection'; totalCount: number }
  appreciationsReceived: {
    __typename?: 'AppreciationConnection'
    totalCount: number
  }
  donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
  access: { __typename?: 'ArticleAccess'; type: ArticleAccessType }
  drafts?: Array<{ __typename?: 'Draft'; iscnPublish?: boolean | null }> | null
  tags?: Array<{
    __typename?: 'Tag'
    id: string
    creator?: { __typename?: 'User'; id: string } | null
    editors?: Array<{ __typename?: 'User'; id: string }> | null
  }> | null
}

export type FooterActionsArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  subscribed: boolean
}

export type ArticleDigestFeedArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  mediaHash: string
  cover?: string | null
  summary: string
  createdAt: any
  readTime: number
  dataHash: string
  iscnId?: string | null
  revisedAt?: any | null
  sticky: boolean
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
  transactionsReceivedBy: { __typename?: 'UserConnection'; totalCount: number }
  appreciationsReceived: {
    __typename?: 'AppreciationConnection'
    totalCount: number
  }
  donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
  drafts?: Array<{ __typename?: 'Draft'; iscnPublish?: boolean | null }> | null
  tags?: Array<{
    __typename?: 'Tag'
    id: string
    creator?: { __typename?: 'User'; id: string } | null
    editors?: Array<{ __typename?: 'User'; id: string }> | null
  }> | null
}

export type ArticleDigestFeedArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  subscribed: boolean
  author: {
    __typename?: 'User'
    id: string
    isFollower: boolean
    isFollowee: boolean
  }
}

export type ArticleDigestSidebarArticleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  mediaHash: string
  cover?: string | null
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

export type ArticleDigestTitleArticleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  mediaHash: string
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
  subscribed: boolean
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
}

export type UnblockUserButtonUserPrivateFragment = {
  __typename?: 'User'
  id: string
  isBlocked: boolean
}

export type AvatarCircleFragment = {
  __typename?: 'Circle'
  avatar?: string | null
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

export type ContentCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  content?: string | null
  state: CommentState
}

export type ContentCommentPrivateFragment = {
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
    | {
        __typename?: 'Article'
        id: string
        slug: string
        mediaHash: string
        author: { __typename?: 'User'; userName?: string | null }
      }
    | { __typename?: 'Circle'; id: string; name: string }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
}

export type DonatorLabelCommentFragment = {
  __typename?: 'Comment'
  id: string
  fromDonator: boolean
}

export type CollapseCommentMutationVariables = Exact<{
  id: Scalars['ID']
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

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteCommentMutation = {
  __typename?: 'Mutation'
  deleteComment: { __typename?: 'Comment'; id: string; state: CommentState }
}

export type PinButtonCommentFragment = {
  __typename?: 'Comment'
  id: string
  pinned: boolean
  node:
    | { __typename?: 'Article'; id: string; pinCommentLeft: number }
    | { __typename?: 'Circle'; id: string; name: string }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
}

export type UncollapseCommentMutationVariables = Exact<{
  id: Scalars['ID']
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

export type DropdownActionsCommentPublicFragment = {
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
    | {
        __typename?: 'Article'
        id: string
        mediaHash: string
        pinCommentLeft: number
        author: { __typename?: 'User'; id: string }
      }
    | {
        __typename?: 'Circle'
        id: string
        name: string
        owner: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
}

export type DropdownActionsCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  author: { __typename?: 'User'; id: string; isBlocked: boolean }
  node:
    | {
        __typename?: 'Article'
        id: string
        author: { __typename?: 'User'; id: string; isBlocking: boolean }
      }
    | {
        __typename?: 'Circle'
        id: string
        owner: { __typename?: 'User'; id: string; isBlocking: boolean }
      }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
}

export type FeedCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  fromDonator: boolean
  pinned: boolean
  state: CommentState
  content?: string | null
  type: CommentType
  createdAt: any
  upvotes: number
  downvotes: number
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
        mediaHash: string
        slug: string
        pinCommentLeft: number
        author: { __typename?: 'User'; id: string; userName?: string | null }
      }
    | {
        __typename?: 'Circle'
        id: string
        name: string
        owner: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
  parentComment?: { __typename?: 'Comment'; id: string } | null
}

export type FeedCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  myVote?: Vote | null
  type: CommentType
  createdAt: any
  node:
    | {
        __typename?: 'Article'
        id: string
        slug: string
        mediaHash: string
        author: {
          __typename?: 'User'
          id: string
          isBlocking: boolean
          userName?: string | null
        }
      }
    | {
        __typename?: 'Circle'
        id: string
        name: string
        owner: { __typename?: 'User'; id: string; isBlocking: boolean }
      }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
  author: { __typename?: 'User'; id: string; isBlocked: boolean }
  parentComment?: { __typename?: 'Comment'; id: string } | null
}

export type RefetchCommentQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type RefetchCommentQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'Circle' }
    | {
        __typename?: 'Comment'
        id: string
        fromDonator: boolean
        pinned: boolean
        state: CommentState
        content?: string | null
        type: CommentType
        createdAt: any
        upvotes: number
        downvotes: number
        myVote?: Vote | null
        comments: {
          __typename?: 'CommentConnection'
          edges?: Array<{
            __typename?: 'CommentEdge'
            cursor: string
            node: {
              __typename?: 'Comment'
              id: string
              fromDonator: boolean
              pinned: boolean
              state: CommentState
              content?: string | null
              type: CommentType
              createdAt: any
              upvotes: number
              downvotes: number
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
                    mediaHash: string
                    slug: string
                    pinCommentLeft: number
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
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
                | { __typename?: 'Comment' }
                | { __typename?: 'User' }
                | { __typename?: 'Draft' }
                | { __typename?: 'Tag' }
                | { __typename?: 'Topic' }
                | { __typename?: 'Chapter' }
              parentComment?: { __typename?: 'Comment'; id: string } | null
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
              mediaHash: string
              slug: string
              pinCommentLeft: number
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | {
              __typename?: 'Circle'
              id: string
              name: string
              owner: { __typename?: 'User'; id: string; isBlocking: boolean }
            }
          | { __typename?: 'Comment' }
          | { __typename?: 'User' }
          | { __typename?: 'Draft' }
          | { __typename?: 'Tag' }
          | { __typename?: 'Topic' }
          | { __typename?: 'Chapter' }
        parentComment?: { __typename?: 'Comment'; id: string } | null
      }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type DownvoteCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  upvotes: number
  downvotes: number
}

export type DownvoteCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  myVote?: Vote | null
}

export type ReplyComemntFragment = {
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
    | {
        __typename?: 'Circle'
        id: string
        owner: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
  parentComment?: { __typename?: 'Comment'; id: string } | null
}

export type UpvoteCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  upvotes: number
  downvotes: number
}

export type UpvoteCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  myVote?: Vote | null
}

export type FooterActionsCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  state: CommentState
  type: CommentType
  createdAt: any
  upvotes: number
  downvotes: number
  parentComment?: { __typename?: 'Comment'; id: string } | null
  node:
    | {
        __typename?: 'Article'
        id: string
        slug: string
        mediaHash: string
        author: { __typename?: 'User'; userName?: string | null; id: string }
      }
    | {
        __typename?: 'Circle'
        id: string
        name: string
        owner: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
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

export type FooterActionsCommentPrivateFragment = {
  __typename?: 'Comment'
  id: string
  myVote?: Vote | null
  type: CommentType
  createdAt: any
  node:
    | {
        __typename?: 'Article'
        id: string
        slug: string
        mediaHash: string
        author: {
          __typename?: 'User'
          id: string
          isBlocking: boolean
          userName?: string | null
        }
      }
    | {
        __typename?: 'Circle'
        id: string
        name: string
        owner: { __typename?: 'User'; id: string; isBlocking: boolean }
      }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
  parentComment?: { __typename?: 'Comment'; id: string } | null
}

export type PinnedLabelCommentFragment = {
  __typename?: 'Comment'
  id: string
  pinned: boolean
  node:
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
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

export type ThreadCommentCommentPublicFragment = {
  __typename?: 'Comment'
  id: string
  fromDonator: boolean
  pinned: boolean
  state: CommentState
  content?: string | null
  type: CommentType
  createdAt: any
  upvotes: number
  downvotes: number
  comments: {
    __typename?: 'CommentConnection'
    edges?: Array<{
      __typename?: 'CommentEdge'
      cursor: string
      node: {
        __typename?: 'Comment'
        id: string
        fromDonator: boolean
        pinned: boolean
        state: CommentState
        content?: string | null
        type: CommentType
        createdAt: any
        upvotes: number
        downvotes: number
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
              mediaHash: string
              slug: string
              pinCommentLeft: number
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
              owner: { __typename?: 'User'; id: string }
            }
          | { __typename?: 'Comment' }
          | { __typename?: 'User' }
          | { __typename?: 'Draft' }
          | { __typename?: 'Tag' }
          | { __typename?: 'Topic' }
          | { __typename?: 'Chapter' }
        parentComment?: { __typename?: 'Comment'; id: string } | null
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
        mediaHash: string
        slug: string
        pinCommentLeft: number
        author: { __typename?: 'User'; id: string; userName?: string | null }
      }
    | {
        __typename?: 'Circle'
        id: string
        name: string
        owner: { __typename?: 'User'; id: string }
      }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
  parentComment?: { __typename?: 'Comment'; id: string } | null
}

export type ThreadCommentCommentPrivateFragment = {
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
          | {
              __typename?: 'Article'
              id: string
              slug: string
              mediaHash: string
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | {
              __typename?: 'Circle'
              id: string
              name: string
              owner: { __typename?: 'User'; id: string; isBlocking: boolean }
            }
          | { __typename?: 'Comment' }
          | { __typename?: 'User' }
          | { __typename?: 'Draft' }
          | { __typename?: 'Tag' }
          | { __typename?: 'Topic' }
          | { __typename?: 'Chapter' }
        author: { __typename?: 'User'; id: string; isBlocked: boolean }
        parentComment?: { __typename?: 'Comment'; id: string } | null
      }
    }> | null
  }
  node:
    | {
        __typename?: 'Article'
        id: string
        slug: string
        mediaHash: string
        author: {
          __typename?: 'User'
          id: string
          isBlocking: boolean
          userName?: string | null
        }
      }
    | {
        __typename?: 'Circle'
        id: string
        name: string
        owner: { __typename?: 'User'; id: string; isBlocking: boolean }
      }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
  author: { __typename?: 'User'; id: string; isBlocked: boolean }
  parentComment?: { __typename?: 'Comment'; id: string } | null
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
  paymentPointer?: string | null
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
    tags: { __typename?: 'TagConnection'; totalCount: number }
  }
  followers: { __typename?: 'UserConnection'; totalCount: number }
}

export type ViewerUserPrivateFragment = {
  __typename?: 'User'
  id: string
  articles: { __typename?: 'ArticleConnection'; totalCount: number }
  settings: { __typename?: 'UserSettings'; currency: QuoteCurrency }
}

export type ArticleAppreciatorsQueryVariables = Exact<{
  id: Scalars['ID']
  after?: InputMaybe<Scalars['String']>
}>

export type ArticleAppreciatorsQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        appreciationsReceived: {
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
                isBlocked: boolean
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
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type AppreciatorsDialogArticleFragment = {
  __typename?: 'Article'
  id: string
  appreciationsReceived: {
    __typename?: 'AppreciationConnection'
    totalCount: number
  }
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

export type ArticleDonatorsQueryVariables = Exact<{
  id: Scalars['ID']
  after?: InputMaybe<Scalars['String']>
}>

export type ArticleDonatorsQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        donations: {
          __typename?: 'UserConnection'
          totalCount: number
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
              isBlocked: boolean
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
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type DonatorDialogArticleFragment = {
  __typename?: 'Article'
  id: string
  mediaHash: string
  donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
}

export type ArticleSecretQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type ArticleSecretQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        access: { __typename?: 'ArticleAccess'; secret?: string | null }
      }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type RetryEditArticleMutationVariables = Exact<{
  id: Scalars['ID']
  iscnPublish?: InputMaybe<Scalars['Boolean']>
}>

export type RetryEditArticleMutation = {
  __typename?: 'Mutation'
  editArticle: {
    __typename?: 'Article'
    id: string
    cover?: string | null
    license: ArticleLicenseType
    iscnId?: string | null
    access: { __typename?: 'ArticleAccess'; type: ArticleAccessType }
    drafts?: Array<{
      __typename?: 'Draft'
      id: string
      mediaHash?: string | null
      publishState: PublishState
      iscnPublish?: boolean | null
    }> | null
  }
}

export type GatewaysQueryVariables = Exact<{ [key: string]: never }>

export type GatewaysQuery = {
  __typename?: 'Query'
  official: { __typename?: 'Official'; gatewayUrls?: Array<string> | null }
}

export type FingerprintArticleFragment = {
  __typename?: 'Article'
  id: string
  mediaHash: string
  dataHash: string
  iscnId?: string | null
  createdAt: any
  revisedAt?: any | null
  author: { __typename?: 'User'; id: string }
  access: { __typename?: 'ArticleAccess'; type: ArticleAccessType }
  drafts?: Array<{ __typename?: 'Draft'; iscnPublish?: boolean | null }> | null
}

export type ArticleFingerprintPublicQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type ArticleFingerprintPublicQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        mediaHash: string
        dataHash: string
        iscnId?: string | null
        createdAt: any
        revisedAt?: any | null
        author: { __typename?: 'User'; id: string }
        access: { __typename?: 'ArticleAccess'; type: ArticleAccessType }
        drafts?: Array<{
          __typename?: 'Draft'
          iscnPublish?: boolean | null
        }> | null
      }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
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

export type GenerateLikerIdMutationVariables = Exact<{ [key: string]: never }>

export type GenerateLikerIdMutation = {
  __typename?: 'Mutation'
  generateLikerId: {
    __typename?: 'User'
    id: string
    liker: { __typename?: 'Liker'; likerId?: string | null }
    status?: { __typename?: 'UserStatus'; state: UserState } | null
  }
}

export type UpdatePaymentPointerMutationVariables = Exact<{
  input: UpdateUserInfoInput
}>

export type UpdatePaymentPointerMutation = {
  __typename?: 'Mutation'
  updateUserInfo: { __typename?: 'User'; paymentPointer?: string | null }
}

export type RecommendAuthorsQueryVariables = Exact<{
  random?: InputMaybe<Scalars['random_Int_min_0_max_49']>
  type?: InputMaybe<AuthorsType>
}>

export type RecommendAuthorsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    recommendation: {
      __typename?: 'Recommendation'
      authors: {
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
            isFollower: boolean
            isFollowee: boolean
            isBlocked: boolean
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

export type HottestTagsQueryVariables = Exact<{
  random?: InputMaybe<Scalars['random_Int_min_0_max_49']>
}>

export type HottestTagsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    recommendation: {
      __typename?: 'Recommendation'
      hottestTags: {
        __typename?: 'TagConnection'
        totalCount: number
        edges?: Array<{
          __typename?: 'TagEdge'
          cursor: string
          node: {
            __typename?: 'Tag'
            id: string
            content: string
            description?: string | null
            isFollower?: boolean | null
          }
        }> | null
      }
    }
  } | null
}

export type SelectedTagsQueryVariables = Exact<{
  random?: InputMaybe<Scalars['random_Int_min_0_max_49']>
}>

export type SelectedTagsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    recommendation: {
      __typename?: 'Recommendation'
      selectedTags: {
        __typename?: 'TagConnection'
        totalCount: number
        edges?: Array<{
          __typename?: 'TagEdge'
          cursor: string
          node: {
            __typename?: 'Tag'
            id: string
            content: string
            description?: string | null
            isFollower?: boolean | null
          }
        }> | null
      }
    }
  } | null
}

export type RssGatewaysQueryVariables = Exact<{ [key: string]: never }>

export type RssGatewaysQuery = {
  __typename?: 'Query'
  official: { __typename?: 'Official'; gatewayUrls?: Array<string> | null }
}

export type AuthorRssFeedFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  info: {
    __typename?: 'UserInfo'
    description?: string | null
    profileCover?: string | null
    ethAddress?: string | null
    ipnsKey?: string | null
  }
  articles: { __typename?: 'ArticleConnection'; totalCount: number }
}

export type AuthorRssFeedPublicQueryVariables = Exact<{
  userName: Scalars['String']
}>

export type AuthorRssFeedPublicQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    info: {
      __typename?: 'UserInfo'
      description?: string | null
      profileCover?: string | null
      ethAddress?: string | null
      ipnsKey?: string | null
    }
    articles: { __typename?: 'ArticleConnection'; totalCount: number }
  } | null
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

export type PutTagMutationVariables = Exact<{
  input: PutTagInput
}>

export type PutTagMutation = {
  __typename?: 'Mutation'
  putTag: {
    __typename?: 'Tag'
    id: string
    content: string
    cover?: string | null
    description?: string | null
  }
}

export type UnsubscribeCircleMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type UnsubscribeCircleMutation = {
  __typename?: 'Mutation'
  unsubscribeCircle: { __typename?: 'Circle'; id: string; isMember: boolean }
}

export type DeleteDraftMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteDraftMutation = {
  __typename?: 'Mutation'
  deleteDraft?: boolean | null
}

export type DeleteButtonDraftFragment = { __typename?: 'Draft'; id: string }

export type EditButtonDraftFragment = {
  __typename?: 'Draft'
  id: string
  slug: string
  title?: string | null
}

export type DraftDigestFeedDraftFragment = {
  __typename?: 'Draft'
  id: string
  title?: string | null
  slug: string
  updatedAt: any
}

export type EditorRecommendedTagsQueryVariables = Exact<{
  userName: Scalars['String']
}>

export type EditorRecommendedTagsQuery = {
  __typename?: 'Query'
  user?: {
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
          numAuthors: number
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
}

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput
}>

export type ResetPasswordMutation = {
  __typename?: 'Mutation'
  resetPassword?: boolean | null
}

export type UpdateUserInfoUserNameMutationVariables = Exact<{
  input: UpdateUserInfoInput
}>

export type UpdateUserInfoUserNameMutation = {
  __typename?: 'Mutation'
  updateUserInfo: { __typename?: 'User'; id: string; userName?: string | null }
}

export type UserLoginMutationVariables = Exact<{
  input: UserLoginInput
}>

export type UserLoginMutation = {
  __typename?: 'Mutation'
  userLogin: { __typename?: 'AuthResult'; auth: boolean; token?: string | null }
}

export type UserRegisterMutationVariables = Exact<{
  input: UserRegisterInput
}>

export type UserRegisterMutation = {
  __typename?: 'Mutation'
  userRegister: { __typename?: 'AuthResult'; auth: boolean }
}

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

export type RelatedDonationsQueryVariables = Exact<{
  senderUserName: Scalars['String']
  recipientUserName: Scalars['String']
  targetId: Scalars['ID']
  first?: InputMaybe<Scalars['first_Int_min_0']>
  random: Scalars['random_Int_min_0_max_49']
}>

export type RelatedDonationsQuery = {
  __typename?: 'Query'
  sender?: {
    __typename?: 'User'
    id: string
    status?: { __typename?: 'UserStatus'; donatedArticleCount: number } | null
  } | null
  recipient?: {
    __typename?: 'User'
    id: string
    status?: { __typename?: 'UserStatus'; receivedDonationCount: number } | null
  } | null
  node?:
    | {
        __typename?: 'Article'
        id: string
        relatedDonationArticles: {
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
              mediaHash: string
              cover?: string | null
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
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
    | null
}

export type ViewerTxStateQueryVariables = Exact<{
  id: Scalars['ID']
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

export type SetPaymentPasswordMutationVariables = Exact<{
  password?: InputMaybe<Scalars['String']>
}>

export type SetPaymentPasswordMutation = {
  __typename?: 'Mutation'
  updateUserInfo: {
    __typename?: 'User'
    id: string
    status?: { __typename?: 'UserStatus'; hasPaymentPassword: boolean } | null
  }
}

export type ViewerCircleStateQueryVariables = Exact<{
  name: Scalars['String']
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
  }
}

export type EthAddressUserQueryVariables = Exact<{
  ethAddress?: InputMaybe<Scalars['String']>
}>

export type EthAddressUserQuery = {
  __typename?: 'Query'
  user?: { __typename?: 'User'; id: string } | null
}

export type EditorCollectionFragment = {
  __typename?: 'Article'
  id: string
  collection: {
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
        mediaHash: string
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

export type ArticleCollectionFragment = {
  __typename?: 'Article'
  id: string
  collection: {
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
        mediaHash: string
        cover?: string | null
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

export type AssetFragment = {
  __typename?: 'Asset'
  id: string
  type: AssetType
  path: string
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
  article?: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    author: { __typename?: 'User'; id: string; userName?: string | null }
  } | null
}

export type FollowersTagFragment = {
  __typename?: 'Tag'
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

export type ArticleCountTagFragment = {
  __typename?: 'Tag'
  id: string
  numAuthors: number
  numArticles: number
  articles: { __typename?: 'ArticleConnection'; totalCount: number }
}

export type AddArticlesTagsMutationVariables = Exact<{
  id: Scalars['ID']
  articles?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>
  selected?: InputMaybe<Scalars['Boolean']>
}>

export type AddArticlesTagsMutation = {
  __typename?: 'Mutation'
  addArticlesTags: {
    __typename?: 'Tag'
    id: string
    articles: { __typename?: 'ArticleConnection'; totalCount: number }
  }
}

export type ChangeEmailMutationVariables = Exact<{
  input: ChangeEmailInput
}>

export type ChangeEmailMutation = {
  __typename?: 'Mutation'
  changeEmail: {
    __typename?: 'User'
    id: string
    info: { __typename?: 'UserInfo'; email?: any | null }
  }
}

export type CreateDraftMutationVariables = Exact<{
  title: Scalars['String']
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>
}>

export type CreateDraftMutation = {
  __typename?: 'Mutation'
  putDraft: { __typename?: 'Draft'; id: string; slug: string }
}

export type InviteCircleMutationVariables = Exact<{
  circleId: Scalars['ID']
  freePeriod: Scalars['freePeriod_Int_NotNull_exclusiveMin_0']
  invitees: Array<InviteCircleInvitee> | InviteCircleInvitee
}>

export type InviteCircleMutation = {
  __typename?: 'Mutation'
  invite?: Array<{ __typename?: 'Invitation'; id: string }> | null
}

export type MigrationMutationVariables = Exact<{
  input: MigrationInput
}>

export type MigrationMutation = {
  __typename?: 'Mutation'
  migration?: boolean | null
}

export type PayToMutationVariables = Exact<{
  amount: Scalars['amount_Float_NotNull_exclusiveMin_0']
  currency: TransactionCurrency
  purpose: TransactionPurpose
  recipientId: Scalars['ID']
  targetId?: InputMaybe<Scalars['ID']>
  password?: InputMaybe<Scalars['String']>
  chain?: InputMaybe<Chain>
  txHash?: InputMaybe<Scalars['String']>
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
  amount: Scalars['amount_Float_NotNull_exclusiveMin_0']
  password: Scalars['String']
}>

export type PayoutMutation = {
  __typename?: 'Mutation'
  payout: { __typename?: 'Transaction'; id: string; state: TransactionState }
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
  id: Scalars['ID']
  articles?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>
  type: PutCircleArticlesType
  accessType: ArticleAccessType
  license: ArticleLicenseType
}>

export type PutCircleArticlesMutation = {
  __typename?: 'Mutation'
  putCircleArticles: { __typename?: 'Circle'; id: string }
}

export type PutCommentMutationVariables = Exact<{
  input: PutCommentInput
}>

export type PutCommentMutation = {
  __typename?: 'Mutation'
  putComment: { __typename?: 'Comment'; id: string; content?: string | null }
}

export type SendVerificationCodeMutationVariables = Exact<{
  input: SendVerificationCodeInput
}>

export type SendVerificationCodeMutation = {
  __typename?: 'Mutation'
  sendVerificationCode?: boolean | null
}

export type ToggleBlockUserMutationVariables = Exact<{
  id: Scalars['ID']
  enabled?: InputMaybe<Scalars['Boolean']>
}>

export type ToggleBlockUserMutation = {
  __typename?: 'Mutation'
  toggleBlockUser: { __typename?: 'User'; id: string; isBlocked: boolean }
}

export type ToggleFollowCircleMutationVariables = Exact<{
  id: Scalars['ID']
  enabled?: InputMaybe<Scalars['Boolean']>
}>

export type ToggleFollowCircleMutation = {
  __typename?: 'Mutation'
  toggleFollowCircle: { __typename?: 'Circle'; id: string; isFollower: boolean }
}

export type ToggleFollowTagMutationVariables = Exact<{
  id: Scalars['ID']
  enabled?: InputMaybe<Scalars['Boolean']>
}>

export type ToggleFollowTagMutation = {
  __typename?: 'Mutation'
  toggleFollowTag: {
    __typename?: 'Tag'
    id: string
    isFollower?: boolean | null
  }
}

export type ToggleFollowUserMutationVariables = Exact<{
  id: Scalars['ID']
  enabled?: InputMaybe<Scalars['Boolean']>
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

export type TogglePinCommentMutationVariables = Exact<{
  id: Scalars['ID']
  enabled?: InputMaybe<Scalars['Boolean']>
}>

export type TogglePinCommentMutation = {
  __typename?: 'Mutation'
  togglePinComment: {
    __typename?: 'Comment'
    id: string
    pinned: boolean
    node:
      | { __typename?: 'Article'; id: string; pinCommentLeft: number }
      | { __typename?: 'Circle'; id: string }
      | { __typename?: 'Comment' }
      | { __typename?: 'User' }
      | { __typename?: 'Draft' }
      | { __typename?: 'Tag' }
      | { __typename?: 'Topic' }
      | { __typename?: 'Chapter' }
  }
}

export type ToggleSubscribeArticleMutationVariables = Exact<{
  id: Scalars['ID']
  enabled?: InputMaybe<Scalars['Boolean']>
}>

export type ToggleSubscribeArticleMutation = {
  __typename?: 'Mutation'
  toggleSubscribeArticle: {
    __typename?: 'Article'
    id: string
    subscribed: boolean
  }
}

export type UpdateTagSettingMutationVariables = Exact<{
  input: UpdateTagSettingInput
}>

export type UpdateTagSettingMutation = {
  __typename?: 'Mutation'
  updateTagSetting: {
    __typename?: 'Tag'
    id: string
    editors?: Array<{
      __typename?: 'User'
      id: string
      avatar?: string | null
      liker: { __typename?: 'Liker'; civicLiker: boolean }
      info: {
        __typename?: 'UserInfo'
        badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      }
    }> | null
    owner?: {
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
      }
    } | null
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
  id: Scalars['ID']
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
  id: Scalars['ID']
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

export type CircleAcceptedInvitesQueryVariables = Exact<{
  name: Scalars['String']
  after?: InputMaybe<Scalars['String']>
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

export type CircleFollowerCountQueryVariables = Exact<{
  name: Scalars['String']
}>

export type CircleFollowerCountQuery = {
  __typename?: 'Query'
  circle?: {
    __typename?: 'Circle'
    id: string
    followers: { __typename?: 'UserConnection'; totalCount: number }
  } | null
}

export type CirclePendingInvitesQueryVariables = Exact<{
  name: Scalars['String']
  after?: InputMaybe<Scalars['String']>
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

export type ClientInfoQueryVariables = Exact<{ [key: string]: never }>

export type ClientInfoQuery = {
  __typename?: 'Query'
  clientInfo: {
    __typename?: 'ClientInfo'
    id: string
    viewportSize: {
      __typename?: 'ViewportSize'
      width?: number | null
      height?: number | null
    }
  }
}

export type ClientPreferenceQueryVariables = Exact<{ [key: string]: never }>

export type ClientPreferenceQuery = {
  __typename?: 'Query'
  clientPreference: {
    __typename?: 'ClientPreference'
    id: string
    readCivicLikerDialog: boolean
    wall: boolean
    routeHistory?: Array<string> | null
    circleBanner: boolean
    announcement?: number | null
    onboardingTasks: { __typename?: 'OnboardingTasks'; enabled: boolean }
  }
}

export type CommentDraftQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type CommentDraftQuery = {
  __typename?: 'Query'
  commentDraft: { __typename?: 'CommentDraft'; id: string; content: string }
}

export type DraftPublishStateQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type DraftPublishStateQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | {
        __typename?: 'Draft'
        id: string
        publishState: PublishState
        article?: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          mediaHash: string
          author: { __typename?: 'User'; id: string; userName?: string | null }
        } | null
      }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
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

export type SearchArticlesQueryVariables = Exact<{
  search: Scalars['String']
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
            mediaHash: string
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
        | { __typename?: 'Circle' }
        | { __typename?: 'Comment' }
        | { __typename?: 'User' }
        | { __typename?: 'Draft' }
        | { __typename?: 'Tag' }
        | { __typename?: 'Topic' }
        | { __typename?: 'Chapter' }
    }> | null
  }
}

export type SearchTagsQueryQueryVariables = Exact<{
  search: Scalars['String']
}>

export type SearchTagsQueryQuery = {
  __typename?: 'Query'
  search: {
    __typename?: 'SearchResultConnection'
    edges?: Array<{
      __typename?: 'SearchResultEdge'
      node:
        | { __typename?: 'Article' }
        | { __typename?: 'Circle' }
        | { __typename?: 'Comment' }
        | { __typename?: 'User' }
        | { __typename?: 'Draft' }
        | {
            __typename?: 'Tag'
            id: string
            content: string
            numArticles: number
          }
        | { __typename?: 'Topic' }
        | { __typename?: 'Chapter' }
    }> | null
  }
}

export type SearchUsersQueryVariables = Exact<{
  search: Scalars['String']
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
        | { __typename?: 'Circle' }
        | { __typename?: 'Comment' }
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
        | { __typename?: 'Draft' }
        | { __typename?: 'Tag' }
        | { __typename?: 'Topic' }
        | { __typename?: 'Chapter' }
    }> | null
  }
}

export type TagArticlesPublicQueryVariables = Exact<{
  id: Scalars['ID']
  after?: InputMaybe<Scalars['String']>
  selected?: InputMaybe<Scalars['Boolean']>
  sortBy?: InputMaybe<TagArticlesSortBy>
}>

export type TagArticlesPublicQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | {
        __typename?: 'Tag'
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
              mediaHash: string
              cover?: string | null
              summary: string
              createdAt: any
              readTime: number
              subscribed: boolean
              dataHash: string
              iscnId?: string | null
              revisedAt?: any | null
              sticky: boolean
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                isFollower: boolean
                isFollowee: boolean
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
              transactionsReceivedBy: {
                __typename?: 'UserConnection'
                totalCount: number
              }
              appreciationsReceived: {
                __typename?: 'AppreciationConnection'
                totalCount: number
              }
              donationsDialog: {
                __typename?: 'UserConnection'
                totalCount: number
              }
              drafts?: Array<{
                __typename?: 'Draft'
                iscnPublish?: boolean | null
              }> | null
              tags?: Array<{
                __typename?: 'Tag'
                id: string
                creator?: { __typename?: 'User'; id: string } | null
                editors?: Array<{ __typename?: 'User'; id: string }> | null
              }> | null
            }
          }> | null
        }
      }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type TagArticlesPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID']
}>

export type TagArticlesPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | {
        __typename?: 'Article'
        id: string
        subscribed: boolean
        author: {
          __typename?: 'User'
          id: string
          isFollower: boolean
          isFollowee: boolean
        }
      }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
  > | null
}

export type TagArticlesCountQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type TagArticlesCountQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | {
        __typename?: 'Tag'
        id: string
        numAuthors: number
        numArticles: number
        articles: { __typename?: 'ArticleConnection'; totalCount: number }
      }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type TagFollowersQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type TagFollowersQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | {
        __typename?: 'Tag'
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
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type TagMaintainersQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type TagMaintainersQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | {
        __typename: 'Tag'
        id: string
        owner?: {
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
        } | null
        editors?: Array<{
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
        }> | null
      }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
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
  userName: Scalars['String']
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
    liker: { __typename?: 'Liker'; total: number; rateUSD?: number | null }
  } | null
}

export type ViewerFolloweeCountQueryVariables = Exact<{ [key: string]: never }>

export type ViewerFolloweeCountQuery = {
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

export type ViewerFollowingTagCountQueryVariables = Exact<{
  [key: string]: never
}>

export type ViewerFollowingTagCountQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    following: {
      __typename?: 'Following'
      tags: { __typename?: 'TagConnection'; totalCount: number }
    }
  } | null
}

export type UpdateUserInfoAgreeOnMutationVariables = Exact<{
  input: UpdateUserInfoInput
}>

export type UpdateUserInfoAgreeOnMutation = {
  __typename?: 'Mutation'
  updateUserInfo: {
    __typename?: 'User'
    id: string
    info: { __typename?: 'UserInfo'; agreeOn?: any | null }
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
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
  collection: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    cover?: string | null
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
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
  collection: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    cover?: string | null
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
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    cover?: string | null
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
}

export type ArticleNewAppreciationNoticeFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    avatar?: string | null
    displayName?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    cover?: string | null
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
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    cover?: string | null
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
}

export type ArticlePublishedNoticeFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    cover?: string | null
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
}

export type CircleNewArticleNoticeFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    cover?: string | null
    articleState: ArticleState
    access: {
      __typename?: 'ArticleAccess'
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
  }
}

export type RevisedArticleNotPublishedNoticeFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    cover?: string | null
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
}

export type RevisedArticlePublishedNoticeFragment = {
  __typename?: 'ArticleNotice'
  id: string
  createdAt: any
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    cover?: string | null
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
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    cover?: string | null
    articleState: ArticleState
    access: {
      __typename?: 'ArticleAccess'
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
  }
}

export type ArticleTagAddedNoticeFragment = {
  __typename?: 'ArticleTagNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  target: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    articleState: ArticleState
    author: {
      __typename?: 'User'
      displayName?: string | null
      id: string
      userName?: string | null
    }
  }
  tag: {
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
    numAuthors: number
  }
}

export type ArticleTagRemovedNoticeFragment = {
  __typename?: 'ArticleTagNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  target: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
  tag: {
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
    numAuthors: number
  }
}

export type ArticleTagUnselectedNoticeFragment = {
  __typename?: 'ArticleTagNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  target: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
  tag: {
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
    numAuthors: number
  }
}

export type ArticleTagNoticeFragment = {
  __typename: 'ArticleTagNotice'
  id: string
  unread: boolean
  createdAt: any
  articleTagNoticeType: ArticleTagNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  target: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    articleState: ArticleState
    author: {
      __typename?: 'User'
      displayName?: string | null
      id: string
      userName?: string | null
    }
  }
  tag: {
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
    numAuthors: number
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
    avatar?: string | null
    displayName?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
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
    author: { __typename?: 'User'; id: string }
  }> | null
  mentions?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
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
    avatar?: string | null
    displayName?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
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

export type CircleNewUserNoticeFragment = {
  __typename?: 'CircleNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    avatar?: string | null
    displayName?: string | null
    isFollower: boolean
    isFollowee: boolean
    isBlocked: boolean
    liker: { __typename?: 'Liker'; civicLiker: boolean }
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
    isBlocked: boolean
    liker: { __typename?: 'Liker'; civicLiker: boolean }
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
    parentComment?: { __typename?: 'Comment'; id: string } | null
  }> | null
  replies?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    parentComment?: { __typename?: 'Comment'; id: string } | null
    author: { __typename?: 'User'; id: string }
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

export type CommentNewReplyNoticeFragment = {
  __typename?: 'CommentCommentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    avatar?: string | null
    displayName?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
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
          mediaHash: string
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Comment' }
      | { __typename?: 'User' }
      | { __typename?: 'Draft' }
      | { __typename?: 'Tag' }
      | { __typename?: 'Topic' }
      | { __typename?: 'Chapter' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
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
          mediaHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Comment' }
      | { __typename?: 'User' }
      | { __typename?: 'Draft' }
      | { __typename?: 'Tag' }
      | { __typename?: 'Topic' }
      | { __typename?: 'Chapter' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
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
    avatar?: string | null
    displayName?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
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
          mediaHash: string
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Comment' }
      | { __typename?: 'User' }
      | { __typename?: 'Draft' }
      | { __typename?: 'Tag' }
      | { __typename?: 'Topic' }
      | { __typename?: 'Chapter' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
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
          mediaHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Comment' }
      | { __typename?: 'User' }
      | { __typename?: 'Draft' }
      | { __typename?: 'Tag' }
      | { __typename?: 'Topic' }
      | { __typename?: 'Chapter' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
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
    avatar?: string | null
    displayName?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
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
          mediaHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Comment' }
      | { __typename?: 'User' }
      | { __typename?: 'Draft' }
      | { __typename?: 'Tag' }
      | { __typename?: 'Topic' }
      | { __typename?: 'Chapter' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
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
    avatar?: string | null
    displayName?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
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
          mediaHash: string
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Comment' }
      | { __typename?: 'User' }
      | { __typename?: 'Draft' }
      | { __typename?: 'Tag' }
      | { __typename?: 'Topic' }
      | { __typename?: 'Chapter' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
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
    avatar?: string | null
    displayName?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
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
          mediaHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Comment' }
      | { __typename?: 'User' }
      | { __typename?: 'Draft' }
      | { __typename?: 'Tag' }
      | { __typename?: 'Topic' }
      | { __typename?: 'Chapter' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
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
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
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
          mediaHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Comment' }
      | { __typename?: 'User' }
      | { __typename?: 'Draft' }
      | { __typename?: 'Tag' }
      | { __typename?: 'Topic' }
      | { __typename?: 'Chapter' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type SubscribedArticleNewCommentNoticeFragment = {
  __typename?: 'CommentNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    avatar?: string | null
    displayName?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
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
          mediaHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Comment' }
      | { __typename?: 'User' }
      | { __typename?: 'Draft' }
      | { __typename?: 'Tag' }
      | { __typename?: 'Topic' }
      | { __typename?: 'Chapter' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
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
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
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
          mediaHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Comment' }
      | { __typename?: 'User' }
      | { __typename?: 'Draft' }
      | { __typename?: 'Tag' }
      | { __typename?: 'Topic' }
      | { __typename?: 'Chapter' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

export type CryptoWalletAirdropNoticeFragment = {
  __typename: 'CryptoNotice'
  id: string
  unread: boolean
  type: CryptoNoticeType
  createdAt: any
  target: { __typename?: 'CryptoWallet'; address: string }
}

export type CryptoWalletConnectedNoticeFragment = {
  __typename: 'CryptoNotice'
  id: string
  unread: boolean
  type: CryptoNoticeType
  createdAt: any
  target: { __typename?: 'CryptoWallet'; address: string }
}

export type CryptoNoticeFragment = {
  __typename: 'CryptoNotice'
  id: string
  unread: boolean
  type: CryptoNoticeType
  createdAt: any
  target: { __typename?: 'CryptoWallet'; address: string }
}

export type NoticeActorAvatarUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  avatar?: string | null
  liker: { __typename?: 'Liker'; civicLiker: boolean }
  info: {
    __typename?: 'UserInfo'
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
  }
}

export type NoticeActorNameUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
}

export type NoticeArticleCardFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  mediaHash: string
  cover?: string | null
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

export type NoticeArticleTitleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  mediaHash: string
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
        mediaHash: string
        author: { __typename?: 'User'; id: string; userName?: string | null }
      }
    | { __typename?: 'Circle'; id: string; name: string }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
  parentComment?: { __typename?: 'Comment'; id: string } | null
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

type NoticeDate_ArticleTagNotice_Fragment = {
  __typename?: 'ArticleTagNotice'
  id: string
  createdAt: any
}

type NoticeDate_CircleNotice_Fragment = {
  __typename?: 'CircleNotice'
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

type NoticeDate_CryptoNotice_Fragment = {
  __typename?: 'CryptoNotice'
  id: string
  createdAt: any
}

type NoticeDate_OfficialAnnouncementNotice_Fragment = {
  __typename?: 'OfficialAnnouncementNotice'
  id: string
  createdAt: any
}

type NoticeDate_TagNotice_Fragment = {
  __typename?: 'TagNotice'
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
  | NoticeDate_ArticleTagNotice_Fragment
  | NoticeDate_CircleNotice_Fragment
  | NoticeDate_CommentCommentNotice_Fragment
  | NoticeDate_CommentNotice_Fragment
  | NoticeDate_CryptoNotice_Fragment
  | NoticeDate_OfficialAnnouncementNotice_Fragment
  | NoticeDate_TagNotice_Fragment
  | NoticeDate_TransactionNotice_Fragment
  | NoticeDate_UserNotice_Fragment

export type NoticeHeadActorsUserFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
}

export type NoticeTagFragment = {
  __typename?: 'Tag'
  id: string
  content: string
  numArticles: number
  numAuthors: number
}

export type NoticeUserCardFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  isFollower: boolean
  isFollowee: boolean
  isBlocked: boolean
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

export type TagAddEditorNoticeFragment = {
  __typename?: 'TagNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  tag: {
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
    numAuthors: number
  }
}

export type TagAdoptionNoticeFragment = {
  __typename?: 'TagNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  tag: {
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
    numAuthors: number
  }
}

export type TagLeaveEditorNoticeFragment = {
  __typename?: 'TagNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  tag: {
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
    numAuthors: number
  }
}

export type TagLeaveNoticeFragment = {
  __typename?: 'TagNotice'
  id: string
  createdAt: any
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  tag: {
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
    numAuthors: number
  }
}

export type TagNoticeFragment = {
  __typename: 'TagNotice'
  id: string
  unread: boolean
  createdAt: any
  tagNoticeType: TagNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  tag: {
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
    numAuthors: number
  }
}

export type PaymentPayoutNoticeFragment = {
  __typename?: 'TransactionNotice'
  id: string
  createdAt: any
  tx: {
    __typename?: 'Transaction'
    id: string
    amount: number
    currency: TransactionCurrency
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
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
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
          title: string
          slug: string
          mediaHash: string
          cover?: string | null
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
      | { __typename: 'Circle' }
      | { __typename: 'Transaction' }
      | null
  }
}

export type TransactionNoticeFragment = {
  __typename: 'TransactionNotice'
  id: string
  unread: boolean
  createdAt: any
  txNoticeType: TransactionNoticeType
  tx: {
    __typename?: 'Transaction'
    id: string
    amount: number
    currency: TransactionCurrency
    target?:
      | {
          __typename: 'Article'
          id: string
          title: string
          slug: string
          mediaHash: string
          cover?: string | null
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
      | { __typename: 'Circle' }
      | { __typename: 'Transaction' }
      | null
  }
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
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
    avatar?: string | null
    displayName?: string | null
    isFollower: boolean
    isFollowee: boolean
    isBlocked: boolean
    liker: { __typename?: 'Liker'; civicLiker: boolean }
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
    avatar?: string | null
    displayName?: string | null
    isFollower: boolean
    isFollowee: boolean
    isBlocked: boolean
    liker: { __typename?: 'Liker'; civicLiker: boolean }
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
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    articleState: ArticleState
    author: { __typename?: 'User'; id: string; userName?: string | null }
  }
  collection: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    cover?: string | null
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
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  article: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    cover?: string | null
    articleState: ArticleState
    access: {
      __typename?: 'ArticleAccess'
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
  }
}

type DigestNotice_ArticleTagNotice_Fragment = {
  __typename: 'ArticleTagNotice'
  id: string
  unread: boolean
  createdAt: any
  articleTagNoticeType: ArticleTagNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  target: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    articleState: ArticleState
    author: {
      __typename?: 'User'
      displayName?: string | null
      id: string
      userName?: string | null
    }
  }
  tag: {
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
    numAuthors: number
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
    isBlocked: boolean
    liker: { __typename?: 'Liker'; civicLiker: boolean }
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
    parentComment?: { __typename?: 'Comment'; id: string } | null
  }> | null
  replies?: Array<{
    __typename?: 'Comment'
    id: string
    type: CommentType
    parentComment?: { __typename?: 'Comment'; id: string } | null
    author: { __typename?: 'User'; id: string }
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
    avatar?: string | null
    displayName?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
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
          mediaHash: string
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'Circle'; id: string; name: string }
      | { __typename?: 'Comment' }
      | { __typename?: 'User' }
      | { __typename?: 'Draft' }
      | { __typename?: 'Tag' }
      | { __typename?: 'Topic' }
      | { __typename?: 'Chapter' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
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
          mediaHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Comment' }
      | { __typename?: 'User' }
      | { __typename?: 'Draft' }
      | { __typename?: 'Tag' }
      | { __typename?: 'Topic' }
      | { __typename?: 'Chapter' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
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
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
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
          mediaHash: string
          articleState: ArticleState
          author: { __typename?: 'User'; id: string; userName?: string | null }
        }
      | { __typename?: 'Circle'; id: string; name: string; displayName: string }
      | { __typename?: 'Comment' }
      | { __typename?: 'User' }
      | { __typename?: 'Draft' }
      | { __typename?: 'Tag' }
      | { __typename?: 'Topic' }
      | { __typename?: 'Chapter' }
    parentComment?: { __typename?: 'Comment'; id: string } | null
    author: { __typename?: 'User'; id: string; isBlocked: boolean }
  }
}

type DigestNotice_CryptoNotice_Fragment = {
  __typename: 'CryptoNotice'
  id: string
  unread: boolean
  type: CryptoNoticeType
  createdAt: any
  target: { __typename?: 'CryptoWallet'; address: string }
}

type DigestNotice_OfficialAnnouncementNotice_Fragment = {
  __typename: 'OfficialAnnouncementNotice'
  id: string
  unread: boolean
  link?: string | null
  message: string
  createdAt: any
}

type DigestNotice_TagNotice_Fragment = {
  __typename: 'TagNotice'
  id: string
  unread: boolean
  createdAt: any
  tagNoticeType: TagNoticeType
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
  tag: {
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
    numAuthors: number
  }
}

type DigestNotice_TransactionNotice_Fragment = {
  __typename: 'TransactionNotice'
  id: string
  unread: boolean
  createdAt: any
  txNoticeType: TransactionNoticeType
  tx: {
    __typename?: 'Transaction'
    id: string
    amount: number
    currency: TransactionCurrency
    target?:
      | {
          __typename: 'Article'
          id: string
          title: string
          slug: string
          mediaHash: string
          cover?: string | null
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
      | { __typename: 'Circle' }
      | { __typename: 'Transaction' }
      | null
  }
  actors?: Array<{
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    liker: { __typename?: 'Liker'; civicLiker: boolean }
    info: {
      __typename?: 'UserInfo'
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    }
  }> | null
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
    avatar?: string | null
    displayName?: string | null
    isFollower: boolean
    isFollowee: boolean
    isBlocked: boolean
    liker: { __typename?: 'Liker'; civicLiker: boolean }
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
  }> | null
}

export type DigestNoticeFragment =
  | DigestNotice_ArticleArticleNotice_Fragment
  | DigestNotice_ArticleNotice_Fragment
  | DigestNotice_ArticleTagNotice_Fragment
  | DigestNotice_CircleNotice_Fragment
  | DigestNotice_CommentCommentNotice_Fragment
  | DigestNotice_CommentNotice_Fragment
  | DigestNotice_CryptoNotice_Fragment
  | DigestNotice_OfficialAnnouncementNotice_Fragment
  | DigestNotice_TagNotice_Fragment
  | DigestNotice_TransactionNotice_Fragment
  | DigestNotice_UserNotice_Fragment

export type ViewerPublicFragment = {
  __typename?: 'User'
  id: string
  userName?: string | null
  displayName?: string | null
  avatar?: string | null
  paymentPointer?: string | null
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
    tags: { __typename?: 'TagConnection'; totalCount: number }
  }
  followers: { __typename?: 'UserConnection'; totalCount: number }
}

export type ViewerPrivateFragment = {
  __typename?: 'User'
  id: string
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

export type RootQueryPublicQueryVariables = Exact<{ [key: string]: never }>

export type RootQueryPublicQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    paymentPointer?: string | null
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
      tags: { __typename?: 'TagConnection'; totalCount: number }
    }
    followers: { __typename?: 'UserConnection'; totalCount: number }
  } | null
  official: {
    __typename?: 'Official'
    features: Array<{
      __typename?: 'Feature'
      name: FeatureName
      enabled: boolean
    }>
  }
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
    paymentPointer?: string | null
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
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
      } | null
    }
    settings: {
      __typename?: 'UserSettings'
      language: UserLanguage
      currency: QuoteCurrency
    }
    following: {
      __typename?: 'Following'
      users: { __typename?: 'UserConnection'; totalCount: number }
      tags: { __typename?: 'TagConnection'; totalCount: number }
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
}

export type SearchAutoCompleteQueryVariables = Exact<{
  searchKey?: InputMaybe<Scalars['String']>
}>

export type SearchAutoCompleteQuery = {
  __typename?: 'Query'
  frequentSearch?: Array<string> | null
}

export type RecentSearchesUserFragment = {
  __typename?: 'User'
  activity: {
    __typename?: 'UserActivity'
    recentSearches: {
      __typename?: 'RecentSearchConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasNextPage: boolean
      }
      edges?: Array<{
        __typename?: 'RecentSearchEdge'
        cursor: string
        node: string
      }> | null
    }
  }
}

export type ClearHistoryMutationVariables = Exact<{ [key: string]: never }>

export type ClearHistoryMutation = {
  __typename?: 'Mutation'
  clearSearchHistory?: boolean | null
}

export type ViewerRecentSearchesQueryVariables = Exact<{ [key: string]: never }>

export type ViewerRecentSearchesQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    activity: {
      __typename?: 'UserActivity'
      recentSearches: {
        __typename?: 'RecentSearchConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'RecentSearchEdge'
          cursor: string
          node: string
        }> | null
      }
    }
  } | null
}

export type SearchOverviewPublicQueryVariables = Exact<{ [key: string]: never }>

export type SearchOverviewPublicQuery = {
  __typename?: 'Query'
  frequentSearch?: Array<string> | null
  viewer?: {
    __typename?: 'User'
    id: string
    activity: {
      __typename?: 'UserActivity'
      recentSearches: {
        __typename?: 'RecentSearchConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'RecentSearchEdge'
          cursor: string
          node: string
        }> | null
      }
    }
  } | null
}

export type SearchOverviewPrivateQueryVariables = Exact<{
  [key: string]: never
}>

export type SearchOverviewPrivateQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    activity: {
      __typename?: 'UserActivity'
      recentSearches: {
        __typename?: 'RecentSearchConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          startCursor?: string | null
          endCursor?: string | null
          hasNextPage: boolean
        }
        edges?: Array<{
          __typename?: 'RecentSearchEdge'
          cursor: string
          node: string
        }> | null
      }
    }
  } | null
}

export type SelectSearchQueryVariables = Exact<{
  key: Scalars['String']
  type: SearchTypes
  filter?: InputMaybe<SearchFilter>
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  exclude?: InputMaybe<SearchExclude>
  includeAuthorTags?: InputMaybe<Scalars['Boolean']>
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
            mediaHash: string
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
        | { __typename?: 'Circle'; id: string }
        | { __typename?: 'Comment'; id: string }
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
        | { __typename?: 'Draft'; id: string }
        | {
            __typename?: 'Tag'
            id: string
            content: string
            numArticles: number
            numAuthors: number
          }
        | { __typename?: 'Topic'; id: string }
        | { __typename?: 'Chapter'; id: string }
    }> | null
  }
}

export type ListViewerArticlesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
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
          mediaHash: string
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

export type DigestTagFragment = {
  __typename?: 'Tag'
  id: string
  content: string
  numArticles: number
  numAuthors: number
}

export type TagDigestFollowButtonPrivateFragment = {
  __typename?: 'Tag'
  id: string
  isFollower?: boolean | null
}

export type TagDigestFeedTagFragment = {
  __typename?: 'Tag'
  id: string
  content: string
  cover?: string | null
  numArticles: number
  numAuthors: number
  articles: {
    __typename?: 'ArticleConnection'
    edges?: Array<{
      __typename?: 'ArticleEdge'
      cursor: string
      node: {
        __typename?: 'Article'
        id: string
        title: string
        slug: string
        mediaHash: string
        author: { __typename?: 'User'; id: string; userName?: string | null }
      }
    }> | null
  }
}

export type TagDigestRichTagPublicFragment = {
  __typename?: 'Tag'
  id: string
  content: string
  description?: string | null
}

export type TagDigestRichTagPrivateFragment = {
  __typename?: 'Tag'
  id: string
  isFollower?: boolean | null
}

export type TagDigestSidebarTagFragment = {
  __typename?: 'Tag'
  id: string
  content: string
  description?: string | null
  cover?: string | null
  numArticles: number
  numAuthors: number
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
        mediaHash: string
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
  isBlocked: boolean
}

export type UserDigestVerboseUserPublicFragment = {
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

export type UserDigestVerboseUserPrivateFragment = {
  __typename?: 'User'
  id: string
  isFollower: boolean
  isFollowee: boolean
  isBlocked: boolean
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

export type EditProfileDialogUserPrivateFragment = {
  __typename?: 'User'
  id: string
  avatar?: string | null
  displayName?: string | null
  info: {
    __typename?: 'UserInfo'
    profileCover?: string | null
    description?: string | null
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    cryptoWallet?: {
      __typename?: 'CryptoWallet'
      id: string
      address: string
      nfts?: Array<{
        __typename?: 'NFTAsset'
        id: string
        imageUrl: string
        imagePreviewUrl?: string | null
        name: string
        description?: string | null
      }> | null
    } | null
  }
  liker: { __typename?: 'Liker'; civicLiker: boolean }
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
    cryptoWallet?: {
      __typename?: 'CryptoWallet'
      id: string
      address: string
      hasNFTs: boolean
    } | null
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
  }
  liker: { __typename?: 'Liker'; civicLiker: boolean }
}

export type DropdownActionsUserPrivateFragment = {
  __typename?: 'User'
  id: string
  isBlocked: boolean
  avatar?: string | null
  displayName?: string | null
  info: {
    __typename?: 'UserInfo'
    profileCover?: string | null
    description?: string | null
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    cryptoWallet?: {
      __typename?: 'CryptoWallet'
      id: string
      address: string
      nfts?: Array<{
        __typename?: 'NFTAsset'
        id: string
        imageUrl: string
        imagePreviewUrl?: string | null
        name: string
        description?: string | null
      }> | null
    } | null
  }
  liker: { __typename?: 'Liker'; civicLiker: boolean }
}

export type UserFollowerPublicQueryVariables = Exact<{
  userName: Scalars['String']
  after?: InputMaybe<Scalars['String']>
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
          isBlocked: boolean
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
  ids: Array<Scalars['ID']> | Scalars['ID']
}>

export type UserFollowerPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Comment'; id: string }
    | {
        __typename?: 'User'
        id: string
        isFollower: boolean
        isFollowee: boolean
        isBlocked: boolean
      }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
  > | null
}

export type UserFollowingCirclesPublicQueryVariables = Exact<{
  userName: Scalars['String']
  after?: InputMaybe<Scalars['String']>
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

export type UserFollowingTagsPublicQueryVariables = Exact<{
  userName: Scalars['String']
  after?: InputMaybe<Scalars['String']>
}>

export type UserFollowingTagsPublicQuery = {
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
      tags: {
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
            description?: string | null
            isFollower?: boolean | null
          }
        }> | null
      }
    }
  } | null
}

export type UserFollowingTagsPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID']
}>

export type UserFollowingTagsPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'Tag'; id: string; isFollower?: boolean | null }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
  > | null
}

export type UserFollowingUsersPublicQueryVariables = Exact<{
  userName: Scalars['String']
  after?: InputMaybe<Scalars['String']>
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
            isBlocked: boolean
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
  ids: Array<Scalars['ID']> | Scalars['ID']
}>

export type UserFollowingUsersPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Comment'; id: string }
    | {
        __typename?: 'User'
        id: string
        isFollower: boolean
        isFollowee: boolean
        isBlocked: boolean
      }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
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
    ipnsKey?: string | null
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
  status?: { __typename?: 'UserStatus'; state: UserState } | null
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
}

export type ProfileUserPrivateFragment = {
  __typename?: 'User'
  id: string
  isFollower: boolean
  isFollowee: boolean
  isBlocked: boolean
  avatar?: string | null
  displayName?: string | null
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
  info: {
    __typename?: 'UserInfo'
    profileCover?: string | null
    description?: string | null
    badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
    cryptoWallet?: {
      __typename?: 'CryptoWallet'
      id: string
      address: string
      nfts?: Array<{
        __typename?: 'NFTAsset'
        id: string
        imageUrl: string
        imagePreviewUrl?: string | null
        name: string
        description?: string | null
      }> | null
    } | null
  }
  liker: { __typename?: 'Liker'; civicLiker: boolean }
}

export type UserProfileUserPublicQueryVariables = Exact<{
  userName: Scalars['String']
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
      ipnsKey?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        hasNFTs: boolean
        nfts?: Array<{
          __typename?: 'NFTAsset'
          id: string
          imageUrl: string
          imagePreviewUrl?: string | null
          name: string
          description?: string | null
        }> | null
      } | null
    }
    articles: { __typename?: 'ArticleConnection'; totalCount: number }
    following: {
      __typename?: 'Following'
      users: { __typename?: 'UserConnection'; totalCount: number }
    }
    followers: { __typename?: 'UserConnection'; totalCount: number }
    status?: { __typename?: 'UserStatus'; state: UserState } | null
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
  } | null
}

export type UserProfileUserPrivateQueryVariables = Exact<{
  userName: Scalars['String']
}>

export type UserProfileUserPrivateQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    isFollower: boolean
    isFollowee: boolean
    isBlocked: boolean
    avatar?: string | null
    displayName?: string | null
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
    info: {
      __typename?: 'UserInfo'
      profileCover?: string | null
      description?: string | null
      badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
      cryptoWallet?: {
        __typename?: 'CryptoWallet'
        id: string
        address: string
        nfts?: Array<{
          __typename?: 'NFTAsset'
          id: string
          imageUrl: string
          imagePreviewUrl?: string | null
          name: string
          description?: string | null
        }> | null
      } | null
    }
    liker: { __typename?: 'Liker'; civicLiker: boolean }
  } | null
}

export type CivicLikerAppreciateButtonUserFragment = {
  __typename?: 'User'
  id: string
  liker: { __typename?: 'Liker'; likerId?: string | null }
}

export type AppreciationButtonArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  appreciationsReceivedTotal: number
  appreciateLimit: number
  author: {
    __typename?: 'User'
    id: string
    liker: { __typename?: 'Liker'; likerId?: string | null }
  }
}

export type AppreciationButtonArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  hasAppreciate: boolean
  appreciateLeft: number
  canSuperLike?: boolean
  author: { __typename?: 'User'; id: string; isBlocking: boolean }
}

export type AppreciateArticleMutationVariables = Exact<{
  id: Scalars['ID']
  amount: Scalars['amount_Int_NotNull_min_1']
  token: Scalars['String']
  superLike?: InputMaybe<Scalars['Boolean']>
}>

export type AppreciateArticleMutation = {
  __typename?: 'Mutation'
  appreciateArticle: {
    __typename?: 'Article'
    id: string
    canSuperLike: boolean
  }
}

export type CollectionListQueryVariables = Exact<{
  id: Scalars['ID']
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
}>

export type CollectionListQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        collection: {
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
              mediaHash: string
              cover?: string | null
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
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type ReadArticleMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type ReadArticleMutation = {
  __typename?: 'Mutation'
  readArticle: { __typename?: 'Article'; id: string }
}

export type ContentArticleFragment = {
  __typename?: 'Article'
  id: string
  content: string
}

export type EditArticleMutationVariables = Exact<{
  id: Scalars['ID']
  content?: InputMaybe<Scalars['String']>
  cover?: InputMaybe<Scalars['ID']>
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>
  collection?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>
  circle?: InputMaybe<Scalars['ID']>
  accessType?: InputMaybe<ArticleAccessType>
  license?: InputMaybe<ArticleLicenseType>
  iscnPublish?: InputMaybe<Scalars['Boolean']>
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  requestForDonation?: InputMaybe<
    Scalars['requestForDonation_String_maxLength_140']
  >
  replyToDonator?: InputMaybe<Scalars['replyToDonator_String_maxLength_140']>
}>

export type EditArticleMutation = {
  __typename?: 'Mutation'
  editArticle: {
    __typename?: 'Article'
    id: string
    cover?: string | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    tags?: Array<{
      __typename?: 'Tag'
      id: string
      content: string
      numArticles: number
      numAuthors: number
    }> | null
    access: { __typename?: 'ArticleAccess'; type: ArticleAccessType }
    drafts?: Array<{
      __typename?: 'Draft'
      id: string
      mediaHash?: string | null
      publishState: PublishState
      title?: string | null
      content?: string | null
      summary?: string | null
      summaryCustomized: boolean
    }> | null
    collection: {
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
          mediaHash: string
          cover?: string | null
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
}

export type EditModeArticleDraftsQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type EditModeArticleDraftsQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        content: string
        mediaHash: string
        tags?: Array<{ __typename?: 'Tag'; content: string }> | null
        drafts?: Array<{
          __typename?: 'Draft'
          id: string
          mediaHash?: string | null
          tags?: Array<string> | null
          publishState: PublishState
          title?: string | null
          content?: string | null
          summary?: string | null
          summaryCustomized: boolean
        }> | null
      }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type EditModeArticleQueryVariables = Exact<{
  id: Scalars['ID']
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
}>

export type EditModeArticleQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        slug: string
        mediaHash: string
        cover?: string | null
        license: ArticleLicenseType
        requestForDonation?: string | null
        replyToDonator?: string | null
        revisionCount: number
        assets: Array<{
          __typename?: 'Asset'
          id: string
          type: AssetType
          path: string
        }>
        tags?: Array<{
          __typename?: 'Tag'
          id: string
          content: string
          numArticles: number
          numAuthors: number
        }> | null
        author: {
          __typename?: 'User'
          id: string
          displayName?: string | null
          avatar?: string | null
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
        drafts?: Array<{
          __typename?: 'Draft'
          id: string
          mediaHash?: string | null
          publishState: PublishState
          title?: string | null
          content?: string | null
          summary?: string | null
          summaryCustomized: boolean
        }> | null
        collection: {
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
              mediaHash: string
              cover?: string | null
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
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type EditModeArticleAssetsQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type EditModeArticleAssetsQuery = {
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
        }>
      }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type EditArticleSupportSettingMutationVariables = Exact<{
  id: Scalars['ID']
  requestForDonation?: InputMaybe<
    Scalars['requestForDonation_String_maxLength_140']
  >
  replyToDonator?: InputMaybe<Scalars['replyToDonator_String_maxLength_140']>
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
  mediaHash: string
  dataHash: string
  iscnId?: string | null
  createdAt: any
  revisedAt?: any | null
  access: { __typename?: 'ArticleAccess'; type: ArticleAccessType }
  author: { __typename?: 'User'; id: string }
  drafts?: Array<{ __typename?: 'Draft'; iscnPublish?: boolean | null }> | null
}

export type RelatedArticlesFragment = {
  __typename?: 'Article'
  id: string
  relatedArticles: {
    __typename?: 'ArticleConnection'
    edges?: Array<{
      __typename?: 'ArticleEdge'
      cursor: string
      node: {
        __typename?: 'Article'
        id: string
        title: string
        slug: string
        mediaHash: string
        cover?: string | null
        state: ArticleState
        summary: string
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

export type FeaturedCommentsPublicQueryVariables = Exact<{
  id: Scalars['ID']
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
}>

export type FeaturedCommentsPublicQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        mediaHash: string
        featuredComments: {
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
              fromDonator: boolean
              pinned: boolean
              state: CommentState
              content?: string | null
              type: CommentType
              createdAt: any
              upvotes: number
              downvotes: number
              myVote?: Vote | null
              comments: {
                __typename?: 'CommentConnection'
                edges?: Array<{
                  __typename?: 'CommentEdge'
                  cursor: string
                  node: {
                    __typename?: 'Comment'
                    id: string
                    fromDonator: boolean
                    pinned: boolean
                    state: CommentState
                    content?: string | null
                    type: CommentType
                    createdAt: any
                    upvotes: number
                    downvotes: number
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
                          mediaHash: string
                          slug: string
                          pinCommentLeft: number
                          author: {
                            __typename?: 'User'
                            id: string
                            isBlocking: boolean
                            userName?: string | null
                          }
                        }
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
                      | { __typename?: 'Comment' }
                      | { __typename?: 'User' }
                      | { __typename?: 'Draft' }
                      | { __typename?: 'Tag' }
                      | { __typename?: 'Topic' }
                      | { __typename?: 'Chapter' }
                    parentComment?: {
                      __typename?: 'Comment'
                      id: string
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
                    mediaHash: string
                    slug: string
                    pinCommentLeft: number
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
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
                | { __typename?: 'Comment' }
                | { __typename?: 'User' }
                | { __typename?: 'Draft' }
                | { __typename?: 'Tag' }
                | { __typename?: 'Topic' }
                | { __typename?: 'Chapter' }
              parentComment?: { __typename?: 'Comment'; id: string } | null
            }
          }> | null
        }
      }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type FeaturedCommentsPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID']
}>

export type FeaturedCommentsPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'Circle'; id: string }
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
                | {
                    __typename?: 'Article'
                    id: string
                    slug: string
                    mediaHash: string
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
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
                | { __typename?: 'Comment' }
                | { __typename?: 'User' }
                | { __typename?: 'Draft' }
                | { __typename?: 'Tag' }
                | { __typename?: 'Topic' }
                | { __typename?: 'Chapter' }
              author: { __typename?: 'User'; id: string; isBlocked: boolean }
              parentComment?: { __typename?: 'Comment'; id: string } | null
            }
          }> | null
        }
        node:
          | {
              __typename?: 'Article'
              id: string
              slug: string
              mediaHash: string
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | {
              __typename?: 'Circle'
              id: string
              name: string
              owner: { __typename?: 'User'; id: string; isBlocking: boolean }
            }
          | { __typename?: 'Comment' }
          | { __typename?: 'User' }
          | { __typename?: 'Draft' }
          | { __typename?: 'Tag' }
          | { __typename?: 'Topic' }
          | { __typename?: 'Chapter' }
        author: { __typename?: 'User'; id: string; isBlocked: boolean }
        parentComment?: { __typename?: 'Comment'; id: string } | null
      }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
  > | null
}

export type LatestResponsesPublicQueryVariables = Exact<{
  id: Scalars['ID']
  before?: InputMaybe<Scalars['String']>
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  includeAfter?: InputMaybe<Scalars['Boolean']>
  includeBefore?: InputMaybe<Scalars['Boolean']>
  articleOnly?: InputMaybe<Scalars['Boolean']>
}>

export type LatestResponsesPublicQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        mediaHash: string
        responseCount: number
        responses: {
          __typename?: 'ResponseConnection'
          totalCount: number
          pageInfo: {
            __typename?: 'PageInfo'
            startCursor?: string | null
            endCursor?: string | null
            hasNextPage: boolean
          }
          edges?: Array<{
            __typename?: 'ResponseEdge'
            node:
              | {
                  __typename?: 'Article'
                  id: string
                  title: string
                  slug: string
                  mediaHash: string
                  cover?: string | null
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
                }
              | {
                  __typename?: 'Comment'
                  id: string
                  fromDonator: boolean
                  pinned: boolean
                  state: CommentState
                  content?: string | null
                  type: CommentType
                  createdAt: any
                  upvotes: number
                  downvotes: number
                  myVote?: Vote | null
                  comments: {
                    __typename?: 'CommentConnection'
                    edges?: Array<{
                      __typename?: 'CommentEdge'
                      cursor: string
                      node: {
                        __typename?: 'Comment'
                        id: string
                        fromDonator: boolean
                        pinned: boolean
                        state: CommentState
                        content?: string | null
                        type: CommentType
                        createdAt: any
                        upvotes: number
                        downvotes: number
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
                              mediaHash: string
                              slug: string
                              pinCommentLeft: number
                              author: {
                                __typename?: 'User'
                                id: string
                                isBlocking: boolean
                                userName?: string | null
                              }
                            }
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
                          | { __typename?: 'Comment' }
                          | { __typename?: 'User' }
                          | { __typename?: 'Draft' }
                          | { __typename?: 'Tag' }
                          | { __typename?: 'Topic' }
                          | { __typename?: 'Chapter' }
                        parentComment?: {
                          __typename?: 'Comment'
                          id: string
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
                        mediaHash: string
                        slug: string
                        pinCommentLeft: number
                        author: {
                          __typename?: 'User'
                          id: string
                          isBlocking: boolean
                          userName?: string | null
                        }
                      }
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
                    | { __typename?: 'Comment' }
                    | { __typename?: 'User' }
                    | { __typename?: 'Draft' }
                    | { __typename?: 'Tag' }
                    | { __typename?: 'Topic' }
                    | { __typename?: 'Chapter' }
                  parentComment?: { __typename?: 'Comment'; id: string } | null
                }
          }> | null
        }
      }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type LatestResponsesPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID']
}>

export type LatestResponsesPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'Circle'; id: string }
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
                | {
                    __typename?: 'Article'
                    id: string
                    slug: string
                    mediaHash: string
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
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
                | { __typename?: 'Comment' }
                | { __typename?: 'User' }
                | { __typename?: 'Draft' }
                | { __typename?: 'Tag' }
                | { __typename?: 'Topic' }
                | { __typename?: 'Chapter' }
              author: { __typename?: 'User'; id: string; isBlocked: boolean }
              parentComment?: { __typename?: 'Comment'; id: string } | null
            }
          }> | null
        }
        node:
          | {
              __typename?: 'Article'
              id: string
              slug: string
              mediaHash: string
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | {
              __typename?: 'Circle'
              id: string
              name: string
              owner: { __typename?: 'User'; id: string; isBlocking: boolean }
            }
          | { __typename?: 'Comment' }
          | { __typename?: 'User' }
          | { __typename?: 'Draft' }
          | { __typename?: 'Tag' }
          | { __typename?: 'Topic' }
          | { __typename?: 'Chapter' }
        author: { __typename?: 'User'; id: string; isBlocked: boolean }
        parentComment?: { __typename?: 'Comment'; id: string } | null
      }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
  > | null
}

export type ResponseArticleArticleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  mediaHash: string
  cover?: string | null
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

export type ResponseCountArticleFragment = {
  __typename?: 'Article'
  id: string
  responseCount: number
}

export type ArticleResponseQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type ArticleResponseQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        responseCount: number
        author: { __typename?: 'User'; id: string; isBlocking: boolean }
      }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type ResponsesArticleFragment = {
  __typename?: 'Article'
  id: string
  responseCount: number
  author: { __typename?: 'User'; id: string; isBlocking: boolean }
}

export type StateArticleFragment = {
  __typename?: 'Article'
  state: ArticleState
}

export type DonatorsArticleFragment = {
  __typename?: 'Article'
  id: string
  mediaHash: string
  donations: {
    __typename?: 'UserConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'UserEdge'
      cursor: string
      node: {
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
      }
    }> | null
  }
  donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
}

export type SupportWidgetArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  requestForDonation?: string | null
  mediaHash: string
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
    __typename?: 'UserConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'UserEdge'
      cursor: string
      node: {
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
      }
    }> | null
  }
  donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
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
  id: Scalars['ID']
  senderId: Scalars['ID']
}>

export type HasDonatedQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        replyToDonator?: string | null
        donation: { __typename?: 'UserConnection'; totalCount: number }
      }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type TagListArticleFragment = {
  __typename?: 'Article'
  tags?: Array<{
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
    numAuthors: number
  }> | null
}

export type AppreciatorsArticleFragment = {
  __typename?: 'Article'
  id: string
  appreciationsReceivedTotal: number
  received: {
    __typename?: 'AppreciationConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'AppreciationEdge'
      cursor: string
      node: {
        __typename?: 'Appreciation'
        sender?: {
          __typename?: 'User'
          id: string
          avatar?: string | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          }
        } | null
      }
    }> | null
  }
  appreciationsReceived: {
    __typename?: 'AppreciationConnection'
    totalCount: number
  }
}

export type CommentBarArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  responseCount: number
}

export type CommentBarArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  author: { __typename?: 'User'; id: string; isBlocking: boolean }
}

export type DonationButtonArticleFragment = {
  __typename?: 'Article'
  id: string
  donationsToolbar: { __typename?: 'UserConnection'; totalCount: number }
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
  appreciationsReceivedTotal: number
  appreciateLimit: number
  responseCount: number
  mediaHash: string
  dataHash: string
  iscnId?: string | null
  createdAt: any
  revisedAt?: any | null
  sticky: boolean
  slug: string
  articleState: ArticleState
  tags?: Array<{
    __typename?: 'Tag'
    content: string
    id: string
    creator?: { __typename?: 'User'; id: string } | null
    editors?: Array<{ __typename?: 'User'; id: string }> | null
  }> | null
  received: {
    __typename?: 'AppreciationConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'AppreciationEdge'
      cursor: string
      node: {
        __typename?: 'Appreciation'
        sender?: {
          __typename?: 'User'
          id: string
          avatar?: string | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          }
        } | null
      }
    }> | null
  }
  donationsToolbar: { __typename?: 'UserConnection'; totalCount: number }
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
  appreciationsReceived: {
    __typename?: 'AppreciationConnection'
    totalCount: number
  }
  donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
  access: { __typename?: 'ArticleAccess'; type: ArticleAccessType }
  drafts?: Array<{ __typename?: 'Draft'; iscnPublish?: boolean | null }> | null
}

export type ToolbarArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  subscribed: boolean
  hasAppreciate: boolean
  appreciateLeft: number
  canSuperLike?: boolean
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
  mediaHash: string
  state: ArticleState
  cover?: string | null
  summary: string
  summaryCustomized: boolean
  createdAt: any
  revisedAt?: any | null
  language?: string | null
  license: ArticleLicenseType
  requestForDonation?: string | null
  replyToDonator?: string | null
  availableTranslations?: Array<UserLanguage> | null
  content: string
  dataHash: string
  iscnId?: string | null
  appreciationsReceivedTotal: number
  appreciateLimit: number
  responseCount: number
  subscribed: boolean
  hasAppreciate: boolean
  appreciateLeft: number
  canSuperLike?: boolean
  sticky: boolean
  articleState: ArticleState
  author: {
    __typename?: 'User'
    id: string
    paymentPointer?: string | null
    isBlocking: boolean
    userName?: string | null
    displayName?: string | null
    avatar?: string | null
    isFollower: boolean
    isFollowee: boolean
    isBlocked: boolean
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
  drafts?: Array<{
    __typename?: 'Draft'
    id: string
    mediaHash?: string | null
    publishState: PublishState
    iscnPublish?: boolean | null
  }> | null
  translation?: {
    __typename?: 'ArticleTranslation'
    content?: string | null
    title?: string | null
    summary?: string | null
    language?: string | null
  } | null
  tags?: Array<{
    __typename?: 'Tag'
    content: string
    id: string
    numArticles: number
    numAuthors: number
    creator?: { __typename?: 'User'; id: string } | null
    editors?: Array<{ __typename?: 'User'; id: string }> | null
  }> | null
  relatedArticles: {
    __typename?: 'ArticleConnection'
    edges?: Array<{
      __typename?: 'ArticleEdge'
      cursor: string
      node: {
        __typename?: 'Article'
        id: string
        title: string
        slug: string
        mediaHash: string
        cover?: string | null
        state: ArticleState
        summary: string
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
  received: {
    __typename?: 'AppreciationConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'AppreciationEdge'
      cursor: string
      node: {
        __typename?: 'Appreciation'
        sender?: {
          __typename?: 'User'
          id: string
          avatar?: string | null
          liker: { __typename?: 'Liker'; civicLiker: boolean }
          info: {
            __typename?: 'UserInfo'
            badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
          }
        } | null
      }
    }> | null
  }
  donationsToolbar: { __typename?: 'UserConnection'; totalCount: number }
  donations: {
    __typename?: 'UserConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'UserEdge'
      cursor: string
      node: {
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
      }
    }> | null
  }
  appreciationsReceived: {
    __typename?: 'AppreciationConnection'
    totalCount: number
  }
  donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
}

export type ArticleAvailableTranslationsQueryVariables = Exact<{
  mediaHash: Scalars['String']
}>

export type ArticleAvailableTranslationsQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    availableTranslations?: Array<UserLanguage> | null
  } | null
}

export type ArticleAvailableTranslationsByNodeIdQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type ArticleAvailableTranslationsByNodeIdQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        availableTranslations?: Array<UserLanguage> | null
      }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type ArticleDetailPublicQueryVariables = Exact<{
  mediaHash: Scalars['String']
  language: UserLanguage
  includeTranslation?: InputMaybe<Scalars['Boolean']>
  includeCanSuperLike?: InputMaybe<Scalars['Boolean']>
}>

export type ArticleDetailPublicQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    state: ArticleState
    cover?: string | null
    summary: string
    summaryCustomized: boolean
    createdAt: any
    revisedAt?: any | null
    language?: string | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    availableTranslations?: Array<UserLanguage> | null
    content: string
    dataHash: string
    iscnId?: string | null
    appreciationsReceivedTotal: number
    appreciateLimit: number
    responseCount: number
    subscribed: boolean
    hasAppreciate: boolean
    appreciateLeft: number
    canSuperLike?: boolean
    sticky: boolean
    articleState: ArticleState
    author: {
      __typename?: 'User'
      id: string
      paymentPointer?: string | null
      isBlocking: boolean
      userName?: string | null
      displayName?: string | null
      avatar?: string | null
      isFollower: boolean
      isFollowee: boolean
      isBlocked: boolean
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
    drafts?: Array<{
      __typename?: 'Draft'
      id: string
      mediaHash?: string | null
      publishState: PublishState
      iscnPublish?: boolean | null
    }> | null
    translation?: {
      __typename?: 'ArticleTranslation'
      content?: string | null
      title?: string | null
      summary?: string | null
      language?: string | null
    } | null
    tags?: Array<{
      __typename?: 'Tag'
      content: string
      id: string
      numArticles: number
      numAuthors: number
      creator?: { __typename?: 'User'; id: string } | null
      editors?: Array<{ __typename?: 'User'; id: string }> | null
    }> | null
    relatedArticles: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        cursor: string
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          mediaHash: string
          cover?: string | null
          state: ArticleState
          summary: string
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
    received: {
      __typename?: 'AppreciationConnection'
      totalCount: number
      edges?: Array<{
        __typename?: 'AppreciationEdge'
        cursor: string
        node: {
          __typename?: 'Appreciation'
          sender?: {
            __typename?: 'User'
            id: string
            avatar?: string | null
            liker: { __typename?: 'Liker'; civicLiker: boolean }
            info: {
              __typename?: 'UserInfo'
              badges?: Array<{ __typename?: 'Badge'; type: BadgeType }> | null
            }
          } | null
        }
      }> | null
    }
    donationsToolbar: { __typename?: 'UserConnection'; totalCount: number }
    donations: {
      __typename?: 'UserConnection'
      totalCount: number
      edges?: Array<{
        __typename?: 'UserEdge'
        cursor: string
        node: {
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
        }
      }> | null
    }
    appreciationsReceived: {
      __typename?: 'AppreciationConnection'
      totalCount: number
    }
    donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
  } | null
}

export type ArticleDetailPublicByNodeIdQueryVariables = Exact<{
  id: Scalars['ID']
  language: UserLanguage
  includeTranslation?: InputMaybe<Scalars['Boolean']>
  includeCanSuperLike?: InputMaybe<Scalars['Boolean']>
}>

export type ArticleDetailPublicByNodeIdQuery = {
  __typename?: 'Query'
  article?:
    | {
        __typename?: 'Article'
        id: string
        title: string
        slug: string
        mediaHash: string
        state: ArticleState
        cover?: string | null
        summary: string
        summaryCustomized: boolean
        createdAt: any
        revisedAt?: any | null
        language?: string | null
        license: ArticleLicenseType
        requestForDonation?: string | null
        replyToDonator?: string | null
        availableTranslations?: Array<UserLanguage> | null
        content: string
        dataHash: string
        iscnId?: string | null
        appreciationsReceivedTotal: number
        appreciateLimit: number
        responseCount: number
        subscribed: boolean
        hasAppreciate: boolean
        appreciateLeft: number
        canSuperLike?: boolean
        sticky: boolean
        articleState: ArticleState
        author: {
          __typename?: 'User'
          id: string
          paymentPointer?: string | null
          isBlocking: boolean
          userName?: string | null
          displayName?: string | null
          avatar?: string | null
          isFollower: boolean
          isFollowee: boolean
          isBlocked: boolean
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
        drafts?: Array<{
          __typename?: 'Draft'
          id: string
          mediaHash?: string | null
          publishState: PublishState
          iscnPublish?: boolean | null
        }> | null
        translation?: {
          __typename?: 'ArticleTranslation'
          content?: string | null
          title?: string | null
          summary?: string | null
          language?: string | null
        } | null
        tags?: Array<{
          __typename?: 'Tag'
          content: string
          id: string
          numArticles: number
          numAuthors: number
          creator?: { __typename?: 'User'; id: string } | null
          editors?: Array<{ __typename?: 'User'; id: string }> | null
        }> | null
        relatedArticles: {
          __typename?: 'ArticleConnection'
          edges?: Array<{
            __typename?: 'ArticleEdge'
            cursor: string
            node: {
              __typename?: 'Article'
              id: string
              title: string
              slug: string
              mediaHash: string
              cover?: string | null
              state: ArticleState
              summary: string
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
        received: {
          __typename?: 'AppreciationConnection'
          totalCount: number
          edges?: Array<{
            __typename?: 'AppreciationEdge'
            cursor: string
            node: {
              __typename?: 'Appreciation'
              sender?: {
                __typename?: 'User'
                id: string
                avatar?: string | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                }
              } | null
            }
          }> | null
        }
        donationsToolbar: { __typename?: 'UserConnection'; totalCount: number }
        donations: {
          __typename?: 'UserConnection'
          totalCount: number
          edges?: Array<{
            __typename?: 'UserEdge'
            cursor: string
            node: {
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
            }
          }> | null
        }
        appreciationsReceived: {
          __typename?: 'AppreciationConnection'
          totalCount: number
        }
        donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
      }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type ArticleDetailPrivateQueryVariables = Exact<{
  mediaHash: Scalars['String']
  includeCanSuperLike: Scalars['Boolean']
}>

export type ArticleDetailPrivateQuery = {
  __typename?: 'Query'
  article?: {
    __typename?: 'Article'
    id: string
    content: string
    subscribed: boolean
    hasAppreciate: boolean
    appreciateLeft: number
    canSuperLike?: boolean
    author: {
      __typename?: 'User'
      id: string
      isBlocking: boolean
      isFollower: boolean
      isFollowee: boolean
      isBlocked: boolean
    }
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
}

export type ArticleTranslationQueryVariables = Exact<{
  mediaHash: Scalars['String']
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
    } | null
  } | null
}

export type AllAuthorsPublicQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
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
            isBlocked: boolean
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
  ids: Array<Scalars['ID']> | Scalars['ID']
}>

export type AllAuthorsPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Comment'; id: string }
    | {
        __typename?: 'User'
        id: string
        isFollower: boolean
        isFollowee: boolean
        isBlocked: boolean
      }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
  > | null
}

export type CircleContentAnalyticsArticleFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  mediaHash: string
  createdAt: any
  author: { __typename?: 'User'; id: string; userName?: string | null }
}

export type CircleContentAnalyticsPublicQueryVariables = Exact<{
  name: Scalars['String']
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
            mediaHash: string
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
  name: Scalars['String']
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
            mediaHash: string
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
  name: Scalars['String']
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
  name: Scalars['String']
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
  name: Scalars['String']
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
  name: Scalars['String']
  before?: InputMaybe<Scalars['String']>
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  includeAfter?: InputMaybe<Scalars['Boolean']>
  includeBefore?: InputMaybe<Scalars['Boolean']>
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
          fromDonator: boolean
          pinned: boolean
          state: CommentState
          content?: string | null
          type: CommentType
          createdAt: any
          upvotes: number
          downvotes: number
          myVote?: Vote | null
          comments: {
            __typename?: 'CommentConnection'
            edges?: Array<{
              __typename?: 'CommentEdge'
              cursor: string
              node: {
                __typename?: 'Comment'
                id: string
                fromDonator: boolean
                pinned: boolean
                state: CommentState
                content?: string | null
                type: CommentType
                createdAt: any
                upvotes: number
                downvotes: number
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
                      mediaHash: string
                      slug: string
                      pinCommentLeft: number
                      author: {
                        __typename?: 'User'
                        id: string
                        isBlocking: boolean
                        userName?: string | null
                      }
                    }
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
                  | { __typename?: 'Comment' }
                  | { __typename?: 'User' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'Topic' }
                  | { __typename?: 'Chapter' }
                parentComment?: { __typename?: 'Comment'; id: string } | null
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
                mediaHash: string
                slug: string
                pinCommentLeft: number
                author: {
                  __typename?: 'User'
                  id: string
                  isBlocking: boolean
                  userName?: string | null
                }
              }
            | {
                __typename?: 'Circle'
                id: string
                name: string
                owner: { __typename?: 'User'; id: string; isBlocking: boolean }
              }
            | { __typename?: 'Comment' }
            | { __typename?: 'User' }
            | { __typename?: 'Draft' }
            | { __typename?: 'Tag' }
            | { __typename?: 'Topic' }
            | { __typename?: 'Chapter' }
          parentComment?: { __typename?: 'Comment'; id: string } | null
        }
      }> | null
    }
  } | null
}

export type BroadcastPrivateQueryVariables = Exact<{
  name: Scalars['String']
  ids: Array<Scalars['ID']> | Scalars['ID']
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
    | { __typename?: 'Circle'; id: string }
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
                | {
                    __typename?: 'Article'
                    id: string
                    slug: string
                    mediaHash: string
                    author: {
                      __typename?: 'User'
                      id: string
                      isBlocking: boolean
                      userName?: string | null
                    }
                  }
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
                | { __typename?: 'Comment' }
                | { __typename?: 'User' }
                | { __typename?: 'Draft' }
                | { __typename?: 'Tag' }
                | { __typename?: 'Topic' }
                | { __typename?: 'Chapter' }
              author: { __typename?: 'User'; id: string; isBlocked: boolean }
              parentComment?: { __typename?: 'Comment'; id: string } | null
            }
          }> | null
        }
        node:
          | {
              __typename?: 'Article'
              id: string
              slug: string
              mediaHash: string
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | {
              __typename?: 'Circle'
              id: string
              name: string
              owner: { __typename?: 'User'; id: string; isBlocking: boolean }
            }
          | { __typename?: 'Comment' }
          | { __typename?: 'User' }
          | { __typename?: 'Draft' }
          | { __typename?: 'Tag' }
          | { __typename?: 'Topic' }
          | { __typename?: 'Chapter' }
        author: { __typename?: 'User'; id: string; isBlocked: boolean }
        parentComment?: { __typename?: 'Comment'; id: string } | null
      }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
  > | null
}

export type DiscussionPublicQueryVariables = Exact<{
  name: Scalars['String']
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
  name: Scalars['String']
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
  name: Scalars['String']
  before?: InputMaybe<Scalars['String']>
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['first_Int_min_0']>
  includeAfter?: InputMaybe<Scalars['Boolean']>
  includeBefore?: InputMaybe<Scalars['Boolean']>
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
          fromDonator: boolean
          pinned: boolean
          state: CommentState
          content?: string | null
          type: CommentType
          createdAt: any
          upvotes: number
          downvotes: number
          myVote?: Vote | null
          comments: {
            __typename?: 'CommentConnection'
            edges?: Array<{
              __typename?: 'CommentEdge'
              cursor: string
              node: {
                __typename?: 'Comment'
                id: string
                fromDonator: boolean
                pinned: boolean
                state: CommentState
                content?: string | null
                type: CommentType
                createdAt: any
                upvotes: number
                downvotes: number
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
                      mediaHash: string
                      slug: string
                      pinCommentLeft: number
                      author: {
                        __typename?: 'User'
                        id: string
                        isBlocking: boolean
                        userName?: string | null
                      }
                    }
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
                  | { __typename?: 'Comment' }
                  | { __typename?: 'User' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'Topic' }
                  | { __typename?: 'Chapter' }
                parentComment?: { __typename?: 'Comment'; id: string } | null
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
                mediaHash: string
                slug: string
                pinCommentLeft: number
                author: {
                  __typename?: 'User'
                  id: string
                  isBlocking: boolean
                  userName?: string | null
                }
              }
            | {
                __typename?: 'Circle'
                id: string
                name: string
                owner: { __typename?: 'User'; id: string; isBlocking: boolean }
              }
            | { __typename?: 'Comment' }
            | { __typename?: 'User' }
            | { __typename?: 'Draft' }
            | { __typename?: 'Tag' }
            | { __typename?: 'Topic' }
            | { __typename?: 'Chapter' }
          parentComment?: { __typename?: 'Comment'; id: string } | null
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
  name: Scalars['String']
  after?: InputMaybe<Scalars['String']>
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
          isBlocked: boolean
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
  ids: Array<Scalars['ID']> | Scalars['ID']
}>

export type CircleFollowersPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | {
        __typename?: 'User'
        id: string
        isFollower: boolean
        isFollowee: boolean
        isBlocked: boolean
      }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
  > | null
}

export type CircleMembersPublicQueryVariables = Exact<{
  name: Scalars['String']
  after?: InputMaybe<Scalars['String']>
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
            isBlocked: boolean
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
  ids: Array<Scalars['ID']> | Scalars['ID']
}>

export type CircleMembersPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | {
        __typename?: 'User'
        id: string
        isFollower: boolean
        isFollowee: boolean
        isBlocked: boolean
      }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
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
  name: Scalars['String']
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
  name: Scalars['String']
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
  name: Scalars['String']
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
  name: Scalars['String']
}>

export type InvitationsCircleQuery = {
  __typename?: 'Query'
  circle?: { __typename?: 'Circle'; id: string } | null
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
  name: Scalars['String']
  after?: InputMaybe<Scalars['String']>
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
          mediaHash: string
          cover?: string | null
          summary: string
          createdAt: any
          readTime: number
          subscribed: boolean
          dataHash: string
          iscnId?: string | null
          revisedAt?: any | null
          sticky: boolean
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            isFollower: boolean
            isFollowee: boolean
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
          transactionsReceivedBy: {
            __typename?: 'UserConnection'
            totalCount: number
          }
          appreciationsReceived: {
            __typename?: 'AppreciationConnection'
            totalCount: number
          }
          donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
          drafts?: Array<{
            __typename?: 'Draft'
            iscnPublish?: boolean | null
          }> | null
          tags?: Array<{
            __typename?: 'Tag'
            id: string
            creator?: { __typename?: 'User'; id: string } | null
            editors?: Array<{ __typename?: 'User'; id: string }> | null
          }> | null
        }
      }> | null
    }
  } | null
}

export type CircleWorksPrivateQueryVariables = Exact<{
  name: Scalars['String']
  ids: Array<Scalars['ID']> | Scalars['ID']
}>

export type CircleWorksPrivateQuery = {
  __typename?: 'Query'
  circle?: { __typename?: 'Circle'; id: string } | null
  nodes?: Array<
    | {
        __typename?: 'Article'
        id: string
        subscribed: boolean
        author: {
          __typename?: 'User'
          id: string
          isFollower: boolean
          isFollowee: boolean
        }
      }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
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
  isBlocked: boolean
}

export type FollowingFeedRecommendArticlePublicFragment = {
  __typename?: 'Article'
  id: string
  title: string
  slug: string
  mediaHash: string
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

export type FollowingFeedRecommendArticlePrivateFragment = {
  __typename?: 'Article'
  id: string
  author: {
    __typename?: 'User'
    id: string
    isFollower: boolean
    isFollowee: boolean
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
}

export type RecommendArticleActivityFragment = {
  __typename?: 'ArticleRecommendationActivity'
  source?: ArticleRecommendationActivitySource | null
  recommendArticles?: Array<{
    __typename?: 'Article'
    id: string
    title: string
    slug: string
    mediaHash: string
    cover?: string | null
    summary: string
    recommendArticleState: ArticleState
    articleState: ArticleState
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      isFollower: boolean
      isFollowee: boolean
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

export type RecommendCircleActivityFragment = {
  __typename?: 'CircleRecommendationActivity'
  recommendCircles?: Array<{
    __typename?: 'Circle'
    id: string
    name: string
    displayName: string
    description?: string | null
    avatar?: string | null
    isMember: boolean
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
    mediaHash: string
    cover?: string | null
    summary: string
    createdAt: any
    readTime: number
    subscribed: boolean
    dataHash: string
    iscnId?: string | null
    revisedAt?: any | null
    sticky: boolean
    articleState: ArticleState
    author: {
      __typename?: 'User'
      id: string
      userName?: string | null
      displayName?: string | null
      isFollower: boolean
      isFollowee: boolean
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
    transactionsReceivedBy: {
      __typename?: 'UserConnection'
      totalCount: number
    }
    appreciationsReceived: {
      __typename?: 'AppreciationConnection'
      totalCount: number
    }
    donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
    drafts?: Array<{
      __typename?: 'Draft'
      iscnPublish?: boolean | null
    }> | null
    tags?: Array<{
      __typename?: 'Tag'
      id: string
      creator?: { __typename?: 'User'; id: string } | null
      editors?: Array<{ __typename?: 'User'; id: string }> | null
    }> | null
  }
  targetTag: {
    __typename?: 'Tag'
    id: string
    content: string
    numArticles: number
    numAuthors: number
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
    mediaHash: string
    cover?: string | null
    summary: string
    createdAt: any
    readTime: number
    subscribed: boolean
    dataHash: string
    iscnId?: string | null
    revisedAt?: any | null
    sticky: boolean
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
      isFollower: boolean
      isFollowee: boolean
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
    transactionsReceivedBy: {
      __typename?: 'UserConnection'
      totalCount: number
    }
    appreciationsReceived: {
      __typename?: 'AppreciationConnection'
      totalCount: number
    }
    donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
    drafts?: Array<{
      __typename?: 'Draft'
      iscnPublish?: boolean | null
    }> | null
    tags?: Array<{
      __typename?: 'Tag'
      id: string
      creator?: { __typename?: 'User'; id: string } | null
      editors?: Array<{ __typename?: 'User'; id: string }> | null
    }> | null
  }
}

export type FollowingFeedQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
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
                  mediaHash: string
                  cover?: string | null
                  summary: string
                  recommendArticleState: ArticleState
                  articleState: ArticleState
                  author: {
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                    displayName?: string | null
                    isFollower: boolean
                    isFollowee: boolean
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
            | {
                __typename: 'CircleRecommendationActivity'
                recommendCircles?: Array<{
                  __typename?: 'Circle'
                  id: string
                  name: string
                  displayName: string
                  description?: string | null
                  avatar?: string | null
                  isMember: boolean
                  members: {
                    __typename?: 'MemberConnection'
                    totalCount: number
                  }
                  works: {
                    __typename?: 'ArticleConnection'
                    totalCount: number
                  }
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
                }> | null
              }
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
                  mediaHash: string
                  cover?: string | null
                  summary: string
                  createdAt: any
                  readTime: number
                  subscribed: boolean
                  dataHash: string
                  iscnId?: string | null
                  revisedAt?: any | null
                  sticky: boolean
                  articleState: ArticleState
                  author: {
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                    displayName?: string | null
                    isFollower: boolean
                    isFollowee: boolean
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
                  transactionsReceivedBy: {
                    __typename?: 'UserConnection'
                    totalCount: number
                  }
                  appreciationsReceived: {
                    __typename?: 'AppreciationConnection'
                    totalCount: number
                  }
                  donationsDialog: {
                    __typename?: 'UserConnection'
                    totalCount: number
                  }
                  drafts?: Array<{
                    __typename?: 'Draft'
                    iscnPublish?: boolean | null
                  }> | null
                  tags?: Array<{
                    __typename?: 'Tag'
                    id: string
                    creator?: { __typename?: 'User'; id: string } | null
                    editors?: Array<{ __typename?: 'User'; id: string }> | null
                  }> | null
                }
                targetTag: {
                  __typename?: 'Tag'
                  id: string
                  content: string
                  numArticles: number
                  numAuthors: number
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
                  mediaHash: string
                  cover?: string | null
                  summary: string
                  createdAt: any
                  readTime: number
                  subscribed: boolean
                  dataHash: string
                  iscnId?: string | null
                  revisedAt?: any | null
                  sticky: boolean
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
                    isFollower: boolean
                    isFollowee: boolean
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
                  transactionsReceivedBy: {
                    __typename?: 'UserConnection'
                    totalCount: number
                  }
                  appreciationsReceived: {
                    __typename?: 'AppreciationConnection'
                    totalCount: number
                  }
                  donationsDialog: {
                    __typename?: 'UserConnection'
                    totalCount: number
                  }
                  drafts?: Array<{
                    __typename?: 'Draft'
                    iscnPublish?: boolean | null
                  }> | null
                  tags?: Array<{
                    __typename?: 'Tag'
                    id: string
                    creator?: { __typename?: 'User'; id: string } | null
                    editors?: Array<{ __typename?: 'User'; id: string }> | null
                  }> | null
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

export type AuthorPickerQueryVariables = Exact<{
  random?: InputMaybe<Scalars['random_Int_min_0_max_49']>
}>

export type AuthorPickerQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    following: {
      __typename?: 'Following'
      users: { __typename?: 'UserConnection'; totalCount: number }
    }
    recommendation: {
      __typename?: 'Recommendation'
      authors: {
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
            isFollower: boolean
            isFollowee: boolean
            isBlocked: boolean
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

export type VisibleAnnouncementsQueryVariables = Exact<{
  input: AnnouncementsInput
}>

export type VisibleAnnouncementsQuery = {
  __typename?: 'Query'
  viewer?: { __typename?: 'User'; id: string } | null
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

export type FeedAuthorsQueryVariables = Exact<{
  random?: InputMaybe<Scalars['random_Int_min_0_max_49']>
}>

export type FeedAuthorsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    recommendation: {
      __typename?: 'Recommendation'
      authors: {
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
            isFollower: boolean
            isFollowee: boolean
            isBlocked: boolean
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

export type FeedTagsPublicQueryVariables = Exact<{
  random?: InputMaybe<Scalars['random_Int_min_0_max_49']>
}>

export type FeedTagsPublicQuery = {
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
            description?: string | null
            cover?: string | null
            numArticles: number
            numAuthors: number
          }
        }> | null
      }
    }
  } | null
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
      mediaHash: string
      cover?: string | null
      summary: string
      createdAt: any
      readTime: number
      subscribed: boolean
      dataHash: string
      iscnId?: string | null
      revisedAt?: any | null
      sticky: boolean
      articleState: ArticleState
      author: {
        __typename?: 'User'
        id: string
        userName?: string | null
        displayName?: string | null
        isFollower: boolean
        isFollowee: boolean
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
      transactionsReceivedBy: {
        __typename?: 'UserConnection'
        totalCount: number
      }
      appreciationsReceived: {
        __typename?: 'AppreciationConnection'
        totalCount: number
      }
      donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
      drafts?: Array<{
        __typename?: 'Draft'
        iscnPublish?: boolean | null
      }> | null
      tags?: Array<{
        __typename?: 'Tag'
        id: string
        creator?: { __typename?: 'User'; id: string } | null
        editors?: Array<{ __typename?: 'User'; id: string }> | null
      }> | null
    }
  }> | null
}

export type HottestFeedPublicQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
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
            mediaHash: string
            cover?: string | null
            summary: string
            createdAt: any
            readTime: number
            subscribed: boolean
            dataHash: string
            iscnId?: string | null
            revisedAt?: any | null
            sticky: boolean
            articleState: ArticleState
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              isFollower: boolean
              isFollowee: boolean
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
            transactionsReceivedBy: {
              __typename?: 'UserConnection'
              totalCount: number
            }
            appreciationsReceived: {
              __typename?: 'AppreciationConnection'
              totalCount: number
            }
            donationsDialog: {
              __typename?: 'UserConnection'
              totalCount: number
            }
            drafts?: Array<{
              __typename?: 'Draft'
              iscnPublish?: boolean | null
            }> | null
            tags?: Array<{
              __typename?: 'Tag'
              id: string
              creator?: { __typename?: 'User'; id: string } | null
              editors?: Array<{ __typename?: 'User'; id: string }> | null
            }> | null
          }
        }> | null
      }
    }
  } | null
}

export type NewestFeedPublicQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
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
            mediaHash: string
            cover?: string | null
            summary: string
            createdAt: any
            readTime: number
            subscribed: boolean
            dataHash: string
            iscnId?: string | null
            revisedAt?: any | null
            sticky: boolean
            articleState: ArticleState
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              isFollower: boolean
              isFollowee: boolean
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
            transactionsReceivedBy: {
              __typename?: 'UserConnection'
              totalCount: number
            }
            appreciationsReceived: {
              __typename?: 'AppreciationConnection'
              totalCount: number
            }
            donationsDialog: {
              __typename?: 'UserConnection'
              totalCount: number
            }
            drafts?: Array<{
              __typename?: 'Draft'
              iscnPublish?: boolean | null
            }> | null
            tags?: Array<{
              __typename?: 'Tag'
              id: string
              creator?: { __typename?: 'User'; id: string } | null
              editors?: Array<{ __typename?: 'User'; id: string }> | null
            }> | null
          }
        }> | null
      }
    }
  } | null
}

export type IcymiFeedPublicQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
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
            mediaHash: string
            cover?: string | null
            summary: string
            createdAt: any
            readTime: number
            subscribed: boolean
            dataHash: string
            iscnId?: string | null
            revisedAt?: any | null
            sticky: boolean
            articleState: ArticleState
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              isFollower: boolean
              isFollowee: boolean
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
            transactionsReceivedBy: {
              __typename?: 'UserConnection'
              totalCount: number
            }
            appreciationsReceived: {
              __typename?: 'AppreciationConnection'
              totalCount: number
            }
            donationsDialog: {
              __typename?: 'UserConnection'
              totalCount: number
            }
            drafts?: Array<{
              __typename?: 'Draft'
              iscnPublish?: boolean | null
            }> | null
            tags?: Array<{
              __typename?: 'Tag'
              id: string
              creator?: { __typename?: 'User'; id: string } | null
              editors?: Array<{ __typename?: 'User'; id: string }> | null
            }> | null
          }
        }> | null
      }
    }
  } | null
}

export type FeedArticlesPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID']
}>

export type FeedArticlesPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | {
        __typename?: 'Article'
        id: string
        subscribed: boolean
        author: {
          __typename?: 'User'
          id: string
          isFollower: boolean
          isFollowee: boolean
        }
      }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
  > | null
}

export type SidebarAuthorsQueryVariables = Exact<{
  random?: InputMaybe<Scalars['random_Int_min_0_max_49']>
}>

export type SidebarAuthorsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    recommendation: {
      __typename?: 'Recommendation'
      authors: {
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
            isFollower: boolean
            isFollowee: boolean
            isBlocked: boolean
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

export type SidebarTagsPublicQueryVariables = Exact<{
  random?: InputMaybe<Scalars['random_Int_min_0_max_49']>
}>

export type SidebarTagsPublicQuery = {
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
            cover?: string | null
            description?: string | null
            id: string
            content: string
            numArticles: number
            numAuthors: number
          }
        }> | null
      }
    }
  } | null
}

export type MeAnalyticsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
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
    }
  } | null
}

export type AppreciationTabsUserActivityFragment = {
  __typename?: 'UserActivity'
  appreciationsSentTotal: number
  appreciationsReceivedTotal: number
}

export type MeAppreciationsReceivedQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
}>

export type MeAppreciationsReceivedQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    activity: {
      __typename?: 'UserActivity'
      appreciationsSentTotal: number
      appreciationsReceivedTotal: number
      appreciationsReceived: {
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
              mediaHash: string
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
              }
            } | null
          }
        }> | null
      }
    }
  } | null
}

export type MeAppreciationsSentQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
}>

export type MeAppreciationsSentQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    activity: {
      __typename?: 'UserActivity'
      appreciationsSentTotal: number
      appreciationsReceivedTotal: number
      appreciationsSent: {
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
              mediaHash: string
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
              }
            } | null
          }
        }> | null
      }
    }
  } | null
}

export type MeBookmarkFeedQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
}>

export type MeBookmarkFeedQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    subscriptions: {
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
          mediaHash: string
          cover?: string | null
          summary: string
          createdAt: any
          readTime: number
          subscribed: boolean
          dataHash: string
          iscnId?: string | null
          revisedAt?: any | null
          sticky: boolean
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            isFollower: boolean
            isFollowee: boolean
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
          transactionsReceivedBy: {
            __typename?: 'UserConnection'
            totalCount: number
          }
          appreciationsReceived: {
            __typename?: 'AppreciationConnection'
            totalCount: number
          }
          donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
          drafts?: Array<{
            __typename?: 'Draft'
            iscnPublish?: boolean | null
          }> | null
          tags?: Array<{
            __typename?: 'Tag'
            id: string
            creator?: { __typename?: 'User'; id: string } | null
            editors?: Array<{ __typename?: 'User'; id: string }> | null
          }> | null
        }
      }> | null
    }
  } | null
}

export type RetryPublishMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type RetryPublishMutation = {
  __typename?: 'Mutation'
  retryPublish: { __typename?: 'Draft'; id: string; publishState: PublishState }
}

export type PublishArticleMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type PublishArticleMutation = {
  __typename?: 'Mutation'
  publishArticle: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
  }
}

export type EditMetaDraftFragment = {
  __typename?: 'Draft'
  id: string
  publishState: PublishState
  cover?: string | null
  tags?: Array<string> | null
  license: ArticleLicenseType
  requestForDonation?: string | null
  replyToDonator?: string | null
  iscnPublish?: boolean | null
  assets: Array<{
    __typename?: 'Asset'
    id: string
    type: AssetType
    path: string
  }>
  collection: {
    __typename?: 'ArticleConnection'
    edges?: Array<{
      __typename?: 'ArticleEdge'
      node: {
        __typename?: 'Article'
        id: string
        title: string
        slug: string
        mediaHash: string
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
}

export type DraftDetailQueryQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type DraftDetailQueryQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    displayName?: string | null
    avatar?: string | null
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
  } | null
  node?:
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'User'; id: string }
    | {
        __typename?: 'Draft'
        id: string
        title?: string | null
        publishState: PublishState
        content?: string | null
        summary?: string | null
        summaryCustomized: boolean
        cover?: string | null
        tags?: Array<string> | null
        license: ArticleLicenseType
        requestForDonation?: string | null
        replyToDonator?: string | null
        iscnPublish?: boolean | null
        article?: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          mediaHash: string
          author: { __typename?: 'User'; id: string; userName?: string | null }
        } | null
        assets: Array<{
          __typename?: 'Asset'
          id: string
          type: AssetType
          path: string
        }>
        collection: {
          __typename?: 'ArticleConnection'
          edges?: Array<{
            __typename?: 'ArticleEdge'
            node: {
              __typename?: 'Article'
              id: string
              title: string
              slug: string
              mediaHash: string
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
      }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
    | null
}

export type DraftAssetsQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type DraftAssetsQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'User'; id: string }
    | {
        __typename?: 'Draft'
        id: string
        assets: Array<{
          __typename?: 'Asset'
          id: string
          type: AssetType
          path: string
        }>
      }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
    | null
}

export type SetDraftContentMutationVariables = Exact<{
  id: Scalars['ID']
  title?: InputMaybe<Scalars['String']>
  content?: InputMaybe<Scalars['String']>
  summary?: InputMaybe<Scalars['String']>
}>

export type SetDraftContentMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    title?: string | null
    content?: string | null
    cover?: string | null
    summary?: string | null
    summaryCustomized: boolean
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
    }>
  }
}

export type SetDraftCollectionMutationVariables = Exact<{
  id: Scalars['ID']
  collection?: InputMaybe<
    Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>
  >
}>

export type SetDraftCollectionMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    collection: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          mediaHash: string
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
}

export type SetDraftCoverMutationVariables = Exact<{
  id: Scalars['ID']
  cover?: InputMaybe<Scalars['ID']>
}>

export type SetDraftCoverMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    cover?: string | null
    tags?: Array<string> | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    iscnPublish?: boolean | null
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
    }>
    collection: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          mediaHash: string
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
  }
}

export type SetDraftTagsMutationVariables = Exact<{
  id: Scalars['ID']
  tags: Array<Scalars['String']> | Scalars['String']
}>

export type SetDraftTagsMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    cover?: string | null
    tags?: Array<string> | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    iscnPublish?: boolean | null
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
    }>
    collection: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          mediaHash: string
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
  }
}

export type SetSupportRequestReplyMutationVariables = Exact<{
  id: Scalars['ID']
  requestForDonation?: InputMaybe<
    Scalars['requestForDonation_String_maxLength_140']
  >
  replyToDonator?: InputMaybe<Scalars['replyToDonator_String_maxLength_140']>
}>

export type SetSupportRequestReplyMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    requestForDonation?: string | null
    replyToDonator?: string | null
  }
}

export type SetDraftPublishIscnMutationVariables = Exact<{
  id: Scalars['ID']
  iscnPublish?: InputMaybe<Scalars['Boolean']>
}>

export type SetDraftPublishIscnMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    publishState: PublishState
    cover?: string | null
    tags?: Array<string> | null
    license: ArticleLicenseType
    requestForDonation?: string | null
    replyToDonator?: string | null
    iscnPublish?: boolean | null
    assets: Array<{
      __typename?: 'Asset'
      id: string
      type: AssetType
      path: string
    }>
    collection: {
      __typename?: 'ArticleConnection'
      edges?: Array<{
        __typename?: 'ArticleEdge'
        node: {
          __typename?: 'Article'
          id: string
          title: string
          slug: string
          mediaHash: string
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
  }
}

export type SetDraftAccessMutationVariables = Exact<{
  id: Scalars['ID']
  circle?: InputMaybe<Scalars['ID']>
  accessType?: InputMaybe<ArticleAccessType>
  license?: InputMaybe<ArticleLicenseType>
}>

export type SetDraftAccessMutation = {
  __typename?: 'Mutation'
  putDraft: {
    __typename?: 'Draft'
    id: string
    license: ArticleLicenseType
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
  }
}

export type MeDraftFeedQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
}>

export type MeDraftFeedQuery = {
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
        }
      }> | null
    }
  } | null
}

export type MeHistoryFeedQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
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
              mediaHash: string
              cover?: string | null
              summary: string
              createdAt: any
              readTime: number
              subscribed: boolean
              dataHash: string
              iscnId?: string | null
              revisedAt?: any | null
              sticky: boolean
              articleState: ArticleState
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                isFollower: boolean
                isFollowee: boolean
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
              transactionsReceivedBy: {
                __typename?: 'UserConnection'
                totalCount: number
              }
              appreciationsReceived: {
                __typename?: 'AppreciationConnection'
                totalCount: number
              }
              donationsDialog: {
                __typename?: 'UserConnection'
                totalCount: number
              }
              drafts?: Array<{
                __typename?: 'Draft'
                iscnPublish?: boolean | null
              }> | null
              tags?: Array<{
                __typename?: 'Tag'
                id: string
                creator?: { __typename?: 'User'; id: string } | null
                editors?: Array<{ __typename?: 'User'; id: string }> | null
              }> | null
            }
          }
        }> | null
      }
    }
  } | null
}

export type MeNotificationsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
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
              unread: boolean
              createdAt: any
              articleArticleNoticeType: ArticleArticleNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                }
              }> | null
              article: {
                __typename?: 'Article'
                id: string
                title: string
                slug: string
                mediaHash: string
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
                title: string
                slug: string
                mediaHash: string
                cover?: string | null
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
              }
            }
          | {
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
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                }
              }> | null
              article: {
                __typename?: 'Article'
                id: string
                title: string
                slug: string
                mediaHash: string
                cover?: string | null
                articleState: ArticleState
                access: {
                  __typename?: 'ArticleAccess'
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
              }
            }
          | {
              __typename: 'ArticleTagNotice'
              id: string
              unread: boolean
              createdAt: any
              articleTagNoticeType: ArticleTagNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                }
              }> | null
              target: {
                __typename?: 'Article'
                id: string
                title: string
                slug: string
                mediaHash: string
                articleState: ArticleState
                author: {
                  __typename?: 'User'
                  displayName?: string | null
                  id: string
                  userName?: string | null
                }
              }
              tag: {
                __typename?: 'Tag'
                id: string
                content: string
                numArticles: number
                numAuthors: number
              }
            }
          | {
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
                isBlocked: boolean
                liker: { __typename?: 'Liker'; civicLiker: boolean }
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
                parentComment?: { __typename?: 'Comment'; id: string } | null
              }> | null
              replies?: Array<{
                __typename?: 'Comment'
                id: string
                type: CommentType
                parentComment?: { __typename?: 'Comment'; id: string } | null
                author: { __typename?: 'User'; id: string }
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
          | {
              __typename: 'CommentCommentNotice'
              id: string
              unread: boolean
              createdAt: any
              commentCommentNoticeType: CommentCommentNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                avatar?: string | null
                displayName?: string | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
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
                      mediaHash: string
                      author: {
                        __typename?: 'User'
                        id: string
                        userName?: string | null
                      }
                    }
                  | { __typename?: 'Circle'; id: string; name: string }
                  | { __typename?: 'Comment' }
                  | { __typename?: 'User' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'Topic' }
                  | { __typename?: 'Chapter' }
                parentComment?: { __typename?: 'Comment'; id: string } | null
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
                      mediaHash: string
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
                  | { __typename?: 'Comment' }
                  | { __typename?: 'User' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'Topic' }
                  | { __typename?: 'Chapter' }
                parentComment?: { __typename?: 'Comment'; id: string } | null
                author: { __typename?: 'User'; id: string; isBlocked: boolean }
              }
            }
          | {
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
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
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
                      mediaHash: string
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
                  | { __typename?: 'Comment' }
                  | { __typename?: 'User' }
                  | { __typename?: 'Draft' }
                  | { __typename?: 'Tag' }
                  | { __typename?: 'Topic' }
                  | { __typename?: 'Chapter' }
                parentComment?: { __typename?: 'Comment'; id: string } | null
                author: { __typename?: 'User'; id: string; isBlocked: boolean }
              }
            }
          | {
              __typename: 'CryptoNotice'
              id: string
              unread: boolean
              type: CryptoNoticeType
              createdAt: any
              target: { __typename?: 'CryptoWallet'; address: string }
            }
          | {
              __typename: 'OfficialAnnouncementNotice'
              id: string
              unread: boolean
              link?: string | null
              message: string
              createdAt: any
            }
          | {
              __typename: 'TagNotice'
              id: string
              unread: boolean
              createdAt: any
              tagNoticeType: TagNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                }
              }> | null
              tag: {
                __typename?: 'Tag'
                id: string
                content: string
                numArticles: number
                numAuthors: number
              }
            }
          | {
              __typename: 'TransactionNotice'
              id: string
              unread: boolean
              createdAt: any
              txNoticeType: TransactionNoticeType
              tx: {
                __typename?: 'Transaction'
                id: string
                amount: number
                currency: TransactionCurrency
                target?:
                  | {
                      __typename: 'Article'
                      id: string
                      title: string
                      slug: string
                      mediaHash: string
                      cover?: string | null
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
                    }
                  | { __typename: 'Circle' }
                  | { __typename: 'Transaction' }
                  | null
              }
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                displayName?: string | null
                avatar?: string | null
                liker: { __typename?: 'Liker'; civicLiker: boolean }
                info: {
                  __typename?: 'UserInfo'
                  badges?: Array<{
                    __typename?: 'Badge'
                    type: BadgeType
                  }> | null
                }
              }> | null
            }
          | {
              __typename: 'UserNotice'
              id: string
              unread: boolean
              createdAt: any
              userNoticeType: UserNoticeType
              actors?: Array<{
                __typename?: 'User'
                id: string
                userName?: string | null
                avatar?: string | null
                displayName?: string | null
                isFollower: boolean
                isFollowee: boolean
                isBlocked: boolean
                liker: { __typename?: 'Liker'; civicLiker: boolean }
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

export type ViewerBlockListQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
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
          avatar?: string | null
          isFollower: boolean
          isFollowee: boolean
          isBlocked: boolean
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

export type ViewerNotificationCircleSettingsQueryVariables = Exact<{
  [key: string]: never
}>

export type ViewerNotificationCircleSettingsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    settings: {
      __typename?: 'UserSettings'
      language: UserLanguage
      notification?: {
        __typename?: 'NotificationSetting'
        enable: boolean
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

export type UpdateViewerNotificationCircleMutationVariables = Exact<{
  type: NotificationSettingType
  enabled: Scalars['Boolean']
}>

export type UpdateViewerNotificationCircleMutation = {
  __typename?: 'Mutation'
  updateNotificationSetting: {
    __typename?: 'User'
    id: string
    settings: {
      __typename?: 'UserSettings'
      notification?: {
        __typename?: 'NotificationSetting'
        enable: boolean
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

export type ViewerNotificationGeneralSettingsQueryVariables = Exact<{
  [key: string]: never
}>

export type ViewerNotificationGeneralSettingsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    settings: {
      __typename?: 'UserSettings'
      language: UserLanguage
      notification?: {
        __typename?: 'NotificationSetting'
        enable: boolean
        mention: boolean
        userNewFollower: boolean
        articleNewComment: boolean
        articleNewAppreciation: boolean
        articleNewSubscription: boolean
        articleCommentPinned: boolean
        articleNewCollected: boolean
      } | null
    }
  } | null
}

export type UpdateViewerNotificationGeneralMutationVariables = Exact<{
  type: NotificationSettingType
  enabled: Scalars['Boolean']
}>

export type UpdateViewerNotificationGeneralMutation = {
  __typename?: 'Mutation'
  updateNotificationSetting: {
    __typename?: 'User'
    id: string
    settings: {
      __typename?: 'UserSettings'
      notification?: {
        __typename?: 'NotificationSetting'
        enable: boolean
        mention: boolean
        userNewFollower: boolean
        articleNewComment: boolean
        articleNewAppreciation: boolean
        articleNewSubscription: boolean
        articleCommentPinned: boolean
        articleNewCollected: boolean
      } | null
    }
  }
}

export type ViewerNotificationSettingsQueryVariables = Exact<{
  [key: string]: never
}>

export type ViewerNotificationSettingsQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    settings: {
      __typename?: 'UserSettings'
      language: UserLanguage
      notification?: {
        __typename?: 'NotificationSetting'
        enable: boolean
        email: boolean
      } | null
    }
  } | null
}

export type UpdateViewerNotificationMutationVariables = Exact<{
  type: NotificationSettingType
  enabled: Scalars['Boolean']
}>

export type UpdateViewerNotificationMutation = {
  __typename?: 'Mutation'
  updateNotificationSetting: {
    __typename?: 'User'
    id: string
    settings: {
      __typename?: 'UserSettings'
      notification?: {
        __typename?: 'NotificationSetting'
        enable: boolean
        email: boolean
      } | null
    }
  }
}

export type ViewerTotalBlockCountQueryVariables = Exact<{
  [key: string]: never
}>

export type ViewerTotalBlockCountQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    blockList: { __typename?: 'UserConnection'; totalCount: number }
  } | null
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

export type ViewerLikeInfoQueryVariables = Exact<{ [key: string]: never }>

export type ViewerLikeInfoQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    info: {
      __typename?: 'UserInfo'
      email?: any | null
      ethAddress?: string | null
    }
    liker: { __typename?: 'Liker'; total: number; rateUSD?: number | null }
  } | null
}

export type MeTransactionsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
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
                  mediaHash: string
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
    liker: { __typename?: 'Liker'; total: number; rateUSD?: number | null }
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

export type OAuthClientInfoQueryVariables = Exact<{
  id: Scalars['ID']
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
  key: Scalars['String']
}>

export type SearchAggregateArticlesPublicQuery = {
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
            mediaHash: string
            articleState: ArticleState
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
            }
          }
        | { __typename?: 'Circle' }
        | { __typename?: 'Comment' }
        | { __typename?: 'User' }
        | { __typename?: 'Draft' }
        | { __typename?: 'Tag' }
        | { __typename?: 'Topic' }
        | { __typename?: 'Chapter' }
    }> | null
  }
}

export type SearchAggregateTagsPublicQueryVariables = Exact<{
  key: Scalars['String']
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
        | { __typename?: 'Circle' }
        | { __typename?: 'Comment' }
        | { __typename?: 'User' }
        | { __typename?: 'Draft' }
        | {
            __typename?: 'Tag'
            id: string
            content: string
            numArticles: number
            numAuthors: number
          }
        | { __typename?: 'Topic' }
        | { __typename?: 'Chapter' }
    }> | null
  }
}

export type SearchAggregateUsersPublicQueryVariables = Exact<{
  key: Scalars['String']
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
        | { __typename?: 'Circle' }
        | { __typename?: 'Comment' }
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
        | { __typename?: 'Draft' }
        | { __typename?: 'Tag' }
        | { __typename?: 'Topic' }
        | { __typename?: 'Chapter' }
    }> | null
  }
}

export type SearchArticlesPublicQueryVariables = Exact<{
  key: Scalars['String']
  first?: InputMaybe<Scalars['first_Int_min_0']>
  after?: InputMaybe<Scalars['String']>
}>

export type SearchArticlesPublicQuery = {
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
            mediaHash: string
            cover?: string | null
            summary: string
            createdAt: any
            readTime: number
            subscribed: boolean
            dataHash: string
            iscnId?: string | null
            revisedAt?: any | null
            sticky: boolean
            articleState: ArticleState
            author: {
              __typename?: 'User'
              id: string
              userName?: string | null
              displayName?: string | null
              isFollower: boolean
              isFollowee: boolean
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
            transactionsReceivedBy: {
              __typename?: 'UserConnection'
              totalCount: number
            }
            appreciationsReceived: {
              __typename?: 'AppreciationConnection'
              totalCount: number
            }
            donationsDialog: {
              __typename?: 'UserConnection'
              totalCount: number
            }
            drafts?: Array<{
              __typename?: 'Draft'
              iscnPublish?: boolean | null
            }> | null
            tags?: Array<{
              __typename?: 'Tag'
              id: string
              creator?: { __typename?: 'User'; id: string } | null
              editors?: Array<{ __typename?: 'User'; id: string }> | null
            }> | null
          }
        | { __typename?: 'Circle' }
        | { __typename?: 'Comment' }
        | { __typename?: 'User' }
        | { __typename?: 'Draft' }
        | { __typename?: 'Tag' }
        | { __typename?: 'Topic' }
        | { __typename?: 'Chapter' }
    }> | null
  }
}

export type SearchArticlesPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID']
}>

export type SearchArticlesPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | {
        __typename?: 'Article'
        id: string
        subscribed: boolean
        author: {
          __typename?: 'User'
          id: string
          isFollower: boolean
          isFollowee: boolean
        }
      }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
  > | null
}

export type SearchTagsPublicQueryVariables = Exact<{
  key: Scalars['String']
  after?: InputMaybe<Scalars['String']>
}>

export type SearchTagsPublicQuery = {
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
        | { __typename?: 'Circle' }
        | { __typename?: 'Comment' }
        | { __typename?: 'User' }
        | { __typename?: 'Draft' }
        | {
            __typename?: 'Tag'
            id: string
            content: string
            numArticles: number
            numAuthors: number
          }
        | { __typename?: 'Topic' }
        | { __typename?: 'Chapter' }
    }> | null
  }
}

export type SearchUsersPublicQueryVariables = Exact<{
  key: Scalars['String']
  after?: InputMaybe<Scalars['String']>
}>

export type SearchUsersPublicQuery = {
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
        | { __typename?: 'Circle' }
        | { __typename?: 'Comment' }
        | {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            avatar?: string | null
            isFollower: boolean
            isFollowee: boolean
            isBlocked: boolean
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
        | { __typename?: 'Draft' }
        | { __typename?: 'Tag' }
        | { __typename?: 'Topic' }
        | { __typename?: 'Chapter' }
    }> | null
  }
}

export type SearchUsersPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID']
}>

export type SearchUsersPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Comment'; id: string }
    | {
        __typename?: 'User'
        id: string
        isFollower: boolean
        isFollowee: boolean
        isBlocked: boolean
      }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
  > | null
}

export type FollowButtonTagPrivateFragment = {
  __typename?: 'Tag'
  id: string
  isFollower?: boolean | null
}

export type TagParticipantsQueryVariables = Exact<{
  id: Scalars['ID']
  after?: InputMaybe<Scalars['String']>
}>

export type TagParticipantsQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | {
        __typename: 'Tag'
        id: string
        participants: {
          __typename?: 'UserConnection'
          totalCount: number
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
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type CoverTagFragment = {
  __typename?: 'Tag'
  id: string
  cover?: string | null
  content: string
  numArticles: number
  numAuthors: number
}

export type TagDetailRecommendedQueryVariables = Exact<{
  id: Scalars['ID']
  random?: InputMaybe<Scalars['random_Int_min_0_max_49']>
}>

export type TagDetailRecommendedQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
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
              description?: string | null
              cover?: string | null
              numArticles: number
              numAuthors: number
            }
          }> | null
        }
      }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type TagFragmentFragment = {
  __typename?: 'Tag'
  id: string
  content: string
  cover?: string | null
  description?: string | null
  numArticles: number
  numAuthors: number
  isOfficial?: boolean | null
  isFollower?: boolean | null
  creator?: {
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
  editors?: Array<{
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
  owner?: {
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
  selectedArticles: { __typename?: 'ArticleConnection'; totalCount: number }
  recommended: {
    __typename?: 'TagConnection'
    edges?: Array<{
      __typename?: 'TagEdge'
      cursor: string
      node: {
        __typename?: 'Tag'
        id: string
        content: string
        description?: string | null
        cover?: string | null
        numArticles: number
        numAuthors: number
      }
    }> | null
  }
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
  articles: { __typename?: 'ArticleConnection'; totalCount: number }
}

export type TagDetailPublicQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type TagDetailPublicQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | {
        __typename?: 'Tag'
        id: string
        content: string
        cover?: string | null
        description?: string | null
        numArticles: number
        numAuthors: number
        isOfficial?: boolean | null
        isFollower?: boolean | null
        creator?: {
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
        editors?: Array<{
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
        owner?: {
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
        selectedArticles: {
          __typename?: 'ArticleConnection'
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
              description?: string | null
              cover?: string | null
              numArticles: number
              numAuthors: number
            }
          }> | null
        }
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
        articles: { __typename?: 'ArticleConnection'; totalCount: number }
      }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type TagDetailPublicBySearchQueryVariables = Exact<{
  key: Scalars['String']
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
        | { __typename?: 'Circle' }
        | { __typename?: 'Comment' }
        | { __typename?: 'User' }
        | { __typename?: 'Draft' }
        | {
            __typename?: 'Tag'
            id: string
            content: string
            cover?: string | null
            description?: string | null
            numArticles: number
            numAuthors: number
            isOfficial?: boolean | null
            isFollower?: boolean | null
            creator?: {
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
            editors?: Array<{
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
            owner?: {
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
            selectedArticles: {
              __typename?: 'ArticleConnection'
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
                  description?: string | null
                  cover?: string | null
                  numArticles: number
                  numAuthors: number
                }
              }> | null
            }
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
                    badges?: Array<{
                      __typename?: 'Badge'
                      type: BadgeType
                    }> | null
                  }
                }
              }> | null
            }
            articles: { __typename?: 'ArticleConnection'; totalCount: number }
          }
        | { __typename?: 'Topic' }
        | { __typename?: 'Chapter' }
    }> | null
  }
}

export type TagDetailPrivateQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type TagDetailPrivateQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
    | { __typename?: 'User' }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag'; id: string; isFollower?: boolean | null }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type CardTagFragment = {
  __typename?: 'Tag'
  id: string
  content: string
  cover?: string | null
}

export type AllTagsRecommendedSidebarQueryVariables = Exact<{
  [key: string]: never
}>

export type AllTagsRecommendedSidebarQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    recommendation: {
      __typename?: 'Recommendation'
      tags: {
        __typename?: 'TagConnection'
        edges?: Array<{
          __typename?: 'TagEdge'
          node: {
            __typename?: 'Tag'
            id: string
            recommended: {
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
                  description?: string | null
                  cover?: string | null
                  numArticles: number
                  numAuthors: number
                }
              }> | null
            }
          }
        }> | null
      }
    }
  } | null
}

export type AllTagsHottestQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>
}>

export type AllTagsHottestQuery = {
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
            cover?: string | null
            numArticles: number
            numAuthors: number
            articles: {
              __typename?: 'ArticleConnection'
              edges?: Array<{
                __typename?: 'ArticleEdge'
                cursor: string
                node: {
                  __typename?: 'Article'
                  id: string
                  title: string
                  slug: string
                  mediaHash: string
                  author: {
                    __typename?: 'User'
                    id: string
                    userName?: string | null
                  }
                }
              }> | null
            }
          }
        }> | null
      }
    }
  } | null
}

export type ArticlesUserFragment = {
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
        createdAt: any
        wordCount?: number | null
        id: string
        title: string
        slug: string
        mediaHash: string
        cover?: string | null
        summary: string
        readTime: number
        subscribed: boolean
        dataHash: string
        iscnId?: string | null
        revisedAt?: any | null
        sticky: boolean
        articleState: ArticleState
        author: {
          __typename?: 'User'
          id: string
          userName?: string | null
          displayName?: string | null
          isFollower: boolean
          isFollowee: boolean
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
        transactionsReceivedBy: {
          __typename?: 'UserConnection'
          totalCount: number
        }
        appreciationsReceived: {
          __typename?: 'AppreciationConnection'
          totalCount: number
        }
        donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
        drafts?: Array<{
          __typename?: 'Draft'
          iscnPublish?: boolean | null
        }> | null
        tags?: Array<{
          __typename?: 'Tag'
          id: string
          creator?: { __typename?: 'User'; id: string } | null
          editors?: Array<{ __typename?: 'User'; id: string }> | null
        }> | null
      }
    }> | null
  }
  subscribedCircles: { __typename?: 'CircleConnection'; totalCount: number }
  status?: {
    __typename?: 'UserStatus'
    state: UserState
    articleCount: number
    totalWordCount: number
  } | null
}

export type ViewerArticlesQueryVariables = Exact<{
  userName: Scalars['String']
  after?: InputMaybe<Scalars['String']>
}>

export type ViewerArticlesQuery = {
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
          createdAt: any
          wordCount?: number | null
          id: string
          title: string
          slug: string
          mediaHash: string
          cover?: string | null
          summary: string
          readTime: number
          subscribed: boolean
          dataHash: string
          iscnId?: string | null
          revisedAt?: any | null
          sticky: boolean
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            isFollower: boolean
            isFollowee: boolean
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
          transactionsReceivedBy: {
            __typename?: 'UserConnection'
            totalCount: number
          }
          appreciationsReceived: {
            __typename?: 'AppreciationConnection'
            totalCount: number
          }
          donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
          drafts?: Array<{
            __typename?: 'Draft'
            iscnPublish?: boolean | null
          }> | null
          tags?: Array<{
            __typename?: 'Tag'
            id: string
            creator?: { __typename?: 'User'; id: string } | null
            editors?: Array<{ __typename?: 'User'; id: string }> | null
          }> | null
        }
      }> | null
    }
    subscribedCircles: { __typename?: 'CircleConnection'; totalCount: number }
    status?: {
      __typename?: 'UserStatus'
      state: UserState
      articleCount: number
      totalWordCount: number
    } | null
  } | null
}

export type UserArticlesPublicQueryVariables = Exact<{
  userName: Scalars['String']
  after?: InputMaybe<Scalars['String']>
}>

export type UserArticlesPublicQuery = {
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
          createdAt: any
          wordCount?: number | null
          id: string
          title: string
          slug: string
          mediaHash: string
          cover?: string | null
          summary: string
          readTime: number
          subscribed: boolean
          dataHash: string
          iscnId?: string | null
          revisedAt?: any | null
          sticky: boolean
          articleState: ArticleState
          author: {
            __typename?: 'User'
            id: string
            userName?: string | null
            displayName?: string | null
            isFollower: boolean
            isFollowee: boolean
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
          transactionsReceivedBy: {
            __typename?: 'UserConnection'
            totalCount: number
          }
          appreciationsReceived: {
            __typename?: 'AppreciationConnection'
            totalCount: number
          }
          donationsDialog: { __typename?: 'UserConnection'; totalCount: number }
          drafts?: Array<{
            __typename?: 'Draft'
            iscnPublish?: boolean | null
          }> | null
          tags?: Array<{
            __typename?: 'Tag'
            id: string
            creator?: { __typename?: 'User'; id: string } | null
            editors?: Array<{ __typename?: 'User'; id: string }> | null
          }> | null
        }
      }> | null
    }
    subscribedCircles: { __typename?: 'CircleConnection'; totalCount: number }
    status?: {
      __typename?: 'UserStatus'
      state: UserState
      articleCount: number
      totalWordCount: number
    } | null
  } | null
}

export type UserArticlesPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID']
}>

export type UserArticlesPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | {
        __typename?: 'Article'
        id: string
        subscribed: boolean
        author: {
          __typename?: 'User'
          id: string
          isFollower: boolean
          isFollowee: boolean
        }
      }
    | { __typename?: 'Circle'; id: string }
    | { __typename?: 'Comment'; id: string }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
  > | null
}

export type UserIdUserQueryVariables = Exact<{
  userName: Scalars['String']
}>

export type UserIdUserQuery = {
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
    subscribedCircles: { __typename?: 'CircleConnection'; totalCount: number }
  } | null
}

export type UserCommentsPublicQueryVariables = Exact<{
  id: Scalars['ID']
  after?: InputMaybe<Scalars['String']>
}>

export type UserCommentsPublicQuery = {
  __typename?: 'Query'
  node?:
    | { __typename?: 'Article' }
    | { __typename?: 'Circle' }
    | { __typename?: 'Comment' }
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
              mediaHash: string
              articleState: ArticleState
              comments: {
                __typename?: 'CommentConnection'
                edges?: Array<{
                  __typename?: 'CommentEdge'
                  cursor: string
                  node: {
                    __typename?: 'Comment'
                    id: string
                    fromDonator: boolean
                    pinned: boolean
                    state: CommentState
                    content?: string | null
                    type: CommentType
                    createdAt: any
                    upvotes: number
                    downvotes: number
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
                          mediaHash: string
                          slug: string
                          pinCommentLeft: number
                          author: {
                            __typename?: 'User'
                            id: string
                            isBlocking: boolean
                            userName?: string | null
                          }
                        }
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
                      | { __typename?: 'Comment' }
                      | { __typename?: 'User' }
                      | { __typename?: 'Draft' }
                      | { __typename?: 'Tag' }
                      | { __typename?: 'Topic' }
                      | { __typename?: 'Chapter' }
                    parentComment?: {
                      __typename?: 'Comment'
                      id: string
                    } | null
                  }
                }> | null
              }
              author: {
                __typename?: 'User'
                id: string
                userName?: string | null
              }
            }
          }> | null
        }
      }
    | { __typename?: 'Draft' }
    | { __typename?: 'Tag' }
    | { __typename?: 'Topic' }
    | { __typename?: 'Chapter' }
    | null
}

export type UserCommentsPrivateQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID']
}>

export type UserCommentsPrivateQuery = {
  __typename?: 'Query'
  nodes?: Array<
    | { __typename?: 'Article'; id: string }
    | { __typename?: 'Circle'; id: string }
    | {
        __typename?: 'Comment'
        id: string
        myVote?: Vote | null
        type: CommentType
        createdAt: any
        node:
          | {
              __typename?: 'Article'
              id: string
              slug: string
              mediaHash: string
              author: {
                __typename?: 'User'
                id: string
                isBlocking: boolean
                userName?: string | null
              }
            }
          | {
              __typename?: 'Circle'
              id: string
              name: string
              owner: { __typename?: 'User'; id: string; isBlocking: boolean }
            }
          | { __typename?: 'Comment' }
          | { __typename?: 'User' }
          | { __typename?: 'Draft' }
          | { __typename?: 'Tag' }
          | { __typename?: 'Topic' }
          | { __typename?: 'Chapter' }
        author: { __typename?: 'User'; id: string; isBlocked: boolean }
        parentComment?: { __typename?: 'Comment'; id: string } | null
      }
    | { __typename?: 'User'; id: string }
    | { __typename?: 'Draft'; id: string }
    | { __typename?: 'Tag'; id: string }
    | { __typename?: 'Topic'; id: string }
    | { __typename?: 'Chapter'; id: string }
  > | null
}

export type UserSubscriptionsQueryVariables = Exact<{
  userName: Scalars['String']
  after?: InputMaybe<Scalars['String']>
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

export type UserTagsPublicQueryVariables = Exact<{
  userName: Scalars['String']
  after?: InputMaybe<Scalars['String']>
}>

export type UserTagsPublicQuery = {
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
    subscribedCircles: { __typename?: 'CircleConnection'; totalCount: number }
    maintainedTags: {
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
          numArticles: number
          numAuthors: number
        }
      }> | null
    }
  } | null
}
