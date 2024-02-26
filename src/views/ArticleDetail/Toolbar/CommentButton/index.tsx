import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  REFETCH_RESPONSES,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { numAbbr } from '~/common/utils'
import {
  Button,
  ButtonProps,
  CardProps,
  CommentFormDialog,
  IconComment24,
  TextIcon,
  toast,
  ViewerContext,
} from '~/components'
import {
  CommentButtonArticlePrivateFragment,
  CommentButtonArticlePublicFragment,
} from '~/gql/graphql'

type CommentButtonArticle = CommentButtonArticlePublicFragment &
  Partial<CommentButtonArticlePrivateFragment>

type CommentButtonProps = {
  article: CommentButtonArticle
  disabled?: boolean
  iconSize?: 'mdS' | 'md'
  textWeight?: 'md' | 'normal'
  textIconSpacing?: 'xxtight' | 'xtight' | 'basexxtight'
} & ButtonProps

const fragments = {
  article: {
    public: gql`
      fragment CommentButtonArticlePublic on Article {
        id
        commentCount
        canComment
      }
    `,
    private: gql`
      fragment CommentButtonArticlePrivate on Article {
        id
        author {
          id
          isBlocking
        }
      }
    `,
  },
}

const Content = ({
  article,
  iconSize = 'mdS',
  textWeight = 'md',
  textIconSpacing = 'xtight',
  ...props
}: (CardProps | ButtonProps) & {
  article: CommentButtonArticle
  iconSize?: 'mdS' | 'md'
  textWeight?: 'md' | 'normal'
  textIconSpacing?: 'xxtight' | 'xtight' | 'basexxtight'
}) => {
  const intl = useIntl()

  return (
    <>
      <Button
        spacing={['xtight', 'tight']}
        aria-label={`${intl.formatMessage({
          defaultMessage: 'Comment',
          id: 'Ix3e3Q',
          description: 'src/components/Forms/CommentForm/index.tsx',
        })}…`}
        aria-haspopup="dialog"
        {...(props as ButtonProps)}
      >
        <TextIcon
          icon={<IconComment24 size={iconSize} />}
          weight={textWeight}
          spacing={textIconSpacing}
          size="sm"
        >
          {article.commentCount > 0 ? numAbbr(article.commentCount) : undefined}
        </TextIcon>
      </Button>
    </>
  )
}

const CommentButton = ({
  article,
  disabled,
  iconSize = 'mdS',
  textWeight = 'md',
  textIconSpacing = 'xtight',
  ...buttonProps
}: CommentButtonProps) => {
  const viewer = useContext(ViewerContext)

  const refetchResponses = () => {
    window.dispatchEvent(new CustomEvent(REFETCH_RESPONSES, {}))
  }

  if (disabled) {
    return (
      <Content
        article={article}
        disabled
        iconSize={iconSize}
        textWeight={textWeight}
        textIconSpacing={textIconSpacing}
        {...buttonProps}
      />
    )
  }

  if (viewer.isInactive) {
    return (
      <Content
        article={article}
        iconSize={iconSize}
        textWeight={textWeight}
        textIconSpacing={textIconSpacing}
        onClick={() => {
          toast.error({
            message: (
              <FormattedMessage
                {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]}
              />
            ),
          })
        }}
        {...buttonProps}
      />
    )
  }

  if (article.author?.isBlocking) {
    return (
      <Content
        article={article}
        iconSize={iconSize}
        textWeight={textWeight}
        textIconSpacing={textIconSpacing}
        onClick={() => {
          toast.error({
            message: (
              <FormattedMessage
                defaultMessage="The author has disabled comments for this article"
                id="7cwoRo"
              />
            ),
          })
        }}
        {...buttonProps}
      />
    )
  }

  if (!viewer.isAuthed) {
    const props = {
      onClick: () => {
        // deprecated
        // window.dispatchEvent(new CustomEvent(CLOSE_ACTIVE_DIALOG))
        window.dispatchEvent(
          new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
            detail: { trigger: UNIVERSAL_AUTH_TRIGGER.comment },
          })
        )
      },
    }

    return (
      <Content
        aria-haspopup="dialog"
        article={article}
        iconSize={iconSize}
        textWeight={textWeight}
        textIconSpacing={textIconSpacing}
        {...props}
        {...buttonProps}
      />
    )
  }

  return (
    <CommentFormDialog
      articleId={article.id}
      type="article"
      submitCallback={refetchResponses}
    >
      {({ openDialog }) => (
        <Content
          article={article}
          aria-haspopup="dialog"
          onClick={openDialog}
          iconSize={iconSize}
          textWeight={textWeight}
          textIconSpacing={textIconSpacing}
          {...buttonProps}
        />
      )}
    </CommentFormDialog>
  )
}

CommentButton.fragments = fragments

export default CommentButton