import classNames from 'classnames'
import gql from 'graphql-tag'

import { Translate } from '~/components'

import contentCommentStyles from '~/common/styles/utils/content.comment.css'
import { captureClicks } from '~/common/utils'

import Collapsed from './Collapsed'
import styles from './styles.css'

import { ContentCommentPrivate } from './__generated__/ContentCommentPrivate'
import { ContentCommentPublic } from './__generated__/ContentCommentPublic'

interface ContentProps {
  comment: ContentCommentPublic & Partial<ContentCommentPrivate>

  size?: 'sm' | 'md-s'
}

const fragments = {
  comment: {
    public: gql`
      fragment ContentCommentPublic on Comment {
        id
        content
        state
      }
    `,
    private: gql`
      fragment ContentCommentPrivate on Comment {
        id
        author {
          id
          isBlocked
        }
      }
    `,
  },
}

const Content = ({ comment, size }: ContentProps) => {
  const { content, state } = comment
  const isBlocked = comment.author?.isBlocked

  const contentClass = classNames({
    content: true,
    [`size-${size}`]: !!size,
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
            __html: content || '',
          }}
          onClick={captureClicks}
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
