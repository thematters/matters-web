import gql from 'graphql-tag'

import { AvatarUploader } from '~/components'
import { useMutation } from '~/components/GQL'

import { UpdateUserInfoAvatar } from './__generated__/UpdateUserInfoAvatar'

interface ProfileAvatarUploaderProps {
  user?: {
    __typename: 'User'
    avatar: any | null
  }
}

const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfoAvatar($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      avatar
    }
  }
`

export const ProfileAvatarUploader: React.FC<ProfileAvatarUploaderProps> = ({
  user
}) => {
  const [update] = useMutation<UpdateUserInfoAvatar>(UPDATE_USER_INFO)

  return (
    <AvatarUploader
      user={user}
      onUpload={assetId => {
        update({ variables: { input: { avatar: assetId } } })
      }}
    />
  )
}

export default ProfileAvatarUploader
