import classNames from 'classnames'
import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { COMMENT_TYPE_TEXT, TEST_ID } from '~/common/enums'
import contentCommentStyles from '~/common/styles/utils/content.comment.css'
import { captureClicks } from '~/common/utils'
import { CommentFormType, Expandable, LanguageContext, useRoute } from '~/components'
import {
  ContentCommentPrivateFragment,
  ContentCommentPublicFragment,
} from '~/gql/graphql'

import Collapsed from './Collapsed'
import styles from './styles.css'

interface ContentProps {
  comment: ContentCommentPublicFragment & Partial<ContentCommentPrivateFragment>
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

  const { lang } = useContext(LanguageContext)

  // TODO: Will be removed, just for dev
  const { getQuery } = useRoute()
  const limit = parseInt(getQuery('limit')) || 8

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
            <FormattedMessage defaultMessage="You have blocked this user" description="src/components/Comment/Content/index.tsx" />
          ) : (
            <FormattedMessage defaultMessage="{commentType} has been collapsed by creator" description="src/components/Comment/Content/index.tsx" values={{
              commentType: COMMENT_TYPE_TEXT[lang][type]
            }} />
          )
        }
        className={contentClasses}
      />
    )
  }

  if (state === 'active') {
    return (
      <>
        <Expandable content={content} limit={limit} isRichShow>
          <section
            className={`${contentClasses} u-content-comment`}
            dangerouslySetInnerHTML={{
              __html: content || '',
            }}
            onClick={captureClicks}
            data-test-id={TEST_ID.COMMENT_CONETNT}
          />
        </Expandable>

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
        <FormattedMessage defaultMessage="{commentType} was hidden for violation of user agreement" description="src/components/Comment/Content/index.tsx" values={{
          commentType: COMMENT_TYPE_TEXT[lang][type]
        }} />
        <style jsx>{styles}</style>
      </p>
    )
  }

  if (state === 'archived') {
    return (
      <p className={`${contentClasses} inactive`}>
        <FormattedMessage defaultMessage="{commentType} was deleted by the author" description="src/components/Comment/Content/index.tsx" />
        <style jsx>{styles}</style>
      </p>
    )
  }

  return null
}

Content.fragments = fragments

export default Content
