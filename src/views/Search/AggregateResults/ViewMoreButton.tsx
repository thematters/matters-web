import { Card, IconArrowRight16, TextIcon, Translate } from '~/components'

import { toPath } from '~/common/utils'

interface ViewMoreButtonProps {
  q: string
  type: 'article' | 'tag' | 'user'
}

const ViewMoreButton = ({ q, type }: ViewMoreButtonProps) => {
  const text =
    type === 'tag' ? (
      <Translate
        zh_hant="更多話題搜索結果"
        zh_hans="更多话题搜索结果"
        en="more results for tags"
      />
    ) : type === 'user' ? (
      <Translate
        zh_hant="更多用戶搜索結果"
        zh_hans="更多用户搜索结果"
        en="more results for users"
      />
    ) : (
      <Translate
        zh_hant="更多作品搜索結果"
        zh_hans="更多作品搜索结果"
        en="more results for works"
      />
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
        icon={<IconArrowRight16 size="xs" />}
        textPlacement="left"
        color="green"
      >
        {text}
      </TextIcon>
    </Card>
  )
}

export default ViewMoreButton
