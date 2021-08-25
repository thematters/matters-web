import { Translate } from '~/components'

import { ADD_TOAST } from '~/common/enums'

import AppreciateButton from './AppreciateButton'

const BlockedButton = ({ count, total }: { count?: number; total: number }) => (
  <AppreciateButton
    count={count}
    total={total}
    onClick={() => {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: (
              <Translate
                zh_hant="因为作者设置，你無法讚賞此文章。"
                zh_hans="因为作者设置，你无法赞赏此文章。"
                en="Sorry, the author does not allow you to appreciate this article.'"
              />
            ),
          },
        })
      )
    }}
  />
)

export default BlockedButton
