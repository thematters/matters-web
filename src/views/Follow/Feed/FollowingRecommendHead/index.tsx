import { PageHeader, Translate } from '~/components'

interface Props {
  type: 'article' | 'circle' | 'user' | 'recommend'
}

const RecommendHead = ({ type }: Props) => {
  const titleMap = {
    article: (
      <Translate
        zh_hant="你追蹤的人也支持了"
        zh_hans="你追踪的人也支持了"
        en="Followees also support"
      />
    ),
    circle: (
      <Translate
        zh_hant="你追蹤的人也加入了"
        zh_hans="你追踪的人也加入了"
        en="Followees also subscribe"
      />
    ),
    user: (
      <Translate
        zh_hant="你追蹤的人也關注了"
        zh_hans="你追踪的人也关注了"
        en="Followees also follow"
      />
    ),
    recommend: (
      <Translate zh_hant="推薦作品" zh_hans="推荐作品" en="Recommendation" />
    ),
  }

  return <PageHeader title={titleMap[type]} is="h2" hasNoBorder />
}

export default RecommendHead
