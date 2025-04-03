import { FormattedMessage, useIntl } from 'react-intl'

import { Head, Layout } from '~/components'

import BaseSettingsBlocked from './SettingsBlocked'

const SettingsBlocked = () => {
  const intl = useIntl()

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage
              defaultMessage="Blocked Users"
              id="YUXRsM"
              description="src/views/Me/Settings/Blocked/index.tsx"
            />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Settings',
          id: 'D3idYv',
        })}
      />

      <Layout.Main.Spacing hasVertical={false}>
        <BaseSettingsBlocked />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default SettingsBlocked
