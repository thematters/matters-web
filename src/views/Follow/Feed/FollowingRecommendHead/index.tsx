import { PageHeader, Translate } from '~/components'

interface Props {
  type: 'article' | 'circle' | 'user' | 'recommend'
}

const RecommendHead = ({ type }: Props) => {
  const titleMap = {
    article: (
      <Translate
        zh_hant="你追蹤的人支持了"
        zh_hans="你关注的人支持了"
        en="People you follow also support"
      />
    ),
    circle: (
      <Translate
        zh_hant="你追蹤的人加入了"
        zh_hans="你关注的人加入了"
        en="People you follow also subscribe to"
      />
    ),
    user: (
      <Translate
        zh_hant="你追蹤的人追蹤了"
        zh_hans="你关注的人关注了"
        en="People you follow also follow"
      />
    ),
    recommend: (
      <Translate zh_hant="推薦作品" zh_hans="推荐作品" en="Recommendation" />
    ),
  }

  return (
    <PageHeader
      title={titleMap[type]}
      is="h2"
      hasBorder={false}
      type="base"
      spacingBottom={16}
    />
  )
}

export default RecommendHead
