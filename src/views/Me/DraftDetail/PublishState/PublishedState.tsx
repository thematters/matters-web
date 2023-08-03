import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { toPath } from '~/common/utils'
import { Dialog, ShareDialog, Translate } from '~/components'
import { PublishStateDraftFragment } from '~/gql/graphql'

const BasePublishedState = ({
  openShareDialog,
}: {
  openShareDialog: () => void
}) => {
  useEffect(() => {
    openShareDialog()
  }, [])

  return null
}

const PublishedState = ({ draft }: { draft: PublishStateDraftFragment }) => {
  const router = useRouter()

  if (!draft.article) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    article: draft.article,
  })

  return (
    <ShareDialog
      disableNativeShare
      title={draft.article.title}
      path={encodeURI(path.href)}
      description={
        <>
          <p>
            <Translate
              zh_hant="作品發布成功，快把作品分享到不同渠道，"
              zh_hans="作品发布成功，快把作品分享到不同渠道，"
              en="Article successfully published."
            />
          </p>
          <p>
            <Translate
              zh_hant="吸引更多人為你拍手！"
              zh_hans="吸引更多人为你拍手！"
              en="Share it on different platforms to receive more likes and donations!"
            />
          </p>
        </>
      }
      headerTitle={
        <Translate
          zh_hant="作品已發布"
          zh_hans="作品已发布"
          en="Article published"
        />
      }
      btns={
        <Dialog.RoundedButton
          text={
            <Translate
              zh_hant="查看作品"
              zh_hans="查看作品"
              en="View article"
            />
          }
          onClick={() => router.replace(path.href)}
        />
      }
      smUpBtns={
        <Dialog.TextButton
          text={
            <Translate
              zh_hant="查看作品"
              zh_hans="查看作品"
              en="View article"
            />
          }
          onClick={() => router.replace(path.href)}
        />
      }
    >
      {({ openDialog }) => <BasePublishedState openShareDialog={openDialog} />}
    </ShareDialog>
  )
}

export default PublishedState
