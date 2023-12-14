import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  IconCircleMinus20,
  IconNavCreate32,
  IconReset20,
  IconSpinner22,
  IconUnPin24,
  Menu,
} from '~/components'
import { ArticleRecommendAdminQuery } from '~/gql/graphql'

import { OpenToggleRecommendArticleDialogWithProps } from './Dialog'

type RecommendArticleButtonProps = {
  id: string
  type: 'icymi' | 'hottestAndNewest'
  openDialog: (props: OpenToggleRecommendArticleDialogWithProps) => void
}

export const fragments = {
  article: gql`
    fragment ToggleRecommendArticleArticle on Article {
      id
      title
      oss {
        inRecommendHottest
        inRecommendIcymi
        inRecommendNewest
      }
    }
  `,
}

const ARTICLE_RECOMMEND_ADMIN = gql`
  query ArticleRecommendAdmin($id: ID!) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        ...ToggleRecommendArticleArticle
      }
    }
  }
  ${fragments.article}
`

const RecommendArticleButton: React.FC<RecommendArticleButtonProps> = ({
  id,
  type,
  openDialog,
}) => {
  const { data, loading } = useQuery<ArticleRecommendAdminQuery>(
    ARTICLE_RECOMMEND_ADMIN,
    { variables: { id } }
  )

  if (loading) {
    return <Menu.Item icon={<IconSpinner22 size="mdS" />} text="正在加載中…" />
  }

  if (data?.article?.__typename !== 'Article') return null

  const article = data?.article
  const enabled =
    type === 'icymi'
      ? article.oss.inRecommendIcymi
      : article.oss.inRecommendHottest && article.oss.inRecommendNewest

  const texts = {
    icymi: ['選為精華', '撤銷精華'],
    hottestAndNewest: ['撤銷移出', '移出熱門與最新'],
  }
  const icons = {
    icymi: [IconNavCreate32, IconCircleMinus20],
    hottestAndNewest: [IconReset20, IconUnPin24],
  }
  const IconComp = icons[type][+enabled]

  return (
    <Menu.Item
      text={texts[type][+enabled]}
      icon={<IconComp size="mdS" />}
      onClick={() => {
        openDialog({ type, enabled })
      }}
      ariaHasPopup="dialog"
    />
  )
}

export default RecommendArticleButton
