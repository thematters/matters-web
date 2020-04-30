import { useContext, useEffect } from 'react'

import { Dialog, ShareDialog, Translate, ViewerContext } from '~/components'

import { toPath } from '~/common/utils'

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

const PublishedState = () => {
  const viewer = useContext(ViewerContext)
  const path = toPath({
    page: 'userProfile',
    userName: viewer.userName || '',
  })

  return (
    <ShareDialog
      path={path.as}
      description={
        <>
          <p>
            <Translate
              zh_hant="作品發佈成功，快把文章分享到不同渠道，"
              zh_hans="作品发布成功，快把文章分享到不同渠道，"
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
      headerTitle={<Translate zh_hant="作品已發佈" zh_hans="作品已发布" />}
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
