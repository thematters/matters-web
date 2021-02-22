import { Form, Head, Layout, Spacer, Translate, useRoute } from '~/components'

import { toPath } from '~/common/utils'

const Settings = () => {
  const { getQuery } = useRoute()
  const name = getQuery('name')

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
