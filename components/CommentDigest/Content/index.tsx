import { Translate } from '~/components/Language'

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
      <div
        className="content-comment"
        dangerouslySetInnerHTML={{
          __html: content || ''
        }}
      />
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
        <Translate zh_hant="評論已被刪除" zh_hans="评论已被删除" />
        <style jsx>{styles}</style>
      </p>
    )
  }

  return null
}

export default CommentContent
