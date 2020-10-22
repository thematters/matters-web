import { useEffect } from 'react'

import { Dialog, ShareDialog, Translate } from '~/components'

import { toPath } from '~/common/utils'

import { PublishStateDraft } from '~/components/GQL/fragments/__generated__/PublishStateDraft'

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

const PublishedState = ({ draft }: { draft: PublishStateDraft }) => {
  if (!draft.article) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    article: draft.article,
  })

  return (
    <ShareDialog
      title={draft.article.title}
      path={encodeURI(path.as)}
      description={
        <>
          <p>
            <Translate
              zh_hant="作品發布成功，快把作品分享到不同渠道，"
              zh_hans="作品发布成功，快把作品分享到不同渠道，"
            />
          </p>
          <p>
            <Translate
              zh_hant="吸引更多人為你拍手！"
              zh_hans="吸引更多人为你拍手！"
            />
          </p>
        </>
      }
      headerTitle={<Translate zh_hant="作品已發布" zh_hans="作品已发布" />}
      footerButtons={
        <Dialog.Footer.Button {...path}>
          <Translate zh_hant="查看作品" zh_hans="查看作品" />
        </Dialog.Footer.Button>
      }
    >
      {({ open }) => <BasePublishedState openShareDialog={open} />}
    </ShareDialog>
  )
}

export default PublishedState
