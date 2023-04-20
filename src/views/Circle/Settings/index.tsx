import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Form, Head, Layout, Media, Spacer, useRoute } from '~/components'

const BaseSettings = ({ spacingX }: { spacingX: 0 | 'base' }) => {
  const { getQuery } = useRoute()
  const name = getQuery('name')

  return (
    <>
      <Form.List
        groupName={
          <FormattedMessage defaultMessage="Settings" description="" />
        }
        spacingX={spacingX}
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
        spacingX={spacingX}
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
    </>
  )
}

const Settings = () => {
  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.Title id="manageCircle" />} />

      <Head title={{ id: 'manageCircle' }} />
      <Media at="sm">
        <BaseSettings spacingX="base" />
      </Media>
      <Media greaterThan="sm">
        <BaseSettings spacingX={0} />
      </Media>
    </Layout.Main>
  )
}

export default Settings
