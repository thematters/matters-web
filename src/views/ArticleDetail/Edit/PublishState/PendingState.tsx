import { FormattedMessage } from 'react-intl'

import { Layout } from '~/components'

const PendingState = () => {
  return (
    <Layout.Notice
      color="green"
      content={<FormattedMessage defaultMessage="Publishing..." id="PesLat" />}
      subDescription={
        <FormattedMessage
          defaultMessage="After publication, your work cannot be deleted."
          id="HYW0fI"
        />
      }
    />
  )
}

export default PendingState
