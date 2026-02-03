import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import IconWarn from '@/public/static/icons/24px/warn.svg'
import { Icon, Menu, Spinner } from '~/components'
import { UserFreezeAdminQuery } from '~/gql/graphql'

import { OpenToggleFreezeUserDialogWithProps } from './Dialog'

type ToggleFreezeUserButtonProps = {
  id: string
  openDialog: (props: OpenToggleFreezeUserDialogWithProps) => void
}

export const fragments = {
  user: gql`
    fragment ToggleFreezeUser on User {
      id
      status {
        state
      }
    }
  `,
}

const USER_FREEZE_ADMIN = gql`
  query UserFreezeAdmin($id: ID!) {
    user: node(input: { id: $id }) {
      ... on User {
        id
        ...ToggleFreezeUser
      }
    }
  }
  ${fragments.user}
`

const ToggleFreezeUserButton: React.FC<ToggleFreezeUserButtonProps> = ({
  id,
  openDialog,
}) => {
  const { data, loading } = useQuery<UserFreezeAdminQuery>(USER_FREEZE_ADMIN, {
    variables: { id },
  })

  if (loading) {
    return <Menu.Item icon={<Spinner size={20} />} text="加載中…" />
  }

  if (data?.user?.__typename !== 'User') return null

  const user = data.user
  const isFrozen = user?.status?.state === 'frozen'

  return (
    <Menu.Item
      text={isFrozen ? '解除凍結' : '凍結用戶'}
      icon={<Icon icon={IconWarn} size={20} />}
      textColor={isFrozen ? 'greyDarker' : 'red'}
      textActiveColor={isFrozen ? 'black' : 'redDark'}
      onClick={() => {
        openDialog({ isFrozen })
      }}
      ariaHasPopup="dialog"
    />
  )
}

export default ToggleFreezeUserButton
