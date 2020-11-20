import { useEffect } from 'react'

import { Dialog, ShareDialog, Translate } from '~/components'

import { routerPush, toPath } from '~/common/utils'

import { EditModeArticle_article_drafts as EditModeDraft } from '../__generated__/EditModeArticle'

interface Props {
  article: {
    title: string
    slug: string
    author: {
      userName: string | null
    }
  }
  draft: EditModeDraft

  cancel: () => void
}

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

const PublishedState = ({ article, draft, cancel }: Props) => {
  const path = toPath({
    page: 'articleDetail',
    article: { ...article, mediaHash: draft.mediaHash },
  })

  return (
    <ShareDialog
      title={article.title}
      path={encodeURI(path.href)}
      description={
        <>
          <p>
            <Translate
              zh_hant="修訂作品發佈成功，快把作品分享到不同渠道，"
              zh_hans="修订作品发布成功，快把作品分享到不同渠道，"
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
      headerTitle={
        <Translate zh_hant="修訂作品已發佈" zh_hans="修订作品已发布" />
      }
      footerButtons={
        <Dialog.Footer.Button
          onClick={() => {
            cancel()
            routerPush(path.href)
          }}
        >
          <Translate zh_hant="查看修訂作品" zh_hans="查看修订作品" />
        </Dialog.Footer.Button>
      }
    >
      {({ open }) => <BasePublishedState openShareDialog={open} />}
    </ShareDialog>
  )
}

export default PublishedState
