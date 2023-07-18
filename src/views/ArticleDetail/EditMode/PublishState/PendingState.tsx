import { useQuery } from '@apollo/react-hooks'
import { useEffect } from 'react'

import { Layout, Translate } from '~/components'
import { EditModeArticleNewestPublishDraftQuery } from '~/gql/graphql'

import EDIT_MODE_ARTICLE_NEWEST_PUBLISH_DRAFT from './gql'

const PendingState = ({
  articleMediaHash,
  updatePublishState,
  id,
}: {
  articleMediaHash: string
  updatePublishState: (mediaHash: string) => void
  id: string
}) => {
  const { data, startPolling, stopPolling, refetch } =
    useQuery<EditModeArticleNewestPublishDraftQuery>(
      EDIT_MODE_ARTICLE_NEWEST_PUBLISH_DRAFT,
      {
        variables: { id },
        errorPolicy: 'none',
        fetchPolicy: 'network-only',
        skip: typeof window === 'undefined',
      }
    )

  useEffect(() => {
    startPolling(1000 * 2)

    refetch && refetch()

    return () => {
      stopPolling()
    }
  }, [])

  if (
    data?.article?.__typename === 'Article' &&
    data.article.newestPublishedDraft.publishState === 'published' &&
    data.article.newestPublishedDraft.mediaHash !== articleMediaHash
  ) {
    stopPolling()
    updatePublishState(data.article.newestPublishedDraft.mediaHash || '')
  }

  return (
    <Layout.Notice
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
