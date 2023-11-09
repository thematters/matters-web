import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Head, Layout, TableView, useRoute } from '~/components'

const BaseSettings = () => {
  const { getQuery } = useRoute()
  const name = getQuery('name')

  return (
    <TableView spacingX={0}>
      <TableView.Cell
        title={
          <FormattedMessage
            defaultMessage="Profile"
            id="ZAs170"
            description="src/views/Circle/Settings/index.tsx"
          />
        }
        {...toPath({ page: 'circleEditProfile', circle: { name } })}
        role="link"
      />

      <TableView.Cell
        title={
          <FormattedMessage
            defaultMessage="Manage Invitation"
            id="EQeKnO"
            description="src/views/Circle/Settings/index.tsx"
          />
        }
        {...toPath({ page: 'circleManageInvitation', circle: { name } })}
        role="link"
      />
    </TableView>
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
