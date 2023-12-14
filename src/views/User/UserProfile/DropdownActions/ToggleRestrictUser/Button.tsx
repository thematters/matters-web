import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { IconEnter20, IconSpinner22, Menu } from '~/components'
import { UserRestrictionsAdminQuery } from '~/gql/graphql'

import { OpenToggleRestrictUserDialogWithProps } from './Dialog'

type ToggleRestrictUserButtonProps = {
  id: string
  openDialog: (props: OpenToggleRestrictUserDialogWithProps) => void
}

export const fragments = {
  user: gql`
    fragment ToggleRestrictUser on User {
      id
      oss {
        restrictions {
          type
        }
      }
    }
  `,
}

const USER_RESTRICTIONS_ADMIN = gql`
  query UserRestrictionsAdmin($id: ID!) {
    user: node(input: { id: $id }) {
      ... on User {
        id
        ...ToggleRestrictUser
      }
    }
  }
  ${fragments.user}
`

const ToggleRestrictUserButton: React.FC<ToggleRestrictUserButtonProps> = ({
  id,
  openDialog,
}) => {
  const { data, loading } = useQuery<UserRestrictionsAdminQuery>(
    USER_RESTRICTIONS_ADMIN,
    { variables: { id } }
  )

  if (loading) {
    return <Menu.Item icon={<IconSpinner22 size="mdS" />} text="正在加載中…" />
  }

  if (data?.user?.__typename !== 'User') return null

  const user = data.user
  const enabled =
    !!user.oss.restrictions.find((r) => r.type === 'articleNewest') &&
    !!user.oss.restrictions.find((r) => r.type === 'articleHottest')

  return (
    <Menu.Item
      text={enabled ? '放出小黑屋' : '關小黑屋'}
      icon={<IconEnter20 size="mdS" />}
      textColor={enabled ? 'greyDarker' : 'red'}
      textActiveColor={enabled ? 'black' : 'redDark'}
      onClick={() => {
        openDialog({ enabled })
      }}
      ariaHasPopup="dialog"
    />
  )
}

export default ToggleRestrictUserButton
