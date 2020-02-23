import { Toast, Translate } from '~/components'
import RetryButton from '~/components/DraftDigest/Components/RetryButton'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'

import { PublishStateDraft } from '~/components/GQL/fragments/__generated__/PublishStateDraft'

const ErrorState = ({ draft }: { draft: PublishStateDraft }) => {
  analytics.trackEvent(ANALYTICS_EVENTS.PUBLISH_ERROR, { entrance: draft.id })
  return (
    <Toast.Instance
      color="red"
      content={<Translate id="publishFailed" />}
      subDescription={
        <Translate zh_hant="請檢查網絡後重試" zh_hans="请检查网络后重试" />
      }
      customButton={<RetryButton id={draft.id} />}
    />
  )
}

export default ErrorState
