import { DataProxy } from 'apollo-cache'

import { UserProfileUserPublicQuery } from '~/gql/graphql'

export const updateUserProfile = ({
  cache,
  userName,
  type,
}: {
  cache: DataProxy
  userName: string
  type:
    | 'increaseArticle'
    | 'decreaseArticle'
    | 'increaseMoment'
    | 'decreaseMoment'
    | 'increaseCollection'
    | 'decreaseCollection'
}) => {
  // FIXME: circular dependencies
  const { USER_PROFILE_PUBLIC } = require('~/views/User/UserProfile/gql')

  let profileData: UserProfileUserPublicQuery | null = null
  try {
    profileData = cache.readQuery<UserProfileUserPublicQuery>({
      query: USER_PROFILE_PUBLIC,
      variables: { userName },
    })
  } catch (e) {
    //
  }

  if (!profileData || !profileData.user || !profileData.user.status) {
    return
  }

  switch (type) {
    case 'increaseArticle':
      profileData.user.status.articleCount += 1
      break
    case 'decreaseArticle':
      profileData.user.status.articleCount -= 1
      break
    case 'increaseMoment':
      profileData.user.status.momentCount += 1
      break
    case 'decreaseMoment':
      profileData.user.status.momentCount -= 1
      break
    case 'increaseCollection':
      profileData.user.userCollections.totalCount += 1
      break
    case 'decreaseCollection':
      profileData.user.userCollections.totalCount -= 1
      break
  }

  cache.writeQuery({
    query: USER_PROFILE_PUBLIC,
    variables: { userName },
    data: {
      ...profileData,
    },
  })

  return {
    articleCount: profileData.user.status.articleCount,
    momentCount: profileData.user.status.momentCount,
    collectionCount: profileData.user.userCollections.totalCount,
  }
}
