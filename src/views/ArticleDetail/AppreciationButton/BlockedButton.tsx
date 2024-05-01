import { ButtonProps, toast, Translate } from '~/components'

import AppreciateButton from './AppreciateButton'

const BlockedButton = ({
  count,
  total,
  iconSize = 20,
  textWeight = 'medium',
  textIconSpacing = 8,
  ...buttonProps
}: {
  count?: number
  total: number
  iconSize?: 20 | 24
  textWeight?: 'medium' | 'normal'
  textIconSpacing?: 4 | 6 | 8
} & ButtonProps) => (
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
    iconSize={iconSize}
    textWeight={textWeight}
    textIconSpacing={textIconSpacing}
    {...buttonProps}
  />
)

export default BlockedButton
