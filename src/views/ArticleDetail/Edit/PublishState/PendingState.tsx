import { useIntl } from 'react-intl'

import { Layout } from '~/components'

const PendingState = () => {
  const intl = useIntl()

  return (
    <Layout.Notice
      color="green"
      content={intl.formatMessage({
        defaultMessage: 'Publishing...',
        id: 'PesLat',
      })}
      subDescription={intl.formatMessage({
        defaultMessage: 'After publication, your work cannot be deleted.',
        id: 'HYW0fI',
      })}
    />
  )
}

export default PendingState
