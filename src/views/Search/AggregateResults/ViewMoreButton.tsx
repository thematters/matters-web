import { toPath } from '~/common/utils'
import { Translate, ViewMoreCard } from '~/components'

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
        en="more results for articles"
      />
    )

  return (
    <ViewMoreCard
      {...toPath({
        page: 'search',
        type,
        q,
      })}
    >
      {text}
    </ViewMoreCard>
  )
}

export default ViewMoreButton
