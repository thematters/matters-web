import gql from 'graphql-tag'

import { ArticleDigestNoticeCard } from '~/components/ArticleDigest'
import { NoticeArticleCardFragment } from '~/gql/graphql'

const ArticleCard = ({
  article,
  color,
  hasIcon,
  hasBorder,
}: {
  article: NoticeArticleCardFragment | null
  color?: string
  hasIcon?: boolean
  hasBorder?: boolean
}) => {
  if (!article) {
    return null
  }

  return (
    <ArticleDigestNoticeCard
      article={article}
      color={color}
      hasIcon={hasIcon}
      hasBorder={hasBorder}
    />
  )
}

ArticleCard.fragments = {
  article: gql`
    fragment ArticleCardArticle on Article {
      id
      ...ArticleDigestNoticeCardArticle
    }
    ${ArticleDigestNoticeCard.fragments.article}
  `,
}

export default ArticleCard
