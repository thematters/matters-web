import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import IconPin from '@/public/static/icons/24px/pin.svg'
import IconUnpin from '@/public/static/icons/24px/unpin.svg'
import { Icon, Menu, Spinner, toast, useMutation } from '~/components'
import {
  FetchArticleAdStatusQuery,
  ToggleAdArticleMutation,
} from '~/gql/graphql'

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
  mutation ToggleAdArticle($articleId: ID!, $isAd: Boolean!) {
    setAdStatus(input: { id: $articleId, isAd: $isAd }) {
      id
      ...ToggleAdArticleArticle
    }
  }
  ${fragments.article}
`

const FETCH_ARTICLE_AD_STATUS = gql`
  query FetchArticleAdStatus($shortHash: String!) {
    article(input: { shortHash: $shortHash }) {
      ...ToggleAdArticleArticle
    }
  }
  ${fragments.article}
`

const ToggleAdArticle = ({ shortHash }: { shortHash: string }) => {
  const { data, loading } = useQuery<FetchArticleAdStatusQuery>(
    FETCH_ARTICLE_AD_STATUS,
    {
      variables: {
        shortHash,
      },
    }
  )

  const isAd = data?.article?.oss.adStatus.isAd
  const articleId = data?.article?.id

  const [update] = useMutation<ToggleAdArticleMutation>(TOGGLE_AD_ARTICLE, {
    variables: {
      articleId,
      isAd: !isAd,
    },
  })

  if (loading) {
    return <Spinner />
  }

  return (
    <Menu.Item
      text={isAd ? '取消廣告' : '標記廣告'}
      icon={<Icon icon={isAd ? IconUnpin : IconPin} size={20} />}
      onClick={async () => {
        await update()

        toast.success({
          message: isAd ? '已取消標記廣告' : '已標記廣告',
        })
      }}
    />
  )
}

ToggleAdArticle.fragments = fragments

export default ToggleAdArticle
