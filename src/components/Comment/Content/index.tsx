import classNames from 'classnames'
import gql from 'graphql-tag'

import { Translate } from '~/components'

import contentCommentStyles from '~/common/styles/utils/content.comment.css'

import Collapsed from './Collapsed'
import styles from './styles.css'

import { ContentComment } from './__generated__/ContentComment'

interface ContentProps {
  comment: ContentComment

  size?: 'sm' | 'md-s'
}

const fragments = {
  comment: gql`
    fragment ContentComment on Comment {
      id
      content
      state
      author {
        id
        isBlocked
      }
    }
  `
}

const Content = ({ comment, size }: ContentProps) => {
  const {
    content,
    state,
    author: { isBlocked }
  } = comment

  const contentClass = classNames({
    content: true,
    [`size-${size}`]: !!size
  })

  if (state === 'collapsed' || isBlocked) {
    return (
      <Collapsed
        content={content}
        collapsedContent={
          isBlocked ? (
            <Translate id="commentBlocked" />
          ) : (
            <Translate id="commentCollapsed" />
          )
        }
        className={contentClass}
      />
    )
  }

  if (state === 'active') {
    return (
      <>
        <section
          className={`${contentClass} u-content-comment`}
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
      <p className={`${contentClass} inactive`}>
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
      <p className={`${contentClass} inactive`}>
        <Translate id="commentDeleted" />

        <style jsx>{styles}</style>
      </p>
    )
  }

  return null
}

Content.fragments = fragments

export default Content
