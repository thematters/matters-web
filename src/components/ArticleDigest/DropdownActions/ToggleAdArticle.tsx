import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import { ReactComponent as IconCircleMinus } from '@/public/static/icons/24px/circle-minus.svg'
import { ReactComponent as IconCirclePlus } from '@/public/static/icons/24px/circle-plus.svg'
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
      text={isAd ? '取消標記 SPAM' : '標記 SPAM'}
      icon={<Icon icon={isAd ? IconCircleMinus : IconCirclePlus} size={20} />}
      onClick={async () => {
        await update()

        toast.success({
          message: isAd ? '已取消標記 SPAM' : '已標記 SPAM',
        })
      }}
    />
  )
}

ToggleAdArticle.fragments = fragments

export default ToggleAdArticle
