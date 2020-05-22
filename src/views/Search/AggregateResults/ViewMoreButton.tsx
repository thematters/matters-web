import { Card, Icon, TextIcon, Translate } from '~/components'

import { toPath } from '~/common/utils'

interface ViewMoreButtonProps {
  q: string
  type: 'article' | 'tag' | 'user'
}

const ViewMoreButton = ({ q, type }: ViewMoreButtonProps) => {
  const text =
    type === 'tag' ? (
      <Translate zh_hant="更多話題搜索結果" zh_hans="更多话题搜索结果" />
    ) : type === 'user' ? (
      <Translate zh_hant="更多用戶搜索結果" zh_hans="更多用户搜索结果" />
    ) : (
      <Translate zh_hant="更多作品搜索結果" zh_hans="更多作品搜索结果" />
    )

  return (
    <Card
      spacing={['base', 'base']}
      {...toPath({
        page: 'search',
        type,
        q,
      })}
    >
      <TextIcon
        icon={<Icon.Right size="xs" />}
        textPlacement="left"
        color="green"
      >
        {text}
      </TextIcon>
    </Card>
  )
}

export default ViewMoreButton
