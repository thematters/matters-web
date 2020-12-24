export const PLACEHOLDER_USER = {
  __typename: 'User' as any,
  id: '0000',
  userName: 'matty',
  displayName: 'Matty',
  status: {
    __typename: 'UserStatus' as any,
    state: 'active' as any,
  },
  avatar: null,
  info: {
    __typename: 'UserInfo' as any,
    description: 'Matters 唯一官方帳號',
  },
  liker: {
    __typename: 'Liker' as any,
    civicLiker: false,
  },
}
