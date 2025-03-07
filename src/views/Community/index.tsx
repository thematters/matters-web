import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { captureClicks } from '~/common/utils'
import { Head, LanguageContext, Layout } from '~/components'

import content from './content'

const Community = () => {
  const intl = useIntl()
  const { lang } = useContext(LanguageContext)

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="Matters Community" id="FhWC22" />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Matters Community',
          id: 'FhWC22',
        })}
      />

      <Layout.Main.Spacing>
        <section
          dangerouslySetInnerHTML={{
            __html: content[lang],
          }}
          className="u-content-article"
          onClick={captureClicks}
        />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default Community
