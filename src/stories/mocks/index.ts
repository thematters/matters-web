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
  displayName: 'Matters 自由課（第一季）',
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
