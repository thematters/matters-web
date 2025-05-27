import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconComment from '@/public/static/icons/24px/comment.svg'
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  REFETCH_RESPONSES,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { numAbbr } from '~/common/utils'
import {
  ArticleCommentFormDialog,
  Button,
  ButtonProps,
  CardProps,
  Icon,
  TextIcon,
  toast,
  Tooltip,
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
  iconSize?: 20 | 24
  textWeight?: 'medium' | 'normal'
  textIconSpacing?: 4 | 6 | 8
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
  iconSize = 20,
  textWeight = 'medium',
  textIconSpacing = 8,
  ...props
}: (CardProps | ButtonProps) & {
  article: CommentButtonArticle
  iconSize?: 20 | 24
  textWeight?: 'medium' | 'normal'
  textIconSpacing?: 4 | 6 | 8
}) => {
  const intl = useIntl()

  return (
    <>
      <Button
        spacing={[8, 12]}
        aria-label={`${intl.formatMessage({
          defaultMessage: 'Comment',
          id: 'Ix3e3Q',
          description: 'src/components/Forms/CommentForm/index.tsx',
        })}…`}
        aria-haspopup="dialog"
        {...(props as ButtonProps)}
      >
        <TextIcon
          icon={<Icon icon={IconComment} size={iconSize} />}
          weight={textWeight}
          spacing={textIconSpacing}
          size={14}
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
  iconSize = 20,
  textWeight = 'medium',
  textIconSpacing = 8,
  ...buttonProps
}: CommentButtonProps) => {
  const viewer = useContext(ViewerContext)

  const refetchResponses = () => {
    window.dispatchEvent(new CustomEvent(REFETCH_RESPONSES, {}))
  }

  if (disabled) {
    return (
      <Tooltip
        content={
          <FormattedMessage
            defaultMessage="The author has closed the comment section"
            id="va8Rnw"
          />
        }
        placement="top"
      >
        {/* FIXME: Need a wrapper(<section>) to make <Tooltip> work */}
        <section>
          <Content
            article={article}
            disabled
            iconSize={iconSize}
            textWeight={textWeight}
            textIconSpacing={textIconSpacing}
            {...buttonProps}
          />
        </section>
      </Tooltip>
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
    <ArticleCommentFormDialog
      articleId={article.id}
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
    </ArticleCommentFormDialog>
  )
}

CommentButton.fragments = fragments

export default CommentButton
