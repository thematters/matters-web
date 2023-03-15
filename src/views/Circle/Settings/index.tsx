import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Form, Head, Layout, Spacer, useRoute } from '~/components'

const Settings = () => {
  const { getQuery } = useRoute()
  const name = getQuery('name')

  return (
    <Layout.Main smBgColor="grey-lighter">
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={<Layout.Header.Title id="manageCircle" />}
      />

      <Head title={{ id: 'manageCircle' }} />

      <Form.List
        groupName={
          <FormattedMessage defaultMessage="Settings" description="" />
        }
      >
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
      </Form.List>

      <Form.List
        groupName={
          <FormattedMessage
            defaultMessage="Free Trial"
            description="src/views/Circle/Settings/index.tsx"
          />
        }
      >
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

      <Spacer size="xxxloose" />
    </Layout.Main>
  )
}

export default Settings
