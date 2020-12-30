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
    description: 'Matters 唯一官方帳號',
  },
  liker: {
    __typename: 'Liker' as any,
    civicLiker: false,
  },
}

// Circle
export const MOCK_CIRCLE = {
  __typename: 'Circle' as any,
  id: 'circle-0000',
  state: 'active',
  circleName: 'matters_class',
  displayName: 'Matters 自由課（第一季第二期）',
  avatar: 'https://source.unsplash.com/256x256?cirlce',
  description:
    '《我們這個時代的自由課》是 Matters 自 2020 年起策劃的主題線上講座。從 8 月 9 日「自由課」第一場開始，至今已經完成 9 場。分別從最實用的角度，以「自由工具包」為題談自由的條件；從思想與歷史切入，以「自由讀書會」為題思考關於自由的經典。',
  owner: MOCK_USER,
  prices: [
    {
      __typename: 'Price' as any,
      id: 'price-0000',
      state: 'active',
      amount: 5,
      currency: 'HKD',
      billingCycle: 'monthly',
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
  appreciationsReceived: {
    __typename: 'AppreciationConnection' as any,
    totalCount: 0,
  },
  dataHash: 'article-data-hash',
  sticky: false,
  tags: [],
  appreciationsReceivedTotal: 1,
  responseCount: 10,
  transactionsReceivedBy: {
    __typename: 'AppreciationConnection' as any,
    totalCount: 190,
  },
  subscribed: false,
  circle: MOCK_CIRCLE,
  isLimitedFree: true,
}

// Comment
export const MOCK_PARENT_COMMENT = {
  __typename: 'Comment' as any,
  id: 'comment-0000',
  state: 'active' as any,
  article: MOCK_ARTILCE,
  parentComment: null,
  content:
    '中國傳統文學裡的「幽」傳統，對此的文論並不多，我聽說李歐梵教授在做此研究，蔡老師能否多講一些',
  author: MOCK_USER,
}

export const MOCK_COMMENT = {
  __typename: 'Comment' as any,
  id: 'comment-0000',
  state: 'active' as any,
  article: MOCK_ARTILCE,
  parentComment: MOCK_PARENT_COMMENT,
  content:
    '中國傳統文學裡的「幽」傳統，對此的文論並不多，我聽說李歐梵教授在做此研究，蔡老師能否多講一些',
  author: MOCK_USER,
}

// Tag
export const MOCK_TAG = {
  __typename: 'Tag' as any,
  id: 'tag-0000',
  editors: [MOCK_USER],
  owner: MOCK_USER,
  content: '香港',
  articles: [MOCK_ARTILCE],
}

// Transaction
export const MOCK_TRANSACTION = {
  __typename: 'Transaction' as any,
  id: 'tx-0000',
  amount: 100,
  currency: 'HKD',
  target: MOCK_ARTILCE,
}
