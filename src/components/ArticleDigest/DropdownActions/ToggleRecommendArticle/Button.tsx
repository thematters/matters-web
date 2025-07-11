import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import IconLTime from '@/public/static/icons/24px/l-time.svg'
import IconReset from '@/public/static/icons/24px/reset.svg'
import { Icon, Menu, Spinner } from '~/components'
import { ArticleRecommendAdminQuery } from '~/gql/graphql'

import { OpenToggleRecommendArticleDialogWithProps } from './Dialog'

type RecommendArticleButtonProps = {
  id: string
  type: 'icymi'
  openDialog: (props: OpenToggleRecommendArticleDialogWithProps) => void
}

export const fragments = {
  article: gql`
    fragment ToggleRecommendArticleArticle on Article {
      id
      title
      oss {
        inRecommendIcymi
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
  const enabled = type === 'icymi' ? article.oss.inRecommendIcymi : false

  const texts = {
    icymi: ['設為首頁精選', '移出首頁精選'],
  }
  const icons = {
    icymi: [IconReset, IconLTime],
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
