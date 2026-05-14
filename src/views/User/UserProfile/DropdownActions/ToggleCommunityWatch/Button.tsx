import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import IconCommunityWatchBadge from '@/public/static/icons/24px/badge-community-watch.svg'
import { Icon, Menu, Spinner } from '~/components'
import {
  UserCommunityWatchAdminQuery,
  UserFeatureFlagType,
} from '~/gql/graphql'

import { OpenToggleCommunityWatchDialogWithProps } from './Dialog'

type ToggleCommunityWatchButtonProps = {
  id: string
  openDialog: (props: OpenToggleCommunityWatchDialogWithProps) => void
}

export const fragments = {
  user: gql`
    fragment ToggleCommunityWatchUser on User {
      id
      oss {
        featureFlags {
          type
        }
      }
    }
  `,
}

const USER_COMMUNITY_WATCH_ADMIN = gql`
  query UserCommunityWatchAdmin($id: ID!) {
    user: node(input: { id: $id }) {
      ... on User {
        id
        ...ToggleCommunityWatchUser
      }
    }
  }
  ${fragments.user}
`

const ToggleCommunityWatchButton = ({
  id,
  openDialog,
}: ToggleCommunityWatchButtonProps) => {
  const { data, loading } = useQuery<UserCommunityWatchAdminQuery>(
    USER_COMMUNITY_WATCH_ADMIN,
    { variables: { id } }
  )

  if (loading) {
    return <Menu.Item icon={<Spinner size={20} />} text="加載中…" />
  }

  if (data?.user?.__typename !== 'User') {
    return null
  }

  const flags = data.user.oss.featureFlags.map(({ type }) => type)
  const enabled = flags.includes(UserFeatureFlagType.CommunityWatch)

  return (
    <Menu.Item
      text={enabled ? '取消守望相助隊' : '指定為守望相助隊'}
      icon={<Icon icon={IconCommunityWatchBadge} size={20} />}
      textColor={enabled ? 'greyDarker' : 'black'}
      textActiveColor="black"
      onClick={() => openDialog({ enabled, flags })}
      ariaHasPopup="dialog"
    />
  )
}

export default ToggleCommunityWatchButton
