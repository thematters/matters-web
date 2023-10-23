import { FormattedMessage, useIntl } from 'react-intl'

import { Head, Layout } from '~/components'

import WorksTabs from '../WorksTabs'

const MeWorksArchived = () => {
  const init = useIntl()
  const title = init.formatMessage({
    defaultMessage: 'My Works - Archived',
    description: 'src/views/Me/Works/Archived/index.tsx',
    id: 'YgZOAm',
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

export default MeWorksArchived
