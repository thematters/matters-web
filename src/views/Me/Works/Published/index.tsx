import { FormattedMessage, useIntl } from 'react-intl'

import { Head, Layout } from '~/components'

import WorksTabs from '../WorksTabs'

const MeWorksPublished = () => {
  const init = useIntl()
  const title = init.formatMessage({
    defaultMessage: 'My Works - Published',
    description: 'src/views/Me/Works/Published/index.tsx',
    id: 'yBCdku',
  })

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="My Works" id="ai7kS4" />
          </Layout.Header.Title>
        }
      />

      <Head title={title} />

      <WorksTabs />
    </Layout.Main>
  )
}

export default MeWorksPublished
