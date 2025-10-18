import { useQuery } from '@apollo/client'

import IconCircleMinus from '@/public/static/icons/24px/circle-minus.svg'
import IconNavCreate from '@/public/static/icons/24px/nav-create.svg'
import { Icon, Menu, Spinner, toast, useMutation } from '~/components'
import {
  FetchArticleSpamStatusQuery,
  FetchCommentSpamStatusQuery,
  FetchMomentSpamStatusQuery,
  ToggleSpamMutation,
  ToggleSpamMutationVariables,
} from '~/gql/graphql'

import {
  FETCH_ARTICLE_SPAM_STATUS,
  FETCH_COMMENT_SPAM_STATUS,
  FETCH_MOMENT_SPAM_STATUS,
  fragments,
  TOGGLE_SPAM,
} from './gql'

const ToggleSpam = (
  props:
    | { type: 'article'; shortHash: string }
    | { type: 'comment'; id: string }
    | { type: 'moment'; id: string }
) => {
  const { type } = props

  // Choose the appropriate query based on type
  const query = (() => {
    switch (type) {
      case 'article':
        return FETCH_ARTICLE_SPAM_STATUS
      case 'comment':
        return FETCH_COMMENT_SPAM_STATUS
      case 'moment':
        return FETCH_MOMENT_SPAM_STATUS
    }
  })()

  const variables = (() => {
    switch (type) {
      case 'article':
        return { shortHash: props.shortHash }
      case 'comment':
      case 'moment':
        return { id: props.id }
    }
  })()

  const { data, loading } = useQuery<
    | FetchArticleSpamStatusQuery
    | FetchCommentSpamStatusQuery
    | FetchMomentSpamStatusQuery
  >(query, {
    variables,
  })

  // Extract spam status and ID based on type
  const { isSpam, id } = (() => {
    switch (type) {
      case 'article': {
        const article = (data as FetchArticleSpamStatusQuery)?.article
        return {
          isSpam: article?.oss?.spamStatus?.isSpam,
          id: article?.id,
        }
      }
      case 'comment': {
        const node = (data as FetchCommentSpamStatusQuery)?.node
        if (node?.__typename === 'Comment') {
          return {
            isSpam: node.spamStatus?.isSpam,
            id: node.id,
          }
        }
        return { isSpam: undefined, id: undefined }
      }
      case 'moment': {
        const node = (data as FetchMomentSpamStatusQuery)?.node
        if (node?.__typename === 'Moment') {
          return {
            isSpam: node.spamStatus?.isSpam,
            id: node.id,
          }
        }
        return { isSpam: undefined, id: undefined }
      }
    }
  })()

  const [update] = useMutation<ToggleSpamMutation, ToggleSpamMutationVariables>(
    TOGGLE_SPAM,
    {
      variables: {
        id: id!,
        isSpam: !isSpam,
      },
    }
  )

  if (loading) {
    return <Spinner />
  }

  if (!id) {
    return null
  }

  return (
    <Menu.Item
      text={isSpam ? '取消標記 SPAM' : '標記 SPAM'}
      icon={<Icon icon={isSpam ? IconNavCreate : IconCircleMinus} size={20} />}
      onClick={async () => {
        try {
          await update()
          toast.success({
            message: isSpam ? '已取消標記 SPAM' : '已標記 SPAM',
          })
        } catch (error) {
          console.error(error)
          toast.error({
            message: '操作失敗，請稍後再試',
          })
        }
      }}
    />
  )
}

ToggleSpam.fragments = fragments

export default ToggleSpam
