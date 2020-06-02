import { Toast, Translate } from '~/components'

import RetryButton from './RetryButton'

import { PublishStateDraft } from '~/components/GQL/fragments/__generated__/PublishStateDraft'

const ErrorState = ({ draft }: { draft: PublishStateDraft }) => (
  <Toast.Instance
    color="red"
    content={<Translate id="failurePublish" />}
    subDescription={
      <Translate zh_hant="請檢查網絡後重試" zh_hans="请检查网络后重试" />
    }
    customButton={<RetryButton id={draft.id} />}
  />
)

export default ErrorState
