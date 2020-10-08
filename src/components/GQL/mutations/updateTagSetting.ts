import gql from 'graphql-tag'

import { Avatar } from '~/components/Avatar'

import Tag from '../fragments/tag'

export default gql`
  mutation UpdateTagSetting($input: UpdateTagSettingInput!) {
    updateTagSetting(input: $input) {
      id
      editors {
        id
        ...AvatarUser
      }
      owner {
        id
        userName
        displayName
        status {
          state
        }
        ...AvatarUser
      }
      ...FollowersTag
    }
  }
  ${Avatar.fragments.user}
  ${Tag.followers}
`
