import { FormattedMessage, useIntl } from 'react-intl'

import { Form, Head, Layout, Spacer } from '~/components'

import SettingsTabs from '../SettingsTabs'
import styles from '../styles.module.css'
import BlockedUsers from './BlockedUsers'
import Currency from './Currency'
import Language from './Language'
import LikerID from './LikerID'

const SettingsMisc = () => {
  const intl = useIntl()
  const title = intl.formatMessage({
    defaultMessage: 'Settings - Misc',
    description: 'src/views/Me/Settings/Misc/index.tsx',
  })

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage
              defaultMessage="Settings"
              description="src/views/Me/Settings/Misc/index.tsx"
            />
          </Layout.Header.Title>
        }
      />

      <Head title={title} />

      <SettingsTabs />

      <section className={styles.container}>
        <Form.List spacingX={0}>
          <Language />
          <Currency />
          <BlockedUsers />
          <LikerID />
        </Form.List>
      </section>

      <Spacer size="xloose" />
    </Layout.Main>
  )
}

export default SettingsMisc
