import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconComment from '@/public/static/icons/24px/comment.svg'
import {
  BREAKPOINTS,
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
  useMediaQuery,
  ViewerContext,
} from '~/components'
import {
  CommentButtonArticlePrivateFragment,
  CommentButtonArticlePublicFragment,
} from '~/gql/graphql'

import styles from '../styles.module.css'

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
  tooltip,
  article,
  iconSize = 20,
  textWeight = 'medium',
  textIconSpacing = 8,
  ...props
}: (CardProps | ButtonProps) & {
  tooltip?: React.ReactNode
  article: CommentButtonArticle
  iconSize?: 20 | 24
  textWeight?: 'medium' | 'normal'
  textIconSpacing?: 4 | 6 | 8
}) => {
  const intl = useIntl()
  const isMdUp = useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`)

  return (
    <Tooltip
      disabled={!tooltip || (!!tooltip && !isMdUp)}
      content={tooltip}
      placement="top"
      delay={[500, null]}
    >
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
    </Tooltip>
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
      <Content
        tooltip={
          <FormattedMessage
            defaultMessage="The author has closed the comment section"
            id="va8Rnw"
          />
        }
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
        tooltip={
          <span className={styles.hotKeyTooltip}>
            <FormattedMessage
              defaultMessage="Comments"
              id="7uYW+U"
              description="src/views/ArticleDetail/Toolbar/FixedToolbar/index.tsx"
            />
            &nbsp;
            <span className={styles.key}>(c)</span>
          </span>
        }
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
          tooltip={
            <span className={styles.hotKeyTooltip}>
              <FormattedMessage
                defaultMessage="Comments"
                id="7uYW+U"
                description="src/views/ArticleDetail/Toolbar/FixedToolbar/index.tsx"
              />
              &nbsp;
              <span className={styles.key}>(c)</span>
            </span>
          }
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
