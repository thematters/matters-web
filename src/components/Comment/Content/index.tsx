import { useApolloClient } from '@apollo/client'
import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  COMMENT_TYPE_TEXT,
  TEST_ID,
  toCommunityWatchRecordUrl,
} from '~/common/enums'
import {
  Button,
  Expandable,
  LanguageContext,
  toast,
  useMutation,
  ViewerContext,
} from '~/components'
import {
  CommentContentCommentPrivateFragment,
  CommentContentCommentPublicFragment,
  CommentState,
  RestoreCommunityWatchCommentMutation,
} from '~/gql/graphql'

import Collapsed from './Collapsed'
import styles from './styles.module.css'

const isAdminView = () => process.env.NEXT_PUBLIC_ADMIN_VIEW === 'true'

interface ContentProps {
  comment: CommentContentCommentPublicFragment &
    Partial<CommentContentCommentPrivateFragment>
  size?: 14 | 15
  bgColor?: 'greyLighter' | 'white'
  limit?: number
  textIndent?: boolean
  isRichShow?: boolean
  expandable?: boolean
}

const fragments = {
  comment: {
    public: gql`
      fragment CommentContentCommentPublic on Comment {
        id
        content
        state
        communityWatchAction {
          uuid
        }
      }
    `,
    private: gql`
      fragment CommentContentCommentPrivate on Comment {
        id
        author {
          id
          isBlocked
        }
      }
    `,
  },
}

const RESTORE_COMMUNITY_WATCH_COMMENT = gql`
  mutation RestoreCommunityWatchComment($uuid: ID!, $note: String) {
    restoreCommunityWatchComment(input: { uuid: $uuid, note: $note }) {
      uuid
      actionState
      reviewState
      commentId
    }
  }
`

const CommunityWatchRestoreButton = ({
  commentId,
  actionUuid,
}: {
  commentId: string
  actionUuid: string
}) => {
  const client = useApolloClient()
  const [restoreComment, { loading }] =
    useMutation<RestoreCommunityWatchCommentMutation>(
      RESTORE_COMMUNITY_WATCH_COMMENT
    )

  const restore = async () => {
    try {
      await restoreComment({
        variables: {
          uuid: actionUuid,
          note: 'Restored from Matters frontend admin action',
        },
        update: (cache) => {
          cache.modify({
            id: cache.identify({ __typename: 'Comment', id: commentId }),
            fields: {
              state: () => CommentState.Active,
              communityWatchAction: () => null,
            },
          })
        },
      })
      await client.refetchQueries({ include: 'active' })

      toast.success({
        message: (
          <FormattedMessage
            defaultMessage="已恢復留言"
            id="vJQzbe"
            description="src/components/Comment/Content/index.tsx"
          />
        ),
      })
    } catch (error) {
      console.error(error)
      toast.error({
        message: (
          <FormattedMessage
            defaultMessage="恢復失敗，請稍後再試"
            id="u4QNpM"
            description="src/components/Comment/Content/index.tsx"
          />
        ),
      })
    }
  }

  return (
    <Button
      className={styles.restoreButton}
      disabled={loading}
      onClick={restore}
      spacing={[0, 0]}
      textColor="green"
      textActiveColor="greenDark"
    >
      <FormattedMessage
        defaultMessage="恢復留言"
        id="p/Sz0T"
        description="src/components/Comment/Content/index.tsx"
      />
    </Button>
  )
}

export const CommentContent = ({
  comment,
  size,
  bgColor,
  limit = 5,
  textIndent = false,
  isRichShow = true,
  expandable = true,
}: ContentProps) => {
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)
  const { content, state } = comment
  const isBlocked = comment.author?.isBlocked
  const communityWatchAction = comment.communityWatchAction

  const contentClasses = classNames({
    [styles.content]: true,
    [size ? styles[`text${size}`] : '']: !!size,
    [styles.inactive]: state === 'archived' || state === 'banned',
  })

  if (state === 'banned' && communityWatchAction?.uuid) {
    return (
      <p className={contentClasses}>
        <Link href={toCommunityWatchRecordUrl(communityWatchAction.uuid)}>
          <FormattedMessage
            defaultMessage="本則貼文已由守望相助隊檢舉"
            id="eRTBgt"
            description="src/components/Comment/Content/index.tsx"
          />
        </Link>
        {isAdminView() && viewer.isAdmin && (
          <CommunityWatchRestoreButton
            commentId={comment.id}
            actionUuid={communityWatchAction.uuid}
          />
        )}
      </p>
    )
  }

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
        {expandable && (
          <Expandable
            content={content}
            limit={limit}
            isRichShow={isRichShow}
            bgColor={bgColor}
            textIndent={textIndent}
            size={size}
            collapseable={false}
            isCommentOrMoment
          >
            <section
              className={`${contentClasses} u-content-comment`}
              dangerouslySetInnerHTML={{
                __html: content || '',
              }}
              data-test-id={TEST_ID.COMMENT_CONETNT}
            />
          </Expandable>
        )}
        {!expandable && (
          <section
            className={`${contentClasses} u-content-comment`}
            dangerouslySetInnerHTML={{
              __html: content || '',
            }}
            data-test-id={TEST_ID.COMMENT_CONETNT}
          />
        )}
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

CommentContent.fragments = fragments
