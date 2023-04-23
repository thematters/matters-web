import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Form, Head, Layout, Spacer, useRoute } from '~/components'

import styles from './styles.css'

const BaseSettings = () => {
  const { getQuery } = useRoute()
  const name = getQuery('name')

  return (
    <section className="container">
      <Form.List
        groupName={
          <FormattedMessage defaultMessage="Settings" description="" />
        }
        spacingX={0}
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
        spacingX={0}
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
      <style jsx>{styles}</style>
    </section>
  )
}

const Settings = () => {
  return (
    <Layout.Main>
      <Layout.Header left={<Layout.Header.Title id="manageCircle" />} />

      <Head title={{ id: 'manageCircle' }} />
      <BaseSettings />
    </Layout.Main>
  )
}

export default Settings
