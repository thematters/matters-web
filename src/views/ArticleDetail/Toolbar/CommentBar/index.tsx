import gql from 'graphql-tag'
import { useContext } from 'react'

import { LikeCoinDialog, Translate, ViewerContext } from '~/components'

import styles from './styles.css'

import { CommentBarArticle } from './__generated__/CommentBarArticle'

const fragments = {
  article: gql`
    fragment CommentBarArticle on Article {
      id
      author {
        id
        isBlocking
      }
    }
  `
}

const CommentBar = ({ article }: { article: CommentBarArticle }) => {
  const viewer = useContext(ViewerContext)

  if (viewer.shouldSetupLikerID) {
    return (
      <LikeCoinDialog>
        {({ open }) => (
          <button type="button" onClick={open}>
            <Translate
              zh_hant="設置 Liker ID 後即可參與精彩討論"
              zh_hans="设置 Liker ID 后即可参与精彩讨论"
            />
            <style jsx>{styles}</style>
          </button>
        )}
      </LikeCoinDialog>
    )
  }

  if (viewer.isOnboarding && article.author.id !== viewer.id) {
    return (
      <p>
        <Translate
          zh_hant="新手小貼士：發佈作品收穫讚賞及瀏覽他人作品都能幫你開啓評論權限喔！"
          zh_hans="新手小贴士：发布作品收获赞赏及浏览他人作品都能帮你开启评论权限喔！"
        />
        <style jsx>{styles}</style>
      </p>
    )
  }

  if (article.author.isBlocking) {
    return (
      <p>
        <Translate
          zh_hant="因爲作者設置，你無法參與該作品下的討論。"
          zh_hans="因为作者设置，你无法参与该作品下的讨论。"
        />
        <style jsx>{styles}</style>
      </p>
    )
  }

  return (
    <button type="button">
      <Translate id="putComment" />
      <Translate zh_hant="…" zh_hans="…" />
      <style jsx>{styles}</style>
    </button>
  )
}

CommentBar.fragments = fragments

export default CommentBar
