import { useIntl } from 'react-intl'

import { Head, Layout } from '~/components'

import HistoryTabs from '../HistoryTabs'
import BaseUserComments from './UserComments'

const UserComments = () => {
  const intl = useIntl()
  const title = intl.formatMessage({
    defaultMessage: 'History',
    description: '',
  })

  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.Title>{title}</Layout.Header.Title>}
      />

      <Head title={title} />

      <HistoryTabs />

      <BaseUserComments />
    </Layout.Main>
  )
}

export default UserComments
