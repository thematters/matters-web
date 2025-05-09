// User
export const MOCK_USER = {
  __typename: 'User' as any,
  id: 'VXNlcjox', // User:1
  userName: 'matty',
  displayName: 'Matty',
  avatar:
    'https://imagedelivery.net/kDRCweMmqLnTPNlbum-pYA/prod/avatar/19b36f6e-6311-4cd6-b703-c143a4a49113.png/public',
  liker: {
    __typename: 'Liker' as any,
    likerId: 'liker-id-0000',
    civicLiker: false,
  },
  status: {
    __typename: 'UserStatus' as any,
    state: 'active' as any,
    unreadNoticeCount: 0,
    hasPaymentPassword: true,
    role: 'user' as any,
    hasEmailLoginPassword: true,
    changeEmailTimesLeft: 0,
  },
  info: {
    __typename: 'UserInfo' as any,
    badges: null,
    isWalletAuth: true,
    agreeOn: true,
    userNameEditable: false,
    socialAccounts: [],
    emailVerified: true,
    group: 'a' as any,
    description: 'Matters 唯一官方帳號',
    cryptoWallet: {
      __typename: 'CryptoWallet' as any,
      id: 'crypto-wallet-0000',
      address: '0x0x0x0x0x0x0x0x0x0x0x',
      hasNFTs: true,
      nfts: [
        {
          __typename: 'NFTAsset' as any,
          id: '1',
        },
      ],
    },
  },
  settings: {
    language: 'en' as any,
    currency: 'HKD' as any,
  },
  following: {
    users: {
      __typename: 'UserConnection' as any,
      totalCount: 0,
    },
    tags: {
      __typename: 'TagConnection' as any,
      totalCount: 0,
    },
  },
  followers: {
    __typename: 'UserConnection' as any,
    totalCount: 0,
  },
  articles: {
    __typename: 'ArticleConnection' as any,
    totalCount: 0,
  },
  ownCircles: null,
  isFollower: false,
  isFollowee: false,
}

// Circle
export const MOCK_CIRCLE = {
  __typename: 'Circle' as any,
  id: 'Q2lyY2xlOjE', // Circle:1
  state: 'active',
  name: 'matters_class',
  displayName: 'Matters 自由課（第一季第二期）',
  avatar: 'https://placehold.co/256x256?circle',
  cover: 'https://placehold.co/512x512?circle',
  createdAt: '2020-12-24T07:29:17.682Z',
  description:
    '《我們這個時代的自由課》是 Matters 自 2020 年起策劃的主題線上講座。從 8 月 9 日「自由課」第一場開始，至今已經完成 9 場。分別從最實用的角度，以「自由工具包」為題談自由的條件；從思想與歷史切入，以「自由讀書會」為題思考關於自由的經典。',
  owner: MOCK_USER,
  prices: [
    {
      __typename: 'Price' as any,
      id: 'price-0000',
      state: 'active',
      amount: 5,
      currency: 'HKD' as any,
    },
  ],
  members: {
    __typename: 'MemberConnection' as any,
    totalCount: 48,
  },
  followers: {
    __typename: 'UserConnection' as any,
    totalCount: 36,
  },
  works: {
    __typename: 'ArticleConnection' as any,
    totalCount: 8,
  },
  isMember: true,
  invitedBy: {
    __typename: 'Invitation' as any,
    id: 'circle-invitation-000',
    state: 'pending' as any,
    freePeriod: 30,
  },
}

// Article
export const MOCK_ARTILCE = {
  __typename: 'Article' as any,
  id: 'QXJ0aWNsZTox', // Article:1
  title: '中國四川：挑戰世界最危險的公路之一 川藏公路絕美風光',
  slug: 'slug',
  shortHash: 'r5ade0on7x1g',
  mediaHash: 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a',
  dataHash: 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a',
  articleState: 'active' as any,
  revisionCount: 3,
  state: 'active' as any,
  cover: 'https://placehold.co/256x256?article',
  assets: [
    {
      __typename: 'Asset' as any,
      id: 'asset-0000',
      type: 'embed' as any,
      path: 'https://placehold.co/256x256?article',
    },
  ],
  oss: {
    __typename: 'ArticleOSS' as any,
    inRecommendHottest: false,
    inRecommendIcymi: false,
    inRecommendNewest: false,
    adStatus: {
      __typename: 'AdStatus' as any,
      isAd: false,
    },
  },
  summary:
    '其實已經開始兩週了XD,不過最近才想說應該來紀錄一下我在火箭隊的日常,順便練一下文筆,也可以讓大家了解一下火箭隊軟體培訓營裡面大概是在做些什麼事情,上課的模式及氣氛是怎樣等等...畢竟我當時得知有這個免費培訓營時,也是網路上各種爬文類似這種免費培訓工程師半年的心得及成',
  author: MOCK_USER,
  createdAt: '2020-12-24T07:29:17.682Z',
  revisedAt: null,
  likesReceived: {
    __typename: 'AppreciationConnection' as any,
    totalCount: 0,
  },
  iscnId: 'isz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZE',
  pinned: false,
  readTime: 1234.5,
  tags: [],
  likesReceivedTotal: 1,
  responseCount: 10,
  readerCount: 100,
  appreciationsReceivedTotal: 1000,
  commentCount: 9999,
  donationCount: 234,
  donations: {
    __typename: 'ArticleDonationConnection' as any,
    totalCount: 190,
  },
  donationsDialog: {
    __typename: 'ArticleDonationConnection' as any,
    totalCount: 190,
  },
  folllowed: false,
  access: {
    __typename: 'ArticleAccess' as any,
    type: 'paywall' as any,
    circle: MOCK_CIRCLE,
    secret: '6NMhDB51cCvNWa1GMS7LUkZEP2a',
  },
  campaigns: [],
  drafts: [
    {
      __typename: 'Draft' as any,
      iscnPublish: false,
    },
  ],
}

export const MOCK_CIRCLE_ARTICLE = {
  ...MOCK_ARTILCE,
  circle: MOCK_CIRCLE,
}

// Comment
export const MOCK_PARENT_COMMENT = {
  __typename: 'Comment' as any,
  id: 'Q29tbWVudDox', // Comment:1
  state: 'active' as any,
  node: MOCK_ARTILCE,
  parentComment: null,
  content:
    '中國傳統文學裡的「幽」傳統，對此的文論並不多，我聽說李歐梵教授在做此研究，蔡老師能否多講一些',
  author: MOCK_USER,
}

export const MOCK_COMMENT = {
  __typename: 'Comment' as any,
  id: 'Q29tbWVudDoy', // Comment:2
  state: 'active' as any,
  node: MOCK_ARTILCE,
  type: 'article' as any,
  parentComment: MOCK_PARENT_COMMENT,
  createdAt: '2020-12-24T07:29:17.682Z',
  pinned: false,
  content:
    '今晚要跟大家說的是關於嘎嘎比森林的故事，故事是源自於安哲的繪本《不安分的石頭》。幾年前看過這本書，這不只是給孩童，也是給大人閱讀的一本好書。內容是提到關於一座從來都固守原貌的森林，突然闖入了一顆小石頭，大家原本井然有序的生活被打亂了。在這個大家都害怕「不安分」的世界，又中國傳統文學裡的「幽」傳統，對此的文論並不多，我聽說李歐梵教授在做此研究，蔡老師能否多講一些',
  author: { ...MOCK_USER, isBlocked: false },
  fromDonator: false,
  upvotes: 1,
  downvotes: 2,
}

export const MOCK_DRAFT = {
  id: 'RHJhZnQ6MQ', // Draft:1
  title: 'draft-title',
  slug: 'draft-slug',
  updatedAt: '2020-12-24T07:29:17.682Z',
}

export const MOCK_COLLECTON = {
  id: 'Q29sbGVjdGlvbjox', // Collection:1
  title: 'collection-title',
  cover: 'https://placehold.co/256x256?collection',
  description: 'collection-description',
  author: MOCK_USER,
  articles: {
    __typename: 'ArticleConnection' as any,
    totalCount: 1,
    edges: [{ node: MOCK_ARTILCE }],
  },
  pinned: false,
  updatedAt: '2020-12-24T07:29:17.682Z',
}

export const MOCK_CIRCLE_COMMENT = {
  ...MOCK_COMMENT,
  type: 'circleBroadcast' as any,
  node: MOCK_CIRCLE,
}

// Tag
export const MOCK_TAG = {
  __typename: 'Tag' as any,
  id: 'VGFnOjE', // Tag:1
  slug: 'tag-slug',
  content: '香港',
  articles: {
    __typename: 'ArticleConnection' as any,
    totalCount: 4,
    edges: [
      { node: MOCK_ARTILCE, cursor: 'tag-1' },
      { node: MOCK_ARTILCE, cursor: 'tag-2' },
      { node: MOCK_ARTILCE, cursor: 'tag-3' },
      { node: MOCK_ARTILCE, cursor: 'tag-4' },
    ],
  },
  numArticles: 100,
  numAuthors: 21,
}

// Collection
export const MOCK_COLLECTION = {
  __typename: 'Collection' as any,
  id: 'collection-0000',
  title: '香港',
  author: MOCK_USER,
  updatedAt: '2020-12-24T07:29:17.682Z',
  pinned: false,
  cover: 'https://placehold.co/256x256?collection',
  description:
    'Nostrud eu est proident sit fugiat aliqua pariatur tempor proident sint. Lorem deserunt labore incididunt quis voluptate sint sit aute proident adipisicing. Labore nostrud cupidatat deserunt. Culpa anim laboris deserunt proident.',
  articles: {
    __typename: 'ArticleConnection' as any,
    totalCount: 1,
    edges: [{ node: MOCK_ARTILCE }],
  },
  liked: false,
  likeCount: 12,
}

// Transaction
export const MOCK_TRANSACTION = {
  __typename: 'Transaction' as any,
  id: 'tx-0000',
  amount: 100,
  currency: 'HKD',
  target: MOCK_ARTILCE,
}

export const MOCK_BLOCKCHAIN_TRANSACTION = {
  __typename: 'BlockchainTransaction' as any,
  chain: 'Optimism' as any,
  txHash: '0x1234567890abcdef',
}

// Crypto wallet
export const MOCK_CRYPTO_WALLET = {
  __typename: 'CryptoWallet' as any,
  id: 'crypto-wallet-0000',
  address: '0x0x0x0x0x0x0x0x0x0x0x',
  hasNFTs: false,
  nfts: [
    {
      __typename: 'NFTAsset' as any,
      id: '1',
    },
  ],
}

// Moment
export const MOCK_MOMENT = {
  __typename: 'Moment' as any,
  id: 'TW9tZW50OjE',
  shortHash: 'r5ade0on7x1g',
  content: '<p>這是一個時刻</p>',
  assets: [
    {
      __typename: 'Asset' as any,
      id: 'QXNzZXQ6MQ',
      type: 'embed' as any,
      path: 'https://images.unsplash.com/photo-1719209618812-a11aea8d1a32',
    },
    {
      __typename: 'Asset' as any,
      id: 'QXNzZXQ6Mg',
      type: 'embed' as any,
      path: 'https://images.unsplash.com/photo-1719210146204-17dc9c95b34d',
    },
    {
      __typename: 'Asset' as any,
      id: 'QXNzZXQ6Mw',
      type: 'embed' as any,
      path: 'https://images.unsplash.com/photo-1719212328828-5ad8dd12be00',
    },
  ],
  author: MOCK_USER,
  state: 'active' as any,
  commentCount: 10,
  likeCount: 100,
  liked: false,
  createdAt: '2020-12-24T07:29:17.682Z',
  commentedFollowees: [
    {
      ...MOCK_USER,
      id: 'VXNlcjox',
      userName: 'matty2020',
      displayName: 'Matty2020',
      avatar: 'https://images.unsplash.com/photo-1720072480766-7a584e2ea03c',
    },
    {
      ...MOCK_USER,
      id: 'VXNlcsdf',
      userName: 'matty2021',
      displayName: 'Matty2021',
      avatar: 'https://images.unsplash.com/photo-1662850886700-4ec19bd30d11',
    },
    {
      ...MOCK_USER,
      id: 'VXNlcddx',
      userName: 'matty2022',
      displayName: 'Matty2022',
      avatar: 'https://images.unsplash.com/photo-1716403006232-5891fa7f2a24',
    },
  ],
}

export const MOCK_MOMENT_LIKE = {
  ...MOCK_MOMENT,
  content: '<p>這是一個時刻!!!!!!!!!!!!!!!! @jj</p>',
}

export const MOCK_MOMENT_COMMENT = {
  ...MOCK_COMMENT,
  node: MOCK_MOMENT,
  type: 'moment' as any,
}

// Campaign
export const MOCK_CAMPAIGN = {
  __typename: 'Campaign' as any,
  id: 'campaign-0000',
  shortHash: 'campaign-short-hash',
  name: '自由寫「七日書」第三期',
  description:
    '<p>愛與關係有很多模樣：愛情、友情、親情，或這些字詞皆不能形容的、無法被歸類或定義的關係。在與親密關係對象相處時，牽動你許多感受、情緒、個人探索，這可以是主動的、也可以是被動的；有理解、被理解或不被理解；有平等的，也有不被看見的。正因為關係是微妙且無法定義的，當中有著許多探索與反思，今期想邀請你寫下你在親密關係中的自己與對方，跟我們分享這些故事吧。</p><p><br class="smart" /></p><p><br class="smart" /></p><p>每日題目（7月1日 - 7月7日）</p><p>・寫一段難以定義但對你意義重大的關係。</p><p>・在一段關係裡，你有沒有一個化被動為主動的時刻？無論是愛情、親情或友情。</p><p>・記一個在親密關係中感受到「被看見」的時刻。</p><p>・寫下一個讓你決定結束關係的瞬間。</p><p>・來到你記憶裡最模糊、最遙遠的一段關係，寫下一件你覺得莫名其妙但一直記得的小事。</p>',
  link: 'https://example.com',
  cover: 'https://placehold.co/1300x768?campaign',
  state: 'active',
  applicationPeriod: {
    __typename: 'DatetimeRange' as any,
    start: '2020-12-21T07:29:17.682Z',
    end: '2020-12-24T07:29:17.682Z',
  },
  writingPeriod: {
    __typename: 'DatetimeRange' as any,
    start: '2020-12-24T07:29:17.682Z',
    end: '2020-12-28T07:29:17.682Z',
  },
  stages: [
    {
      __typename: 'CampaignStage' as any,
      name: '書後感',
      period: {
        __typename: 'DatetimeRange' as any,
        start: '2020-12-24T07:29:17.682Z',
      },
    },
    {
      __typename: 'CampaignStage' as any,
      name: '第一天',
      period: {
        __typename: 'DatetimeRange' as any,
        start: '2020-12-24T07:29:17.682Z',
        end: '2020-12-25T07:29:17.682Z',
      },
    },
    {
      __typename: 'CampaignStage' as any,
      name: '第二天',
      period: {
        __typename: 'DatetimeRange' as any,
        start: '2020-12-25T07:29:17.682Z',
        end: '2020-12-26T07:29:17.682Z',
      },
    },
    {
      __typename: 'CampaignStage' as any,
      name: '第三天',
      period: {
        __typename: 'DatetimeRange' as any,
        start: '2020-12-26T07:29:17.682Z',
        end: '2020-12-27T07:29:17.682Z',
      },
    },
    {
      __typename: 'CampaignStage' as any,
      name: '第四天',
      period: {
        __typename: 'DatetimeRange' as any,
        start: '2020-12-27T07:29:17.682Z',
        end: '2020-12-28T07:29:17.682Z',
      },
    },
    {
      __typename: 'CampaignStage' as any,
      name: '第五天',
      period: {
        __typename: 'DatetimeRange' as any,
        start: '2020-12-28T07:29:17.682Z',
        end: '2020-12-29T07:29:17.682Z',
      },
    },
    {
      __typename: 'CampaignStage' as any,
      name: '第六天',
      period: {
        __typename: 'DatetimeRange' as any,
        start: '2020-12-29T07:29:17.682Z',
        end: '2020-12-30T07:29:17.682Z',
      },
    },
    {
      __typename: 'CampaignStage' as any,
      name: '第七天',
      period: {
        __typename: 'DatetimeRange' as any,
        start: '2020-12-30T07:29:17.682Z',
        end: '2021-01-01T07:29:17.682Z',
      },
    },
  ],
  participants: {
    __typename: 'UserConnection' as any,
    totalCount: 1,
    edges: [
      { node: MOCK_USER },
      { node: MOCK_USER },
      { node: MOCK_USER },
      { node: MOCK_USER },
      { node: MOCK_USER },
      { node: MOCK_USER },
      { node: MOCK_USER },
      { node: MOCK_USER },
      { node: MOCK_USER },
      { node: MOCK_USER },
      { node: MOCK_USER },
      { node: MOCK_USER },
      { node: MOCK_USER },
      { node: MOCK_USER },
      { node: MOCK_USER },
    ],
  },
  articles: {
    __typename: 'ArticleConnection' as any,
    totalCount: 1,
    edges: [
      { node: MOCK_ARTILCE },
      { node: MOCK_ARTILCE },
      { node: MOCK_ARTILCE },
      { node: MOCK_ARTILCE },
      { node: MOCK_ARTILCE },
      { node: MOCK_ARTILCE },
      { node: MOCK_ARTILCE },
      { node: MOCK_ARTILCE },
      { node: MOCK_ARTILCE },
    ],
  },
  // application: null,
  application: {
    state: 'succeeded',
    createdAt: '2020-12-24T07:29:17.682Z',
  },
  // application: {'pending',
  // application: {'rejected',
}
