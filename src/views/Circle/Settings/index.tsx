import { useRouter } from 'next/router'

import { Form, Head, Layout, Spacer, Translate } from '~/components'

import { getQuery, toPath } from '~/common/utils'

const Settings = () => {
  const router = useRouter()
  const name = getQuery({ router, key: 'name' })

  return (
    <Layout.Main bgColor="grey-lighter">
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="settings" />}
      />

      <Head title={{ id: 'settings' }} />

      <Form.List groupName={<Translate id="settingsAccount" />}>
        <Form.List.Item
          title={<Translate id="basicProfile" />}
          {...toPath({ page: 'circleEditProfile', circle: { name } })}
        />
      </Form.List>

      <Spacer size="xxxloose" />
    </Layout.Main>
  )
}

export default Settings
