import React from 'react'

import { Form, Head, Layout } from '~/components'

import Email from './Email'
import MattersID from './MattersID'
import MyProfile from './MyProfile'
import Password from './Password'
import SettingsTabs from './SettingsTabs'

const Settings = () => {
  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.Title id="settings" />} />

      <Head title={{ id: 'settings' }} />

      <SettingsTabs />

      <Form.List>
        <MattersID />
        <MyProfile />
        <Email />
        <Password />
      </Form.List>

      {/* Wallet */}
      {/* Socail Login */}
    </Layout.Main>
  )
}

export default Settings
