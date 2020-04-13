import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext } from 'react'

import { Form, Translate, ViewerContext } from '~/components'

import { PATHS } from '~/common/enums'

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
  const { data } = useQuery<ViewerTotalBlockCount>(VIEWER_TOTAL_BLOCK_COUNT, {
    errorPolicy: 'none',
  })
  const totalBlockCount = data?.viewer?.blockList?.totalCount

  return (
    <Form.List groupName={<Translate id="settingsAccount" />}>
      <Form.List.Item
        title="Matters ID"
        {...PATHS.ME_SETTINGS_CHANGE_USERNAME}
        rightText={viewer.userName}
      />
      <Form.List.Item
        title={<Translate id="email" />}
        {...PATHS.ME_SETTINGS_CHANGE_EMAIL}
        rightText={viewer.info.email}
      />
      <Form.List.Item
        title={<Translate id="loginPassword" />}
        {...PATHS.ME_SETTINGS_CHANGE_PASSWORD}
      />
      <Form.List.Item
        title={<Translate id="settingsNotification" />}
        {...PATHS.ME_SETTINGS_NOTIFICATION}
      />
      <Form.List.Item
        title={<Translate id="settingsBlock" />}
        {...PATHS.ME_SETTINGS_BLOCKED}
        rightText={totalBlockCount}
      />
    </Form.List>
  )
}

export default AccountSettings
