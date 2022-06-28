// User
export const MOCK_USER = {
  __typename: 'User' as any,
  id: 'user-0000',
  userName: 'matty',
  displayName: 'Matty',
  status: {
    __typename: 'UserStatus' as any,
    state: 'active' as any,
  },
  avatar: 'https://source.unsplash.com/256x256?user',
  info: {
    __typename: 'UserInfo' as any,
    badges: null,
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
  liker: {
    __typename: 'Liker' as any,
    civicLiker: false,
  },
  ownCircles: null,
  isFollower: false,
  isFollowee: false,
}

// Circle
export const MOCK_CIRCLE = {
  __typename: 'Circle' as any,
  id: 'circle-0000',
  state: 'active',
  name: 'matters_class',
  displayName: 'Matters 自由課（第一季第二期）',
  avatar: 'https://source.unsplash.com/256x256?circle',
  cover: 'https://source.unsplash.com/512x512?circle',
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
  id: 'article-0000',
  title: '中國四川：挑戰世界最危險的公路之一 川藏公路絕美風光',
  slug: 'slug',
  mediaHash: 'article-media-hash',
  articleState: 'active' as any,
  state: 'active' as any,
  cover: 'https://source.unsplash.com/256x256?user',
  summary:
    '其實已經開始兩週了XD,不過最近才想說應該來記錄一下我在火箭隊的日常,順便練一下文筆,也可以讓大家了解一下火箭隊軟體培訓營裡面大概是在做些什麼事情,上課的模式及氣氛是怎樣等等...畢竟我當時得知有這個免費培訓營時,也是網路上各種爬文類似這種免費培訓工程師半年的心得及成',
  author: MOCK_USER,
  createdAt: '2020-12-24T07:29:17.682Z',
  revisedAt: null,
  appreciationsReceived: {
    __typename: 'AppreciationConnection' as any,
    totalCount: 0,
  },
  dataHash: 'article-data-hash',
  iscnId: '',
  sticky: false,
  readTime: 1234.5,
  tags: [],
  appreciationsReceivedTotal: 1,
  responseCount: 10,
  transactionsReceivedBy: {
    __typename: 'AppreciationConnection' as any,
    totalCount: 190,
  },
  donationsDialog: {
    __typename: 'AppreciationConnection' as any,
    totalCount: 190,
  },
  subscribed: false,
  access: {
    __typename: 'ArticleAccess' as any,
    type: 'paywall' as any,
    circle: MOCK_CIRCLE,
  },
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
  id: 'comment-0000',
  state: 'active' as any,
  node: MOCK_ARTILCE,
  parentComment: null,
  content:
    '中國傳統文學裡的「幽」傳統，對此的文論並不多，我聽說李歐梵教授在做此研究，蔡老師能否多講一些',
  author: MOCK_USER,
}

export const MOCK_COMMENT = {
  __typename: 'Comment' as any,
  id: 'comment-0000',
  state: 'active' as any,
  node: MOCK_ARTILCE,
  parentComment: MOCK_PARENT_COMMENT,
  createdAt: '2020-12-24T07:29:17.682Z',
  content:
    '今晚要跟大家說的是關於嘎嘎比森林的故事，故事是源自於安哲的繪本《不安分的石頭》。幾年前看過這本書，這不只是給孩童，也是給大人閱讀的一本好書。內容是提到關於一座從來都固守原貌的森林，突然闖入了一顆小石頭，大家原本井然有序的生活被打亂了。在這個大家都害怕「不安分」的世界，又中國傳統文學裡的「幽」傳統，對此的文論並不多，我聽說李歐梵教授在做此研究，蔡老師能否多講一些',
  author: { ...MOCK_USER, isBlocked: false },
}

export const MOCK_CIRCLE_COMMENT = {
  ...MOCK_COMMENT,
  node: MOCK_CIRCLE,
}

// Tag
export const MOCK_TAG = {
  __typename: 'Tag' as any,
  id: 'tag-0000',
  editors: [MOCK_USER],
  owner: MOCK_USER,
  content: '香港',
  articles: {
    __typename: 'ArticleConnection' as any,
    totalCount: 8,
    edges: [{ node: MOCK_ARTILCE }],
  },
}

// Transaction
export const MOCK_TRANSACTION = {
  __typename: 'Transaction' as any,
  id: 'tx-0000',
  amount: 100,
  currency: 'HKD',
  target: MOCK_ARTILCE,
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
