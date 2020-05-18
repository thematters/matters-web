import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'

import { Form, Translate, usePullToRefresh, ViewerContext } from '~/components'

import { PATHS } from '~/common/enums'

import ChangeUserNameAsk from './ChangeUserNameAsk'

import { ViewerTotalBlockCount } from './__generated__/ViewerTotalBlockCount'

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
  const { data, refetch } = useQuery<ViewerTotalBlockCount>(
    VIEWER_TOTAL_BLOCK_COUNT,
    {
      errorPolicy: 'none',
    }
  )
  const totalBlockCount = data?.viewer?.blockList?.totalCount
  const userNameEditable = viewer.info.userNameEditable

  usePullToRefresh({ onPull: refetch })

  return (
    <Form.List groupName={<Translate id="settingsAccount" />}>
      <ChangeUserNameAsk>
        {({ open }) => (
          <Form.List.Item
            title="Matters ID"
            onClick={userNameEditable ? open : undefined}
            rightText={viewer.userName}
          />
        )}
      </ChangeUserNameAsk>

      <Form.List.Item
        title={<Translate id="email" />}
        href={PATHS.ME_SETTINGS_CHANGE_EMAIL}
        rightText={viewer.info.email}
      />
      <Form.List.Item
        title={<Translate id="loginPassword" />}
        href={PATHS.ME_SETTINGS_CHANGE_PASSWORD}
      />
      <Form.List.Item
        title={<Translate id="settingsNotification" />}
        href={PATHS.ME_SETTINGS_NOTIFICATION}
      />
      <Form.List.Item
        title={<Translate id="settingsBlock" />}
        href={PATHS.ME_SETTINGS_BLOCKED}
        rightText={totalBlockCount}
      />
    </Form.List>
  )
}

export default AccountSettings
