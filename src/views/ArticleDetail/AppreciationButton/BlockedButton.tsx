import { toast, Translate } from '~/components'

import AppreciateButton from './AppreciateButton'

const BlockedButton = ({ count, total }: { count?: number; total: number }) => (
  <AppreciateButton
    count={count}
    total={total}
    onClick={() => {
      toast.error({
        message: (
          <Translate
            zh_hant="因为作者设置，你無法讚賞此文章。"
            zh_hans="因为作者设置，你无法赞赏此文章。"
            en="Sorry, the author has disabled likes for this article.'"
          />
        ),
      })
    }}
  />
)

export default BlockedButton
