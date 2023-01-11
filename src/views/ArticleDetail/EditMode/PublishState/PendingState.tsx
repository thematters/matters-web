import { useQuery } from '@apollo/react-hooks'
import { useEffect } from 'react'

import { Toast, Translate } from '~/components'
import { EditModeArticleDraftsQuery, EditModeArticleQuery } from '~/gql/graphql'

import EDIT_MODE_ARTICLE_DRAFTS from './gql'

const PendingState = ({
  draft,
  id,
}: {
  draft: NonNullable<
    NonNullable<
      EditModeArticleQuery['article'] & { __typename: 'Article' }
    >['drafts']
  >[0]
  id: string
}) => {
  const { startPolling, stopPolling } = useQuery<EditModeArticleDraftsQuery>(
    EDIT_MODE_ARTICLE_DRAFTS,
    {
      variables: { id },
      errorPolicy: 'none',
      fetchPolicy: 'network-only',
      skip: typeof window === 'undefined',
    }
  )

  useEffect(() => {
    startPolling(1000 * 2)

    return () => {
      stopPolling()
    }
  }, [])

  return (
    <Toast.Instance
      color="green"
      content={<Translate id="publishing" />}
      subDescription={
        <Translate
          zh_hant="上鏈後，作品不可刪除，去中心化保存"
          zh_hans="上链后，作品不可删除，去中心化保存"
          en="After publication, your work cannot be deleted."
        />
      }
    />
  )
}

export default PendingState
