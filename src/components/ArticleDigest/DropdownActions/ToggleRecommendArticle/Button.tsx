import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import { ReactComponent as IconCircleMinus } from '@/public/static/icons/24px/circle-minus.svg'
import { ReactComponent as IconLTime } from '@/public/static/icons/24px/l-time.svg'
import { ReactComponent as IconNavCreate } from '@/public/static/icons/24px/nav-create.svg'
import { ReactComponent as IconReset } from '@/public/static/icons/24px/reset.svg'
import { Icon, Menu, Spinner } from '~/components'
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
    return <Menu.Item icon={<Spinner size={20} />} text="加載中…" />
  }

  if (data?.article?.__typename !== 'Article') return null

  const article = data?.article
  const enabled =
    type === 'icymi'
      ? article.oss.inRecommendIcymi
      : article.oss.inRecommendHottest && article.oss.inRecommendNewest

  const texts = {
    icymi: ['設為首頁精選', '撤銷首頁精選'],
    hottestAndNewest: ['撤銷移出', '移出熱門與最新'],
  }
  const icons = {
    icymi: [IconNavCreate, IconCircleMinus],
    hottestAndNewest: [IconReset, IconLTime],
  }

  return (
    <Menu.Item
      text={texts[type][+enabled]}
      icon={<Icon icon={icons[type][+enabled]} size={20} />}
      onClick={() => {
        openDialog({ type, enabled })
      }}
      ariaHasPopup="dialog"
    />
  )
}

export default RecommendArticleButton
