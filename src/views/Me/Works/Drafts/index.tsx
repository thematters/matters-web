import { FormattedMessage, useIntl } from 'react-intl'

import { Head, Layout } from '~/components'

import WorksTabs from '../WorksTabs'

const MeWorksDrafts = () => {
  const init = useIntl()
  const title = init.formatMessage({
    defaultMessage: 'My Works - Drafts',
    description: 'src/views/Me/Works/Drafts/index.tsx',
    id: 'tDqnVf',
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

export default MeWorksDrafts
