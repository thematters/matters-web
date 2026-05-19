import { FormattedMessage, useIntl } from 'react-intl'

import { Head, Layout } from '~/components'

import InvitesFeed from './Invites'

const ManageInvitation = () => {
  const intl = useIntl()

  return (
    <Layout.Main>
      <Layout.Header
        right={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="Manage Invitation" id="5jlQTx" />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Manage Invitation',
          id: '5jlQTx',
        })}
      />

      <InvitesFeed />
    </Layout.Main>
  )
}

export default ManageInvitation
