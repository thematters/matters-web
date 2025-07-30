import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import IconCircleMinus from '@/public/static/icons/24px/circle-minus.svg'
import IconNavCreate from '@/public/static/icons/24px/nav-create.svg'
import { Icon, Menu, Spinner, toast, useMutation } from '~/components'
import {
  FetchArticleSpamStatusQuery,
  ToggleSpamArticleMutation,
} from '~/gql/graphql'

const fragments = {
  article: gql`
    fragment ToggleSpamArticleArticle on Article {
      id
      oss {
        spamStatus {
          isSpam
        }
      }
    }
  `,
}

const TOGGLE_SPAM_ARTICLE = gql`
  mutation ToggleSpamArticle($articleId: ID!, $isSpam: Boolean!) {
    setSpamStatus(input: { id: $articleId, isSpam: $isSpam }) {
      id
      ...ToggleSpamArticleArticle
    }
  }
  ${fragments.article}
`

const FETCH_ARTICLE_SPAM_STATUS = gql`
  query FetchArticleSpamStatus($shortHash: String!) {
    article(input: { shortHash: $shortHash }) {
      ...ToggleSpamArticleArticle
    }
  }
  ${fragments.article}
`

const ToggleSpamArticle = ({ shortHash }: { shortHash: string }) => {
  const { data, loading } = useQuery<FetchArticleSpamStatusQuery>(
    FETCH_ARTICLE_SPAM_STATUS,
    {
      variables: {
        shortHash,
      },
    }
  )

  const isSpam = data?.article?.oss.spamStatus.isSpam
  const articleId = data?.article?.id

  const [update] = useMutation<ToggleSpamArticleMutation>(TOGGLE_SPAM_ARTICLE, {
    variables: {
      articleId,
      isSpam: !isSpam,
    },
  })

  if (loading) {
    return <Spinner />
  }

  return (
    <Menu.Item
      text={isSpam ? '取消標記 SPAM' : '標記 SPAM'}
      icon={<Icon icon={isSpam ? IconNavCreate : IconCircleMinus} size={20} />}
      onClick={async () => {
        await update()

        toast.success({
          message: isSpam ? '已取消標記 SPAM' : '已標記 SPAM',
        })
      }}
    />
  )
}

ToggleSpamArticle.fragments = fragments

export default ToggleSpamArticle
