import classNames from 'classnames'
import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { COMMENT_TYPE_TEXT, TEST_ID } from '~/common/enums'
import { capitalizeFirstLetter, captureClicks } from '~/common/utils'
import { CommentFormType, Expandable, LanguageContext } from '~/components'
import {
  ContentCommentPrivateFragment,
  ContentCommentPublicFragment,
} from '~/gql/graphql'

import Collapsed from './Collapsed'
import styles from './styles.module.css'

interface ContentProps {
  comment: ContentCommentPublicFragment & Partial<ContentCommentPrivateFragment>
  type: CommentFormType
  size?: 'sm' | 'mdS'
  bgColor?: 'greyLighter' | 'white'
  limit?: number
  textIndent?: boolean
  isRichShow?: boolean
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

const Content = ({
  comment,
  type,
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
    [size ? styles[`size${capitalizeFirstLetter(size)}`] : '']: !!size,
    [styles.inactive]: state === 'archived',
  })

  if (state === 'collapsed' || state === 'banned' || isBlocked) {
    return (
      <Collapsed
        content={content}
        collapsedContent={
          <FormattedMessage
            defaultMessage="Comment has been hidden"
            id="I8+06z"
            description="src/components/CommentBeta/Content/index.tsx"
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
          values={{ type: COMMENT_TYPE_TEXT[lang][type] }}
        />
      </p>
    )
  }

  return null
}

Content.fragments = fragments

export default Content
