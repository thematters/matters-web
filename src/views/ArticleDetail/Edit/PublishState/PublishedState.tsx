import { useEffect } from 'react'

import { toPath } from '~/common/utils'
import { Dialog, ShareDialog, Translate } from '~/components'
import { LatestVersionArticleQuery } from '~/gql/graphql'
interface PublishedStateProps {
  article: NonNullable<
    LatestVersionArticleQuery['article'] & { __typename: 'Article' }
  >
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

const PublishedState = ({ article }: PublishedStateProps) => {
  const path = toPath({ page: 'articleDetail', article })

  return (
    <ShareDialog
      disableNativeShare
      title={article.title}
      path={encodeURI(path.href)}
      description={
        <>
          <p>
            <Translate
              zh_hant="修訂作品發佈成功，快把作品分享到不同渠道，"
              zh_hans="修订作品发布成功，快把作品分享到不同渠道，"
              en="Your work has been republished. Share it on different platforms "
            />
          </p>
          <p>
            <Translate
              zh_hant="吸引更多人為你拍手！"
              zh_hans="吸引更多人为你拍手！"
              en="to receive more support"
            />
          </p>
        </>
      }
      headerTitle={
        <Translate
          zh_hant="修訂作品已發佈"
          zh_hans="修订作品已发布"
          en="Article republished"
        />
      }
      btns={
        <Dialog.RoundedButton
          text={
            <Translate
              zh_hant="查看修訂作品"
              zh_hans="查看修订作品"
              en="View republished article"
            />
          }
          onClick={() => {
            window.location.href = path.href
          }}
        />
      }
      smUpBtns={
        <Dialog.TextButton
          text={
            <Translate
              zh_hant="查看修訂作品"
              zh_hans="查看修订作品"
              en="View republished article"
            />
          }
          onClick={() => {
            window.location.href = path.href
          }}
        />
      }
    >
      {({ openDialog }) => <BasePublishedState openShareDialog={openDialog} />}
    </ShareDialog>
  )
}

export default PublishedState
