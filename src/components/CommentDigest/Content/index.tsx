import { Translate } from '~/components/Language'

import { TEXT } from '~/common/enums'
import contentCommentStyles from '~/common/styles/utils/content.comment.css'

import styles from './styles.css'

const CommentContent = ({
  content,
  state
}: {
  content: string | null
  state: string
}) => {
  if (state === 'active') {
    return (
      <>
        <div
          className="u-content-comment"
          dangerouslySetInnerHTML={{
            __html: content || ''
          }}
        />
        <style jsx>{styles}</style>
        <style jsx>{contentCommentStyles}</style>
      </>
    )
  }

  if (state === 'banned') {
    return (
      <p className="banned-content">
        <Translate
          zh_hant="此評論因違反用戶協定而被隱藏"
          zh_hans="此评论因违反用户协定而被隐藏"
        />
        <style jsx>{styles}</style>
      </p>
    )
  }

  if (state === 'archived') {
    return (
      <p className="banned-content">
        <Translate
          zh_hant={TEXT.zh_hant.commentDeleted}
          zh_hans={TEXT.zh_hans.commentDeleted}
        />
        <style jsx>{styles}</style>
      </p>
    )
  }

  return null
}

export default CommentContent
