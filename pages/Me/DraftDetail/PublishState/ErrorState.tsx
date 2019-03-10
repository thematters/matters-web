import { Translate } from '~/components'
import RetryButton from '~/components/DraftDigest/Components/RetryButton'
import { Toast } from '~/components/Toast'

import { PublishStateDraft } from './__generated__/PublishStateDraft'

const ErrorState = ({ draft }: { draft: PublishStateDraft }) => {
  return (
    <Toast
      color="red"
      header={<Translate zh_hant="發布失敗" zh_hans="发布失败" />}
      content={
        <Translate zh_hant="請檢查網絡後重試。" zh_hans="请检查网络后重试。" />
      }
      customButton={<RetryButton id={draft.id} />}
      buttonPlacement="bottom"
    />
  )
}

export default ErrorState
