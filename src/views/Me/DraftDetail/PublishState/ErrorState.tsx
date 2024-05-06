import { FormattedMessage } from 'react-intl'

import { Layout, Translate } from '~/components'
import { PublishStateDraftFragment } from '~/gql/graphql'

import RetryButton from './RetryButton'

const ErrorState = ({ draft }: { draft: PublishStateDraftFragment }) => (
  <Layout.Notice
    color="red"
    content={
      <FormattedMessage
        defaultMessage="Failed to publish, please try again."
        id="zE51j6"
      />
    }
    subDescription={
      <Translate
        zh_hant="請檢查網絡後重試"
        zh_hans="请检查网络后重试"
        en="Please refresh the page and try again."
      />
    }
    customButton={<RetryButton id={draft.id} />}
  />
)

export default ErrorState
