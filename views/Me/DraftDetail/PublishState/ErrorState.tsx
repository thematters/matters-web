import { Translate } from '~/components'
import RetryButton from '~/components/DraftDigest/Components/RetryButton'
import { PublishStateDraft } from '~/components/GQL/fragments/__generated__/PublishStateDraft'
import { Toast } from '~/components/Toast'

import { TEXT } from '~/common/enums'

const ErrorState = ({ draft }: { draft: PublishStateDraft }) => {
  return (
    <Toast
      color="red"
      header={
        <Translate
          zh_hant={TEXT.zh_hant.publishFailed}
          zh_hans={TEXT.zh_hans.publishFailed}
        />
      }
      content={
        <Translate zh_hant="請檢查網絡後重試。" zh_hans="请检查网络后重试。" />
      }
      customButton={<RetryButton id={draft.id} />}
      buttonPlacement="bottom"
    />
  )
}

export default ErrorState
