import classNames from 'classnames'
import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { COMMENT_TYPE_TEXT, TEST_ID } from '~/common/enums'
import { captureClicks } from '~/common/utils'
import { Expandable, LanguageContext } from '~/components'
import {
  ArticleCommentContentCommentPrivateFragment,
  ArticleCommentContentCommentPublicFragment,
} from '~/gql/graphql'

import Collapsed from './Collapsed'
import styles from './styles.module.css'

interface ContentProps {
  comment: ArticleCommentContentCommentPublicFragment &
    Partial<ArticleCommentContentCommentPrivateFragment>
  size?: 14 | 15
  bgColor?: 'greyLighter' | 'white'
  limit?: number
  textIndent?: boolean
  isRichShow?: boolean
}

const fragments = {
  comment: {
    public: gql`
      fragment ArticleCommentContentCommentPublic on Comment {
        id
        content
        state
      }
    `,
    private: gql`
      fragment ArticleCommentContentCommentPrivate on Comment {
        id
        author {
          id
          isBlocked
        }
      }
    `,
  },
}

export const ArticleCommentContent = ({
  comment,
  size,
  bgColor,
  limit = 5,
  textIndent = false,
  isRichShow = true,
}: ContentProps) => {
  const { lang } = useContext(LanguageContext)
  const { content, state } = comment
  const isBlocked = comment.author?.isBlocked

  const contentClasses = classNames({
    [styles.content]: true,
    [size ? styles[`text${size}`] : '']: !!size,
    [styles.inactive]: state === 'archived' || state === 'banned',
  })

  if (state === 'banned') {
    return (
      <p className={contentClasses}>
        <FormattedMessage
          defaultMessage="The comment has been forcibly hidden"
          id="6BbPcY"
        />
      </p>
    )
  }

  if (state === 'collapsed' || isBlocked) {
    return (
      <Collapsed
        content={content}
        collapsedContent={
          <FormattedMessage
            defaultMessage="Comment has been hidden"
            id="YjW2MT"
          />
        }
        className={contentClasses}
      />
    )
  }

  if (state === 'active') {
    return (
      <>
        <Expandable
          content={content}
          limit={limit}
          isRichShow={isRichShow}
          bgColor={bgColor}
          textIndent={textIndent}
          size={size}
          collapseable={false}
          isComment
        >
          <section
            className={`${contentClasses} u-content-comment`}
            dangerouslySetInnerHTML={{
              __html: content || '',
            }}
            onClick={captureClicks}
            data-test-id={TEST_ID.COMMENT_CONETNT}
          />
        </Expandable>
      </>
    )
  }

  if (state === 'archived') {
    return (
      <p className={contentClasses}>
        <FormattedMessage
          defaultMessage="This {type} has been deleted by the author"
          id="fDdcbi"
          values={{ type: COMMENT_TYPE_TEXT[lang].article }}
        />
      </p>
    )
  }

  return null
}

ArticleCommentContent.fragments = fragments
