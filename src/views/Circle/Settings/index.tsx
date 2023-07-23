import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Form, Head, Layout, useRoute } from '~/components'

const BaseSettings = () => {
  const { getQuery } = useRoute()
  const name = getQuery('name')

  return (
    <Form.List spacingX={0}>
      <Form.List.Item
        title={
          <FormattedMessage
            defaultMessage="Profile"
            description="src/views/Circle/Settings/index.tsx"
          />
        }
        {...toPath({ page: 'circleEditProfile', circle: { name } })}
        role="link"
      />

      <Form.List.Item
        title={
          <FormattedMessage
            defaultMessage="Manage Invitation"
            description="src/views/Circle/Settings/index.tsx"
          />
        }
        {...toPath({ page: 'circleManageInvitation', circle: { name } })}
        role="link"
      />
    </Form.List>
  )
}

const Settings = () => {
  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.Title id="manageCircle" />} />

      <Head title={{ id: 'manageCircle' }} />

      <Layout.Main.Spacing hasVertical={false}>
        <BaseSettings />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default Settings
