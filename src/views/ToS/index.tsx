import { FormattedMessage, useIntl } from 'react-intl'

import IMAGE_INTRO from '@/public/static/images/intro.jpg'
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
        image={IMAGE_INTRO.src}
      />

      <Layout.Main.Spacing>
        <Term />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default ToS
