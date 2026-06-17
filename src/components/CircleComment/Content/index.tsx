import classNames from 'classnames'
import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { COMMENT_TYPE_TEXT, TEST_ID } from '~/common/enums'
import { captureClicks } from '~/common/utils'
import {
  CircleCommentFormType,
  Expandable,
  LanguageContext,
} from '~/components'
import {
  CircleCommentContentCommentPrivateFragment,
  CircleCommentContentCommentPublicFragment,
} from '~/gql/graphql'

import Collapsed from './Collapsed'
import styles from './styles.module.css'

interface ContentProps {
  comment: CircleCommentContentCommentPublicFragment &
    Partial<CircleCommentContentCommentPrivateFragment>
  type: CircleCommentFormType
  size?: 14 | 15
  bgColor?: 'greyLighter' | 'white'
  limit?: number
  textIndent?: boolean
  isRichShow?: boolean
}

const fragments = {
  comment: {
    public: gql`
      fragment CircleCommentContentCommentPublic on Comment {
        id
        content
        state
      }
    `,
    private: gql`
      fragment CircleCommentContentCommentPrivate on Comment {
        id
        author {
          id
          isBlocked
        }
      }
    `,
  },
}

export const CircleCommentContent = ({
  comment,
  type,
  size,
  bgColor,
  limit = 10,
  textIndent = false,
  isRichShow = true,
}: ContentProps) => {
  const { lang } = useContext(LanguageContext)
  const { content, state } = comment
  const isBlocked = comment.author?.isBlocked

  const contentClasses = classNames({
    [styles.content]: true,
    [size ? styles[`size${size}`] : '']: !!size,
  })

  if (state === 'collapsed' || isBlocked) {
    return (
      <Collapsed
        content={content}
        collapsedContent={
          isBlocked ? (
            <FormattedMessage
              defaultMessage="You have blocked that user"
              id="Lb0JsC"
            />
          ) : (
            <FormattedMessage
              defaultMessage="This {type} has been collapsed by the author"
              id="us5QHt"
              values={{ type: COMMENT_TYPE_TEXT[lang][type] }}
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
        <Expandable
          content={content}
          limit={limit}
          isRichShow={isRichShow}
          bgColor={bgColor}
          textIndent={textIndent}
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

  if (state === 'banned') {
    return (
      <p
        className={`${contentClasses} inactive`}
        data-test-id={TEST_ID.COMMENT_CONETNT}
      >
        <FormattedMessage
          defaultMessage="This {type} has been archived due to a violation of the user agreement"
          id="cCsxxw"
          values={{ type: COMMENT_TYPE_TEXT[lang][type] }}
        />
      </p>
    )
  }

  if (state === 'archived') {
    return (
      <p className={`${contentClasses} inactive`}>
        <FormattedMessage
          defaultMessage="This {type} has been deleted by the author"
          id="fDdcbi"
          values={{ type: COMMENT_TYPE_TEXT[lang][type] }}
        />
      </p>
    )
  }

  return null
}

CircleCommentContent.fragments = fragments
