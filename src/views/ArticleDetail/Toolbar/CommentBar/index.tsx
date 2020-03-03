import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Card,
  CardProps,
  CommentFormDialog,
  LikeCoinDialog,
  Translate,
  useResponsive,
  ViewerContext
} from '~/components'

import {
  CLOSE_ACTIVE_DIALOG,
  OPEN_LOGIN_DIALOG,
  PATHS,
  REFETCH_RESPONSES
} from '~/common/enums'
import { appendTarget } from '~/common/utils'

import styles from './styles.css'

import { CommentBarArticle } from './__generated__/CommentBarArticle'

const fragments = {
  article: gql`
    fragment CommentBarArticle on Article {
      id
      live
      author {
        id
        isBlocking
      }
    }
  `
}

const CommentBar = ({ article }: { article: CommentBarArticle }) => {
  const viewer = useContext(ViewerContext)
  const isSmallUp = useResponsive('sm-up')

  const refetchResponses = () => {
    if (article.live) {
      return
    }
    window.dispatchEvent(new CustomEvent(REFETCH_RESPONSES, {}))
  }

  const cardProps: CardProps = {
    bgColor: 'grey-lighter',
    spacing: [0, 0],
    borderRadius: 'base'
  }

  if (viewer.shouldSetupLikerID) {
    return (
      <LikeCoinDialog>
        {({ open }) => (
          <Card aria-haspopup="true" onClick={open} {...cardProps}>
            <p>
              <Translate
                zh_hant="設置 Liker ID 後即可參與精彩討論"
                zh_hans="设置 Liker ID 后即可参与精彩讨论"
              />
              <style jsx>{styles}</style>
            </p>
          </Card>
        )}
      </LikeCoinDialog>
    )
  }

  if (viewer.isOnboarding && article.author.id !== viewer.id) {
    return (
      <Card {...cardProps}>
        <p>
          <Translate
            zh_hant="新手小貼士：發佈作品收穫讚賞及瀏覽他人作品都能幫你開啓評論權限喔！"
            zh_hans="新手小贴士：发布作品收获赞赏及浏览他人作品都能帮你开启评论权限喔！"
          />
          <style jsx>{styles}</style>
        </p>
      </Card>
    )
  }

  if (article.author.isBlocking) {
    return (
      <Card {...cardProps}>
        <p>
          <Translate
            zh_hant="因爲作者設置，你無法參與該作品下的討論。"
            zh_hans="因为作者设置，你无法参与该作品下的讨论。"
          />
          <style jsx>{styles}</style>
        </p>
      </Card>
    )
  }

  if (!viewer.isAuthed) {
    const clickProps = isSmallUp
      ? {
          onClick: () => {
            window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
            window.dispatchEvent(new CustomEvent(OPEN_LOGIN_DIALOG))
          }
        }
      : appendTarget({ ...PATHS.AUTH_LOGIN, fallbackCurrent: true })

    return (
      <Card {...clickProps} {...cardProps}>
        <p>
          <Translate id="login" />
          <Translate id="putComment" />
          <Translate zh_hant="…" zh_hans="…" />
          <style jsx>{styles}</style>
        </p>
      </Card>
    )
  }

  return (
    <CommentFormDialog articleId={article.id} submitCallback={refetchResponses}>
      {({ open }) => (
        <Card aria-haspopup="true" onClick={open} {...cardProps}>
          <p>
            <Translate id="putComment" />
            <Translate zh_hant="…" zh_hans="…" />
            <style jsx>{styles}</style>
          </p>
        </Card>
      )}
    </CommentFormDialog>
  )
}

CommentBar.fragments = fragments

export default CommentBar
