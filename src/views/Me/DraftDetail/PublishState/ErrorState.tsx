import { Toast, Translate } from '~/components'
import RetryButton from '~/components/DraftDigest/Components/RetryButton'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

import { PublishStateDraft } from '~/components/GQL/fragments/__generated__/PublishStateDraft'

const ErrorState = ({ draft }: { draft: PublishStateDraft }) => {
  analytics.trackEvent(ANALYTICS_EVENTS.PUBLISH_ERROR, { entrance: draft.id })
  return (
    <Toast.Instance
      color="red"
      content={
        <Translate
          zh_hant={TEXT.zh_hant.publishFailed}
          zh_hans={TEXT.zh_hans.publishFailed}
        />
      }
      subDescription={
        <Translate zh_hant="請檢查網絡後重試" zh_hans="请检查网络后重试" />
      }
      customButton={<RetryButton id={draft.id} />}
      buttonPlacement="top"
    />
  )
}

export default ErrorState
