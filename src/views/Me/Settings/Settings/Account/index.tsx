import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'

import { PATHS } from '~/common/enums'
import { Form, Translate, ViewerContext } from '~/components'
import { ViewerTotalBlockCountQuery } from '~/gql/graphql'

import ChangeUserNameAsk from './ChangeUserNameAsk'

const VIEWER_TOTAL_BLOCK_COUNT = gql`
  query ViewerTotalBlockCount {
    viewer {
      id
      blockList(input: { first: 0 }) {
        totalCount
      }
    }
  }
`

const AccountSettings = () => {
  const viewer = useContext(ViewerContext)
  const { data } = useQuery<ViewerTotalBlockCountQuery>(
    VIEWER_TOTAL_BLOCK_COUNT,
    {
      errorPolicy: 'none',
    }
  )
  const totalBlockCount = data?.viewer?.blockList?.totalCount
  const userNameEditable = viewer.info.userNameEditable
  const userPasswordEditable = !viewer.info.isWalletAuth

  return (
    <Form.List groupName={<Translate id="settingsAccount" />}>
      <ChangeUserNameAsk>
        {({ openDialog }) => (
          <Form.List.Item
            title="Matters ID"
            onClick={userNameEditable ? openDialog : undefined}
            role="button"
            ariaHasPopup="dialog"
            rightText={viewer.userName}
          />
        )}
      </ChangeUserNameAsk>

      <Form.List.Item
        role="link"
        title={<Translate id="email" />}
        href={PATHS.ME_SETTINGS_CHANGE_EMAIL}
        rightText={viewer.info.email}
      />
      {userPasswordEditable && (
        <Form.List.Item
          role="link"
          title={<Translate id="loginPassword" />}
          href={PATHS.ME_SETTINGS_CHANGE_PASSWORD}
        />
      )}
      <Form.List.Item
        role="link"
        title={<Translate id="settingsNotification" />}
        href={PATHS.ME_SETTINGS_NOTIFICATION}
      />
      <Form.List.Item
        role="link"
        title={<Translate id="settingsBlock" />}
        href={PATHS.ME_SETTINGS_BLOCKED}
        rightText={totalBlockCount}
      />
    </Form.List>
  )
}

export default AccountSettings
