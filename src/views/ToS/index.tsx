import { FormattedMessage, useIntl } from 'react-intl'

import { Head, Layout } from '~/components'

import { Term } from './Term'

const ToS = () => {
  const intl = useIntl()

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage
              defaultMessage="Terms and Privacy Policy"
              id="LphWYP"
            />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Terms and Privacy Policy',
          id: 'LphWYP',
        })}
      />

      <Layout.Main.Spacing>
        <Term />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default ToS
