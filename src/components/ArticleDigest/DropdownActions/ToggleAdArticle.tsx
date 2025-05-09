import gql from 'graphql-tag'

import { ReactComponent as IconPin } from '@/public/static/icons/24px/pin.svg'
import { ReactComponent as IconUnpin } from '@/public/static/icons/24px/unpin.svg'
import { Icon, Menu, toast, useMutation } from '~/components'
import { ToggleAdArticleMutation } from '~/gql/graphql'

const fragments = {
  article: gql`
    fragment ToggleAdArticleArticle on Article {
      id
      oss {
        adStatus {
          isAd
        }
      }
    }
  `,
}

const TOGGLE_AD_ARTICLE = gql`
  mutation toggleAdArticle($articleId: ID!, $isAd: Boolean!) {
    setAdStatus(input: { id: $articleId, isAd: $isAd }) {
      id
      ...ToggleAdArticleArticle
    }
  }
  ${fragments.article}
`

const ToggleAdArticle = ({
  articleId,
  isAd,
}: {
  articleId: string
  isAd: boolean
}) => {
  const [update] = useMutation<ToggleAdArticleMutation>(TOGGLE_AD_ARTICLE, {
    variables: {
      articleId,
      isAd: !isAd,
    },
  })

  return (
    <Menu.Item
      text={isAd ? '取消廣告' : '標記為廣告'}
      icon={<Icon icon={isAd ? IconUnpin : IconPin} size={20} />}
      onClick={async () => {
        await update()

        toast.success({
          message: isAd ? '已取消標記為廣告' : '已標記為廣告',
        })
      }}
    />
  )
}

ToggleAdArticle.fragments = fragments

export default ToggleAdArticle
