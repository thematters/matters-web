import classNames from 'classnames'
import gql from 'graphql-tag'

import { COMMENT_TYPE_TEXT, TEST_ID } from '~/common/enums'
import contentCommentStyles from '~/common/styles/utils/content.comment.css'
import { captureClicks } from '~/common/utils'
import { CommentFormType, Translate } from '~/components'

import { ContentCommentPrivate } from './__generated__/ContentCommentPrivate'
import { ContentCommentPublic } from './__generated__/ContentCommentPublic'
import Collapsed from './Collapsed'
import styles from './styles.css'

interface ContentProps {
  comment: ContentCommentPublic & Partial<ContentCommentPrivate>
  type: CommentFormType
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

const Content = ({ comment, type, size }: ContentProps) => {
  const { content, state } = comment
  const isBlocked = comment.author?.isBlocked

  const contentClasses = classNames({
    content: true,
    [`size-${size}`]: !!size,
  })

  if (state === 'collapsed' || isBlocked) {
    return (
      <Collapsed
        content={content}
        collapsedContent={
          isBlocked ? (
            <Translate zh_hant="你屏蔽了该用户" zh_hans="你封鎖了該用戶" />
          ) : (
            <Translate
              zh_hant={`${COMMENT_TYPE_TEXT.zh_hant[type]}被創作者闔上`}
              zh_hans={`${COMMENT_TYPE_TEXT.zh_hans[type]}被创作者折叠`}
            />
          )
        }
        className={contentClasses}
      />
    )
  }

  if (state === 'active') {
    return (
      <>
        <section
          className={`${contentClasses} u-content-comment`}
          dangerouslySetInnerHTML={{
            __html: content || '',
          }}
          onClick={captureClicks}
          data-test-id={TEST_ID.COMMENT_CONETNT}
        />

        <style jsx>{styles}</style>
        <style jsx>{contentCommentStyles}</style>
      </>
    )
  }

  if (state === 'banned') {
    return (
      <p
        className={`${contentClasses} inactive`}
        data-test-id={TEST_ID.COMMENT_CONETNT}
      >
        <Translate
          zh_hant={`此${COMMENT_TYPE_TEXT.zh_hant[type]}因違反用戶協定而被隱藏`}
          zh_hans={`此${COMMENT_TYPE_TEXT.zh_hans[type]}因违反用户协定而被隐藏`}
        />

        <style jsx>{styles}</style>
      </p>
    )
  }

  if (state === 'archived') {
    return (
      <p className={`${contentClasses} inactive`}>
        <Translate
          zh_hant={`${COMMENT_TYPE_TEXT.zh_hant[type]}被原作者刪除`}
          zh_hans={`${COMMENT_TYPE_TEXT.zh_hans[type]}被原作者删除`}
        />

        <style jsx>{styles}</style>
      </p>
    )
  }

  return null
}

Content.fragments = fragments

export default Content
